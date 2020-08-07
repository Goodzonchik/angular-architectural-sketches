import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { TodoAny } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class BackendOrganizationService {
  loadOrganization(): TodoAny {
    return of({
      shortName: 'Рога и Копыта',
      fullName: 'ОАО Федеральная компания торговли сыповыми заготовками "Рога и Копыта"',
      director: {
        firstName: 'Иван',
        secondName: 'Иванович',
        lastName: 'Иванов',
      },
      createDate: new Date(1998, 4, 7),
    }).pipe(delay(1000));
  }
}
