// do something!
const NewsList = async (category) => {

  const root_box = document.querySelector('#root');
  
  const div_box = document.createElement('div');
  div_box.className = 'news-list-container';
  root_box.append(div_box);
  
  const article_box = document.createElement('article');
  article_box.className = 'news-list';
  
  const scroll_div = document.createElement('div');
  scroll_div.className = "scroll-observer";
  const scroll_img = document.createElement('img');
  scroll_img.src = "img/ball-triangle.svg";
  scroll_img.alt = "Loading...";
  scroll_div.append(scroll_img);
  
  div_box.append(article_box, scroll_div);

  const url = `https://newsapi.org/v2/top-headlines?country=kr&apiKey=9f8490202d504327b04e84d044ebcd44&category=${category === 'all' ? '' : category}`;
  const pageSize = 5;

  async function go(page) {

    const base = async () => {
      try {
        // eslint-disable-next-line
        return await axios.get(`${url}&page=${page}&pageSize=${pageSize}`);
      } catch (error) {
          console.error(error);
      }
    };
    const result = await base();
    // console.log(result);
  

    for (let i = 0; i < result.data.articles.length; i++) {
      const section_box = document.createElement('section');
      section_box.className = 'news-item';

      const thumbnail = document.createElement('div');
      thumbnail.className = 'thumbnail';

      const contents = document.createElement('div');
      contents.className = 'contents';

      article_box.append(section_box);
      section_box.append(thumbnail, contents);

      const thumbnail_a = document.createElement('a');
      thumbnail_a.href = result.data.articles[i].url;
      thumbnail_a.target = "_blank";
      thumbnail_a.rel = "noopener noreferrer";

      thumbnail.append(thumbnail_a);

      const thumbnail_img = document.createElement('img');
      thumbnail_img.src = result.data.articles[i].urlToImage;
      thumbnail_img.alt= "thumbnail";

      thumbnail_a.append(thumbnail_img);

      const contents_h2 = document.createElement('h2');
      const contents_p = document.createElement('p');
      contents_p.innerText = result.data.articles[i].description;

      const contents_h2_a = document.createElement('a');
      contents_h2_a.href = result.data.articles[i].url;
      contents_h2_a.target = "_blank";
      contents_h2_a.rel = "noopener noreferrer";
      contents_h2_a.innerText = result.data.articles[i].title;

      contents.append(contents_h2, contents_p);
      contents_h2.append(contents_h2_a);
    }
    
  }

  const all = async () => {
    try {
      // eslint-disable-next-line
      return await axios.get(`${url}`);
    } catch (error) {
        console.error(error);
    }
  };
  const T_result = await all();
  // console.log(T_result);

  let page = 0;

  const scroll = document.querySelector('.scroll-observer');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        page = page + 1;
        go(page);
        if(T_result.data.totalResults <= page*pageSize) {
          page = 0;
        }
      }
    })
  },);
  
  io.observe(scroll);

}

export default NewsList;
