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
