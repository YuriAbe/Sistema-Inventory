import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'inventario_theme';
  isDark = signal(true);

  initTheme(): void {
    const saved = localStorage.getItem(this.THEME_KEY);
    const dark = saved !== null ? saved === 'dark' : true;
    this.isDark.set(dark);
    this.applyTheme(dark);
  }

  toggle(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    localStorage.setItem(this.THEME_KEY, next ? 'dark' : 'light');
    this.applyTheme(next);
  }

  private applyTheme(dark: boolean): void {
    const body = document.body;
    if (dark) {
      body.classList.add('dark');
      body.classList.remove('light-mode');
    } else {
      body.classList.remove('dark');
      body.classList.add('light-mode');
    }
  }
}
