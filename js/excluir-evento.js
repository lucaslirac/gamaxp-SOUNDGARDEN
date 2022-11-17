const url = "https://xp41-soundgarden-api.herokuapp.com";

const inputNome = document.querySelector("#nome");
const inputBanner = document.querySelector("#banner");
const inputAtracoes = document.querySelector("#atracoes");
const inputDescricao = document.querySelector("#descricao");
const inputData = document.querySelector("#data");
const inputLotacao = document.querySelector("#lotacao");
const formulario = document.querySelector("form");

const id = new URLSearchParams(window.location.search).get("id");

async function todosEventos() {
  const response = await fetch(`${url}/events/${id}`, {
    method: "GET",
    redirect: "follow",
    headers: { 
        "Content-Type": "application/json" 
    },
  });

  const eventos = await response.json();

  inputNome.value = eventos.name;
  inputBanner.value = eventos.poster;
  inputAtracoes.value = eventos.attractions;
  inputDescricao.value = eventos.description;
  inputData.value = eventos.scheduled;
  inputLotacao.value = eventos.number_tickets;

}

todosEventos();

formulario.onsubmit = async (evento) => {
  evento.preventDefault();

  const response = await fetch(`${url}/events/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json"
    },
    redirect: "follow",
  })
  .then(() => {
    alert("Evento excluído com sucesso");
    window.location.replace("admin.html");
  })
  .catch((error) => console.log(error.message));

};