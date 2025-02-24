import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { TimelineContainer, TimelineWrapper, TitleInput, 
  Title, TitleContainer, EventDotBlue, AddEventCircle, Line, LastLine} from "../styling/styles";
import TimelineEvent from "./TimelineEvent";
import AddEventForm from "./AddEventForm";

export interface Event {
  date: string;
  description: string;
}


const Timeline: React.FC = () => {
  const [isDropDownHidden, setIsDropDownHidden] = useState(true);
  const [title, setTitle] = useState("Begin Your TimeLine!");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const timeLineHidden = useState(false);
  const [events, setEvents] = useState<Event[]>([
    { date: "Event One", description: "Add your Event" },
  ]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.style.width = `${titleInputRef.current.value.length * 12}px`;
        titleInputRef.current.focus();
      }
    }, 50);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    e.target.style.width = `${e.target.value.length * 12}px`; // Dynamic resizing
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (!title.trim()) setTitle("Your Timeline"); // Default text if empty
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

  const deleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const updateEvent = (index: number, newDate: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event, i) => (i === index ? { ...event, date: newDate } : event))
    );
  };

  return (
    <TimelineContainer>
        {isEditingTitle ? (
          <TitleInput
            ref={titleInputRef}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={(e) => e.key === "Enter" && handleTitleBlur()}
          />
        ) : (
          <Title onDoubleClick={handleTitleDoubleClick}>{title}</Title>
        )}
      <TimelineWrapper>
        {events.map((event, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <Line
                onMouseEnter={() => setHoverIndex(index - 1)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => addEvent("New Event", "description", index - 1)}
                
              />
            )}
            <TimelineEvent
              date={event.date}
              index={index}
              onUpdate={(newDate) =>
                setEvents((prevEvents) =>
                  prevEvents.map((ev, i) =>
                    i === index ? { ...ev, date: newDate } : ev
                  )
                )
              }
              onDelete={deleteEvent}
            />
            
          </React.Fragment>
          
        ))}
        <LastLine/>
        <EventDotBlue onClick={() => addEvent("Next event", "description")} />
          
      </TimelineWrapper>
      
    </TimelineContainer>
  );
};

export default Timeline;
