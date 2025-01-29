import * as React from 'react';
import { useState } from "react";
import { AddEventFormContainer, Input, Button } from "../styling/styles";

interface Props {
  onAddEvent: (date: string, description: string) => void;
}

const AddEventForm: React.FC<Props> = ({ onAddEvent }) => {
  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDate && newDescription) {
      onAddEvent(newDate, newDescription);
      setNewDate("");
      setNewDescription("");
    }
  };

  return (
    <AddEventFormContainer onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Date"
        value={newDate}
        onChange={(e) => setNewDate(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
      />
      <Button type="submit">Add Event</Button>
    </AddEventFormContainer>
  );
};

export default AddEventForm;
