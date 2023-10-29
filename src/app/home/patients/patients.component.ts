import { Component, Injectable, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { Patientrepository } from 'src/app/repositories/patientrepository';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent  implements OnInit {

  public patients: Patient[] = [];

  constructor(private patientRepo:Patientrepository) { 
    this.getAllPatients();
  }

  ngOnInit() {
    
  }
  
  async getAllPatients() {
    console.log("Fetching all patient data...")
    this.patients = await this.patientRepo.getPatients();
    console.log(this.patients);
  }

}
