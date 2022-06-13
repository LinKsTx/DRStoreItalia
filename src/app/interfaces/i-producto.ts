export interface IProducto {
    id: number,
    nombre: string,
    precio: number,
    descripcion: string,
    categoria: string,
    marca: string,
    imagen: string,
    cantidad?: number,
    precioporunidad?: number,
    preciofinal?: number,
    stock?: number
}
