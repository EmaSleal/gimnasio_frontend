import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class MuscularGroupService {

  constructor(private http: HttpClient) { }

  public getMuscularGroups(){
    return this.http.get(`${baseUrl}/muscularGroup/all`);
  }


}
