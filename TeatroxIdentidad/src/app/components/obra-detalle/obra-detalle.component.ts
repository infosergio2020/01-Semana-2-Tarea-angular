import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObrasApiClient } from 'src/app/models/obras-api-client.Model';
import { ObraDetalle } from '../../models/obra-detalle.model';

@Component({
  selector: 'app-obra-detalle',
  templateUrl: './obra-detalle.component.html',
  styleUrls: ['./obra-detalle.component.css']
})
export class ObraDetalleComponent implements OnInit {
  obra:ObraDetalle
  constructor(private route: ActivatedRoute,private obrasApiClient:ObrasApiClient) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.obra = this.obrasApiClient.getById(id);
  }

}
