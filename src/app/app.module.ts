import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsComponent } from './components/students/students.component';
import { ClassRoomsComponent } from './components/class-rooms/class-rooms.component';
import { ClassRoomsAssingmentsComponent } from './components/class-rooms-assingments/class-rooms-assingments.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AddTeacherComponent } from './components/teachers/add-teacher/add-teacher.component';
import { ConfirmDeleteComponent } from './core/confirm-delete/confirm-delete.component';
import { AddStudentComponent } from './components/students/add-student/add-student.component';
import { AddClassRoomComponent } from './components/class-rooms/add-class-room/add-class-room.component';
import { AddClassRoomAssignmentComponent } from './components/class-rooms-assingments/add-class-room-assignment/add-class-room-assignment.component';
import { MatChip } from '@angular/material/chips';
@NgModule({
  declarations: [
    AppComponent,
    TeachersComponent,
    StudentsComponent,
    ClassRoomsComponent,
    ClassRoomsAssingmentsComponent,
    AddTeacherComponent,
    ConfirmDeleteComponent,
    AddStudentComponent,
    AddClassRoomComponent,
    AddClassRoomAssignmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [MatChip],
  bootstrap: [AppComponent]
})
export class AppModule { }
