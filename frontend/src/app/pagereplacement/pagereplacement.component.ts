import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { five } from '../five';
import { four } from '../four';
import { one } from '../one';
import { three } from '../three';
import { two } from '../two';
import { UserService } from '../user.service';
@Component({
  selector: 'app-pagereplacement',
  templateUrl: './pagereplacement.component.html',
  styleUrls: ['./pagereplacement.component.css']
})
export class PagereplacementComponent implements OnInit {
  showfifo = true;
  showlru = true;
  table = true;
  rstring = true;
  srstr: string = '';
  first = true;
  second = true;
  third = true;
  four = true;
  five = true;
  a1: one[] = [];
  a2: two[] = [];
  a3: three[] = [];
  a4: four[] = [];
  a5: five[] = [];
  totalhits: number = 0;
  totalpagefault: number = 0;

  framesize = 0;

  sstoreframes: number[] = new Array();
  constructor(private _user: UserService, private _router: Router) {
    this.a1 = [];
    this.a2 = [];
    this.a3 = [];
    this.a4 = [];
    this.a5 = [];
    this._user.user().subscribe(
      () => console.log("ffu"),
      () => this._router.navigate(['/home'])
    )
  }

  ngOnInit(): void {
  }
  fifo(event: any) {
    event.preventDefault();
    this.showfifo = false;
    this.showlru = true;
    this.table = true;
    this.first = true;
    this.second = true;
    this.third = true;
    this.four = true;
    this.five  = true;
    this.a1 = [];
    this.a2 = [];
    this.a3 = [];
    this.a4 = [];
    this.a5 = [];
    this.totalhits=0;
    this.totalpagefault =0;
  
  }
  submitfifoo() {
    this.sstoreframes = [];
    if (this.srstr.length == 0) {
      alert("Refrence String Can't Be Empty");
      return;
    }

    if (this.srstr[this.srstr.length - 1] != ' ') {
      this.srstr += " ";
    }

    let num = -1;
    for (let i = 0; i < this.srstr.length; i++) {
      if (this.srstr[i] >= '0' && this.srstr[i] <= '9') {
        if (num == -1) {
          num = 0;
        }
        num *= 10;
        num += Number(this.srstr[i]);
        if (num > 1000000000) {
          alert("Please Enter the number less than 1000000000");
          return;
        }
        continue;
      }
      else if (this.srstr[i] == ' ') {
        if (num >= 0) {
          this.sstoreframes.push(num);
        }
        num = -1;
        let j = i;
        while (j < this.srstr.length && this.srstr[j] == ' ') {

          j++;
        }
        i = j - 1;
        continue;
      }
      alert("Some error Ocured");
      return;
    }
    if (this.sstoreframes.length == 0) {
      alert("Can't Procedd");
      return;
    }
    this.table = false;
    this.first = true;
    this.second = true;
    this.third = true;
    this.four = true;
    this.five = true;
    this.totalhits = 0;
    this.totalpagefault = 0;
    this.a1 = [];
    this.a2 = [];
    this.a3 = [];
    this.a4 = [];
    this.a5 = [];
    const size = this.sstoreframes.length;
    if (this.framesize == 1) {

      let add = {
        f1: this.sstoreframes[0]
      }
      this.a1.push(add);
      this.totalpagefault += 1;
      for (let i = 1; i < size; i++) {
        let add = {
          f1: this.sstoreframes[i]
        }
        this.a1.push(add);
        if (this.sstoreframes[i - 1] == this.sstoreframes[i]) {
          this.totalhits += 1;
        }
        else {
          this.totalpagefault += 1;
        }
      }

      this.first = false;
    }
    if (this.framesize == 2) {
      let addnew = {
        f1: this.sstoreframes[0],
        f2: -1
      }
      this.a2.push(addnew);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        // alert(this.sstoreframes[1]);

        let temp = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1]
        }
        this.a2.push(temp)
        this.totalpagefault += 1;
      }

      let index = 0;
      for (let i = 2; i < size; i++) {
        let x = 0;
        var prev = this.a2[i - 1];
        var addd = {
          f1: prev.f1,
          f2: prev.f2
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i]) {
          this.totalhits += 1;

        }
        else {
          if (index % 2 == 0) {
            addd.f1 = this.sstoreframes[i];
          }
          else {
            addd.f2 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a2.push(addd);
      }
      this.second = false;
    }
    else if (this.framesize == 3) {
      let add = {
        f1: this.sstoreframes[0],
        f2: -1,
        f3: -1
      }
      this.a3.push(add);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        let addd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: -1
        }
        this.a3.push(addd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 3) {
        let adddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2]
        }
        this.a3.push(adddd);
        this.totalpagefault += 1;
      }

      let index = 0;

      for (let i = 3; i < size; i++) {
        let x = 0;
        const prev = this.a3[i - 1];
        var addnew = {
          f1: prev.f1,
          f2: prev.f2,
          f3: prev.f3
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i] || prev.f3 == this.sstoreframes[i]) {
          this.totalhits += 1;

        }
        else {
          if (index % 3 == 0) {
            addnew.f1 = this.sstoreframes[i];
          }
          else if (index % 3 == 1) {
            addnew.f2 = this.sstoreframes[i];
          }
          else if (index % 3 == 2) {
            addnew.f3 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a3.push(addnew);
      }
      this.third = false;
    }
    else if (this.framesize == 4) {
      let add = {
        f1: this.sstoreframes[0],
        f2: -1,
        f3: -1,
        f4: -1
      }
      this.a4.push(add);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        let addd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: -1,
          f4: -1
        }
        this.a4.push(addd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 3) {
        let adddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: -1
        }
        this.a4.push(adddd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 4) {
        let ddddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: this.sstoreframes[3]
        }
        this.a4.push(ddddd);
        this.totalpagefault += 1;
      }
      let index = 0;

      for (let i = 4; i < size; i++) {
        let x = 0;
        const prev = this.a4[i - 1];
        const addnew = {
          f1: prev.f1,
          f2: prev.f2,
          f3: prev.f3,
          f4: prev.f4
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i] || prev.f3 == this.sstoreframes[i] || prev.f4 == this.sstoreframes[i]) {
          this.totalhits += 1;
        }
        else {
          if (index % 4 == 0) {
            addnew.f1 = this.sstoreframes[i];
          }
          else if (index % 4 == 1) {
            addnew.f2 = this.sstoreframes[i];
          }
          else if (index % 4 == 2) {
            addnew.f3 = this.sstoreframes[i];
          }
          else if (index % 4 == 3) {
            addnew.f4 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a4.push(addnew);
      }
      this.four = false;
    }
    else if (this.framesize == 5) {

      let add = {
        f1: this.sstoreframes[0],
        f2: -1,
        f3: -1,
        f4: -1,
        f5: -1
      }
      this.a5.push(add);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        let addd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: -1,
          f4: -1,
          f5: -1
        }
        this.a5.push(addd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 3) {
        let adddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: -1,
          f5: -1
        }
        this.a5.push(adddd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 4) {
        let ddddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: this.sstoreframes[3],
          f5: -1
        }
        this.a5.push(ddddd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 5) {
        let dddddu = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: this.sstoreframes[3],
          f5: this.sstoreframes[4]
        }
        this.a5.push(dddddu);
        this.totalpagefault += 1;
      }
      let index = 0;

      for (let i = 5; i < size; i++) {
        let x = 0;
        const prev = this.a5[i - 1];
        const addnew = {
          f1: prev.f1,
          f2: prev.f2,
          f3: prev.f3,
          f4: prev.f4,
          f5: prev.f5
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i] || prev.f3 == this.sstoreframes[i] || prev.f4 == this.sstoreframes[i] || prev.f5 == this.sstoreframes[i]) {
          this.totalhits += 1;
        }
        else {
          if (index % 5 == 0) {
            addnew.f1 = this.sstoreframes[i];
          }
          else if (index % 5 == 1) {
            addnew.f2 = this.sstoreframes[i];
          }
          else if (index % 5 == 2) {
            addnew.f3 = this.sstoreframes[i];
          }
          else if (index % 5 == 3) {
            addnew.f4 = this.sstoreframes[i];
          }
          else if (index % 5 == 4) {
            addnew.f5 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a5.push(addnew);
      }
      this.five = false;
    }

  }
  submitfifo() {
    this.sstoreframes = [];
    if (this.srstr.length == 0) {
      alert("Refrence String Can't Be Empty");
      return;
    }

    if (this.srstr[this.srstr.length - 1] != ' ') {
      this.srstr += " ";
    }

    let num = -1;
    for (let i = 0; i < this.srstr.length; i++) {
      if (this.srstr[i] >= '0' && this.srstr[i] <= '9') {
        if (num == -1) {
          num = 0;
        }
        num *= 10;
        num += Number(this.srstr[i]);
        if (num > 1000000000) {
          alert("Please Enter the number less than 1000000000");
          return;
        }
        continue;
      }
      else if (this.srstr[i] == ' ') {
        if (num >= 0) {
          this.sstoreframes.push(num);
        }
        num = -1;
        let j = i;
        while (j < this.srstr.length && this.srstr[j] == ' ') {

          j++;
        }
        i = j - 1;
        continue;
      }
      alert("Some error Ocured");
      return;
    }
    if (this.sstoreframes.length == 0) {
      alert("Can't Procedd");
      return;
    }
    this.table = false;
    this.first = true;
    this.second = true;
    this.third = true;
    this.four = true;
    this.five = true;
    this.totalhits = 0;
    this.totalpagefault = 0;
    this.a1 = [];
    this.a2 = [];
    this.a3 = [];
    this.a4 = [];
    this.a5 = [];
    const size = this.sstoreframes.length;
    if (this.framesize == 1) {

      let add = {
        f1: this.sstoreframes[0]
      }
      this.a1.push(add);
      this.totalpagefault += 1;
      for (let i = 1; i < size; i++) {
        let add = {
          f1: this.sstoreframes[i]
        }
        this.a1.push(add);
        if (this.sstoreframes[i - 1] == this.sstoreframes[i]) {
          this.totalhits += 1;
        }
        else {
          this.totalpagefault += 1;
        }
      }

      this.first = false;
    }
    if (this.framesize == 2) {
      let addnew = {
        f1: this.sstoreframes[0],
        f2: -1
      }
      this.a2.push(addnew);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        // alert(this.sstoreframes[1]);

        let temp = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1]
        }
        this.a2.push(temp)
        this.totalpagefault += 1;
      }

      let index = 0;
      for (let i = 2; i < size; i++) {
        let x = 0;
        var prev = this.a2[i - 1];
        var addd = {
          f1: prev.f1,
          f2: prev.f2
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i]) {
          this.totalhits += 1;

        }
        else {
          if (index % 2 == 0) {
            addd.f1 = this.sstoreframes[i];
          }
          else {
            addd.f2 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a2.push(addd);
      }
      this.second = false;
    }
    else if (this.framesize == 3) {
      let add = {
        f1: this.sstoreframes[0],
        f2: -1,
        f3: -1
      }
      this.a3.push(add);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        let addd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: -1
        }
        this.a3.push(addd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 3) {
        let adddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2]
        }
        this.a3.push(adddd);
        this.totalpagefault += 1;
      }

      let index = 0;

      for (let i = 3; i < size; i++) {
        let x = 0;
        const prev = this.a3[i - 1];
        var addnew = {
          f1: prev.f1,
          f2: prev.f2,
          f3: prev.f3
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i] || prev.f3 == this.sstoreframes[i]) {
          this.totalhits += 1;

        }
        else {
          if (index % 3 == 0) {
            addnew.f1 = this.sstoreframes[i];
          }
          else if (index % 3 == 1) {
            addnew.f2 = this.sstoreframes[i];
          }
          else if (index % 3 == 2) {
            addnew.f3 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a3.push(addnew);
      }
      this.third = false;
    }
    else if (this.framesize == 4) {
      let add = {
        f1: this.sstoreframes[0],
        f2: -1,
        f3: -1,
        f4: -1
      }
      this.a4.push(add);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        let addd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: -1,
          f4: -1
        }
        this.a4.push(addd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 3) {
        let adddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: -1
        }
        this.a4.push(adddd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 4) {
        let ddddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: this.sstoreframes[3]
        }
        this.a4.push(ddddd);
        this.totalpagefault += 1;
      }
      let index = 0;

      for (let i = 4; i < size; i++) {
        let x = 0;
        const prev = this.a4[i - 1];
        const addnew = {
          f1: prev.f1,
          f2: prev.f2,
          f3: prev.f3,
          f4: prev.f4
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i] || prev.f3 == this.sstoreframes[i] || prev.f4 == this.sstoreframes[i]) {
          this.totalhits += 1;
        }
        else {
          if (index % 4 == 0) {
            addnew.f1 = this.sstoreframes[i];
          }
          else if (index % 4 == 1) {
            addnew.f2 = this.sstoreframes[i];
          }
          else if (index % 4 == 2) {
            addnew.f3 = this.sstoreframes[i];
          }
          else if (index % 4 == 3) {
            addnew.f4 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a4.push(addnew);
      }
      this.four = false;
    }
    else if (this.framesize == 5) {

      let add = {
        f1: this.sstoreframes[0],
        f2: -1,
        f3: -1,
        f4: -1,
        f5: -1
      }
      this.a5.push(add);
      this.totalpagefault += 1;
      if (this.sstoreframes.length >= 2) {
        let addd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: -1,
          f4: -1,
          f5: -1
        }
        this.a5.push(addd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 3) {
        let adddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: -1,
          f5: -1
        }
        this.a5.push(adddd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 4) {
        let ddddd = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: this.sstoreframes[3],
          f5: -1
        }
        this.a5.push(ddddd);
        this.totalpagefault += 1;
      }
      if (this.sstoreframes.length >= 5) {
        let dddddu = {
          f1: this.sstoreframes[0],
          f2: this.sstoreframes[1],
          f3: this.sstoreframes[2],
          f4: this.sstoreframes[3],
          f5: this.sstoreframes[4]
        }
        this.a5.push(dddddu);
        this.totalpagefault += 1;
      }
      let index = 0;

      for (let i = 5; i < size; i++) {
        let x = 0;
        const prev = this.a5[i - 1];
        const addnew = {
          f1: prev.f1,
          f2: prev.f2,
          f3: prev.f3,
          f4: prev.f4,
          f5: prev.f5
        }
        if (prev.f1 == this.sstoreframes[i] || prev.f2 == this.sstoreframes[i] || prev.f3 == this.sstoreframes[i] || prev.f4 == this.sstoreframes[i] || prev.f5 == this.sstoreframes[i]) {
          this.totalhits += 1;
        }
        else {
          if (index % 5 == 0) {
            addnew.f1 = this.sstoreframes[i];
          }
          else if (index % 5 == 1) {
            addnew.f2 = this.sstoreframes[i];
          }
          else if (index % 5 == 2) {
            addnew.f3 = this.sstoreframes[i];
          }
          else if (index % 5 == 3) {
            addnew.f4 = this.sstoreframes[i];
          }
          else if (index % 5 == 4) {
            addnew.f5 = this.sstoreframes[i];
          }
          index += 1;
          this.totalpagefault += 1;
        }
        this.a5.push(addnew);
      }
      this.five = false;
    }

  }
  onItemChange(event: any) {
    this.framesize = Number(event.target.value);
  }
  onItemChangee(event: any) {
    this.framesize = Number(event.target.value);
  }
  LRU(event: any) {
    event.preventDefault();
    this.showfifo =true;
    this.showlru = false;
    this.table = true;
    this.first = true;
    this.second = true;
    this.third = true;
    this.four = true;
    this.five  = true;
    this.totalhits=0;
    this.totalpagefault =0;
    this.a1 = [];
    this.a2 = [];
    this.a3 = [];
    this.a4 = [];
    this.a5 = [];
  }
  getrstring(value: any) {
    this.srstr = value;
  }
  getrstringg(value: any) {
    this.srstr = value;
  }
}
