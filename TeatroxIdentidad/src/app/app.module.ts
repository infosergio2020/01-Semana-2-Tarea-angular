import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaObrasComponent } from './lista-obras/lista-obras.component';
import { ObraFuncionComponent } from './obra-funcion/obra-funcion.component';
import { FormObraFuncionComponent } from './form-obra-funcion/form-obra-funcion.component';
import { ObraDetalleComponent } from './obra-detalle/obra-detalle.component';
import { ObrasApiClient } from "./models/obras-api-client.Model";


// definiendo direcciones del nav
const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch: 'full'},
  {path:'home', component: ListaObrasComponent},
  {path:'obra',component: ObraDetalleComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ListaObrasComponent,
    ObraFuncionComponent,
    FormObraFuncionComponent,
    ObraDetalleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), //registrando las rutas
    FormsModule, //agregar un formulario
    ReactiveFormsModule
  ],
  providers: [ObrasApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
