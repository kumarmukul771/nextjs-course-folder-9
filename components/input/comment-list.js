import { getStaticProps } from "../../pages/events/[eventId]";
import classes from "./comment-list.module.css";

function CommentList(props) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {props.comments.length > 0
        ? props.comments.map((data) => (
            <li>
              <p>{data.text}</p>
              <div>
                By <address>{data.name}</address>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
}

export default CommentList;
