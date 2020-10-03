import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[appTrackearClick]'
})
export class TrackearClickDirective {
  private element: HTMLInputElement;

  // cuando se le agrega la directiva a un componente html entonces pasa lo siguiente
  // cuando se crea la instancia de esta clase que esta vinculada al componente el constructor pasa como argumento la referencia al elemento HTML asociado a la clase en este caso es el tag <a>
  constructor(private elRef:ElementRef) { 
    this.element = elRef.nativeElement;//guardamos esa referencia
    fromEvent(this.element,'click').subscribe(evento => this.track(evento));//nos suscribimos al evento click
  }

  track(evento:Event):void{
    const elemTags = this.element.attributes.getNamedItem('data-trackear-tags').value.split(' ');//lo que hacemos es buscar en ese elemento el atributo data-trackear-tags el cual declaramos en el tag HTML 
    console.log(`||||||||||| track evento: "${elemTags}"`);//en esta seccion lo que deberia hacerse es mantener los contadores / mandarselos a un servidor cada x tiempo o logica parecida aca lo que hacemos es algo mas simple solo loguear
  }

  


}
