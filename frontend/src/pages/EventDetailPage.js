import { json, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const { event } = useLoaderData();
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
    }, {
        status: 500,
      });
  }
  return response;
}
