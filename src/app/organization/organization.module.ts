import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationEmployeeAndSubdivisionComponent } from './organization-card/organization-employee-and-subdivision/organization-employee-and-subdivision.component';

@NgModule({
  declarations: [OrganizationCardComponent, OrganizationEmployeeAndSubdivisionComponent],
  imports: [SharedModule, OrganizationRoutingModule],
})
export class OrganizationModule {}
