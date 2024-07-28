import EventsNavigation from './EventsNavigation';
import { Outlet } from 'react-router-dom';

const EventRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet/>
    </>
  )
}

export default EventRootLayout;
