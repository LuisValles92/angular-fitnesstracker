import { NgModule } from "@angular/core";

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [MatFormFieldModule, MatSelectModule, MatButtonModule, MatTooltipModule, MatIconModule],
    exports: [MatFormFieldModule, MatSelectModule, MatButtonModule, MatTooltipModule, MatIconModule]
})
export class MaterialModule { }