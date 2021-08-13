import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Teacher } from '../models/teacher.interface';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class TeachersService extends GenericService<Teacher> {

  url: string = environment.endpoints.teachers;
  
  constructor(protected http: HttpClient) {
    super(http);
  }
}
