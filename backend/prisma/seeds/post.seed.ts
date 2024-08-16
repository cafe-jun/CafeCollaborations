import { Post, PostStatus, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export const TempUser: Omit<User, 'id'> = {
  email: 'test@test.com',
  name: 'test',
  provider: 'GOOGLE',
  role: 'GUEST',
  createdAt: new Date(),
};

export const TempPosts: Omit<Post, 'id'>[] = [
  {
    title: '[PM 모집] 사이드 프로젝트<🤟, 자...?>의 PM을 모집합니다!',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    createdAt: new Date(),
    imageId: 1,
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
  {
    title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    imageId: 1,
    createdAt: new Date(),
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
  {
    title: '영어학습앱-PM, UX UI기획 모집',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    imageId: 1,
    createdAt: new Date(),
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
  {
    title: '앱 모 앱 프로젝트 디자이너 모집',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    createdAt: new Date(),
    imageId: 1,
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
  {
    title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    createdAt: new Date(),
    imageId: 1,
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
  {
    title: '영어학습앱-PM, UX UI기획 모집',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    createdAt: new Date(),
    imageId: 1,
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
  {
    title: '앱 모 앱 프로젝트 디자이너 모집',
    content: 'PM Test',
    status: PostStatus.PUBLISHED,
    category: 'CA1000',
    duration: 'DU1000',
    recruitMembers: 'RM1000',
    region: 'RE1000',
    userId: 1,
    createdAt: new Date(),
    imageId: 1,
    editedAt: new Date(),
    publishedAt: new Date(),
    removedAt: null,
    updatedAt: null,
  },
];
async function main() {
  await prisma.user.create({ data: TempUser });

  await prisma.post.createMany({
    data: [...TempPosts],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
