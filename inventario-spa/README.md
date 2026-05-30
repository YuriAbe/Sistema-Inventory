# 📦 Inventário Pro — SPA Angular

Frontend de gerenciamento de inventário desenvolvido com **Angular 17**, **Angular Material** e **TailwindCSS**, consumindo a API REST Spring Boot disponível no projeto.

---

## 🚀 Pré-requisitos

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **Angular CLI** ≥ 17

```bash
npm install -g @angular/cli
```

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone <url-do-seu-repo>
cd inventario-spa

# Instale as dependências
npm install
```

---

## ▶️ Executar

```bash
ng serve
```

Acesse: [http://localhost:4200](http://localhost:4200)

---

## 🔐 Credenciais de Acesso

| Campo | Valor |
|-------|-------|
| **E-mail** | `admin@fatec.sp.gov.br` |
| **Senha** | `admin123` |

> ⚠️ **Nota sobre autenticação:** A API não possui endpoint de login com JWT. O fluxo implementado busca o usuário pelo e-mail via `GET /api/usuarios` e valida a existência do cadastro. A senha `admin123` é salva no banco com BCrypt e não pode ser validada no frontend sem um endpoint dedicado. Para fins acadêmicos, a validação de acesso ocorre pela existência do e-mail na base.

---

## 🌐 CORS — Configuração no Backend

Para que o Angular (`localhost:4200`) acesse a API (`localhost:8080`), adicione ao projeto Spring Boot:

```java
// src/main/java/com/seu/pacote/config/CorsConfig.java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
```

Ou via anotação no controller:

```java
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProdutoController { ... }
```

---

## 🗂️ Estrutura do Projeto

```
src/app/
├── core/
│   ├── guards/          # authGuard, noAuthGuard
│   ├── interceptors/    # authInterceptor
│   ├── models/          # interfaces TypeScript
│   └── services/        # AuthService, ProdutoService, CategoriaService, ...
├── shared/
│   └── pipes/           # CategoriaNamePipe
├── features/
│   ├── auth/
│   │   └── pages/login/ # Tela de login
│   └── dashboard/
│       ├── pages/       # DashboardComponent
│       ├── components/  # Sidebar, Toolbar, ProdutoCard, SkeletonCard, EmptyState
│       └── dialogs/     # ProdutoDialog, ConfirmDialog
├── app.routes.ts        # Lazy loading routes
├── app.config.ts        # Providers
└── app.component.ts     # Root
```

---

## ✅ Funcionalidades

- [x] Tela de login com validação visual e snackbar de erro
- [x] AuthGuard protegendo o dashboard
- [x] Dashboard com grid responsivo de cards de produtos
- [x] Filtro por categoria (sidebar + pills)
- [x] Busca por nome com debounce
- [x] CRUD completo (criar, editar, excluir) via Angular Material Dialog
- [x] Formulários reativos com validação
- [x] Skeleton loading durante carregamento
- [x] Empty state quando sem produtos
- [x] Confirmação de exclusão
- [x] Snackbar de sucesso e erro
- [x] Dark mode / Light mode com persistência
- [x] Layout responsivo (mobile-first)
- [x] Lazy loading de rotas

---

## 🛠️ Stack

| Tecnologia | Versão |
|------------|--------|
| Angular | 17 |
| Angular Material | 17 |
| TailwindCSS | 3.4 |
| RxJS | 7.8 |
| TypeScript | 5.4 |

---

## 📡 Endpoints Consumidos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/usuarios` | Busca usuário para login |
| GET | `/api/produtos` | Lista todos os produtos |
| GET | `/api/produtos/{id}` | Busca produto por ID |
| POST | `/api/produtos` | Cria produto |
| PUT | `/api/produtos/{id}` | Atualiza produto |
| DELETE | `/api/produtos/{id}` | Exclui produto |
| GET | `/api/produtos/categoria/{id}` | Filtra por categoria |
| GET | `/api/produtos/busca` | Busca por nome |
| GET | `/api/categorias` | Lista categorias |

---
