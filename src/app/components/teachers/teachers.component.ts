import { Component, AfterViewInit, ViewChild, OnDestroy, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/core/confirm-delete/confirm-delete.component';
import { Teacher } from 'src/app/models/teacher.interface';
import { TeachersService } from 'src/app/services/teachers.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements AfterViewInit, OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  teacher$: Subscription = new Subscription();

  teachers: Teacher[] = [];

  displayedColumns: string[] = ['Nombre', 'Teléfono', 'Email', 'Acciones'];
  dataSource: MatTableDataSource<Teacher> = new MatTableDataSource<Teacher>(this.teachers);

  constructor(private teacherService: TeachersService,
    private utilityService: UtilityService) { }

  ngOnInit() : void {
    this.getTeachers();
  }

  getTeachers(){
    this.teacher$.add(

      this.teacherService.getAll().subscribe(result=>{
        if(result){
          this.teachers = result;
          this.dataSource.data = this.teachers;
        }
      }, error=>{
        console.log(error);
      })

    );
  }

  ngAfterViewInit(): void {
     this.dataSource.paginator = this.paginator;
  }

  addTeacher(){
    const addTeacherDialog = this.utilityService.openDialog<Teacher>(AddTeacherComponent);

    addTeacherDialog.afterClosed().subscribe(teacher=>{
      if(teacher){
        const sendTeacher: Teacher = {
          id: 0,
          fullName: teacher.fullName,
          phone: teacher.phone,
          email: teacher.email
        };

        this.teacherService.post(sendTeacher).toPromise().then(result=>{
          if(result) {
            this.utilityService.openSnackBar('Maestro guardado correctamente', 'success-snackbar');
            this.getTeachers();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar('Ha ocurrido un error al guardar maestro', 'error-snackbar');
          console.log(error);
        });
      }
    });
  }

  editTeacher(teacher: Teacher){
    const editTeacherDialog = this.utilityService.openDialog<Teacher>(AddTeacherComponent, teacher);

    editTeacherDialog.afterClosed().subscribe((result: Teacher)=>{
      if(result){
        const sendTeacher: Teacher = {
          id: teacher.id,
          fullName: result.fullName,
          email: result.email,
          phone: result.phone
        };

        this.teacherService.put(sendTeacher).toPromise().then(response=>{
          if(response){
            this.utilityService.openSnackBar('Maestro modificado correctamente', 'success-snackbar');
            this.getTeachers();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar(error.error.message, 'error-snackbar');
          console.log(error);
        })
      }
    });
  }

  deleteTeacher(teacherId: number){
    const deleteTeacherDialog = this.utilityService.openDialog(ConfirmDeleteComponent, teacherId);

    deleteTeacherDialog.afterClosed().subscribe((result: boolean)=>{
      if(result){
        this.teacherService.delete(teacherId).toPromise().then(response=>{
          if(response){
            this.utilityService.openSnackBar('Maestro eliminado correctamente', 'success-snackbar');
            this.getTeachers();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar(error.error.message, 'error-snackbar');
          console.log(error);
        })
      }
    });
  }

  ngOnDestroy(): void{
    this.teacher$.unsubscribe();
  }

}