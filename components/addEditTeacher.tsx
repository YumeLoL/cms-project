import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";

const { Option } = Select;

export default function AddEditTeacher() {
  //   const { id, name, email, country, phone } = data;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async () => {};

  return (
    <>
      <Button type={"primary"} onClick={showModal}>
        {"+ Add"}
      </Button>
      <Modal
        title={"Add Student"}
        centered
        okText={"Add"}
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          //   initialValues={{
          //     name: name,
          //     email: email,
          //     country: country,
          //   }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input teacher name!" }]}
          >
            <Input placeholder="Teacher Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input teacher email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="australia">Australia</Option>
              <Option value="New Zealand">New Zealand</Option>
              <Option value="canada">Canada</Option>
              <Option value="china">China</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              addonBefore={
                <Form.Item name="prefix" noStyle>
                  <Select style={{ width: 70 }} defaultValue={{ value: '61', label: '+61' }}>
                    <Option value="61">+61</Option>
                    <Option value="87">+87</Option>
                  </Select>
                </Form.Item>
              }
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
