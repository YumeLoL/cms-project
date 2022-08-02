import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Slider,
  Space,
} from "antd";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { axiosInstance, BaseURL } from "../httpService/api";
import { AddEditTeachers } from "../lib/teachers";

const { Option } = Select;

export default function AddEditTeacher(data: AddEditTeachers) {
  const {id, name, email, country, phone, skills, refresh, setRefresh } = data;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async (values: AddEditTeachers) => {
    const { name, email, country, phone, skills } = values;

    // to edit a teacher
    if(id){
      try {
        const res = await axiosInstance.put(
          `${BaseURL}/teachers`,
          { id,  name, email, country, phone, skills},
          
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
    // to add a new teacher
    try {
      const res = await axiosInstance.post(`${BaseURL}/teachers`, {
        name,
        country,
        phone,
        skills,
        email,
      });
      if (res) {
        console.log("add:", res);
        setVisible(false);
        message.success(res.data.msg);
        setRefresh(!refresh);
      }
    } catch (err: any) {
      // console.log("err", err)
      // message.error("there is error");
    }
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
              phone: phone,
              skills: skills,
            }}
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
                <Form.Item noStyle>
                  <Select
                    style={{ width: 70 }}
                    defaultValue={{ value: "61", label: "+61" }}
                  >
                    <Option value="61">+61</Option>
                    <Option value="87">+87</Option>
                  </Select>
                </Form.Item>
              }
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.List name="skills" initialValue={[]}>
            {(fields, { add, remove }) => (
              <>
                <p>Skills:</p>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Row key={key}>
                    <Col span={8}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        style={{ width: "130%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input teacher skills!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={15}>
                      <Form.Item
                        {...restField}
                        name={[name, "level"]}
                        style={{ width: "140%" }}
                      >
                        <Slider
                          min={1}
                          max={5}
                          tipFormatter={(value) => {
                            let level;
                            switch (value) {
                              case 1:
                                level = <span>basic</span>;
                                break;
                              case 2:
                                level = <span>practiced</span>;
                                break;
                              case 3:
                                level = <span>comprehend</span>;
                                break;
                              case 4:
                                level = <span>expert</span>;
                                break;
                              case 5:
                                level = <span>master</span>;
                                break;
                            }
                            return level;
                          }}
                        />
                      </Form.Item>
                    </Col>
                    {/* ensure first line of skills form without Delete function */}
                    {index === 0 ? (
                      <p></p>
                    ) : (
                      <Col span={1}>
                        <MinusCircleOutlined
                          onClick={() => remove(name)}
                          style={{ width: "150%" }}
                        />
                      </Col>
                    )}
                  </Row>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                    style={{ width: "150%" }}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
}
