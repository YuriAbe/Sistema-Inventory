import { Pipe, PipeTransform } from '@angular/core';
import { Categoria } from '../../core/models';

@Pipe({ name: 'categoriaName', standalone: true })
export class CategoriaNamePipe implements PipeTransform {
  transform(categorias: Categoria[], id: number | null): string {
    if (!id) return 'Todos os Produtos';
    return categorias.find(c => c.id === id)?.nome ?? 'Categoria';
  }
}
