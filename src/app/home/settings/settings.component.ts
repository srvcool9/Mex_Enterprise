import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { Patientrepository } from 'src/app/repositories/patientrepository';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  patientInfoForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private patientRepo: Patientrepository,
    private dataSharing: DataSharingService) { }
  ngOnInit(): void {
    this.createForm();
    this.dataSharing.setActiveButton('settings');
  }

  createForm() {
    this.patientInfoForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      dateOfBirth: [],
      gender: [],
      mobile: [],
      address: [],
      doctorName:[],
      registration:[],
      username:[],
      password:[],
      macID:[]

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

  cancel(){
    this.patientInfoForm.reset();
  }

}
