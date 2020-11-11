import { IUser } from 'app/shared/model/user.model';
import { INote } from 'app/shared/model/note.model';

export interface ITag {
  id?: number;
  name?: string;
  assignedTo?: IUser;
  notes?: INote[];
}

export const defaultValue: Readonly<ITag> = {};
