import { IProducto } from "./i-producto";

export interface IPedido {
  id?: number;
  pedido?: string;
  pedidoarray?: IProducto[];
  fecha_pedido?: Date;
  id_usuario?: number;
}
