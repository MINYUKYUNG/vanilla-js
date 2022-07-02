import Nav from './Nav.js';
import NewsList from './NewsList.js';

export { Nav, NewsList };


const state = { category: 'all' };
const targetState = new Proxy(state, { // Nav.js에서처럼 targetState.category = e.target.id; 이런식으로 값을 할당하면 new Proxy가 이를 가로채서 실행한다!
  set: (target, key, value) => {
    target[key] = value;
    document.querySelectorAll('.news-list-container')[0].remove();
    NewsList(targetState.category);
    return true;
  }
});

const category = [
  {id: 'all', text: '전체보기'},
  {id: 'business', text: '비즈니스'},
  {id: 'entertainment', text: '엔터테인먼트'},
  {id: 'health', text: '건강'},
  {id: 'science', text: '과학'},
  {id: 'sports', text: '스포츠'},
  {id: 'technology', text: '기술'}
];

Nav(category, targetState);

NewsList(targetState.category);