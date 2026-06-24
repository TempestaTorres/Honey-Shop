import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  return authService.isLoggedIn();
};
export const loginGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  return !authService.isLoggedIn();
};
