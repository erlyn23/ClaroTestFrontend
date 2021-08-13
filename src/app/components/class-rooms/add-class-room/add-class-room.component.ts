import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-add-class-room',
  templateUrl: './add-class-room.component.html',
  styleUrls: ['./add-class-room.component.scss']
})
export class AddClassRoomComponent implements OnInit {

  classRoomForm!: FormGroup;
  constructor(private matDialogRef: MatDialogRef<AddClassRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    if(this.data.data){
      this.classRoomForm.controls.name.setValue(this.data.data.name);
      this.classRoomForm.controls.code.setValue(this.data.data.code);
      this.classRoomForm.controls.description.setValue(this.data.data.description);
      this.classRoomForm.controls.teachersQuantity.setValue(this.data.data.teachersQuantity);
      this.classRoomForm.controls.studentsQuantity.setValue(this.data.data.studentsQuantity);
      
      this.classRoomForm.controls.code.disable({onlySelf: true});
    }
  }

  private initForm() : void{
    this.classRoomForm = this.formBuilder.group({
        name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        code: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        description: ["", [Validators.maxLength(100)]],
        teachersQuantity: ["", [Validators.required, Validators.pattern("[0-9]*")]],
        studentsQuantity: ["", [Validators.required, Validators.pattern("[0-9]*")]]
    });
  }

  isValidField(field: string) : string {
    const validField = this.classRoomForm.get(field);

    const isValid = (!validField?.valid || validField?.touched) ? 'invalid' : validField?.touched ? 'valid' : ''; 
    return isValid;
  }

  onClose() : void{
      this.matDialogRef.close();
  }

}
