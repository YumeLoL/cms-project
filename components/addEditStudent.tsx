import { Button, Form, Input, message, Modal, Select } from "antd";
import React, {useState } from "react";
import { AddEditStudents } from "../lib/students";
import { axiosInstance, BaseURL } from "../httpService/api";

const { Option } = Select;

export default function AddEditStudent(data: AddEditStudents) {
  const { id, name, email, country, refresh, setRefresh } = data;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async (values: AddEditStudents) => {
    const { name, email, country, type} = values;

      // to edit a student
      if(id){
        try {
          const res = await axiosInstance.put(
            `${BaseURL}/students`,
            { id,  name, email, country, type},
            
          );
          if (res) {
            setVisible(false);
            message.success(res.data.msg);
            setRefresh(!refresh)
          }
        } catch (err: any) {
          message.error(err.response.data.msg);
        }
      }else{
        // to add a new student
        try {
          const res = await axiosInstance.post(
            `${BaseURL}/students`,
            { name, email, country, type},
          );
          if (res) {
            console.log("add:", res)
            setVisible(false);
            message.success(res.data.msg);
            setRefresh(!refresh)
          }
        } 
        catch (err: any) {
          // console.log("err", err)
          // message.error("there is error");
        }
      }
      
  };

  return (
    <>
      <Button type={!!id ? "link" : "primary"} onClick={showModal}>
        {!!id ? "Edit" : "+ Add"}
      </Button>
      <Modal
        title={!!id ? "Edit Student" : "Add Student"}
        centered
        okText={!!id ? "Update" : "Add"}
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
