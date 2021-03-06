import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { IProducto } from 'src/app/interfaces/i-producto';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

  filtrobusqueda = "";

  filtrocategoria: string = "";

  p :number = 1;

  producto: IProducto = {
    id: 0,
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    marca: "",
    imagen: "",
    cantidad: 1,
    stock: 0
  }

  productos: IProducto[];

  productossinfiltro: IProducto[];

  productosCarrito: IProducto[] = [];

  productoeditado: IProducto = {
    id: 0,
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    marca: "",
    imagen: "",
    cantidad: 1,
    stock: 0
  }

  usuarioactivo : IUsuario = {
    nick: "",
    nombre: "",
    correo: "",
    contrasenya: "",
    contrasenya2: ""
  }

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(
    private productoService: ProductosService,
    private router: Router,
    private cookieService: CookieService,
    private spinner: NgxSpinnerService,

  ) {


   }



  //SE INICIA AUTOMÁTICAMENTE
  ngOnInit(): void {
    //-- Forma Cookies (usuario) ---------------
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
    //------------------------------------------
    //-- leer Productos ------------------------
    this.obtenerProductos();
    //------------------------------------------
    if(sessionStorage.getItem('carrito')) {
      if(sessionStorage.getItem('carrito').length > 0) {
        this.productosCarrito = JSON.parse(sessionStorage.getItem('carrito'));

      }
    }
      //spinner
      this.spinner.show();

      setTimeout(() => {
        this.spinner.hide();

      }, 1500);
      //-------
      //Comprobar modo oscuro
      if(sessionStorage.getItem('theme') == "modooscuro") {
        $("app-productos").addClass("darkmode");
        $("#nav-prod1").removeClass("bg-light");
        $("#nav-prod1").addClass("bg-dark");
        $("#nav-prod2").removeClass("bg-light");
        $("#nav-prod2").addClass("bg-dark");
        $("a").removeClass("txtdark");
        $("a").addClass("txtlight");
        $("#botoncolaps").removeClass("txtdark");
        $("#botoncolaps").addClass("txtlight");


      } else if (sessionStorage.getItem('theme') == "modoclaro"){
        $('app-productos').removeClass("darkmode");
        $("#nav-prod1").addClass("bg-light");
        $("#nav-prod1").removeClass("bg-dark");
        $("#nav-prod2").addClass("bg-light");
        $("#nav-prod2").removeClass("bg-dark");
        $("a").addClass("txtdark");
        $("a").removeClass("txtlight");
        $("#botoncolaps").addClass("txtdark");
        $("#botoncolaps").removeClass("txtlight");
      }

  }
/*----------------------- CREAR PRODUCTO -----------------------*/
  crearProducto() {
      this.productoService.addProduct(this.producto).subscribe(()=>{

        this.producto = {
          id: 0,
          nombre: "",
          precio: 0,
          descripcion: "",
          categoria: "",
          marca: "",
          imagen: "",
          stock: 0
        }
        $("#crear-productoimg").val("");
        this.obtenerProductos();
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'El producto se ha creado correctamente',
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
      });

  }
/*----------------------- OBTENER PRODUCTOS --------------------*/
  obtenerProductos(){
      this.productoService.readProduct().subscribe((data: any) =>{

      this.productos = data;
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- ELIMINAR PRODUCTOS -------------------*/
  eliminarProductos(id: number, posicion: number){
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
        this.productoService.deleteProduct(id).subscribe((data: any) =>{
          this.productos.splice(posicion, 1);
          this.p=1;
          this.obtenerProductos();
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
/*----------------------- EDITAR PRODUCTOS ---------------------*/
  updateProducts(datosEditados: IProducto){

    this.productoService.editProduct(datosEditados).subscribe((data: any) =>{
      this.producto = {
        id: 0,
        nombre: "",
        precio: 0.5 ,
        descripcion: "",
        categoria: "",
        marca: "",
        imagen: "",
        stock: 0
      }
      this.obtenerProductos();
      $("#editar-productoimg").val("");
  });
  }
/*--------------------------------------------------------------*/
/*----------------------- PASAR INFO PARA UPDATE ---------------*/
  pasarInfo(datos: IProducto){
    this.productoeditado.id = datos.id;
    this.productoeditado.nombre = datos.nombre;
    this.productoeditado.precio = datos.precio;
    this.productoeditado.descripcion = datos.descripcion;
    this.productoeditado.categoria = datos.categoria;
    this.productoeditado.marca = datos.marca;
    this.productoeditado.imagen = datos.imagen;
    this.productoeditado.stock = datos.stock;
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
      this.producto.imagen = reader.result as string;
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- FILE SELECTED ------------------------*/
  onFileSelected(event: any){
      this.changeImage(event.target);
  }
/*--------------------------------------------------------------*/
/*----------------------- CHANGE IMAGE 2 -----------------------*/
  changeImage2(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.productoeditado.imagen = reader.result as string;
    });
  }
/*--------------------------------------------------------------*/
/*----------------------- FILE SELECTED 2 ----------------------*/
  onFileSelected2(event: any){
      this.changeImage2(event.target);
  }
/*--------------------------------------------------------------*/
/*----------------------- EMITIR 1 -----------------------------*/
  pushACarrito(datoEmitido: IProducto){
    if(sessionStorage.getItem('carrito')){
      this.productosCarrito = JSON.parse(sessionStorage.getItem('carrito'));
    }
    let existe: boolean = false;
    for (let i = 0; i < this.productosCarrito.length; i++) {
      if(this.productosCarrito[i].id == datoEmitido.id) {

        existe = true;
        break;
      }
    }
    if(!existe) {
      datoEmitido.cantidad = 1;
      datoEmitido.precioporunidad = datoEmitido.precio;
      this.productosCarrito.push(datoEmitido);
      //creamos la ss para el producto
      sessionStorage.setItem('carrito',JSON.stringify(this.productosCarrito));
      this.productoService.productoEmitido.next(this.productosCarrito);
    }

  }
/*--------------------------------------------------------------*/
/*----------------------- FILTRAR CATEGORIA --------------------*/
  filtrarCategoria(filtro: string){
    if(this.filtrocategoria == filtro) {

      this.filtrocategoria == null;
      this.filtrarCategoria("");


    } else {
      this.filtrocategoria = filtro;
    }
  }
/*--------------------------------------------------------------*/
/*----------------------- COMPROBAR TEMA -----------------------*/
  comprobarTema() {
    if(sessionStorage.getItem('theme') == "modooscuro") {

      $("#c-editar-producto").addClass("darkmode");
      $("#c-crear-producto").addClass("darkmode");

    } else if (sessionStorage.getItem('theme') == "modoclaro"){

      $("#c-editar-producto").removeClass("darkmode");
      $("#c-crear-producto").removeClass("darkmode");
    }
  }
/*--------------------------------------------------------------*/
}
