import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as bootstrap from 'bootstrap';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //observamos el boton de cerrar el modal
  @ViewChild('cerrarmodalis') cerrarmodalis: ElementRef;
  @ViewChild('cerrarmodalcu') cerrarmodalcu: ElementRef;

  //Boolean para sacar código de correo ya existente
  boolean1: boolean = false;

  //Boolean para sacar código de nick ya existente
  boolean2: boolean = false;

  //Boolean para sacar código de error en inicio de sesión
  boolean3: boolean = false

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
    private cookieService: CookieService,
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
  crearUsuario(form: NgForm){
    //hacemos el insert
    console.log(this.usuario);
    this.usuarioService.addUsuario(this.usuario).subscribe((respuesta)=>{
      console.log(respuesta);

      this.boolean1 = false;
      this.boolean2 = false;

      if(respuesta == 3) {
        this.boolean1 = true;
      } else if (respuesta == 4) {
        this.boolean2 = true;
      } else if (respuesta == 5) {
        this.boolean1 = true;
        this.boolean2 = true;
      } else {
        this.usuario = {
          nick: "",
          nombre: "",
          correo: "",
          contrasenya: "",
          contrasenya2: ""
        }
        form.reset();
        //literalmente es como hacer un click al boton de cerrar del modal
        this.cerrarmodalcu.nativeElement.click();
        this.router.navigate(['/home']);
        this.toogleAlert();
      }
    });
  }
/*-------------------------------------------------------------*/
/*----------------------- LOG IN -----------------------*/
  logIn(form: NgForm){
    this.usuarioService.logIn(this.usuario).subscribe((resp: any) =>{
    //-- Forma sessionStorage --------
    // sessionStorage.setItem('user',JSON.stringify(resp[0]));
    // this.usuarioactivo = resp[0];
    // console.log(this.usuarioactivo);
    //--------------------------------
    //-- Forma Cookies ---------------
    console.log(resp);
    this.boolean3 = false;
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
      form.reset();
      //clickamos el boton del modal para cerrar
      this.cerrarmodalis.nativeElement.click();
      this.router.navigate(['/home']);
    } else {
      this.errorLogIn = "Correo y contraseña no coinciden";
      this.boolean3 = true;
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
    this.router.navigate(['/home']);
  }
/*-------------------------------------------------------*/
/*----------------------- RESET FORM -----------------------*/
  resetForm(form: NgForm) {
    form.reset();
  }
  /*----------------------------------------------------------*/
/*----------------------- TOGGLE ALERT -----------------------*/
  toogleAlert() {
    $("#alertacreacionusuario").toggle();
  }
  /*------------------------------------------------------------*/
}
