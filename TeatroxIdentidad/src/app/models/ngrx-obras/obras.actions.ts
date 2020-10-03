import { Action } from '@ngrx/store';
import { ObraDetalle } from '../obra-detalle.model';

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
