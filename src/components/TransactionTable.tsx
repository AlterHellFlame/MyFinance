import React, { useState } from 'react';
import { ITransaction } from '../data/interfaces/ITransaction';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { myTransactions } from '../data/TransactionsTableData';
import { AddTransactionModal } from './AddTransactionModal';


interface TransactionProps {
  dataSource: ITransaction[];
  columns: ColumnsType<ITransaction>
}


export function TransactionTable({dataSource, columns} : TransactionProps) 
{
    
    const[isOpenModal, setIsOpenModal] = useState(false);
    
    const handleOpenModal = () =>
    {
    setIsOpenModal(true);
    }
    
    const handleCloseModal = () =>
    {
      setIsOpenModal(false);
    }

    const handleAddTransaction = (newTransaction: ITransaction) => {
    setTableData(prevData => [
      ...prevData,
      { ...newTransaction, key: newTransaction.id }
    ]);
  };
    
    const [tableData, setTableData] = useState<ITransaction[]>(
    myTransactions.map(transaction => ({
      ...transaction,
      key: transaction.id,
    }))
    );

    return(
    <>
    <Button type="primary" onClick={handleOpenModal}>Новая транзакция</Button>
    <AddTransactionModal 
    open={isOpenModal}
    onCancel={handleCloseModal}
    onAddTransaction={handleAddTransaction} ></AddTransactionModal>

    <Table  
    dataSource={tableData}
    columns={columns}
    pagination={{ pageSize: 10 }}></Table>

    
    </>);
    
}