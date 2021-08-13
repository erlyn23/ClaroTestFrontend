import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClassRoom } from '../models/class-room.interface';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClassRoomsService extends GenericService<ClassRoom> {

  url: string = environment.endpoints.classRooms;
  
  constructor(protected http: HttpClient) {
    super(http);
  }
}
