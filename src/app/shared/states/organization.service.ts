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

  getOrganization() {
    return this.organizationSubject$.asObservable();
  }

  getOrganizationHasChange() {
    return this.hasMainChange$.asObservable();
  }

  getEmployeeAndSubdivisionHasChange() {
    return this.hasEmployeeAndSubdivisionChange$.asObservable();
  }

  save(organizationRequest?: TodoAny) {
    let request = organizationRequest;
    if (!request) {
      request = this.changedModel || this.organization;
    }
    this.backendOrganizationService.saveOrganization(request).subscribe((data: TodoAny) => {
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
