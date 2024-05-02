import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MuscularGroupService {

  constructor(private http: HttpClient) { }

  public getMuscularGroups(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/muscularGroup/all`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }


  public saveMuscularGroup(muscularGroup: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${baseUrl}/muscularGroup/save`, muscularGroup)
        .subscribe(
          (res) => {
            Swal.fire('Success', 'Muscular Group saved successfully', 'success');
          },
          (err) => {
            Swal.fire('Error', 'Muscular Group not saved', 'error');
          }
        );
    });
  }

  public deleteMuscularGroup(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${baseUrl}/muscularGroup/delete/${id}`).subscribe(
        (res) => {
          Swal.fire('Success', 'Muscular Group deleted successfully', 'success');
        },
        (err) => {
          Swal.fire('Error', 'Muscular Group not deleted', 'error');
        }
      );
    });
  }

  public getMuscularGroup(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${baseUrl}/muscularGroup/id/${id}`).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
          Swal.fire('Error', 'Muscular Group not found', 'error');
        }
      );
    });
  }

  public updateMuscularGroup(muscularGroup: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${baseUrl}/muscularGroup/update`, muscularGroup)
        .subscribe(
          (res) => {
            console.log(res);
            Swal.fire('Success', 'Muscular Group updated successfully', 'success');
          },
          (err) => {
            console.log(err);
            Swal.fire('Error', 'Muscular Group not updated', 'error');
          }
        );
    });
  }

}
