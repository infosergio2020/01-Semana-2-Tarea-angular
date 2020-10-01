import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injectable, InjectionToken, NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { StoreModule as NxRxStoreModule, ActionReducerMap, Store  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest } from '@angular/common/http';//para poder manejar las peticiones (servicios REST)
//import { DBConfig, NgxIndexedDBModule } from 'node_modules/ngx-indexed-db'; //probar luego
import Dexie from 'dexie';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';





import { AppComponent } from './app.component';
import { ListaObrasComponent } from './components/lista-obras/lista-obras.component';
import { ObraFuncionComponent } from './components/obra-funcion/obra-funcion.component';
import { FormObraFuncionComponent } from './components/form-obra-funcion/form-obra-funcion.component';
import { ObraDetalleComponent } from './components/obra-detalle/obra-detalle.component';
import { ObrasApiClient } from "./models/obras-api-client.Model";
import { ObrasFuncionesState,reducerObrasFunciones, initializObrasFuncionesState, ObrasFuncionesEffects, InitMyDataAction } from './models/obras-funciones-state.model'
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { LoginComponent } from './components/login/login/login.component';
import { ProtectedComponent } from './components/protected/protected/protected.component';
//2 servicios nuevos agregados
import { AuthService } from './services/auth.service';
import { UsuarioLogueadoGuard } from './guards/usuario-logueado/usuario-logueado.guard';
import { EntradasComponent } from './components/entradas/entradas-component/entradas-component.component';
import { EntradasMainComponent } from './components/entradas/entradas-main-component/entradas-main-component.component';
import { EntradasMasInfoComponent } from './components/entradas/entradas-mas-info-component/entradas-mas-info-component.component';
import { EntradasDetalleComponent } from './components/entradas/entradas-detalle-component/entradas-detalle-component.component';
import { ReservasModule } from './reservas/reservas.module';
import { ObraDetalle } from './models/obra-detalle.model';
import { from, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';


// ngxIndexedDBModule config
// queda pendiente hacer la prueba de esta bd
// ngxIndexedDBModule config FIN




//inyeccion de dependencias de varibales de configuracion
// app config
export interface AppConfig{
  apiEndPoint:string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
//fin app config


// init routing
//definiendo direccionciones de un sub nav
export const childrenRoutesEntradas:Routes = [
  {path:'', redirectTo:'main',pathMatch:'full'},
  {path: 'main', component: EntradasMainComponent},
  {path: 'mas-info', component: EntradasMasInfoComponent},
  {path: ':id', component: EntradasDetalleComponent},
];

// definiendo direcciones del nav
const routes: Routes = [
  {path: '', redirectTo:'home',pathMatch: 'full'},
  {path:'home', component: ListaObrasComponent},
  {path:'obra/:id',component: ObraDetalleComponent},
  {path:'login',component: LoginComponent},
  {
    path:'protected',
    component: ProtectedComponent,
    canActivate: [ UsuarioLogueadoGuard ]
  },
  {
    path: 'vuelos',
    component: EntradasComponent,
    canActivate: [UsuarioLogueadoGuard],
    children: childrenRoutesEntradas  //integrando rutas de subnavegacion 
  }

];
//fin routing



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


// app init
//esto es un factory
export function init_app(appLoadService:AppLoadService): () => Promise<any>{
  return () => appLoadService.initializeObrasFuncionesState();
}

@Injectable()
class AppLoadService{
  constructor(private store: Store<AppState>,private http: HttpClient){ }
  async initializeObrasFuncionesState(): Promise<any>{
    const headers:HttpHeaders = new HttpHeaders({'X-API-TOKEN':'token-seguridad'});
    const req = new HttpRequest ('GET', APP_CONFIG_VALUE.apiEndPoint + '/my', {headers:headers});
    const response: any = await this.http.request(req).toPromise();
    this.store.dispatch(new InitMyDataAction(response.body));
  }
}


// dexie db
export class Translation{//guardamos en almacenamiento local lo que nos trajimos por web service esto es para no perder las traducciones que nos traemos por el servidor remoto por ejemplo cuando recargan la pagina...
  constructor(public id:number,public lang:string,public key:string,public value:string){}
}


@Injectable({
  providedIn:'root'
})
export class MyDataBase extends Dexie{
  obras: Dexie.Table<ObraDetalle,number>;
  translations: Dexie.Table<Translation,number>;
  constructor(){
    super('MyDataBase');
    this.version(1).stores({  //creamos la 1er version de nuestra base de datos que va a tener 
      obras: '++id,nombre,imagenUrl,descripcion,votes,etiquetas'//aca van los campos de obradetalle component
    });
    this.version(2).stores({ //esto es migracion o versionado de base de datos
      obras: '++id,nombre,imagenUrl,descripcion,votes,etiquetas',
      translations: '++id,lang,key,value'
    });
  }
}

export const db = new MyDataBase();
// dexie db FIN

// i18n ini
class TranslationLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    const promise = db.translations
                      .where('lang')
                      .equals(lang)
                      .toArray()
                      .then(results => {
                                        if (results.length === 0) {
                                          return this.http
                                            .get<Translation[]>(APP_CONFIG_VALUE.apiEndPoint + '/api/translation?lang=' + lang)
                                            .toPromise()
                                            .then(apiResults => {
                                              db.translations.bulkAdd(apiResults);
                                              return apiResults;
                                            });
                                        }
                                        return results;
                                      }).then((traducciones) => {
                                        console.log('traducciones cargadas:');
                                        console.log(traducciones);
                                        return traducciones;
                                      }).then((traducciones) => {
                                        return traducciones.map((t) => ({ [t.key]: t.value}));
                                      });
   return from(promise).pipe(flatMap((elems) => from(elems)));
  }
}

function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}

//i18n FIN






@NgModule({
  declarations: [
    AppComponent,
    ListaObrasComponent,
    ObraFuncionComponent,
    FormObraFuncionComponent,
    ObraDetalleComponent,
    LoginComponent,
    ProtectedComponent,
    EntradasComponent,
    EntradasMainComponent,
    EntradasMasInfoComponent,
    EntradasDetalleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //agregar un formulario
    ReactiveFormsModule,
    HttpClientModule,//agregado el http a los imports
    RouterModule.forRoot(routes), //registrando las rutas
    NxRxStoreModule.forRoot(reducers, {
      //configuraciones del store
      initialState:reducersInitialState,
      runtimeChecks: { 
          strictStateImmutability: false,
          strictActionImmutability: false
      }
    }), //exportado para redux,  aca estamos registrando todos los reducers y el estado inicial de nuestra aplicacion
    EffectsModule.forRoot([ObrasFuncionesEffects]), //exportado para redux, aca podemos pasar todos los effects ya que es una array
    StoreDevtoolsModule.instrument({maxAge: 10}), 
    ReservasModule,
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:(HttpLoaderFactory),
        deps:[HttpClient]
      }
    }),
    NgxMapboxGLModule
  
  ],
  providers: [
    AuthService, UsuarioLogueadoGuard,
    {provide:APP_CONFIG,useValue: APP_CONFIG_VALUE},
    AppLoadService,
    {provide: APP_INITIALIZER,useFactory: init_app, deps:[AppLoadService], multi: true},
    MyDataBase//agrego el servicio MyDataBase
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
