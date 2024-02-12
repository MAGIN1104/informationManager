import { Timestamp } from 'firebase/firestore';

export interface UserResponse {
  id: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  age: string;
  birthDate: Timestamp;
  married: boolean;
  address: string;
}


export interface User {
  id: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  age: string;
  birthDate: string;
  married: boolean;
  address: string;
}

export interface UserSave{
  name: string;
  firstLastName: string;
  secondLastName: string;
  age: string;
  birthDate: Timestamp;
  married: boolean;
  address: string;
}
