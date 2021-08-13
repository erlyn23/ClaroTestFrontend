import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {

  protected url!: string;
  httpOptions = { headers: new HttpHeaders({"content-type": "application/json"}) };
  
  constructor(protected http: HttpClient) { 
  }

  getAll() : Observable<T[]>{
    return this.http.get<T[]>(this.url, this.httpOptions);
  }

  getOne(entityId: number) : Observable<T>{
    return this.http.get<T>(`${this.url}/${entityId}`, this.httpOptions);
  } 

  post(entity: T) : Observable<T>{
    return this.http.post<T>(this.url, entity, this.httpOptions);
  }

  put(entity: T) : Observable<T>{
    return this.http.put<T>(this.url, entity, this.httpOptions);
  }

  delete(entityId: number) : Observable<T>{
    return this.http.delete<T>(`${this.url}/${entityId}`, this.httpOptions);
  }

}
