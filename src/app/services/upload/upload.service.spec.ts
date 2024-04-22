import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { skipWhile } from 'rxjs';
import { UPLOAD_ENDPOINT, UploadService } from './upload.service';

describe('UploadService', () => {
  let controller: HttpTestingController;
  let service: UploadService;

  const file = new File(['sample'], 'sample.png', { type: 'image/png' });

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(UploadService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the uploaded file progress with the state [PENDING]', (done: DoneFn) => {
    service.upload(file).subscribe({
      next: (value) => {
        console.log('state =', value.state);
        expect(value.progress).toEqual(0);
        expect(value.state.type).toEqual('PENDING');
        done();
      },
      error: done.fail,
    });

    const http = controller.expectOne(UPLOAD_ENDPOINT);
    expect(http.request.method).toEqual('POST');
    http.event({ type: HttpEventType.Sent });
  });

  it('should return the uploaded file progress with the state [LOADING]', (done: DoneFn) => {
    service
      .upload(file)
      .pipe(skipWhile((value) => value.progress === 0))
      .subscribe({
        next: (value) => {
          console.log('state =', value.state);
          expect(value.progress).toEqual(50);
          expect(value.state.type).toEqual('LOADING');
          done();
        },
        error: done.fail,
      });

    const http = controller.expectOne(UPLOAD_ENDPOINT);
    expect(http.request.method).toEqual('POST');
    http.event({ type: HttpEventType.UploadProgress, loaded: 5, total: 10 });
  });

  it('should return the uploaded file progress with the state [DONE]', (done: DoneFn) => {
    service
      .upload(file)
      .pipe(skipWhile((value) => value.progress === 0))
      .subscribe({
        next: (value) => {
          console.log('state =', value.state);
          expect(value.progress).toEqual(100);
          expect(value.state.type).toEqual('DONE');
          if (value.state.type === 'DONE') {
            expect(value.state.data.name).toEqual(file.name);
            expect(value.state.data.type).toEqual(file.type);
            expect(value.state.data.size).toEqual(file.size);
            expect(value.state.data.lastModified).toEqual(file.lastModified);
          }
          done();
        },
        error: done.fail,
      });

    const http = controller.expectOne(UPLOAD_ENDPOINT);
    expect(http.request.method).toEqual('POST');

    http.event({
      type: HttpEventType.Response,
      status: 201,
      body: file,
      ok: true,
      headers: new HttpHeaders({ 'content-type': 'application/json' }),
      clone: () => new HttpResponse({ status: 201, body: file }),
      statusText: 'Succeed',
      url: null,
    });
  });
});
