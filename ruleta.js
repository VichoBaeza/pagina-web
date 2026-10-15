let saldoActual = 1000;
const textoSaldo = document.getElementById('saldoUsuario');
const mensajeExito = document.getElementById('mensajeExito');

document.getElementById('formDeposito').addEventListener('submit', function(e) {
    e.preventDefault(); 
    let monto = parseInt(document.getElementById('deposito').value);
    
    saldoActual += monto; 
    textoSaldo.innerText = saldoActual;
    document.getElementById('deposito').value = '';
    
    mensajeExito.innerText = "¡Fichas añadidas correctamente!";
    mensajeExito.classList.remove('d-none');
    setTimeout(() => {
        mensajeExito.classList.add('d-none');
    }, 3000); 
});
