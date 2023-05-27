import prisma from "./prisma";

// select *  from post p
// left join user u on p.userIdx = u.idx and p.isPublic=true
// left join userBook b on p.isbn=b.isbn;
export async function getAllPostList() {
  return await prisma.post.findMany({
    where: {
      openType: "ALL",
    },
    orderBy: {
      createdAt: "desc",
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

// SELECT * FROM POST p
//LEFT JOIN user u ON p.user_idx = u.idx
//LEFT JOIN userbook b ON p.isbn=b.isbn
//WHERE is_public=TRUE AND p.user_idx IN (
//   SELECT followee_idx FROM FOLLOW WHERE follower_idx=1
// )
export async function getFollowingPostList(userIdx) {
  const result = await prisma.$queryRaw`
    SELECT 
      p.user_idx, p.isbn, p.idx, p.page, p.title, p.content, p.created_at, p.bookmark_user_idx, like_user_idx, 
      b.title as book_title, b.image_url as book_image_url, b.author as book_author,  
      u.image as user_image_url, u.name as user_name 
    FROM POST p 
    LEFT JOIN user u 
      ON p.user_idx = u.idx 
    LEFT JOIN userbook b 
      ON p.isbn=b.isbn  
    WHERE (open_type="FOLLOW" OR open_type="ALL") AND p.user_idx IN (
        SELECT followee_idx FROM FOLLOW WHERE follower_idx=${userIdx}
      )
    ORDER BY p.created_at DESC
    `;

  const mappedResult = result.map((row) => ({
    userIdx: row.user_idx,
    isbn: row.isbn,
    idx: row.idx,
    page: row.page,
    title: row.title,
    content: row.content,
    createdAt: row.created_at,
    bookMarkUserIdx: row.bookmark_user_idx,
    likeUserIdx: row.like_user_idx,
    user: {
      image: row.user_image_url,
      name: row.user_name,
    },
    userBook: {
      title: row.book_title,
      imageUrl: row.book_image_url,
      author: row.book_author,
      page: row.page,
    },
  }));

  return mappedResult;
}

export async function createPost(post) {
  return await prisma.post.create({
    data: {
      isbn: post.isbn,
      type: post.type,
      openType: post.openType,
      content: post.content,
      page: post.page,
      userIdx: post.userIdx,
    },
  });
}

export async function getPost(postIdx) {
  return await prisma.post.findUnique({
    where: {
      idx: postIdx,
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
      comments: {
        select: {
          idx: true,
          content: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
}

export async function deletePost(postIdx) {
  return await prisma.post.delete({
    where: {
      idx: postIdx,
    },
  });
}

export async function updatePost(post) {
  return await prisma.post.update({
    where: {
      idx: post.idx,
    },
    data: {
      ...post,
      updatedAt: new Date(),
    },
  });
}

export async function getCommentList(postIdx) {
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

//TODO: comment는 알겠는데 like랑 bookmark는 어떻게 하는거지?
export async function setLikes() {}
