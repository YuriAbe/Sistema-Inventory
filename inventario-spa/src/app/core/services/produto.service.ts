import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Produto, ProdutoRequest, Page } from '../models';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly url = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) {}

  listar(page = 0, size = 20): Observable<Page<Produto>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', 'nome,ASC');
    return this.http.get<Page<Produto>>(this.url, { params });
  }

  listarPorCategoria(categoriaId: number, page = 0, size = 100): Observable<Page<Produto>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Page<Produto>>(`${this.url}/categoria/${categoriaId}`, { params });
  }

  buscarPorNome(nome: string, page = 0, size = 100): Observable<Page<Produto>> {
    const params = new HttpParams()
      .set('nome', nome)
      .set('page', page)
      .set('size', size);
    return this.http.get<Page<Produto>>(`${this.url}/busca`, { params });
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.url}/${id}`);
  }

  criar(dto: ProdutoRequest): Observable<Produto> {
    return this.http.post<Produto>(this.url, dto);
  }

  atualizar(id: number, dto: ProdutoRequest): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${id}`, dto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
