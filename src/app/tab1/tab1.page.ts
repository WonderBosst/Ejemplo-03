import { Component, ViewChild } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import {AlertController,IonSearchbar,IonSelect,ModalController,ToastController,} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  @ViewChild('ionBusqueda') busqueda!: IonSearchbar;
  
  students: Student[] = [];
  fStudents: Student[] = [];
  constructor(
    private studentService: StudentService, 
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    this.students = this.studentService.getStudentList();
    this.fStudents = this.students;
  }//constructor

  ionViewDidEnter() {
    this.busqueda.setFocus();
  }

  public filter (dato: String) {
    if (!dato.trim()) {
      this.fStudents = this.students;
      return;
    }
    this.fStudents = this.students.filter((student) =>
          student.controlNumber.toLowerCase().includes(dato.toLowerCase())
    );
  }

  public filterStudent(event: Event) {
    if (event instanceof CustomEvent) {
      this.filter(event.detail.value);
    }
  }

  public deleteStudent(controlNumber: string) {
    this.confirmationDialog(
      '¿Estás seguro de eliminar este estudiante?',
      () => {
        this.students = this.studentService.deleteStudent(controlNumber);
        this.filter(this.busqueda.value || '');
      }
    );
  }//Delete student
  
  private async confirmationDialog(
    header: string,
    handler?: Function,
    dismissFunction?: Function
  ) {
    const alert = await this.alertController.create({
      header,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.presentToast('Operación cancelada', 'warning');
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            if (handler) handler();
            this.presentToast('Operación realizada', 'success');
          },
        },
      ],
    });
    alert.present();
    alert.onDidDismiss().then((respuesta) => {
      if (dismissFunction) dismissFunction(respuesta);
    });
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