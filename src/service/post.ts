import { NextRequest } from "next/server";
import prisma from "./prisma";

export async function getPublicPostList() {
  return await prisma.post.findMany({
    where: {
      isPublic: true,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      userBook: {
        select: {
          title: true,
          categoryName: true,
          comment: true,
          imageUrl: true,
          author: true,
          publisher: true,
        },
      },
    },
  });
}
