import * as React from 'react';
import {useState, useRef} from "react";
import { EventDotGreen, EventLabel, Input, LineContent, 
  DeleteButton, Overlay, NestedTimelineContainer, TextArea,
  TimelineWrapper, Line, EventDotBlue,LastLine, Description, InputDesc  } from "../styling/styles";
import Timeline from './Timeline';

interface Props {
  date: string;
  description: string;
  index: number;
  onUpdate: (newDate: string, newDescription: string) => void;
  onDelete: (index: number) => void;
}

export interface Event {
  date: string;
  description: string;
}

const TimelineEvent: React.FC<Props> = ({ date, description, index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);
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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const descAreaRef = useRef<HTMLDivElement>(null);
  const deleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };
  // Enable editing mode
  const handleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Reset height
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust to content
        textAreaRef.current.focus();
      }
    }, 50);
  };
  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempDescription(e.target.value);
    e.target.style.height = "auto"; // Reset height to avoid issues
    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
  };
  const handleDescDoubleClick = () => {
    setIsEditingDesc(true);
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Reset height
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust height
        textAreaRef.current.focus(); // Auto-focus into text area

        const length = textAreaRef.current.value.length;
        textAreaRef.current.setSelectionRange(length, length);
      }
    }, 50);
  };

  const handleDescBlur = () => {
    setIsEditingDesc(false);
    if (tempDescription.trim()) onUpdate(tempDate, tempDescription);
  };

  const handleDescKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleDescBlur();
  };

  // Save changes and exit edit mode
  const handleBlur = () => {
    setIsEditing(false);
    if (tempDate.trim() || tempDescription.trim()) onUpdate(tempDate, tempDescription);
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
    if (eventDotRef.current && descAreaRef.current) {
      const parent = eventDotRef.current.parentElement;
      const descriptionHeight = descAreaRef.current.scrollHeight || 30;
      if (parent) {
        setNestedPosition({ top: parent.offsetTop + + descriptionHeight + 50, left: parent.offsetLeft });
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
        onClick={() => {
          if (isNestedTimelineActive) {
            closeNestedTimeline();
          } else {
            openNestedTimeline();
          }
        }}
      />
      {isEditingDesc ? (
        <TextArea
          ref={textAreaRef}
          value={tempDescription}
          onChange={handleDescChange}
          onBlur={handleDescBlur}
          autoFocus 
        />
      ) : (
        <Description 
        ref={descAreaRef}
        onDoubleClick={handleDescDoubleClick}>{description}
        </Description>
      )}
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
              description={event.description}
              index={index}
              onUpdate={(newDate, newDescription) =>
                setNestedEvents((prevEvents) =>
                  prevEvents.map((ev, i) =>
                    i === index ? { ...ev, date: newDate, description: newDescription } : ev
                  )
                )
              }
              onDelete={deleteNestedEvent}
            />
          </React.Fragment>
        ))}
        { nestedEvents.length && <LastLine/>}
        <EventDotBlue onClick={() => addToNestedEvents("Next event", "description")} />
          
      </NestedTimelineContainer>
    )}
    </>
  );
};

export default TimelineEvent;
