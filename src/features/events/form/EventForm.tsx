import { ChangeEvent, useState } from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { AppEvent } from "../../../app/types/events";
import { createId } from "@paralleldrive/cuid2";

type Props = {
  setFormOpen: (value: boolean) => void;
  addEvent: (event: AppEvent) => void;
  selectedEvent: AppEvent | null;
  updateEvent: (event: AppEvent) => void;
};

export default function EventForm({
  setFormOpen,
  addEvent,
  selectedEvent,
  updateEvent,
}: Props) {
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleFormSubmit = () => {
    // e.preventDefault();
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...formValues })
      : addEvent({
          ...formValues,
          id: createId(),
          hostedBy: "Chatto",
          attendees: [],
          hostPhotoURL: "",
        });

    setFormOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues);
  };

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Update Event" : "Create Event"} />
      <Form onSubmit={handleFormSubmit}>
        <Form.Field>
          <input
            type="text"
            name="title"
            value={formValues.title}
            placeholder="Event title"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="category"
            value={formValues.category}
            placeholder="category"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="description"
            value={formValues.description}
            placeholder="description"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="city"
            value={formValues.city}
            placeholder="City"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            name="venue"
            value={formValues.venue}
            placeholder="Venue"
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            name="date"
            value={formValues.date}
            placeholder="Date"
            onChange={handleInputChange}
          />
        </Form.Field>

        <Button type="submit" floated="right" positive content="Submit" />
        <Button
          onClick={() => setFormOpen(false)}
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
