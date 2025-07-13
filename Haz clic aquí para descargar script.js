
document.addEventListener('DOMContentLoaded', function () {
    const cedulaInput = document.getElementById('cedula');
    const ingresarBtn = document.getElementById('ingresar');

    ingresarBtn.addEventListener('click', function () {
        const cedula = cedulaInput.value.trim();
        if (cedula === '') {
            alert('Por favor, ingresá tu cédula.');
            return;
        }

        const url = `https://docs.google.com/spreadsheets/d/1eyR28yjZTln-yZ5kbsr-XCMcV5D9arCN8fVDK4mMFjA/gviz/tq?tqx=out:json&sheet=Registro`;

        fetch(url)
            .then(response => response.text())
            .then(data => {
                const jsonData = JSON.parse(data.substr(47).slice(0, -2));
                const rows = jsonData.table.rows;

                const persona = rows.find(row => row.c[0] && row.c[0].v === cedula);

                if (!persona) {
                    alert('No estás registrad@. Por favor, completá el formulario de registro.');
                    window.location.href = 'https://lovespynn.github.io/spynn-registro/registro.html';
                } else {
                    window.location.href = 'https://lovespynn.github.io/spynn-reserva/';
                }
            })
            .catch(error => {
                console.error('Error al consultar la hoja:', error);
                alert('Ocurrió un error al verificar tu cédula. Intentalo de nuevo.');
            });
    });
});
