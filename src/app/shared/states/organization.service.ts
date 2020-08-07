import { Injectable } from '@angular/core';
import { BackendOrganizationService } from '@shared/backend-organization.service';

import { TodoAny } from '@utils';

@Injectable()
export class OrganizationService {
  private organization: TodoAny;

  constructor(private backendOrganizationService: BackendOrganizationService) {
    this.backendOrganizationService.loadOrganization();
  }

  getOrganization() {
    return this.organization;
  }

  save() {}
}
