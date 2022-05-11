import Head from "next/head";
import router from "next/router";
import axios from "axios";
import { AES } from "crypto-js";
import "antd/dist/antd.css";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Typography,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { LoginValue } from "../lib/login";
import Link from "next/link";
import { BaseURL } from "../service/api";

const { Title } = Typography;

const Login: React.FC = () => {
  const onFinish = async ({ password, role, email }: LoginValue) => {
    // login request
    try {
      const res = await axios.post(`${BaseURL}/login`, {
        password: AES.encrypt(password, "cms").toString(),
        email,
        role,
      });

      localStorage.setItem("cms-user", JSON.stringify(res.data.data));
      if (res) {
        router.push(`/dashboard/${role}`);
      }
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <div>
      <Head>
        <title>Course Management System</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Row align="middle" justify="center" style={{ height: "100vh" }}>
        <Col xs={20} sm={18} md={16} xl={8}>
          <div>
            <Title
              level={1}
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "50px",
              }}
            >
              Course Management Assistant
            </Title>

            <Form
              name="login"
              size="large"
              initialValues={{ remember: true, role: "student" }}
              onFinish={onFinish}
            >
              <Form.Item rules={[{ required: true }]} name="role">
                <Radio.Group>
                  <Radio.Button value="student">Student</Radio.Button>
                  <Radio.Button value="teacher">Teacher</Radio.Button>
                  <Radio.Button value="manager">Manager</Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Please input email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, min: 4, max: 16 }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Please input password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "4px 15px",
                  }}
                >
                  LogIn
                </Button>
              </Form.Item>
            </Form>

            <div>
              No account?
              <Link href="/">
                <a> Sign up </a>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
