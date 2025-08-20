export type Challenge = {
  id: string;
  name: string;
  description: string;
  amountDestination: number; // target amount
  deadline: string; // ISO string from <input type="datetime-local">
  count: number; // current progress
  createdAt: string; // ISO
};
