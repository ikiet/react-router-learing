import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return <EventForm/>;
};

export default NewEventPage;

export const action = async ({ request }) => {

  const formData = await request.formData();

  const data = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description'),
  }

  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({message: 'Failed to create event'}, {
      status: 500,
    });
  }
  return redirect('/events');

}
