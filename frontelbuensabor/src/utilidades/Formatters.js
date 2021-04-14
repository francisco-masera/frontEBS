export default class Formatter {
  formatMoney = (money) => {
    const formatter = new Intl.NumberFormat("es-Ar", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
    return formatter.format(parseFloat(money));
  };

  formatNumber = (n) => {
    let numberStrArray = String(n).split("");
    numberStrArray = numberStrArray.map((e) => (e == "," ? (e = ".") : e));
    return Math.round(parseFloat(numberStrArray.join("")) * 10) / 10;
  };

  formatHour = (hour) => {
    if (hour == null)
      return "";
    let timeArr = hour.split(':');
    let hh = parseInt(timeArr[0]) + 3;
    hh = hh.toString();
    let mm = timeArr[1];
    let ss = timeArr[2];

    return new String(hh + ":" + mm + ":" + ss);
  }
}
