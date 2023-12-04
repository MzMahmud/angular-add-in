export interface Gist {
  id: string;
  title: string;
  lastUpdated: Date;
  files: GistFile[];
}

type GistFile = {
  filename: string;
  language: string;
  content?: string;
};

export function getHtmlContent(gist: Gist): string {
  return gist.files.map(convertToHtml).join('\n');
}

import showdown from 'showdown';
const converter = new showdown.Converter();

function convertToHtml(gistFile: GistFile): string {
  const content = gistFile.content ?? '';
  switch (gistFile.language) {
    case 'HTML':
      return content;
    case 'Markdown':
      return converter.makeHtml(content);
    default:
      return `<pre><code>${content}</code></pre>`;
  }
}
