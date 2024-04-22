import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ALLOWED_EXTENSIONS, ALLOWED_FILE_TYPE, FILE_SIZE_LIMIT } from '@core/common/contants';
import { progress } from '@framework/operators';

export const UPLOAD_ENDPOINT = '/api/upload/file';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly http = inject(HttpClient);

  public upload(file: File) {
    if (file.size > FILE_SIZE_LIMIT) throw new Error(`${file.name} exceed the limit size`);

    if (!ALLOWED_FILE_TYPE.split(',').includes(file.type) || !ALLOWED_EXTENSIONS.test(file.name))
      throw new Error(`${file.name} extension not allowed`);

    const form = new FormData();

    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    form.append('file', file, file.name);

    return this.http
      .post<File>(UPLOAD_ENDPOINT, form, {
        headers,
        reportProgress: true,
        observe: 'events',
      })
      .pipe(progress());
  }
}
