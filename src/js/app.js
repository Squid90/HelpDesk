// TODO: write code here

const board = document.querySelector('.board');

const column = board.querySelectorAll('.column');

let actualElement;

const shadowCard = document.createElement('div');
shadowCard.classList.add('highlight');

const onMouseOver = (e) => {
  actualElement.style.top = `${e.clientY}px`;
  actualElement.style.left = `${e.clientX}px`;
  const rect = actualElement.getBoundingClientRect();

  const mouseOverItem = e.target;
  if (mouseOverItem.classList.contains('card')) {
    shadowCard.style.height = `${rect.height}px`;
    mouseOverItem.parentNode.insertBefore(shadowCard, mouseOverItem);
  } // else if(mouseOverItem.classList.contains('column')) {
  //   mouseOverItem.insertBefore(shadowCard, mouseOverItem.lastElementChild);
  // }
};

const onMouseUp = (e) => {
  const mouseUpItem = e.target;
  if (mouseUpItem.classList.contains('card') || mouseUpItem.classList.contains('highlight')) {
    mouseUpItem.parentNode.insertBefore(actualElement, shadowCard);
  } // else if(mouseUpItem.classList.contains('column')) {
  //   mouseUpItem.insertBefore(actualElement, mouseUpItem.lastElementChild);
  // }

  actualElement.classList.remove('dragged');
  actualElement = undefined;
  document.documentElement.removeEventListener('mouseup', onMouseUp);
  document.documentElement.removeEventListener('mouseover', onMouseOver);
  shadowCard.remove();
};

board.addEventListener('mousedown', (e) => {
  e.preventDefault();
  actualElement = e.target;

  actualElement.classList.add('dragged');

  document.documentElement.addEventListener('mouseup', onMouseUp);
  document.documentElement.addEventListener('mouseover', onMouseOver);
});

const buttonAdd = document.querySelectorAll('.buttonAdd');
buttonAdd.forEach((item) => {
  item.addEventListener('click', () => {
    const itemParent = item.parentNode;
    const addNew = itemParent.querySelector('.addNew');
    addNew.classList.remove('hidden');
  });
});

const newCards = document.querySelectorAll('.add');
newCards.forEach((item) => {
  item.addEventListener('click', () => {
    const itemParent = item.parentNode;
    const text = itemParent.querySelector('.text');

    itemParent.insertAdjacentHTML('beforebegin', `
    <div class="card">
    <div class="iconCard hidden"><div class="icon"></div></div>
    ${text.value}
    </div>
    `);

    itemParent.classList.add('hidden');
  });
});

column.forEach((item) => {
  const card = item.querySelectorAll('.card');
  card.forEach((elm) => {
    elm.addEventListener('mouseenter', () => {
      const iconCard = elm.querySelector('.iconCard');
      iconCard.classList.remove('hidden');
      const icon = iconCard.querySelector('.icon');
      icon.addEventListener('click', () => {
        elm.remove();
      });
    });
    elm.addEventListener('mouseleave', () => {
      const iconCard = elm.querySelector('.iconCard');
      iconCard.classList.add('hidden');
    });
  });
});
