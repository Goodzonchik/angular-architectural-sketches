import { Injectable } from '@angular/core';

import { deepEqual } from 'fast-equals';

import { BackendOrganizationService } from '../backend-organization.service';
import { TodoAny } from '@utils';
import { Subject } from 'rxjs';

// Инжектируется по месту использования, а не в root.
@Injectable()
export class OrganizationService {
  // Внутренний стейт-сущности
  private organization: TodoAny; // Данные, которые меняются только при загрузке с бэка или при сохранении.
  // в примере сотрудники и организации передаются в организации, в зависимости от ситуации их можно вынести в отдельный сервис.
  private changedModel: TodoAny; // Текущая измененная модель организации

  // Subject для состояния
  private organizationSubject$ = new Subject();
  private hasMainChange$ = new Subject();
  private hasEmployeeAndSubdivisionChange$ = new Subject();

  constructor(private backendOrganizationService: BackendOrganizationService) {
    // Загрузка данных с бэкенда
    this.backendOrganizationService.loadOrganization().subscribe((data: TodoAny) => {
      this.organization = data;
      this.organizationSubject$.next(this.organization);
    });

    // Также можно сделать проверку, если добавление, то не загрузка данных, а подстановка изначальных значений
  }

  // Передаем организацию
  // По необходимости можно выделить подсущности организации
  getOrganization() {
    return this.organizationSubject$.asObservable();
  }

  // Также храним в сервисе состояние данных
  getOrganizationHasChange() {
    return this.hasMainChange$.asObservable();
  }

  getEmployeeAndSubdivisionHasChange() {
    return this.hasEmployeeAndSubdivisionChange$.asObservable();
  }

  save(organizationRequest?: TodoAny) {
    // отправляемые данные отдельно выделены в константу/переменную - request
    // в метод отправки данных отправляется только переменная
    const savingData = Object.assign(
      {},
      this.changedModel || this.organization,
      organizationRequest,
    );
    // TODO если здесь необходимо добавить/удалить поле или смапить данные, то this.backendOrganizationService.saveOrganization(savingData) не будет затронуто
    this.backendOrganizationService.saveOrganization(savingData).subscribe((data: TodoAny) => {
      this.afterSaving(data);
    });
  }

  // Метод нужен, если нужно из компонента выполнить какие-то действия после сохранения
  saveWithSubscribe() {
    return this.backendOrganizationService.saveOrganization(this.changedModel);
  }

  // Метод вызывается после сохранения для обновления данных, а также используется как callback, если был использован метод .saveWithSubscribe()
  afterSaving(data: TodoAny) {
    this.organization = data;
    this.changedModel = this.organization;
    this.organizationSubject$.next(this.organization);
    this.hasMainChange$.next(this.checkMainInfoChange());
    this.hasEmployeeAndSubdivisionChange$.next(this.checkEmployeeAndSubdevisionChange());
  }

  // Обновляем данные модели
  updateOrganization(data: TodoAny) {
    if (data) {
      this.changedModel = Object.assign({}, this.changedModel, data);
      this.hasMainChange$.next(this.checkMainInfoChange());
    }
  }

  updateEmployeeAndSubdevision(data: TodoAny) {
    if (data) {
      this.changedModel = Object.assign({}, this.changedModel, data);
      this.hasEmployeeAndSubdivisionChange$.next(this.checkEmployeeAndSubdevisionChange());
    }
  }

  // При отмене подставляем первоначальную версию сущности
  cancel(): void {
    this.updateOrganization(this.organization);
    this.organizationSubject$.next(this.organization);
  }

  // Различные проверки, которые описывают состояние стейта-сущности
  private checkMainInfoChange(): boolean {
    return !deepEqual(
      this.getMainOrganizationInfo(this.organization),
      this.getMainOrganizationInfo(this.changedModel),
    );
  }

  private checkEmployeeAndSubdevisionChange(): boolean {
    return (
      this.changedModel.employeeCount !== this.organization.employeeCount ||
      this.changedModel.subdivisionCount !== this.organization.subdivisionCount
    );
  }

  private getMainOrganizationInfo(data: TodoAny) {
    const mainInfo = { ...data };
    delete mainInfo.employeeCount;
    delete mainInfo.subdivisionCount;
    return mainInfo;
  }
}
