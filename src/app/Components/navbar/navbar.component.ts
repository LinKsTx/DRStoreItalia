import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as bootstrap from 'bootstrap';
import { ViewChild, ElementRef} from '@angular/core';
import { IProducto } from 'src/app/interfaces/i-producto';
import { ProductosService } from 'src/app/services/productos.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

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
    contrasenya2: "",
    pic : ""
  }

  carrito: IProducto[];

   //Usuario perfil
   usuarioperfil : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: "",
    pic: ""
  }

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(
    private usuarioService: UsuarioService,
    private productosService: ProductosService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  //SE INICIA AUTOMÁTICAMENTE
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
    //obtenemos el pic del usuario activo y lo igualamos a this.usuarioactivo.
    this.getPic();
    //push a carrito
    this.productosService.productoEmitido.subscribe(respuesta =>{
      this.carrito = respuesta,
      console.log(this.carrito); })
  }

/*----------------------- CREAR USUARIO ------------------------*/
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
/*--------------------------------------------------------------*/
/*----------------------- LOG IN -------------------------------*/
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
    this.getPic();
    });
    console.log(this.usuarioactivo);
  }
/*--------------------------------------------------------------*/
/*----------------------- LOG OUT ------------------------------*/
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
/*--------------------------------------------------------------*/
/*----------------------- RESET FORM ---------------------------*/
  resetForm(form: NgForm) {
    form.reset();
  }
  /*------------------------------------------------------------*/
/*----------------------- TOGGLE ALERT -------------------------*/
  toogleAlert() {
    $("#alertacreacionusuario").toggle();
  }
  /*------------------------------------------------------------*/
  /*--------------------- UPDATE PIC ---------------------------*/
  updatePic() {
    //igualar el creado con el activo
    this.usuarioperfil.nick = this.usuarioactivo.nick;
    this.usuarioperfil.nombre = this.usuarioactivo.nombre;
    this.usuarioperfil.correo = this.usuarioactivo.correo;
    this.usuarioperfil.contrasenya = this.usuarioactivo.contrasenya;

    //servicio
    this.usuarioService.updatePic(this.usuarioperfil).subscribe((respuesta)=>{
      this.usuarioperfil.pic = "";
      this.getPic();
    });
    console.log(this.usuarioperfil.pic);
  }
/*----------------------- CHANGE IMAGE -------------------------*/
  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.usuarioperfil.pic = reader.result as string;
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- FILE SELECTED ------------------------*/
  onFileSelected(event: any){
      this.changeImage(event.target);
  }
/*--------------------------------------------------------------*/
/*----------------------- GET PIC ------------------------------*/
  getPic() {
    this.usuarioService.getPic(this.usuarioactivo).subscribe((respuesta: any)=>{
      console.log(respuesta[0].pic);
      this.usuarioactivo.pic = respuesta[0].pic;
    });
  }
  /*------------------------------------------------------------*/
}
