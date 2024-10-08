import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../api/users";
import { useState } from "react";
import { message, Menu, Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },
    {
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile")
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />
        },
        {
          label: (
            <Link to="/login" onClick={() => {
              localStorage.removeItem("token");
            }}>Logout</Link>
          ),
          icon: <LogoutOutlined />,
        }
      ]
    }
  ]

  const getValidUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response?.data);
      if (!response) navigate('/login');
    } catch (error) {
      message.error(error.message);
      navigate('/login');
    }
  }
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getValidUser();
    } else {
      navigate('/login');
    }
  }, [])

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "white" }}>
            Book My Show
          </h3>
          <Menu theme="dark" mode="horizontal" items={navItems} />

        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>

    </>
  )

}
export default ProtectedRoute;

