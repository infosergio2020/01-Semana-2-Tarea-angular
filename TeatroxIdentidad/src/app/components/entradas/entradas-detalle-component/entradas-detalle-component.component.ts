import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entradas-detalle-component',
  templateUrl: './entradas-detalle-component.component.html',
  styleUrls: ['./entradas-detalle-component.component.css']
})
export class EntradasDetalleComponent implements OnInit {

  id:any;

  constructor(private route: ActivatedRoute) { //ActivatedRoute nos relaciona con la informacion relativa a la ruta que esta cargada en la URL al momento que se esta cargando este componente
    route.params.subscribe(params => {this.id = params['id'];});
  }

  ngOnInit(): void {}

}
