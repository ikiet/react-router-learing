import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const { eventId } = useParams();
  return <>
    <div>Event Detail Page</div>
    <div>Event Id: {eventId}</div>
  </>;
};

export default EventDetailPage;
