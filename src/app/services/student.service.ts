import { Injectable } from '@angular/core';
import { Student } from '../models/student'

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  
  private students: Student[] = [];

  

  constructor() {
    this.students.push({
      controlNumber: '18401092',
      name: 'José Maximiliano Cantabrana Esquivel',
      curp: 'CAEM990106HNTNSX02',
      age: 24,
      nip: 7823,
      email: 'jomacantabranaes@ittepic.edu.mx',
      career: 'ISC',
      photo: 'https://picsum.photos/600?random=1'
    },{
      controlNumber: '18401083',
      name: 'Sergio Armando Serrano Nuño',
      curp: 'SENA000412HNTSRX09',
      age: 23,
      nip: 7824,
      email: 'searserranonu@ittepic.edu.mx',
      career: 'ISC',
      photo: 'https://picsum.photos/600?random=2'
    });
   }

   public getStudentList(): Student[]{
    return this.students;
   }

   public getStudentByControlNumberFilter(cn: string): Student|undefined {
    return this.students.find( elem => {
        return elem.controlNumber === cn;  
    });
   }//getStudentByControlNumberFilter

   public newStudent(student: Student): Student[] {
    this.students.push(student);
    alert(student.controlNumber+''+student.name+student.age+''+student.curp+student.nip+''+student.career);
    return this.students;
   }//newStudent

   public deleteStudent(controlNumber: string): Student[] {
    this.students = this.students.filter(
      (student) => student.controlNumber !== controlNumber
    );
    return this.students;
  }//deleteStudent

   public updateStudent(student: Student): Student[] {
    const pos = this.students.findIndex(
      (_student) => _student.controlNumber == student.controlNumber
    );
    this.students[pos] = student;
    return this.students;
   }//updateStudent
   
}//Final del service
