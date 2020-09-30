import { Component, OnInit, Output, EventEmitter, forwardRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ObraDetalle } from '../../models/obra-detalle.model';
import { fromEvent } from 'rxjs';
import { map,filter,debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';//importamos operadores de rxjs para poder trabajar con pipe
import { ajax } from 'rxjs/ajax';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';

@Component({
  selector: 'app-form-obra-funcion',
  templateUrl: './form-obra-funcion.component.html',
  styleUrls: ['./form-obra-funcion.component.css']
})
export class FormObraFuncionComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<ObraDetalle>;
  fg: FormGroup;
  minLongitud = 5;
  searchResult:string[];

  public etiquetas = ['comedia','drama','suspenso','musical','show al aire libre','poco espacio','entradas agotadas'];
  public selectedTag;
  public antselectedTag;
  tags:string[];

  // agregamos como privado una injeccion de dependencias , usamos el forwardRef para evitar la referencia circular ya que entre ellos se estan llamando
  constructor(private fb: FormBuilder,@Inject(forwardRef(()=> APP_CONFIG)) private config:AppConfig )  { 
    this.onItemAdded = new EventEmitter();
    this.tags = [];

    this.fg = this.fb.group({
      nombre:['',Validators.compose([
        Validators.required,Validators.pattern("[a-zA-Z ]+"),
        this.nombreValidatorParametrizable(this.minLongitud)])],
      url:[''],
      descripcion:['',Validators.required]
    });

    //observador de tipeo
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('cambio el formulario: ', form);
    })
  }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');//estoy eligiendo el elemento de HTML
    fromEvent(elemNombre,'input') //estamos suscriptos a evento del elemento input llamado nombre, cada vez que teclean una tecla
    .pipe(//este metodo es para encadenar operadores observables
          map( (e:KeyboardEvent) => (e.target as HTMLInputElement).value),//el map trata al evento objetivo como un tipo de entrada y le solicita el valor de entrada actual hasta el cursor
          filter(text => text.length > 2),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap((text:string)=> ajax(this.config.apiEndPoint + '/obras?q='+ text))//en vez de al archivo hacemos el ajax al endpoint o sea al localhost:3000 configurado en APP_CONFIG (aca esta el api de nodejs o sea el express). em el text va a llegar cada caracter que se fue introduciendo
          ).subscribe(  AjaxResponse => { console.log(AjaxResponse.response); this.searchResult = AjaxResponse.response;} );//el metodo suscribe es para activar el observable ajax response y escuchar los valores emitidos
  }
  
  //METODOS PARA FORMULARIO 
  agregarTags(tag:string){
    console.log('el tag seleccionado es: ',this.selectedTag)
    if (this.antselectedTag !== this.selectedTag) {
      this.antselectedTag = tag;
      this.tags.push(tag);
      console.log(this.tags)      
    }
    return false;
  }

  quitarTags(){
    while(this.tags.length > 0) {
      this.tags.pop();
    }
    this.antselectedTag = '';
    return false;
  }
  

  guardar(nombre: string, url: string, descripcion:string): boolean {
    const o = new ObraDetalle(nombre,url,descripcion,0,this.tags);
    // o.setEtiquetas(this.tags)
    this.quitarTags()
    this.onItemAdded.emit(o);
    return false;
  }


  //VALIDADORES
  // la siguiente funcion retorna un objeto con el formato --> {[clave]:valor}
  // nombreValidator(control:FormControl): { [s:string]:boolean } {          
  //   let l = control.value.toString().trim().length;
  //   if (l > 0 && l < 3 ){
  //     return {invalidNombre:true}
  //   }
  //   else{
  //     return null;
  //   }
  // }

  nombreValidatorParametrizable(minLong:number): ValidatorFn {
    return (control: FormControl): {[s:string]:boolean} | null => {
      const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong ){
        return {minLongNombre:true}
      }
      return null;
    }
}


}
