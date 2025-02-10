const $ = require("jquery");

$(document).ready(function () {
  
  //VARIÁVEIS
  const startPomodoro = $("#startPomodoro");
  const restPomodoro = $("#startRest");
  var numbers = $("#setTimer");
  var tempo = $("#tempo"); 
  var show = $("#show");

  // VALORES EM TEMPO
  const pomodoro30 = 1800;
  const pomodoro25 = 1500;
  const pomodoro05 = 300;

  var timer30 = pomodoro30;
  var timer25 = pomodoro25;
  var timer05 = pomodoro05;
  var times = 0;
  var newGame = 1;

  //   DESCANSO
  var rest = false;
  var longRest = false;

  //BOSSES

  function escolherBosses() {
    let bosses = [
      "crucible",
      "godrick",
      "malenia",
      "maliketh",
      "margit",
      "radagon",
      "radahn",
      "rickyard",
      "mohg",
    ];

    let numbers = new Set();
    while (numbers.size < 4) {
      // Agora gera apenas 4 números únicos
      numbers.add(Math.floor(Math.random() * bosses.length)); // Índices válidos de 0 a bosses.length - 1
    }

    let bossFight = [...numbers].map((index) => bosses[index]); // Pega os elementos pelos índices sorteados

    return bossFight;
  }
  function criarBosses() {
    var escolhidos = escolherBosses();
    $("#bosses").show().addClass("display", "flex");
    escolhidos.forEach((bosses, index) => {
      $("#boss" + index).html(`<img src='./assets/${bosses}.png'></img>`);
    });
    return escolhidos;
  }
  
  function mostrarTempo(tempo) {
    var minutos = Math.floor(tempo / 60);
    var segundos = (tempo % 60);
    
    minutos = minutos < 10 ? `0${minutos}` : minutos;
    segundos = segundos < 10 ? `0${segundos}` : segundos;

    return $("#tempo").html(`${minutos}:${segundos}`)
  }

  if (times == 0) {
    var escolhidos = criarBosses();
    $("#timer").css("width", "80%");
  }
  //   INICIAR POMODORO
  startPomodoro.on("click", function () {
    if (times == 0) {
      $("#timer").css("width", "80%");
    }
    console.log(escolhidos);
    var fighting = setInterval(function () {
      if (timer25 > 0) {
        startPomodoro.hide();
        timer25--;
        mostrarTempo(timer25) 
      } else {
        numbers.hide();
        clearInterval(fighting);
        $(`#boss${times} img`).css({
          "-webkit-filter": "grayscale(100%)",
          filter: "grayscale(100%)",
        });
        timer25 = pomodoro25;
        $("#message").html(
          `<p>You defeat <b>${escolhidos[times]}</b>, it's time to rest now</p>`
        );
        times++;
        if (times == 4) {
          $("#message").html(`
            <p>You defeat <b>${escolhidos[3]}</b> and you are the <b>Elden Lord</b> now, rest again for a while until start NG${newGame}</p>`);
          startLongRest();
        } else {
          startRest();
        }
      }
    }, 1000);
  });
  // DESCANSO CURTO
  function startRest() {
    console.log(times);
    restPomodoro.show();
    restPomodoro.off("click").on("click", function () {
      restPomodoro.hide();
      $("#message").empty();
      var restTimer = setInterval(function () {
        if (timer05 > 0) {
          numbers.show();
          timer05--;
          mostrarTempo(timer05)
        } else {
          clearInterval(restTimer);
          tempo.empty()
          timer05 = pomodoro05;
          startPomodoro.show();
        }
      }, 1000);
    });
  }
  // DESCANSO LONGO
  function startLongRest() {
    startPomodoro.hide();
    restPomodoro.show();
    restPomodoro.off("click").on("click", function () {
      $("#bosses").hide();
      $("#timer").css("width", "80%");
      restPomodoro.hide();
      $("#bosses img").remove();
      $("#message").empty();
      var restTimer = setInterval(function () {
        if (timer30 > 0) {
          numbers.show();
          timer30--;
          mostrarTempo(timer30)
        } else {
          clearInterval(restTimer);
          times++;
          tempo.empty()
          timer30 = pomodoro30;
          times = 0;
          newGame++;
          rest = false;
          escolhidos = criarBosses();
          startPomodoro.show();
          $("#bosses").show();
        }
      }, 1000);
    });
  }
});
