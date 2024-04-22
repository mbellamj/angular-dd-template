import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationException, NetworkException } from '@core/exceptions';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly toast = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error =', error);

        if (error.status === HttpStatusCode.Unauthorized) throw new AuthenticationException();
        else if (error.status === 0) throw new NetworkException();
        else throw error;
      }),
    );
  }
}
