const Datepicker = $container => {

  const nav_button_left = $container.querySelector('.calendar-nav > button:nth-of-type(1)');
  const nav_button_right = $container.querySelector('.calendar-nav > button:nth-of-type(2)');
  const nav_p_month = $container.querySelector('.calendar-nav > p:nth-of-type(1)');
  const nav_p_year = $container.querySelector('.calendar-nav > p:nth-of-type(2)');
  const grid_dates = $container.querySelector('.dates');
  const datepicker_box = $container.querySelector('.datepicker');

  let date = new Date();
  
  const Calender = () => {
    const visibleYear = date.getFullYear();
    const visibleMonth = date.getMonth();

    nav_p_year.innerText = visibleYear;

    let visibleMonth_inEnglish = '';
    switch (visibleMonth) {
      case 0:
        visibleMonth_inEnglish = 'January';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 1:
        visibleMonth_inEnglish = 'February';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 2:
        visibleMonth_inEnglish = 'March';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 3:
        visibleMonth_inEnglish = 'April';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 4:
        visibleMonth_inEnglish = 'May';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 5:
        visibleMonth_inEnglish = 'June';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 6:
        visibleMonth_inEnglish = 'July';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 7:
        visibleMonth_inEnglish = 'August';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 8:
        visibleMonth_inEnglish = 'September';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 9:
        visibleMonth_inEnglish = 'October';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 10:
        visibleMonth_inEnglish = 'November';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
      case 11:
        visibleMonth_inEnglish = 'December';
        nav_p_month.innerText = visibleMonth_inEnglish;
        break;
    }

    const ll_fullday = new Date(visibleYear, visibleMonth, 0);
    const tl_fullday = new Date(visibleYear, visibleMonth + 1, 0);
    
    const ll_date = ll_fullday.getDate();
    const ll_day = ll_fullday.getDay();
    
    const tl_date = tl_fullday.getDate();
    const tl_day = tl_fullday.getDay();
    
    const lastmonth_dates = [];
    const thismonth_dates = [...Array(tl_date + 1).keys()].slice(1);
    const nextmonth_dates = [];

    if (ll_day !== 6) {
      for (let i = 0; i < ll_day + 1; i++) {
        lastmonth_dates.unshift(ll_date - i);
      }
    }

    for (let i = 1; i < 7 - tl_day; i++) {
      nextmonth_dates.push(i);
    }

    const dates = lastmonth_dates.concat(thismonth_dates, nextmonth_dates);
    const first_date_index = dates.indexOf(1);
    const last_date_index = dates.lastIndexOf(tl_date);

    let condition = '';

    dates.forEach((date, i) => {

      if (first_date_index <= i  && i < last_date_index + 1) {
        condition = 'this';
      } else if (i < first_date_index) {
        condition = 'last';
      } else if (last_date_index <= i) {
        condition = 'next';
      }

      dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
    });
    
    grid_dates.innerHTML = dates.join('');

    const today = new Date();
    if (visibleMonth === today.getMonth() && visibleYear === today.getFullYear()) {
      for (let date of $container.querySelectorAll('.this')) {
        if (date.innerText === today.getDate()+'') {
          date.classList.add('today');
          break;
        }
      }
    }
  }
  
  Calender();

  const lastMonth_Button = () => {
    date.setMonth(date.getMonth() - 1);
    Calender();
  };

  const nextMonth_Button = () => {
    date.setMonth(date.getMonth() + 1);
    Calender();
  };

  const goback_today = () => {
    date = new Date();
    Calender();
  };

  nav_button_left.addEventListener('click', lastMonth_Button);

  nav_button_right.addEventListener('click', nextMonth_Button);
  
  nav_p_month.addEventListener('click', goback_today);

  const show = () => {
    $container.querySelector('.calendar').classList.add('calendar--focus');
  }

  const hide = () => {
    $container.querySelector('.calendar').classList.remove('calendar--focus');
  }

  datepicker_box.addEventListener('click', show);

  $container.addEventListener('click', e => {
    if (e.target.className === 'this' || e.target.className === 'last' || e.target.className === 'next' || e.target.className === 'this today') {
      let dp_date = '';
      let dp_month = '';
      let dp_year = '';
      if (e.target.className === 'this' || e.target.className === 'this today') {
        dp_date = e.target.innerText;
        dp_date = dp_date >=10 ? dp_date: '0' + dp_date;
        dp_month = date.getMonth() + 1;
        dp_month = dp_month >= 10 ? dp_month: '0' + dp_month;
        datepicker_box.value = `${date.getFullYear()}-${dp_month}-${dp_date}`;
        console.log(`${date.getFullYear()}-${dp_month}-${dp_date}`);
      } else if (e.target.className === 'last') {
        dp_date = e.target.innerText;
        dp_month = date.getMonth();
        dp_year = date.getFullYear();
        if (dp_month < 10 && dp_month !== 0) {
          dp_month = '0' + dp_month;
        } else if (dp_month === 0) {
          dp_month = 12;
          dp_year = dp_year-1;
        }
        datepicker_box.value = `${dp_year}-${dp_month}-${dp_date}`;
        console.log(`${dp_year}-${dp_month}-${dp_date}`);
      } else if (e.target.className === 'next') {
        dp_date = e.target.innerText;
        dp_month = date.getMonth() + 2;
        dp_year = date.getFullYear();
        if (dp_month < 10 && dp_month !== 0) {
          dp_month = '0' + dp_month;
        } else if (dp_month === 13) {
          dp_month = '01';
          dp_year = dp_year+1;
        }
        datepicker_box.value = `${dp_year}-${dp_month}-0${dp_date}`;
        console.log(`${dp_year}-${dp_month}-0${dp_date}`);
      }
      hide();
    } else if (e.target.className === 'set') {
      hide();
    }
  });

  document.addEventListener('click', e => {
    if(e.target.className === 'title' || e.target.className === 'title-text') {
      document.querySelectorAll('.calendar').forEach(i => i.classList.remove('calendar--focus'));
    }
  })

}

export default Datepicker;