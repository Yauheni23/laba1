import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(undefined);

  public get user(): IUser {
    return this._user.value;
  }

  public set user(user: IUser) {
    this._user.next(user);
  }

  public get user$(): Observable<IUser> {
    return this._user;
  }
}

export interface IUser {
  name: string;
  mail: string;
  password: string;
  dateOfBirth: string;
  state: string;
  gender: Gender;
}

type Gender = 'Female' | 'Male';
