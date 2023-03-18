import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,Validators.required)
 });
 registerForm:FormGroup=new FormGroup({
  email:new FormControl(null,[Validators.email,Validators.required]),
  username:new FormControl(null,Validators.required),
  password:new FormControl(null,Validators.required),
  cpass:new FormControl(null,Validators.required)
}) 


  constructor(private _router:Router,private _user:UserService,private _userService:UserService) { }
   ngOnInit(): void {
  }

  movetoRegister()
  {
    this._router.navigate(['/register']);
  }
  login()
  {
    if(!this.loginForm.valid)
    {
      alert("Inavlid Format");
      return;
    }
    // alert(JSON.stringify(this.loginForm.value));
    this._user.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/SchedulingAlgorithm'])},
      error=>alert("Either Username/Password Is Incorrect")
    )
  }
  movetoLogin()
  {
    this._router.navigate(['/login']);
  }
 
  register(){
    if(!this.registerForm.valid || (this.registerForm.controls['password'].value != this.registerForm.controls['cpass'].value)){
      console.log('Invalid Form');
      alert("Registration Failed");
       return;
    }

    this._userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data=> {console.log(data); this._router.navigate(['/login']);alert("User Added Successfully"); window.location.reload();},
      error=>{alert("Registration Failed");console.error(error);}
    )
    // console.log(J  SON.stringify(this.registerForm.value));

   

  }
}
