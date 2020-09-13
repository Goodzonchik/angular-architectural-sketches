import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TodoAny, organizationPath } from '@utils'; // Утилиты объединены в alias и объединены одним импортом
import { RouteBaseService } from './route-base.service';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  root = '/';

  organization: RouteBaseService;
  employee: TodoAny; // Конкретно здесь было лень вывести кокретный тип, TodoAny показывает, что нужно исправить

  constructor(private readonly router: Router) {
    this.organization = new RouteBaseService(organizationPath); // organizationPath - используется в другом месте проекта (на самом деле нет, но можно предположить) и имеет смысл в ее выносе.
    this.employee = new RouteBaseService('employee'); // Нет смысла выносить строку в константу или куда-нибудь еще, если она используется только здесь
  }

  // В проекте использовать метод navigate, чтобы не пробрасывать везде @angular/router
  navigate(route: any[]) {
    this.router.navigate(route);
  }

  // Пример общего метода роутинга
  download(fileId: any) {
    // логика скачивания
  }
}
