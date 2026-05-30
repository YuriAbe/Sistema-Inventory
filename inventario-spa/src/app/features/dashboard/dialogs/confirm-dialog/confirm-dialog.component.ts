import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  titulo: string;
  mensagem: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="bg-dark-800 rounded-2xl overflow-hidden">

      <!-- Header -->
      <div class="flex items-center gap-3 px-6 py-5 border-b border-dark-700">
        <div class="w-10 h-10 bg-red-900/30 border border-red-700/50 rounded-xl
                    flex items-center justify-center flex-shrink-0">
          <mat-icon class="text-red-400">warning_amber</mat-icon>
        </div>
        <h2 class="text-white font-semibold">{{ data.titulo }}</h2>
      </div>

      <!-- Body -->
      <div class="px-6 py-5">
        <p class="text-dark-300 text-sm leading-relaxed" [innerHTML]="data.mensagem"></p>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 px-6 pb-5">
        <button mat-stroked-button mat-dialog-close
                class="flex-1 !rounded-xl !border-dark-600 !text-dark-300">
          Cancelar
        </button>
        <button mat-flat-button [mat-dialog-close]="true"
                class="flex-1 !bg-red-600 !text-white !font-semibold !rounded-xl
                       hover:!bg-red-500 transition-colors">
          <mat-icon class="mr-1">delete</mat-icon>
          Excluir
        </button>
      </div>

    </div>
  `,
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
}
