import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  
  studentForm!: FormGroup;
  private fullNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  private emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private matDialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    private formBuilder: FormBuilder) { }

    ngOnInit() : void{

      this.initForm();

      if(this.data.data){
          this.studentForm.controls.fullName.setValue(this.data.data.fullName);
          this.studentForm.controls.email.setValue(this.data.data.email);
          this.studentForm.controls.phone.setValue(this.data.data.phone);
          this.studentForm.controls.enrollment.setValue(this.data.data.enrollment);
          this.studentForm.controls.enrollment.disable({onlySelf: true});
      }
    }

    private initForm() : void{
      this.studentForm = this.formBuilder.group({
          fullName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this.fullNameRegex)]],
          email: ["", [Validators.maxLength(50), Validators.pattern(this.emailRegex)]],
          phone: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(20)]],
          enrollment: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      });
  }

  isValidField(field: string) : string {
    const validField = this.studentForm.get(field);

    const isValid = (!validField?.valid || validField?.touched) ? 'invalid' : validField?.touched ? 'valid' : ''; 
    return isValid;
  }

  onClose() : void{
      this.matDialogRef.close();
  }

}
