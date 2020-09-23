import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObraDetalle } from '../../models/obra-detalle.model';

@Component({
  selector: 'app-obra-detalle',
  templateUrl: './obra-detalle.component.html',
  styleUrls: ['./obra-detalle.component.css']
})
export class ObraDetalleComponent implements OnInit {
  obra:ObraDetalle
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.obra = null;
  }

}
