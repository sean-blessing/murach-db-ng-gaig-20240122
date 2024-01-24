import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

const URL: string = "http://localhost:8080/products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Product[]> {
    return this.http.get(URL+"/") as Observable<Product[]>;
  }
  
  get(code: string): Observable<Product>  {
      return this.http.get(URL + '/' + code) as Observable<Product> ;
    }

  create(product: Product): Observable<Product> {
    return this.http.post(URL + '/', product) as Observable<Product>;
  }

  delete(code: string): Observable<Product> {
    return this.http.delete(URL + "/" + code) as Observable<Product>;
  }

  edit(product: Product): Observable<Product> {
    return this.http.put(URL + '/', product) as Observable<Product>;
  }
}
