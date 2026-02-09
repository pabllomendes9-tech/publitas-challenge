import { XMLParser } from 'fast-xml-parser';

export class ParserService {
  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      removeNSPrefix: true,
      processEntities: true
    });
  }

  parseXml(xmlText) {
    const data = this.parser.parse(xmlText);
    const channel = data?.rss?.channel;
    const items = this.toArray(channel?.item);
    return items.map(this.buildProduct);
  }

  toArray(value) {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }

  buildProduct(item) {
    return {
      id: item.id ?? item['g:id'],
      title: item.title ?? '',
      description: item.description ?? ''
    };
  }
}
