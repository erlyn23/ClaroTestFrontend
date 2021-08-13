import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {


    constructor(private matSnack: MatSnackBar, private matDialog: MatDialog){

    }

    openSnackBar(message: string, styleClass: string){
        this.matSnack.open(message, '', {
            duration: 3000,
            panelClass: styleClass
        });
    }

    openDialog<T>(component: ComponentType<unknown>, data?: T){
        const dialogRef = this.matDialog.open(component, {
            width: '300px',
            data: { data }
        });

        return dialogRef;
    }

}