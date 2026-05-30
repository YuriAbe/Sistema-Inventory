import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Produto } from '../../../../core/models';

@Component({
  selector: 'app-produto-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <article
      class="group relative bg-dark-800 border border-dark-700 rounded-2xl p-5
             hover:border-dark-500 hover:shadow-card-dark
             transition-all duration-200 cursor-default overflow-hidden">

      <!-- Top accent -->
      <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r
                  from-primary-400/0 via-primary-400/60 to-primary-400/0
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <!-- Category Badge -->
      <div class="mb-4">
        <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg
                     bg-primary-400/10 border border-primary-400/20 text-primary-400
                     text-xs font-medium">
          <mat-icon class="!text-xs !w-3 !h-3">label</mat-icon>
          {{ produto.categoria.nome }}
        </span>
      </div>

      <!-- Product Icon -->
      <div class="w-12 h-12 bg-dark-700 rounded-xl flex items-center justify-center mb-4
                  group-hover:bg-dark-600 transition-colors duration-200">
        <mat-icon class="text-dark-300 !text-2xl">inventory_2</mat-icon>
      </div>

      <!-- Info -->
      <h3 class="text-white font-semibold text-sm mb-1 line-clamp-2 leading-snug">
        {{ produto.nome }}
      </h3>

      <p class="text-primary-400 font-bold text-xl font-mono">
        {{ produto.preco | currency:'BRL':'symbol':'1.2-2':'pt-BR' }}
      </p>

      <!-- Actions -->
      <div class="flex items-center gap-2 mt-4 pt-4 border-t border-dark-700">
        <button
          mat-stroked-button
          (click)="editar.emit(produto)"
          matTooltip="Editar produto"
          class="flex-1 !text-xs !h-8 !rounded-xl !border-dark-600
                 !text-dark-300 hover:!border-primary-400/50 hover:!text-primary-400
                 transition-colors duration-150">
          <mat-icon class="!text-base mr-1">edit</mat-icon>
          Editar
        </button>
        <button
          mat-icon-button
          (click)="excluir.emit(produto)"
          matTooltip="Excluir produto"
          class="!w-8 !h-8 !rounded-xl !text-dark-500
                 hover:!text-red-400 hover:!bg-red-400/10
                 transition-colors duration-150">
          <mat-icon class="!text-base">delete_outline</mat-icon>
        </button>
      </div>

    </article>
  `,
})
export class ProdutoCardComponent {
  @Input({ required: true }) produto!: Produto;
  @Output() editar = new EventEmitter<Produto>();
  @Output() excluir = new EventEmitter<Produto>();
}
