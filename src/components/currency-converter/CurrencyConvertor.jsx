import React from 'react';

const CurrencyConverter = ({ currencyOptions, selectedCurrency, onChangeCurrency, amount, onChangeAmount }) => {
  return (
    <div>
      <input className='input' type="number" value={amount || ''} onChange={onChangeAmount} />
      <select className='dropDown' value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => (
          <option key={`${option}-${index}`} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default CurrencyConverter;
