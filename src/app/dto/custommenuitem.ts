import { MenuItem } from 'primeng/api';

export interface CustomMenuItem extends MenuItem {
  admin?: boolean; // or any other custom fields
  menu?:string;
}