import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrganizationModule } from './organization/organization.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, OrganizationModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

// AppModule импортируются модули Angular через SharedModule
// BrowserModule - импортируется напрямую, потому что это единственное место, где он используется
