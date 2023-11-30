export interface Gist {
  id: string;
  title: string;
  fileName: string;
  lastUpdated: Date;
  language: string;
  contentUrl: string;
}

import showdown from 'showdown';

export function getHtmlContent(gist: Gist, content: string) {
  switch (gist.language) {
    case 'HTML':
      return content;
    case 'Markdown':
      const converter = new showdown.Converter();
      return converter.makeHtml(content);
    default:
      return `<pre><code>${content}</code></pre>`;
  }
}
