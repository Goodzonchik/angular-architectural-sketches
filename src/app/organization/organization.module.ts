import { NgModule } from "@angular/core";

import { OrganizationCardComponent } from "./organization-card/organization-card.component";
import { SharedModule } from "@shared/shared.module";

@NgModule({
  declarations: [OrganizationCardComponent],
  imports: [SharedModule],
})
export class OrganizationModule {}
