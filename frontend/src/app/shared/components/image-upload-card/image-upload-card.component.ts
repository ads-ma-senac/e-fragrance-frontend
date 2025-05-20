// image-upload-card.component.ts
import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-image-upload-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-upload-card.component.html',
  styleUrls: ['./image-upload-card.component.css']
})
export class ImageUploadCardComponent implements OnInit, OnChanges {

  @Input() imageSource?: File | string | null = null;
  @Output() imageChange = new EventEmitter<File | null>();

  isDragging: boolean = false;
  image: string | null = null;

  ngOnInit(): void {
    this.loadImage(this.imageSource);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageSource'] && changes['imageSource'].currentValue) {
      this.loadImage(changes['imageSource'].currentValue);
    }
  }

  loadImage(source: File | string | null | undefined): void {
    if (!source) {
      this.image = null;
      return;
    }

    if (typeof source === 'string') {
      this.image = source.startsWith('data:image')
        ? source
        : `http://localhost:3000${source}`;

    } else if (source instanceof File && source.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = reader.result as string;
        this.imageChange.emit(source);
      };
      reader.readAsDataURL(source);
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  handleDragLeave(): void {
    this.isDragging = false;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;

    const files = event.dataTransfer?.files;
    if (files && files.length) {
      this.processFile(files[0]);
    }
  }

  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  processFile(file: File): void {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.image = reader.result as string;
      this.imageChange.emit(file);
    };
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.image = null;
    this.imageChange.emit(null);
  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
