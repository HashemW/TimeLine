import * as React from 'react';
import {useState, useRef} from "react";
import { EventDotGreen, EventLabel, Input, Line, LineContent, 
  EventDotBlue, DeleteButton  } from "../styling/styles";

interface Props {
  date: string;
  index: number;
  onUpdate: (newDate: string) => void;
  onDelete: (index: number) => void;
}

export interface Event {
  date: string;
  description: string;
}

const TimelineEvent: React.FC<Props> = ({ date, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const inputRef = useRef<HTMLInputElement>(null);
  const [events, setEvents] = useState<Event[]>([
    { date: "Event One", description: "Add your Event" },
  ]);
  // Enable editing mode
  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50); // Auto-focus input
  };

  // Save changes and exit edit mode
  const handleBlur = () => {
    setIsEditing(false);
    if (tempDate.trim()) onUpdate(tempDate); // Update only if not empty
  };

  const addEvent = (date: string, description: string) => {
    setEvents([...events, { date, description }]);
  };

  // Handle Enter key to save changes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
  };

  return (
    <LineContent>
      <LineContent>
        <DeleteButton onClick={() => onDelete(index)}>X</DeleteButton>
        <EventDotGreen />
        {isEditing ? (
          <Input
            ref={inputRef}
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          
        ) : (
          <EventLabel onDoubleClick={handleDoubleClick}>{date}</EventLabel>
          
        )}
        
      </LineContent>
      
      <Line/>
    </LineContent>
  );
};

export default TimelineEvent;
