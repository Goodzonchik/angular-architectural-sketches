import { Injectable } from '@angular/core';
import { BackendOrganizationService } from '@shared/backend-organization.service';

@Injectable()
export class OrganizationService {
  private organization;

  constructor(private backendOrganizationService: BackendOrganizationService) {
    this.backendOrganizationService.loadOrganization();
  }

  getOrganization() {
    return this.organization;
  }

  save() {}
}
