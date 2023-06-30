import prisma from "./prisma";

// select *  from post p
// left join user u on p.userIdx = u.idx and p.isPublic=true
// left join userBook b on p.isbn=b.isbn;
export async function getAllPostList() {
  const result = await prisma.post.findMany({
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
      likeUsers: {
        select: {
          userIdx: true,
        },
      },
      bookmarkUsers: {
        select: {
          userIdx: true,
        },
      },
      _count: {
        select: { likeUsers: true, bookmarkUsers: true, comments: true },
      },
    },
  });
  return result;
}

export async function getFollowingPostList(userIdx) {
  const result = await prisma.$queryRaw`
      SELECT 
      p.user_idx, p.isbn, p.idx, p.page, p.title, p.content, p.created_at,  
      b.title as book_title, b.image_url as book_image_url, b.author as book_author,  
      u.image as user_image_url, u.name as user_name, count_likeUsers, count_bookmarkUsers, count_comments
    FROM Post p 
    LEFT JOIN user u 
      ON p.user_idx = u.idx 
    LEFT JOIN userbook b 
      ON p.isbn=b.isbn  
      LEFT JOIN (SELECT Likes.postIdx, COUNT(*) AS count_likeUsers FROM book_app.Likes WHERE 1=1 GROUP BY book_app.Likes.postIdx) AS aggr_selection_0_Likes ON (p.idx = aggr_selection_0_Likes.postIdx)
     LEFT JOIN (SELECT book_app.Bookmarks.postIdx, COUNT(*) AS count_bookmarkUsers FROM book_app.Bookmarks WHERE 1=1 GROUP BY book_app.Bookmarks.postIdx) AS aggr_selection_1_Bookmarks ON (p.idx = aggr_selection_1_Bookmarks.postIdx)
    LEFT JOIN (SELECT book_app.Comment.post_idx, COUNT(*) AS count_comments FROM book_app.Comment WHERE 1=1 GROUP BY book_app.Comment.post_idx) AS aggr_selection_2_Comment ON (p.idx = aggr_selection_2_Comment.post_idx)
    WHERE (open_type="FOLLOW" OR open_type="ALL") AND p.user_idx IN (
        SELECT followee_idx FROM FOLLOW WHERE follower_idx=${userIdx}
      )
    ORDER BY p.created_at DESC
    `;

  console.log("result : ", result);

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
    _count: {
      likeUsers: row.count_likeUsers ? Number(row.count_likeUsers) : 0,
      bookmarkUsers: row.count_bookmarkUsers
        ? Number(row.count_bookmarkUsers)
        : 0,
      comments: row.count_comments ? Number(row.count_comments) : 0,
    },
  }));

  console.log("mappedResult : ", mappedResult);
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
          type: true,
        },
      },
    },
  });
}

export async function getPostReactions(postIdx) {
  return await prisma.post.findUnique({
    where: {
      idx: postIdx,
    },
    include: {
      comments: {
        select: {
          idx: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          postIdx: true,
          userIdx: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: { likeUsers: true, bookmarkUsers: true, comments: true },
      },
      likeUsers: {
        select: {
          userIdx: true,
        },
      },
      bookmarkUsers: {
        select: {
          userIdx: true,
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
