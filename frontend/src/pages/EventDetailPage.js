import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const { event } = useRouteLoaderData('eventDetail');
  return (<>
    <EventItem event={event} />
  </>);
};

export default EventDetailPage;

export const loader = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
  if (!response.ok) {
    throw json({
      message: "Failed to fetch event detail",
    }, { status: 500 });
  }
  return response;
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
