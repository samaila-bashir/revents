import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Header, Message, Segment } from "semantic-ui-react";
import { RootState } from "../../../app/store/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryData } from "./categoryOptions";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { AppEvent } from "../../../app/types/events";
import {
  Timestamp,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { toast } from "react-toastify";

export default function EventForm() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ mode: "onTouched" });
  const { id } = useParams();
  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === id)
  );
  const navigate = useNavigate();

  const updateEvent = async (data: AppEvent) => {
    if (!event) return;
    const docRef = doc(db, "events", event.id);
    await updateDoc(docRef, {
      ...data,
      date: Timestamp.fromDate(data.date as unknown as Date),
    });
  };

  const createEvent = async (data: FieldValues) => {
    const newEventRef = doc(collection(db, "events"));
    await setDoc(newEventRef, {
      ...data,
      hostedBy: "Chatto",
      attendees: [],
      hostPhotoURL: "",
      date: Timestamp.fromDate(data.date as unknown as Date),
    });

    return newEventRef;
  };

  const handleFormSubmit = async (data: FieldValues) => {
    try {
      if (event) {
        await updateEvent({ ...event, ...data });
        navigate(`/events/${event.id}`);
      } else {
        const ref = await createEvent(data);
        navigate(`/events/${ref.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <Segment clearing>
      <Header content="Event details" sub color="teal" />
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <Form.Field error={errors.title}>
          <input
            placeholder="Event title"
            defaultValue={event?.title || ""}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <Message negative>
              <p>Title is required</p>
            </Message>
          )}
        </Form.Field>

        <Form.Field error={errors.category}>
          <select
            defaultValue={event?.category || ""}
            {...register("category", { required: true })}
          >
            <option value="">Select a category</option>
            {categoryData.map((category) => (
              <option value={category.value} key={category.key}>
                {category.text}
              </option>
            ))}
          </select>
          {errors.category && (
            <Message negative>
              <p>Category is required</p>
            </Message>
          )}
        </Form.Field>

        <Form.Field error={errors.description}>
          <textarea
            placeholder="Description"
            defaultValue={event?.description || ""}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <Message negative>
              <p>Description is required</p>
            </Message>
          )}
        </Form.Field>

        <Header content="Location details" sub color="teal" />

        <Form.Field error={errors.city}>
          <input
            placeholder="City"
            defaultValue={event?.city || ""}
            {...register("city", { required: true })}
          />
          {errors.city && (
            <Message negative>
              <p>City is required</p>
            </Message>
          )}
        </Form.Field>

        <Form.Field error={errors.venue}>
          <input
            placeholder="Venue"
            defaultValue={event?.venue || ""}
            {...register("venue", { required: true })}
          />
          {errors.venue && (
            <Message negative>
              <p>Venue is required</p>
            </Message>
          )}
        </Form.Field>

        <Form.Field>
          <Controller
            name="date"
            control={control}
            rules={{ required: true }}
            defaultValue={(event && new Date(event.date)) || null}
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(value) =>
                  setValue("date", value, { shouldValidate: true })
                }
                showTimeSelect
                timeCaption="time"
                dateFormat="MMM d, yyyy h:mm aa"
                placeholderText="Event date and time"
              />
            )}
          />
          {errors.date && (
            <Message negative>
              <p>Date is required</p>
            </Message>
          )}
        </Form.Field>

        {/* <Form.Field error={errors.date}>
          <input
            type="date"
            placeholder="Date"
            defaultValue={event?.date || ""}
            {...register("date", { required: true })}
          />
          {errors.date && (
            <Message negative>
              <p>Date is required</p>
            </Message>
          )}
        </Form.Field> */}

        <Button
          disabled={!isValid}
          loading={isSubmitting}
          type="submit"
          floated="right"
          positive
          content="Submit"
        />
        <Button
          disabled={isSubmitting}
          as={Link}
          to="/events"
          floated="right"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
