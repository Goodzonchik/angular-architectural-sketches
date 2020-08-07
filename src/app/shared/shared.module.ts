import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ContentComponent } from './layout/content/content.component';

const toExport = [HeaderComponent, FooterComponent, ContentComponent];

@NgModule({
  declarations: [...toExport],
  imports: [CommonModule, RouterModule],
  exports: [CommonModule, RouterModule, ...toExport],
})
export class SharedModule {}
