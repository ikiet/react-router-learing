import { Suspense } from 'react';
import {useLoaderData, json, defer, Await}  from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {

  const { events } = useLoaderData();

  return (

    <Suspense 
      fallback={
        <div style={{textAlign: 'center'}}>Loading...</div>
      }
    >
      <Await resolve={events}>
        {loadedEvents => (
          (<EventsList events={loadedEvents} />)
        )}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export const loader =  async () => {
  return defer(
    {
      events: loadEvents(),
    }
  );
}

export const loadEvents =  async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json(
      {message: 'Failed to fetch events'},
      { status: 500 }
    );
  } 
  const resData = await response.json();
  return resData.events;
}
