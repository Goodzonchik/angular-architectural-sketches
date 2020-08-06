import { NgModule } from "@angular/core";

import { OrganizationCardComponent } from "./organization-card/organization-card.component";
import { SharedModule } from "@shared";

@NgModule({
  declarations: [OrganizationCardComponent],
  imports: [SharedModule],
})
export class OrganizationModule {}
