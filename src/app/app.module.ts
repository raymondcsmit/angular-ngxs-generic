import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { TodosState } from './todos.state';
import { ApiService } from './api.service';
import { CompngxsComponent } from './compngxs/compngxs.component';
import { CompgenericngxsComponent } from './compgenericngxs/compgenericngxs.component';
import { GenericState } from './generic.state';
import { SecondngxsComponent } from './secondngxs/secondngxs.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CompngxsComponent, CompgenericngxsComponent,SecondngxsComponent],
  imports: [
    BrowserModule, CommonModule,
    FormsModule,
    NgxsModule.forRoot([TodosState, GenericState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [ApiService], // <-- Add ApiService to providers
  bootstrap: [AppComponent],
})
export class AppModule {}
