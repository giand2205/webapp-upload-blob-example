import { Component } from '@angular/core';
import { UploadService } from './service/upload.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'upload-file';
  fileName = "Seleccionar archivo";
  time: number = 0;
  response : String;
  display;
  interval;
  private fileSelected: File;
  private now: Date = new Date()

  constructor(private service: UploadService) { }

  public selectFile(event): void {
    this.fileSelected = event.target.files[0];

    if (this.fileSelected === undefined) {
      this.fileName = 'Seleccionar archivo';
    } else if (this.fileSelected.type.indexOf('image') < 0) {
      this.fileSelected = null;
    } else {
      console.info(this.fileSelected);
      this.fileName = this.fileSelected.name + ' (' + (this.fileSelected.size/1000000).toFixed(2) + 'mb)';
    }
  }

  public upload(): void {
    this.startTimer();
    this.service.uploadFile(this.fileSelected)
      .subscribe(response => {
        this.pauseTimer();
        this.response = response;
        console.log(response);
      }, err => {
        console.log(err.error);
      });
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.time++;
      } else {
        this.time++;
      }
      this.display = this.transform(this.time)
    }, 1000);
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
}
