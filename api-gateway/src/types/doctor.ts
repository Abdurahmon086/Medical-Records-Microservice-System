import { Observable } from 'rxjs';

export interface Doctor {
  id: number;
  name: string;
  email: string;
  create_date: string;
  update_date: string;
}

export interface IdRes {
  id: number;
}

export interface UpdateDoctorRes {
  id: number;
  data: {
    name: string;
    email: string;
  };
}

export interface DoctorList {
  doctors: Doctor[];
}

export interface Empty {}

export interface DoctorServiceGrpc {
  CreateDoctor(data: { name: string; email: string }): Observable<Doctor>;
  GetDoctor(data: IdRes): Observable<Doctor>;
  ListDoctors(data: Empty): Observable<DoctorList>;
  UpdateDoctor(data: UpdateDoctorRes): Observable<Doctor>;
  RemoveDoctor(data: IdRes): Observable<Empty>;
}
