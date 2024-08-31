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
    <header>
      <main>
        <section>
          <h1>
            Register
          </h1>
        </section>
        <section>
          <Form
            layout='vertical'
            onFinish={onFinish}
          >
            <Form.Item
              label="Name"
              htmlFor="name"
              name="name"
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
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
              ></Input>
            </Form.Item>
            <Form.Item>
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
