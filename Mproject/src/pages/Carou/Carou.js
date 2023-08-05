import Carousel from 'react-bootstrap/Carousel';
import './Carou.scss';

function Carou() {
  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <Carousel>
        <Carousel.Item>
          <div className="carouimage-container">
            <img
              className="d-block w-100"
              style={{ height: '40vh', objectFit: 'cover' }}
              src="Slide1.png"
              alt="First slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carouimage-container">
            <img
              className="d-block w-100"
              style={{ height: '40vh', objectFit: 'cover' }}
              src="Slide4.png"
              alt="Second slide"
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carouimage-container">
            <img
              className="d-block w-100"
              style={{ height: '40vh', objectFit: 'cover' }}
              src="Slide3.png"
              alt="Third slide"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Carou;
