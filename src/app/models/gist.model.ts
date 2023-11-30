export interface Gist {
  id: string;
  title: string;
  fileName: string;
  lastUpdated: Date;
  content?: string;
  language: string;
  contentUrl?: string;
}

import showdown from 'showdown';

export function getHtmlContent(gist: Gist) {
  switch (gist.language) {
    case 'HTML':
      return gist.content ?? '';
    case 'Markdown':
      const converter = new showdown.Converter();
      return converter.makeHtml(gist.content ?? '');
    default:
      return `
      <pre>
      <code>
        ${gist.content}
      </code>
      </pre>`;
  }
}
