export class BatchService {
  constructor(externalService, maxBatchBytes) {
    this.externalService = externalService;
    this.MAX_BATCH_BYTES = maxBatchBytes;
  }

  sendBatches(products) {
    let batchStrings = [];
    let batchSizeBytes = 2; // account for the surrounding [ and ]

    for (const product of products) {
      const productStr = JSON.stringify(product);
      const productBytes = Buffer.byteLength(productStr, 'utf8');
      const delimiterBytes = batchStrings.length ? 1 : 0; // comma between items
      const candidateSize = batchSizeBytes + delimiterBytes + productBytes;

      if (candidateSize <= this.MAX_BATCH_BYTES) {
        batchStrings.push(productStr);
        batchSizeBytes = candidateSize;
        continue;
      }

      if (batchStrings.length === 0) {
        console.warn(
          'Warning: single product exceeds 5MB. Sending it alone anyway to avoid an infinite loop.'
        );
        this.externalService.callBatch(`[${productStr}]`);
        batchStrings = [];
        batchSizeBytes = 2;
        continue;
      }

      this.externalService.callBatch(`[${batchStrings.join(',')}]`);
      batchStrings = [productStr];
      batchSizeBytes = 2 + productBytes;
    }

    if (batchStrings.length > 0) {
      this.externalService.callBatch(`[${batchStrings.join(',')}]`);
    }
  }
}
