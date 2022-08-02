import { Input, message, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { AxiosResponse } from "axios";
import Link from "next/link";
import React, { SetStateAction, useEffect, useState } from "react";
import AddEditTeacher from "../../../../components/addEditTeacher";
import Layout from "../../../../components/layout";
import { axiosInstance, BaseURL } from "../../../../httpService/api";
import { AddEditTeachers, ITeachers } from "../../../../lib/teachers";

const { Search } = Input;

export default function Teacher() {
  const [loading, setLoading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [paginator, setPaginator] = useState({
    page: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState("");
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginator.page, paginator.pageSize,refresh]);

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
        console.log(res.data.data.teachers)
        setTotal(res.data.data.total);
        setLoading(false);
      }
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);

    try {
      const res: AxiosResponse = await axiosInstance.delete(
        `${BaseURL}/teachers/${id}`
      );

      setRefresh(!refresh);
      setLoading(false);
    } catch (err: any) {
      message.error(err.response.data.msg);
    }
  }

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
        const { id } = record as ITeachers;

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
      dataIndex: "skills",
      render: (skills, _, _1) =>
        skills.map(({ name }: ITeachers, index: number) => {
         
          return index === 0 ? (
            <span key={name}>{name}</span>
          ) : (
            <span key={name}>, {name}</span>
          );
        }),
    },
    {
      title: "Course Amount",
      dataIndex: "courseAmount",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (record, _, _1) => {
        const {id, name, email, country, phone, skills} = record as AddEditTeachers;
        const data = {id, name, email, country, phone, skills}
       
             return (
          <Space size="middle">
            <AddEditTeacher 
            refresh={refresh}
              setRefresh={setRefresh}
              {...data}/>
          
          <Popconfirm
            title="Are you sure?"
            onConfirm={()=> handleDelete(id as number)}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>
          </Space>
        );
      },
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
        <AddEditTeacher  name={""} email={""} country={""} phone={0} skills={[]} setRefresh={function (value: SetStateAction<boolean>): void {
          throw new Error("Function not implemented.");
        } } id={0} />

        {/* filter by student name */}
        <Search
            placeholder="input search text"
            size="middle"
            style={{ width: "30%" }}
            onChange={(e) => setValue(e.target.value)}
          />
      </div>
      <Table<any> columns={columns} loading={loading} dataSource={teachers} pagination={{
            total: total,
            pageSize: paginator.pageSize,
            onChange: (page, pageSize) => {
              setPaginator({ page, pageSize });
            },
          }}/>
    </Layout>
  );
}


