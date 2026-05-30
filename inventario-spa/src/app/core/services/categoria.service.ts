import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Categoria, CategoriaRequest, Page } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Categoria[]> {
    const params = new HttpParams().set('page', '0').set('size', '100');
    return this.http.get<Page<Categoria>>(this.url, { params }).pipe(
      map(page => page.content)
    );
  }

  criar(dto: CategoriaRequest): Observable<Categoria> {
    return this.http.post<Categoria>(this.url, dto);
  }
}
