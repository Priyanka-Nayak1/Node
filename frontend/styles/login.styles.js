import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f7fb;
`;

export const Card = styled.div`
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    width: 350px;
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;

    &:focus {
        border-color: #007bff;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: #0056b3;
    }
`;