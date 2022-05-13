import React, { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import { Button, Input, message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import axios, { AxiosResponse } from "axios";
import { BaseURL } from "../../../../service/api";
import { Courses } from "../../../../lib/course";
import { formatDistanceToNow } from "date-fns";

const { Search } = Input;

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginator, setPaginator] = useState({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState("")

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginator.page, paginator.pageSize, value]);

  // to get student data
  const getStudents = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("cms-user") as string).token;
    
    let path = `page=${paginator.page}&limit=${paginator.pageSize}`;
    if(value){
       path = `query=${value}&page=${paginator.page}&limit=${paginator.pageSize}`;
    }

    try {
      const res: AxiosResponse = await axios.get(
        `${BaseURL}/students?${path}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res) {
        setStudents(res.data.data.students);
        setTotal(res.data.data.total);
        setLoading(false);
      }
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  };


  const columns: ColumnsType = [
    {
      title: "No.",
      dataIndex: "key",
      render: (_, _1, index) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    {
      title: "Area",
      dataIndex: "country",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      render: (courses, _, _1) =>
        courses.map(({ courseId, name }: Courses) => {
          return <span key={courseId}>{name}, </span>;
        }),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      render: (type, _, _1) => <span>{type?.name}</span>,
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      render: (createdAt, _, _1) => (
        <span>{formatDistanceToNow(new Date(createdAt))} ago</span>
      ),
    },
    {
      title: "Action",
      key: "action",
    },
  ];

  return (
    <Layout>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 10px ",
          }}
        >
          <Button>xx</Button>

          {/* filter by student name */}
          <Search
            placeholder="input search text"
            size="middle"
            style={{ width: "30%" }}
            onChange={(e)=> setValue(e.target.value)}
          />
        </div>
        <Table<any>
          columns={columns}
          loading={loading}
          dataSource={students}
          pagination={{
            total: total,
            pageSize: paginator.pageSize,
            onChange: (page, pageSize) => {
              setPaginator({ page, pageSize });
            },
          }}
        />
      </>
    </Layout>
  );
}
