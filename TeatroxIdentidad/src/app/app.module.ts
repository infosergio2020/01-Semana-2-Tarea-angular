import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { StoreModule as NxRxStoreModule, ActionReducerMap, Store  } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { _runtimeChecksFactory } from '@ngrx/store/src/runtime_checks';


import { AppComponent } from './app.component';
import { ListaObrasComponent } from './lista-obras/lista-obras.component';
import { ObraFuncionComponent } from './obra-funcion/obra-funcion.component';
import { FormObraFuncionComponent } from './form-obra-funcion/form-obra-funcion.component';
import { ObraDetalleComponent } from './obra-detalle/obra-detalle.component';
import { ObrasApiClient } from "./models/obras-api-client.Model";
import { ObrasFuncionesState,reducerObrasFunciones, initializObrasFuncionesState, ObrasFuncionesEffects } from './models/obras-funciones-state.model'


// definiendo direcciones del nav
const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch: 'full'},
  {path:'home', component: ListaObrasComponent},
  {path:'obra',component: ObraDetalleComponent}
];
//redux init
export interface AppState{
  obras: ObrasFuncionesState;//estamos definiendo el estado global de la aplicacion AppState, 
}

const reducers: ActionReducerMap<AppState> = {
  obras: reducerObrasFunciones  //definimos los reducers globales de la aplicacion
}

let reducersInitialState = {
  obras: initializObrasFuncionesState()//
}

//redux fin init


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
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
    RouterModule.forRoot(routes), //registrando las rutas
    NxRxStoreModule.forRoot(reducers, {
      //configuraciones del store
      initialState:reducersInitialState,
      runtimeChecks: { 
          strictStateImmutability: false,
          strictActionImmutability: false
      }
    }), //exportado para redux,  aca estamos registrando todos los reducers y el estado inicial de nuestra aplicacion
    EffectsModule.forRoot([ObrasFuncionesEffects]) //exportado para redux, aca podemos pasar todos los effects ya que es una array
  ],
  providers: [ObrasApiClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
