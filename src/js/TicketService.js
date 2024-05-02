const xhr = new XMLHttpRequest();
export default class TicketService {
  
    list(callback) {

      xhr.open('GET', 'http://localhost:7070/?method=allTickets');

      xhr.send();

      function formatDateAndTime(timestamp) {
        const date = new Date(timestamp);
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}.${month}.${year} ${hours}.${minutes}`;
      }

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const data = JSON.parse(xhr.responseText);
                
                let target = document.getElementById('root');
                data.forEach(element => {
                  target.innerHTML += `

                  <div class="container" style=" width: 100%; height: 50px; border: 1px solid black; display: flex; align-items: center; justify-content: space-between;">
                    <div class="container1" style="width: 5%;display: flex; align-items: center;">
                        <input type="checkbox" class="circle-checkbox" style="width: 16px; height: 16px; border-radius: 50%; border: 1px solid black; outline: none;">
                    </div>
                    <div class="container2" style="width: 40%;display: flex; align-items: center;">
                      <div>${element.name}</div>
                    </div>
                    <div class="containerX" style="display: flex; width: 20%;">
                      
                    </div>
                    <div class="container3" style="width: 25%;text-align: right;">
                        <div>${formatDateAndTime(element.created)}</div>
                    </div>
                    <div class="container4" style="width: 5%; text-align: right;">
                        <button class="round-button" style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 1px solid black; text-align: center;">E</button>
                    </div>
                    <div class="container5" style="width: 5%; text-align: right;">
                        <button class="round-button" style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 1px solid black; text-align: center;">X</button>
                    </div>
                  </div>
                  `
                });
 
            } catch (e) {
                console.error(e);
            }
        }
      });
    }

    get(id, callback) {}
  
    create(data, callback) {}
  
    update(id, data, callback) {}
  
    delete(id, callback) {}

    
  }

  