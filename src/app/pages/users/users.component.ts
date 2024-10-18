import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Size } from 'src/app/enums/button.enum';
import { Group } from 'src/app/interfaces/Groups.interface';
import {
  User,
  UserResponse,
  UserSave,
} from 'src/app/interfaces/User.interface';
import { Button } from 'src/app/interfaces/button.interface';
import { GroupsService } from 'src/app/services/groups.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  @ViewChild('bodyBirthDate') bodyModalBirthDateTemplate!: TemplateRef<any>;
  @ViewChild('bodyContent') bodyModalTemplate!: TemplateRef<any>;
  @ViewChild('footerContent') footerModalTemplate!: TemplateRef<any>;

  users$: Observable<UserResponse[]> | undefined;
  groups$: Observable<Group[]> | undefined;
  title$: Observable<string> | undefined;

  dataButton: Button = {
    icon: 'users',
    label: 'Crear',
  };
  birthdateButton: Button = {
    icon: 'calendar',
    label: 'Cumpleaño semanal',
  };
  buttonSave: Button = {
    label: 'Guardar Usuario',
    size: Size.Medium,
  };
  buttonUpdate: Button = {
    label: 'Actualizar Usuario',
    size: Size.Medium,
  };
  users: User[] = [];
  userId?: string;
  displayedColumns: string[] = [
    'name',
    'firstLastName',
    'secondLastName',
    'birthDate',
    'actions',
  ];
  groups: Group[] = [];
  userForm!: FormGroup;
  isEdit: boolean = false;

  dialogRef?: MatDialogRef<ModalComponent, any>;

  constructor(
    private _sharedService: SharedService,
    private _usersService: UsersService,
    private _groupsService: GroupsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.form();
  }
  ngOnInit() {
    this.title$ = this._sharedService.menuObservable;
    this.loadUsers();
  }

  form() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      firstLastName: ['', [Validators.required, Validators.minLength(2)]],
      secondLastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      age: ['', []],
      birthDate: ['', [Validators.required]],
      married: [false, [Validators.required]],
      address: ['', [Validators.required]],
      idGroup: ['', [Validators.required]],
    });
  }
  convertStringToDate(dateString: string): Date {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
  }

  openModelBirthDate() {
    this.getBirthDate();
    const config = {
      titleModal: 'LISTA DE CUMPLEAÑEROS',
      templateBody: this.bodyModalBirthDateTemplate,
      templateFooter: null,
    };
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '480px',
      height: '500px',
      data: config,
    });
  }

  openModal(data?: UserResponse) {
    this.loadGroups();
    if (data) {
      this.userId = data.id;
      this.userForm.patchValue(data!);
      const newDate = this.userForm.get('birthDate')?.value;
      this.userForm
        .get('birthDate')
        ?.setValue(this.convertStringToDate(newDate));
    } else {
      this.userForm.reset();
      this.userForm.patchValue({ married: false });
    }

    const config = {
      titleModal: data?.id ? 'ACTUALIZAR USUARIO' : 'REGISTRAR NUEVO USUARIO',
      templateBody: this.bodyModalTemplate,
      templateFooter: this.footerModalTemplate,
    };
    console.log(config);
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '480px',
      height: '500px',
      data: config,
    });

    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('MODAL CERRADO');
    });
  }

  closeModal() {
    this.dialogRef!.close();
  }

  loadUsers() {
    this.users$ = this._usersService.getUsers().pipe(
      tap((users) => {
        this.users = users.map((user) => ({
          ...user,
          birthDate: this.convertTimestampToDateStr(user.birthDate),
        }));
      })
    );
  }

  loadGroups() {
    this.groups$ = this._groupsService.getGroups().pipe(
      tap((group) => {
        this.groups = { ...group };
        console.log(this.groups);
      })
    );
  }

  convertTimestampToDateStr(timestamp: Timestamp): string {
    const date: Date = timestamp.toDate();
    const day: string = date.getDate().toString().padStart(2, '0');
    const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
    const year: string = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  convertDateToTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date);
  }

  onSubmit() {
    this.userForm.value
    if (this.userForm.valid) {
      this.userForm.get('age')?.setValue(this.calculateAge(this.userForm.get('birthDate')?.value))
      !this.userId ? this.save() : this.update(this.userId);
    }
    this.userForm.markAllAsTouched();
  }

  save() {
    this._usersService
      .addUser(this.userForm.value)
      .then(() => {
        this.alertSucces('CREADO', 'Usuario creado correctamente');
        console.log('Usuario añadido con éxito');
        this.closeModal();
      })
      .catch((error) => {
        this.alertError('Error', 'No se creo el usuario');
        console.error('Error al añadir usuario:', error);
      });
  }

  alertSucces(titel: string, subTitle: string) {
    this.toastr.success(subTitle, titel);
  }

  alertError(titel: string, subTitle: string) {
    this.toastr.error(subTitle, titel);
  }

  update(idUser: string) {
    const newUser: UserSave = {
      ...this.userForm.value,
      id: idUser,
    };
    console.log('ACTUALIZAR USUARIO: ', newUser);
    this._usersService
      .updateUser(newUser)
      .then(() => {
        console.log('Usuario actualizado con éxito');
        this.closeModal();
        this.alertSucces('ACTUALIZADO', 'Usuario actualizado correctamente');
      })
      .catch((error) => {
        this.alertError('ERROR', 'Error al actualizar usuario');
        console.error('Error al actualizar usuario:', error);
      });
  }

  delete(data?: UserResponse) {
    this._usersService
      .deleteUser(data!)
      .then(() => {
        this.alertSucces('ELIMINADO', 'Usuario eliminado correctamente');
        console.log('Usuario eliminado con éxito');
      })
      .catch((error) => {
        this.alertError('ERROR', 'Error al eliminar usuario');
        console.error('Error al eliminar usuario:', error);
      });
  }

  userList: User[] = [];
  getBirthDate() {
    this._usersService.getBirthdaysForThisWeek().subscribe((users) => {
      this.userList = users.map((user) => ({
        ...user,
        birthDate: this.convertTimestampToDateStr(user.birthDate),
      }));
    });
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }
}
