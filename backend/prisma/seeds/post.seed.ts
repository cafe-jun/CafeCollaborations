import { Post, PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export const TempUser: User = {
  id: 1,
  email: 'test@test.com',
  name: 'test',
  provider: 'GOOGLE',
  role: 'GUEST',
  createdAt: new Date(),
};

export const TempPosts = [
  {
    title: '[PM 모집] 사이드 프로젝트<🤟, 자...?>의 PM을 모집합니다!',
    content: 'PM Test',
    status: 'DRAFT',
    category: 'Category',
    userId: 1,
  },
  {
    title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    title: '영어학습앱-PM, UX UI기획 모집',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    title: '앱 모 앱 프로젝트 디자이너 모집',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    title: '영어학습앱-PM, UX UI기획 모집',
    category: 'PM',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    title: '앱 모 앱 프로젝트 디자이너 모집',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
];
async function main() {
  await prisma.user.create({ data: TempUser });

  await prisma.post.createMany({
    data: [
      {
        title: '[PM 모집] 사이드 프로젝트<🤟, 자...?>의 PM을 모집합니다!',
        content: 'PM Test',
        status: 'DRAFT',
        category: 'Category',
        userId: 1,
      },
      {
        title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        title: '영어학습앱-PM, UX UI기획 모집',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        title: '앱 모 앱 프로젝트 디자이너 모집',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        title: '영어학습앱-PM, UX UI기획 모집',
        category: 'PM',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        title: '앱 모 앱 프로젝트 디자이너 모집',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
    ],
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
