import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Patientrepository } from '../repositories/patientrepository';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  patientInfoForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private patientRepo: Patientrepository) { }
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.patientInfoForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [],
      gender: [],
      mobile: [],
      address: []
    })
  }


  openFirstMenu() {
    this.router.navigate(['/home']);
  }

  Camera() {
    this.router.navigate(['/home/camera']);
  }

  patientHistory() {
    this.router.navigate(['/home/patients']);
  }

  async submitPatientForm() {
    //console.log(JSON.stringify(this.patientInfoForm.value));
    let patient: Patient = new Patient();
    patient.firstName = this.patientInfoForm.controls['firstName'].value;
    patient.lastName = this.patientInfoForm.controls['lastName'].value;
    patient.gender = this.patientInfoForm.controls['gender'].value;
    patient.dateOfBirth = this.patientInfoForm.controls['dateOfBirth'].value;
    patient.mobileNo = this.patientInfoForm.controls['mobile'].value;
    patient.address = this.patientInfoForm.controls['address'].value;
    //patient.Image = this.imageBase64;
    console.log("Pateint Data submitted: ", JSON.stringify(patient));
    this.patientRepo.addPatient(patient);
  }

}
