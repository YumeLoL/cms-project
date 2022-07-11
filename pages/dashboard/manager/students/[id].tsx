import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../../components/layout";
import { Avatar, Card, Col, message, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { axiosInstance, BaseURL } from "../../../../httpService/api";
import { IStudent } from "../../../../lib/students";

export default function StudentInfo() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState({});
  const { name, age, email, phone, address } = profile as IStudent;

  useEffect(() => {
    getStudents();
  }, []);

  // to get student info by id
  const getStudents = async () => {
    try {
      const res: AxiosResponse = await axiosInstance.get(
        `${BaseURL}/students/${id}`
      );
      if (res) {
        setProfile(res.data.data);
      }
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 10px ",
        }}
      >
        <Col span="8">
          <Card
            title={
              <Avatar
                icon={<UserOutlined />}
                style={{
                  width: 100,
                  height: 100,
                  display: "block",
                  margin: "auto",
                }}
              />
            }
          >
            <Row gutter={[6, 16]}>
              <Col span="12" style={{ textAlign: "center" }}>
                {name}
              </Col>
              <Col span="12" style={{ textAlign: "center" }}>
                {age}
              </Col>
            </Row>
            <Row gutter={[6, 16]}>
              {" "}
              <Col span="12" style={{ textAlign: "center" }}>
                {phone}
              </Col>
              <Col span="12" style={{ textAlign: "center" }}>
                {email}
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span="12">
          <Card></Card>
        </Col>
      </div>
    </Layout>
  );
}
