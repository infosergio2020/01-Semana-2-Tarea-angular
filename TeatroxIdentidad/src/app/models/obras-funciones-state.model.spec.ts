import { 
    reducerObrasFunciones,
    ObrasFuncionesState,
    initializObrasFuncionesState,
    InitMyDataAction,
    NuevaObraAction
} from './obras-funciones-state.model';
import { ObraDetalle } from "./obra-detalle.model";




describe('reducerObrasFunciones', () => {
    it('should reduce init data', () => {
      const prevState: ObrasFuncionesState = initializObrasFuncionesState();
      const action: InitMyDataAction = new InitMyDataAction(['destino 1', 'destino 2']);
      const newState: ObrasFuncionesState = reducerObrasFunciones(prevState, action);
      expect(newState.items.length).toEqual(2);
      expect(newState.items[0].nombre).toEqual('destino 1');
    });
  
    it('should reduce new item added', () => {
      const prevState: ObrasFuncionesState = initializObrasFuncionesState();
      const action: NuevaObraAction = new NuevaObraAction(new ObraDetalle('barcelona', 'url','mydescripcion',0,[]));
      const newState: ObrasFuncionesState = reducerObrasFunciones(prevState, action);
      expect(newState.items.length).toEqual(1);
      expect(newState.items[0].nombre).toEqual('barcelona');
    });
  });