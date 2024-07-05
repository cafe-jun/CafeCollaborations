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
export type User = {
    id: Generated<number>;
    email: string;
    name: string;
    provider: OauthProvider | null;
    createdAt: Generated<Timestamp>;
};
export type DB = {
    User: User;
};
