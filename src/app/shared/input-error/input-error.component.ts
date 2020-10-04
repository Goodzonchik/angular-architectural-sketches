import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { InputErrorService } from './input-error.service';
import inputErrors from './input-errors';

@Component({
  selector: 'input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css'],
})
export class InputErrorComponent implements OnInit {
  @Input() control: FormControl | undefined;
  @Input() expression = true;
  @Input() errorMessage = '';

  showError = false;

  constructor(private readonly inputErrorService: InputErrorService) {}

  ngOnInit() {
    this.inputErrorService.getShowError().subscribe((result: boolean) => {
      this.showError = result;
    });

    if (this.control) {
      this.control.statusChanges.subscribe((value) => {
        if (value === 'INVALID') {
          const x = this.control
            ? inputErrors.get(
                Object.keys(
                  this.control && this.control.errors ? this.control.errors : {},
                ).toString(),
              )
            : '';
          this.errorMessage = x ? x : '';
        }
      });
    }
  }
}
