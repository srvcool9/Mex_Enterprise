import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit, OnInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;

  private canvasElement: any;
  private context: any;
  private video: any;
  patientInfoForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.context = this.canvasElement.getContext('2d');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          this.video.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    }

  }
  cameraOn: boolean = false;

  capture() {

  }

  createForm() {
    this.patientInfoForm = this.fb.group({
      patientName: [''],
      age: [],
      gender: [],
      mobile: [],
      medicalCondition: []
    })
  }

  submitPatientForm() {
    console.log(JSON.stringify(this.patientInfoForm.value));
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
