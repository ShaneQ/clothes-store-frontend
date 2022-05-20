import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from '../image.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Image } from '../model/image';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  providers: [ImageService],
})
export class ImageUploadComponent {
  @Output('image')
  imageEmitter = new EventEmitter<Image>();

  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;
  constructor(private uploadService: ImageService) {}
  downloadFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '_File_Saved_Path');
    link.setAttribute('download', 'file_name.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  change($event) {
    this.changeImage = true;
  }
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }
  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          var json = JSON.parse(event.body.toString());

          this.imageEmitter.emit(new Image(json.id, json.url));
        }
        this.selectedFiles = undefined;
      });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
