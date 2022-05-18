import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //Para no crear cookie si inicias sesión mal
  errorLogIn: String = "";

  //Recoge usuario
  usuario : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: ""
  }

  //Recoge el usuario activo
  usuarioactivo : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: ""
  }

  //Constructor
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  //Se inicia automáticamente
  ngOnInit(): void {
    //-- Forma sessionStorage --------
    // if(sessionStorage.length>0){
    //   this.usuarioactivo = JSON.parse(sessionStorage.getItem('user'));
    // }
    //--------------------------------
    //-- Forma Cookies ---------------
    let busca;
    let micookie;
    let igual;
    let valor;
    let listaCookies = document.cookie.split(";");
    for (let i in listaCookies) {
      busca = listaCookies[i].search("user");
      if (busca > -1) {
        micookie=listaCookies[i]
        igual = micookie.indexOf("=");
        valor = micookie.substring(igual+1);
      }

    }
    if(valor) {
      this.usuarioactivo = JSON.parse(valor);
    } else{
      console.log ("No hay usuario activo");
    }
    //--------------------------------
  }
/*----------------------- CREAR USUARIO -----------------------*/
  crearUsuario(){
    //hacemos el insert
    console.log(this.usuario);
    this.usuarioService.addUsuario(this.usuario).subscribe(()=>{
      //vaciamos array
      this.usuario = {
        nick: "",
        nombre: "",
        correo: "",
        contrasenya: "",
        contrasenya2: ""
      }
    });
  }
/*-------------------------------------------------------------*/
/*----------------------- LOG IN -----------------------*/
  logIn(){
    this.usuarioService.logIn(this.usuario).subscribe((resp: any) =>{
    //-- Forma sessionStorage --------
    // sessionStorage.setItem('user',JSON.stringify(resp[0]));
    // this.usuarioactivo = resp[0];
    // this.router.navigate(['/home']);
    // console.log(this.usuarioactivo);
    //--------------------------------
    //-- Forma Cookies ---------------
    console.log(resp);
    if (resp != "X") {
      let expires = (new Date(Date.now()+ 86400*30000)).toUTCString();
      document.cookie =  "user="+JSON.stringify(resp[0])+";expires="+expires;
      //sacar valor de la cookie que acabamos de crear
      let busca;
      let micookie;
      let igual;
      let valor;
      let listaCookies = document.cookie.split(";");
      for (let i in listaCookies) {
        busca = listaCookies[i].search("user");
        if (busca > -1) {
        micookie=listaCookies[i]
        igual = micookie.indexOf("=");
        valor = micookie.substring(igual+1);
        }
      }
      this.usuarioactivo = JSON.parse(valor);
    } else {

      this.errorLogIn = "Correo y contraseña no coinciden";

    }

    //--------------------------------
    });
  }
/*------------------------------------------------------*/
/*----------------------- LOG OUT -----------------------*/
  logOut() {
    //-- Forma sessionStorage --------
    //sessionStorage.clear();
    //--------------------------------
    //-- Forma Cookies ---------------
    //vacias la cookie hasta volver a iniciar sesión
    document.cookie = "user" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    //--------------------------------
    //vacias usuarioactivo al cerrar sesión
    this.usuarioactivo = {
      nick: "",
      nombre: "",
      correo: "",
      contrasenya: "",
      contrasenya2: ""
    }
  }
/*-------------------------------------------------------*/
}
