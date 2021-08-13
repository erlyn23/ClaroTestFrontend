import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassRoomsAssingmentsComponent } from './components/class-rooms-assingments/class-rooms-assingments.component';
import { ClassRoomsComponent } from './components/class-rooms/class-rooms.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: TeachersComponent
},
{
  path: 'teachers',
  component: TeachersComponent
},
{
  path: 'students',
  component: StudentsComponent
},
{
  path: 'classRooms',
  component: ClassRoomsComponent
},
{
  path: 'assignments',
  component: ClassRoomsAssingmentsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
