import {
  Component,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { Observable, map, pipe, take, tap } from 'rxjs';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Size } from 'src/app/enums/button.enum';
import {
  User,
  UserResponse,
  UserSave,
} from 'src/app/interfaces/User.interface';
import { Button } from 'src/app/interfaces/button.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @ViewChild('modalUser') modal!: ModalComponent;

  users$: Observable<UserResponse[]> | undefined;
  dataButton: Button = {
    icon: 'users',
    label: 'Crear',
  };
  buttonSave: Button = {
    label: 'Guardar Usuario',
    size: Size.Medium,
  };
  users: User[] = [];
  displayedColumns: string[] = [
    'name',
    'firstLastName',
    'secondLastName',
    'birthDate',
  ];

  userForm!: FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.form();
  }
  ngOnInit() {
    this.loadUsers();
  }

  form() {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      firstLastName: ['', [Validators.required, Validators.minLength(2)]],
      secondLastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.email]],
      age: ['', [Validators.required]],
      married: [false, [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  openModal() {
    this.modal.show(); // Ahora abre el modal llamando al método `open`
  }

  closeModal() {
    this.modal.hide();
  }

  loadUsers() {
    this.users$ = this.usersService.getUsers().pipe(
      tap((users) => {
        console.log('FIREBASE USERS=====>', this.users);
        this.users = users.map((user) => ({
          ...user,
          birthDate: this.convertTimestampToDateStr(user.birthDate),
        }));
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
    if (this.userForm.valid) {
      console.log('Form Data: ', this.userForm.value);
      const newUser: UserSave = {
        ...this.userForm.value,
        birthDate: this.convertDateToTimestamp(new Date()),
      };

      this.usersService
        .postUser(newUser)
        .then(() => {
          console.log('Usuario añadido con éxito');
          this.closeModal();
        })
        .catch((error) => {
          console.error('Error al añadir usuario:', error);
        });
    } else {
      this.userForm.markAllAsTouched();
      console.log('Form is not valid');
    }
  }
}
