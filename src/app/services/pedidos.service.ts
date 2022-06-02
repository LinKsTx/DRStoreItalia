import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPedido } from '../interfaces/i-pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //Crear blogs
  addPedido(Pedido: IPedido){
    return this.http.post(`${this.baseUrl}/pedido/crear_pedido.php`, Pedido);
  }

}
