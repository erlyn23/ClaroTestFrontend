import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/core/confirm-delete/confirm-delete.component';
import { Student } from 'src/app/models/student.interface';
import { StudentsService } from 'src/app/services/students.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddStudentComponent } from './add-student/add-student.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  student$: Subscription = new Subscription();

  students: Student[] = [];

  displayedColumns: string[] = ['Nombre', 'Teléfono', 'Email', 'Matrícula', 'Acciones'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>(this.students);

  constructor(private studentService: StudentsService, 
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(){
    this.studentService.getAll().subscribe(result=>{
      if(result) {
        this.students = result;
        this.dataSource.data = this.students;
      }
    }, error=>{
      this.utilityService.openSnackBar('Ha ocurrido un error al obtener estudiantes', 'error-snackbar');
    });
  }

  addStudent(){
    const addStudentDialog = this.utilityService.openDialog<Student>(AddStudentComponent);

    addStudentDialog.afterClosed().subscribe(student=>{
      if(student){
        const sendStudent: Student = {
          id: 0,
          fullName: student.fullName,
          phone: student.phone,
          email: student.email,
          enrollment: student.enrollment
        };

        this.studentService.post(sendStudent).toPromise().then(result=>{
          if(result) {
            this.utilityService.openSnackBar('Estudiante guardado correctamente', 'success-snackbar');
            this.getStudents();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar('Ha ocurrido un error al guardar estudiante', 'error-snackbar');
          console.log(error);
        });
      }
    });
  }

  editStudent(student: Student){
    const editStudentDialog = this.utilityService.openDialog<Student>(AddStudentComponent, student);

    editStudentDialog.afterClosed().subscribe((result: Student)=>{
      if(result){
        const sendStudent: Student = {
          id: student.id,
          fullName: result.fullName,
          email: result.email,
          phone: result.phone,
          enrollment: student.enrollment
        };

        this.studentService.put(sendStudent).toPromise().then(response=>{
          if(response){
            this.utilityService.openSnackBar('Estudiante modificado correctamente', 'success-snackbar');
            this.getStudents();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar(error.error.message, 'error-snackbar');
          console.log(error);
        })
      }
    });
  }

  deleteStudent(studentId: number){
    const deleteStudentDialog = this.utilityService.openDialog(ConfirmDeleteComponent, studentId);

    deleteStudentDialog.afterClosed().subscribe((result: boolean)=>{
      if(result){
        this.studentService.delete(studentId).toPromise().then(response=>{
          if(response){
            this.utilityService.openSnackBar('Estudiante eliminado correctamente', 'success-snackbar');
            this.getStudents();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar(error.error.message, 'error-snackbar');
          console.log(error);
        })
      }
    });
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(){
    this.student$.unsubscribe();
  }

}
