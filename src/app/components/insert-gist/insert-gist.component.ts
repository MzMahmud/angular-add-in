import { Component } from '@angular/core';
import { Gist, getHtmlContent } from '../../models/gist.model';
import { OfficeService } from '../../services/office.service';

@Component({
  selector: 'app-insert-gist',
  templateUrl: './insert-gist.component.html',
  styleUrl: './insert-gist.component.css',
})
export class InsertGistComponent {
  gists: Gist[] = [
    {
      id: '1',
      title: 'Hello World HTML',
      fileName: 'HelloWorld.html',
      lastUpdated: new Date('2023-02-01'),
      content: `
      <html>
        <head>
          <style>
          h1 {
            font-family: Calibri;
          }
          </style>
        </head>
        <body>
          <h1>Hello World!</h1>
          <p>This is a test</p>
        </body>
      </html>
      `,
      language: 'HTML',
    },
    {
      id: '2',
      title: 'Hello World Markdown',
      fileName: 'HelloWorld.md',
      lastUpdated: new Date('2023-01-01'),
      content: `
      # Hello World

      This is content converted from Markdown!

      Here's a JSON sample:
      \`\`\`json
      {
        "foo": "bar"
      }
      \`\`\`
      `,
      language: 'Markdown',
    },
  ];

  selectedGistId: string | null = null;

  errorMessage: string | null = null;

  constructor(private officeService: OfficeService) {}

  async insertGist(gistId: string | null) {
    this.errorMessage = null;
    if (gistId == null) {
      this.showError(`No gist is selected!`);
      return;
    }
    const gist = this.gists.find((g) => g.id === gistId);
    if (gist == null) {
      this.showError(`Invalid Gist!`);
      return;
    }
    const res = await this.officeService.setSelectedDataAsHtml(
      getHtmlContent(gist)
    );
    if (res.status === 'ERROR') {
      this.showError(res.message);
      return;
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }
}
