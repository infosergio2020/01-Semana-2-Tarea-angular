import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(user:string,password:string):boolean{
    if(user ==='user' && password === 'password'){
      localStorage.setItem('username',user);//object HTML que nos permite guardar datos
      return true;
    }
    return false;
  }

  logout():any{
    localStorage.removeItem('username');
  }

  getUser():any{
    return localStorage.getItem('username');
  }

  isLoggedIn():boolean{
    return this.getUser() != null;
  }
}
