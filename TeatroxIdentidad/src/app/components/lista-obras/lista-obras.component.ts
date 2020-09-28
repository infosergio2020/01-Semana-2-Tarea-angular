import { Component, OnInit } from '@angular/core';
import { ObraDetalle } from './../../models/obra-detalle.model';
import { ObrasApiClient } from './../../models/obras-api-client.Model';
import { Store } from "@ngrx/store";
import { AppState } from "../../app.module";

@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.css'],
  providers:[ObrasApiClient]
})





export class ListaObrasComponent implements OnInit {
  updates: string[];//esto es un log para preferidos 
  all;//variable testigo

  constructor(public obrasApiClient:ObrasApiClient, private store: Store<AppState>) { 
    this.updates = [];
    this.store.select(state => state.obras.favorito)//nos vamos a suscribir. A nivel Appstate teniamos obras:ObrasFuncionesState 
        .subscribe(o => {
          if(o!=null){
            this.updates.push('se ha elegido a '+o.nombre)
          }
        });
        store.select(state => state.obras.items).subscribe(items => this.all = items);//all sera actualizada de manera reactiva ante los cambios de state.obras.items
  }

  ngOnInit(): void {
  }

  agregado(o: ObraDetalle) {
    this.obrasApiClient.add(o);
    // this.store.dispatch(new NuevaObraAction(o));  //AHORA LO HACE EL APICLIENT
  }

  elegido(o:ObraDetalle){
    this.obrasApiClient.elegir(o);
    // this.store.dispatch(new ElegidoFavoritoAction(o));   //AHORA LO HACE EL APICLIENT
  }
// Se modifica el obrasApiClient.getAll() del html por un getAll()
// si no tenemos modificado el api client (obras)

}
