import { Injectable } from '@angular/core';
import { BackendOrganizationService } from '@shared/backend-organization.service';

import { deepEqual } from 'fast-equals';

import { TodoAny } from '@utils';
import { Subject } from 'rxjs';

@Injectable()
export class OrganizationService {
  private organization: TodoAny;
  private changedModel: TodoAny;
  private organizationSubject$ = new Subject();
  private hasMainChange$ = new Subject();
  private hasEmployeeAndSubdivisionChange$ = new Subject();

  constructor(private backendOrganizationService: BackendOrganizationService) {
    this.backendOrganizationService.loadOrganization().subscribe((data: TodoAny) => {
      this.organization = data;
      this.organizationSubject$.next(this.organization);
    });
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
    this.backendOrganizationService.saveOrganization(savingData).subscribe((data: TodoAny) => {
      this.afterSaving(data);
    });
  }

  saveWithSubscribe() {
    return this.backendOrganizationService.saveOrganization(this.changedModel);
  }

  afterSaving(data: TodoAny) {
    this.organization = data;
    this.changedModel = this.organization;
    this.organizationSubject$.next(this.organization);
    this.hasMainChange$.next(this.checkMainInfoChange());
    this.hasEmployeeAndSubdivisionChange$.next(this.checkEmployeeAndSubdevisionChange());
  }

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

  cancel(): void {
    this.updateOrganization(this.organization);
    this.organizationSubject$.next(this.organization);
  }

  private checkMainInfoChange(): boolean {
    return !deepEqual(
      this.getMainOrganizationInfo(this.organization),
      this.getMainOrganizationInfo(this.changedModel),
    );
  }

  private checkEmployeeAndSubdevisionChange(): boolean {
    console.log(this.changedModel.employeeCount, this.changedModel.subdivisionCount);
    console.log(this.organization.employeeCount, this.organization.subdivisionCount);
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
