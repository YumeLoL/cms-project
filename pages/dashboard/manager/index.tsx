import MainLayout from "../../../components/layout";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance, BaseURL } from "../../../httpService/api";
import { Card, Col, message, Progress, Row } from "antd";
import {
  DeploymentUnitOutlined,
  ReadOutlined, SolutionOutlined
} from "@ant-design/icons";

const StyledRow = styled(Row)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .ant-card {
    border-radius: 5px;
    cursor: pointer;
    margin: 8px 12px;
  }
  .ant-card-body {
    padding: 24px;
  }
  .ant-col-6 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
  .icon {
    height: 82px;
    display: flex;
    background: rgb(255, 255, 255);
    padding: 25px;
    border-radius: 50%;
    color: rgb(153, 153, 153);
  }
  h2,
  h3,
  p {
    color: rgb(255, 255, 255);
  }
`;
interface Overview {
  title: string;
  data: {
    lastMonthAdded: number;
    total: number;
  };
  background: string;
  icon: ReactNode;
}

export default function Manager() {
  const [overview, setOverview] = useState<Overview[]>([]);

  useEffect(() => {
    // get data overview
    const getOverview = async () =>{
      try {
        const res = await axiosInstance.get(`${BaseURL}/statistics/overview`)
    
      if(res){
        console.log(res.data)
        const overview: Overview[] = [
          {
            title: "course",
            data: res.data.data.course,
            background: "rgb(24, 144, 255)",
            icon: <SolutionOutlined />,
          },
          {
            title: "teacher",
            data: res.data.data.teacher,
            background: "rgb(103, 59, 183)",
            icon: <DeploymentUnitOutlined />,
          },
          {
            title: "student",
            data: res.data.data.student,
            background: "rgb(255, 170, 22)",
            icon: <ReadOutlined />,
          },
        ];
        setOverview(overview);
      }
    }catch (err: any) {
      message.error(err.response.data.msg);
    }
  }
    getOverview();
    }, []);


  return (
    <MainLayout>
      {/* total amount of course, teacher, student */}
      <StyledRow gutter={16} style={{ margin: "30px 0" }}>
        {overview.map(({ title, data, background, icon }, index) => {
          const lastMonthAdded = +(
            (data?.lastMonthAdded / data?.total) *
            100
          ).toFixed(1);

          return (
            <Col key={index} span="8">
              <Card style={{ backgroundColor: background }}>
                <Row>
                  <Col span="6">
                    <div className="icon">{icon}</div>
                  </Col>
                  <Col span="18">
                    <h3>TOTAL {title.toUpperCase()}</h3>
                    <h2>{data?.total}</h2>
                    <Progress
                      percent={100 - lastMonthAdded}
                      size="small"
                      showInfo={false}
                      strokeColor="white"
                      trailColor="lightgreen"
                    />
                    <p>{`${lastMonthAdded + "%"} Increase in 30 Days`}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </StyledRow>

      
      <Row>
        {/* pie chart */}
        <Col></Col>

        <Col></Col>
      </Row>
    </MainLayout>
  );
}
