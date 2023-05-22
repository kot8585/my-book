export type UserBook = {
  userIdx: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl: string;
  categoryName?: string | null;
  totalPage: number;
  // status: "TOREAD" | "READING" | "COMPLETED";
  status: string;
  // type: "EBOOK" | "PAPER";
  type: string;
  comment?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  createdAt: Date;
};
