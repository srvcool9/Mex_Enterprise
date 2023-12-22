import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/patient.model';
import { Patientrepository } from 'src/app/repositories/patientrepository';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements AfterViewInit, OnInit {
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  activeButton: string;
  private canvasElement: any;
  private context: any;
  private video: any;
  imageBase64: string;
  patientInfoForm: FormGroup;
  mediaRecorder: MediaRecorder;
  recordedChunks: Blob[] = [];
  recoredVideoBlob: Blob;
  capturedImageBlob: Blob;

  constructor(private fb: FormBuilder,
    private patientRepo: Patientrepository,
    private router: Router,
    private dataSharing:DataSharingService) { }

  ngOnInit() {
    this.createForm();
    this.dataSharing.setActiveButton('camera');
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
    this.canvasElement.width = this.video.videoWidth;
    this.canvasElement.height = this.video.videoHeight;
    this.context.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const capturedImage = this.canvasElement.toDataURL('image/png');

    this.canvasElement.toBlob(async (blob) => {
      if (blob) {
        this.capturedImageBlob = blob;
        this.imageBase64 = await this.convertBlobToBase64(blob)
      }
    }, 'image/png');


    // Optionally, you can create an <img> element to display the captured image or send it to a server
    // const imgElement = document.createElement('img');
    // imgElement.src = capturedImage;
    // document.body.appendChild(imgElement);
  }

  downloadBlob(blob: Blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'captured_image.png';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  startRecording() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };
        this.mediaRecorder.start();
      })
      .catch((error) => {
        console.error('Error accessing the camera: ', error);
      });
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.recoredVideoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'recorded-video.webm';
      //a.click();
      // URL.revokeObjectURL(url);
      this.recordedChunks = [];
    }
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    })
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

  async submitPatientForm() {
    //console.log(JSON.stringify(this.patientInfoForm.value));
    let patient: Patient = new Patient();
    patient.firstName = this.patientInfoForm.controls['firstName'].value;
    patient.lastName = this.patientInfoForm.controls['lastName'].value;
    patient.gender = this.patientInfoForm.controls['gender'].value;
    patient.dateOfBirth = this.patientInfoForm.controls['dateOfBirth'].value;
    patient.mobileNo = this.patientInfoForm.controls['mobile'].value;
    patient.address = this.patientInfoForm.controls['address'].value;
    patient.Image = this.imageBase64;
    console.log("Pateint Data submitted: ", JSON.stringify(patient));
    this.patientRepo.addPatient(patient);
  }


  base64ToBlob(base64String: string, mimeType: string): Blob {
    // Remove the data url prefix (e.g., "data:image/jpeg;base64,")
    const base64WithoutPrefix = base64String.split(',')[1];

    // Convert Base64 string to a Uint8Array
    const byteCharacters = atob(base64WithoutPrefix);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create Blob from Uint8Array
    return new Blob([byteArray], { type: mimeType });
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
