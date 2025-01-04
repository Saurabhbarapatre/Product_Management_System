import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../_model/category';

const API_URL = 'http://localhost:5000/api/v1/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  create(category: Category): Observable<any> {
    return this.http.post(API_URL, category, { responseType: 'json' });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(API_URL, { responseType: 'json' });
  }

  getById(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.get(url, { responseType: 'json' });
  }

  update(id: number, category: Category): Observable<any> {
    console.log(category);
    const url = `${API_URL}/${id}`;
    return this.http.put(url, category, { responseType: 'json' });
  }

  delete(id: number): Observable<any> {
    const url = `${API_URL}/${id}`;
    return this.http.delete(url, { responseType: 'json' });
  }
}
