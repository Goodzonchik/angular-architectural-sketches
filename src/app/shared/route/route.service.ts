import { Injectable } from '@angular/core';

import { TodoAny, organizationPath } from '@utils'; // Утилиты объединены в alias и объединены одним импортом
import { RouteBaseService } from './route-base.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  root = '/';

  organization: TodoAny; // Конкретно здесь было лень вывести кокретный тип
  employee: TodoAny; // Конкретно здесь было лень вывести кокретный тип

  constructor() {
    this.organization = new RouteBaseService(organizationPath);
    this.employee = new RouteBaseService('employee'); // Нет смысла выносить строку в константу или куда-нибудь еще
  }
}
