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
  position: relative;
  width: 20px;
  height: 20px;
  background-color: lightgreen;
  border-radius: 50%;

  &::after {
    content: "";
    cursor: pointer;
    position: absolute;
    top: 40%; /* Places it right below the dot */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid white; /* Default arrow color */
    transition: border-top-color 0.2s;
  }

  &:hover::after {
    border-top-color: green; /* Change arrow color on hover */
  }
`;

export const EventDotBlue = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  margin-left: 0px;
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
  bottom: 40px; // 🔹 Moves the text above the dot
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

export const Line = styled.button`
  width:180px;
  margin-top: 3px;
  height: 2px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color:gray;
  }

  &::after {
    content: "";
    position: absolute;
    transform: translateX(-50%) scale(0.5);
    margin-top: -8px;
    width: 16px;
    height: 16px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(-50%) scale(1);
    background-color: rgba(255, 255, 255, 0.7);
  }
`;

export const LastLine = styled.button`
  width:180px;
  margin-top: 3px;
  height: 2px;
  background-color: white;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: -15px; /* Moves above the dot */
  left: 50%;
  transform: translateX(-50%);
  background: none;
  color: red;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: darkred;
  }
`;

export const AddEventCircle = styled.div<{ visible: boolean }>`
  width: 15px;
  height: 15px;
  background-color: rgba(255, 255, 255, 0.3); /* Light shadow */
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: background-color 0.2s, transform 0.2s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? "auto" : "none")};

  &:hover {
    background-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-50%) scale(1.2);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

export const NestedTimelineContainer = styled.div`
  position: absolute;
  display: flex;
  top: 100%; /* Ensures it appears below the event dot */
  left: 50%;
  z-index: 11;
  background: rgba(20, 20, 20, 0.95);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.2);
  min-width: 400px;
  white-space: nowrap;
`;

