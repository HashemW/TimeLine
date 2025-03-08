import * as React from 'react';
import {useState, useRef} from "react";
import { EventDotGreen, EventLabel, Input, LineContent, 
  DeleteButton, Overlay, NestedTimelineContainer, TextArea,
  TimelineWrapper, Line, EventDotBlue,LastLine, Description, InputDesc  } from "../styling/styles";
import Timeline from './Timeline';

interface Props {
  date: string;
  description: string;
  nestedEvents?: Event[];
  index: number;
  onUpdate: (newDate: string, newDescription: string, nestedEvents?: Event[]) => void;
  onDelete: (index: number) => void;
}

export interface Event {
  date: string;
  description: string;
  nestedEvents?: Event[];
}

const TimelineEvent: React.FC<Props> = ({ date, description, nestedEvents = [], index, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);
  const [localNestedEvents, setLocalNestedEvents] = useState<Event[]>(nestedEvents);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isNestedTimelineActive, setIsNestedTimelineActive] = useState(false);
  const eventDotRef = useRef<HTMLDivElement>(null);
  const [nestedPosition, setNestedPosition] = useState({ top: 0, left: 0 });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const descAreaRef = useRef<HTMLDivElement>(null);

  const handleDescBlur = () => {
    setIsEditingDesc(false);
    if (tempDescription.trim()) onUpdate(tempDate, tempDescription);
  };

  // Save changes and exit edit mode
  const handleBlur = () => {
    setIsEditing(false);
    if (tempDate.trim() || tempDescription.trim()) onUpdate(tempDate, tempDescription);
  };

  const deleteNestedEvent = (nestedIndex: number) => {
    const updatedNestedEvents = localNestedEvents.filter((_, i) => i !== nestedIndex);
    setLocalNestedEvents(updatedNestedEvents);
    onUpdate(tempDate, tempDescription, updatedNestedEvents);
  };

  const addToNestedEvents = (newDate: string, newDescription: string, position?: number) => {
    const updatedNestedEvents = [...localNestedEvents];
    const newEvent = { date: newDate, description: newDescription, nestedEvents: [] };
    if (position !== undefined) {
      updatedNestedEvents.splice(position, 0, newEvent);
    } else {
      updatedNestedEvents.push(newEvent);
    }
    setLocalNestedEvents(updatedNestedEvents);
    onUpdate(tempDate, tempDescription, updatedNestedEvents);
  };
  // Handle Enter key to save changes
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
      <Overlay isActive={isNestedTimelineActive} onClick={closeNestedTimeline} />
      <LineContent>
        {isEditing ? (
          <Input
            ref={inputRef}
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <EventLabel onDoubleClick={() => setIsEditing(true)}>{date}</EventLabel>
        )}
        <DeleteButton onClick={() => onDelete(index)}>X</DeleteButton>
        <EventDotGreen 
          ref={eventDotRef}
          onClick={isNestedTimelineActive ? closeNestedTimeline : openNestedTimeline}
        />
        {isEditingDesc ? (
          <TextArea
            ref={textAreaRef}
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            onBlur={handleDescBlur}
            autoFocus 
          />
        ) : (
          <Description ref={descAreaRef} onDoubleClick={() => setIsEditingDesc(true)}>{description}</Description>
        )}
      </LineContent>
      {isNestedTimelineActive && (
        <NestedTimelineContainer style={{ position: "absolute", top: nestedPosition.top, left: nestedPosition.left }}>
          
          {localNestedEvents.map((event, nestedIndex) => (
            <React.Fragment key={nestedIndex}>
              
              <TimelineEvent
                key={nestedIndex}
                date={event.date}
                description={event.description}
                nestedEvents={event.nestedEvents || []}
                index={nestedIndex}
                onUpdate={(newDate, newDescription, updatedNestedEvents) => {
                  const updatedEvents = [...localNestedEvents];
                  updatedEvents[nestedIndex] = { date: newDate, description: newDescription, nestedEvents: updatedNestedEvents };
                  setLocalNestedEvents(updatedEvents);
                  onUpdate(tempDate, tempDescription, updatedEvents);
                }}
                onDelete={deleteNestedEvent}
              />
              <div style={{color: 'black', height: '-2px', marginTop: '-4px'}}>
                {(
                  <Line
                    onMouseEnter={() => setHoverIndex(index - 1)}
                    onMouseLeave={() => setHoverIndex(null)}
                    onClick={() => addToNestedEvents("New Event", "description", nestedIndex + 1)}
                  
                  />
                )}
              </div>
            </React.Fragment>
          ))}

          <EventDotBlue onClick={() => addToNestedEvents("New Event", "Description")} />
        </NestedTimelineContainer>
      )}
    </>
  );
};

export default TimelineEvent;
