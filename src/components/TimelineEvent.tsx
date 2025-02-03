import * as React from 'react';
import {useState, useRef} from "react";
import { EventDot, EventLabel, Input, Line, LineContent } from "../styling/styles";

interface Props {
  date: string;
  onUpdate: (newDate: string) => void;
}

const TimelineEvent: React.FC<Props> = ({ date, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Handle Enter key to save changes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
  };

  return (
    <div>
      <LineContent>
        <EventDot />
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
        <Line/>
        
      </LineContent>
    </div>
  );
};

export default TimelineEvent;
