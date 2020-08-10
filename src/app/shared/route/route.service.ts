import { Injectable } from '@angular/core';

import { TodoAny, organizationPath } from '@utils'; // Утилиты объединены в alias и объединены одним импортом
import { RouteBaseService } from './route-base.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  root = '/';

  organization: RouteBaseService;
  employee: TodoAny; // Конкретно здесь было лень вывести кокретный тип, TodoAny показывает, что нужно исправить

  constructor() {
    this.organization = new RouteBaseService(organizationPath); // organizationPath - используется в другом месте проекта (на самом деле нет, но можно предположить) и имеет смысл в ее выносе.
    this.employee = new RouteBaseService('employee'); // Нет смысла выносить строку в константу или куда-нибудь еще, если она используется только здесь
  }
}
