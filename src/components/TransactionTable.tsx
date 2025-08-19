import React, { useState } from 'react';
import { ITransaction } from '../data/interfaces/ITransaction';
import { Button, Popconfirm, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { myTransactions } from '../data/TransactionsTableData';
import { AddTransactionModal } from './AddTransactionModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { EditTransactionModal } from './EditTransactionModal';

interface TransactionProps {
  dataSource: ITransaction[];
}

export function TransactionTable({ dataSource }: TransactionProps) {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<ITransaction | null>(null);
  const [tableData, setTableData] = useState<ITransaction[]>(
    dataSource.map(transaction => ({
      ...transaction,
      key: transaction.id,
    }))
  );

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleOpenEditModal = (transaction: ITransaction) => {
    setEditingTransaction(transaction);
    setIsOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    setIsOpenEditModal(false);
    setEditingTransaction(null);
  };

  const handleAddTransaction = (newTransaction: ITransaction) => {
    setTableData(prevData => [
      ...prevData,
      { ...newTransaction, key: newTransaction.id }
    ]);
  };

  const handleEditTransaction = (updatedTransaction: ITransaction) => {
    setTableData(prevData =>
      prevData.map(item =>
        item.id === updatedTransaction.id
          ? { ...updatedTransaction, key: updatedTransaction.id }
          : item
      )
    );
  };

  const handleDeleteTransaction = (id: string | number) => {
    setTableData(prevData => prevData.filter(item => item.id !== id));
  };

  const columns: ColumnsType<ITransaction> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `${price} руб.`,
    },
    {
      title: 'Дата транзакции',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.getTime() - b.date.getTime(),
      render: (date: Date) => date.toLocaleDateString('ru-RU'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleOpenEditModal(record)}
            title="Редактировать"
          />

          <Popconfirm
            title="Удалить транзакцию"
            description="Вы уверены, что хотите удалить эту транзакцию?"
            onConfirm={() => handleDeleteTransaction(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
              title="Удалить"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={handleOpenAddModal} style={{ marginBottom: 16 }}>
        Новая транзакция
      </Button>

      <Table
        dataSource={tableData}
        columns={columns}
        pagination={{ pageSize: 10 }}
      />

      <AddTransactionModal
        open={isOpenAddModal}
        onCancel={handleCloseModal}
        onAddTransaction={handleAddTransaction}
      />

      <EditTransactionModal
        open={isOpenEditModal}
        onCancel={handleCloseModal}
        onEditTransaction={handleEditTransaction}
        transaction={editingTransaction}
      />
    </>
  );
}