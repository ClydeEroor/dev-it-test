export type LoginProp = {
  email: string;
  password: string;
};

export enum Role {
  USER,
  ADMIN,
}

export type Article = {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  content: string;
  videoLink: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  email: string;
  createdAt?: Date;
  roles: [Role.USER];
};
