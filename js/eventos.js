// EVENTOS
const eventosContainer = document.querySelector('#eventocontainer');
const url = "https://xp41-soundgarden-api.herokuapp.com";

async function listaEventos() {
    const response = await fetch(
      `https://xp41-soundgarden-api.herokuapp.com/events`,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
  
    const eventos = await response.json();

    eventos.forEach( evento => {
        const cardEventos = `
        <article class="evento card p-5 m-3">
        <h2>${evento.name}</h2>
        <h4>${evento.attractions}</h4>
        <p>${evento.description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>
        </article>`
   
        eventosContainer.innerHTML += cardEventos;
    });
  }
  
listaEventos();

//MODAL
const modalReserva = document.getElementById("addReservaModal");
const formReserva = modalReserva.querySelector("form");

const params = new URLSearchParams(location.search)
  params.get('id');

formReserva.addEventListener("submit", (event) => {
  event.preventDefault();

  const dados = {
    owner_name: document.getElementById('nome').value,
    owner_email: document.getElementById('email').value,
    number_tickets: 1,
    event_id: ""
    }; 

  fetch(`${url}/bookings/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then(() => {
      alert("Reserva feita com sucesso");
      window.location.replace("eventos.html")
    })
    .catch((error) => console.log(error.message));
});