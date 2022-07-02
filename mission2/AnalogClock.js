const AnalogClock = $container => {
  // do something!
  function main() {
    let div = "";
    div += '<div class="hand hour"></div>';
    div += '<div class="hand minute"></div>';
    div += '<div class="hand second"></div>';
    div += '<div class="time time1">|</div>';
    div += '<div class="time time2">|</div>';
    div += '<div class="time time3">|</div>';
    div += '<div class="time time4">|</div>';
    div += '<div class="time time5">|</div>';
    div += '<div class="time time6">|</div>';
    div += '<div class="time time7">|</div>';
    div += '<div class="time time8">|</div>';
    div += '<div class="time time9">|</div>';
    div += '<div class="time time10">|</div>';
    div += '<div class="time time11">|</div>';
    div += '<div class="time time12">|</div>';

    $container.insertAdjacentHTML("afterbegin", div)
  }


  function running() {

    const hourHand = $container.querySelector(".hour");
    const minuteHand = $container.querySelector(".minute");
    const secondHand = $container.querySelector(".second");

    const hHand = $container.querySelector(".hand.hour");
    const mHand = $container.querySelector(".hand.minute");
    const sHand = $container.querySelector(".hand.second");

    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    if (hour > 12) hour = hour - 12;
    const hDegree = (hour * 30) + (minute / 2) + (second / 120);
    const mDegree = (minute * 6) + (second / 10);
    const sDegree = second * 6;
    
    hourHand.style.transform = hHand.style.setProperty('--deg', `${hDegree}`);
    minuteHand.style.transform = mHand.style.setProperty('--deg', `${mDegree}`);
    secondHand.style.transform = sHand.style.setProperty('--deg', `${sDegree}`);
  }

  main();
  setInterval(running, 1000);
};

export default AnalogClock;
