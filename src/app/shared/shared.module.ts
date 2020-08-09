import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const toExportComponent = [HeaderComponent, FooterComponent, ContentComponent];
const toExportModule = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [...toExportComponent],
  imports: [...toExportModule],
  exports: [...toExportModule, ...toExportComponent],
})
export class SharedModule {}
