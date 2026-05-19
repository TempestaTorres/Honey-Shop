import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Users } from '../users/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userLogged$: BehaviorSubject<boolean>;
  private isLogged: boolean = false;

  public loginAlert$: BehaviorSubject<boolean>;

  private readonly userKey: string = "User";

  constructor() {

    let user = localStorage.getItem(this.userKey);
    this.isLogged = !!user;
    this.userLogged$ = new BehaviorSubject<boolean>(this.isLogged);

    this.loginAlert$ = new BehaviorSubject<boolean>(false);
  }

  public toggleAlert(state: boolean): void {
    this.loginAlert$.next(state);
  }

  public isLoggedIn(): boolean {
    return this.isLogged;
  }

  public logout(): void {
    localStorage.removeItem(this.userKey);
    this.isLogged = false;
    this.userLogged$.next(this.isLogged);
  }

  public isUserExist(email: string): Observable<boolean> {

    let result: boolean = Users.some((user) => user.email === email);

    return new Observable((observer: Observer<boolean>) => {
      observer.next(result);
    });
  }
}
