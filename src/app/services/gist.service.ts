import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';
import { Gist } from '../models/gist.model';
import { AsyncResponse } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class GistService {
  constructor(private http: HttpClient) {}

  getUserPublicGists(githubUserName: string): Observable<Gist[]> {
    const url = `https://api.github.com/users/${githubUserName}/gists`;
    return this.http.get<GistResponse[]>(url).pipe(
      map((gistResponses) => gistResponses.map(mapGistResponseToGist)),
      catchError((_) => {
        console.error('error fetching public gists');
        return of([]);
      })
    );
  }

  async getGistWithContent(gistId: string): Promise<AsyncResponse<Gist>> {
    const gistUrl = `https://api.github.com/gists/${gistId}`;
    const $content = this.http.get<GistResponse>(gistUrl).pipe(
      map((gistResponse) => {
        const gist = mapGistResponseToGist(gistResponse);
        return { status: 'SUCCESS', value: gist } as AsyncResponse<Gist>;
      }),
      catchError((error) =>
        of({ status: 'ERROR', message: `${error}` } as AsyncResponse<Gist>)
      )
    );
    return firstValueFrom($content);
  }
}

type GistResponseFile = {
  filename: string;
  language: string;
  content?: string;
};

type GistResponse = {
  id: string;
  files: Record<string, GistResponseFile>;
  updated_at: string;
  description: string;
};

function mapGistResponseToGist(gistResponse: GistResponse): Gist {
  const gistFiles = Object.values(gistResponse.files);
  return {
    id: gistResponse.id,
    title: gistResponse.description,
    lastUpdated: new Date(gistResponse.updated_at),
    files: gistFiles,
  };
}
