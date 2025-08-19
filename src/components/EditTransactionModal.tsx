import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { ITransaction } from "../data/interfaces/ITransaction";
import { useEffect } from "react";
import dayjs from "dayjs";

interface AddTransactionModalProp
{
    open: boolean,
    onCancel: () => void;
    onEditTransaction: (updatedTransaction: ITransaction) => void;
    transaction: ITransaction | null
}

export function EditTransactionModal({open, onCancel, onEditTransaction, transaction} : AddTransactionModalProp) {

    useEffect(() => {
        if (transaction && open) {
            form.setFieldsValue({
                product: transaction.product,
                price: transaction.price,
                date: dayjs(transaction.date) 
            });
        }
    }, [transaction, open, Form]);

    const handleEditTransaction = async () => {
    try {
      const values = await form.validateFields();
      const updatedTransaction: ITransaction = {
        ...values,
        id: transaction?.id,
        date: values.date.toDate()
      };

      onEditTransaction(updatedTransaction);
      onCancel();
      form.resetFields();
    } catch (error) {
      console.log('Ошибка валидации:', error);
    }
  };

    const [form] = Form.useForm();

    return (

    <Modal
    title="Новая транзакция"
    open={open}
    onCancel={onCancel}
    onOk={handleEditTransaction}>

     <Form form={form} layout="vertical">
          <Form.Item name="product" label="Продукт" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Цена, руб." rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
        <Form.Item name="date" label="Дата и время транзакции" rules={[{ required: true }]}>
        <DatePicker 
            showTime 
            format="DD.MM.YYYY HH:mm"
            style={{ width: '100%' }}
        />
        </Form.Item>
        </Form>
    </Modal>

    );
}
