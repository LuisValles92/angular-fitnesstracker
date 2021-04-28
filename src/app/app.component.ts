import { Component } from '@angular/core';

import { MatTooltip, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tooltipPositionOptions: TooltipPosition[] = ['above', 'below', 'left', 'right', 'before', 'after'];
  tooltipPosition: FormControl = new FormControl(this.tooltipPositionOptions[0]);// Parameter formState (any) - Initializes the control with an initial value

  constructor() {
    console.log(this.tooltipPosition);
    console.log(this.tooltipPosition.value);
  }

  showReferenceVar(button: MatButton, tooltip: MatTooltip): void {
    console.log(button, tooltip);
    console.log(button._elementRef.nativeElement.textContent);
    console.log(tooltip.message);
  }

}
