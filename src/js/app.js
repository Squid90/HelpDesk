import HelpDesk from './HelpDesk';
import { formatDateAndTime, urlServer } from './TicketService';

const root = document.getElementById('root');

const app = new HelpDesk(root);

app.init();

const addForm = document.querySelector('.addForm');
const newTicket = document.querySelector('.add-button');
const okNewTicket = document.querySelector('.ok-button');
newTicket.addEventListener('click', () => {
  if (addForm.style.display === 'none') {
    addForm.style.display = 'flex';

    okNewTicket.addEventListener('click', () => {
      // eslint-disable-next-line
      event.preventDefault();
      const xhr = new XMLHttpRequest();
      const createForm = document.querySelector('.addForm');
      const inputName = createForm.querySelector('.name');
      const inputdescription = createForm.querySelector('.description');
      const inputData = {
        name: inputName.value,
        description: inputdescription.value,
      };
      const data = JSON.stringify(inputData);

      xhr.open('POST', `${urlServer}?method=createTicket`);
      xhr.send(data);
      inputName.value = '';
      inputdescription.value = '';
      addForm.style.display = 'none';

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const newTxt = JSON.parse(xhr.responseText);

            const target = document.getElementById('root');
            target.innerHTML += `
  
                    <div class="box" style=" width: 100%; min-height: 50px; border: 1px solid black; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
                      <div class="container1" style="width: 5%;display: flex; align-items: center;">
                          <input type="checkbox" class="circle-checkbox" style="width: 16px; height: 16px; border-radius: 50%; border: 1px solid black; outline: none;">
                      </div>
                      <div class="container container2" style="width: 40%; height: 50px; display: flex; align-items: center;">
                        ${newTxt.name}
                      </div>
                      <div class="container containerX" style="display: flex; width: 20%; height: 50px; ">
                        <div class="content" style="display: none;">${newTxt.id}</div>
                      </div>
                      <div class="container container3" style="width: 25%; height: 50px; display: flex; align-items: center; justify-content: right;">
                          ${formatDateAndTime(newTxt.created)}
                      </div>
                      <div class="container4" style="width: 5%; text-align: right;">
                          <button class="round-button" style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 1px solid black; text-align: center;">E</button>
                      </div>
                      <div class="container5" style="width: 5%; text-align: right;">
                          <button class="round-button" style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 1px solid black; text-align: center;">X</button>
                      </div>
                      <div class="description"  style="display: none; width: 100%; margin-top: 5px; margin-bottom: 5px; border: 1px solid black; min-height: 30px;">
                      ${newTxt.description}
                      </div>
                    </div>
                    `;
          } catch (e) {
            console.error(e);
          }
        }
      });
    });
  } else {
    addForm.style.display = 'none';
  }
});
const cancelNewTicket = document.querySelector('.cancel-button');
cancelNewTicket.addEventListener('click', () => {
  // eslint-disable-next-line
  event.preventDefault();
  const createForm = document.querySelector('.addForm');
  const inputName = createForm.querySelector('.name');
  const inputdescription = createForm.querySelector('.description');
  inputName.value = '';
  inputdescription.value = '';
  addForm.style.display = 'none';
});

setTimeout(() => {
  const rootCard = document.querySelector('.root');
  const shortCard = rootCard.querySelectorAll('.box');
  shortCard.forEach((item) => {
    const container = item.querySelectorAll('.container');
    container.forEach((element) => {
      element.addEventListener('click', () => {
        const longCard = item.querySelector('.description');
        if (longCard.style.display === 'none') {
          longCard.style.display = 'flex';
        } else {
          longCard.style.display = 'none';
        }
      });
    });
  });
}, 1000);

setTimeout(() => {
  const xhr = new XMLHttpRequest();
  const rootCard = document.querySelector('.root');
  const shortCard = rootCard.querySelectorAll('.box');
  shortCard.forEach((item) => {
    const delButton = item.querySelectorAll('.container5');
    const boxId = item.querySelector('.content').textContent;
    delButton.forEach((element) => {
      element.addEventListener('click', () => {
        xhr.open('GET', `${urlServer}?method=deleteById&id=${boxId}`);
        xhr.send();
      });
    });
  });
}, 1000);

setTimeout(() => {
  const editForm = document.querySelector('.editForm');
  const okEditTicket = document.querySelector('.ok-edit-button');
  const rootCard = document.querySelector('.root');
  const shortCard = rootCard.querySelectorAll('.box');
  shortCard.forEach((item) => {
    const editButton = item.querySelectorAll('.container4');
    const shortName = item.querySelector('.container2');
    const longDescription = item.querySelector('.description');
    editButton.forEach((element) => {
      element.addEventListener('click', () => {
        if (editForm.style.display === 'none') {
          editForm.style.display = 'flex';
          const editInputName = editForm.querySelector('.edit-name');
          const editInputdescription = editForm.querySelector('.edit-description');
          const boxId = item.querySelector('.content').textContent;
          editInputName.value = shortName.textContent;
          editInputdescription.value = longDescription.textContent;

          okEditTicket.addEventListener('click', () => {
            // eslint-disable-next-line
            event.preventDefault();
            const xhr = new XMLHttpRequest();

            const inputEditData = {
              name: editInputName.value,
              description: editInputdescription.value,
            };
            const editData = JSON.stringify(inputEditData);

            xhr.open('POST', `${urlServer}?method=updateById&id=${boxId}`);
            xhr.send(editData);
            editInputName.value = '';
            editInputdescription.value = '';
            editForm.style.display = 'none';
          });
        } else {
          editForm.style.display = 'none';
        }
        const cancelEditTicket = document.querySelector('.cancel-edit-button');
        cancelEditTicket.addEventListener('click', () => {
          // eslint-disable-next-line
          event.preventDefault();
          const editInputName = editForm.querySelector('.edit-name');
          const editInputdescription = editForm.querySelector('.edit-description');
          editInputName.value = '';
          editInputdescription.value = '';
          editForm.style.display = 'none';
        });
      });
    });
  });
}, 1000);
