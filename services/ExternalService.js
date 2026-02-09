export class ExternalService {
  constructor() {
    this.batchNum = 0;
    this.ONE_MEGA_BYTE = 1_048_576.0;
  }

  callBatch(batch) {
    this.batchNum += 1;
    this.prettyPrint(batch, this.batchNum);
  }

  prettyPrint(batch, batchNum) {
    const products = JSON.parse(batch);
    const batchSize = Buffer.byteLength(batch, "utf8");
    const size = batchSize / this.ONE_MEGA_BYTE;

    console.log(
      `\x1b[1mReceived batch ${String(batchNum).padStart(4)}\x1b[22m`,
    );
    console.log(`Size: ${size.toFixed(4).padStart(10)}MB`);
    console.log(`Products: ${String(products.length).padStart(8)}`);
    console.log("\n");

    // Uncomment code to view parsed products
    // products.map((product) => {
    //   console.log(product.id, product.title, product.description);
    //   console.log("\n");
    // });
  }
}
