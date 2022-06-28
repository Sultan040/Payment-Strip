import { TestBed } from '@angular/core/testing';

import { EstateInterceptorService } from './estate-interceptor.service';

describe('EstateInterceptorService', () => {
  let service: EstateInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstateInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
