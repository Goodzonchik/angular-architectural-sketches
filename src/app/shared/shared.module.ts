import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';

const toExportComponent = [HeaderComponent, FooterComponent, ContentComponent];
const toExportModule = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgbTooltipModule,
];

@NgModule({
  declarations: [...toExportComponent],
  imports: [...toExportModule],
  exports: [...toExportModule, ...toExportComponent],
})
export class SharedModule {}
