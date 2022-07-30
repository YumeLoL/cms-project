import { message, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import { axiosInstance, BaseURL } from "../../../../httpService/api";

export default function Teacher() {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [paginator, setPaginator] = useState({
    page: 1,
    pageSize: 10,
  });
  const [value, setValue] = useState("");


  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTeachers = async () => {
    setLoading(true);

    let path = `page=${paginator.page}&limit=${paginator.pageSize}`;
    if (value) {
      path = `query=${value}&page=${paginator.page}&limit=${paginator.pageSize}`;
    }

    try {
      const res: AxiosResponse = await axiosInstance.get(
        `${BaseURL}/teachers?query=${value}&page=${paginator.page}&limit=${paginator.pageSize}`
      );
      if (res) {
        
        setTeachers(res.data.data.teachers);
        setLoading(false);
      }
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  };

  console.log(teachers)
  const columns: ColumnsType = [
    {
      title: "No.",
      dataIndex: "key",
      render: (_, _1, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name, record, _1) => {
        const { id } = record;
        return (
          <Link href={`/dashboard/manager/teachers/${id}`}>
            <a>{name}</a>
          </Link>
        );
      },
    },
    {
      title: "Area",
      dataIndex: "country",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Skill",
      dataIndex: "skill",
    },
    {
      title: "Course Amount",
      dataIndex: "type",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      // render: (_, record, _1) => {
      //   const { id, name, email, country } = record as AddEditStudents;
      //   const data = { id, name, email, country };
      //   return (
      //     <Space size="middle">
      //       <AddEditStudent
      //         refresh={refresh}
      //         setRefresh={setRefresh}
      //         {...data}
      //       />

      //       <Popconfirm
      //         title="Are you sure？"
      //         okText="Yes"
      //         cancelText="No"
      //         onConfirm={() => handleDelete(id as number)}
      //       >
      //         <a href="#">Delete</a>
      //       </Popconfirm>
      //     </Space>
      //   );
      // },
    },
  ];
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 10px ",
        }}
      >
        <Table<any> columns={columns} loading={loading} dataSource={teachers} />
      </div>
    </Layout>
  );
}
