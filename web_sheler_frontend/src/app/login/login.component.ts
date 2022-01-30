import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/User/user'
import { LoginUserService } from '../servicies/loginUser/login-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(private loginService: LoginUserService, private router: Router) { }

  ngOnInit(): void {
  }

  redirect_register(){
    this.router.navigate(["register"]);
  }

  handleLogin(){
    console.log(this.user); 
    this.loginService.loginUser(this.user).subscribe(data =>{
      //alert("success!");
      this.router.navigate(["/shelter"]);
    }, err => {alert("err")}
    );
  }

}
