import prisma from "./prisma";

export async function createFollow(followerIdx: number, followeeIdx: number) {
  return await prisma.follow.create({
    data: {
      followerIdx,
      followeeIdx,
    },
  });
}

export async function deleteFollow(followerIdx: number, followeeIdx: number) {
  return await prisma.follow.delete({
    where: {
      followerIdx_followeeIdx: {
        followerIdx,
        followeeIdx,
      },
    },
  });
}
