import React from 'react';
import { useState, useEffect } from 'react';
import "./home.scss"
import data from "../data.json"
import { connect, useDispatch, useSelector } from "react-redux"
import { getEventsRequest } from "../../../redux/action/eventActions"


import lastestInterviews from "../lastestInterviews.json"
import {BsCircle} from "react-icons/bs"
import axios from "axios"
import { Link } from 'react-router-dom';
import {Timeline} from 'antd'
import event from "../event.json"
import useUser from '../../../hooks/useUser.js';
import avatar from "../../../assets/No_image_available.png"


const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [interviewsData, setInterviewsData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    const currentUser = useUser()
    const [eventTable, setEventTable] = useState([]);
    
    const apiUrl = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/event';

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
      };
    
    
    const dispatch = useDispatch()
    const getAllUser = useSelector(state => {
        const userData = state.getuser.usernames.data.data;
        const candidateUsers = userData.filter(user => user.permission === "CANDIDATE");
        return candidateUsers;
      });
    const loading = useSelector(state => state.getuser.loading)

 


    console.log(getAllUser)
    const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl);
          setEventTable(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

    useEffect(() => {
        // Dispatch action để gọi API và lấy dữ liệu sự kiện
        fetchData();
        dispatch(getEventsRequest())
    }, [dispatch])

    function getRandomColor() {
        // const colors = ['green', 'red', 'gray', 'blue', 'purple'];
        // let currentIndex = 0;

        // return () => {
        //     const color = colors[currentIndex];
        //     currentIndex = (currentIndex + 1) % colors.length;
        //     return color;
        // };
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
    }
    useEffect(() => {
        const filteredData = data.filter(
          item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setTableData(filteredData);
      }, [searchQuery]);

 

    useEffect(() => {
        // fetchEvents();
        dispatch(getEventsRequest())
    }, [dispatch]);
    const event_title = useSelector((state) => state.events)

    console.log(event_title)

    // const fetchEvents = async () => {
    //     try {
    //       const response = await axios.get('./event.json');
    //       const data = response.data;
    //       setEvents(data);
    //       console.log(data)
    //     } catch (error) {
    //       console.error('Error fetching events:', error);
    //     }
    //   };
    
    // const fetchInterviews{
    //     try {
    //         const response = await axios.get('./event.json');
    //         const data = response.data;
    //         setEvents(data);
    //       } catch (error) {
    //         console.error('Error fetching events:', error);
    //       }
    //     };
    // }
      const getStatusColor = (status) => {

        switch (status) {
          case 'INPROCESS':
            return {
                padding:'6px, 12px, 6px, 12px',
                textAlign:'center',
                color:'#00A3FF',
                backgroundColor:'#F1FAFF',
                border:'none',
                padding:'8px 6px',
                borderRadius:'30px',
                fontWeight:'bolder'
                };
          case 'In Transit':
            return {
                padding:'6px, 12px, 6px, 12px',
                textAlign:'center',
                color:'#F1BC00',
                backgroundColor:'#FFF8DD',
                border:'none',
                padding:'8px 6px',
                borderRadius:'30px',
                fontWeight:'bolder'
                };
          case 'ACCEPT':
            return {
                padding:'6px, 12px, 6px, 12px',
                textAlign:'center',
                color:'rgb(10 181 0)',
                backgroundColor:'#E8FFF3',
                border:'none',
                padding:'8px 6px',
                borderRadius:'30px',
                fontWeight:'bolder'
                };
          default:
            return {
                padding:'6px, 12px, 6px, 12px',
                textAlign:'center',
                color:'red',
                backgroundColor:'#FFF5F8',
                border:'none',
                padding:'8px 6px',
                borderRadius:'30px',
                fontWeight:'bolder'
                };
        }
      };
      if(loading === true)
      {
          return (<div>loading</div>)
      }
    return (
        <div className='home'>
            <div className="flex w-full absolute right-[1px] top-[-50px] bg-white h-16 rounded-xl items-center">
                <div className="ml-10 font-serif text-xl text">Trang chủ Interviewer</div>
            </div>
            <p style={{margin:'35px 0px -25px 35px', fontWeight:'bolder'}}>Các ứng viên gần đây</p>
                <div className='container-cv' >
                    <div className='table-cv'>
                    <table id="candidates-cv">
                        <thead>
                            <tr style={{ position: 'sticky', position: '-webkit-sticky', backgroundColor: '#FFFFFF',color:'black' }}>
                                <th>Avatar</th>
                                <th>Họ và tên</th>
                                <th>Ngày khởi tạo</th>
                                <th>Vị trí ứng tuyển</th>
                                <th>Trạng thái</th>
                                {/* <th>Chi tiết</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {getAllUser.map(item => (
                                
                                <tr key={item.id}>
                                    {/* <td> <img src={item.avt} className='ava'/></td> */}
                                        <td>
                                            {item.avt ? (
                                                <img src={item.avt} className='ava' alt="User Avatar" />
                                            ) : (
                                                <img src={avatar} className='ava' alt="Default Avatar" />
                                            )}
                                            </td>
                                        <td>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>    
                                    </td>
                                    <td>{formatDate(item.dateRegister)}</td>
                                    <td>
                                       <div>
                                        {item.listJobPosting.map(position => (
                                            <p>{position.position}</p>
                                        )
                                        )}
                                       </div>
                                    </td>
                                    {/* <td>{item.position}</td> */}
                                    <td style={{paddingRight:'20px'}}>
                                        <div style={getStatusColor(item.status)}>
                                            {item.status}
                                        </div>
                                    </td>
                                    
                                    
                                    {/* <td><button className='button-edit' style={{ border: '1px solid #00A3FF'}}><Link style={{textDecoration:'none', color:'black'}} to={`../managecandidate/${item.id}`}>View</Link></button></td> */}
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                    </div>
                                
                    <div className='event'>
                        {/* <BsCircle style={{color:'blue'}}/> */}
                        <h2 style={{fontSize:'20px'}}>Các sự kiện của công ty</h2>
                        <div className='event-list'>
                        <Timeline style={{ marginTop: '5px', marginLeft: '20px' }}
                            items={eventTable.map((event) => {
                                // Kiểm tra điều kiện event.status === true
                                if (event.status === true) {
                                    return {
                                        color: getRandomColor(),
                                        children: (
                                            <>
                                                <p>{event.title}</p>
                                                <p>{formatDate(event.time)}</p>
                                            </>
                                        ),
                                    };
                                }
                                // Nếu event.status === false hoặc không có status, không tạo item cho Timeline
                                return null;
                            })}
                        />
                    </div>
                    </div>
                </div>
                <h4 style={{margin:'30px'}}>Các cuộc phỏng vấn gần đây</h4>
               
                {/* {interviewsData.map((item)=>(<div>{interviewsData.name}</div>))
                } */}
                                
                

                <div className='container-company'>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                    <div className='company-item'>
                        <div className='company-item-top'>
                            <img className='logo' src='https://lezebre.lu/images/detailed/17/30476-Perodua-Myvi.png'/>
                            <h3>Mivy App</h3>
                            <p>CRM App application to HR fficiency</p>
                            <button className='status'>In Progress</button>
                        </div>
                        <div className='company-item-mid'>
                            <p>First, a disclaimer – the entire process of writing a blog post often takes more than a couple of hours, even if you can type eighty words per minute and your writing skills are sharp. From the seed of the idea to finally hitting speed</p>
                        </div>
                        <div className='company-item-bot'>
                            <button className='date'>
                                <h4>Feb 6, 2021</h4>
                                <p>Due date</p>
                            </button>
                            <button className='salary'>
                                <h4>3</h4>
                                <p>Số người tham gia</p>
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default Home;