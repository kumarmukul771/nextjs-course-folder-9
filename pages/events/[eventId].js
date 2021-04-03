import { Fragment } from 'react';
import Head from 'next/head';
import path from "path";
import fs from "fs"

import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Comments from '../../components/input/comments';

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name='description'
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} comments={props.comments} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);
  const filePath = path.join(process.cwd(), "data", "comments.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    const responseData = [];
    data.map((comment) => {
      if (comment.eventId === context.params.eventId) {
        responseData.push(comment);
      }
    });

    console.log(responseData);

  return {
    props: {
      selectedEvent: event,
      comments: responseData
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export default EventDetailPage;
