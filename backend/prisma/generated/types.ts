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
export const Category = {
    CA1000: "CA1000",
    CA1001: "CA1001",
    CA1002: "CA1002",
    CA1003: "CA1003",
    CA1004: "CA1004",
    CA1005: "CA1005",
    CA1006: "CA1006"
} as const;
export type Category = (typeof Category)[keyof typeof Category];
export const RecruitMember = {
    RM1000: "RM1000",
    RM1002: "RM1002",
    RM1003: "RM1003",
    RM1004: "RM1004"
} as const;
export type RecruitMember = (typeof RecruitMember)[keyof typeof RecruitMember];
export const DurationType = {
    DU1000: "DU1000",
    DU1002: "DU1002",
    DU1003: "DU1003",
    DU1004: "DU1004"
} as const;
export type DurationType = (typeof DurationType)[keyof typeof DurationType];
export const Region = {
    RE1000: "RE1000",
    RE1002: "RE1002",
    RE1003: "RE1003",
    RE1004: "RE1004",
    RE1005: "RE1005",
    RE1006: "RE1006",
    RE1007: "RE1007",
    RE1008: "RE1008",
    RE1009: "RE1009"
} as const;
export type Region = (typeof Region)[keyof typeof Region];
export type Post = {
    id: Generated<number>;
    title: string;
    category: Category;
    image_id: number | null;
    content: string;
    status: PostStatus;
    region: Region | null;
    recruit_members: RecruitMember | null;
    duration_type: DurationType | null;
    created_at: Generated<Timestamp | null>;
    updated_at: Generated<Timestamp | null>;
    edited_at: Timestamp | null;
    removed_at: Timestamp | null;
    published_at: Timestamp | null;
    user_id: number;
};
export type PostTag = {
    id: Generated<number>;
    post_id: number;
    tag_id: number;
};
export type Tag = {
    id: Generated<number>;
    name: string;
    post_tag_id: number;
};
export type User = {
    id: Generated<number>;
    email: string;
    name: string;
    provider: OauthProvider | null;
    created_at: Generated<Timestamp>;
    role: UserRole;
};
export type DB = {
    post_tags: PostTag;
    posts: Post;
    tags: Tag;
    users: User;
};
