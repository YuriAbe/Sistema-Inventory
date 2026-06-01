import { Component, OnInit, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import { MatDialogRef, MatDialogModule } from "@angular/material/dialog";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { CategoriaService } from "../../../../core/services/categoria.service";
import { SnackbarService } from "../../../../core/services/snackbar.service";

import { Categoria, CategoriaRequest } from "../../../../core/models";

export interface CategoriaDialogData {}

@Component({
  selector: "app-categoria-dialog",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="bg-dark-800 rounded-2xl overflow-hidden">
      <!-- Header -->
      <div
        class="flex items-center justify-between px-6 py-5 border-b border-dark-700"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 bg-primary-400/15 border border-primary-400/30
                   rounded-xl flex items-center justify-center"
          >
            <mat-icon class="text-primary-400 !text-xl"> category </mat-icon>
          </div>

          <div>
            <h2 class="text-white font-semibold text-base">Nova Categoria</h2>

            <p class="text-dark-400 text-xs">
              Preencha os dados da nova categoria
            </p>
          </div>
        </div>

        <button
          mat-icon-button
          mat-dialog-close
          class="!text-dark-400 hover:!text-white"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- Form -->
      <form
        [formGroup]="form"
        (ngSubmit)="submit()"
        class="px-6 py-5 space-y-4"
      >
        <mat-form-field appearance="outline" class="w-full">
          <mat-label>Nome da Categoria</mat-label>

          <input
            matInput
            formControlName="nome"
            placeholder="Ex: Informática"
          />

          <mat-icon matPrefix class="text-dark-400 mr-2"> category </mat-icon>

          @if (nomeCtrl.invalid && nomeCtrl.touched) {
            <mat-error>
              @if (nomeCtrl.hasError("required")) {
                Nome é obrigatório
              } @else if (nomeCtrl.hasError("minlength")) {
                Mínimo 2 caracteres
              }
            </mat-error>
          }
        </mat-form-field>

        <!-- Actions -->
        <div class="flex items-center gap-3 pt-2">
          <button
            mat-stroked-button
            mat-dialog-close
            type="button"
            class="flex-1 !rounded-xl !border-dark-600 !text-dark-300"
          >
            Cancelar
          </button>

          <button
            mat-flat-button
            type="submit"
            [disabled]="loading()"
            class="flex-1 !bg-primary-400 !text-dark-950 !font-semibold
                   !rounded-xl !shadow-glow hover:!bg-primary-300
                   disabled:opacity-60 disabled:cursor-not-allowed"
          >
            @if (loading()) {
              <mat-spinner diameter="18" class="!inline-block mr-2">
              </mat-spinner>

              Salvando...
            } @else {
              <mat-icon class="mr-1"> add </mat-icon>

              Cadastrar
            }
          </button>
        </div>
      </form>
    </div>
  `,
})
export class CategoriaDialogComponent implements OnInit {
  form!: FormGroup;

  loading = signal(false);

  get nomeCtrl() {
    return this.form.get("nome")!;
  }

  constructor(
    private dialogRef: MatDialogRef<CategoriaDialogComponent>,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid || this.loading()) {
      return;
    }

    this.loading.set(true);

    const dto: CategoriaRequest = this.form.value;

    const obs = this.categoriaService.criar(dto);

    obs.subscribe({
      next: () => {
        this.loading.set(false);

        const msg = "Categoria cadastrada!";

        this.snackbar.success(msg);

        this.dialogRef.close(true);
      },

      error: () => {
        this.loading.set(false);

        this.snackbar.error("Erro ao salvar categoria.");
      },
    });
  }
}
