import EventsList from "../components/EventsList";
const EventsPage = () => {
  const events = [{
    id: "1",
    image: "",
    title: "Event 1",
    date: "2022-12-12",
  },
    {
      id: "2",
      image: "",
      title: "Event 2",
      date: "2022-12-14",
    }
  ];
  return (
    <div>
      <div>Events Page</div>
      <EventsList events={events} />
    </div>
  );
};

export default EventsPage;
