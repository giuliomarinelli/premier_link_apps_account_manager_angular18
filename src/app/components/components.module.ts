import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [HeaderComponent]
})
export class ComponentsModule { }
