import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Usuario, Page, LoginCredentials, AuthSession } from "../models";

const SESSION_KEY = "inventario_session";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  // Signal-based session state
  private _session = signal<AuthSession | null>(this.loadSession());

  readonly currentUser = computed(() => this._session()?.usuario ?? null);
  readonly isAuthenticated = computed(() => this._session() !== null);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: LoginCredentials): Observable<Usuario> {
    return this.http
      .post<Usuario>(`${this.apiUrl}/usuarios/login`, credentials)
      .pipe(
        tap((usuario) => {
          this.saveSession({
            usuario,
            loginAt: Date.now(),
          });
        }),
      );
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this._session.set(null);
    this.router.navigate(["/login"]);
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
