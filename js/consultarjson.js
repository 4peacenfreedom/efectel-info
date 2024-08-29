export function MostrarDatosEnConsola() {
  MostrarDatosConfiguracion();
}

function MostrarDatosConfiguracion() {
  // Truco !Fetch url

  let url = "/js/configuraciones.json";
  fetch(url)
    .then((response) => response.json())

    .then((data) => console.log(data));
}
