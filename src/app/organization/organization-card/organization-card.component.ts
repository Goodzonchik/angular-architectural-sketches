import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { OrganizationService } from '@shared/states/organization.service';

import { TodoAny } from '@utils';

@Component({
  selector: 'organization-card',
  templateUrl: './organization-card.component.html',
  styleUrls: ['./organization-card.component.scss'],
  providers: [OrganizationService],
})
export class OrganizationCardComponent implements OnInit {
  /*
    В компоненте нет сущности Organization
    Organization и измененный выриант сущности находятся в OrganizationService

    Компонент получает данные из сервиса только для инициализации формы
    И отправляет измененную форму.

    Хранит в себе только те данные, которые влияют на его state.
  */

  form: FormGroup;
  hasChange = false;

  constructor(
    private organizationService: OrganizationService,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      shortName: [null],
      fullName: [null],
      director: this.formBuilder.group({
        firstName: [null],
        secondName: [null],
        lastName: [null],
      }),
      createDate: [null],
    });
  }

  ngOnInit() {
    this.organizationService.getOrganization().subscribe((data: TodoAny) => {
      this.form.patchValue(data);
    });

    this.organizationService.getOrganizationHasChange().subscribe((hasChange: TodoAny) => {
      this.hasChange = hasChange;
    });

    this.form.valueChanges.subscribe((formData: TodoAny) => {
      this.organizationService.updateOrganization(formData);
    });
  }

  save() {
    this.organizationService.save(this.form.getRawValue());
  }

  cancel() {
    this.organizationService.cancel();
  }
}
