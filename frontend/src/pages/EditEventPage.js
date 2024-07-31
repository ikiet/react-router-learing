import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditEventPage = () => {
  const { event } = useRouteLoaderData('eventDetail');
  return <EventForm event={event} method='PATCH'/>;
};

export default EditEventPage;
