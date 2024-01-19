let startTime, endTime;
let attemptsRemaining = 10;
let reactionTimes = [];
let testCounter = 0;

document.getElementById("startButton").addEventListener("click", startGame);

function startGame() {
  const name = nameInput.value.trim();
  const age = ageInput.value;
  hidestuff()
  if (!name || !age) {
    alert("Ievadiet vārdu un vecumu.");
    return;
  }else{
        placeBoxRandomly();
  }
}
function hidestuff(){
    document.getElementById('h1').style.display = 'none';
    document.getElementById('p').style.display = 'none';
  document.getElementById('startButton').style.display = 'none';
  document.querySelectorAll('input').forEach(input => input.style.display = 'none');
  document.getElementById('game-container').classList.add('started');
  document.querySelectorAll('label').forEach(label => label.style.display = 'none');
}
function placeBoxRandomly() {
 
    let box = document.getElementById('box');
    let gameContainer = document.getElementById('game-container');
    let gameContainerRect = gameContainer.getBoundingClientRect();
  
    let gameContainerWidth = gameContainerRect.width;
    let gameContainerHeight = gameContainerRect.height;
  
    let boxWidth = box.offsetWidth;
    let boxHeight = box.offsetHeight;
  
    let maxX = gameContainerWidth - boxWidth;
    let maxY = gameContainerHeight - boxHeight;
  
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
  
    box.style.left = randomX + 'px';
    box.style.top = randomY + 'px';
  
    startTime = new Date().getTime();
  
    box.style.display = 'block';
    box.style.backgroundColor = 'red'; 

    box.onclick = boxClicked;
  }
  

function boxClicked() {

  endTime = new Date().getTime();
  let reactionTime = endTime - startTime;
  variants = 2
 
  testCounter++;

  displayReactionTime(reactionTime);
  document.getElementById('box').style.display = 'none';
  document.getElementById('box').onclick = null;

  attemptsRemaining--;
  
  name = nameInput.value.trim();
  age = ageInput.value;
  recordReactionTime({ variants,name, reactionTime ,age});

  updateInfo();
  if (attemptsRemaining >= 0) {
    reactionTimes.push(reactionTime);

    if (attemptsRemaining > 0) {
      setTimeout(placeBoxRandomly, getRandomDelay());
    } else {
      alert("Test pabeigts. Pārbaudiet reakcijas laikus zemāk.");    
    }
    
  }
}

function displayReactionTime(reactionTime) {
  let reactionTimesList = document.getElementById('reactionTime');
  let listItem = document.createElement('li');
  listItem.textContent = `Reaction Time ${testCounter}: ${reactionTime} ms`;
  reactionTimesList.appendChild(listItem);
}

function getRandomDelay() {
  return Math.floor(Math.random() * (3000 - 1000 + 1) + 1000);
}

function updateInfo() {
  document.getElementById('attempts').textContent = `Mēģinājumi atlikuši: ` + attemptsRemaining;
}
function cors{
    fetch(url,{
     mode: 'no-cors'
          })
}
async function recordReactionTime(data) {
    const baseUrl = "https://programmesana2.lv/api/rihards-db/post";
    const url = `${baseUrl}?name=${data.name}&reactionTime=${data.reactionTime}&age=${data.age}&variant=${data.variants}&key=rihards123`;
    cors()
    //save results in db
    await fetch(url);
  }
