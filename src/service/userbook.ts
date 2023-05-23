import { UserBook } from "@/model/userBook";
import prisma from "./prisma";

export async function getUserBooks(userIdx: number, status: string) {
  const result = await prisma.userBook.findMany({ where: { userIdx, status } });
  return result;
}

export async function createUserBook(userBook: UserBook) {
  console.log("userBook", userBook);
  return await prisma.$queryRaw`
    INSERT INTO USERBOOK (user_idx, isbn, title, author, publisher, image_url, category_name, total_page, status, type, comment) VALUES (${userBook.userIdx}, ${userBook.isbn}, ${userBook.title}, ${userBook.author}, ${userBook.publisher}, ${userBook.imageUrl}, ${userBook.categoryName}, ${userBook.totalPage}, ${userBook.status}, ${userBook.type}, ${userBook.comment});
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
