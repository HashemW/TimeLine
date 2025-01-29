import styled from "styled-components";

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border-bottom: 2px solid black;
`;

export const EventDot = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 50%;
  margin: 0 20px;
`;

export const EventLabel = styled.div`
  text-align: center;
  position: absolute;
  top: -30px;
  width: 80px;
`;

export const AddEventFormContainer = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  margin: 5px;
  padding: 5px;
  border: 1px solid #000;
  border-radius: 5px;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;
