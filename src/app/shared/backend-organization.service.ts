import { Injectable } from '@angular/core';

import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { TodoAny } from '@utils';

/*
Mock сервис, выполняет эмуляцию бэкенда, отдает и принимает данные
Пристальное внимание не требуется
*/

@Injectable({
  providedIn: 'root',
})
export class BackendOrganizationService {
  organization = {
    shortName: 'Рога и Копыта',
    fullName: 'ОАО Федеральная компания торговли сыповыми заготовками "Рога и Копыта"',
    director: {
      firstName: 'Иван',
      secondName: 'Иванович',
      lastName: 'Иванов',
    },
    createDate: new Date(1998, 4, 7),
    employeeCount: 756,
    subdivisionCount: 7,
  };

  loadOrganization(): Observable<TodoAny> {
    return of(this.organization).pipe(delay(250));
  }

  saveOrganization(organization: TodoAny): Observable<TodoAny> {
    this.organization = organization;
    return of(this.organization).pipe(delay(250));
  }
}
