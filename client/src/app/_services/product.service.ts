import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_model/product';

const API_URL = 'http://localhost:5000/api/v1/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: Product): Observable<any> {
    return this.http.post(API_URL, product, { responseType: 'json' });
  }

  getAllProducts(page_number: number): Observable<any> {
    const url = `${API_URL}/page/${page_number}`;
    return this.http.get(url, { responseType: 'json' });
  }

  getTotalCount(): Observable<any> {
    const url = `${API_URL}`;
    return this.http.get(url, { responseType: 'json' });
  }

  getById(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.get(url, { responseType: 'json' });
  }

  update(id: number, product: Product): Observable<any> {
    console.log(product);
    const url = `${API_URL}/${id}`;
    return this.http.put(url, product, { responseType: 'json' });
  }

  delete(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.delete(url, { responseType: 'json' });
  }
}
