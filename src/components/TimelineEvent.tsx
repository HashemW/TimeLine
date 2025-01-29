import * as React from 'react';
import { EventDot, EventLabel } from "../styling/styles";

interface Props {
  date: string;
}

const TimelineEvent: React.FC<Props> = ({ date }) => {
  return (
    <div style={{ position: "relative" }}>
      <EventDot />
      <EventLabel>{date}</EventLabel>
    </div>
  );
};

export default TimelineEvent;
