import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private http = inject(HttpClient)

list():Observable<Producto[]>{
  return this.http.get<Producto[]>('Http://localhost:8080/api/productos')
}
get(id:number){
  return this.http.get<Producto>(`Http://localhost:8080/api/productos/${id}`)
}
create(producto:Producto){
  return this.http.post<Producto>('Http://localhost:8080/api/productos',producto)
}
 update(producto:Producto,id:number){
  return this.http.put<Producto>(`Http://localhost:8080/api/productos/${id}`,producto)
 }
 delete(id:number){
  return this.http.delete<void>(`Http://localhost:8080/api/productos/${id}`)
 }
}
