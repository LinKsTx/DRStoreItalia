export interface IProducto {
    id: number,
    nombre: string,
    precio: number,
    descripcion: string,
    categoria: string,
    marca: string,
    imagen: string,
    stock?: number
}
