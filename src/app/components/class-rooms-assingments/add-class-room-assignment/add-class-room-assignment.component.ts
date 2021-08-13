import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClassRoom } from 'src/app/models/class-room.interface';
import { Student } from 'src/app/models/student.interface';
import { Teacher } from 'src/app/models/teacher.interface';
import { ClassRoomsService } from 'src/app/services/class-rooms.service';
import { StudentsService } from 'src/app/services/students.service';
import { TeachersService } from 'src/app/services/teachers.service';

export interface DayOfWeek {
  id: number;
  day: string;
}

@Component({
  selector: 'app-add-class-room-assignment',
  templateUrl: './add-class-room-assignment.component.html',
  styleUrls: ['./add-class-room-assignment.component.scss']
})
export class AddClassRoomAssignmentComponent implements OnInit, OnDestroy {


  subscription$: Subscription = new Subscription();

  daysOfWeek: DayOfWeek[] = [
    { id: 1, day: 'Lunes' },
    {id: 2, day: 'Martes'},
    {id: 3, day: 'Miércoles'},
    {id: 4, day: 'Jueves'},
    {id: 5, day: 'Viernes'},
    {id: 6, day: 'Sábado'},
    {id: 7, day: 'Domingo'}
  ]

  teachers:Teacher[] = [];
  students: Student[] = [];
  temporalStudents: Student[] = [];
  classRooms: ClassRoom[] = [];

  assignmentForm!: FormGroup;

  constructor(private matDialogRef: MatDialogRef<AddClassRoomAssignmentComponent>, 
    @Inject(MAT_DIALOG_DATA) public data : any,
    private studentService: StudentsService,
    private teacherService: TeachersService,
    private classRoomService: ClassRoomsService,
    private formBuilder:FormBuilder) { 

    }

  ngOnInit(): void {

    this.initForm();

    this.getTeachers();
    this.getStudents();
    this.getClassRooms();

  }

  private initForm():void{
    this.assignmentForm = this.formBuilder.group({
      teacherId: ["", [Validators.required]],
      studentId: ["", [Validators.required]],
      classRoomId: ["", [Validators.required]],
      dayOfWeekId: ["", [Validators.required]],
      startHour: ["", [Validators.required]],
      endHour: ["", [Validators.required]]
    });
  }

  getTeachers(){
    this.subscription$.add(

      this.teacherService.getAll().subscribe(result=>{
        if(result) this.teachers = result;
      })

    );
  }

  getStudents(){
    this.subscription$.add(

      this.studentService.getAll().subscribe(result=>{
        if(result) this.students = result;
      })

    );
  }

  getClassRooms(){
    this.subscription$.add(

      this.classRoomService.getAll().subscribe(result=>{
        if(result) this.classRooms = result;
      })

    );
  }

  selectStudent(event: CustomEvent<number>){
    const studentId = this.assignmentForm.value.studentId;
    const selectedStudent = this.students.filter(student => student.id === studentId);
    
    this.temporalStudents.push(selectedStudent[0]);

    this.students = this.students.filter(student=> student.id !== studentId);

    this.assignmentForm.controls.studentId.clearValidators();
  }

  removeStudent(student: Student){
    
    const studentIndex = this.temporalStudents.indexOf(student);

    if(studentIndex >= 0){
      this.temporalStudents.splice(studentIndex, 1);
      this.students.push(student);
    }

    if(this.temporalStudents.length === 0) this.assignmentForm.controls.studentId.setValidators(Validators.required);
  }

  onClose():void{
    this.matDialogRef.close();
  }

  isValidField(field: string) : string {
    const validField = this.assignmentForm.get(field);

    const isValid = (!validField?.valid || validField?.touched) ? 'invalid' : validField?.touched ? 'valid' : ''; 
    return isValid;
  }

  ngOnDestroy():void{
    this.subscription$.unsubscribe();
  }

}
