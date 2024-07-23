import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export const OauthProvider = {
    KAKAO: "KAKAO",
    GOOGLE: "GOOGLE",
    NAVER: "NAVER"
} as const;
export type OauthProvider = (typeof OauthProvider)[keyof typeof OauthProvider];
export const UserRole = {
    ADMIN: "ADMIN",
    AUTHOR: "AUTHOR",
    GUEST: "GUEST"
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export const PostStatus = {
    DRAFT: "DRAFT",
    PUBLISHED: "PUBLISHED"
} as const;
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
export type Post = {
    id: Generated<number>;
    title: string;
    imageId: number;
    content: string;
    status: PostStatus;
    createdAt: Generated<Timestamp>;
    editedAt: Timestamp;
    removedAt: Timestamp;
    userId: number;
};
export type User = {
    id: Generated<number>;
    email: string;
    name: string;
    provider: OauthProvider | null;
    createdAt: Generated<Timestamp>;
    role: UserRole;
};
export type DB = {
    Post: Post;
    User: User;
};
