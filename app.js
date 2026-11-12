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
      
      const token = sessionStorage.getItem("jwt");
      if (!token) {
          this.error = "Debes iniciar sesión para ver los usuarios registrados.";
          this.cargando = false;
          return;
      }

      try {
        const respuesta = await fetch("/api/usuarios", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        this.usuarios = await leerRespuesta(respuesta);
      } catch (error) {
        this.error = error.message;
        if (error.message.includes('vencido') || error.message.includes('inválido')) {
            sessionStorage.removeItem("jwt");
        }
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
        
        if (this.modo === "login" && datos.token) {
            sessionStorage.setItem("jwt", datos.token);
        }

        this.usuario = "";
        this.clave = "";

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