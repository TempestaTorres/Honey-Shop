import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Users } from '../users/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public isUserExist(email: string): Observable<boolean> {

    let result: boolean = Users.some((user) => user.email === email);

    return new Observable((observer: Observer<boolean>) => {
      observer.next(result);
    });
  }
}
