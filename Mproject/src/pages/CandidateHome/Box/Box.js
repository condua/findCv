import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from "react-spring";
import './Box.scss'
const Box = ({ data }) => {
  const { id, name, position, language, image } = data;
  const [show, setShown] = useState(false);
  const props3 = useSpring({
    opacity: 1,
    transform: show ? "scale(1.03)" : "scale(1)",
    boxShadow: show
      ? "0 20px 25px rgb(0 0 0 / 25%)"
      : "0 2px 10px rgb(0 0 0 / 8%)"
  });
  return (
    <animated.div className="boxcontainer" style = {props3} onMouseEnter={() => setShown(true)}
    onMouseLeave={() => setShown(false)}>
      <img 
      src={image} 
      alt={name} 
      />
      <p>{name}</p>
      <p>
        {position} - {language}
      </p>
      <Link to = {`/body/detailjob/${id}`} target = "_blank" onClick={(e) => {
                  e.preventDefault();
                  window.open(`/body/detailjob/${id}`, '_blank');
                }}>
      <button>+ Xem</button>
      </Link>
    </animated.div>
  );
};

export default Box;
