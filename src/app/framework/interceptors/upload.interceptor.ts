import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Simulate server replying to file upload request */
@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/api/upload/file') === -1) return next.handle(req);

    const delay = 300;
    return createUploadEvents(delay, req.body);
  }
}

function createUploadEvents(delay: number, body?: FormData) {
  const chunks = 5;
  const total = 12345678;
  const chunkSize = Math.ceil(total / chunks);

  return new Observable<HttpEvent<any>>((observer) => {
    observer.next({ type: HttpEventType.Sent });

    uploadLoop(0);

    function uploadLoop(loaded: number) {
      setTimeout(() => {
        loaded += chunkSize;

        if (loaded >= total) {
          const doneResponse = new HttpResponse({
            status: 201,
            body: body?.get('file'),
          });
          observer.next(doneResponse);
          observer.complete();
          return;
        }

        const progressEvent: HttpProgressEvent = {
          type: HttpEventType.UploadProgress,
          loaded,
          total,
        };
        observer.next(progressEvent);
        uploadLoop(loaded);
      }, delay);
    }
  });
}
