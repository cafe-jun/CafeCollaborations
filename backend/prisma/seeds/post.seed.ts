import { Post, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const dumyPosts = [
  {
    id: 2,
    title: '[PM 모집] 사이드 프로젝트<🤟, 자...?>의 PM을 모집합니다!',
    content: 'PM Test',
    status: 'DRAFT',
    category: 'Category',
    userId: 1,
  },
  {
    id: 3,
    title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    id: 4,
    title: '영어학습앱-PM, UX UI기획 모집',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    id: 5,
    title: '앱 모 앱 프로젝트 디자이너 모집',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    id: 6,
    title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    id: 7,
    title: '영어학습앱-PM, UX UI기획 모집',
    category: 'PM',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
  {
    id: 8,
    title: '앱 모 앱 프로젝트 디자이너 모집',
    category: '디자이너',
    content: 'PM Test',
    status: 'DRAFT',
    userId: 1,
  },
];
async function main() {
  // const user1 = await prisma.user.create({
  //   data: {
  //     id: 1,
  //     email: 'test@test.com',
  //     provider: 'GOOGLE',
  //     name: 'test',
  //     role: 'ADMIN',
  //   },
  // });

  const post1 = await prisma.post.createMany({
    data: [
      {
        id: 2,
        title: '[PM 모집] 사이드 프로젝트<🤟, 자...?>의 PM을 모집합니다!',
        content: 'PM Test',
        status: 'DRAFT',
        category: 'Category',
        userId: 1,
      },
      {
        id: 3,
        title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        id: 4,
        title: '영어학습앱-PM, UX UI기획 모집',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        id: 5,
        title: '앱 모 앱 프로젝트 디자이너 모집',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        id: 6,
        title: '프트롤러를 위한 토이프로젝트 디자이너 한 분 모집합니다!',
        category: '디자이너',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        id: 7,
        title: '영어학습앱-PM, UX UI기획 모집',
        category: 'PM',
        content: 'PM Test',
        status: 'DRAFT',
        userId: 1,
      },
      {
        id: 8,
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
