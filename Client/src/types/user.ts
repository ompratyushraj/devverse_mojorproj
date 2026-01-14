export interface IUser {
  name: string;
  email: string;
  password?: string;
  file?:File;
}


export interface LoadUserBody{
  name:string;
  email:string;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}
   

export interface docsStructure{
  title:string;
  description:string;
  documentArray:File[];
}

export interface File{
  public_id:string;
  url:string
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface UserReducerInitialState {
  user: IUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  error:string | null;
  message:string | null;
}

export interface Course {
  _id:string;
  title:string;
  description:string;
  file:File | string;
  // pdfs:docsStructure[]



}



export interface oneCourse{
  title:string;
  description:string;
  author?:string;
  _id:string;
  file:File;
  NumberOfDownloads?:number;
  category?:string;
  pdfs:docsStructure[]
}
export interface CourseStructure{
  course:Course[] |null;
  loading:boolean;
  error:string | null;
  specificCourse:oneCourse  | null;
}

   export interface CardsProps {
    title: string;
    description: string;
    id: string;
    file: string;
  }
