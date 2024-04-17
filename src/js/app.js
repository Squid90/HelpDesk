import HelpDesk from './HelpDesk';

const root = document.getElementById('root');

const app = new HelpDesk(root);

const xhr = new XMLHttpRequest();

app.init();


