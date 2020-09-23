import {v4 as uuid} from 'uuid';

export class ObraDetalle {
    private  selected:boolean;
    etiquetas:string[];
    id = uuid();

    constructor(public nombre:string, public imageUrl:string, public descripcion:string,public votes:number = 0){
        this.etiquetas = [];
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