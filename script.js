let cartela = [];
    let numerosSorteados = [];
    let jogoTerminado = false;

    function gerarCartela() {
      const jogador = prompt("Digite o nome do jogador:");
      if (!jogador) return;

      const numeros = Array.from({ length: 75 }, (_, i) => i + 1).filter((n) => n !== 38);
      numeros.sort(() => Math.random() - 0.5);

      cartela = [];
      cartela.push(numeros.slice(0, 5));
      cartela.push(numeros.slice(5, 10));
      cartela.push(numeros.slice(10, 15));
      cartela.push(numeros.slice(15, 20));
      cartela.push(numeros.slice(20, 25));

      renderizarCartela(jogador);
      document.getElementById("jogador").textContent = `Jogador: ${jogador}`;

      document.querySelector(".botao:nth-of-type(1)").disabled = true;
      document.querySelector(".botao:nth-of-type(2)").disabled = false;
      document.querySelector(".botao:nth-of-type(3)").disabled = false;
    }

    function renderizarCartela(jogador) {
      const cartelaEl = document.getElementById("cartela");
      cartelaEl.innerHTML = "";

      for (let i = 0; i < 5; i++) {
        const coluna = document.createElement("div");
        coluna.classList.add("coluna");

        for (let j = 0; j < 5; j++) {
          const numero = document.createElement("div");
          numero.classList.add("numero");

          if (i === 2 && j === 2) {
            numero.textContent = "X";
          } else {
            numero.textContent = cartela[i][j];
          }

          coluna.appendChild(numero);
        }

        cartelaEl.appendChild(coluna);
      }
    }

    function reiniciar() {
      cartela = [];
      numerosSorteados = [];
      jogoTerminado = false;

      document.getElementById("jogador").textContent = "";
      document.querySelector(".numeros-sorteados ul").innerHTML = "";

      const numeros = document.querySelectorAll(".numero");

      numeros.forEach((numero) => {
        numero.classList.remove("marcado");
      });

      document.querySelector(".botao:nth-of-type(1)").disabled = false;
      document.querySelector(".botao:nth-of-type(2)").disabled = true;
      document.querySelector(".botao:nth-of-type(3)").disabled = true;
    }

    function jogar() {
      const numeros = Array.from({ length: 75 }, (_, i) => i + 1).filter((n) => n !== 38);
      numeros.sort(() => Math.random() - 0.5);

      const numerosSorteadosEl = document.querySelector(".numeros-sorteados ul");

      let contador = 0;

      const intervalo = setInterval(() => {
        const numeroSorteado = numeros[contador];
        numerosSorteados.push(numeroSorteado);

        const li = document.createElement("li");
        li.textContent = numeroSorteado;
        numerosSorteadosEl.appendChild(li);

        marcarNumero(numeroSorteado);

        if (verificarVitoria()) {
          jogoTerminado = true;
          clearInterval(intervalo);
          alert("Bingo! Você venceu!");
        }

        if (contador === 74 || jogoTerminado) {
          clearInterval(intervalo);
          alert("Jogo Terminado!");
        }

        contador++;
      }, 1000);

      document.querySelector(".botao:nth-of-type(1)").disabled = true;
      document.querySelector(".botao:nth-of-type(2)").disabled = false;
      document.querySelector(".botao:nth-of-type(3)").disabled = true;
    }

    function marcarNumero(numero) {
      const numerosEl = document.querySelectorAll(".numero");

      numerosEl.forEach((numeroEl) => {
        if (numeroEl.textContent === numero.toString()) {
          numeroEl.classList.add("marcado");
        }
      });
    }

    function verificarVitoria() {
      const linhas = document.querySelectorAll(".cartela .coluna");

      // Verificar linhas
      for (let i = 0; i < 5; i++) {
        const linhaCompleta = Array.from(linhas[i].children).every((numeroEl) =>
          numeroEl.classList.contains("marcado")
        );

        if (linhaCompleta) {
          return true;
        }
      }

      // Verificar colunas
      for (let i = 0; i < 5; i++) {
        const colunaCompleta = Array.from(linhas).every((linha) =>
          linha.children[i].classList.contains("marcado")
        );

        if (colunaCompleta) {
          return true;
        }
      }

      // Verificar diagonais
      const diagonalCompleta1 = Array.from(linhas).every((linha, i) =>
        linha.children[i].classList.contains("marcado")
      );
      if (diagonalCompleta1) {
        return true;
      }

      const diagonalCompleta2 = Array.from(linhas).every((linha, i) =>
        linha.children[4 - i].classList.contains("marcado")
      );
      if (diagonalCompleta2) {
        return true;
      }

      return false;
    }