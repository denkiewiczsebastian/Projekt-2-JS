async function getExchangeRate(currencyCode) {
  const url = `https://api.nbp.pl/api/exchangerates/rates/a/${currencyCode}/?format=json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Wystąpił błąd podczas pobierania kursu waluty.");
  }
  const data = await response.json();
  const rate = data?.rates?.[0]?.mid;
  return rate;
}

async function convertToPLN() {
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) {
    alert("Wprowadź poprawną kwotę (większą od 0).");
    return;
  }

  const currencySelect = document.getElementById("currency");
  const selectedCurrency = currencySelect.value;

  try {
    const exchangeRate = await getExchangeRate(selectedCurrency);

    if (exchangeRate !== undefined) {
      const plnAmount = amount * exchangeRate;

      const resultElement = document.getElementById("result");
      resultElement.textContent = `${amount.toFixed(
        2
      )} ${selectedCurrency.toUpperCase()} = ${plnAmount.toFixed(2)} PLN`;
    } else {
      alert("Wystąpił błąd podczas pobierania kursu waluty.");
    }
  } catch (error) {
    alert("Wystąpił błąd: " + error.message);
  }
}

const convertBtn = document.getElementById("convertBtn");
convertBtn.addEventListener("click", (event) => {
  event.preventDefault();
  convertToPLN();
});
