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

  //SESIÓN
  //Crear usuario
  addUsuario(usuario: IUsuario){
    return this.http.post(`${this.baseUrl}/usuario/crear_usuario.php`, usuario);
  }

  //Iniciar sesión
  logIn(usuario: IUsuario){
    return this.http.post(`${this.baseUrl}/usuario/iniciar_sesion.php`, usuario);
  }

  //PIC
  //Actualizar pic
  updatePic(usuario: IUsuario){
    return this.http.put(`${this.baseUrl}/usuario/update_imagen.php`, usuario);
  }

  //Obtener pic
  getPic(usuario: IUsuario){
    return this.http.post(`${this.baseUrl}/usuario/obtener_pic.php`, usuario);
  }

  //Ver usuarios
  readUsuarios(){
    return this.http.get(`${this.baseUrl}/usuario/ver_usuarios.php`);
  }

 //Eliminar usuarios
 deleteUsuario(id: number){
  return this.http.delete(`${this.baseUrl}/usuario/borrar_usuario.php?id=${id}`);
}
}
