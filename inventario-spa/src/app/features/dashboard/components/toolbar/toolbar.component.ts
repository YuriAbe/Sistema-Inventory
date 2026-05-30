import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <header class="flex items-center gap-3 px-4 md:px-6 py-3 bg-dark-900 border-b border-dark-700
                   sticky top-0 z-10 backdrop-blur-sm">

      <!-- Hamburger (mobile) -->
      <button mat-icon-button class="lg:hidden !text-dark-300" (click)="menuToggle.emit()">
        <mat-icon>menu</mat-icon>
      </button>

      <!-- Search -->
      <div class="flex-1 max-w-md">
        <div class="relative">
          <mat-icon class="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400 !text-lg pointer-events-none">
            search
          </mat-icon>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="onSearch($event)"
            placeholder="Buscar produtos..."
            class="w-full bg-dark-800 border border-dark-600 rounded-xl
                   pl-10 pr-4 py-2 text-sm text-white placeholder-dark-500
                   focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400/30
                   transition-all duration-150">
        </div>
      </div>

      <!-- Spacer -->
      <div class="flex-1 hidden md:block"></div>

      <!-- Stats Badge -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1.5 bg-dark-800
                  border border-dark-600 rounded-xl">
        <mat-icon class="text-primary-400 !text-base">inventory_2</mat-icon>
        <span class="text-sm text-dark-300">
          <span class="text-white font-semibold">{{ totalProdutos }}</span> produtos
        </span>
      </div>

      <!-- New Product Button -->
      <button
        mat-flat-button
        (click)="novoProduto.emit()"
        matTooltip="Adicionar novo produto"
        class="!bg-primary-400 !text-dark-950 !font-semibold !rounded-xl
               !px-4 !h-9 hover:!bg-primary-300 transition-colors !shadow-glow
               !text-sm whitespace-nowrap">
        <mat-icon class="!text-lg mr-1">add</mat-icon>
        <span class="hidden sm:inline">Novo Produto</span>
        <span class="sm:hidden">Novo</span>
      </button>

    </header>
  `,
})
export class ToolbarComponent {
  @Input() totalProdutos = 0;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() novoProduto = new EventEmitter<void>();
  @Output() busca = new EventEmitter<string>();

  searchTerm = '';

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(debounceTime(300)).subscribe(term => {
      this.busca.emit(term);
    });
  }

  onSearch(term: string): void {
    this.searchSubject.next(term);
  }
}
