import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { IProducto } from 'src/app/interfaces/i-producto';
import { IUsuario } from 'src/app/interfaces/i-usuario';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  /*----------------------- DECLARAR VARIABLES -------------------*/

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
    private cookieService: CookieService
  ) { }

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
      console.log ("No hay usuario activo");
    }
    //------------------------------------------
    //-- leer Productos ------------------------
    this.obtenerProductos();
    //------------------------------------------
  }

/*----------------------- CREAR PRODUCTO -----------------------*/
crearProducto() {
    this.productoService.addProduct(this.producto).subscribe(()=>{
      console.log(this.producto);
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
      this.obtenerProductos();
    });
}
/*----------------------- OBTENER PRODUCTOS --------------------*/
obtenerProductos(){
    this.productoService.readProduct().subscribe((data: any) =>{
    console.log(data);
    this.productos = data;
  });
}
/*--------------------------------------------------------------*/
/*----------------------- ELIMINAR BLOGS -----------------------*/
eliminarProductos(id: number, posicion: number){
  this.productoService.deleteProduct(id).subscribe((data: any) =>{
    this.productos.splice(posicion, 1);
});
}
/*--------------------------------------------------------------*/
/*----------------------- EDITAR BLOGS -------------------------*/
updateProducts(datosEditados: IProducto){
  console.log(datosEditados);
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
/*----------------------- CHANGE IMAGE 2 ------------------------*/
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
/*----------------------- EMITIR 1 ------------------------*/
pushACarrito(datoEmitido: IProducto){
  let existe: boolean = false;
  for (let i = 0; i < this.productosCarrito.length; i++) {
    if(this.productosCarrito[i] == datoEmitido) {
      console.log("el producto ya ha sido añadido");
      existe = true;
      break;
    }
  }
  if(!existe) {
    this.productosCarrito.push(datoEmitido);
    this.productoService.productoEmitido.next(this.productosCarrito);
  }
}
/*--------------------------------------------------------------*/
}
