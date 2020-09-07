import { Component, OnInit } from '@angular/core';
import { ObraDetalle } from './../models/obra-detalle.model';

@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.css']
})
export class ListaObrasComponent implements OnInit {
  
  public etiquetas = ['comedia','drama','suspenso','musical','show al aire libre','poco espacio','entradas agotadas'];
  tags:string[];
  obras: ObraDetalle[];
  public selectedTag;
  public antselectedTag;


  constructor() { 
    this.obras = [];
    this.tags = [];
  }

  ngOnInit(): void {
  }

  agregarTags(tag:string){
    if (this.antselectedTag !== this.selectedTag) {
      this.antselectedTag = tag;
      this.tags.push(tag);
      console.log(this.tags)      
    }
  }

  quitarTags(){
    while(this.tags.length > 0) {
      this.tags.pop();
    }
    this.antselectedTag = '';
  }

  guardar(nombre:string,url:string,descripcion:string):boolean {
    this.obras.push(new ObraDetalle(nombre,url,descripcion,this.tags))
    return false;//no queremos que recargue
  }
}
