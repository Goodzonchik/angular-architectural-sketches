import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class InputErrorService {
  private showErrorSubject$ = new Subject<boolean>();

  getShowError() {
    return this.showErrorSubject$.asObservable();
  }
}
