async function getExchangeRate(currencyCode) {
  const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`;
  const response = await fetch(url);
  const data = await response.json();
  const rate = data.rates[0].mid;
  return rate;
}

async function convertToPLN() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount)) {
    alert("Wprowadź poprawną liczbę.");
    return;
  }

  const currencySelect = document.getElementById("currency");
  const selectedCurrency = currencySelect.value;

  const exchangeRate = await getExchangeRate(selectedCurrency);
  const plnAmount = amount * exchangeRate;

  const resultElement = document.getElementById("result");
  resultElement.textContent = `${amount.toFixed(
    2
  )} ${selectedCurrency.toUpperCase()} = ${plnAmount.toFixed(2)} PLN`;
}

const convertBtn = document.getElementById("convertBtn");
convertBtn.addEventListener("click", convertToPLN);
