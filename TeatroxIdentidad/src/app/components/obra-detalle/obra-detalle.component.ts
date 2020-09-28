import { Component, Inject, inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.module';
import { ObrasApiClient } from 'src/app/models/obras-api-client.Model';
import { ObraDetalle } from '../../models/obra-detalle.model';


//primer caso

class ObrasApiClientViejo{
  getById(id:string): ObraDetalle{
    console.log('llamado por la vlase vieja!');
    return null;
  }
}

interface AppConfig{
  apiEndPoint : string;
}

const APP_CONFIG_VALUE: AppConfig = {
  apiEndPoint: 'mi_api.com'
}

const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
@Injectable()
class ObrasApiClientDecorated extends ObrasApiClient {
  constructor(@Inject(APP_CONFIG) private config:AppConfig,store:Store<AppState>){
    super(store);
  }
  getById(id:string):ObraDetalle{
    console.log('llamado por la clase decorada');
    console.log('config'+this.config.apiEndPoint);
    return super.getById(id);
  }
}




@Component({
  selector: 'app-obra-detalle',
  templateUrl: './obra-detalle.component.html',
  styleUrls: ['./obra-detalle.component.css'],
  providers: [
    { provide: APP_CONFIG,useValue: APP_CONFIG_VALUE},
    { provide: ObrasApiClient,useClass: ObrasApiClientDecorated},
    { provide: ObrasApiClientViejo,useExisting: ObrasApiClient}
  ]
})
export class ObraDetalleComponent implements OnInit {
  obra:ObraDetalle
  constructor(private route: ActivatedRoute,private obrasApiClient:ObrasApiClientViejo) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.obra = this.obrasApiClient.getById(id);
  }

}
