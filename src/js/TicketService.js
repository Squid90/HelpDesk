const xhr = new XMLHttpRequest();

export function formatDateAndTime(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}.${minutes}`;
}
export const urlServer = 'http://localhost:7070/';
export default class TicketService {
  // eslint-disable-next-line
  list() {
    xhr.open('GET', `${urlServer}?method=allTickets`);

    xhr.send();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          const target = document.getElementById('root');
          data.forEach((element) => {
            target.innerHTML += `

                  <div class="box" style=" width: 100%; min-height: 50px; border: 1px solid black; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;">
                    <div class="container1" style="width: 5%;display: flex; align-items: center;">
                        <input type="checkbox" class="circle-checkbox" style="width: 16px; height: 16px; border-radius: 50%; border: 1px solid black; outline: none;">
                    </div>
                    <div class="container container2" style="width: 40%; height: 50px; display: flex; align-items: center;">
                      ${element.name}
                    </div>
                    <div class="container containerX" style="display: flex; width: 20%; height: 50px; ">
                      <div class="content" style="display: none;">${element.id}</div>
                    </div>
                    <div class="container container3" style="width: 25%; height: 50px; display: flex; align-items: center; justify-content: right;">
                        ${formatDateAndTime(element.created)}
                    </div>
                    <div class="container4" style="width: 5%; text-align: right;">
                        <button class="round-button" style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 1px solid black; text-align: center;">E</button>
                    </div>
                    <div class="container5" style="width: 5%; text-align: right;">
                        <button class="round-button" style="display: inline-block; width: 30px; height: 30px; border-radius: 50%; border: 1px solid black; text-align: center;">X</button>
                    </div>
                    <div class="description"  style="display: none; width: 100%; margin-top: 5px; margin-bottom: 5px; border: 1px solid black; min-height: 30px;">
                    ${element.description}
                    </div>
                  </div>
                  `;
            console.log('done card');
          });
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
}
