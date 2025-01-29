import * as React from 'react';
import { useState } from "react";
import { TimelineContainer, TimelineWrapper } from "../styling/styles";
import TimelineEvent from "./TimelineEvent";
import AddEventForm from "./AddEventForm";

export interface Event {
  date: string;
  description: string;
}

const Timeline: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { date: "January 14", description: "Event 1" },
    { date: "August", description: "Event 2" },
    { date: "October", description: "Event 3" },
  ]);

  const addEvent = (date: string, description: string) => {
    setEvents([...events, { date, description }]);
  };

  return (
    <TimelineContainer>
      <h2>Custom Timeline</h2>
      <TimelineWrapper>
        {events.map((event, index) => (
          <TimelineEvent key={index} date={event.date} />
        ))}
      </TimelineWrapper>
      <AddEventForm onAddEvent={addEvent} />
    </TimelineContainer>
  );
};

export default Timeline;
