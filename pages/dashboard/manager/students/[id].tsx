import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../../../components/layout";
import { Avatar, Card, Col, message, Row, Tabs, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { AxiosResponse } from "axios";
import { axiosInstance, BaseURL } from "../../../../httpService/api";
import { InfoType } from "../../../../lib/students";
import { programLanguageColors } from "../../../../lib/color";
import Table, { ColumnsType } from "antd/lib/table";

const H2 = styled.h2`
  color: #7356f1;
  margin: 20px 0px;
  font-size: 24px;
`;

export default function StudentInfo() {
  const { TabPane } = Tabs;
  const router = useRouter();
  const { id } = router.query;
  const [info, setInfo] = useState<InfoType[]>([]);
  const [detailedInfo, setDetailedInfo] = useState<InfoType[]>([]);
  const [interest, setInterest] = useState([]);
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  // const [info, setInfo] = useState<{label: string,value:string|number}[]>([]);   same
  const columns: ColumnsType = [
    {
      title: "No.",
      dataIndex: "key",
      render: (_, _1, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name, _, _1) => name,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type, _, _1) => type.map((type: { name: string }) => type.name),
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: (createdAt, _, _1) => createdAt,
    },
  ];
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // to get student info by id
  const getStudents = async () => {
    try {
      const res: AxiosResponse = await axiosInstance.get(
        `${BaseURL}/students/${id}`
      );
      if (res) {
        const {
          name,
          email,
          age,
          phone,
          address,
          education,
          country,
          gender,
          memberStartAt,
          type,
          createdAt,
          updatedAt,
          interest,
          description,
          courses,
        } = res.data.data;
        console.log(res.data.data);
        // general info about the student
        const info = [
          { label: "Name", value: name },
          { label: "Age", value: age },
          { label: "Email", value: email },
          { label: "Phone", value: phone },
          { label: "Address", value: address },
        ];

        const detailedInfo = [
          { label: "Education:", value: education },
          { label: "Area:", value: country },
          { label: "Gender:", value: gender === 1 ? "Male" : "Female" },
          { label: "Member Period:", value: memberStartAt },
          { label: "Type:", value: type.name },
          { label: "Create Time:", value: createdAt },
          { label: "Update Time:", value: updatedAt },
        ];

        setInfo(info);
        setDetailedInfo(detailedInfo);
        setInterest(interest);
        setDescription(description);
        setCourses(courses);
      }
    } catch (err: any) {
      message.error(err.response?.data?.msg);
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
              {info.map(({ label, value }) => (
                <Col span={12} key={label} style={{ textAlign: "center" }}>
                  <b>{label}</b>
                  <p>{value}</p>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span="14">
          <Card style={{ width: "100%" }}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="About" key="1">
                <H2>Information</H2>
                <Row gutter={[6, 16]}>
                  {detailedInfo.map(({ label, value }) => (
                    <Col span={24} key={label}>
                      <b style={{ width: "150px", display: "inline-block" }}>
                        {label}
                      </b>
                      <span>{value}</span>
                    </Col>
                  ))}
                </Row>

                <H2>Interests</H2>
                <Row>
                  <Col>
                    {interest.map((item, index) => (
                      <Tag color={programLanguageColors[index]} key={item}>
                        {item}
                      </Tag>
                    ))}
                  </Col>
                </Row>

                <H2>Description</H2>
                <Row>
                  <Col>
                    <p>{description}</p>
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="Course" key="2">
                <Table<any> columns={columns} dataSource={courses} />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </div>
    </Layout>
  );
}
