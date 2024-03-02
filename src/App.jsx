import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyConvertor from "./components/currency-converter/CurrencyConvertor";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [formCurrency, setFormCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRates, setExchangeRates] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFormCurrency, setAmountFormCurrency] = useState(true);

  let toAmount, formAmount;

  if (exchangeRates) {
    if (amountFormCurrency) {
      formAmount = amount;
      toAmount = amount * exchangeRates[toCurrency];
    } else {
      toAmount = amount;
      formAmount = amount / exchangeRates[formCurrency];
    }
  }

  // console.log(exchangeRates);

  useEffect(() => {
    const API_KEY = "5f5445e67faaf3548eb582b6";
    const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${formCurrency}`;

    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstCurrency = Object.keys(data.conversion_rates)[0];
        const options = [data.base_code, ...Object.keys(data.conversion_rates)];
        setCurrencyOptions(options);
        setFormCurrency(data.base_code);
        setToCurrency(firstCurrency);
        setExchangeRates(data.conversion_rates);
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFormCurrency(true);
  };

  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountFormCurrency(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: "center" }}>CONVERT</h1>
        <div className="data">
          <p>From</p>
          <CurrencyConvertor
            currencyOptions={currencyOptions}
            selectedCurrency={formCurrency}
            onChangeCurrency={(e) => setFormCurrency(e.target.value)}
            amount={formAmount}
            onChangeAmount={handleFromAmountChange}
          />
        </div>
        <div className="data">
          <p>To</p>
          <CurrencyConvertor
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={(e) => setToCurrency(e.target.value)}
            amount={toAmount}
            onChangeAmount={handleToAmountChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
