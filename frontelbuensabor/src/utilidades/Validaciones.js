function esCadena(s) {
  return typeof s == "string";
}

function esNumero(n) {
  return typeof n == "number";
}

function esFecha(d) {
  return d instanceof Date;
}

function menorOIgualFechaActual(mes, dia, fechaActual) {
  let esMesValido = () => mes <= fechaActual.getMonth();
  if (esMesValido()) {
    let esDiaValido = () => dia <= fechaActual.getDate();
    if (esDiaValido()) return true;
  }
  return false;
}

function noEsMayorAFechaActual(d) {
  if (esFecha(d)) {
    let hoy = new Date();
    let esAnioValido = () => d.getFullYear() <= hoy.getFullYear();
    if (esAnioValido(d.getMonth(), d.getDate(), hoy)) return true;
    else return "La fecha no puede ser mayor a la actual";
  } else return "La fecha no tiene el formato correcto";
}

function emailValido(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase());
}
