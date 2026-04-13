import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 100vh;
  background: #f5f7fb;
`;

export const Card = styled.div`
  width: 80%;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;


export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  text-align: center;
  flex: 1;
  color: #333;
  margin: 0;
`;



export const CreateButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 6px;
  background-color: #4cafef;
  color: white;
  cursor: pointer;
  width: auto;

  &:hover {
    background-color: #3a9edc;
  }
`;

export const LogoutButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border: none;
  border-radius: 6px;
  background-color: #ff4d4f;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #d9363e;
  }
`;



export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


export const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f1f3f6;
  padding: 10px;
  border-radius: 8px;

  span {
    flex: 1;
  }

  button {
    margin-left: 6px;
    padding: 6px 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
  }

  /* Delete button */
  button:first-child {
    background-color: #ff6b6b;

    &:hover {
      background-color: #e85a5a;
    }
  }

  /* Edit button */
  button:last-child {
    background-color: #6c63ff;

    &:hover {
      background-color: #574fd6;
    }
  }
`;



export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  input {
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;

    &:focus {
      border-color: #4cafef;
    }
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 6px;
    background-color: #28a745;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;