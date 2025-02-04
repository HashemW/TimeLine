import styled from "styled-components";


export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: center;
  cursor: pointer;
  display: inline-block;
  min-width: fit-content; // Prevents shrinking too much
`;

export const TitleInput = styled.input`
  font-size: 24px;
  font-weight: bold;
  background: transparent;
  padding: 20px;
  border: none;
  outline: none;
  text-align: center;
  color: white;
  display: inline-block;
  min-width: fit-content;  // Prevents collapsing
  width: auto;
  font-family: "Poppins";
`;


export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimelineWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  max-width: 800px;
  padding: 30px;
`;

export const EventDotGreen = styled.div`
  width: 20px;
  height: 20px;
  background-color: lightgreen;
  border-radius: 50%;
  cursor: pointer; // 🔹 Shows pointer cursor when hovered
  transition: background-color 0.2s;

  &:hover {
    background-color: green; // 🔹 Slight hover effect
  }
`;

export const EventDotBlue = styled.button`
  width: 20px;
  height: 20px;
  background-color: lightBlue;
  border-radius: 50%;
  cursor: pointer; // 🔹 Shows pointer cursor when hovered
  transition: background-color 0.2s;

  &:hover {
    background-color: steelblue; // 🔹 Slight hover effect
  }
`;

export const LineContent = styled.div`
  position: relative;
  display: flex;
`;
export const EventLabel = styled.div`
  position: absolute;
  bottom: 30px; // 🔹 Moves the text above the dot
  left: 50%;
  transform: translateX(-50%); // 🔹 Centers it horizontally
  text-align: center;
  color: white;
  font-size: 14px;
  white-space: nowrap;
`;

export const Input = styled.input`
  position: absolute;
  bottom: 29px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-family: "Libre Franklin";
  border: none;
  font-size: 14px;
  background: transparent;
  color: white;
  outline: none;
`;

export const AddEventFormContainer = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
`;

export const Line = styled.hr`
  width:60px;
  height: 2px;
  background-color: white;
  
`;
