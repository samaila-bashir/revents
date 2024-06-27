import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { RootState } from "../../../app/store/store";
import { createEvent, updateEvent } from "../../../app/store/slices/events";
import { createId } from "@paralleldrive/cuid2";

export default function EventForm() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === id)
  );
  const navigate = useNavigate();

  const initialValues = event ?? {
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
    id = id ?? createId();

    event
      ? dispatch(updateEvent({ ...event, ...formValues }))
      : dispatch(
          createEvent({
            ...formValues,
            id,
            hostedBy: "Chatto",
            attendees: [],
            hostPhotoURL: "",
          })
        );

    navigate(`/events/${id}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    setFormValues(newFormValues);
  };

  return (
    <Segment clearing>
      <Header content={event ? "Update Event" : "Create Event"} />
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
