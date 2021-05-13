export interface Note {
  id: string;
  name: string;
  category: string; // esto sera igual que el label_name de las label
  description: string;
  creation_date?: string;
}
