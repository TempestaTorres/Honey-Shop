import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountFooter } from './account-footer/account-footer';
import { AccountHeader } from './account-header/account-header';

@Component({
  selector: 'app-account',
  imports: [RouterOutlet, AccountFooter, AccountHeader],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {}
