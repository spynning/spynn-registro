// Script universal para validar e insertar datos en Google Sheets

const hojaID = 'TU_ID_DE_HOJA'; // reemplazá esto por tu ID real de la hoja
const nombreHoja = 'usuarios';
const urlJSON = https://opensheet.elk.sh/${hojaID}/${nombreHoja};

// --- VERIFICAR CÉDULA ---
document.addEventListener('DOMContentLoaded', () => {
  const cedulaInput = document.getElementById('cedula');
  const ingresarBtn = document.getElementById('ingresarBtn');

  if (ingresarBtn) {
    ingresarBtn.addEventListener('click', () => {
      const cedula = cedulaInput.value.trim();
      if (cedula === '') {
        alert('Por favor, ingresá tu cédula.');
        return;
      }

      fetch(urlJSON)
        .then(res => res.json())
        .then(data => {
          const existe = data.some(row => row.Cédula === cedula);
          if (existe) {
            window.location.href = 'https://lovespynn.github.io/spynn-reserva/';
          } else {
            alert('No estás registrad@. Por favor, completá el formulario de registro.');
            window.location.href = 'https://lovespynn.github.io/spynn-registro/registro.html';
          }
        })
        .catch(err => {
          console.error('Error:', err);
          alert('Error al verificar la cédula. Intentalo más tarde.');
        });
    });
  }

  // --- REGISTRO NUEVO ---
  const registrarBtn = document.getElementById('registrarBtn');

  if (registrarBtn) {
    registrarBtn.addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value.trim();
      const cedula = document.getElementById('cedula').value.trim();
      const plan = document.getElementById('plan').value;

      if (!nombre || !cedula || !plan) {
        alert('Por favor completá todos los campos.');
        return;
      }

      const formURL = 'TU_GOOGLE_FORM_URL'; // ← Reemplazá con el enlace al formulario de Google con formResponse
      const formData = new FormData();
      formData.append('entry.TU_CAMPO_1', nombre);   // campo nombre
      formData.append('entry.TU_CAMPO_2', cedula);   // campo cédula
      formData.append('entry.TU_CAMPO_3', plan);     // campo plan

      fetch(formURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }).then(() => {
        alert('¡Registro exitoso!');
        window.location.href = 'https://lovespynn.github.io/spynn-registro/';
      }).catch(err => {
        alert('Ocurrió un error al registrar. Intentalo de nuevo.');
      });
    });
  }
});
