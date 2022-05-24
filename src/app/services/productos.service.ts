import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IProducto } from '../interfaces/i-producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Crear productos
  addProduct(Producto: IProducto){
    return this.http.post(`${this.baseUrl}/producto/crear_producto.php`, Producto);
  }

  //Ver productos
  readProduct(){
    return this.http.get(`${this.baseUrl}/producto/ver_productos.php`);
  }

  //Ver productos por id
  readProductId(id: number){
    return this.http.get(`${this.baseUrl}/producto/ver_producto_id.php?id=${id}`);
  }

  //Eliminar productos
  deleteProduct(id: number){
    return this.http.delete(`${this.baseUrl}/producto/eliminar_producto.php?id=${id}`);
  }

  //Editar productos
  editProduct(Producto: IProducto){
    return this.http.put(`${this.baseUrl}/producto/editar_producto.php`, Producto);
  }
}
