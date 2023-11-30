import { Injectable } from '@angular/core';
import { AsyncResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class OfficeService {
  setSelectedDataAsHtml(htmlContent: string) {
    return new Promise<AsyncResponse<true>>((resolve) => {
      if (Office.context.mailbox.item == null) {
        resolve({
          status: 'ERROR',
          message: 'Office.context.mailbox.item is not present',
        });
        return;
      }
      Office.context.mailbox.item.body.setSelectedDataAsync(
        htmlContent,
        { coercionType: Office.CoercionType.Html },
        function (result) {
          if (result.status === Office.AsyncResultStatus.Failed) {
            resolve({
              status: 'ERROR',
              message: 'Unable to set selected data!',
            });
          }
          resolve({ status: 'SUCCESS', value: true });
        }
      );
    });
  }
}
