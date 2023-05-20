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
  status: "TOREAD" | "READING" | "COMPLETED";
  // ebook, paper,
  type: "EBOOK" | "PAPER";
  comment?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
};
