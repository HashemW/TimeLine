import * as React from 'react';
import {useState, useRef} from "react";
import { EventDotGreen, EventLabel, Input, LineContent, 
  DeleteButton, Overlay, NestedTimelineContainer,
  TimelineWrapper, Line, EventDotBlue,LastLine  } from "../styling/styles";
import Timeline from './Timeline';

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
  const [nestedEvents, setNestedEvents] = useState<Event[]>([
    { date: "Event One", description: "Add your Event" },
  ]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isNestedTimelineActive, setIsNestedTimelineActive] = useState(false);
  const eventDotRef = useRef<HTMLDivElement>(null);
  const [nestedPosition, setNestedPosition] = useState({ top: 0, left: 0 });

  const deleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };
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

  const addEvent = (date: string, description: string, index?: number) => {
    if (index !== undefined) {
      setEvents([
        ...events.slice(0, index + 1),
        { date, description },
        ...events.slice(index + 1),
      ]);
    } else {
      setEvents([...events, { date, description }]);
    }
  };

  const deleteNestedEvent = (index: number) => {
    setNestedEvents(nestedEvents.filter((_, i) => i !== index));
  };
  const addToNestedEvents = (date: string, description: string, index?: number) => {
    if (index !== undefined) {
      setNestedEvents([
        ...nestedEvents.slice(0, index + 1),
        { date, description },
        ...nestedEvents.slice(index + 1),
      ]);
    } else {
      setNestedEvents([...nestedEvents, { date, description }]);
    }
  };
  // Handle Enter key to save changes
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleBlur();
  };
  const openNestedTimeline = () => {
    
    
    if (eventDotRef.current) {
      const parent = eventDotRef.current.parentElement;
      console.log("KYS!");
      if (parent) {
        setNestedPosition({ top: parent.offsetTop + 50, left: parent.offsetLeft });
      }
    }
    setIsNestedTimelineActive(true);
  };

  const closeNestedTimeline = () => {
    setIsNestedTimelineActive(false);
  };
  return ( 
  <>
    
    <LineContent>
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
      <DeleteButton onClick={() => onDelete(index)}>X</DeleteButton>
      <EventDotGreen 
        ref={eventDotRef}
        onClick={openNestedTimeline}
      />
    </LineContent>
    {isNestedTimelineActive && (
      <NestedTimelineContainer style={{ position: "absolute", top: nestedPosition.top, left: nestedPosition.left }}>
        {nestedEvents.map((event, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Line
                onMouseEnter={() => setHoverIndex(index - 1)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => addToNestedEvents("New Event", "description", index - 1)}
                
              />
            )}
            <TimelineEvent
              date={event.date}
              index={index}
              onUpdate={(newDate) =>
                setNestedEvents((prevEvents) =>
                  prevEvents.map((ev, i) =>
                    i === index ? { ...ev, date: newDate } : ev
                  )
                )
              }
              onDelete={deleteNestedEvent}
            />
          </React.Fragment>
        ))}
        <LastLine/>
        <EventDotBlue onClick={() => addToNestedEvents("Next event", "description")} />
          
      </NestedTimelineContainer>
    )}
    </>
  );
};

export default TimelineEvent;
