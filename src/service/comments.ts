import { CreateCommentType, PostCommentType } from "@/model/comment";
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

export async function deleteComment(idx: number) {
  return await prisma.comment.delete({
    where: {
      idx,
    },
  });
}

export async function updateComment(editComment: Partial<PostCommentType>) {
  return await prisma.comment.update({
    where: {
      idx: editComment.idx,
    },
    data: {
      content: editComment.content,
    },
  });
}
