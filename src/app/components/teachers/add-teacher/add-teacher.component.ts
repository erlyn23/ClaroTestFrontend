import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Teacher } from 'src/app/models/teacher.interface';

@Component({
    selector: 'app-add-teacher',
    templateUrl: './add-teacher.component.html',
    styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit{

    teacherForm!: FormGroup;
    private fullNameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    private emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private matDialogRef: MatDialogRef<AddTeacherComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any,
        private formBuilder: FormBuilder){ }

    ngOnInit() : void{

        this.initForm();

        if(this.data){
            this.teacherForm.controls.fullName.setValue(this.data.data.fullName);
            this.teacherForm.controls.email.setValue(this.data.data.email);
            this.teacherForm.controls.phone.setValue(this.data.data.phone);
        }
    }

    private initForm() : void{
        this.teacherForm = this.formBuilder.group({
            fullName: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(this.fullNameRegex)]],
            email: ["", [Validators.maxLength(50), Validators.pattern(this.emailRegex)]],
            phone: ["", [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(20)]]
        });
    }

    isValidField(field: string) : string {
        const validField = this.teacherForm.get(field);

        const isValid = (!validField?.valid || validField?.touched) ? 'invalid' : validField?.touched ? 'valid' : ''; 
        return isValid;
    }

    onClose() : void{
        this.matDialogRef.close();
    }
}