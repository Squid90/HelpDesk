/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */

const xhr = new XMLHttpRequest();
export default class TicketService {
  
    list(callback) {

      xhr.open('GET', 'http://localhost:7070/?method=allTickets');

      xhr.send();
    }
  
    get(id, callback) {}
  
    create(data, callback) {}
  
    update(id, data, callback) {}
  
    delete(id, callback) {}

    
  }

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
});