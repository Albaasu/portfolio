export type Post = {
  comments: Comment[];
  id: string;
  detail: string;
  avatar: string;
  imageUrl: string;
  likes: string[];
  uid: string;
  userName: string;
  timestamp: any;
  commentRef:string[]
};


export type repComment = {
  avatar: string | undefined;
  userName: any;
  likes: any;
  detail: string;
  timestamp: any;
  id: string;
  uid: string;
  commentRef:string[]
}
