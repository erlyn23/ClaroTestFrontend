import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ClassRoomAssignments } from 'src/app/models/class-room-assignments.interface';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddClassRoomAssignmentComponent } from './add-class-room-assignment/add-class-room-assignment.component';

@Component({
  selector: 'app-class-rooms-assingments',
  templateUrl: './class-rooms-assingments.component.html',
  styleUrls: ['./class-rooms-assingments.component.scss']
})
export class ClassRoomsAssingmentsComponent implements OnInit, AfterViewInit, OnDestroy {

  classRoomAssignment$: Subscription = new Subscription();
  classRoomAssignments: ClassRoomAssignments[] = [];

  displayedColumns: string[] = ['Estudiante', 'Maestro', 'Curso', 'Día', 'Hora de inicio', 'Hora de fin'];
  dataSource: MatTableDataSource<ClassRoomAssignments> = new MatTableDataSource<ClassRoomAssignments>(this.classRoomAssignments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private classRoomAssignmentService: AssignmentsService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getClassRoomAssignments();
  }

  getClassRoomAssignments(){
    this.classRoomAssignment$.add(

      this.classRoomAssignmentService.getAll().subscribe(result=>{
        if(result){
          this.classRoomAssignments = result;
          this.dataSource.data = result;
        }
      }, error=>{
        this.utilityService.openSnackBar('Ha ocurrido un error al obtener asignaciones', 'error-snackbar');
        console.log(error);
      })


    );
  }

  doAssignment(){
    const addAssignmentDialog = this.utilityService.openDialog(AddClassRoomAssignmentComponent);

    addAssignmentDialog.afterClosed().subscribe(result=>{
      if(result){
        for(let temporalStudent of result.temporalStudents){
          
          let sendAssignment: ClassRoomAssignments = {
            id: 0,
            teacherId: result.formValue.teacherId,
            studentId: temporalStudent.id,
            classRoomId: result.formValue.classRoomId,
            dayOfWeekId: result.formValue.dayOfWeekId,
            startHour: result.formValue.startHour,
            endHour: result.formValue.endHour
          };
  
          this.classRoomAssignmentService.post(sendAssignment).toPromise().then(response=>{
            if(response){
              this.utilityService.openSnackBar('Asignación hecha correctamente', 'success-snackbar');
              this.getClassRoomAssignments();
            }
          }).catch(error=>{
            this.utilityService.openSnackBar(error.error.message, 'error-snackbar');
            console.log(error);
          });
        }
      }
    });
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void{
    this.classRoomAssignment$.unsubscribe();
  }

}
