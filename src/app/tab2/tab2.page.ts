import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';//Import para trabajar con forms
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public student: Student;
  public myForm: FormGroup; 
  public validationMessages;

  public students: Student[];

  constructor(private studentService: StudentService, private fb: FormBuilder,private toastController: ToastController){ /**Siempre se */
  this.students = this.studentService.getStudentList();
    this.myForm = this.fb.group({
      controlNumber: ["",Validators.compose([Validators.minLength(8), //Compose sirve para meter varias validaciones a un input, recibe un arreglo
        Validators.pattern('^[0-9]+$')])], // pattern recibe una expresion regular
      name: ["",Validators.required],
      curp: ["",Validators.compose([Validators.required, //Compose sirve para meter varias validaciones a un input, recibe un arreglo
        Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age: ["",Validators.compose([Validators.required, Validators.min(17)])],
      nip: ["",Validators.compose([Validators.required, Validators.min(10)])],
      email: ["",Validators.compose([Validators.required, Validators.email])],
      carreer: ["",Validators.required],       
      photo: [""]
    });

    this.student = {
      name:"",
      controlNumber:"",
      age:0,
      nip:0,
      email:"",
      career:"",
      curp:"",
      photo:""
    }

    this.validationMessages = {
      'controlNumber':[
        {type: 'required', message: "El numero de control es obligatorio"},
        {type: 'minlength', message: "El numero de control esta incompleto"},
        {type: 'pattern', message: "El numero de control no es valido"},
      ],
      'name':[
        {type: 'required', message: "El nombre es obligatorio"},
      ],
      'curp':[
        {type: 'required', message: "La curp es obligatoria"},
        {type: 'pattern', message: "La curp no es valida"},
      ],
      'age':[
        {type: 'required', message: "La edad obligatoria"},
        {type: 'min', message: "La edad no es valida"},
      ],
      'nip':[
        {type: 'required', message: "El nip es obligatorio"},
        {type: 'min', message: "El nip debe tener al menos dos digitos"},
      ],
      'email':[
        {type: 'required', message: "El correo electronico es obligatorio"},
        {type: 'email', message: "El formato no es correcto para email"},
      ],
      'career':[
        {type: 'required', message: "La carrera es obligatoria"},
      ]
    }
  }

  ngOnInit(){}

  public newStudent() {  
    this.studentService.newStudent(this.myForm.getRawValue());
    this.presentToast('Estudiante añadido','success');
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' | 'warning'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 500,
      color,
    });
    toast.present();
  }

}
