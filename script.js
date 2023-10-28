// callback function runs when the DOM has finished loading
document.addEventListener("DOMContentLoaded", function () {
  const amount = document.getElementById("amountInput");
  const currency = document.getElementById("currencySelect");
  const convert = document.getElementById("convertButton");
  const result = document.getElementById("resultContainer");
  const exchangeRateInfo = document.getElementById("exchangeRateInfo");

  // Create a div for the horizontal line
  const separator = document.createElement("div");
  separator.style.borderTop = "1px solid #ccc";
  separator.style.marginTop = "30px";
  separator.style.maxWidth = "734px";

  // Append the separator div between exchangeRateInfo and resultContainer
  exchangeRateInfo.parentNode.insertBefore(separator, result);

  // Function to show the loader and hide the button text
  const showLoader = () => {
    convert.innerText = "Converting...";
    convert.disabled = true;
  };

  // Function to hide the loader and show the button text
  const hideLoader = () => {
    convert.innerText = "Convert to SEK";
    convert.disabled = false;
  };

  const displayResultAndExchangeRate = (amountTotal, currencyTotal, rate) => {
    const resultPrice = amountTotal * rate;

    // Display "Result" in bold before the result
    result.innerHTML = `RESULT<br>${amountTotal} ${currencyTotal} = ${resultPrice.toFixed(
      2
    )} SEK`;

    // Display the exchange rate calculation
    exchangeRateInfo.innerHTML = `1 ${currencyTotal} = ${(1 / rate).toFixed(
      4
    )} SEK`;
  };

  // Event listener for the "Convert" button click
  convert.addEventListener("click", () => {
    const amountTotal = amount.value;
    const currencyTotal = currency.value;

    showLoader();

    // Make a request to the server's endpoint
    fetch(
      `https://currency-exchange-kappa-swart.vercel.app/convert?amount=${amountTotal}&currency=${currencyTotal}`
    )
      .then((response) => response.json())
      .then((data) => {
        const resultPrice = data.resultPrice;
        displayResultAndExchangeRate(amountTotal, currencyTotal, resultPrice);
      })
      .catch((error) => {
        console.log("Request failed", error);
        result.innerHTML = "An error occurred, please try again";
      })
      .finally(() => {
        hideLoader();
      });
  });
});
