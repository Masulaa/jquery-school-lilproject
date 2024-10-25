$(document).ready(function () {
  let jela = [
    { id: 1, ime: "Pizza", tip: "slano" },
    { id: 2, ime: "Cevapi", tip: "slano" },
    { id: 3, ime: "Krofna", tip: "slatko" },
    { id: 4, ime: "Torta", tip: "slatko" },
    { id: 5, ime: "Burek", tip: "slano" },
    { id: 6, ime: "Baklava", tip: "slatko" },
  ];

  // Funkcija za prikazivanje jela
  function prikaziJela(jela) {
    let html = "";
    jela.forEach(function (jelo) {
      html += `
          <div class="col-md-4 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${jelo.ime}</h5>
                  <button class="btn btn-success naruci-btn" data-id="${jelo.id}" data-name="${jelo.ime}">Naruci</button>
              </div>
            </div>
          </div>
        `;
    });
    $("#jela-lista").html(html); // Prikazivanje jela
  }

  // Prikaz svih jela na početku
  prikaziJela(jela);

  // Simulirani AJAX poziv za filtriranje jela
  function simuliraniAjax(tipJela) {
    return new Promise(function (resolve) {
      let filtriranaJela;
      if (tipJela === "slano") {
        filtriranaJela = jela.filter((jelo) => jelo.tip === "slano");
      } else if (tipJela === "slatko") {
        filtriranaJela = jela.filter((jelo) => jelo.tip === "slatko");
      } else {
        filtriranaJela = jela; // Sva jela
      }
      resolve(filtriranaJela);
    });
  }

  // Filtriranje jela po vrsti
  $("#slana-jela").click(function () {
    simuliraniAjax("slano").then(function (response) {
      prikaziJela(response);
    });
  });

  $("#slatka-jela").click(function () {
    simuliraniAjax("slatko").then(function (response) {
      prikaziJela(response);
    });
  });

  $("#sve-jelo").click(function () {
    simuliraniAjax("sva").then(function (response) {
      prikaziJela(response);
    });
  });

  // Narudžba jela sa jQuery animacijom
  $(document).on("click", ".naruci-btn", function () {
    let button = $(this);
    let imeJela = button.data("name");

    $("#imeJela").text(imeJela);

    button.animate(
      {
        width: "toggle",
        opacity: "toggle",
      },
      500,
      function () {
        button.animate(
          {
            width: "toggle",
            opacity: "toggle",
          },
          500,
          function () {
            $("#narudzbaModal").modal("show");
          }
        );
      }
    );
  });
});
