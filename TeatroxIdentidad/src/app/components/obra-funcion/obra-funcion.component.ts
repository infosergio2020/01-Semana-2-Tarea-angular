import { Component, OnInit, Input, HostBinding,EventEmitter, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { ObraDetalle } from '../../models/obra-detalle.model';
import { VoteDownAction, VoteUpAction } from '../../models/obras-funciones-state.model';

@Component({
  selector: 'app-obra-funcion',
  templateUrl: './obra-funcion.component.html',
  styleUrls: ['./obra-funcion.component.css']
})
export class ObraFuncionComponent implements OnInit {
  @Input() obra:ObraDetalle; //nombre es susceptible de pasar parametro en el tag app obra funcion en nuestra plantilla
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<ObraDetalle>//@Output() es la directiva de salida para enviar eventos al padre

  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
   }
  ngOnInit(): void {}

  ir(){
    this.clicked.emit(this.obra)
    return false;
  }

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.obra));
    return false;
  }

  voteDown(){
    this.store.dispatch(new VoteDownAction(this.obra));
    return false;
  }


}
