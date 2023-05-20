import { TestBed } from '@angular/core/testing';

import { CrudTempletDrivenService } from './crud-templet-driven.service';

describe('CrudTempletDrivenService', () => {
  let service: CrudTempletDrivenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTempletDrivenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
