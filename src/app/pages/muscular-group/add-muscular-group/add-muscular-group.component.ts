import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { ImageService } from '../../../core/service/image/image.service';
import { compressImage } from '../../../utils/image-compression';

@Component({
  selector: 'app-add-muscular-group',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './add-muscular-group.component.html',
  styleUrl: './add-muscular-group.component.scss'
})
export class AddMuscularGroupComponent implements OnInit, OnDestroy {

  muscularGroupForm: FormGroup = new FormGroup({});

  selectedImages: File[] = [];
  imagePreviews: { file: File; url: string }[] = [];
  isDraggingImages: boolean = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private muscularGroupService: MuscularGroupService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.muscularGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }

  async onImagesSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      await this.addFiles(input.files);
    }
    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingImages = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingImages = false;
  }

  async onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();
    this.isDraggingImages = false;
    if (event.dataTransfer?.files) {
      await this.addFiles(event.dataTransfer.files);
    }
  }

  private async addFiles(files: FileList): Promise<void> {
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        continue;
      }
      const compressedFile = await compressImage(file);
      this.selectedImages.push(compressedFile);
      this.imagePreviews.push({ file: compressedFile, url: URL.createObjectURL(compressedFile) });
    }
  }

  removeImage(index: number): void {
    URL.revokeObjectURL(this.imagePreviews[index].url);
    this.imagePreviews.splice(index, 1);
    this.selectedImages.splice(index, 1);
  }

  private resetImages(): void {
    this.imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    this.imagePreviews = [];
    this.selectedImages = [];
  }

  submitForm() {
    if (this.muscularGroupForm.invalid) {
      return;
    }
    this.loading = true;
    this.muscularGroupService.saveMuscularGroup(this.muscularGroupForm.value).subscribe({
      next: (createdMuscularGroup) => {
        if (this.selectedImages.length > 0 && createdMuscularGroup?.id) {
          this.imageService.uploadImagesForMuscularGroup(createdMuscularGroup.id, this.selectedImages).subscribe({
            next: () => {
              this.loading = false;
              this.resetImages();
              Swal.fire({
                title: 'Grupo muscular guardado!',
                text: 'Grupo muscular guardado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            },
            error: () => {
              this.loading = false;
              this.resetImages();
              Swal.fire({
                title: 'Grupo muscular guardado',
                text: 'Grupo muscular guardado, pero las imágenes no se pudieron subir',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              });
            }
          });
          return;
        }

        this.loading = false;
        this.resetImages();
        Swal.fire({
          title: 'Grupo muscular guardado!',
          text: 'Grupo muscular guardado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el grupo muscular',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
