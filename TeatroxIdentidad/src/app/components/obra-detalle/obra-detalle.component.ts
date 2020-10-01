import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObrasApiClient } from 'src/app/models/obras-api-client.Model';
import { ObraDetalle } from '../../models/obra-detalle.model';

@Component({
  selector: 'app-obra-detalle',
  templateUrl: './obra-detalle.component.html',
  styleUrls: ['./obra-detalle.component.css'],
  providers: [ ObrasApiClient ]
})
export class ObraDetalleComponent implements OnInit {
  obra:ObraDetalle

  style = {
    sources: {
      world: {
        type: "geojson",
        data: "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
      }
    },
    version: 8,
    layers: [{
      "id": "countries",
      "type": "fill",
      "source": "world",
      "layout": {},
      "paint": {
        'fill-color': '#6F788A'
      }
    }]
  };

  
  constructor(private route: ActivatedRoute,private obrasApiClient:ObrasApiClient) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.obra = this.obrasApiClient.getById(id);
  }

}
