import { Component } from '@angular/core';

import { RouteService } from '../../route/route.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Пример использования routeService
  menuItems = [
    {
      route: this.routeService.organization.card(1),
      title: 'Организации',
    },
    {
      route: this.routeService.organization.registry,
      title: 'Сотрудники',
    },
    {
      route: this.routeService.organization.add,
      title: 'Договора',
    },
    {
      route: this.routeService.organization.edit(1),
      title: 'Настройки',
    },
  ];

  constructor(public routeService: RouteService) {}
}
