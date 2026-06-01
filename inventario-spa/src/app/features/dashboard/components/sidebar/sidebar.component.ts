import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../../../../core/services/auth.service";
import { ThemeService } from "../../../../core/services/theme.service";
import { Categoria } from "../../../../core/models";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <aside
      [class.translate-x-0]="isOpen"
      [class.-translate-x-full]="!isOpen"
      class="fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-30
             w-64 flex flex-col bg-dark-900 border-r border-dark-700
             transition-transform duration-300 ease-in-out"
    >
      <!-- Brand -->
      <div
        class="flex items-center justify-between px-5 py-5 border-b border-dark-700"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 bg-primary-400/15 border border-primary-400/30 rounded-xl
                      flex items-center justify-center flex-shrink-0"
          >
            <mat-icon class="text-primary-400 !text-xl">inventory_2</mat-icon>
          </div>
          <div>
            <span class="font-bold text-white text-sm tracking-tight"
              >Inventário</span
            >
            <span class="text-primary-400 font-bold text-sm"> Pro</span>
          </div>
        </div>
        <button
          mat-icon-button
          class="lg:hidden !text-dark-400"
          (click)="closeSidebar.emit()"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <!-- User Info -->
      <div class="px-4 py-4 border-b border-dark-700">
        <div class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-full bg-primary-400/20 flex items-center justify-center flex-shrink-0"
          >
            <span class="text-primary-400 font-bold text-sm">
              {{ initial }}
            </span>
          </div>
          <div class="min-w-0">
            <p class="text-white text-sm font-medium truncate">
              {{ userName }}
            </p>
            <p class="text-dark-400 text-xs truncate">{{ userEmail }}</p>
          </div>
        </div>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-4 space-y-1">
        <p
          class="px-3 text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3"
        >
          Menu
        </p>

        <button
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                 bg-primary-400/10 text-primary-400 font-medium text-sm"
        >
          <mat-icon class="!text-lg">dashboard</mat-icon>
          Dashboard
        </button>

        <p
          class="px-3 text-xs font-semibold text-dark-500 uppercase tracking-wider mt-5 mb-3"
        >
          Categorias
        </p>

        <!-- All -->
        <button
          (click)="selecionar(null)"
          [class.bg-dark-700]="categoriaSelecionada === null"
          [class.text-white]="categoriaSelecionada === null"
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                 text-dark-400 hover:bg-dark-700 hover:text-white
                 transition-colors duration-150 text-sm"
        >
          <mat-icon class="!text-lg">category</mat-icon>
          Todos os Produtos
        </button>

        @for (cat of categorias; track cat.id) {
          <button
            (click)="selecionar(cat.id)"
            [class.bg-dark-700]="categoriaSelecionada === cat.id"
            [class.text-white]="categoriaSelecionada === cat.id"
            class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                   text-dark-400 hover:bg-dark-700 hover:text-white
                   transition-colors duration-150 text-sm"
          >
            <mat-icon class="!text-lg">label_outline</mat-icon>
            <span class="truncate">{{ cat.nome }}</span>
          </button>
        }

        <div class="mt-4 px-1">
          <button
            mat-stroked-button
            (click)="novaCategoria.emit()"
            class="w-full !rounded-xl !border-primary-400/30
           !text-primary-400 hover:!bg-primary-400/10"
          >
            <mat-icon>add</mat-icon>

            Nova Categoria
          </button>
        </div>
      </nav>

      <!-- Footer Actions -->
      <div class="p-3 border-t border-dark-700 space-y-1">
        <button
          mat-button
          (click)="themeService.toggle()"
          class="w-full !justify-start !text-dark-400 hover:!text-white !px-3 !py-2 !rounded-xl"
        >
          <mat-icon class="!text-lg mr-2">{{
            themeService.isDark() ? "light_mode" : "dark_mode"
          }}</mat-icon>
          {{ themeService.isDark() ? "Modo Claro" : "Modo Escuro" }}
        </button>
        <button
          mat-button
          (click)="logout()"
          class="w-full !justify-start !text-dark-400 hover:!text-red-400 !px-3 !py-2 !rounded-xl"
        >
          <mat-icon class="!text-lg mr-2">logout</mat-icon>
          Sair
        </button>
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Input() categorias: Categoria[] = [];
  @Input() categoriaSelecionada: number | null = null;
  @Output() categoriaChange = new EventEmitter<number | null>();
  @Output() closeSidebar = new EventEmitter<void>();
  @Output() novaCategoria = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    public themeService: ThemeService,
  ) {}

  get userName(): string {
    return this.authService.currentUser()?.nome ?? "";
  }
  get userEmail(): string {
    return this.authService.currentUser()?.email ?? "";
  }
  get initial(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  selecionar(id: number | null): void {
    this.categoriaChange.emit(id);
    this.closeSidebar.emit();
  }

  logout(): void {
    this.authService.logout();
  }
}
