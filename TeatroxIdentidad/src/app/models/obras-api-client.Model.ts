import { ObraDetalle } from './obra-detalle.model';

export class ObrasApiClient {
	obras:ObraDetalle[];
	constructor() {
       this.obras = [];
	}
	add(d:ObraDetalle){
	  this.obras.push(d);
	}
	getAll(){
	  return this.obras;
    }

}