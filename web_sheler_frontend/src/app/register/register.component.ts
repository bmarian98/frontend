import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/User/user';
import { RegisterUserService } from '../servicies/registerUser/register-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(private registerService: RegisterUserService, private route: Router) { }

  ngOnInit(): void {
  }

  redirect_login(){
    this.route.navigate(["login"]);
  }

  handleAuthentication(){
    this.registerService.authenticateUser(this.user).subscribe(
      data=>{console.log(this.user);
        this.route.navigate(["register_successed"]);

      }
    )
  }

}
