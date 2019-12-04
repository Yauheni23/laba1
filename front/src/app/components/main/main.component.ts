import { Component, OnInit } from '@angular/core';
import {IUser, UserService} from '../../user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => this.user = user);
  }

}
