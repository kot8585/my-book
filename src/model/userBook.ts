export type UserBook = {
  userIdx: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl: string;
  categoryName?: string | null;
  totalPage: number;
  //toRead reading complete
  status: string;
  // ebook, paper,
  type: string;
  comment?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
};
