type Post = {
  userIdx: Number;
  isbn: String;
  idx: Number;
  page: Number;
  title?: String;
  content: String;
  createAt: Date;
  updateAt: Date;
  isPublic: Boolean;
  bookMarkUserIdx?: String;
  likeUserIdx?: String;
};
