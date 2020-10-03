import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions,Effect,ofType } from "@ngrx/effects";
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ObraDetalle } from "./obra-detalle.model";
import { HttpClientModule } from '@angular/common/http';

// Store es el almacen que contiene al estado y sobre el store vamos a disparar acciones
// ESTADO
export interface ObrasFuncionesState{
    items: ObraDetalle[];
    loading: boolean;
    favorito: ObraDetalle;
}

// export const initializObrasFuncionesState = function () {
//     return{
//         items: [],
//         loading: false,
//         favorito: null
//     }
// }


export function initializObrasFuncionesState() {
    return{
        items: [],
        loading: false,
        favorito: null
    }
}



// ACCIONES
export enum ObrasFuncionesActionTypes{
    //declaracion de todos los tipos de estados de la aplicacion es una buena practica tenerlos a todos declarados aca
    NUEVA_OBRA = '[Obras Funciones] Nuevo',
    ELEGIDO_FAVORITO = '[Obras Funciones] Favorito',
    VOTE_UP = '[Obras Funciones] Vote Up',
    VOTE_DOWN = '[Obras Funciones] Vote Down',
    INIT_MY_DATA = '[Obras Funciones] Init My Data'
}

//implementacion de las acciones

export class NuevaObraAction implements Action {
    type = ObrasFuncionesActionTypes.NUEVA_OBRA;
    constructor(public obra: ObraDetalle) {}
}
export class ElegidoFavoritoAction implements Action {
    type = ObrasFuncionesActionTypes.ELEGIDO_FAVORITO;
    constructor(public obra: ObraDetalle) {}
}

export class VoteUpAction implements Action {
    type = ObrasFuncionesActionTypes.VOTE_UP;
    constructor(public obra: ObraDetalle) {}
  }

export class VoteDownAction implements Action {
    type = ObrasFuncionesActionTypes.VOTE_DOWN;
    constructor(public obra: ObraDetalle) {}
}

export class InitMyDataAction implements Action {
    type = ObrasFuncionesActionTypes.INIT_MY_DATA;
    constructor(public obras: string[]) {}
}


//buena practica, agrupar todos los tipos de las acciones del modulo del sistema 
export type ObrasFuncionesActions = NuevaObraAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | InitMyDataAction; 
//esto termina siendo como una variable que contiene un conjunto de tipos de datos que son acciones sobre Obras Funciones
//Lo que hace redux es llamar a todos lo reducers que son los que cada vez que se dispara una accion son llamados uno a uno

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
                items: obras.map((o)=>new ObraDetalle(o,'','',0,[])) //NOTA el parametro o corresponde al string del constructor de la clase InitMyDataAction
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