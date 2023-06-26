import { UserBook } from "@/model/userBook";
import prisma from "./prisma";

export async function getUserBooks(userIdx: number, status: string) {
  const result = await prisma.userBook.findMany({ where: { userIdx, status } });
  return result;
}

export async function selectUserBook(userIdx: number, isbn: string) {
  const result = await prisma.userBook.findUnique({
    where: { userIdx_isbn: { userIdx, isbn } },
    include: {
      posts: {
        select: {
          idx: true,
          userIdx: true,
          page: true,
          title: true,
          content: true,
          type: true,
          createdAt: true,
          updatedAt: true,
          openType: true,
          _count: {
            select: { likeUsers: true, bookmarkUsers: true, comments: true },
          },
        },
      },
    },
  });
  return result;
}

export async function createUserBook(userBook: UserBook) {
  return await prisma.$queryRaw`
    INSERT INTO book_app.UserBook (user_idx, isbn, title, author, publisher, image_url, category_name, total_page, status, type, comment) VALUES (${userBook.userIdx}, ${userBook.isbn}, ${userBook.title}, ${userBook.author}, ${userBook.publisher}, ${userBook.imageUrl}, ${userBook.categoryName}, ${userBook.totalPage}, ${userBook.status}, ${userBook.type}, ${userBook.comment});
  `;

  // return await prisma.userBook.create({
  //   data: {
  //     userIdx: userBook.userIdx,
  //     isbn: userBook.isbn,
  //     title: userBook.title,
  //     author: userBook.author,
  //     publisher: userBook.publisher,
  //     imageUrl: userBook.imageUrl,
  //     categoryName: userBook.categoryName,
  //     totalPage: userBook.totalPage,
  //     status: userBook.status,
  //     type: userBook.type,
  //     comment: userBook.comment ?? null,
  //   },
  // });
}
