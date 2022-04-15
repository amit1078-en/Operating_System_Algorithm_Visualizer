import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
// import '/home/amit/Documents/SEM_5/Web_DEV_PROJECT/Learn/frontend/src/assets/smtp.js';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  name = '';
  email='';
  phonenumber = -1;
  msg = '';
  showcontactus = false;
  showaboutus = true;
  constructor(private _user: UserService, private _router: Router) {
    this._user.user().subscribe(
      data => console.log("ffu"),
      error => this._router.navigate(['/home'])
    )
  }

  ngOnInit(): void {
  }
  contactus(event:any)
  {
    event.preventDefault();
    this.showaboutus = true;
    this.showcontactus  = false;
  }
  aboutus(event:any)
  {
    event.preventDefault();
    event.preventDefault();
    this.showaboutus = false;
    this.showcontactus  = true;
  }

  getPid(value:any)
  {
    this.name = value;
  }
  get_Mail(value:any)
  {
   this.email = value;
  }
  get_phone(value:any)
  {
    let isnum = /^\d+$/.test(value);
    if (value.length == 10 && isnum) {
      this.phonenumber = Number(value);
    }
  }
  get_msg(value:any)
  {
   this.msg = value;
  }

 sendEmail(e: Event)
  {
    e.preventDefault();
  
    emailjs.sendForm('service_0h5ts5q', 'template_v3jzssa', e.target as HTMLFormElement, 'user_9uB5qqShj6arB0ikePpeg')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text); alert("Succesfully Sended Mail");
      }, (error) => {
        console.log(error.text); alert("Not Able to use service right now");
      }); 
      emailjs.sendForm('service_0h5ts5q', 'template_lzdoa0d', e.target as HTMLFormElement, 'user_9uB5qqShj6arB0ikePpeg')
      .then((result: EmailJSResponseStatus) => {
      
      }, (error) => {
       
      }); 
  }
}

