import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { TimelineContainer, TimelineWrapper, TitleInput, 
  Title, TitleContainer } from "../styling/styles";
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
  const [events, setEvents] = useState<Event[]>([
    { date: "Event One", description: "Add your Event" },
  ]);

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
  const addEvent = (date: string, description: string) => {
    setEvents([...events, { date, description }]);
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
          <TimelineEvent key={index} date={event.date} onUpdate={(newDate) => updateEvent(index, newDate)} />
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default Timeline;
