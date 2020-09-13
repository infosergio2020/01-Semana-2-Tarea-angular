import {v4 as uuid} from 'uuid';

export class ObraDetalle {
    private  selected:boolean;
    etiquetas:string[];
    id = uuid();
    public votes = 0;

    constructor(public nombre:string, public imageUrl:string, public descripcion:string){
        this.etiquetas = [];
        // while (etiquetas.length > 0) {
        //             this.etiquetas.push(etiquetas.pop());   
        //         }
    }

    public setEtiquetas(etiquetas:string[]){
        while (etiquetas.length > 0) {
            this.etiquetas.push(etiquetas.pop());   
        }
    }

     isSelected():boolean{
        return  this.selected;
    }
     setSelected(s:boolean){
        this.selected = s;
    }

    public voteUp():any{
        this.votes++;
    }
    public voteDown():any{
        this.votes--;
    }
}