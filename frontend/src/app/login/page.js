"use client";

import api from "@/api/api";
import { setAccessToken } from "@/api/tokenService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
    Wrapper,
    Card,
    Title,
    Input,
    Button,
} from "../../../styles/login.styles";

const Page = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);

            //storing access token in memory
            setAccessToken(res.data.accessToken);

            alert(res.data.message);

            router.push("/todo");
        } catch (err) {
            console.log(err);
            alert(
                err.response?.data?.message ||
                err.message ||
                "Error"
            );
        }
    };

    return (
        <Wrapper>
            <Card>
                <Title>Login</Title>

                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <Button type="submit">Login</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default Page;