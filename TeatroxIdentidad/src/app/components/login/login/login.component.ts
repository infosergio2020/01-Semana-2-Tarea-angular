import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  urlDinamica:string;
  urlDinamica2:string;
  mensajeError:string;

  constructor(public authService: AuthService) { 
    this.urlDinamica = "https://c4.wallpaperflare.com/wallpaper/652/685/192/munchkin-cat-wallpaper-preview.jpg";
    this.urlDinamica2 ="https://i.pinimg.com/originals/d3/7d/97/d37d97ee0940b8c9ea6168a35f870b35.jpg";

    this.mensajeError = '';
  }

  ngOnInit() {
  }


  login(nombreUsuario:string,contraseña:string):boolean{
    this.mensajeError = '';
    if(!this.authService.login(nombreUsuario,contraseña)){
      this.mensajeError = 'Login incorrecto.';
      setTimeout(function() {
        this.mensajeError = '';
      }.bind(this),2500);//de 2 segundos y medio limpiamos el mensaje de error
    }
    return false;
  }

  logout():boolean{
    this.authService.logout();
    return false;
  }

}
