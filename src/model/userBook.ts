type UserBook = {
  userIdx: String;
  isbn: String;
  title: String;
  author: String;
  categoryName?: String;
  //toRead reading complete
  status: String;
  // ebook, paper,
  type: String;
  comment?: String;
};
