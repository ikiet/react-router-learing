import { Suspense } from "react";
import { json, useRouteLoaderData, redirect, defer, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { loadEvents } from "./EventsPage";

export const Loading = () => {
  return (<div style={{textAlign: 'center'}}>Loading...</div>);
}

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('eventDetail');
  return (<>
    <Suspense fallback={<Loading/>}>
      <Await resolve={event}>{ loadedEvent => 
        <EventItem event={loadedEvent} />
      }
      </Await>
    </Suspense>
    <Suspense fallback={<Loading/>}>
      <Await resolve={events}>
        {loadedEvents => 
          <EventsList events={loadedEvents}/>
        }
      </Await>
    </Suspense>
  </>);
};

export default EventDetailPage;

const loadEvent = async (eventId) => {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!response.ok) {
    throw json({
      message: "Failed to fetch event detail",
    }, { status: 500 });
  }
  const resData = await response.json();
  return resData.event;
}

export const loader = async ({ params }) => {
  const eventId = params.eventId;
  return defer({
    event: await loadEvent(eventId),
    events: loadEvents(),
  });
}

export const action = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
    method: 'delete'
  });
  if (!response.ok) {
    throw json({
      message: "Failed to delete event"
    }, { status: 500 })
  }
  return redirect('/events');
}
