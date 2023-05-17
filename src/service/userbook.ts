import prisma from "./prisma";

export async function getUserBooks(userIdx: number, status: string) {
  const result = await prisma.userBook.findMany({ where: { userIdx, status } });
  return result;
}
