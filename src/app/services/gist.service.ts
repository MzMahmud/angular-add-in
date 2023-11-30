import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Gist } from '../models/gist.model';

@Injectable({
  providedIn: 'root',
})
export class GistService {
  constructor(private http: HttpClient) {}

  getUserPublicGists(githubUserName: string): Observable<Gist[]> {
    const url = `https://api.github.com/users/${githubUserName}/gists`;
    return this.http
      .get<GistResponse[]>(url)
      .pipe(
        map((gistResponses) => gistResponses.map(mapGistResponseToGists).flat())
      );
  }
}

type GistFile = {
  filename: string;
  language: string;
  raw_url: string;
};

type GistResponse = {
  files: Record<string, GistFile>;
  updated_at: string;
  description: string;
};

function mapGistResponseToGists(gistResponse: GistResponse): Gist[] {
  const gistFiles = Object.values(gistResponse.files);
  return gistFiles.map((gistFile) => mapGistFileToGist(gistFile, gistResponse));
}

function mapGistFileToGist(gistFile: GistFile, gistResponse: GistResponse) {
  return {
    id: gistFile.filename,
    title: gistResponse.description,
    fileName: gistFile.filename,
    language: gistFile.language,
    contentUrl: gistFile.raw_url,
    lastUpdated: new Date(gistResponse.updated_at),
  };
}
