import { Observable } from 'rxjs';

export interface Visit {
  id: number;
  patient_id: number;
  visit_date: string;
  create_date: string;
  update_date: string;
}

export interface IdRes {
  id: number;
}

export interface CreateVisitDto {
  patient_id: number;
  visit_date: string;
}

export interface UpdateVisitDto {
  id: number;
  patient_id: number;
  visit_date: string;
}

export interface VisitList {
  visits: Visit[];
}

export interface Empty {}

export interface VisitServiceGrpc {
  CreateVisit(data: CreateVisitDto): Observable<Visit>;
  GetVisit(data: IdRes): Observable<Visit>;
  ListVisits(data: Empty): Observable<VisitList>;
  RemoveVisit(data: IdRes): Observable<Empty>;
}
