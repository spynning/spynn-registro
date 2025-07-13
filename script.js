const form = document.getElementById("registroForm");
const mensaje = document.getElementById("mensaje");

// 🔗 URL de tu Apps Script desplegado
const scriptURL = "https://script.google.com/macros/s/AKfycbw3ZTU7FgJ_bP1wfPgyEzio30gInFgg9PYXqRk4p0FOG WWEH2Im2d2_TEbFgB_qeLM/exec".replace(/\s/g, "");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const nombre = document.getElementById("nombre").value;
  const cedula = document.getElementById("cedula").value;
  const plan = document.getElementById("plan").value;

  mensaje.textContent = "Enviando...";
  mensaje.className = "";

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ nombre, cedula, plan }),
    });

    const texto = await res.text();
    
    if (texto === "EXISTE") {
      mensaje.textContent = "⚠️ Esta cédula ya está registrada.";
      mensaje.className = "error";
    } else if (texto === "REGISTRADO") {
      mensaje.textContent = "✅ Registro exitoso. ¡Ya podés reservar tus clases!";
      mensaje.className = "ok";
      form.reset();
    } else {
      mensaje.textContent = "❌ Error inesperado: " + texto;
      mensaje.className = "error";
    }
  } catch (error) {
    mensaje.textContent = "❌ Error de conexión. Revisá tu internet o el enlace del sistema.";
    mensaje.className = "error";
    console.error(error);
  }
});
