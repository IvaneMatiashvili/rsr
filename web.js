
const mainSection = document.querySelector(".main");
const blandContainer = document.querySelector(".bland-container");
const elaNeedsToBeDestroyed = document.querySelector(".ela-needs-to-be-destroyed");
const destroyingTextFirst = document.querySelector(".destroying-text-first");
const destroyingTextSecond = document.querySelector(".destroying-text-second");
const closeModalContainer = document.querySelector('.close-modal-container');
const blandTexts = document.querySelector('.bland-texts');
let ansArr = []
let destroyingTextArray = ['გეზარებააააააა ???????????????????\n' +
'            ლევანასთან დილის სამ საათზე შესვლა რატო არ გეზარება ?????????????????', 'უნამუსოოოოოოო!!!!!!!!!!!!']
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/data');
    if (!response.ok) {
      throw new Error('Error retrieving data');
    }
    const data = await response.json();

    data?.data[0].forEach((el, inx) => {
      const div = document.createElement('div');
      const paragraph = document.createElement('p');
      paragraph.textContent = el

      div.classList.add('question-container')
      div.appendChild(paragraph)
      mainSection.appendChild(div)

    })

    ansArr = data?.data[1];
    let questionContainer = document.querySelectorAll('.question-container');

    questionContainer?.forEach((el, inx) => {
      const paragraph = document.createElement('p');
      const ansButton = document.createElement('div');
      const paragraphForAnsBtn = document.createElement('p');
      const removeButton = document.createElement('div');
      const paragraphForRemoveBtn = document.createElement('p');

      paragraph.textContent = ansArr[inx]
      paragraphForAnsBtn.textContent = 'პასუხი'
      paragraphForRemoveBtn.textContent = 'დამალვა'

      paragraph.classList.add('answer')
      ansButton.classList.add('ans-btn')
      removeButton.classList.add('remove-btn')

      paragraph.classList.add('question-container')
      ansButton.classList.add('question-container')
      removeButton.classList.add('question-container')

      el.appendChild(paragraph)
      ansButton.appendChild(paragraphForAnsBtn)
      el.appendChild(ansButton)
      removeButton.appendChild(paragraphForRemoveBtn)
      el.appendChild(removeButton)
    })

    let ansBtn = document.querySelectorAll('.ans-btn');
    let answer = document.querySelectorAll('.answer');
    let removeBtn = document.querySelectorAll('.remove-btn');

    ansBtn.forEach((el, inx) => {
      el.addEventListener('click', () => {
        answer[inx].style.display = 'block'
        removeBtn[inx].style.display = 'flex'
        el.style.display = 'none'
      })
    })

    removeBtn?.forEach((el, inx) => {
      el.addEventListener('click', () => {
        answer[inx].style.display = 'none'
        ansBtn[inx].style.display = 'flex'
        el.style.display = 'none'
      })
    })
  } catch (error) {
    console.error(error);
  }
}

fetchData();


"use strict";

let hour = 0;
let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

document.form_main.start.onclick = () => start();
document.form_main.pause.onclick = () => pause();
document.form_main.reset.onclick = () => reset();

function start() {
  pause();
  cron = setInterval(() => { timer(); }, 10);
}

function pause() {
  clearInterval(cron);
}

function reset() {
  hour = 0;
  minute = 0;
  second = 0;
  millisecond = 0;
  document.getElementById('hour').innerText = '00';
  document.getElementById('minute').innerText = '00';
  document.getElementById('second').innerText = '00';
  document.getElementById('millisecond').innerText = '000';
}

function timer() {
  if ((millisecond += 10) === 1000) {
    millisecond = 0;
    second++;
  }
  if (second === 60) {
    second = 0;
    minute++;
  }
  if (minute === 60) {
    minute = 0;
    hour++;
  }
  document.getElementById('hour').innerText = returnData(hour);
  document.getElementById('minute').innerText = returnData(minute);
  document.getElementById('second').innerText = returnData(second);
  document.getElementById('millisecond').innerText = returnData(millisecond);

  if(minute === 1 && second === 20 && millisecond === 20) {
    reset()
    pause()
  };
}

function returnData(input) {
  return input > 10 ? input : `0${input}`
}


blandContainer.addEventListener('click', async () => {
  elaNeedsToBeDestroyed.style.display = 'flex';
  closeModalContainer.style.display = 'block';
  blandTexts.style.display = 'block';
/*
  let firstCounter = 0;
  let secondCounter = 0;
  const myFirstInterval = await setInterval(() => {
    destroyingTextFirst.innerHTML += destroyingTextArray[0][firstCounter];
    firstCounter++;
    if(firstCounter === destroyingTextArray[0].length){
      clearInterval(myFirstInterval);
    }
  }, 100)
  const mySecondInterval = await setInterval(() => {
    destroyingTextSecond.innerHTML += destroyingTextArray[1][secondCounter];
    secondCounter++;
    if(secondCounter === destroyingTextArray[1].length){
      clearInterval(mySecondInterval);
    }
  }, 100)
*/


  const myInterval = setInterval(() => {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'უნამუსოოოო!!!!!'
    paragraph.classList.add('bland-text');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    paragraph.style.position = 'absolute';
    paragraph.style.zIndex = '99999';
    paragraph.style.left = (Math.random() * 100).toString() + '%';
    paragraph.style.right = (Math.random() * 100).toString() + '%';
    paragraph.style.top = (Math.random() * 100).toString() + '%';
    paragraph.style.bottom = (Math.random() * 100).toString() + '%';
    paragraph.style.color = "#" + randomColor;
    blandTexts.appendChild(paragraph);
    mainSection.appendChild(blandTexts)
  }, 300);

  closeModalContainer.addEventListener('click', () => {
    elaNeedsToBeDestroyed.style.display = 'none';
    closeModalContainer.style.display = 'none';
     blandTexts.style.display = 'none';
      clearInterval(myInterval);
  })

})







