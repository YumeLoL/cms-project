import { Button, Form, Input, message, Modal, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { addStudents } from "../lib/students";
import { BaseURL } from "../service/api";

const { Option } = Select;

export default function AddEditStudent() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  //   to add a new student
  const onFinish = async (values: addStudents) => {
    const token = JSON.parse(localStorage.getItem("cms-user") as string).token;

    try {
      const res = await axios.post(`${BaseURL}/students`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res) {
        // console.log(res.data)
        setVisible(false);
        message.success(res.data.msg);
        
      }
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        + Add
      </Button>
      <Modal
        title="Add Student"
        centered
        okText="Add"
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
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input student name!" }]}
          >
            <Input placeholder="Student Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input student email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="country" label="Area" rules={[{ required: true }]}>
            <Select>
              <Option value="australia">Australia</Option>
              <Option value="New Zealand">New Zealand</Option>
              <Option value="canada">Canada</Option>
              <Option value="china">China</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="Student Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="2">Developer</Option>
              <Option value="1">Tester</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
