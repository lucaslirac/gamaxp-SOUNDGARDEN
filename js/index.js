let count = 1;
document.querySelector("#radio1").checked = true;

setInterval( function(){
    nextImage();
}, 4000);

function nextImage(){
    count++;
    if(count>4){
        count = 1;
    }

    document.getElementById("radio"+count).checked = true;
}



const indexHTML = document.querySelector("main");
indexHTML.innerHTML += `<div id="addReservaModal" id_evento class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="addReservaModalLabel">Reserva de ingressos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <form id="reserva" class="col-12">
              <input type="hidden" name="event_id" id="id" value="" />
            <form method="post" id="insert_form">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Nome</label>
                    <div class="col-sm-10">
                        <input data-name="nome" type="text" class="form-control" id="nome" placeholder="Nome completo">
                    </div>
                </div>
<br>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">E-mail</label>
                    <div class="col-sm-10">
                        <input name="email" type="email" class="form-control" id="email"
                            placeholder="Seu melhor e-mail">
                    </div>
                </div>
                <input type="hidden" name="tickets" id="tickets">
                <input type="hidden" name="id" data-id="inputId" id="id">
                <div class="form-group row">
                    <div class="col-sm-10">
                    <br>
                        <input type="submit" name="CadUser" id="CadUser" value="Confirmar reserva"
                            class="btn btn-dark">
                    </div>
                </div>
            </form>
            </form>
        </div>
    </div>
</div>
</div>`;
console.log(indexHTML);

const url = "https://xp41-soundgarden-api.herokuapp.com";
const eventosLista = document.querySelector("#eventos");

const listarEventos = async () => {
  const response = await fetch(`${url}/events`, {
    method: "GET",
    redirect: "follow",
  });
  const eventos = await response.json();

  let novaLista = "";

  for (let index = 0; index < 3; index++) {
    novaLista = `<article class="evento card p-5 m-3"><h2>${eventos[index].name}</h2>
    <h4>${eventos[index].attractions}</h4>
    <p>${eventos[index].description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>`;
  }
  eventosLista.innerHTML = novaLista;

  for (let index = 0; index < 2; index++) {
    novaLista = `<article class="evento card p-5 m-3"><h2>${eventos[index].name}</h2>
    <h4>${eventos[index].attractions}</h4>
    <p>${eventos[index].description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>`;
  }
  eventosLista.innerHTML += novaLista;

  for (let index = 0; index < 1; index++) {
    novaLista = `<article class="evento card p-5 m-3"><h2>${eventos[index].name}</h2>
    <h4>${eventos[index].attractions}</h4>
    <p>${eventos[index].description}</p>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addReservaModal">
        reservar ingresso
      </button>`;
  }
  eventosLista.innerHTML += novaLista;
};

listarEventos();

//MODAL
const modalReserva = document.getElementById("addReservaModal");

const formReserva = modalReserva.querySelector("form");

formReserva.addEventListener("submit", (event) => {
  event.preventDefault();

  const dados = {
    owner_name: document.getElementById('nome').value,
    owner_email: document.getElementById('email').value,
    number_tickets: 1,
    event_id: "",
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
      window.location.replace("index.html")
    })
    .catch((error) => console.log(error.message));
});