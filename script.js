const reactionButton = document.getElementById("ReactionButton");
const reactionTimeDisplay = document.getElementById("reactionTime");
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput");
const attemptsLeftDisplay = document.getElementById("attemptsCount");
let startTime, endTime, timeoutId;
let testCounter = 0;

function startReactionTimeTest() {
  const name = nameInput.value.trim();
  const age = ageInput.value;

  if (!name || !age) {
    alert("Ievadiet vārdu un vecumu.");
    return;
  }

  reactionButton.style.backgroundColor = "red";
  reactionButton.disabled = true;

  const delay = getRandomDelay(1000, 5000);
  timeoutId = setTimeout(() => {
    changeButtonColor(name);
  }, delay);
}

function changeButtonColor(name) {
    if (testCounter >= 10) {
      return;
    }
    variants = 1
    name = nameInput.value.trim();
    age = ageInput.value;
    reactionButton.style.backgroundColor = "green";
    startTime = new Date().getTime();
    reactionButton.disabled = false;
   
    reactionButton.onclick = function () {
      if (testCounter >= 10) {
        return; 
      }
  
      endTime = new Date().getTime();
      const reactionTime = endTime - startTime;
  
      reactionTimeDisplay.innerHTML += `<li>Reakcijas laiks ${testCounter + 1}: ${reactionTime} ms</li>`;
  
      testCounter++;
      recordReactionTime({ variants,name, reactionTime ,age});
      if (testCounter < 10) {
        clearTimeout(timeoutId);
        reactionButton.style.backgroundColor = "red";
        reactionButton.disabled = true;
        reactionButton.onclick = null;
  
        attemptsLeftDisplay.textContent = 10 - testCounter; 
        startReactionTimeTest(); 
       
      } else {
        alert("Test pabeigts. Pārbaudiet reakcijas laikus zemāk.");
        reactionButton.disabled = true; 
        attemptsLeftDisplay.textContent = 0;
      }
    };
  }
  
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function recordReactionTime(data) {
  const baseUrl = "https://programmesana2.lv/api/rihards-db/post";
  const url = `${baseUrl}?name=${data.name}&reactionTime=${data.reactionTime}&age=${data.age}&variant=${data.variants}&key=rihards123`;
  //save results in db
  await fetch(url);
}
