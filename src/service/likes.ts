import prisma from "./prisma";

export async function createLike(postIdx: number, userIdx: number) {
  return await prisma.likes.create({
    data: {
      userIdx: userIdx,
      postIdx: postIdx,
    },
  });
}

export async function deleteLike(postIdx: number, userIdx: number) {
  return await prisma.likes.delete({
    where: {
      postIdx_userIdx: {
        userIdx: userIdx,
        postIdx: postIdx,
      },
    },
  });
}
