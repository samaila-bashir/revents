import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
export default function EventDashboard() {
  const { events } = useSelector((state: RootState) => state.events);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
    </Grid>
  );
}
