import fs from 'fs';
import path from 'path';
import { ExternalService } from './services/ExternalService.js';
import { ParserService } from './services/ParserService.js';
import { BatchService } from './services/BatchService.js';

const ONE_MEGA_BYTE = 1_048_576.0;
const MAX_BATCH_BYTES = 5 * ONE_MEGA_BYTE;

function main() {
  const inputPath = process.argv[2] || 'feed.xml';
  const resolvedPath = path.resolve(process.cwd(), inputPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Input file not found: ${resolvedPath}`);
    process.exit(1);
  }

  const xmlText = fs.readFileSync(resolvedPath, 'utf8');

  const parserService = new ParserService();
  const externalService = new ExternalService();
  const batchService = new BatchService(externalService, MAX_BATCH_BYTES);

  const products = parserService.parseXml(xmlText);
  batchService.sendBatches(products);
}

main();
