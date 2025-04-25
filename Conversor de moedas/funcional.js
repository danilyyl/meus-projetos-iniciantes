async function converter() {
  const moeda = document.getElementById("moeda").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const resultado = document.getElementById("resultado");

  if (!isNaN(valor)) {
    let codigoMoeda = "";

    switch (moeda) {
      case "dolar":
        codigoMoeda = "USD";
        break;
      case "euro":
        codigoMoeda = "EUR";
        break;
      case "iene":
        codigoMoeda = "JPY";
        break;
      case "libra":
        codigoMoeda = "GBP";
        break;
    }

    console.log("Moeda selecionada:", moeda);
    console.log("Código da moeda:", codigoMoeda);

    try {
      
      const url = `https://open.er-api.com/v6/latest/${codigoMoeda}?apikey=95444f33b72831877f523f569de8ee51`;

      const resposta = await fetch(url, {
        method: "GET",
        mode: "cors"
      });

      const dados = await resposta.json(); 
      console.log("Resposta da API:", dados);

      if (dados && dados.rates && dados.rates.BRL) {
        
        const taxa = dados.rates.BRL;
        const convertido = valor * taxa;
        resultado.innerHTML = `R$ ${convertido.toFixed(2)}`;
      } else {
        console.error("Erro da API:", dados.error);
        resultado.innerHTML = "Erro ao converter moeda.";
      }
    } catch (erro) {
      console.error("Erro na requisição:", erro);
      resultado.innerHTML = "Erro ao acessar a taxa de câmbio.";
    }

  } else {
    resultado.innerHTML = "Digite um valor válido.";
  }
}

// Limpa o resultado se o usuário apagar o número
document.getElementById("valor").addEventListener("input", function () {
  if (this.value === "") {
    document.getElementById("resultado").innerHTML = "Aguardando conversão...";
  }
});



  
  