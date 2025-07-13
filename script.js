const cedulaInput = document.getElementById('cedula');
const ingresarBtn = document.getElementById('ingresarBtn');

ingresarBtn.addEventListener('click', function () {
  const cedula = cedulaInput.value.trim();

  if (cedula === '') {
    alert('Por favor, ingresá tu cédula.');
    return;
  }

  const url = 'https://docs.google.com/spreadsheets/d/1eyR28yJZ1In-Y25kbsr-XCMcV5D9ARCN8fDVdK4mMFJA/gviz/tq?tqx=out:json&sheet=Base';

  fetch(url)
    .then(response => response.text())
    .then(data => {
      const jsonData = JSON.parse(data.substr(47).slice(0, -2));
      const rows = jsonData.table.rows;

      const persona = rows.find(row => row.c && row.c[0] && row.c[0].v === cedula);

      if (!persona) {
        alert('No estás registrad@. Por favor, completá el formulario de registro.');
        window.location.href = 'https://lovespynn.github.io/spynn-registro/registro.html';
      } else {
        window.location.href = 'https://lovespynn.github.io/spynn-reserva/';
      }
    })
    .catch(error => {
      console.error('Error al consultar la hoja:', error);
      alert('Ocurrió un error al verificar tu cédula. Intentá de nuevo.');
    });
});
