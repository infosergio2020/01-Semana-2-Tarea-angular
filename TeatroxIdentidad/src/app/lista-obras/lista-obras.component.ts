import { Component, OnInit } from '@angular/core';
import { ObraDetalle } from './../models/obra-detalle.model';
import { ObrasApiClient } from './../models/obras-api-client.Model';
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";
import { ElegidoFavoritoAction, NuevaObraAction } from '../models/obras-funciones-state.model';

@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.css']
})
export class ListaObrasComponent implements OnInit {
  updates: string[];//esto es un log para preferidos 
  constructor(public obrasApiClient:ObrasApiClient, private store: Store<AppState>) { 
    this.updates = [];
    this.store.select(state => state.obras.favorito)//nos vamos a suscribir. A nivel Appstate teniamos obras:ObrasFuncionesState 
        .subscribe(o => {
          if(o!=null){
            this.updates.push('se ha elegido a '+o.nombre)
          }
        });
  }

  ngOnInit(): void {
  }

  agregado(o: ObraDetalle) {
    this.obrasApiClient.add(o);
    this.store.dispatch(new NuevaObraAction(o));
  }

  elegido(o:ObraDetalle){
    this.obrasApiClient.elegir(o);
    this.store.dispatch(new ElegidoFavoritoAction(o));
  }
}
