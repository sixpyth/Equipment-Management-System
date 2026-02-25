export type Id = number | string;

export type UserStatus = "ACTIVE" | "FIRED";
export type EquipmentStatus = "AVAILABLE" | "GIVEN" | "BROKEN" | "REPAIR";

export type User = {
  id: Id;
  name: string;
  surname: string;
  patronymic?: string;
  full_name?: string;
  status: UserStatus;
  department?: string;
  created_at?: string;
};

export type Equipment = {
  id: Id;
  name: string;
  inventory_number: string;
  type?: string;
  status: EquipmentStatus;
  description?: string;
};

export type IssueStatus = "DRAFT" | "PENDING_CONFIRM" | "ACTIVE" | "CLOSED" | "OVERDUE";

export type EquipmentIssue = {
  id: Id;
  full_user_name: string;          
  user_id?: Id;
  equipment_id?: Id;
  equipment?: Equipment;
  status: IssueStatus;
  confirmed: boolean;              
  created_at?: string;
  due_at?: string;
  notes?: string;
};

export type DashboardStats = {
  my_requests: number;
  active: number;
  overdue: number;
  awaiting_action: number;
  equipment_available: number;
  equipment_total: number;
  today_requests: number;
};