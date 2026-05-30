// ── Categoria ──
export interface Categoria {
  id: number;
  nome: string;
}

export interface CategoriaRequest {
  nome: string;
}

// ── Produto ──
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: Categoria;
}

export interface ProdutoRequest {
  nome: string;
  preco: number;
  categoriaId: number;
}

// ── Usuario ──
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface UsuarioRequest {
  nome: string;
  email: string;
  senha: string;
  role: 'ADMIN' | 'USER';
}

// ── Paginação ──
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// ── Auth ──
export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthSession {
  usuario: Usuario;
  loginAt: number;
}
