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
  patientHistory = patientHistory;

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



const patientHistory = [
  {
    visitDate: '2023-10-01',
    doctor: 'Dr. Rajesh Sharma',
    diagnosis: 'Hypertension',
    medication: 'Lisinopril',
    notes: 'Patient reported high blood pressure.'
  },
  {
    visitDate: '2023-09-15',
    doctor: 'Dr. Nisha Gupta',
    diagnosis: 'Migraine',
    medication: 'Sumatriptan',
    notes: 'Patient complained of severe headaches.'
  },
  {
    visitDate: '2023-08-28',
    doctor: 'Dr. Manoj Patel',
    diagnosis: 'Type 2 Diabetes',
    medication: 'Metformin',
    notes: 'Patient diagnosed with diabetes.'
  },
  {
    visitDate: '2023-07-10',
    doctor: 'Dr. Preeti Shah',
    diagnosis: 'Allergies',
    medication: 'Zyrtec',
    notes: 'Patient had allergic reactions to pollen.'
  },
  {
    visitDate: '2023-06-25',
    doctor: 'Dr. Aryan Reddy',
    diagnosis: 'Bronchitis',
    medication: 'Amoxicillin',
    notes: 'Patient had persistent cough and chest congestion.'
  },
  {
    visitDate: '2023-05-14',
    doctor: 'Dr. Sanya Verma',
    diagnosis: 'Sinusitis',
    medication: 'Antihistamines',
    notes: 'Patient experienced sinus pain and congestion.'
  },
  {
    visitDate: '2023-04-02',
    doctor: 'Dr. Ramesh Kumar',
    diagnosis: 'Asthma',
    medication: 'Albuterol',
    notes: 'Patient diagnosed with asthma and prescribed inhaler.'
  },
  {
    visitDate: '2023-03-17',
    doctor: 'Dr. Priya Joshi',
    diagnosis: 'Influenza',
    medication: 'Oseltamivir',
    notes: 'Patient had flu-like symptoms.'
  },
  {
    visitDate: '2023-02-09',
    doctor: 'Dr. Rahul Singh',
    diagnosis: 'Back Pain',
    medication: 'Ibuprofen',
    notes: 'Patient experienced chronic lower back pain.'
  },
  {
    visitDate: '2023-01-22',
    doctor: 'Dr. Anjali Desai',
    diagnosis: 'Stomach Ulcer',
    medication: 'Omeprazole',
    notes: 'Patient diagnosed with a stomach ulcer.'
  },  {
    visitDate: '2023-10-01',
    doctor: 'Dr. Rajesh Sharma',
    diagnosis: 'Hypertension',
    medication: 'Lisinopril',
    notes: 'Patient reported high blood pressure.'
  },
  {
    visitDate: '2023-09-15',
    doctor: 'Dr. Nisha Gupta',
    diagnosis: 'Migraine',
    medication: 'Sumatriptan',
    notes: 'Patient complained of severe headaches.'
  },
  {
    visitDate: '2023-08-28',
    doctor: 'Dr. Manoj Patel',
    diagnosis: 'Type 2 Diabetes',
    medication: 'Metformin',
    notes: 'Patient diagnosed with diabetes.'
  },
  {
    visitDate: '2023-07-10',
    doctor: 'Dr. Preeti Shah',
    diagnosis: 'Allergies',
    medication: 'Zyrtec',
    notes: 'Patient had allergic reactions to pollen.'
  },
  {
    visitDate: '2023-06-25',
    doctor: 'Dr. Aryan Reddy',
    diagnosis: 'Bronchitis',
    medication: 'Amoxicillin',
    notes: 'Patient had persistent cough and chest congestion.'
  },
  {
    visitDate: '2023-05-14',
    doctor: 'Dr. Sanya Verma',
    diagnosis: 'Sinusitis',
    medication: 'Antihistamines',
    notes: 'Patient experienced sinus pain and congestion.'
  },
  {
    visitDate: '2023-04-02',
    doctor: 'Dr. Ramesh Kumar',
    diagnosis: 'Asthma',
    medication: 'Albuterol',
    notes: 'Patient diagnosed with asthma and prescribed inhaler.'
  },
  {
    visitDate: '2023-03-17',
    doctor: 'Dr. Priya Joshi',
    diagnosis: 'Influenza',
    medication: 'Oseltamivir',
    notes: 'Patient had flu-like symptoms.'
  },
  {
    visitDate: '2023-02-09',
    doctor: 'Dr. Rahul Singh',
    diagnosis: 'Back Pain',
    medication: 'Ibuprofen',
    notes: 'Patient experienced chronic lower back pain.'
  },
  {
    visitDate: '2023-01-22',
    doctor: 'Dr. Anjali Desai',
    diagnosis: 'Stomach Ulcer',
    medication: 'Omeprazole',
    notes: 'Patient diagnosed with a stomach ulcer.'
  }
];


