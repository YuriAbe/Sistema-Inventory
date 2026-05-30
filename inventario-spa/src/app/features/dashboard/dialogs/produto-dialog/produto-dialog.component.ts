import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProdutoService } from '../../../../core/services/produto.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { Produto, Categoria, ProdutoRequest } from '../../../../core/models';

export interface ProdutoDialogData {
  produto: Produto | null;
  categorias: Categoria[];
}

@Component({
  selector: 'app-produto-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="bg-dark-800 rounded-2xl overflow-hidden">

      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-dark-700">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-primary-400/15 border border-primary-400/30 rounded-xl
                      flex items-center justify-center">
            <mat-icon class="text-primary-400 !text-xl">
              {{ isEdit ? 'edit' : 'add_circle_outline' }}
            </mat-icon>
          </div>
          <div>
            <h2 class="text-white font-semibold text-base">
              {{ isEdit ? 'Editar Produto' : 'Novo Produto' }}
            </h2>
            <p class="text-dark-400 text-xs">
              {{ isEdit ? 'Atualize as informações do produto' : 'Preencha os dados do produto' }}
            </p>
          </div>
        </div>
        <button mat-icon-button mat-dialog-close class="!text-dark-400 hover:!text-white">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Form -->
      <form [formGroup]="form" (ngSubmit)="submit()" class="px-6 py-5 space-y-4">

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nome do Produto</mat-label>
          <input matInput formControlName="nome" placeholder="Ex: Teclado Mecânico RGB">
          <mat-icon matPrefix class="text-dark-400 mr-2">inventory_2</mat-icon>
          @if (nomeCtrl.invalid && nomeCtrl.touched) {
            <mat-error>
              @if (nomeCtrl.hasError('required')) { Nome é obrigatório }
              @else if (nomeCtrl.hasError('minlength')) { Mínimo 3 caracteres }
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Preço (R$)</mat-label>
          <input matInput type="number" formControlName="preco"
                 placeholder="0.00" min="0" step="0.01">
          <mat-icon matPrefix class="text-dark-400 mr-2">attach_money</mat-icon>
          @if (precoCtrl.invalid && precoCtrl.touched) {
            <mat-error>
              @if (precoCtrl.hasError('required')) { Preço é obrigatório }
              @else if (precoCtrl.hasError('min')) { Preço deve ser positivo }
            </mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Categoria</mat-label>
          <mat-select formControlName="categoriaId">
            @for (cat of data.categorias; track cat.id) {
              <mat-option [value]="cat.id">{{ cat.nome }}</mat-option>
            }
          </mat-select>
          <mat-icon matPrefix class="text-dark-400 mr-2">label_outline</mat-icon>
          @if (categoriaCtrl.invalid && categoriaCtrl.touched) {
            <mat-error>Selecione uma categoria</mat-error>
          }
        </mat-form-field>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-2">
          <button mat-stroked-button mat-dialog-close type="button"
                  class="flex-1 !rounded-xl !border-dark-600 !text-dark-300">
            Cancelar
          </button>
          <button
            mat-flat-button type="submit"
            [disabled]="loading()"
            class="flex-1 !bg-primary-400 !text-dark-950 !font-semibold
                   !rounded-xl !shadow-glow hover:!bg-primary-300
                   disabled:opacity-60 disabled:cursor-not-allowed">
            @if (loading()) {
              <mat-spinner diameter="18" class="!inline-block mr-2"></mat-spinner>
              Salvando...
            } @else {
              <mat-icon class="mr-1">{{ isEdit ? 'save' : 'add' }}</mat-icon>
              {{ isEdit ? 'Salvar' : 'Cadastrar' }}
            }
          </button>
        </div>

      </form>
    </div>
  `,
})
export class ProdutoDialogComponent implements OnInit {
  form!: FormGroup;
  loading = signal(false);

  get isEdit(): boolean { return !!this.data.produto; }
  get nomeCtrl() { return this.form.get('nome')!; }
  get precoCtrl() { return this.form.get('preco')!; }
  get categoriaCtrl() { return this.form.get('categoriaId')!; }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProdutoDialogData,
    private dialogRef: MatDialogRef<ProdutoDialogComponent>,
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    const p = this.data.produto;
    this.form = this.fb.group({
      nome: [p?.nome ?? '', [Validators.required, Validators.minLength(3)]],
      preco: [p?.preco ?? '', [Validators.required, Validators.min(0)]],
      categoriaId: [p?.categoria?.id ?? '', Validators.required],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    const dto: ProdutoRequest = this.form.value;

    const obs = this.isEdit
      ? this.produtoService.atualizar(this.data.produto!.id, dto)
      : this.produtoService.criar(dto);

    obs.subscribe({
      next: () => {
        this.loading.set(false);
        const msg = this.isEdit ? 'Produto atualizado!' : 'Produto cadastrado!';
        this.snackbar.success(msg);
        this.dialogRef.close(true);
      },
      error: () => {
        this.loading.set(false);
        this.snackbar.error('Erro ao salvar produto. Tente novamente.');
      },
    });
  }
}
