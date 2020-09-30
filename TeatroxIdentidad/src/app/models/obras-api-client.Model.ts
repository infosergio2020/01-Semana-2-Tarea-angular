import { ObraDetalle } from './obra-detalle.model';
import { Store } from '@ngrx/store';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { ElegidoFavoritoAction, NuevaObraAction } from './obras-funciones-state.model';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
@Injectable()
export class ObrasApiClient{
	obras:ObraDetalle[] = [];

	constructor(
		private store:Store<AppState>,
		@Inject(forwardRef(()=> APP_CONFIG)) private config: AppConfig,
		private http:HttpClient//usamos esto por que tenemos que hacer unas llamadas al webservice
		) {
	   this.store
	   	.select(state => state.obras)
		.subscribe((data)=> {
			console.log('obras sub store');
			console.log(data);
			this.obras = data.items;
		});
		this.store
		.subscribe((data) => {
			console.log('all store');
			console.log(data);			
		});
	}

	add(o:ObraDetalle){
		const headers : HttpHeaders = new HttpHeaders({'X-API-TOKEN':'token-seguridad'});
		const req = new HttpRequest ('POST',this.config.apiEndPoint +'/my',{ nuevo: o.nombre },{ headers:headers });
		this.http.request(req).subscribe((data:HttpResponse<{}>)=>{//estamos usando observables en vez de promesas por eso nos suscribimos al http response
			if(data.status === 200){
				this.store.dispatch(new NuevaObraAction(o));
				const myDb = db;
				myDb.obras.add(o);
				console.log('todas las obras de la db|');
				myDb.obras.toArray().then(obras => console.log(obras))
			}
		});
	}

	elegir(o:ObraDetalle){
		this.store.dispatch(new ElegidoFavoritoAction(o));
	}

	getById(id:string):ObraDetalle{
		return this.obras.filter(function(d){return d.id.toString() === id; })[0];
	}
}
