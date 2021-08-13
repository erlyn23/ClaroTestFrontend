import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Student } from '../models/student.interface';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService extends GenericService<Student> {

  url: string = environment.endpoints.students;
  
  constructor(protected http: HttpClient) { 
    super(http);
  }
}
