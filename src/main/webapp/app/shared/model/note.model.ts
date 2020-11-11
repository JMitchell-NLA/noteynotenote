import { IUser } from 'app/shared/model/user.model';
import { ITag } from 'app/shared/model/tag.model';

export interface INote {
  id?: number;
  content?: string;
  title?: string;
  xpos?: number;
  ypos?: number;
  assignedTo?: IUser;
  tags?: ITag[];
}

export const defaultValue: Readonly<INote> = {};
