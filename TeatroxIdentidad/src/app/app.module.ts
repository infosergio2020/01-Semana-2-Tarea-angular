import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaObrasComponent } from './lista-obras/lista-obras.component';
import { ObrasDetalleComponent } from './obras-detalle/obras-detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaObrasComponent,
    ObrasDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
