import { Observable } from 'rxjs';

export interface Patient {
  id: number;
  name: string;
  dob: string;
  doctor_id: number;
  create_date: string;
  update_date: string;
}

export interface IdRes {
  id: number;
}

export interface CreatePatientDto {
  name: string;
  dob: string;
  doctor_id: number;
}

export interface PatientList {
  patients: Patient[];
}

export interface Empty {}

export interface PatientServiceGrpc {
  CreatePatient(data: {
    name: string;
    dob: string;
    doctor_id: number;
  }): Observable<Patient>;
  GetPatient(data: IdRes): Observable<Patient>;
  ListPatients(data: Empty): Observable<PatientList>;
  RemovePatient(data: IdRes): Observable<Empty>;
}
