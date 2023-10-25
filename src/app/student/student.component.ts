import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {

  StudentArray : any[] = [];
  isResultLoaded = false;

 
  
  name: string ="";
  address: string ="";
  phone: Number =0;
 
  currentStudentID = "";


constructor(private http: HttpClient )
  {
    this.getAllStudent();
 
  }

  getAllStudent()
  {
    
    this.http.get(environment.apiUrl)
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.StudentArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone
    };
 
    this.http.post(environment.apiUrl,bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone  = 0;
    });
  }
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.phone = data.phone;
   this.currentStudentID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "id" : this.currentStudentID,
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
  
    };
    
    this.http.put(environment.apiUrl+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Updateddd")
        this.getAllStudent();
      
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete(environment.apiUrl+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deleteddd")
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone  = 0;
  
    });
 
  }



}