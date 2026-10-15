document.getElementById('formRegistro').addEventListener('submit', function(evento) {
  evento.preventDefault();
    
    let pass1 = document.getElementById('password').value;
    let pass2 = document.getElementById('password_confirm').value;
    let errorMsg = document.getElementById('errorMsg');

    if (pass1 !== pass2) { 
        errorMsg.classList.remove('d-none'); 
    } else {
        errorMsg.classList.add('d-none');
        alert("Registro exitoso. (Simulación completada)"); 
        window.location.href = "index.html";
    }
});
