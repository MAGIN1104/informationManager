import { Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, tap } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Size } from 'src/app/enums/button.enum';
import { CardOptionEnum } from 'src/app/enums/card.enum';
import { Button } from 'src/app/interfaces/button.interface';
import { CardInterface } from 'src/app/interfaces/Card.interface';
import { Group } from 'src/app/interfaces/Groups.interface';
import { UserResponse } from 'src/app/interfaces/User.interface';
import { GroupsService } from 'src/app/services/groups.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss',
})
export class GroupsComponent implements OnDestroy {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  @ViewChild('bodyContent') bodyModalTemplate!: TemplateRef<any>;
  @ViewChild('bodyContentUser') bodyModalUsers!: TemplateRef<any>;
  @ViewChild('footerContent') footerModalTemplate!: TemplateRef<any>;

  dialogRef?: MatDialogRef<ModalComponent, any>;

  groups$: Observable<any[]> | undefined;
  users$: Observable<UserResponse[]> | undefined;
  title$: Observable<string> | undefined;
  groupsSubs$!: Subscription;
  formGroup!: FormGroup;

  indexList: any[] = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
    { id: 6, value: 6 },
    { id: 7, value: 7 },
    { id: 8, value: 8 },
    { id: 9, value: 9 },
    { id: 10, value: 10 },
  ];

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
  idGroup?: string;

  constructor(
    private _sharedService: SharedService,
    private _groupsService: GroupsService,
    private _userService: UsersService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.form();
  }
  ngOnDestroy(): void {}

  ngOnInit() {
    this.title$ = this._sharedService.menuObservable;
    this.loadGroups();
  }

  form() {
    this.formGroup = this._fb.group({
      idGroup: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  loadLastGroup() {
    this.groupsSubs$ = this._groupsService.getLastGroup().subscribe((group) => {
      if (!group) {
        this.formGroup.get('title')?.setValue('CELULA 1');
        this.formGroup.get('idGroup')?.setValue(1);
      } else {
        console.warn(group);
        this.formGroup.setValue({
          title: `CELULA ${parseInt(group.idGroup!.toString()) + 1}`,
          idGroup: parseInt(group.idGroup!.toString()) + 1,
          description: '',
        });
      }
    });
  }

  loadGroups() {
    this.groups$ = this._groupsService.getGroups().pipe(
      tap((groups) => {
        console.log('GRUPOS', groups);
      })
    );
  }

  loadUsers(idGroup: number) {
    this.users$ = this._userService.getUsersByGroup(idGroup);
  }

  openModal(data: Group | null) {
    if (data) {
      this.idGroup = data!.id;
      this.formGroup.patchValue(data!);
    } else {
      this.loadLastGroup();
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
      this.groupsSubs$.unsubscribe();
      this.idGroup = undefined;
    });
  }

  openModalUser(data: CardInterface) {
    this.loadUsers(data.idGroup!);
    const config = {
      titleModal: `INTEGRANTES "${data.title}"`,
      templateBody: this.bodyModalUsers,
    };
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '480px',
      height: '400px',
      data: config,
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      console.log('Form is not valid');
    }
    !this.isEdit ? this.save() : this.update(this.idGroup!);
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

  update(id: string) {
    console.log('UPDATE');
    const group = {
      ...this.formGroup.value,
      id,
    };
    this._groupsService
      .updateUser(group)
      .then(() => {
        this.alertSucces('ACTUALIZADO', 'Grupo actualizado correctamente');
        console.log('Se actualizo con éxito');
        this.closeModal();
      })
      .catch((error) => {
        this.alertError('Error', 'No se actualizo el Grupo');
        console.error('Error al actualizar Grupo:', error);
      });
  }

  alertSucces(titel: string, subTitle: string) {
    this.toastr.success(subTitle, titel);
  }
  alertError(titel: string, subTitle: string) {
    this.toastr.error(subTitle, titel);
  }
  closeModal() {
    this.dialogRef!.close();
  }
  action(action: CardInterface) {
    console.log('action:', action);
    switch (action!.option) {
      case CardOptionEnum.Edit:
        this.isEdit = true;
        this.openModal(action);
        break;
      case CardOptionEnum.Delete:
        break;
      case CardOptionEnum.User:
        this.openModalUser(action);
        break;
      default:
        break;
    }
    console.log(action);
  }

  valueSelect(value: any) {
    console.log('SELECT', value);
  }
}
