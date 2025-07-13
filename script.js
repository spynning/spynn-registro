document.getElementById("registroForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const datos = new FormData(form);

  const url = "https://script.google.com/macros/s/AKfycby111B.../exec"; // ← Cambialo por tu URL real

  try {
    const res = await fetch(url, {
      method: "POST",
      body: new URLSearchParams(datos),
    });

    const texto = await res.text();
    const mensaje = document.getElementById("mensaje");

    if (texto === "EXISTE") {
      mensaje.innerHTML = "⚠️ Esta cédula ya está registrada.";
      mensaje.className = "error";
    } else if (texto === "REGISTRADO") {
      mensaje.innerHTML = "✅ Registro exitoso. ¡Ya podés reservar tus clases!";
      mensaje.className = "ok";
      form.reset();
    } else {
      mensaje.innerHTML = "❌ Error inesperado.";
      mensaje.className = "error";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("mensaje").innerHTML = "❌ Error de conexión.";
    mensaje.className = "error";
  }
});
