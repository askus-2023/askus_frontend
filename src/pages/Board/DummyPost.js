import thumbnail from '../../assets/images/thumbnail.png';
import profile from '../../assets/images/default-profile.png';

let exPost = [];
const category = ['한식', '양식', '일식', '중식', '기타'];
const like = [true, false];
const startDate = new Date(2022, 1, 1).getTime();
const endDate = new Date(2023, 3, 27).getTime();

for (let i = 0; i < 320; i++) {
  const categoryRandom = Math.floor(Math.random() * category.length);
  const likeRandom = Math.floor(Math.random() * like.length);
  const dateRandom = new Date(
    startDate + Math.random() * (endDate - startDate)
  );
  let liketotal = Math.floor(Math.random() * 15);
  if (like[likeRandom]) {
    liketotal = Math.floor(Math.random() * 14) + 1;
  }

  const Post = {
    id: i,
    thumbnail: thumbnail,
    menu: '연어포케 샐러드',
    title: '맛있게 다이어트 할 수 있는! 다이어트 식단 추천',
    date: dateRandom,
    nickname: 'Cookle',
    profile: profile,
    category: category[categoryRandom],
    like: like[likeRandom],
    liketotal: liketotal,
  };
  exPost.push({ ...Post });
}

export default exPost;
