import { TestBed } from '@angular/core/testing';

import { CrudTempletDrivenService } from './crud-templet-driven.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('CrudTempletDrivenService', () => {
  let service: CrudTempletDrivenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers:[
        HttpClient
      ]
    });
    service = TestBed.inject(CrudTempletDrivenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
