import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Arrray } from 'src/app/Arrrays';
import { gant } from '../gant';
import { prioty } from '../prioty';


@Component({
  selector: 'app-schedulingalgorithms',
  templateUrl: './schedulingalgorithms.component.html',
  styleUrls: ['./schedulingalgorithms.component.css']
})
export class SchedulingalgorithmsComponent implements OnInit {

  @ViewChild('pid') pidnpfcfs: any;
  @ViewChild('atime') atimenpfcfs: any;
  @ViewChild('btime') btimenpfcfs: any;
  @ViewChild('pidd') pidnpsjf: any;
  @ViewChild('atimee') atimenpsjf: any;
  @ViewChild('btimee') btimenpsjf: any;
  @ViewChild('pid_nps') pid_nps: any;
  @ViewChild('priority_nps') p_nps: any;
  @ViewChild('atime_nps') atime_nps: any;
  @ViewChild('btime_nps') btime_nps: any;
  @ViewChild('pid_psjf') pid_psjf: any;
  @ViewChild('atime_psjf') atime_psjf: any;
  @ViewChild('btime_psjf') btime_psjf: any;
  @ViewChild('pid_ps') pid_ps: any;
  @ViewChild('priority_ps') p_ps: any;
  @ViewChild('atime_ps') atime_ps: any;
  @ViewChild('btime_ps') btime_ps: any;
  @ViewChild('pid_rr') pid_rr: any;
  @ViewChild('atime_rr') atime_rr: any;
  @ViewChild('btime_rr') btime_rr: any;
  @ViewChild('tq') tq: any;

  showtables = true;
  showgaant = true;
  title = 'prac';
  // @Input() aray
  // @Input() gannt
  // @Input() todo
  aray: Arrray[];
  todo: Arrray[] = [];
  pid: number = -1;
  atime: number = -1;
  prority: number = -1;
  btime: number = -1;
  avgtat: number = 0.00;
  avgwt: number = 0.00;
  Gannt: gant[] = [];
  prty: prioty[] = [];

  fcfs = true;
  psjf = true;
  npsjf = true;
  pscheduling = true;
  npscheduling = true;
  rr = true;


  constructor(private _user: UserService, private _router: Router) {
    this.aray = [];
    this.Gannt = [];
    this.prty = [];
    this._user.user().subscribe(
      data => console.log("ffu"),
      error => this._router.navigate(['/home'])
    )
  }

  ngOnInit(): void {
  }

  EraseData(event: any) {
    event.preventDefault();

    this.Gannt = [];
    this.aray = [];
    this.Gannt = [];
    this.aray = [];
    this.avgtat = 0.00;
    this.avgwt = 0.00;
    this.pid = -1;
    this.btime = -1;
    this.atime = -1;
    this.prty = [];
    this.showgaant = true;
    this.showtables = true;

    this.pidnpfcfs.nativeElement.value = '';
    this.atimenpfcfs.nativeElement.value = '';
    this.btimenpfcfs.nativeElement.value = '';
    this.pidnpsjf.nativeElement.value = '';
    this.atimenpsjf.nativeElement.value = '';
    this.btimenpsjf.nativeElement.value = '';
    this.pid_nps.nativeElement.value = '';
    this.p_nps.nativeElement.value = '';
    this.atime_nps.nativeElement.value = '';
    this.btime_nps.nativeElement.value = '';
    this.pid_psjf.nativeElement.value = '';
    this.atime_psjf.nativeElement.value = '';
    this.btime_psjf.nativeElement.value = '';
    this.pid_ps.nativeElement.value = '';
    this.p_ps.nativeElement.value = '';
    this.atime_ps.nativeElement.value = '';
    this.btime_ps.nativeElement.value = '';
    this.pid_rr.nativeElement.value = '';
    this.atime_rr.nativeElement.value = '';
    this.btime_rr.nativeElement.value = '';
    this.tq.nativeElement.value = '';

    this.aray.splice(0, this.aray.length);
    this.Gannt.splice(0, this.Gannt.length);

    event.preventDefault();
  }
  switch() {
    this.fcfs = true;
    this.psjf = true;
    this.npsjf = true;
    this.pscheduling = true;
    this.npscheduling = true;
    this.rr = true;
  }
  showfcfs(event: any) {
    this.EraseData(event);
    this.switch();
    this.fcfs = false;
  }


  Submit() {
    if (this.pid < 0) {

      alert("Process Id Must Be Proper" + this.pid);
      return;
    }
    if (this.atime < 0) {
      alert("Arrival Time Must Be Proper");
      return;
    }
    if (this.btime < 0) {
      alert("Burst Time Must Be Proper");
      return;
    }

    // checking if pid is unique
    for (let i = 0; i < this.aray.length; i++) {
      if (this.aray[i].pid == this.pid) {
        alert("Process Id's Are Always Unique")
        return;
      }
    }

    var todo = {
      pid: this.pid,
      atime: this.atime,
      btime: this.btime,
      ctime: 0,
      tat: 0,
      wt: 0
    }
    this.aray.push(todo);
    this.showtables = false;
  }



  // getting the content of pid, atime & btime from textfields 
  getPid(value: string) {
    let isnum = /^\d+$/.test(value);
    if (value.length > 0 && value.length < 9 && isnum) {
      this.pid = Number(value);
    }
  }
  getPriority(value: string) {
    let isnum = /^\d+$/.test(value);
    if (value.length > 0 && value.length < 9 && isnum) {
      this.prority = Number(value);
    }
  }
  getAtime(value: string) {
    let isnum = /^\d+$/.test(value);
    if (value.length > 0 && value.length < 9 && isnum) {
      this.atime = Number(value);
    }
  }
  getBtime(value: string) {
    let isnum = /^\d+$/.test(value);
    if (value.length > 0 && value.length < 9 && isnum) {
      this.btime = Number(value);
    }
  }

  Compute(event: any) {
    event.preventDefault();
    //Validations
    // 1.first the table should not be empty 
    let sz = this.Gannt.length;
    while (sz--) {
      this.Gannt.pop();
    }
    let size = this.aray.length;
    if (size == 0) {
      alert("No Computation Can Be Done As Table Is Empty");
      return;
    }
    let start = 0;
    let visited: boolean[] = new Array();
    let starting: number[] = new Array();
    let index: number[] = new Array();
    let maap: number[] = new Array();
    for (let i = 0; i < size; i++) {
      visited.push(false);
      starting.push(i);
      maap.push(0);
      maap.push(0);
    }
    let tot = 0;
    while (tot < size) {
      let index = -1;
      for (let k = 0; k < size; k++) {
        if (!visited[k] && start >= this.aray[k].atime) {
          //add  here
          index = k;
          break;
        }
      }
      if (index == -1) {
        let valuue = 1000000;
        for (let k = 0; k < size; k++) {
          if (!visited[k]) {

            valuue = Math.min(valuue, this.aray[k].atime);
          }
        }
        for (let k = 0; k < size; k++) {
          if (!visited[k] && this.aray[k].atime == valuue) {
            index = k;
            var add = {
              id: "Cpu Ideal State",
              start: start,
              end: valuue,
            }
            this.Gannt.push(add);
            break;
          }
        }
        start = valuue;
      }
      maap[tot] = index;
      visited[index] = true;
      starting[tot] = start;
      var ss = "Process Id ";
      ss += this.aray[index].pid.toString();
      var add1 = {
        id: ss,
        start: start,
        end: start + this.aray[index].btime,
      }
      start += this.aray[index].btime;
      this.Gannt.push(add1);
      tot += 1;
    }
    tot = 0;
    while (tot < size) {
      let index = maap[tot];
      this.aray[index].ctime = this.aray[index].btime + starting[index];
      this.aray[index].tat = Math.abs(this.aray[index].ctime - this.aray[index].atime);
      this.aray[index].wt = Math.abs(this.aray[index].tat - this.aray[index].btime);
      this.avgtat += this.aray[index].tat;
      this.avgwt += this.aray[index].wt;
      tot += 1;
    }
    this.avgtat /= size;
    this.avgwt /= size;
    this.avgtat = Math.round(this.avgtat * 100) / 100;
    this.avgwt = Math.round(this.avgwt * 100) / 100;
    this.showgaant = false;
    event.preventDefault();
  }




  shownpsjf(event: any) {
    event.preventDefault();
    this.EraseData(event);
    this.switch();
    this.npsjf = false;
  }

  SubmitNPSJF() {
    if (this.pid < 0) {

      alert("Process Id Must Be Proper" + this.pid);
      return;
    }
    if (this.atime < 0) {
      alert("Arrival Time Must Be Proper");
      return;
    }
    if (this.btime < 0) {
      alert("Burst Time Must Be Proper");
      return;
    }

    // checking if pid is unique
    for (let i = 0; i < this.aray.length; i++) {
      if (this.aray[i].pid == this.pid) {
        alert("Process Id's Are Always Unique")
        return;
      }
    }

    var todo = {
      pid: this.pid,
      atime: this.atime,
      btime: this.btime,
      ctime: 0,
      tat: 0,
      wt: 0
    }
    this.aray.push(todo);
    this.showtables = false;
  }

  ComputeNPSJF(event: any) {

    let size = this.aray.length;
    let visited: boolean[] = new Array();
    let index: Number[] = new Array();
    for (let i = 0; i < size; i++) {
      visited.push(false);
    }
    this.Gannt = [];
    this.avgwt = this.avgtat = 0;
    let start = 0;
    let temp = size;
    while (temp > 0) {
      let burst = 1000000007;
      let ind = -1;
      let smallestarrival = 1000000007;
      for (let i = 0; i < size; i++) {
        if (!visited[i] && this.aray[i].atime <= start) {
          if (this.aray[i].btime < burst) {
            burst = this.aray[i].btime;
            ind = i;
          }
        }
        else if (!visited[i]) {
          smallestarrival = Math.min(smallestarrival, this.aray[i].atime);
        }
      }

      if (ind == -1) {

        var tempp = "Cpu Ideal";
        var addd = {
          id: tempp,
          start: start,
          end: smallestarrival
        }
        start = smallestarrival;
        this.Gannt.push(addd);
        let smallestgant = 1000000007;
        for (let i = 0; i < size; i++) {
          if (!visited[i] && this.aray[i].atime == start) {
            if (smallestgant > this.aray[i].btime) {
              smallestgant = this.aray[i].btime;
              ind = i;
            }
          }
        }
        // means ideal CPU
      }

      for (let i = 0; i < size; i++) {
        if (!visited[i] && this.aray[i].btime == this.aray[ind].btime && this.aray[i].atime < start) {
          ind = i;
        }
      }

      // Means No Ideal Cpu
      visited[ind] = true;
      this.aray[ind].ctime = start + this.aray[ind].btime;
      this.aray[ind].tat = Math.abs(this.aray[ind].ctime - this.aray[ind].atime);
      this.aray[ind].wt = Math.abs(this.aray[ind].tat - this.aray[ind].btime);
      var ad = {
        id: "Process Id " + this.aray[ind].pid.toString(),
        start: start,
        end: start + this.aray[ind].btime
      }
      start += this.aray[ind].btime;
      this.Gannt.push(ad);
      this.avgtat += this.aray[ind].tat;
      this.avgwt += this.aray[ind].wt;
      temp -= 1;
    }
    this.avgtat /= size;
    this.avgwt /= size;
    this.avgtat = Math.round(this.avgtat * 100) / 100;
    this.avgwt = Math.round(this.avgwt * 100) / 100;
    this.showgaant = false;
  }
  shownpp(event: any) {
    this.EraseData(event);
    this.switch();
    this.npscheduling = false;
  }
  SubmitNPS() {
    if (this.pid < 0) {
      alert("Process Id Must Be Proper" + this.pid);
      return;
    }
    if (this.prority < 0) {
      alert("Priority Number Must Be Proper");
      return;
    }
    if (this.atime < 0) {
      alert("Arrival Time Must Be Proper");
      return;
    }
    if (this.btime < 0) {
      alert("Burst Time Must Be Proper");
      return;
    }

    // checking if pid is unique
    for (let i = 0; i < this.prty.length; i++) {
      if (this.prty[i].pid == this.pid) {
        alert("Process Id's Are Always Unique")
        return;
      }
    }

    var todo = {
      pid: this.pid,
      priority: this.prority,
      atime: this.atime,
      btime: this.btime,
      ctime: 0,
      tat: 0,
      wt: 0
    }
    this.prty.push(todo);
    this.showtables = false;
  }
  ComputeNPP(event: any) {

    event.preventDefault();

    let size = this.prty.length;
    let visited: boolean[] = new Array();
    let index: Number[] = new Array();
    for (let i = 0; i < size; i++) {
      visited.push(false);
    }
    this.Gannt = [];
    this.avgwt = this.avgtat = 0;
    let start = 0;
    let temp = size;
    while (temp > 0) {
      let burst = 1000000007;
      let ind = -1;
      let smallestarrival = 1000000007;
      for (let i = 0; i < size; i++) {
        if (!visited[i] && this.prty[i].atime <= start) {
          if (this.prty[i].priority < burst) {
            burst = this.prty[i].priority;
            ind = i;
          }
        }
        else if (!visited[i]) {
          smallestarrival = Math.min(smallestarrival, this.prty[i].atime);
        }
      }

      if (ind == -1) {

        var tempp = "Cpu Ideal";
        var addd = {
          id: tempp,
          start: start,
          end: smallestarrival
        }
        start = smallestarrival;
        this.Gannt.push(addd);
        let smallestgant = 1000000007;
        for (let i = 0; i < size; i++) {
          if (!visited[i] && this.prty[i].atime == start) {
            if (smallestgant > this.prty[i].priority) {
              smallestgant > this.prty[i].priority;
              ind = i;
            }
          }
        }
        // means ideal CPU
      }

      let goodatime = 1000000007;
      for (let i = 0; i < size; i++) {
        if (!visited[i] && this.prty[i].priority == this.prty[ind].priority && this.prty[i].atime < start) {
          if (this.prty[ind].atime > this.prty[i].priority) {
            ind = i;
          }
        }
      }



      // Means No Ideal Cpu
      visited[ind] = true;
      this.prty[ind].ctime = start + this.prty[ind].btime;
      this.prty[ind].tat = Math.abs(this.prty[ind].ctime - this.prty[ind].atime);
      this.prty[ind].wt = Math.abs(this.prty[ind].tat - this.prty[ind].btime);
      var ad = {
        id: "Process Id " + this.prty[ind].pid.toString(),
        start: start,
        end: start + this.prty[ind].btime
      }
      start += this.prty[ind].btime;
      this.Gannt.push(ad);
      this.avgtat += this.prty[ind].tat;
      this.avgwt += this.prty[ind].wt;
      temp -= 1;
    }
    this.avgtat /= size;
    this.avgwt /= size;
    this.avgtat = Math.round(this.avgtat * 100) / 100;
    this.avgwt = Math.round(this.avgwt * 100) / 100;
    this.showgaant = false;
  }







  showpsjf(event: any) {
    this.EraseData(event);
    this.switch();
    this.psjf = false;
  }
  SubmitPSJF() {
    if (this.pid < 0) {

      alert("Process Id Must Be Proper" + this.pid);
      return;
    }
    if (this.atime < 0) {
      alert("Arrival Time Must Be Proper");
      return;
    }
    if (this.btime < 0) {
      alert("Burst Time Must Be Proper");
      return;
    }

    // checking if pid is unique
    for (let i = 0; i < this.aray.length; i++) {
      if (this.aray[i].pid == this.pid) {
        alert("Process Id's Are Always Unique")
        return;
      }
    }

    var todo = {
      pid: this.pid,
      atime: this.atime,
      btime: this.btime,
      ctime: 0,
      tat: 0,
      wt: 0
    }
    this.aray.push(todo);
    this.showtables = false;
  }



  ComputePSJF(event: any) {
    event.preventDefault();
    let size = this.aray.length;
    let visited: boolean[] = new Array();
    let index: Number[] = new Array();
    for (let i = 0; i < size; i++) {
      visited.push(false);
    }
    this.Gannt = [];
    this.avgwt = this.avgtat = 0;
    let start = 0;
    let temp = 0;
    let track: number[] = new Array();
    for (let i = 0; i < size; i++) {
      track.push(this.aray[i].btime);
      temp += this.aray[i].btime;
    }
    while (temp > 0) {
      let burst = 1000000007;
      let ind = -1;
      let smallestarrival = 1000000007;
      for (let i = 0; i < size; i++) {
        if (this.aray[i].btime > 0 && this.aray[i].atime <= start) {
          if (this.aray[i].btime < burst) {
            burst = this.aray[i].btime;
            ind = i;
          }
        }
        else if (!visited[i]) {
          smallestarrival = Math.min(smallestarrival, this.aray[i].atime);
        }
      }

      if (ind == -1) {

        var tempp = "Cpu Ideal";
        var addd = {
          id: tempp,
          start: start,
          end: smallestarrival
        }
        start = smallestarrival;
        this.Gannt.push(addd);
        let smallestgant = 1000000007;
        for (let i = 0; i < size; i++) {
          if (this.aray[i].btime > 0 && this.aray[i].atime == start) {
            if (smallestgant > this.aray[i].btime) {
              smallestgant = this.aray[i].btime;
              ind = i;
            }
          }
        }
        // means ideal CPU
      }

      for (let i = 0; i < size; i++) {
        if (this.aray[i].btime > 0 && this.aray[i].btime == this.aray[ind].btime && this.aray[i].atime < start) {
          ind = i;
        }
      }

      // Means No Ideal Cpu
      visited[ind] = true;
      this.aray[ind].ctime = start + 1;
      this.aray[ind].tat = Math.abs(this.aray[ind].ctime - this.aray[ind].atime);
      this.aray[ind].wt = Math.abs(this.aray[ind].tat - this.aray[ind].btime);
      var ad = {
        id: "Process Id " + this.aray[ind].pid.toString(),
        start: start,
        end: start + 1
      }
      if (this.Gannt.length == 0) {
        start += 1;
        this.Gannt.push(ad);
      }
      else {

        var find = "Process Id " + this.aray[ind].pid.toString();
        if (this.Gannt[this.Gannt.length - 1].id == find) {
          start += 1;
          this.Gannt[this.Gannt.length - 1].end += 1;

        }
        else {
          start += 1;
          this.Gannt.push(ad);
        }
      }
      this.aray[ind].btime -= 1;
      temp -= 1;
    }
    for (let i = 0; i < size; i++) {
      this.aray[i].btime = track[i];
      this.avgtat += this.aray[i].tat;
      this.avgwt += this.aray[i].wt;
      this.aray[i].wt = Math.abs(this.aray[i].tat - this.aray[i].btime);
    }
    this.avgtat /= size;
    this.avgwt /= size;
    this.avgtat = Math.round(this.avgtat * 100) / 100;
    this.avgwt = Math.round(this.avgwt * 100) / 100;
    this.showgaant = false;
  }
  showp(event: any) {
    this.EraseData(event);
    this.switch();
    this.pscheduling = false;
  }
  SubmitPS() {
    if (this.pid < 0) {
      alert("Process Id Must Be Proper" + this.pid);
      return;
    }
    if (this.prority < 0) {
      alert("Priority Number Must Be Proper");
      return;
    }
    if (this.atime < 0) {
      alert("Arrival Time Must Be Proper");
      return;
    }
    if (this.btime < 0) {
      alert("Burst Time Must Be Proper");
      return;
    }

    // checking if pid is unique
    for (let i = 0; i < this.prty.length; i++) {
      if (this.prty[i].pid == this.pid) {
        alert("Process Id's Are Always Unique")
        return;
      }
    }

    var todo = {
      pid: this.pid,
      priority: this.prority,
      atime: this.atime,
      btime: this.btime,
      ctime: 0,
      tat: 0,
      wt: 0
    }
    this.prty.push(todo);
    this.showtables = false;
  }
  ComputeNP(event: any) {
    event.preventDefault();
    let size = this.prty.length;
    let visited: boolean[] = new Array();
    let index: number[] = new Array();
    let temp = 0;
    for (let i = 0; i < size; i++) {
      temp += this.prty[i].btime;
      index.push(this.prty[i].btime);
      visited.push(false);
    }
    this.Gannt = [];
    this.avgwt = this.avgtat = 0;
    let start = 0;

    while (temp > 0) {
      let burst = 1000000007;
      let ind = -1;
      let smallestarrival = 1000000007;
      for (let i = 0; i < size; i++) {
        if (this.prty[i].btime > 0 && this.prty[i].atime <= start) {
          if (this.prty[i].priority < burst) {
            burst = this.prty[i].priority;
            ind = i;
          }
        }
        else if (!visited[i]) {
          smallestarrival = Math.min(smallestarrival, this.prty[i].atime);
        }
      }

      if (ind == -1) {
        var tempp = "Cpu Ideal";
        var addd =
        {
          id: tempp,
          start: start,
          end: smallestarrival
        }
        start = smallestarrival;
        this.Gannt.push(addd);
        let smallestgant = 1000000007;
        for (let i = 0; i < size; i++) {
          if (this.prty[i].btime > 0 && this.prty[i].atime == start) {
            if (smallestgant > this.prty[i].priority) {
              smallestgant = this.prty[i].priority;
              ind = i;
            }
          }
        }
        // means ideal CPU
      }

      let goodatime = 1000000007;
      for (let i = 0; i < size; i++) {
        if (this.prty[i].btime > 0 && this.prty[i].priority == this.prty[ind].priority && this.prty[i].atime < start) {
          if (this.prty[ind].atime > this.prty[i].priority) {
            ind = i;
          }
        }
      }



      // Means No Ideal Cpu
      this.prty[ind].ctime = start + 1;
      this.prty[ind].tat = Math.abs(this.prty[ind].ctime - this.prty[ind].atime);
      var ad =
      {
        id: "Process Id " + this.prty[ind].pid.toString(),
        start: start,
        end: start + 1
      }
      start += 1;
      var find = "Process Id " + this.prty[ind].pid.toString();
      if (this.Gannt.length == 0) {
        this.Gannt.push(ad);
      }
      else {
        if (this.Gannt[this.Gannt.length - 1].id == find) {
          this.Gannt[this.Gannt.length - 1].end += 1;
        }
        else {
          this.Gannt.push(ad);
        }
      }
      this.prty[ind].btime -= 1;
      temp -= 1;
    }

    for (let i = 0; i < size; i++) {
      this.prty[i].btime = index[i];
      this.avgtat += this.prty[i].tat;
      this.avgwt += this.prty[i].wt;
      this.prty[i].wt = Math.abs(this.prty[i].tat - this.prty[i].btime);
    }
    this.avgtat /= size;
    this.avgwt /= size;
    this.avgtat = Math.round(this.avgtat * 100) / 100;
    this.avgwt = Math.round(this.avgwt * 100) / 100;
    this.showgaant = false;
  }
  showrr(event: any) {
    event.preventDefault();
    this.EraseData(event);
    this.switch();
    this.rr = false;
  }
  SubmitRR() {
    if (this.pid < 0) {

      alert("Process Id Must Be Proper" + this.pid);
      return;
    }
    if (this.atime < 0) {
      alert("Arrival Time Must Be Proper");
      return;
    }
    if (this.btime < 0) {
      alert("Burst Time Must Be Proper");
      return;
    }

    // checking if pid is unique
    for (let i = 0; i < this.aray.length; i++) {
      if (this.aray[i].pid == this.pid) {
        alert("Process Id's Are Always Unique")
        return;
      }
    }

    var todo = {
      pid: this.pid,
      atime: this.atime,
      btime: this.btime,
      ctime: 0,
      tat: 0,
      wt: 0
    }
    this.aray.push(todo);
    this.showtables = false;
  }

  ComputeRR(event: any) {
    event.preventDefault();
    let isnum = /^\d+$/.test(this.tq.nativeElement.value);
    let tq;
    if (this.tq.nativeElement.value.length > 0 && this.tq.nativeElement.value.length < 9 && isnum) {
      tq = parseInt(this.tq.nativeElement.value);
      if (tq < 0) {
        alert("Please Enter Numeric Time Quantum Value");
        return;
      }
    }
    else {
      alert("Please Enter Numeric Time Quantum Value");
      return;
    }
    this.Gannt = [];
    this.avgtat = 0;
    this.avgwt = 0;

    let loop = 0;
    let store: number[] = new Array();
    let start = 0;
    let visited: boolean[] = new Array();
    let queue: number[] = new Array();
    let size = this.aray.length;
    for (let i = 0; i < size; i++) {
      visited.push(false);
      store.push(this.aray[i].btime);
      loop += this.aray[i].btime;
    }
    let f = 0;
    while (loop > 0) {

      //two possibilities either we can find out the 
      if (queue.length == 0) {
        let sorted: number[] = new Array();
        let minimum = 1000000007;
        let ind = -1;
        let mm = 0;
        for (let i = 0; i < size; i++) {
          if (!visited[i] && this.aray[i].atime <= start) {
            sorted.push(i);
            visited[i] = true;
          }
          else if (!visited[i]) {
            if (this.aray[i].atime < minimum) {
              ind = i;
              minimum = this.aray[i].atime;
            }
          }
          else {
            mm += 1;
          }
        }
        if (mm == size) {

        }
        else if (sorted.length == 0) {
          // but cpu is also ideal here because start
          var tempp = "Cpu Ideal";
          var addd =
          {
            id: tempp,
            start: start,
            end: minimum
          }
          start = minimum;
          this.Gannt.push(addd);
          for (let i = 0; i < size; i++) {
            if (!visited[i] && this.aray[i].atime == minimum) {
              visited[i] = true;
              queue.push(i);
            }
          }
        }
        else {
          // here we will sort the number of operations
          let hsize = sorted.length;
          for (let i = 0; i < hsize; i++) {
            for (let j = i + 1; j < hsize; j++) {
              if (this.aray[sorted[i]].atime > this.aray[sorted[j]].atime) {
                let sswap = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = sswap;
              }
            }
          }
          for (let i = 0; i < hsize; i++) {
            queue.push(sorted[i]);
          }
        }
      }


      let front = queue[f];
      f += 1;
      if (this.aray[front].btime >= tq) {
        loop -= tq;
        this.aray[front].btime -= tq;
        var tempp = "Process Id " + this.aray[front].pid.toString();
        var add =
        {
          id: tempp,
          start: start,
          end: start + tq
        }
        start = start + tq;
        if (this.Gannt.length == 0) {
          this.Gannt.push(add);
        }
        else {
          var find = "Process Id " + this.aray[front].pid.toString();
          if (this.Gannt[this.Gannt.length - 1].id == find) {
            this.Gannt[this.Gannt.length - 1].end += tq;
          }
          else {
            this.Gannt.push(add);
          }
        }

      }
      else {
        let sst = this.aray[front].btime;
        loop -= sst;
        this.aray[front].btime = 0;
        var tempp = "Process Id " + this.aray[front].pid.toString();
        var addq =
        {
          id: tempp,
          start: start,
          end: start + sst
        }
        start = start + sst;
        if (this.Gannt.length == 0) {
          this.Gannt.push(addq);
        }
        else {

          var find = "Process Id " + this.aray[front].pid.toString();
          if (this.Gannt[this.Gannt.length - 1].id == find) {
            this.Gannt[this.Gannt.length - 1].end += sst;
          }
          else {
            this.Gannt.push(addq);
          }
        }
      }


      this.aray[front].ctime = start;
      this.aray[front].tat = Math.abs(this.aray[front].ctime - this.aray[front].atime);
      this.aray[front].wt = Math.abs(this.aray[front].tat - store[front]);




      let sorted: number[] = new Array();
      let minimum = 1000000007;
      let ind = -1;
      let mm = 0;
      for (let i = 0; i < size; i++) {
        if (!visited[i] && this.aray[i].atime <= start) {
          sorted.push(i);
          visited[i] = true;
        }
        else if (!visited[i]) {
          if (this.aray[i].atime < minimum) {
            ind = i;
            minimum = this.aray[i].atime;
          }
        }
        else {
          mm += 1;
        }
      }
      if (mm == size) {

      }
      else if (sorted.length == 0) {
        // but cpu is also ideal here because start
        var tempp = "Cpu Ideal";
        var addd =
        {
          id: tempp,
          start: start,
          end: minimum
        }
        start = minimum;
        this.Gannt.push(addd);
        for (let i = 0; i < size; i++) {
          if (!visited[i] && this.aray[i].atime == minimum) {
            visited[i] = true;
            queue.push(i);
          }
        }
      }
      else {
        // here we will sort the number of operations
        let hsize = sorted.length;
        for (let i = 0; i < hsize; i++) {
          for (let j = i + 1; j < hsize; j++) {
            if (this.aray[sorted[i]].atime > this.aray[sorted[j]].atime) {
              let sswap = sorted[i];
              sorted[i] = sorted[j];
              sorted[j] = sswap;
            }
          }
        }
        for (let i = 0; i < hsize; i++) {
          queue.push(sorted[i]);
        }
      }



      if (this.aray[front].btime > 0) {
        queue.push(front);
      }
    }
    for (let i = 0; i < size; i++) {
      this.aray[i].btime = store[i];
      this.avgtat += this.aray[i].tat;
      this.avgwt += this.aray[i].wt;
    }
    this.avgtat /= size;
    this.avgwt /= size;
    this.avgtat = Math.round(this.avgtat * 100) / 100;
    this.avgwt = Math.round(this.avgwt * 100) / 100;
    this.showgaant = false;
  }
}
