import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ObraDetalle } from './../models/obra-detalle.model';

@Component({
  selector: 'app-obras-detalle',
  templateUrl: './obras-detalle.component.html',
  styleUrls: ['./obras-detalle.component.css']
})
export class ObrasDetalleComponent implements OnInit {

  @Input() obra:ObraDetalle; //nombre es susceptible de pasar parametro en el tag app destino viaje en nuestra plantilla
  @HostBinding('attr.class') cssClass = 'col-md-4';
  constructor() { }

  ngOnInit(): void {
  }

}
