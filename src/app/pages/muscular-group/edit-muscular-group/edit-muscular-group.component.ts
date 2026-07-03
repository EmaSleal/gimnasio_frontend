import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { ImageService } from '../../../core/service/image/image.service';
import { ImageResponse } from '../../../core/models/image.interface';
import { compressImage } from '../../../utils/image-compression';
import baseUrl from '../../../core/service/helper';

@Component({
  selector: 'app-edit-muscular-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './edit-muscular-group.component.html',
  styleUrl: './edit-muscular-group.component.scss'
})
export class EditMuscularGroupComponent implements OnInit, OnDestroy {
  muscularGroupForm: FormGroup = new FormGroup({});

  images: ImageResponse[] = [];
  baseUrl = baseUrl;

  selectedImages: File[] = [];
  imagePreviews: { file: File; url: string }[] = [];
  isDraggingImages: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private muscularGroupService: MuscularGroupService,
    private imageService: ImageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    const muscularGroup: MuscularGroup = this.config.data.muscularGroup;
    this.muscularGroupForm = new FormGroup({
      id: new FormControl(muscularGroup.id),
      name: new FormControl(muscularGroup.name, Validators.required),
    });

    if (muscularGroup.id) {
      this.imageService.getImagesByMuscularGroup(muscularGroup.id).subscribe({
        next: (images) => {
          this.images = images;
        }
      });
    }
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

  removeExistingImage(image: ImageResponse): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.imageService.deleteImage(image.id!).subscribe({
          next: () => {
            this.images = this.images.filter((i) => i.id !== image.id);
          }
        });
      }
    });
  }

  submitForm() {
    if (this.muscularGroupForm.invalid) {
      return;
    }

    this.loading = true;
    const id = this.muscularGroupForm.value.id;
    this.muscularGroupService.updateMuscularGroup(id, this.muscularGroupForm.value).subscribe({
      next: () => {
        if (this.selectedImages.length > 0) {
          this.imageService.uploadImagesForMuscularGroup(id, this.selectedImages).subscribe({
            next: () => {
              this.loading = false;
              this.resetImages();
              Swal.fire({
                title: 'Grupo muscular actualizado!',
                text: 'Grupo muscular actualizado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.ref.close(true);
            },
            error: () => {
              this.loading = false;
              Swal.fire({
                title: 'Grupo muscular actualizado',
                text: 'Grupo muscular actualizado, pero las imágenes no se pudieron subir',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              });
              this.ref.close(true);
            }
          });
          return;
        }

        this.loading = false;
        Swal.fire({
          title: 'Grupo muscular actualizado!',
          text: 'Grupo muscular actualizado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.ref.close(true);
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Error al actualizar el grupo muscular',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  cerrarModal() {
    this.ref.close();
  }
}
