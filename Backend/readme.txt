// Primeiro, estamos importando algumas coisas que precisamos para o nosso programa.
import express from "express"; // Estamos usando o Express, que é uma biblioteca para criar aplicativos da web.
import bodyParser from "body-parser"; // Isso nos ajuda a entender as informações enviadas pelo usuário.
import axios from "axios"; // Vamos usar o Axios para fazer solicitações à internet.

// Agora, estamos configurando nosso aplicativo Express e escolhendo a porta onde ele será executado.
const app = express(); // Criamos o nosso aplicativo.
const port = 3000; // Escolhemos a porta 3000 para o nosso aplicativo.

// Aqui, estamos dizendo ao nosso aplicativo para usar arquivos na pasta "public".
app.use(express.static("public"));

// Também estamos configurando o nosso aplicativo para entender dados enviados pelos usuários.
app.use(bodyParser.urlencoded({ extended: true }));

// Agora, começamos a configurar o que acontece quando alguém visita a página inicial do nosso aplicativo.
app.get("/", async (req, res) => {
  try {
    // Aqui, estamos fazendo uma solicitação à internet para um site chamado "https://bored-api.appbrewery.com/random".
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data; // Pegamos os dados que recebemos desse site.
    console.log(result); // Mostramos esses dados no console (uma espécie de tela para desenvolvedores).
    res.render("solution.ejs", { data: result }); // Mostramos os dados para o usuário em uma página chamada "solution.ejs".
  } catch (error) {
    // Se algo der errado, mostramos uma mensagem de erro.
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: error.message,
    });
  }
});

// Agora, configuramos o que acontece quando alguém envia um formulário (post) para a nossa página inicial.
app.post("/", async (req, res) => {
  try {
    console.log(req.body); // Mostramos os dados enviados pelo usuário no console.
    const type = req.body.type; // Pegamos o tipo de atividade que o usuário escolheu.
    const participants = req.body.participants; // Pegamos quantos participantes o usuário escolheu.

    // Fazemos outra solicitação à internet, desta vez com base nas escolhas do usuário.
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data; // Pegamos os dados dessa solicitação.
    console.log(result); // Mostramos esses dados no console.

    // Mostramos uma atividade aleatória para o usuário com base nos dados que recebemos.
    res.render("solution.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    // Se algo der errado, mostramos uma mensagem de erro.
    console.error("Failed to make request:", error.message);
    res.render("solution.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

// Finalmente, estamos dizendo ao nosso aplicativo para escutar na porta que escolhemos.
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
