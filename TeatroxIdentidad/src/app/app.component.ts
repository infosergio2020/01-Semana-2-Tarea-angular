import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TeatroxIdentidad';

  time = new Observable(observer => {
    setInterval(()=> observer.next(new Date().toString()) ,1000)
  });
  // en este caso el observador va a ser un observador de string o sea que en este caso time va a ser un observador de un string


  //Modificamos el constructor
  constructor(public translate:TranslateService){
    console.log('**************** get translation');
    translate.getTranslation('en').subscribe(x => console.log('x: '+JSON.stringify(x)));
    translate.setDefaultLang('es');
  }


}
