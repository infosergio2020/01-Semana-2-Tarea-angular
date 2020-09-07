export class ObraDetalle {
    private selected:boolean;
    etiquetas:string[]
    public votes = 0;

    constructor(public nombre:string, public imageUrl:string, public descripcion:string){
        this.etiquetas = [];
        // while (etiquetas.length > 0) {
        //             this.etiquetas.push(etiquetas.pop());   
        //         }
    }

    setEtiquetas(etiquetas:string[]){
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

    voteUp():any{
        this.votes++;
    }
    voteDown():any{
        this.votes--;
    }
}