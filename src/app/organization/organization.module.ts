import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { OrganizationRoutingModule } from './organization-routing.module';

@NgModule({
  declarations: [OrganizationCardComponent],
  imports: [SharedModule, OrganizationRoutingModule],
})
export class OrganizationModule {}
