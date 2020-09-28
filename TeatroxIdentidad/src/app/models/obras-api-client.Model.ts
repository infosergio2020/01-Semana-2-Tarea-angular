import { ObraDetalle } from './obra-detalle.model';
// import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { ElegidoFavoritoAction, NuevaObraAction } from './obras-funciones-state.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ObrasApiClient{
	obras:ObraDetalle[];
	// current:Subject<ObraDetalle> = new BehaviorSubject<ObraDetalle>(null); //BehaviorSubject es un flujo de eventos en tiempo real(detecta cuando lo setea al current) (empieza en null)
	
	constructor(private store:Store<AppState>) {
	   this.obras = [];
	   this.store.select(state => state.obras)
		.subscribe((data)=> {
			console.log('obras sub store');
			console.log(data);
			this.obras = data.items;
		});
		this.store.subscribe((data) => {
			console.log('all store');
			console.log(data);			
		});
	}


	add(o:ObraDetalle){
	  this.store.dispatch(new NuevaObraAction(o));
	}

	elegir(o:ObraDetalle){
		this.store.dispatch(new ElegidoFavoritoAction(o));
	}


	
	getById(id:string):ObraDetalle{
		return this.obras.filter(function(d){return d.id.toString() === id; })[0];
	}

	// add(o:ObraDetalle){
	// 	this.obras.push(o);
	//   }

	// getAll(): ObraDetalle[]{
	// 	return this.obras;
	// }

	// elegir(o:ObraDetalle){
		// this.obras.forEach(x=> x.setSelected(false));
		// o.setSelected(true);
		// this.current.next(o);

	//este metodo es para que los demas se suscriban a las actualizaciones
	// subscribeOnChange(fn){
	// 	this.current.subscribe(fn);
	// }
}
