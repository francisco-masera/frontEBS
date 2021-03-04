export default class Validaciones {
  esCadena = (s) => {
    return typeof s == "string";
  };

  esNumero = (n) => {
    return typeof n == "number";
  };

  esFecha = (d) => {
    return d instanceof Date;
  };

  menorOIgualFechaActual = (mes, dia, fechaActual) => {
    let esMesValido = () => mes <= fechaActual.getMonth();
    if (esMesValido()) {
      let esDiaValido = () => dia <= fechaActual.getDate();
      if (esDiaValido()) return true;
    }
    return false;
  };

  noEsMayorAFechaActual = (d) => {
    if (this.esFecha(d)) {
      let hoy = new Date();
      let esAnioValido = () => d.getFullYear() <= hoy.getFullYear();
      if (esAnioValido(d.getMonth(), d.getDate(), hoy)) return true;
      else return "La fecha no puede ser mayor a la actual";
    } else return "La fecha no tiene el formato correcto";
  };

  emailValido = (email) => {
    var regExp = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  };

  isAlpha = (exp) => {
    return /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/.test(exp);
  };
}
