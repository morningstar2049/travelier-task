export interface IDeal {
  id: number;
  client: string;
  name: string;
  status: "Active" | "Pending" | "Completed" | "Cancelled";
  startDate: string; // ISO string
  endDate: string; // ISO string
}
