import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-stop-modal-training',
    template:
        `
        <h1 mat-dialog-title>Are you sure?</h1>
        <mat-dialog-content>
            <p>You already got {{ passedData.progressSpinner }}%</p>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-flat-button color="accent" [mat-dialog-close]="true">Yes</button>
            <button mat-flat-button color="primary" [mat-dialog-close]="false">No</button>
        </mat-dialog-actions>
    `
})
export class StopTrainingModalComponent {
    // Los valores de mat-dialog-close no tienen porque ser necesariamente true o false
    // get data in a modal
    constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }
}