const ageInput = document.getElementById('ageInput');
const nameInput = document.getElementById('nameInput');
const box = document.getElementById('box');
const container = document.getElementById('game-container');
const containerRect = container.getBoundingClientRect();
const button = document.getElementById('startButton');
const refreshButton = document.getElementById('refreshButton');

let startTime, endTime;
let gameRunning = false;

button.addEventListener('click', startReact);

function startReact() {
  const name = nameInput.value.trim();
  const age = ageInput.value;

  if (age.trim() === '' || name.trim() === '') {
    alert('Ievadiet vārdu un vecumu');
    ageInput.value = '';
    nameInput.value = '';
  } else if (!gameRunning) {
    gameRunning = true;
    scheduleBoxDisplay();
  }
}

function getRandomPosition(containerWidth, containerHeight) {
  const positionX = Math.floor(Math.random() * (containerWidth - 100));
  const positionY = Math.floor(Math.random() * (containerHeight - 100));
  return { x: positionX, y: positionY };
}

function displayBox() {
  const { x, y } = getRandomPosition(containerRect.width, containerRect.height);
  startTime = new Date();
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
  box.style.display = 'block';
}

function scheduleBoxDisplay() {
  const delay = Math.floor(Math.random() * 2000) + 100; 
  setTimeout(displayBox, delay);
}

function hideBox() {
  const name = nameInput.value.trim();
  const age = ageInput.value
  if (gameRunning) {
    endTime = new Date();
    const reactionTime = endTime - startTime;
    const reactionTimeDisplay = document.getElementById('reactionTimeDisplay');
    reactionTimeDisplay.textContent = `Reakcijas laiks: ${reactionTime} ms`;
    gameRunning = false; 
    document.getElementById('box').style.display = 'none';
    recordReactionTime({ name, reactionTime ,age});

  }
}

refreshButton.addEventListener('click', function () {
  location.reload();
});

document.getElementById('box').addEventListener('click', hideBox);

async function recordReactionTime(data) {
  const baseUrl = "https://programmesana2.lv/api/rihards-db/post";
  const url = `${baseUrl}?name=${data.name}&reactionTime=${data.reactionTime}&age=${data.age}&key=rihards123`;
 // //save results in db
  await fetch(url);
}
