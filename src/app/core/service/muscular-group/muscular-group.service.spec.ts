import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MuscularGroupService } from './muscular-group.service';
import { MuscularGroup } from '../../models/muscular-group.interface';
import { ApiResponse } from '../../models/api-response.interface';

const BASE = 'http://localhost:8080';

const mockGroup: MuscularGroup = { id: '1', name: 'Chest' };

function wrap<T>(data: T): ApiResponse<T> {
  return { data, message: 'OK', timestamp: '2024-01-01T00:00:00Z' };
}

describe('MuscularGroupService', () => {
  let service: MuscularGroupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MuscularGroupService]
    });

    service = TestBed.inject(MuscularGroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMuscularGroups() should GET /api/v1/muscular-groups and return unwrapped list', (done) => {
    service.getMuscularGroups().subscribe({
      next: (groups) => {
        expect(groups).toEqual([mockGroup]);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/muscular-groups`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap([mockGroup]));
  });

  it('getMuscularGroup(id) should GET /api/v1/muscular-groups/{id} and return unwrapped item', (done) => {
    service.getMuscularGroup('1').subscribe({
      next: (group) => {
        expect(group).toEqual(mockGroup);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/muscular-groups/1`);
    expect(req.request.method).toBe('GET');
    req.flush(wrap(mockGroup));
  });

  it('saveMuscularGroup(dto) should POST /api/v1/muscular-groups and return unwrapped item', (done) => {
    const dto = { name: 'Back' };

    service.saveMuscularGroup(dto).subscribe({
      next: (group) => {
        expect(group).toEqual(mockGroup);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/muscular-groups`);
    expect(req.request.method).toBe('POST');
    req.flush(wrap(mockGroup));
  });

  it('updateMuscularGroup(id, dto) should PUT /api/v1/muscular-groups/{id} with id in path', (done) => {
    const dto = { name: 'Updated Chest' };

    service.updateMuscularGroup('1', dto).subscribe({
      next: (group) => {
        expect(group).toEqual(mockGroup);
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE}/api/v1/muscular-groups/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.url).toContain('/1');
    req.flush(wrap(mockGroup));
  });

  it('deleteMuscularGroup(id) should DELETE /api/v1/muscular-groups/{id}', (done) => {
    service.deleteMuscularGroup('1').subscribe({ next: () => done() });

    const req = httpMock.expectOne(`${BASE}/api/v1/muscular-groups/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
