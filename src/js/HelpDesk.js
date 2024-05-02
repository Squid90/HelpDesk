import TicketService from './TicketService';

export default class HelpDesk {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = new TicketService();

    function init() {
      this.ticketService.list();
    }

    this.init = init;
  }
}
