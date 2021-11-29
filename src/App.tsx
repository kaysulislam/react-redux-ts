import React from 'react';
import './App.css';
import { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators, State } from './state';

function App() {
  const dispatch = useDispatch();
  const { depositMoney, withdrawMoney, bankrupt } = bindActionCreators(actionCreators, dispatch)
  const amount = useSelector((state: State) => state.bank)
  
  const [deposit, setDeposit] = useState<number>(0);
  const [withdraw, setWithdraw] = useState<number>(0);

  const handleDeposit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    depositMoney(deposit)
  }

  const handleWithdraw = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (withdraw <= amount)? withdrawMoney(withdraw): alert("Insufficient fund")
  }

  const handleBankrupt = () => {
    bankrupt()
  }

  return (
    <div className="App">
      <h1>Available Balance: {amount}</h1>
      <form onSubmit={handleDeposit}>
        <input
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          type="text"
          placeholder="Deposit Amount"
          className="input"
        />
        <button type="submit" className="btn">Submit</button>
      </form>
      <form onSubmit={handleWithdraw}>
        <input
          value={withdraw}
          onChange={(e) => setWithdraw(Number(e.target.value))}
          type="text"
          placeholder="Withdraw Amount"
          className="input"
        />
        <button type="submit" className="btn">Submit</button>
      </form>
      <button onClick={handleBankrupt}>Bankrupt</button>
    </div>
  );
}

export default App;
