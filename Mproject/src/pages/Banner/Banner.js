import "./Banner.scss";
import { v4 as uuidv4 } from "uuid";
import Card from "../Banner/Card/Card";
import Carousel from "../Banner/Card/Carousel";

function Banner() {
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://fptsoftware.com/-/media/project/fpt-software/fso/award/274041143_624693228830581_8047626086589313667_n.jpg?h=534&iar=0&w=1024&modified=20230510044211&hash=AD97AABAFE0B932D3D140E7E4B43C9DC"
          description="FPT Software Recognized in 2022 Gartner® Market Guide for Public Cloud Managed and Professional Services Providers, Asia/Pacific Twice in a Row"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://fptsoftware.com/-/media/project/fpt-software/fso/award/330890897_501331158838673_3271195029717169642_n-2048x1072.jpg?h=1072&iar=0&w=2048&modified=20230509094005&hash=AA5DE90E6381DE4E37ADF079CC89C42F"
          description="FPT Software Recognized in 2022 Gartner® Peer Insights™ ‘Voice of the Customer’: Robotic Process Automation"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://fptsoftware.com/-/media/project/fpt-software/fso/award/web.png?h=916&iar=0&w=1750&modified=20230509094005&hash=5D4011A71B52655F94EACFFAD6F1A89B"
          description="FPT Software: Two Gold Stevie® 2023 Award Winner"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://fptsoftware.com/-/media/project/fpt-software/fso/award/306489232_603632251305787_3158800900337697709_n-2048x1367.jpg?h=1367&iar=0&w=2048&modified=20230509094328&hash=B93AF7B36DEAF37DDE0113D6CA2C545F"
          description="FPT Software Honored at Top 10 ICT Companies Awards 2022"
        />
      )
    },
    {
      key: uuidv4(),
      content: (
        <Card
          imagen="https://fptsoftware.com/-/media/project/fpt-software/fso/award/4-1024x536.png?h=536&iar=0&w=1024&modified=20230509103248&hash=2AF0F541243B1544B90BEC9F2282C6CA"
          description="FPT Software Wins Big at 17th Annual 2022 Information Technology World Awards®"
        />
      )
    }
  ];

  return (
    <div className="">
      <Carousel
        cards={cards}
        height="500px"
        width="100%"
        margin="0 auto"
        offset={200}
        showArrows={false}
      />
    </div>
  );
}

export default Banner;
