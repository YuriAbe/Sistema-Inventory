import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs';

import { ProdutoService } from '../../../../core/services/produto.service';
import { CategoriaService } from '../../../../core/services/categoria.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { Produto, Categoria } from '../../../../core/models';

import { CategoriaNamePipe } from '../../../../shared/pipes/categoria-name.pipe';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ProdutoCardComponent } from '../../components/produto-card/produto-card.component';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card.component';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';
import { ProdutoDialogComponent } from '../../dialogs/produto-dialog/produto-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CategoriaNamePipe,
    SidebarComponent,
    ToolbarComponent,
    ProdutoCardComponent,
    SkeletonCardComponent,
    EmptyStateComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  produtos = signal<Produto[]>([]);
  categorias = signal<Categoria[]>([]);
  loading = signal(true);
  sidebarOpen = signal(false);
  categoriaSelecionada = signal<number | null>(null);
  termoBusca = signal('');

  skeletons = Array(8).fill(0);

  produtosFiltrados = computed(() => {
    let lista = this.produtos();
    const busca = this.termoBusca().toLowerCase().trim();
    if (busca) {
      lista = lista.filter(p => p.nome.toLowerCase().includes(busca));
    }
    return lista;
  });

  totalProdutos = computed(() => this.produtos().length);

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private snackbar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.carregarProdutos();
  }

  carregarProdutos(categoriaId?: number): void {
    this.loading.set(true);
    const obs = categoriaId
      ? this.produtoService.listarPorCategoria(categoriaId)
      : this.produtoService.listar(0, 100);

    obs.pipe(finalize(() => this.loading.set(false))).subscribe({
      next: page => this.produtos.set(page.content),
      error: () => this.snackbar.error('Erro ao carregar produtos.'),
    });
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodas().subscribe({
      next: cats => this.categorias.set(cats),
      error: () => this.snackbar.error('Erro ao carregar categorias.'),
    });
  }

  filtrarPorCategoria(categoriaId: number | null): void {
    this.categoriaSelecionada.set(categoriaId);
    this.termoBusca.set('');
    this.carregarProdutos(categoriaId ?? undefined);
  }

  onBusca(termo: string): void {
    this.termoBusca.set(termo);
  }

  abrirDialogNovo(): void {
    const ref = this.dialog.open(ProdutoDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      data: { produto: null, categorias: this.categorias() },
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.carregarProdutos(this.categoriaSelecionada() ?? undefined);
    });
  }

  abrirDialogEditar(produto: Produto): void {
    const ref = this.dialog.open(ProdutoDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      data: { produto, categorias: this.categorias() },
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.carregarProdutos(this.categoriaSelecionada() ?? undefined);
    });
  }

  confirmarExclusao(produto: Produto): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      data: {
        titulo: 'Excluir Produto',
        mensagem: `Tem certeza que deseja excluir "<strong>${produto.nome}</strong>"? Esta ação não pode ser desfeita.`,
      },
    });

    ref.afterClosed().subscribe(confirmado => {
      if (confirmado) this.excluirProduto(produto);
    });
  }

  private excluirProduto(produto: Produto): void {
    this.produtoService.excluir(produto.id).subscribe({
      next: () => {
        this.snackbar.success(`"${produto.nome}" excluído com sucesso.`);
        this.carregarProdutos(this.categoriaSelecionada() ?? undefined);
      },
      error: () => this.snackbar.error('Erro ao excluir o produto.'),
    });
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }
}
