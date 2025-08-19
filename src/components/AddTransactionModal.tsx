import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { ITransaction } from "../data/interfaces/ITransaction";

interface AddTransactionModalProp
{
    open: boolean,
    onCancel: () => void;
    onAddTransaction: (newTransaction: ITransaction) => void;
}

export function AddTransactionModal({open, onCancel, onAddTransaction} : AddTransactionModalProp) {

    const handleAddTransaction = async () => {
    try {
      const values = await form.validateFields();
      const newTransaction: ITransaction = {
        ...values,
        id: Date.now(),
        date: values.date.toDate()
      };

      onAddTransaction(newTransaction);
      onCancel();
      form.resetFields();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

    const [form] = Form.useForm();

    return (

    <Modal
    title="Новая транзакция"
    open={open}
    onCancel={onCancel}
    onOk={handleAddTransaction}>

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
