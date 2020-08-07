import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
})
export class OrganizationCardComponent implements OnInit {
  organization = {
    shortName: 'Рога и Копыта',
    fullName: 'ОАО Федеральная компания торговли сыповыми заготовками "Рога и Копыта"',
    director: {
      firstName: 'Иван',
      secondName: 'Иванович',
      lastName: 'Иванов',
    },
    createDate: new Date(1998, 4, 7),
  };

  constructor() {}

  ngOnInit() {}
}
