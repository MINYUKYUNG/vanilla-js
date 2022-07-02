// do something!
const Nav = (category, targetState) => {

  const root_box = document.querySelector('#root');
  const nav_box = document.createElement('nav');
  nav_box.className = 'category-list';

  const ul_box = document.createElement('ul');
  category.map(list => {
    let li_box = document.createElement('li');
    li_box.id = list.id;
    li_box.className = 'category-item';
    li_box.innerText = list.text;
    ul_box.append(li_box);
  })
  nav_box.append(ul_box);
  root_box.append(nav_box);

  document.querySelector(`#${targetState.category}`).classList.add('active');

  document.addEventListener('click', e => {
    if(e.target.className === 'category-item' || e.target.className ==='category-item active') {
        targetState.category = e.target.id; // 이런식으로 값을 할당하면 index.js파일에 있는 new Proxy가 이를 가로채서 실행하는 것! (함수호출같은 역할)
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');
    }
  })
  

}

export default Nav;