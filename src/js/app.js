// TODO: write code here
let currentScore = 0;
let failScore = 0;
let activeHole = Math.floor(1 + Math.random() * 16);
let playing = true;
let cycleNumber = 0;
const hole = document.querySelectorAll('.hole');
const holeSeparate = [...hole];
const deactivateHole = () => document.querySelector('.hole_has-goblin').classList.remove('hole_has-goblin');
const activateHole = (index) => document.querySelector(`.hole${index}`).classList.add('hole_has-goblin');
//activateHole(activeHole);


function changeHole() {
  activateHole(activeHole);
  deactivateHole();
  activeHole = Math.floor(1 + Math.random() * 16);
  activateHole(activeHole);
}
function reset() {
  alert('Игра окончена!');
  currentScore = 0;
  failScore = -1;
  playing = true;
  document.querySelector('.success').textContent = 0;
  document.querySelector('.fail').textContent = 0;
  cycleNumber = -1;
}
(() => {
  
  if (playing) {
    setInterval(() => {
      if (cycleNumber !== currentScore + failScore) {
        failScore += 1;
        document.querySelector('.fail').textContent = failScore;
      }

      if (!playing || failScore >= 5) {
        reset();
        return;
      }
      changeHole();
      cycleNumber += 1;
    }, 1000);
  }
})();

holeSeparate.forEach((item) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('hole_has-goblin')) {
      changeHole();
      currentScore += 1;
      document.querySelector('.success').textContent = currentScore;
    } else {
      changeHole();
      failScore += 1;
      document.querySelector('.fail').textContent = failScore;
    }
  });
});
