import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';

// Импорты с учетом alias-ов
import { OrganizationService } from '@shared';
import { TodoAny } from '@utils';

@Component({
  selector: 'organization-card',
  templateUrl: './organization-card.component.html',
  providers: [OrganizationService],
})
export class OrganizationCardComponent implements OnInit, OnDestroy {
  /*
    В компоненте нет сущности Organization
    Organization и измененный выриант сущности находятся в OrganizationService

    Компонент получает данные из сервиса только для инициализации формы
    И отправляет измененную форму в сервис.

    Хранит в себе только те данные, которые влияют на его state.
  */

  form: FormGroup;
  hasChange = false;

  private organization$: Subscription;

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

    // Подписались на изменения организации
    this.organization$ = this.organizationService.getOrganization().subscribe((data: TodoAny) => {
      this.form.patchValue(data);
    });
  }

  ngOnInit() {
    // Подписываемся на получение состояния "hasChange", нужен Subscription, но уже один есть для организации
    this.organizationService.getOrganizationHasChange().subscribe((hasChange: TodoAny) => {
      this.hasChange = hasChange;
    });

    // Отправляем данные в сервис при изменении данных
    this.form.valueChanges.subscribe((formData: TodoAny) => {
      this.organizationService.updateOrganization(formData);
    });
  }

  save() {
    // Вызываем метод сохранения сервиса, а остальное обновление идет через подписку
    this.organizationService.save(this.form.getRawValue());
  }

  cancel() {
    // Вызываем метод отмены сервиса, а остальное обновление идет через подписку
    this.organizationService.cancel();
  }

  ngOnDestroy(): void {
    // Отписались изменения организации
    this.organization$.unsubscribe();
  }
}
