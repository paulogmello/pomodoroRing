const $ = require("jquery");

$(document).ready(function () {
  //VARIÁVEIS
  const startPomodoro = $("#startPomodoro");
  const restPomodoro = $("#startRest");
  var numbers = $("#setTimer");
  var minutos = $("#minutos");
  var segundos = $("#segundos");
  var show = $("#show");

  // VALORES EM TEMPO
  const pomodoro30 = 1800;
  const pomodoro25 = 8;
  const pomodoro05 = 5;

  var timer30 = pomodoro30;
  var timer25 = pomodoro25;
  var timer05 = pomodoro05;
  var times = 0;

  //   DESCANSO
  var rest = false;
  var longRest = false;

  //BOSSES

  function escolherBosses() {
    let bosses = [
      "crucible",
      "godrick",
      "godrick",
      "malenia",
      "maliketh",
      "margit",
      "radagon",
      "radahn",
      "rickyard",
      "mohg",
      "crucible",
    ];

    let numbers = new Set();
    while (numbers.size < 4) {
      // Agora gera apenas 4 números únicos
      numbers.add(Math.floor(Math.random() * bosses.length)); // Índices válidos de 0 a bosses.length - 1
    }

    let bossFight = [...numbers].map((index) => bosses[index]); // Pega os elementos pelos índices sorteados

    return bossFight;
  }
  var escolhidos = escolherBosses();
  escolhidos.forEach((bosses, index) => {
    $("#boss" + index).html(`
        <img src='./assets/${bosses}.png'></img>
        `);
  });

  //   INICIAR POMODORO
  startPomodoro.on("click", function () {
    if (rest == false && times < 4) {
      var fighting = setInterval(function () {
        if (timer25 > 0) {
          startPomodoro.hide();
          timer25--;
          minutos.html((timer25 / 60).toFixed(0));
          segundos.html(timer25 % 60);
        } else {
          clearInterval(fighting);
          numbers.hide();
          rest = true;
          timer25 = pomodoro25;
          $(`#boss${times} img`).css({
            "-webkit-filter": "grayscale(100%)",
            filter: "grayscale(100%)",
          });
          $("#message").html(`
            <p>You beat <b>${escolhidos[times]}</b>, it's time to rest now</p>`);
          startRest();
        }
      }, 1000);
    } else {
      alert("hora do long Rest");
    }
  });
  function startRest() {
    restPomodoro.show();
    restPomodoro.off("click").on("click", function () {
      restPomodoro.hide();
      $("#message").empty();
      var restTimer = setInterval(function () {
        if (timer05 > 0) {
          numbers.show();
          timer05--;
          minutos.html((timer05 / 60).toFixed(0));
          segundos.html(timer05 % 60);
        } else {
          clearInterval(restTimer);
          minutos.empty();
          segundos.empty();
          timer05 = pomodoro05;
          times++;
          rest = false;
          startPomodoro.show();
        }
      }, 1000);
    });
  }
});
