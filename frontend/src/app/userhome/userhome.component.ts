import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  username:string='';
  mail:string='';
  password:string='';
  addval(data:any)
   {
      this.username = data.username;
      this.mail=data.email;
      this.password=data.password;
   }

  constructor(private _user:UserService,private _router:Router) {
    this._user.user().subscribe(
      data=>this.addval(data),
      error=>this._router.navigate(['/home'])
    )
   }

   
  ngOnInit(): void {
  }

  logout()
  {
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['home'])},
      error=>console.error(error)
    )
  }
  deleete(event:any)
  {
    // event.preventdefault();
    if(confirm("Do You Want To Delete Your Account ?"))
    {
      this._user.delete()
      .subscribe(
        data=>{console.log(data);},
        error=>{this._router.navigate(['/home'])}
      )
    }
  }
}
