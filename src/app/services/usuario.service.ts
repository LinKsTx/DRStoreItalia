import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUsuario } from '../interfaces/i-usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  //Usuarios
  //Crear usuario
  addUsuario(usuario: IUsuario){
    return this.http.post(`${this.baseUrl}/usuario/crear_usuario.php`, usuario);
  }

  //Iniciar sesión
  logIn(usuario: IUsuario){
    return this.http.post(`${this.baseUrl}/usuario/iniciar_sesion.php`, usuario);
  }

}
