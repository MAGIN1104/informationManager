import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Size } from 'src/app/enums/button.enum';
import { Button } from 'src/app/interfaces/button.interface';
import { Group } from 'src/app/interfaces/Groups.interface';
import { GroupsService } from 'src/app/services/groups.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  @ViewChild('bodyContent') bodyModalTemplate!: TemplateRef<any>;
  @ViewChild('footerContent') footerModalTemplate!: TemplateRef<any>;

  dialogRef?: MatDialogRef<ModalComponent, any>;

  groups$: Observable<any[]> | undefined;
  users$: Observable<Group[]> | undefined;
  title$: Observable<string> | undefined;

  formGroup!: FormGroup;

  dataButton: Button = {
    icon: 'groups',
    label: 'Crear',
  };

  buttonSave: Button = {
    label: 'Guardar grupo',
    size: Size.Medium,
  };
  buttonUpdate: Button = {
    label: 'Actualizar grupo',
    size: Size.Medium,
  };

  groups: any[] = [];

  isEdit: boolean = false;
  groupId?: string;

  constructor(
    private _sharedService: SharedService,
    private _groupsService: GroupsService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.form();
  }

  ngOnInit() {
    this.title$ = this._sharedService.menuObservable;
    this.loadGroups();
  }

  form() {
    this.formGroup = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadGroups() {
    this.groups$ = this._groupsService.getGroups().pipe(
      tap((groups) => {
        console.log(groups);
      })
    );
  }

  openModal(data?: Group) {
    if (data) {
      this.groupId = data.id;
      this.formGroup.patchValue(data!);
    } else {
      this.formGroup.reset();
    }

    const config = {
      titleModal: data?.id ? 'ACTUALIZAR GRUPO' : 'REGISTRAR NUEVO GRUPO',
      templateBody: this.bodyModalTemplate,
      templateFooter: this.footerModalTemplate,
    };
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '480px',
      height: '330px',
      data: config,
    });

    this.dialogRef.afterClosed().subscribe((_) => {
      console.log('MODAL CERRADO');
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log('Form is not valid');
    }
    !this.groupId ? this.save() : this.update(this.groupId);
  }

  save() {
    this._groupsService
      .createGroup(this.formGroup.value)
      .then(() => {
        this.alertSucces('CREADO', 'Grupo creado correctamente');
        console.log('Grupo añadido con éxito');
        this.closeModal();
      })
      .catch((error) => {
        this.alertError('Error', 'No se creo el Grupo');
        console.error('Error al añadir Grupo:', error);
      });
  }
  update(id: string) {}

  alertSucces(titel: string, subTitle: string) {
    this.toastr.success(subTitle, titel);
  }
  alertError(titel: string, subTitle: string) {
    this.toastr.error(subTitle, titel);
  }
  closeModal() {
    this.dialogRef!.close();
  }
}
