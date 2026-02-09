# Publitas Backend Code Challenge

## Overview
This script parses the provided product feed XML, extracts `id`, `title`, and `description` for each product, batches them into JSON arrays up to (but not exceeding) 5 MB, and sends each batch to the provided external service.

## Requirements
- Node.js 18+ (or any modern Node.js version)
- npm

## Install
```bash
npm install
```

## Run
```bash
npm run start
# OR
node index.js
```

To use a different XML file:
```bash
node index.js path/to/your.xml
```

## Notes
- XML parsing is done with `fast-xml-parser`.
- Batch size is calculated using UTF-8 byte length of the JSON payload.
