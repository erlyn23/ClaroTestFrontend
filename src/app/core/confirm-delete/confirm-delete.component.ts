import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html'
})
export class ConfirmDeleteComponent {

    constructor(private matDialogRef: MatDialogRef<ConfirmDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data : any ){

    }

    onClose(){
        this.matDialogRef.close();
    }
}