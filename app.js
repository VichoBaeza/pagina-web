async function leerRespuesta(respuesta) {
  const datos = await respuesta.json().catch(() => ({
    mensaje: "El servidor no devolvió una respuesta JSON válida."
  }));
  if (!respuesta.ok) throw new Error(datos.mensaje || "Error HTTP " + respuesta.status);
  return datos;
}

document.addEventListener("alpine:init", () => {
  Alpine.data("listaUsuarios", () => ({
    usuarios: [], cargando: true, error: "",
    async cargar() {
      this.cargando = true;
      this.error = "";
      try {
        this.usuarios = await leerRespuesta(await fetch("/api/usuarios"));
      } catch (error) {
        this.error = error.message;
      } finally {
        this.cargando = false;
      }
    }
  }));

  Alpine.data("cuenta", (modo) => ({
    modo, usuario: "", clave: "", mensaje: "", error: false, enviando: false,
    async enviar() {
      this.mensaje = "";
      this.error = false;
      this.enviando = true;
      const ruta = this.modo === "registro" ? "/api/registro" : "/api/login";
      try {
        const respuesta = await fetch(ruta, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ usuario: this.usuario.trim(), clave: this.clave })
        });
        const datos = await leerRespuesta(respuesta);
        this.mensaje = datos.mensaje;
        this.usuario = "";
        this.clave = "";

        // Si el registro se guarda correctamente va a /login.html; si el login es correcto va al listado "/"
        const destino = this.modo === "registro" ? "/login.html" : "/";
        window.setTimeout(() => window.location.assign(destino), 1000);
      } catch (error) {
        this.error = true;
        this.mensaje = error.message;
      } finally {
        this.enviando = false;
      }
    }
  }));
});
