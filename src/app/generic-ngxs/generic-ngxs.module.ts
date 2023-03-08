import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { GenericState } from './generic.state';
import { ApiService } from './api.service';

@NgModule({
  imports: [
    CommonModule,NgxsModule.forRoot([GenericState]),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers:[ApiService],
  declarations: []
})
export class GenericNgxsModule {
  static forRoot(): ModuleWithProviders<GenericNgxsModule> {
    return {
      ngModule: GenericNgxsModule,
      providers: [ApiService],
    };
  }

 }