import { Injectable } from "@angular/core";

import { RouteBaseService } from "./route-base.service";
import { TODO_ANY, organizationPath } from "@utils"; // Утилиты объединены в alias и объединены одним импортом

@Injectable({
  providedIn: "root",
})
export class RouteService {
  root = "/";

  organization: TODO_ANY; //Конкретно здесь было лень вывести кокретный тип
  employee: TODO_ANY; //Конкретно здесь было лень вывести кокретный тип

  constructor() {
    this.organization = new RouteBaseService(organizationPath);
    this.employee = new RouteBaseService("employee"); // Нет смысла выносить строку в константу или куда-нибудь еще
  }
}
