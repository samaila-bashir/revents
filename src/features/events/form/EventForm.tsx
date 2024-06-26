import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";

export default function EventForm() {
  const initialValues = {
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
    // selectedEvent
    //   ? updateEvent({ ...selectedEvent, ...formValues })
    //   : addEvent({
    //       ...formValues,
    //       id: createId(),
    //       hostedBy: "Chatto",
    //       attendees: [],
    //       hostPhotoURL: "",
    //     });
    // setFormOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues);
  };

  return (
    <Segment clearing>
      <Header content={"Create Event"} />
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
        <Button as={Link} to="/events" floated="right" content="Cancel" />
      </Form>
    </Segment>
  );
}
