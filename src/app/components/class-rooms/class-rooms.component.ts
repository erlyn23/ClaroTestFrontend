import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/core/confirm-delete/confirm-delete.component';
import { ClassRoom } from 'src/app/models/class-room.interface';
import { ClassRoomsService } from 'src/app/services/class-rooms.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AddClassRoomComponent } from './add-class-room/add-class-room.component';

@Component({
  selector: 'app-class-rooms',
  templateUrl: './class-rooms.component.html',
  styleUrls: ['./class-rooms.component.scss']
})
export class ClassRoomsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  classRoom$: Subscription = new Subscription();

  classRooms: ClassRoom[] = [];

  displayedColumns: string[] = ['Nombre', 'Código', 'Descripción', 'Cantidad máxima de maestros', 'Cantidad máxima de estudiantes', 'Acciones'];
  dataSource: MatTableDataSource<ClassRoom> = new MatTableDataSource<ClassRoom>(this.classRooms);

  constructor(private classRoomService: ClassRoomsService, 
    private utilityService: UtilityService) { }

  
  ngOnInit(): void {
    this.getClassRooms();
  }

  getClassRooms(){
    this.classRoom$.add(

      this.classRoomService.getAll().subscribe(result=>{
        if(result) {
          this.classRooms = result;
          this.dataSource.data = this.classRooms;
        }
      }, error=>{
        this.utilityService.openSnackBar('Ha ocurrido un error al obtener cursos', 'error-snackbar');
      })

    );
  }

  addClassRoom(){
    const classRoomDialog = this.utilityService.openDialog<ClassRoom>(AddClassRoomComponent);

    classRoomDialog.afterClosed().subscribe(classRoom=>{
      if(classRoom){
        const sendClassRoom: ClassRoom = {
          id: 0,
          name: classRoom.name,
          code: classRoom.code,
          description: classRoom.description,
          teachersQuantity: classRoom.teachersQuantity,
          studentsQuantity: classRoom.studentsQuantity
        };

        this.classRoomService.post(sendClassRoom).toPromise().then(result=>{
          if(result) {
            this.utilityService.openSnackBar('Curso guardado correctamente', 'success-snackbar');
            this.getClassRooms();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar('Ha ocurrido un error al guardar curso', 'error-snackbar');
          console.log(error);
        });
      }
    });
  }

  editClassRoom(classRoom: ClassRoom){
    const editClassRoomDialog = this.utilityService.openDialog<ClassRoom>(AddClassRoomComponent, classRoom);

    editClassRoomDialog.afterClosed().subscribe((result: ClassRoom)=>{
      if(result){
        const sendClassRoom: ClassRoom = {
          id: classRoom.id,
          name: result.name,
          code: classRoom.code,
          description: result.description,
          teachersQuantity: result.teachersQuantity,
          studentsQuantity: result.studentsQuantity
        };

        this.classRoomService.put(sendClassRoom).toPromise().then(response=>{
          if(response){
            this.utilityService.openSnackBar('Curso modificado correctamente', 'success-snackbar');
            this.getClassRooms();
          }
        }).catch(error=>{
          this.utilityService.openSnackBar(error.error.message, 'error-snackbar');
          console.log(error);
        })
      }
    });
  }

  deleteClassRoom(classRoomId: number){
    const deleteClassRoomDialog = this.utilityService.openDialog(ConfirmDeleteComponent, classRoomId);

    deleteClassRoomDialog.afterClosed().subscribe((result: boolean)=>{
      if(result){
        this.classRoomService.delete(classRoomId).toPromise().then(response=>{
          if(response){
            this.utilityService.openSnackBar('Curso eliminado correctamente', 'success-snackbar');
            this.getClassRooms();
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
    this.classRoom$.unsubscribe();
  }

}
