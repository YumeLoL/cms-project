import { Button, Form, Input, message, Modal, Select } from "antd";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { AddEditStudents } from "../lib/students";
import { BaseURL } from "../service/api";

const { Option } = Select;

export default function AddEditStudent(data: AddEditStudents) {
  const { id, name, email, country, refresh, setRefresh } = data;
  // console.log("data:",data, id)
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async (values: AddEditStudents) => {
    const { name, email, country, type} = values;
    // console.log("check value:", values, id)
    const token = JSON.parse(localStorage.getItem("cms-user") as string).token;

      // to edit a student
      try {
        const res = await axios.put(
          `${BaseURL}/students`,
          { id,  name, email, country, type},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res) {
          
          setVisible(false);
          setRefresh(true)
          console.log("refresh:", refresh);
          message.success(res.data.msg);
        }
      } catch (err: any) {
        message.error(err.response.data.msg);
      }
  };

  return (
    <>
      <Button type={!!name ? "link" : "primary"} onClick={showModal}>
        {!!name ? "Edit" : "+ Add"}
      </Button>
      <Modal
        title={!!name ? "Edit Student" : "Add Student"}
        centered
        okText={!!name ? "Update" : "Add"}
        visible={visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
                // console.log("form value:", values);
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
          initialValues={{
            name: name,
            email: email,
            country: country,
          }}
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
