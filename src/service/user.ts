import prisma from "./prisma";

type OAuthUser = {
  userId: string;
  email?: string | null;
  name: string;
  image?: string | null;
  type: string;
};

export async function addUser({ userId, email, name, image, type }: OAuthUser) {
  return await prisma.user.upsert({
    where: { userId_type: { userId, type } },
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
