import { Component, OnInit } from '@angular/core';

import { RouteService } from '@shared/route/route.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems = [
    {
      route: this.routeService.organization.card(1),
      title: 'Организации',
    },
    {
      route: this.routeService.organization.card(1),
      title: 'Сотрудники',
    },
    {
      route: this.routeService.organization.card(1),
      title: 'Договора',
    },
    {
      route: this.routeService.organization.card(1),
      title: 'Настройки',
    },
  ];

  constructor(public routeService: RouteService) {}

  ngOnInit() {}
}
