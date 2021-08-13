import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassRoomAssignments } from '../models/class-room-assignments.interface';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService extends GenericService<ClassRoomAssignments> {

  url: string = environment.endpoints.assignments;
  
  constructor(protected http: HttpClient) {
    super(http);
  }
}
