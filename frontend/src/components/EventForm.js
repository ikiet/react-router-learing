import { Form, useActionData, useNavigate, useNavigation, json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const navigate = useNavigate();

  const actionData = useActionData();

  const { state } = useNavigation();
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {
        actionData?.errors && <ul>
          {Object.values(actionData?.errors).map((error) => 
            (<li key={error}>{error}</li>)
          )}
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required
          defaultValue={event?.title} 
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required
          defaultValue={event?.image} 
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required
          defaultValue={event?.date} 
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required
          defaultValue={event?.description} 
        />
      </p>
      <div className={classes.actions}>
        <button type="button" disabled={state === 'submitting'} onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={state === 'submitting'}>{ state === 'submitting' ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export const action = async ({ request, params }) => {

  const method = request.method;

  const formData = await request.formData();

  const data = {
    title: formData.get('title'),
    image: formData.get('image'),
    date: formData.get('date'),
    description: formData.get('description'),
  }

  let url = 'http://localhost:8080/events';

  if(method === 'PATCH') {
    url = 'http://localhost:8080/events/' + params.eventId;
  }

  const response = await fetch(url, {
    method: method,
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

export default EventForm;
