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
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  max-width: 800px;
  padding: 500px;
  padding-top: 131px;
  padding-left: -5px;
  &::-webkit-scrollbar {
    height: 8px; /* Slimmer scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1); /* Subtle track */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3); /* Soft white */
    border-radius: 10px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6); /* More visible on hover */
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  margin-left: -30px;
  background-color: lightBlue;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
  flex-shrink: 0; /* Prevents squishing */

  &:hover {
    background-color: steelblue;
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
  width:180px;
  height: 2px;
  background-color: white;
  
`;
