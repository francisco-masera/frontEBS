export default class Formatter {
  formatMoney = (money) => {
    const formatter = new Intl.NumberFormat("es-Ar", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
    return formatter.format(money);
  };
}
