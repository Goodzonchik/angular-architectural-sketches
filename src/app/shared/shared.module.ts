import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { UserIconComponent } from './layout/header/user-icon/user-icon.component';

const toExportComponent = [HeaderComponent, FooterComponent];

// Почти все модули относятся к Angular, они импортируются и экспортируются по необходимости
const toExportModule = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgbTooltipModule,
];

@NgModule({
  declarations: [...toExportComponent, UserIconComponent],
  imports: [...toExportModule],
  exports: [...toExportModule, ...toExportComponent],
})
export class SharedModule {}
