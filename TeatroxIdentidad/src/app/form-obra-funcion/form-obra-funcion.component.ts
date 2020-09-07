import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { ObraDetalle } from '../models/obra-detalle.model';

@Component({
  selector: 'app-form-obra-funcion',
  templateUrl: './form-obra-funcion.component.html',
  styleUrls: ['./form-obra-funcion.component.css']
})
export class FormObraFuncionComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<ObraDetalle>;
  fg: FormGroup;
  minLongitud = 5;

  public etiquetas = ['comedia','drama','suspenso','musical','show al aire libre','poco espacio','entradas agotadas'];
  public selectedTag;
  public antselectedTag;
  tags:string[];

  constructor(private fb: FormBuilder) { 
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

  ngOnInit(): void {}
  
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
    const o = new ObraDetalle(nombre,url,descripcion);
    o.setEtiquetas(this.tags)
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
