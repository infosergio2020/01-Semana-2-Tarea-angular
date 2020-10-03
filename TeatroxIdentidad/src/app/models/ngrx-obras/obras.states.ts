import { ObraDetalle } from '../obra-detalle.model';

export interface ObrasFuncionesState{
    items: ObraDetalle[];
    loading: boolean;
    favorito: ObraDetalle;
}


export function initializObrasFuncionesState() {
    return{
        items: [],
        loading: false,
        favorito: null
    }
}