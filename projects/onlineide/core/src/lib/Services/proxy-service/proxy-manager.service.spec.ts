import { TestBed } from '@angular/core/testing';

import { ProxyManager } from './proxy-manager.service';

describe('ProxyManager', () => {
  let service: ProxyManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProxyManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
