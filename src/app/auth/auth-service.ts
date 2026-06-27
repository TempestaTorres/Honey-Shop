import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Users } from '../users/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userLogged$: BehaviorSubject<boolean>;
  public userEmailUpdated$: BehaviorSubject<string | null>;
  public userNameUpdated$: BehaviorSubject<string | null>;
  private isLogged: boolean = false;

  public loginAlert$: BehaviorSubject<{state: boolean, type: string}>;

  private readonly userKey: string = "User";
  private readonly userNameKey: string = "UserName";

  constructor() {

    let user = localStorage.getItem(this.userKey);
    this.isLogged = !!user;
    this.userLogged$ = new BehaviorSubject<boolean>(this.isLogged);
    this.userEmailUpdated$ = new BehaviorSubject<string | null>(user);

    let name = localStorage.getItem(this.userNameKey);
    this.userNameUpdated$ = new BehaviorSubject<string | null>(name);

    this.loginAlert$ = new BehaviorSubject<{state: boolean, type: string}>({state: false, type: ''});
  }

  public toggleAlert(state: boolean, type: string = ""): void {
    this.loginAlert$.next({state: state, type: type});
  }

  public isLoggedIn(): boolean {
    return this.isLogged;
  }

  public logout(): void {
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.userNameKey);
    this.isLogged = false;
    this.userLogged$.next(this.isLogged);
    this.userEmailUpdated$.next(null);
    this.userNameUpdated$.next(null);
  }

  public login(userEmail: string): void {
    localStorage.setItem(this.userKey, userEmail);
    this.isLogged = true;
    this.userLogged$.next(this.isLogged);
    this.userEmailUpdated$.next(userEmail);
  }

  public isUserExist(email: string): Observable<boolean> {

    let result: boolean = Users.some((user) => user.email === email);

    return new Observable((observer: Observer<boolean>) => {
      observer.next(result);
    });
  }

  public getUserEmail(): Observable<string> {
    let email = localStorage.getItem(this.userKey);
    if (email === null) {
      email = '';
    }
    return new Observable((observer: Observer<string>) => {
      observer.next(email);
    });
  }

  public getUserName(): Observable<string> {
    let name = localStorage.getItem(this.userNameKey);
    if (name === null) {
      name = '';
    }
    return new Observable((observer: Observer<string>) => {
      observer.next(name);
    });
  }

  public updateUserEmail(email: string): void {
    localStorage.removeItem(this.userKey);
    localStorage.setItem(this.userKey, email);
    this.userEmailUpdated$.next(email);
  }
  public updateUserName(userName: string): void {
    localStorage.removeItem(this.userNameKey);
    localStorage.setItem(this.userNameKey, userName);
    this.userNameUpdated$.next(userName);
  }
}
