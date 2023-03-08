import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppComponent } from './app.component';
import { TodosState } from './todos.state';
import { CompngxsComponent } from './compngxs/compngxs.component';
import { CompgenericngxsComponent } from './compgenericngxs/compgenericngxs.component';
import { SecondngxsComponent } from './secondngxs/secondngxs.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GenericNgxsModule } from './generic-ngxs/generic-ngxs.module';

@NgModule({
  declarations: [
    AppComponent,
    CompngxsComponent,
    CompgenericngxsComponent,
    SecondngxsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    GenericNgxsModule.forRoot(),
  ],
  //providers: [ApiService], // <-- Add ApiService to providers
  bootstrap: [AppComponent],
})
export class AppModule {}
