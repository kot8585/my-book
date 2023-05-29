import prisma from "./prisma";

export async function createBookMark(postIdx: number, userIdx: number) {
  return await prisma.bookmarks.create({
    data: {
      userIdx: userIdx,
      postIdx: postIdx,
    },
  });
}

export async function deleteBookmarks(postIdx: number, userIdx: number) {
  return await prisma.bookmarks.delete({
    where: {
      postIdx_userIdx: {
        userIdx: userIdx,
        postIdx: postIdx,
      },
    },
  });
}
