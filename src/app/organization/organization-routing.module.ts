import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationCardComponent } from './organization-card/organization-card.component';

const routes: Routes = [
  { path: '', component: OrganizationCardComponent },
  { path: ':id', component: OrganizationCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
