import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import { BiCalendarAlt, BiUser, BiComment } from "react-icons/bi"; 
import { useSpring, animated } from "react-spring";
import "./EventBox.scss"; // Import file CSS riêng cho EventBox

const EventBox = ({ event }) => {
  const [show, setShown] = useState(false);
  const props3 = useSpring({
    opacity: 1,
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div className="event-box" style = {props3} onMouseEnter={() => setShown(true)}
    onMouseLeave={() => setShown(false)}>
      <img src={event.image} alt="Event" />
      <h2>{event.name}</h2>
      <p>{event.article}</p>
      <div className="event-details">
        <div className="event-detail">
          <BiCalendarAlt /> {/* React Icon */}
          <span>{event.time}</span>
        </div>
        <div className="event-detail">
          <BiUser /> {/* React Icon */}
          <span>{event.author}</span>
        </div>
        <div className="event-detail">
          <BiComment /> {/* React Icon */}
          <span>Comment</span>
        </div>
      </div>
      <Link to = {`/candidateevent/detailevent/${event.id}`} target = "_blank" onClick={(e) => {
                  e.preventDefault();
                  window.open(`/candidateevent/detailevent/${event.id}`, '_blank');
                }}>
      <Button variant="outline-success">Tìm hiểu thêm</Button>
      </Link>
    </animated.div>
  );
};

export default EventBox;
