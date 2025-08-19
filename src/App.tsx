import React from 'react';
import './App.css';
import { myTransactions } from './data/TransactionsTableData';
import { TransactionTable } from './components/TransactionTable';

function App() {

  
  return (
    <>

    <h2>Список расходов</h2>

    <TransactionTable 
    dataSource={myTransactions}/>
    </>
  );
}

export default App;