import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LineItem } from '../model/line-item';


const URL: string = 'http://localhost:8080/line-items';

@Injectable({
  providedIn: 'root'
})
export class LineItemService {

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<LineItem[]> {
    return this.http.get(URL + '/') as Observable<LineItem[]>;
  }
  
  get(id: number): Observable<LineItem>  {
    return this.http.get(URL + '/' + id) as Observable<LineItem> ;
  }

  create(lineItem: LineItem): Observable<LineItem> {
    return this.http.post(URL + '/', lineItem) as Observable<LineItem>;
  }
  
  edit(lineItem: LineItem): Observable<LineItem> {
    return this.http.put(URL + '/', lineItem) as Observable<LineItem>;
  }

  delete(id: number): Observable<LineItem> {
    return this.http.delete(URL + "/" + id) as Observable<LineItem>;
  }

}
