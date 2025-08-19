import { ColumnsType } from 'antd/es/table';
import { ITransaction } from './interfaces/ITransaction';
import { useState } from 'react';


export const columns: ColumnsType<ITransaction> = [
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
];

export const myTransactions: ITransaction[] = [
  {
    id: 1,
    product: 'Ноутбук Lenovo IdeaPad',
    date: new Date('2025-07-01T10:15:00'),
    price: 1250.00
  },
  {
    id: 2,
    product: 'Абонемент в спортзал',
    date: new Date('2025-07-03T18:30:00'),
    price: 45.99
  },
  {
    id: 3,
    product: 'Кофе в кофейне',
    date: new Date('2025-07-04T08:45:00'),
    price: 3.50
  },
  {
    id: 4,
    product: 'Подписка на Netflix',
    date: new Date('2025-07-05T20:00:00'),
    price: 12.99
  },
  {
    id: 5,
    product: 'Книга "Чистый код"',
    date: new Date('2025-07-07T14:10:00'),
    price: 28.00
  },
  {
    id: 6,
    product: 'Продукты в супермаркете',
    date: new Date('2025-07-08T17:25:00'),
    price: 63.40
  },
  {
    id: 7,
    product: 'Билеты в кино',
    date: new Date('2025-07-10T19:00:00'),
    price: 16.00
  },
  {
    id: 8,
    product: 'Аренда жилья',
    date: new Date('2025-07-12T09:00:00'),
    price: 450.00
  },
  {
    id: 9,
    product: 'Мобильная связь',
    date: new Date('2025-07-13T11:30:00'),
    price: 10.99
  },
  {
    id: 10,
    product: 'Такси',
    date: new Date('2025-07-14T22:15:00'),
    price: 7.80
  },
  {
    id: 11,
    product: 'Обед в кафе',
    date: new Date('2025-07-15T13:00:00'),
    price: 9.75
  },
  {
    id: 12,
    product: 'Подарок другу',
    date: new Date('2025-07-16T16:45:00'),
    price: 35.00
  }
];