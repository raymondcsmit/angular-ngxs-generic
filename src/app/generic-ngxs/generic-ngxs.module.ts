import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { GenericState } from './generic.state';

@NgModule({
  imports: [
    CommonModule,NgxsModule.forRoot([GenericState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  declarations: []
})
export class GenericNgxsModule { }