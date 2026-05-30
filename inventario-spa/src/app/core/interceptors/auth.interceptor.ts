import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // A API não utiliza JWT. Apenas garante o header Content-Type.
  const cloned = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });
  return next(cloned);
};
