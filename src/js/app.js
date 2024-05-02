import HelpDesk from './HelpDesk';

const root = document.getElementById('root');

const app = new HelpDesk(root);

app.init();


const addForm = document.querySelector('.addForm');
const newTicket = document.querySelector('.add-button');
newTicket.addEventListener('click', () => {
    console.log("click");
    if(addForm.style.display == 'none'){
        addForm.style.display = 'flex';
    } else {
        addForm.style.display = 'none';
    }
});

