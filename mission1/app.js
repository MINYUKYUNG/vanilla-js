// do something!

function stay() {
  if (localStorage.getItem("remember") === "active") {
    document.querySelector("#mission1").className = localStorage.getItem("remember");
  }

  visible();
}

function visible() {
  document.body.style.visibility = "visible";
}

const result = function () {
  const sidebar = document.querySelector("#mission1");

  const on = function () {
    document.querySelector("body").classList.remove("preload");
    return sidebar.classList.add("active");
  }
  
  const off = function () {
    document.querySelector("body").classList.remove("preload");
    return sidebar.classList.remove("active");
  }

  if (sidebar.className === '') {
    on();
    localStorage.setItem("remember", "active");
    return;
  } else if (sidebar.className === 'active') {
    off();
    localStorage.setItem("remember", "");
    return;
  }
}

window.onload = function () {
  stay();
  const button = document.querySelector(".toggle");
  button.addEventListener('click', result);
}


// // 추가적으로 다른 방법도 생각해보았습니다.
// function stay() {
//   if (localStorage.getItem("remember") === "active") {
//     document.querySelector("#mission1").className = localStorage.getItem("remember");
//   }

//   visible();

//   third(() => {document.querySelector("body").classList.remove("preload")});
// }

// function visible() {
//   document.body.style.visibility = "visible";
// }

// function third(preload) {
//   setTimeout(() => {preload()}, 100);
// };

// const result = function () {
//   const sidebar = document.querySelector("#mission1");

//   const on = function () {
//     return sidebar.classList.add("active");
//   }
  
//   const off = function () {
//     return sidebar.classList.remove("active");
//   }

//   if (sidebar.className === '') {
//     on();
//     localStorage.setItem("remember", "active");
//     return;
//   } else if (sidebar.className === 'active') {
//     off();
//     localStorage.setItem("remember", "''");
//     return;
//   }
// }

// window.onload = function () {
//   stay();
//   const button = document.querySelector(".toggle");
//   button.addEventListener('click', result);
// }