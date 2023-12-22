import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Images } from 'src/app/models/images.model';
import { Patient } from 'src/app/models/patient.model';
import { Imagerepository } from 'src/app/repositories/imagerepository';
import { Patientrepository } from 'src/app/repositories/patientrepository';
import { DataSharingService } from 'src/app/services/data-sharing.service';


@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  activeButton: string;
  public patients: Patient[] = [];
  public images: Images[] = [];
  patientHistoryDetails = [];

  constructor(private patientRepo: Patientrepository, private imageRepo: Imagerepository,
    private router: Router, private dataSharing: DataSharingService) {

  }

  ngOnInit() {
    this.getAllPatients();
    this.dataSharing.setActiveButton('history');
  }

  async getAllPatients() {
    console.log("Fetching all patient data...")
    this.patients = await this.patientRepo.getPatients();
    this.patientHistoryDetails = this.patients;
    console.log(">> Patient data: ", this.patients);
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

}



