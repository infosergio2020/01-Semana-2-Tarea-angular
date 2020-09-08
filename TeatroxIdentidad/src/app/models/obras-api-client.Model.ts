import { ObraDetalle } from './obra-detalle.model';
import { Subject, BehaviorSubject } from 'rxjs';

export class ObrasApiClient {
	obras:ObraDetalle[];
	current:Subject<ObraDetalle> = new BehaviorSubject<ObraDetalle>(null); //BehaviorSubject es un flujo de eventos en tiempo real(detecta cuando lo setea al current) (empieza en null)
	
	constructor() {
       this.obras = [];
	}

	add(d:ObraDetalle){
	  this.obras.push(d);
	}

	getAll(){
		return this.obras;
	}
	
	getById(id:string):ObraDetalle{
		return this.obras.filter(function(d){return d.id.toString() === id; })[0];
	}

	elegir(o:ObraDetalle){
		this.obras.forEach(x=> x.setSelected(false));
		o.setSelected(true);
		this.current.next(o);
	}

	//este metodo es para que los demas se suscriban a las actualizaciones
	subscribeOnChange(fn){
		this.current.subscribe(fn);
	}

}