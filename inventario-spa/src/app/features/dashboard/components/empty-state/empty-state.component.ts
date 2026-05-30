import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div class="w-24 h-24 bg-dark-800 border border-dark-700 rounded-3xl
                  flex items-center justify-center mb-6">
        <mat-icon class="!text-5xl text-dark-600">
          {{ hasBusca ? 'search_off' : 'inventory_2' }}
        </mat-icon>
      </div>
      <h3 class="text-white font-semibold text-lg mb-2">
        {{ hasBusca ? 'Nenhum resultado encontrado' : 'Nenhum produto cadastrado' }}
      </h3>
      <p class="text-dark-400 text-sm text-center max-w-xs mb-6">
        {{ hasBusca
          ? 'Tente ajustar o termo de busca ou limpe o filtro.'
          : 'Comece adicionando seu primeiro produto ao estoque.' }}
      </p>
      @if (!hasBusca) {
        <button
          mat-flat-button
          (click)="novoProduto.emit()"
          class="!bg-primary-400 !text-dark-950 !font-semibold !rounded-xl !px-6 !shadow-glow">
          <mat-icon class="mr-1">add</mat-icon>
          Adicionar Produto
        </button>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() hasBusca = false;
  @Output() novoProduto = new EventEmitter<void>();
}
