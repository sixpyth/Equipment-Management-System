import { api } from "./axios";
import type { DashboardStats, Equipment, EquipmentIssue, User, Id } from "./types";


export async function getDashboardStats(): Promise<DashboardStats> {
 
  const { data } = await api.get("/api/v1/dashboard/stats");
  return data;
}


export async function listUsers(): Promise<User[]> {
  const { data } = await api.get("/api/v1/user/list");
  return data;
}

export async function createUser(payload: Partial<User>): Promise<User> {
  const { data } = await api.post("/api/v1/user/create", payload);
  return data;
}

export async function terminateUser(full_name: string): Promise<{ detail?: string } | string> {
  const { data } = await api.patch("/api/v1/user/terminate", null, {
    params: { full_name }
  });
  return data;
}


export async function listEquipment(): Promise<Equipment[]> {
  const { data } = await api.get("/api/v1/equipment/list");
  return data;
}

export async function createEquipment(payload: Partial<Equipment>): Promise<Equipment> {
  const { data } = await api.post("/api/v1/equipment/create", payload);
  return data;
}

export async function updateEquipment(id: Id, payload: Partial<Equipment>): Promise<Equipment> {
  const { data } = await api.patch(`/api/v1/equipment/${id}`, payload);
  return data;
}

export async function listIssues(): Promise<EquipmentIssue[]> {
  const { data } = await api.get("/api/v1/issue/list");
  return data;
}

export async function createIssue(payload: Partial<EquipmentIssue>): Promise<EquipmentIssue> {
  
  const { data } = await api.post("/api/v1/issue/create", payload);
  return data;
}

export async function confirmIssue(issue_id: Id): Promise<EquipmentIssue> {
  
  const { data } = await api.patch("/api/v1/issue/confirm", null, {
    params: { issue_id }
  });
  return data;
}

export async function closeIssue(issue_id: Id): Promise<EquipmentIssue> {
  const { data } = await api.patch("/api/v1/issue/close", null, {
    params: { issue_id }
  });
  return data;
}


export async function listRfidCards(): Promise<any[]> {
  const { data } = await api.get("/api/v1/rfid/list");
  return data;
}

export async function assignRfidToUser(card_id: Id, user_id: Id): Promise<any> {
  const { data } = await api.post("/api/v1/rfid/assign", { card_id, user_id });
  return data;
}