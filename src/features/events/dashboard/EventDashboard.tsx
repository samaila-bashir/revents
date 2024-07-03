import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../app/config/firebase";
import { AppEvent } from "../../../app/types/events";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { actions } from "../../../app/store/slices/events";
export default function EventDashboard() {
  const { data: events } = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "events"));

    const unsubscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const evts: AppEvent[] = [];
        querySnapshot.forEach((doc) => {
          evts.push({ id: doc.id, ...doc.data() } as AppEvent);
        });
        dispatch(actions.success(evts));
        setLoading(false);
      },
      error: (err) => {
        console.log(err);
        setLoading(false);
      },
      complete: () => console.log("Will never be called"),
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <LoadingComponent />;

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
