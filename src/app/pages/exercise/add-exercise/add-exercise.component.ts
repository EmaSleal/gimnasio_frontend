import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Workout } from '../../../core/models/workout.interface';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioInputComponent } from '../../../utils/formulario-input/formulario-input.component';
import { CardComponent } from '../../../utils/card/card.component';
import Swal from 'sweetalert2';
import { MuscularLoad } from '../../../core/models/muscular-load.enum';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { ImageService } from '../../../core/service/image/image.service';
import { compressImage } from '../../../utils/image-compression';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [CommonModule, CardComponent, FormsModule, ListboxModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss'
})
export class AddExerciseComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private exerciseService: WorkoutService,
    private muscularGroupService: MuscularGroupService,
    private imageService: ImageService
  ) {}

  ngOnDestroy(): void {
    this.imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
  }

  ngOnChanges(): void {
    this.fields.map((field) => {
      if (field.id === 'muscularGroup') {
        field.options = this.muscularGroups;
      }
    });
  }

  ngOnInit(): void {
    this.muscularGroupService.getMuscularGroups().subscribe({
      next: (muscularGroups) => {
        this.muscularGroups = muscularGroups;
      }
    });
  }

  form: FormGroup = new FormGroup({});

  @ViewChild(FormularioInputComponent, { static: false })
  formularioInput!: FormularioInputComponent;

  enviarFormularios: boolean = false;
  resetearformularios: boolean = false;

  muscularGroups: any[] = [];
  camposPorEstado: any[] = [];
  loading: boolean = false;
  muscularLoadOptions: { value: MuscularLoad; label: string; description: string }[] = [
    { value: MuscularLoad.LOW, label: 'Baja', description: 'Ideal para calentamiento o recuperación activa.' },
    { value: MuscularLoad.MEDIUM, label: 'Media', description: 'Carga de trabajo estándar para la mayoría de las rutinas.' },
    { value: MuscularLoad.HIGH, label: 'Alta', description: 'Mayor esfuerzo — requiere más tiempo de recuperación.' },
  ];
  workout: Workout = {
    muscularGroup: {}
  };

  selectedImages: File[] = [];
  imagePreviews: { file: File; url: string }[] = [];
  isDraggingImages: boolean = false;

  get isFormValid(): boolean {
    return !!this.workout.name?.trim() && !!this.workout.muscularGroup?.id && !!this.workout.muscularLoad;
  }

  fields: any[] = [
    {
      id: 'name',
      name: 'name',
      label: 'Nombre',
      defaultValue: '',
      required: true,
      placeholder: 'Ingrese el nombre del ejercicio',
      type: 'text',
    },
    {
      id: 'muscularGroup',
      name: 'muscularGroup',
      label: 'Grupo Muscular',
      defaultValue: '',
      required: true,
      placeholder: 'Ingrese el grupo muscular',
      type: 'select',
      options: [],
    },
    {
      id: 'muscularLoad',
      name: 'muscularLoad',
      label: 'Carga Muscular',
      defaultValue: undefined,
      required: true,
      type: 'radio-button',
      options: [MuscularLoad.LOW, MuscularLoad.MEDIUM, MuscularLoad.HIGH],
    },
  ];

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

  formSubmit(data: any) {
    const payload: any = {
      name: data.name,
      muscularGroupId: data.muscularGroup?.id,
      muscularLoad: data.muscularLoad,
    };
    Object.keys(payload).forEach((key) => {
      if (payload[key] === undefined || payload[key] === null) {
        delete payload[key];
      }
    });
    this.loading = true;
    this.exerciseService.saveWorkout(payload).subscribe({
      next: (createdWorkout) => {
        if (this.selectedImages.length > 0 && createdWorkout?.id) {
          this.imageService.uploadImages(createdWorkout.id, this.selectedImages).subscribe({
            next: () => {
              this.loading = false;
              this.resetImages();
              Swal.fire({
                title: 'Ejercicio guardado!',
                text: 'Ejercicio guardado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            },
            error: () => {
              this.loading = false;
              this.resetImages();
              Swal.fire({
                title: 'Ejercicio guardado',
                text: 'Ejercicio guardado, pero las imágenes no se pudieron subir',
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
          title: 'Ejercicio guardado!',
          text: 'Ejercicio guardado con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          title: 'Error!',
          text: 'Error al guardar el ejercicio',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  formReset(data: any) {
    // Handle form reset
  }
}
