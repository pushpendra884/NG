import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../service/student.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-student-list',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {

  // Server success/fail message
  message = "";

  // Server error
  success:boolean = true; 

  // Search form
  form = {
    "firstName":"",
    "pageno":1,
    "LastId":1,
    "MaxId":1,
    "index":1,
    "mesg":""
  }

  // Contains Student list
  list = [];

  constructor(private router:Router, private service:StudentService) { }

  ngOnInit() {
    this.search();
  }

  /** Edit a record */

  edit(id){
    this.router.navigateByUrl("/student/" + id);
  }

  /** Delete a record */
  
  delete(id){
    var _self = this;
    this.service.delete(id, function (res,error){
      if (res.data.error){
        alert("Error: " + res.data.message);
        return ;
      }
      _self.success = true;
      _self.message = res.data.message ;
      _self.form = {
        "firstName":"",
        "pageno":1,
        "LastId":1,
        "MaxId":1,
        "index":1,
        "mesg":"" 
      }
      _self.search();
      setTimeout(()=> {
        $("#timeout").fadeOut(1000);
      },2000);
    });
  }

  /** Search and get list */

  search(){
    var _self = this;
    this.service.search(this.form, function (res,error){
      if (error){
        alert("Error: " + error.message);
        return ;
      }
      _self.form.index = res.result.index;
      _self.form.LastId = res.result.LastId;
      _self.form.MaxId = res.result.MaxId;
      _self.form.mesg = res.result.mesg;
      _self.list = res.result.data;
    });
  }

  /** Submit the form */

  submit(){
    this.form.pageno = 1;
    this.search();
  }

  /** Get previous records */

  previous(){
    this.form.pageno -= 1;
    this.search();
  }

  /** Get next records */

  next(){
    this.form.pageno += 1;
    this.search();
  }

  reload(){
    window.location.reload()
  }
}
