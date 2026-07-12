
const seleccionarMesa = (numero) => {
  // Guardamos en localStorage o pasamos por navegación
  localStorage.setItem("mesaSeleccionada", numero);
  navigate("/tomar-pedido"); 
};