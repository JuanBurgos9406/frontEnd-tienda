export interface Producto{
    id: number;
    nombre: string;
    descripcion?: string;
    precio: number;
    cantidadDisponible: number;
    foto?: string;
}