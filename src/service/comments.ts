import { CreateCommentType } from "@/model/comment";
import prisma from "./prisma";

export async function getCommentList(postIdx: number) {
  return await prisma.comment.findMany({
    where: {
      postIdx,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function createComment({
  postIdx,
  userIdx,
  content,
}: CreateCommentType) {
  return await prisma.comment.create({
    data: {
      postIdx,
      userIdx,
      content,
    },
  });
}
