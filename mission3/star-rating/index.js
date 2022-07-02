// do something!
const StarRating = $container => {
  if (document.getElementsByTagName("link")[2] === undefined) {
    let link = document.getElementsByTagName("link")[1];
    let theme = '<link href="star-rating/theme.css" rel="stylesheet" />';
    link.insertAdjacentHTML("afterend", theme);
  }  
  
  const stars = $container;
  stars.classList.add('star-rating-container');

  const boxicons = '<i class="bx bxs-star"></i>';

  for (let i = 0; i < stars.attributes[1].value; i++) {
    stars.insertAdjacentHTML("beforeend", boxicons);
  }

  function change_click() {
    let bxs = [...stars.querySelectorAll('.bx')];

    function red(j) {
      for (let y = 0; y < bxs.length; y++) {
        bxs[y].classList.remove('selected');
      }
      for (let y = 0; y <= j; y++) {
        bxs[y].classList.add('selected');
      }

      let event = new CustomEvent('rating-change', {
        detail: j+1
      });
      $container.dispatchEvent(event);           
    }

    bxs.map((bx) => {
      bx.onclick = () => {
        let Z = bxs.indexOf(bx);
        red(Z);
      }
    })
  }

  change_click();

    
  function change_hover() {
    let bxs = [...stars.querySelectorAll('.bx')];

    function shadow(j) {
      for (let y = 0; y < bxs.length; y++) {
        bxs[y].classList.remove('hovered');
      }
      for (let y = 0; y <= j; y++) {
        bxs[y].classList.add('hovered');
      }
    }

    bxs.map((bx) => {
      bx.onmouseover = () => {
        let Z = bxs.indexOf(bx);
          shadow(Z);
      }
      bx.onmouseout = () => {
        (function() {
          for (let y = 0; y < bxs.length; y++) {
            bxs[y].classList.remove('hovered');
          }
        })();
      }
    })
  }

  change_hover();


  document.addEventListener('click', e => {
    if(e.target.tagName === 'BODY' || e.target.className === 'title' || e.target.className === 'current-rating') {
      let bxs = [...stars.querySelectorAll('.bx')];
      for (let y = 0; y < bxs.length; y++) {
        bxs[y].classList.remove('selected');
      }
      for (let i of document.querySelectorAll('.current-rating')) {
        i.querySelector('span').innerText = 0;
      }
    }
  })

}

export default StarRating;