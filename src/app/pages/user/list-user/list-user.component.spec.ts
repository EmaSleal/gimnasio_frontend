import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { ListUserComponent } from './list-user.component';
import { Role } from '../../../core/models/role.enum';
import { User } from '../../../core/models/user.interface';
import baseUrl from '../../../core/service/helper';

describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;
  let httpMock: HttpTestingController;

  const users: User[] = [
    { id: 1, username: 'ana.gomez', email: 'ana@example.com', role: Role.ADMIN, enabled: true, createdAt: '2026-01-01' },
    { id: 2, username: 'beto.diaz', email: 'beto@example.com', role: Role.CLIENT, enabled: false, createdAt: '2026-01-02' },
  ];

  function flushInitialUsers(): void {
    const req = httpMock.expectOne(`${baseUrl}/api/v1/users`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: users });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUserComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DialogService,
        { provide: CookieService, useValue: { get: () => '', set: () => {}, delete: () => {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    flushInitialUsers();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('refresh() populates dataSource and a shallow-cloned tableDataSource, then applies filters', () => {
    expect(component.dataSource.length).toBe(2);
    expect(component.tableDataSource.length).toBe(2);
    expect(component.tableDataSource[0]).not.toBe(component.dataSource[0]);
    expect(component.tableDataSource[0]).toEqual(component.dataSource[0]);
    expect(component.filteredDataSource.length).toBe(2);
    expect(component.filteredTableDataSource.length).toBe(2);
  });

  it('applyFilters matches by username substring', () => {
    component.searchTerm = 'ana';
    component.applyFilters();
    expect(component.filteredDataSource.length).toBe(1);
    expect(component.filteredDataSource[0].username).toBe('ana.gomez');
    expect(component.filteredTableDataSource.length).toBe(1);
  });

  it('applyFilters matches by email substring', () => {
    component.searchTerm = 'beto@example';
    component.applyFilters();
    expect(component.filteredDataSource.length).toBe(1);
    expect(component.filteredDataSource[0].email).toBe('beto@example.com');
  });

  it('applyFilters with an empty searchTerm returns the full dataset', () => {
    component.searchTerm = 'ana';
    component.applyFilters();
    expect(component.filteredDataSource.length).toBe(1);

    component.searchTerm = '';
    component.applyFilters();
    expect(component.filteredDataSource.length).toBe(2);
  });

  it('applyFilters matches by selectedRole', () => {
    component.selectedRole = Role.CLIENT;
    component.applyFilters();
    expect(component.filteredDataSource.length).toBe(1);
    expect(component.filteredDataSource[0].role).toBe(Role.CLIENT);
  });

  it('editUser refreshes the list when the dialog closes with a truthy result', () => {
    const onClose = new Subject<any>();
    spyOn(TestBed.inject(DialogService), 'open').and.returnValue({ onClose } as any);

    component.editUser(users[0]);
    onClose.next(true);

    const req = httpMock.expectOne(`${baseUrl}/api/v1/users`);
    expect(req.request.method).toBe('GET');
    req.flush({ data: users });
  });

  it('editUser does not refresh the list when the dialog closes with a falsy result', () => {
    const onClose = new Subject<any>();
    spyOn(TestBed.inject(DialogService), 'open').and.returnValue({ onClose } as any);

    component.editUser(users[0]);
    onClose.next(false);

    httpMock.expectNone(`${baseUrl}/api/v1/users`);
  });

  it('eliminarUser removes the user from dataSource/tableDataSource and re-applies filters', fakeAsync(() => {
    spyOn(Swal, 'fire').and.resolveTo({ isConfirmed: true } as any);

    component.eliminarUser(users[0]);
    tick();

    const deleteReq = httpMock.expectOne(`${baseUrl}/api/v1/users/1`);
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({ data: null });
    tick();

    expect(component.dataSource.find((u) => u.id === 1)).toBeUndefined();
    expect(component.tableDataSource.find((u) => u.id === 1)).toBeUndefined();
    expect(component.filteredDataSource.find((u) => u.id === 1)).toBeUndefined();
  }));
});
