import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { RegisterUser } from '../../api/users';
import { GetCurrentUser } from '../../api/users';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser({ ...values, isAdmin: false });
      if (response.success) {
        localStorage.setItem('token', response.token);
        window.location.href = '/';
        message.success("User registered and logged in successfully");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Failed. Try again.');
    }
  }

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const response = await GetCurrentUser();
      if (response) navigate("/");
    }
  }, []);

  return (
    <header className="App-header">
      <main className="main-area mw-500 text-center px-3">
        <section className="left-section">
          <h1>
            Register
          </h1>
        </section>
        <section className="right-section">
          <Form
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter your Name"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter your Email"
              ></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
              ></Input>
            </Form.Item>
            <Form.Item className="d-block">
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1rem", fontWeight: "600" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </section>
      </main>
    </header>
  )
}

export default Register;
