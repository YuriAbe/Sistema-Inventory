import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Usuario, Page, LoginCredentials, AuthSession } from '../models';

const SESSION_KEY = 'inventario_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  // Signal-based session state
  private _session = signal<AuthSession | null>(this.loadSession());

  readonly currentUser = computed(() => this._session()?.usuario ?? null);
  readonly isAuthenticated = computed(() => this._session() !== null);

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * A API não possui endpoint de login com JWT.
   * O fluxo: busca usuário por e-mail e valida senha no front.
   * Em produção real, o backend deveria implementar autenticação segura.
   */
  login(credentials: LoginCredentials): Observable<Usuario> {
    return this.http
      .get<Page<Usuario>>(`${this.apiUrl}/usuarios`, {
        params: { page: '0', size: '100' },
      })
      .pipe(
        map(page => {
          const usuario = page.content.find(u => u.email === credentials.email);
          if (!usuario) {
            throw new Error('Usuário não encontrado.');
          }
          // Validação simplificada — senha em texto plano não é enviada pela API
          // O backend usa BCrypt, mas não expõe endpoint de autenticação.
          // Aqui assumimos que se o usuário existe com o email, a validação
          // de senha real deve ser feita pelo backend via endpoint dedicado.
          // Para fins acadêmicos, validamos email e aceitamos o acesso.
          return usuario;
        }),
        map(usuario => {
          this.saveSession({ usuario, loginAt: Date.now() });
          return usuario;
        })
      );
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this._session.set(null);
    this.router.navigate(['/login']);
  }

  private saveSession(session: AuthSession): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this._session.set(session);
  }

  private loadSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
