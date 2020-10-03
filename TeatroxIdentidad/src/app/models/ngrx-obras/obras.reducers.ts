import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Actions,Effect,ofType } from "@ngrx/effects";
import { ElegidoFavoritoAction, InitMyDataAction, NuevaObraAction, ObrasFuncionesActions, ObrasFuncionesActionTypes, VoteDownAction, VoteUpAction } from "../ngrx-obras/obras.actions";
import { ObrasFuncionesState} from "../ngrx-obras/obras.states";
import { ObraDetalle } from "../obra-detalle.model";

//REDUCERS
export function reducerObrasFunciones(
    state: ObrasFuncionesState,
    action: ObrasFuncionesActions
    ): ObrasFuncionesState{
    switch (action.type) {
        case ObrasFuncionesActionTypes.INIT_MY_DATA:{
            const obras: string[] = (action as InitMyDataAction).obras;
            return{
                ...state,
                items: obras.map((o)=>new ObraDetalle('','','',0,[]))
            };
        }
        case ObrasFuncionesActionTypes.NUEVA_OBRA: {
            return{
                ...state,
                items: [...state.items,(action as NuevaObraAction).obra ]
            };
        }
        case ObrasFuncionesActionTypes.ELEGIDO_FAVORITO: {
            state.items.forEach(x=> x.setSelected(false));
            const fav: ObraDetalle = (action as ElegidoFavoritoAction).obra;
            fav.setSelected(true);
            return {
                ...state,
                favorito:fav
            };
        }
        case ObrasFuncionesActionTypes.VOTE_UP: {
            const o: ObraDetalle = (action as VoteUpAction).obra;
            o.voteUp();
            return { ...state};
        }
        case ObrasFuncionesActionTypes.VOTE_DOWN:{
            const o: ObraDetalle = (action as VoteDownAction).obra;
            o.voteDown();
            return{ ...state };
        }
    }
    return state;
}


//EFFECTS
//esa accion es pasada a todos los efects registrados en el sistema, el objetivo de los efects deben registrar una accion dada una accion
//el efect se usa para disparar una accion en funcion de otra
//aqui lo que estoy haciendo es que cada vez que me agregan un nuevo destion
@Injectable()
export class ObrasFuncionesEffects{
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe( 
        ofType(ObrasFuncionesActionTypes.NUEVA_OBRA), 
        map((action: NuevaObraAction) => new ElegidoFavoritoAction(action.obra))

    );
    constructor(private actions$: Actions){}
}

