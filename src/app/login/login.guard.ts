import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService,
               public router: Router ) {}

  canActivate() {
    
      console.log('IS EXPIRED ', this._usuarioService.isTokenExpired());
      console.log('ESTA LOGEAO ', this._usuarioService.estaLogueado());
       if (this._usuarioService.estaLogueado()) {
        return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
  
    }
}

