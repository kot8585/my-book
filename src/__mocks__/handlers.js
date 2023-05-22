import { rest } from "msw";

export const handlers = [
  // 파라미터는 어떻게 하지?
  rest.get(`/api/posts?feedType=TOTAL`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          userIdx: 2,
          isbn: "9788950945015",
          idx: 2,
          page: 521,
          title: null,
          content: "있잖아",
          type: "REVIEW",
          createdAt: "2023-05-16T21:40:34.247Z",
          updatedAt: null,
          isPublic: true,
          bookmarkUserIdx: null,
          likeUserIdx: null,
          user: {
            name: "문효정",
            image:
              "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
          },
          userBook: {
            title: "수상한생선의 진짜로 해부하는 과학책 1 - 바다 생물",
            categoryName: "교양과학",
            comment: "이 필드를 쓰긴 쓸까?",
            imageUrl:
              "https://image.aladin.co.kr/product/31484/30/coversum/8950945010_1.jpg",
            author: "김준연 지음, 최재천 감수",
            publisher: "arte(아르테)",
          },
        },
        {
          userIdx: 1,
          isbn: "8936433695 9788936433697",
          idx: 1,
          page: 10,
          title: "재밌는 책이지",
          content:
            "'뒤에', '나중에'라는 뜻을 지닌 접두사. 포스트모더니즘이나 포스트 아포칼립스 등이 그 예. 2020년 들어 포스트 코로나나 포스트 아베라는 표현도 사용되고 있다. 같은 뜻의 라틴어 단어(부사, 전치사)에서 유래하였다.",
          type: "NOTE",
          createdAt: "2023-05-16T07:30:51.191Z",
          updatedAt: null,
          isPublic: true,
          bookmarkUserIdx: null,
          likeUserIdx: null,
          user: {
            name: "꽃꽃",
            image:
              "https://lh3.googleusercontent.com/a/AGNmyxYpFHyxWXY45u8EjJRbffvbhV2uninNhvJkPB3o=s96-c",
          },
          userBook: {
            title: "위저드 베이커리 (Wizard Bakery)",
            categoryName: "판타지",
            comment: "표지가 재밌어보인다",
            imageUrl:
              "https://bookthumb-phinf.pstatic.net/cover/060/027/06002739.jpg?type=m1&udate=20130108",
            author: "구병모",
            publisher: "",
          },
        },
      ])
    );
  }),
];
