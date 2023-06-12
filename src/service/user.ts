import prisma from "./prisma";

type OAuthUser = {
  userId: string;
  email: string;
  name: string;
  image?: string | null;
  type: string;
};

export async function addUser({ userId, email, name, image, type }: OAuthUser) {
  return await prisma.user.upsert({
    where: { email },
    create: {
      userId,
      email,
      name,
      image,
      type,
    },
    update: {},
  });
}

export async function getUserFollowCnt(userIdx: number) {
  const data = await prisma.user.findUnique({
    where: { idx: userIdx },
    include: {
      _count: {
        select: { follower: true, followee: true },
      },
      // 사용자가 팔로우 하는 사람들
      followee: {
        select: {
          followerIdx: true,
        },
      },
      // 사용자를 팔로잉 하는 사람들
      follower: {
        select: {
          followeeIdx: true,
        },
      },
    },
  });

  const result = {
    ...data,
    followee: data?.follower.map((data) => data.followeeIdx),
    follower: data?.followee.map((data) => data.followerIdx),
    followerCnt: data?._count.followee ?? 0,
    followeeCnt: data?._count.follower ?? 0,
  };

  console.log("result : ", result);

  return result;
}

export async function getIdxByEmail(email: string) {
  const result = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      idx: true,
    },
  });

  return result?.idx;
}

export async function getMyLikes(userIdx: number) {
  const data = await prisma.likes.findMany({
    where: {
      userIdx: userIdx,
    },
    select: {
      postIdx: true,
    },
  });
  return data.map((liked) => liked.postIdx);
}

export async function getMyBookmarks(userIdx: number) {
  const data = await prisma.bookmarks.findMany({
    where: {
      userIdx: userIdx,
    },
    select: {
      postIdx: true,
    },
  });

  return data.map((bookmarked) => bookmarked.postIdx);
}
