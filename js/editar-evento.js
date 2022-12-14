const SOUND_URL = 'https://xp41-soundgarden-api.herokuapp.com/events';

const buscaParametro = () => {

    const url = new URL(window.location.href);

    const id = url.searchParams.get('id');

    return id;
}

const exibirEvento = async () => {
    const dadosEvento =
        await fetch(SOUND_URL + "/" + buscaParametro(), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json());

    console.log(dadosEvento);

    const inputNome = document.getElementById("nome");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao = document.getElementById("lotacao");
    const inputBanner = document.getElementById("banner");

    inputNome.value = dadosEvento.name;
    inputAtracoes.value = dadosEvento.attractions.join(', ');
    inputBanner.value = dadosEvento.poster;
    inputDescricao.value = dadosEvento.description;
    inputData.value = dadosEvento.scheduled;
    inputLotacao.value = dadosEvento.number_tickets;
}
 exibirEvento();

const formEditar = document.getElementById("cadastro-evento");

formEditar.addEventListener("submit", async (event) => {

    event.preventDefault();

    const inputNome = document.getElementById("nome");
    const inputAtracoes = document.getElementById("atracoes");
    const inputDescricao = document.getElementById("descricao");
    const inputData = document.getElementById("data");
    const inputLotacao = document.getElementById("lotacao");
    const inputBanner = document.getElementById("banner");

    const fullDateTime = new Date(inputData.value);

    const eventoAtualizadoObj = {
        "name": inputNome.value,
        "poster": inputBanner.value,
        "attractions": inputAtracoes.value.split(","),
        "description": inputDescricao.value,
        "scheduled": fullDateTime.toISOString(),
        "number_tickets": inputLotacao.value
    };

    const eventoAtualizadoJSON = JSON.stringify(eventoAtualizadoObj);

    const resposta = await fetch(SOUND_URL + "/" + buscaParametro(), {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: eventoAtualizadoJSON
    }).then((response) => {
        return response.json();
    }).then((responseOBJ) => {
        alert("Evento editado com sucesso");
        window.location.replace('admin.html');
    });

});