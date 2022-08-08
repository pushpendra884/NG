import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // Registration Form
  form = {
    "id":0,
    "firstname":"",
    "lastname":"",
    "login_id":"",
    "password":"",
    "confirmpassword":"",
    "dob":"",
    "address":"",
    "gender":"",
    "mobilenumber":"",
    "role_id":2
  };

  // Input Errors
  inputError = {
    "firstname":"",
    "lastname":"",
    "login_id":"",
    "password":"",
    "confirmpassword":"",
    "dob":"",
    "address":"",
    "gender":"",
    "mobilenumber":""
  }

  // Server Success/Fail message
  message = "";

  // Server error
  success :boolean; true;

  /**
   * Inject Services
   * @param service
   */

  constructor(private service:RegistrationService) { }

  ngOnInit() {
    //localStorage.clear();
    console.log("console works")
    localStorage.setItem("sess_msg","");
    localStorage.setItem("logout_msg","");
  }
  
  

  //save a record

  save() {
    if (isNaN(this.form.id)){
      this.form.id = 0;
    }
    var _self = this;
    this.service.save(this.form, function(res,error){
      if (res.data.error){
        _self.success = false;
        _self.message = res.data.message;
        _self.inputError = res.form.inputError
        return;
      }
      _self.success = res.data.message;
      if (_self.success){
        _self.success = true;
        _self.message = "Record has been saved successfully";
        _self.inputError = {
          "firstname":"",
          "lastname":"",
          "login_id":"",
          "password":"",
          "confirmpassword":"",
          "dob":"",
          "address":"",
          "gender":"",
          "mobilenumber":""
        };
      }else{
        _self.success = false;
        _self.message = "Data is not saved";
      }
    });
  }
  reset(){
    this.form = {
      "id":0,
    "firstname":"",
    "lastname":"",
    "login_id":"",
    "password":"",
    "confirmpassword":"",
    "dob":"",
    "address":"",
    "gender":"",
    "mobilenumber":"",
    "role_id":2
    }
    this.inputError = {
    "firstname":"",
    "lastname":"",
    "login_id":"",
    "password":"",
    "confirmpassword":"",
    "dob":"",
    "address":"",
    "gender":"",
    "mobilenumber":"",
    }
    this.message = "";
  };

}
