const reactionButton = document.getElementById("ReactionButton");
const reactionTimeDisplay = document.getElementById("reactionTime");
const nameInput = document.getElementById("nameInput");
const ageInput = document.getElementById("ageInput")
const refreshButton = document.getElementById("refreshButton");
let startTime, endTime, timeoutId;

function startReactionTimeTest() {
  const name = nameInput.value.trim();
  const age = ageInput.value

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
  age = ageInput.value
  reactionButton.style.backgroundColor = "green";
  startTime = new Date().getTime();
  reactionButton.disabled = false;

  reactionButton.onclick = function () {
    endTime = new Date().getTime();
    const reactionTime = endTime - startTime;

    reactionTimeDisplay.textContent = `Reakcijas laiks: ${reactionTime} ms`;

    recordReactionTime({ name, reactionTime ,age});

    clearTimeout(timeoutId);
    reactionButton.style.backgroundColor = "red";
    reactionButton.disabled = true;
    reactionButton.onclick = null;
  };
}

refreshButton.addEventListener("click", function () {
  location.reload();
});

function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function recordReactionTime(data) {
  const baseUrl = "https://programmesana2.lv/api/rihards-db/post";
  const url = `${baseUrl}?name=${data.name}&reactionTime=${data.reactionTime}&age=${data.age}&key=rihards123`;
 // //save results in db
  await fetch(url);
}
