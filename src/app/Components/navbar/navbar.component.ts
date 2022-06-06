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
import { PedidosService } from 'src/app/services/pedidos.service';
import { IPedido } from 'src/app/interfaces/i-pedido';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

  preciofinal: number;

  ne: boolean = true;

  //observamos el boton de cerrar el modal
  @ViewChild('cerrarmodalis') cerrarmodalis: ElementRef;
  @ViewChild('cerrarmodalcu') cerrarmodalcu: ElementRef;
  @ViewChild('cerrarmodalco') cerrarmodalco: ElementRef;

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

  usuarioslist: IUsuario[];

  //Recoge el usuario activo
  usuarioactivo : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: "",
    pic : ""
  }

  carrito: IProducto[] = [];

   //Usuario perfil
   usuarioperfil : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: "",
    pic: ""
  }

  pedido: IPedido = {
    pedido: "",
  }

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(
    private usuarioService: UsuarioService,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
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
    //------------------------------------------------------------------------
    //push a carrito mediante servicio
    this.productosService.productoEmitido.subscribe(respuesta =>{
      this.carrito = JSON.parse(sessionStorage.getItem('carrito'));
      this.ne = true;
      console.log(this.carrito); })

      if(sessionStorage.getItem('carrito')) {
        if(sessionStorage.getItem('carrito').length > 0) {
          this.ne = true;
        }
      } else {
        this.ne = false;
      }
    //--------------
    //Comprobamos array de carrito
    if(this.carrito) {
      if(this.carrito.length == 0) {
      this.ne = false;
      }
    }

    //------------------
    //obtenemos usuarios
    this.obtenerUsuarios();
    //------------------
    //hide de alertas y errores
    $("#errornickexistente").hide();
    $("#errorcorreoexistente").hide();
    $("#errorcorreocontra").hide();
    $("#alertacreacionusuario").hide();
    $("#carritovacio").hide();
    //-------------------------------
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
      //mostramos y hacemos hide con fade el error
      $("#errorcorreoexistente").fadeIn();
      setTimeout(() => {
        $("#errorcorreoexistente").fadeOut();
      }, 3000);
      } else if (respuesta == 4) {
        this.boolean2 = true;
      //mostramos y hacemos hide con fade el error
      $("#errornickexistente").fadeIn();
      setTimeout(() => {
        $("#errornickexistente").fadeOut();
      }, 3000);
      } else if (respuesta == 5) {
        this.boolean1 = true;
        this.boolean2 = true;
      //mostramos y hacemos hide con fade el error
      $("#errornickexistente").fadeIn();
      $("#errorcorreoexistente").fadeIn();
      setTimeout(() => {
        $("#errornickexistente").fadeOut();
        $("#errorcorreoexistente").fadeOut();
      }, 3000);
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
        $("#alertacreacionusuario").fadeIn();
        setTimeout(() => {
          $("#alertacreacionusuario").fadeOut();
        }, 4000);
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
      this.boolean3 = true;
      //mostramos y hacemos hide con fade el error
      $("#errorcorreocontra").fadeIn();
      setTimeout(() => {
        $("#errorcorreocontra").fadeOut();
      }, 3000);
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
/*--------------------------------------------------------------*/
/*----------------------- TOGGLE ALERT (CERRAR) ----------------*/
  toogleAlertFadeOut(alerta: string) {
    $(alerta).fadeOut();
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
/*--------------------------------------------------------------*/
/*----------------------- OBTENER USUARIOS ---------------------*/
  obtenerUsuarios(){
      this.usuarioService.readUsuarios().subscribe((data: any) =>{
      console.log(data);
      this.usuarioslist = data;
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- VACIAR CARRITO -----------------------*/
  vaciarCarrito(){
    if(this.carrito) {
      if(this.carrito.length == 0) {
        //mostramos y hacemos hide con fade el error
        $("#carritovacio").fadeIn();
        setTimeout(() => {
          $("#carritovacio").fadeOut();
        }, 3000);
      } else {
        this.carrito = [];
        sessionStorage.setItem("carrito", JSON.stringify([]));
        // sessionStorage.removeItem('carrito');
        this.ne = false;
      }
    } else {
      //mostramos y hacemos hide con fade el error
      $("#carritovacio").fadeIn();
      setTimeout(() => {
        $("#carritovacio").fadeOut();
      }, 3000);
    }

  }
/*--------------------------------------------------------------*/
/*----------------------- BORRAR PRODUCTO DE CARRITO -----------*/
  borrarProducto(id: number){
    console.log(this.carrito);
    this.carrito = this.carrito.filter(element=>element.id !== id);
    sessionStorage.removeItem('carrito');
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    console.log(this.carrito);
    if(this.carrito.length == 0) {
      this.ne = false;
    }

  }
/*--------------------------------------------------------------*/
/*----------------------- CREAR PEDIDO -------------------------*/
  crearPedido(){
  this.pedido.pedido = JSON.stringify(this.carrito);
  this.pedido.id_usuario = this.usuarioactivo.id;
  console.log(this.carrito);
  if(this.carrito) {
    if(this.carrito.length == 0) {
      //mostramos y hacemos hide con fade el error
      $("#carritovacio").fadeIn();
      setTimeout(() => {
        $("#carritovacio").fadeOut();
      }, 3000);
    } else {
      this.pedidosService.addPedido(this.pedido).subscribe((respuesta)=>{
        console.log(this.usuarioactivo);
        this.vaciarCarrito();
        this.pedido.pedido = "";
        // $("#alertacomprarealizada").fadeIn();
        // setTimeout(() => {
        //   $("#alertacomprarealizada").fadeOut();
        // }, 4000);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'La compra se ha realizado correctamente',
          width: "300px",
          heightAuto: false,
          showClass: {
            popup: 'animate__animated animate__fadeInRight'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRight'
          },
          showConfirmButton: false,
          timer: 1500
        })
        this.cerrarmodalco.nativeElement.click();
        // window.location.reload();
      });
  }
    } else {
      //mostramos y hacemos hide con fade el error
      $("#carritovacio").fadeIn();
      setTimeout(() => {
        $("#carritovacio").fadeOut();
      }, 3000);
  }



  }
/*--------------------------------------------------------------*/
/*----------------------- SUMAR CANTIDAD ------------------------*/
  sumarCantidad(producto: IProducto){
  //se hacen los cambios
  if(producto.cantidad == 10) {
  } else {
    producto.cantidad++;
    producto.precio = producto.precioporunidad * producto.cantidad;
  //se localiza posicion en array local
  for(let i=0; i< this.carrito.length;i++) {
    if(this.carrito[i].id == producto.id) {
      this.carrito[i].cantidad = producto.cantidad;
    }
  }
  //se actualiza ss
  sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
}
  }
/*--------------------------------------------------------------*/
/*----------------------- RESTAR CANTIDAD ------------------------*/
  restarCantidad(producto: IProducto){
  //se hacen los cambios
  if(producto.cantidad == 1) {
  } else {
    producto.cantidad--;
    producto.precio = producto.precioporunidad * producto.cantidad;
  }
   //se localiza posicion en array local
   for(let i=0; i< this.carrito.length;i++) {
    if(this.carrito[i].id == producto.id) {
      this.carrito[i].cantidad = producto.cantidad;
    }
  }
  //se actualiza ss
  sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
  }
  /*--------------------------------------------------------------*/
}
