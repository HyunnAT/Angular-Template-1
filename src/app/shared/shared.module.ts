import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDirective } from './directives';



@NgModule({
  declarations: [
    LoadingDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingDirective
  ]
})
export class SharedModule { }
