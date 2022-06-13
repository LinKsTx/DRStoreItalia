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
import { TranslateService } from '@ngx-translate/core';


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
  @ViewChild('cerrarmodalvp') cerrarmodalvp: ElementRef;

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
    domicilio: "",
    contrasenya: "",
    contrasenya2: ""
  }

  usuarioslist: IUsuario[];

  //Recoge el usuario activo
  usuarioactivo : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    domicilio: "",
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
    fecha_pedido: new Date(Date.now()),
  }

  transaccion: IPedido[] = [];

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(
    private usuarioService: UsuarioService,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private router: Router,
    private cookieService: CookieService,

  ) {

  }

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
    }
    //--------------------------------
    //obtenemos el pic del usuario activo y lo igualamos a this.usuarioactivo.
    this.getPic();
    //------------------------------------------------------------------------
    //push a carrito mediante servicio
    this.productosService.productoEmitido.subscribe(respuesta =>{
      this.carrito = JSON.parse(sessionStorage.getItem('carrito'));
      this.ne = true; })

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
    $("#nofotoselected").hide();
    //-------------------------------

    if(this.usuarioactivo.tipo == 1) {
      this.obtenerPedidos();
    }

    if(sessionStorage.getItem('theme') == "modooscuro") {
      //color fondo
      $("#navxs").removeClass("bg-light");
      $("#navxs").addClass("bg-dark");
      $("#navxl").removeClass("bg-light");
      $("#navxl").addClass("bg-dark");
      //letra
      $("#navegadorxs").removeClass("navbar-light");
      $("#navegadorxs").addClass("navbar-dark");
      $("#navegadorxl").removeClass("navbar-light");
      $("#navegadorxl").addClass("navbar-dark");
      //imagen
      $("#logoxs").attr("src",'../../../assets/images/logo-claro.png');
      $("#logoxl").attr("src",'../../../assets/images/logo-claro.png');
      $("ul#dropdown-confoto").removeClass("bg-light");
      $("ul#dropdown-confoto").addClass("bg-dark");

    } else if (sessionStorage.getItem('theme') == "modoclaro"){
      //color fondo
      $("#navxs").removeClass("bg-dark");
      $("#navxs").addClass("bg-light");
      $("#navxl").removeClass("bg-dark");
      $("#navxl").addClass("bg-light");
      //letra
      $("#navegadorxs").removeClass("navbar-dark");
      $("#navegadorxs").addClass("navbar-light");
      $("#navegadorxl").removeClass("navbar-dark");
      $("#navegadorxl").addClass("navbar-light");
      //imagen
      $("#logoxs").attr("src",'../../../assets/images/logo-oscuro.png');
      $("#logoxl").attr("src",'../../../assets/images/logo-oscuro.png');


    }

}

/*----------------------- CREAR USUARIO ------------------------*/
  crearUsuario(form: NgForm){
    //hacemos el insert
    this.usuarioService.addUsuario(this.usuario).subscribe((respuesta)=>{

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
          domicilio: "",
          contrasenya: "",
          contrasenya2: ""
        }
        form.reset();
        //literalmente es como hacer un click al boton de cerrar del modal
        this.cerrarmodalcu.nativeElement.click();
        this.router.navigate(['/home']);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'La cuenta se ha creado correctamente',
          width: "300px",
          heightAuto: false,
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          },
          showConfirmButton: false,
          timer: 1500
        })
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

    //--------------------------------
    //-- Forma Cookies ---------------

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
    if(this.usuarioactivo.tipo == 1) {
      this.obtenerPedidos();
    }
    });

  }
/*--------------------------------------------------------------*/
/*----------------------- LOG OUT ------------------------------*/
  logOut() {
    //-- Forma sessionStorage --------
    //sessionStorage.clear();
    //--------------------------------
    //-- Forma Cookies ---------------
    //vacias la cookie hasta volver a iniciar sesión
    //borramos cookies de las 2 formas por que hay errores en ciertos navegadores
    document.cookie = "user" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.cookieService.delete("user");
    //--------------------------------
    //vacias usuarioactivo al cerrar sesión
    this.usuarioactivo = {
      nick: "",
      nombre: "",
      correo: "",
      domicilio: "",
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
/*--------------------------------------------------------------*/
/*--------------------- UPDATE PIC -----------------------------*/
  updatePic() {
    //igualar el creado con el activo
    this.usuarioperfil.nick = this.usuarioactivo.nick;
    this.usuarioperfil.nombre = this.usuarioactivo.nombre;
    this.usuarioperfil.correo = this.usuarioactivo.correo;
    this.usuarioperfil.contrasenya = this.usuarioactivo.contrasenya;


    if($("#editarfoto").val() == "") {
      //mostramos y hacemos hide con fade el error
      $("#nofotoselected").fadeIn();
      setTimeout(() => {
        $("#nofotoselected").fadeOut();
      }, 3000);
    } else {
      //servicio
      this.usuarioService.updatePic(this.usuarioperfil).subscribe((respuesta)=>{
        this.usuarioperfil.pic = "";
        this.getPic();
        $("#editarfoto").val("");
      });
    }




  }
/*--------------------------------------------------------------*/
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

        this.usuarioactivo.pic = respuesta[0].pic;
      });
  }
/*--------------------------------------------------------------*/
/*----------------------- OBTENER USUARIOS ---------------------*/
  obtenerUsuarios(){
      this.usuarioService.readUsuarios().subscribe((data: any) =>{

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

    this.carrito = this.carrito.filter(element=>element.id !== id);
    sessionStorage.removeItem('carrito');
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));

    if(this.carrito.length == 0) {
      this.ne = false;
    }

  }
/*--------------------------------------------------------------*/
/*----------------------- CREAR PEDIDO -------------------------*/
  crearPedido(){
  this.pedido.pedido = JSON.stringify(this.carrito);
  this.pedido.id_usuario = this.usuarioactivo.id;

  if(this.carrito) {
    if(this.carrito.length == 0) {
      //mostramos y hacemos hide con fade el error
      $("#carritovacio").fadeIn();
      setTimeout(() => {
        $("#carritovacio").fadeOut();
      }, 3000);
    } else {
      this.pedidosService.addPedido(this.pedido).subscribe((respuesta: any)=>{
        this.vaciarCarrito();
        this.pedido.pedido = "";
        // $("#alertacomprarealizada").fadeIn();
        // setTimeout(() => {
        //   $("#alertacomprarealizada").fadeOut();
        // }, 4000);
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'La compra se ha realizado correctamente',
          width: "300px",
          heightAuto: false,
          showClass: {
            popup: 'animate__animated animate__fadeIn'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOut'
          },
          showConfirmButton: false,
          timer: 1500
        })
        this.cerrarmodalco.nativeElement.click();
        // window.location.reload();
        this.obtenerPedidos();
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
/*----------------------- SUMAR CANTIDAD -----------------------*/
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
/*----------------------- RESTAR CANTIDAD ----------------------*/
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
/*----------------------- OBTENER PEDIDOS ----------------------*/
  obtenerPedidos() {
    this.pedidosService.obtenerPedidosID(this.usuarioactivo.id).subscribe((data: any) =>{
      this.transaccion = data;
      for(let i=0; i < this.transaccion.length; i++) {
        this.transaccion[i].pedidoarray = JSON.parse(this.transaccion[i].pedido);
      }
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- OBTENER PEDIDOS ----------------------*/
  obtenerPedidosPorId(id: number) {
    this.transaccion = [];
    this.pedidosService.obtenerPedidosID(id).subscribe((data: any) =>{
      this.transaccion = data;
      for(let i=0; i < this.transaccion.length; i++) {
        this.transaccion[i].pedidoarray = JSON.parse(this.transaccion[i].pedido);
      }
    }, error => {
    //   Swal.fire({
    //   icon: 'error',
    //   title: 'Ha ocurrido un error',
    //   text: '¡El usuario seleccionado, no tiene pedidos!',
    //   footer: '<a href="">Why do I have this issue?</a>'
    // })
    // this.cerrarmodalvp.nativeElement.click();
  });
  }
/*--------------------------------------------------------------*/
/*----------------------- ELIMINAR USUARIO ---------------------*/
  eliminarUsuario(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUsuario(id).subscribe((data: any) =>{
          this.usuarioslist = this.usuarioslist.filter(element=>element.id !== id);
      });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
/*--------------------------------------------------------------*/
/*----------------------- COMPROBAR TEMA ---------------------*/
  comprobarTema() {
    if(sessionStorage.getItem('theme') == "modooscuro") {
      $("#dropdown-sinfotoxs").removeClass("bg-light");
      $("#dropdown-sinfotoxs").addClass("bg-dark");

      $("#dropdown-confotoxs").removeClass("bg-light");
      $("#dropdown-confotoxs").addClass("bg-dark");

      $("#dropdown-confotoxsxs").removeClass("bg-light");
      $("#dropdown-confotoxsxs").addClass("bg-dark");

      $("#dropdown-sinfoto").removeClass("bg-light");
      $("#dropdown-sinfoto").addClass("bg-dark");

      $("#dropdown-confoto").removeClass("bg-light");
      $("#dropdown-confoto").addClass("bg-dark");

      $("#dropdown-carrito").removeClass("bg-light");
      $("#dropdown-carrito").addClass("bg-dark");

      $("#c-iniciar-sesion").addClass("darkmode");
      $("#c-crear-usuario").addClass("darkmode");
      $("#c-perfil").addClass("darkmode");
      $("#c-perfil-xs").addClass("darkmode");
      $("#c-carritocompra").addClass("darkmode");
      $("#c-admin").addClass("darkmode");
      $("#c-ver_pedidos").addClass("darkmode");
      $("#carrito").addClass("darkmode");

      $("#vptt").addClass("darkmode");

    } else if (sessionStorage.getItem('theme') == "modoclaro"){

      $("#dropdown-sinfotoxs").addClass("bg-light");
      $("#dropdown-sinfotoxs").removeClass("bg-dark");

      $("#dropdown-confotoxs").addClass("bg-light");
      $("#dropdown-confotoxs").removeClass("bg-dark");

      $("#dropdown-confotoxsxs").addClass("bg-light");
      $("#dropdown-confotoxsxs").removeClass("bg-dark");

      $("#dropdown-sinfoto").addClass("bg-light");
      $("#dropdown-sinfoto").removeClass("bg-dark");

      $("#dropdown-confoto").addClass("bg-light");
      $("#dropdown-confoto").removeClass("bg-dark");

      $("#dropdown-carrito").addClass("bg-light");
      $("#dropdown-carrito").removeClass("bg-dark");

      $("#c-iniciar-sesion").removeClass("darkmode");
      $("#c-crear-usuario").removeClass("darkmode");
      $("#c-perfil").removeClass("darkmode");
      $("#c-perfilxs").removeClass("darkmode");
      $("#c-carritocompra").removeClass("darkmode");
      $("#c-admin").removeClass("darkmode");
      $("#c-ver_pedidos").removeClass("darkmode");
      $("#carrito").removeClass("darkmode");

      $("#vptt").removeClass("darkmode");
    }
  }
  xd() {
    console.log("a");

    if(sessionStorage.getItem('theme') == "modooscuro") {

      $("#vptt").addClass("darkmode");

    } else if (sessionStorage.getItem('theme') == "modoclaro"){


      $("#vptt").removeClass("darkmode");
    }
  }
/*--------------------------------------------------------------*/
}
