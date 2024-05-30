import HelpDesk from './HelpDesk';

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

      xhr.open('POST', 'http://localhost:7070?method=createTicket');
      xhr.send(data);
      inputName.value = '';
      inputdescription.value = '';
      addForm.style.display = 'none';
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
        xhr.open('GET', `http://localhost:7070/?method=deleteById&id=${boxId}`);
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

            xhr.open('POST', `http://localhost:7070?method=updateById&id=${boxId}`);
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
