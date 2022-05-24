import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducto } from 'src/app/interfaces/i-producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-detail',
  templateUrl: './productos-detail.component.html',
  styleUrls: ['./productos-detail.component.scss']
})
export class ProductosDetailComponent implements OnInit {

  xd: string;

  producto: IProducto = {
    id: 0,
    nombre: "",
    precio: 0,
    descripcion: "",
    categoria: "",
    marca: "",
    imagen: "",
    stock: 0
  }

  constructor(private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

    ngOnInit() {
      const id = +this.route.snapshot.params["id"]; // Recibimos parámetro
      this.productosService.readProductId(id)
      .subscribe(
      (p : any)=> this.producto = p[0],
      error => console.error(error)
      );
      this.stock();
      }
      stock() {
        if(this.producto.stock = 0) {
          this.xd= "si hay stock";
        } else if(this.producto.stock = 1) {
          this.xd= "no hay stock";
        }
      }

}
