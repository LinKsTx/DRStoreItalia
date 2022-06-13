import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProducto } from 'src/app/interfaces/i-producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

/*----------------------- DECLARAR VARIABLES -------------------*/

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

/*--------------------------------------------------------------*/

  //CONSTRUCTOR
  constructor(
    private productoService: ProductosService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

   }

  //SE INICIA AUTOMÁTICAMENTE
  ngOnInit(): void {
    this.obtenerProductos();
    $
    //spinner
    // $(".ocultar").hide();
    // this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    //   $(".ocultar").show();
    // }, 1500);

    $(document).scroll(function(){
      $("#uno").addClass("animate__fadeInLeft");
      $("#uno").addClass("animate__fadeInLeft");
  });
    //-------
 //comprobar tema
 if(sessionStorage.getItem('theme') == "modooscuro") {
  $("app-home").addClass("darkmode");
} else if (sessionStorage.getItem('theme') == "modoclaro"){
  $('app-home').removeClass("darkmode");
}
//spinner
this.spinner.show();

setTimeout(() => {
  this.spinner.hide();

}, 1500);
  }

/*----------------------- OBTENER PRODUCTOS --------------------*/
obtenerProductos(){
  this.productoService.readProduct().subscribe((data: any) =>{
  this.productos = data;
});
}
/*--------------------------------------------------------------*/
/*----------------------- REEDIRECCIÓN PRODUCTOS ---------------*/
toProductos(){
  this.router.navigate(['/productos']);
}
/*--------------------------------------------------------------*/
/*----------------------- REEDIRECCIÓN BLOGS -------------------*/
toBlog(){
  this.router.navigate(['/blog']);
}
/*--------------------------------------------------------------*/
}
