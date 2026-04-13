"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/api/api";
import validator from "validator";

import {
  Wrapper,
  Card,
  Title,
  Input,
  Button,
  FooterText,
  LinkText,
} from "../../styles/register.styles";

export default function Register() {
  const router = useRouter();
  const [passwordError, setPasswordError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      const isStrong = validator.isStrongPassword(value);

      if (!isStrong) {
        setPasswordError("Weak password");
      } else {
        setPasswordError("");
      }
    }
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const isStrong = validator.isStrongPassword(form.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isStrong) {
      alert("Password is not strong enough");
      return;
    }

    try {
      const res = await api.post("/auth/signup", form);

      alert(res.data.message);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <Wrapper>
      <Card>
        <Title>Register</Title>

        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          {passwordError && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {passwordError}
            </p>)}

          <Button type="submit">Register</Button>
        </form>


        <FooterText>
          Already registered?{" "}
          <LinkText onClick={() => router.push("/login")}>
            Login
          </LinkText>
        </FooterText>
      </Card>
    </Wrapper>
  );
}