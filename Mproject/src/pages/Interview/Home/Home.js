import React from 'react';
import { useState, useEffect } from 'react';
import "./home.scss"
import data from "../data.json"

import lastestInterviews from "../lastestInterviews.json"
import {BsCircle} from "react-icons/bs"
import axios from "axios"
import { Link } from 'react-router-dom';
import {Timeline} from 'antd'
import event from "../event.json"
import useUser from '../../../hooks/useUser.js';

const Home = () => {
    const [tableData, setTableData] = useState([]);
    const [interviewsData, setInterviewsData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState([]);
    const currentUser = useUser()
        
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
        fetchEvents();

    }, []);

    const fetchEvents = async () => {
        try {
          const response = await axios.get('./event.json');
          const data = response.data;
          setEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
    
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
          case 'In Progress':
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
          case 'Approved':
            return {
                padding:'6px, 12px, 6px, 12px',
                textAlign:'center',
                color:'#50CD89',
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
    return (
        <div className='home'>
            
            <p style={{margin:'35px 0px -25px 35px', fontWeight:'bolder'}}>Các ứng viên gần đây</p>
                <div className='container-cv' >
                    <div className='table-cv'>
                    <table id="candidates-cv">
                        <thead>
                            <tr style={{ position: 'sticky', position: '-webkit-sticky', backgroundColor: '#FFFFFF',color:'black' }}>
                                <th>Avatar</th>
                                <th>Họ và tên</th>
                                <th>Ngày phỏng vấn</th>
                                <th>Vị trí ứng tuyển</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map(item => (
                                
                                <tr key={item.id}>
                                    <td> <img src={item.image} className='ava'/></td>
                                    <td>
                                        <p>{item.name}</p>
                                        <p>{item.email}</p>    
                                    </td>
                                    <td>{item.date}</td>
                                    <td>{item.position}</td>
                                    <td>
                                        <div style={getStatusColor(item.status)}>
                                            {item.status}
                                        </div>
                                    </td>
                                    
                                    
                                    <td><button className='button-edit'><Link style={{textDecoration:'none',color:'white'}} to={`../managecandidate/${item.id}`}>Edit</Link></button></td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                    </div>
                                
                    <div className='event'>
                        {/* <BsCircle style={{color:'blue'}}/> */}
                        <h2 style={{fontSize:'20px'}}>Các sự kiện sắp tới của công ty</h2>
                        <div className='event-list'>
                                <Timeline style={{marginTop:'5px'}}
                                    items={event.map((event) => ({
                                        color:getRandomColor(),
                                        children: (
                                            <>
                                                <p>{event.name}</p>
                                                <p>{event.date}</p>
                                            </>
                                        ),
                                    }))}
                                />
                        </div>
                        
                       
                        {/* <div className='event-list'>
                                {event.map(event=>(
                                    <div className='event-item' key={event.name}>
                                        <h4>{event.name}</h4>
                                        <p>{event.date}</p>
                                    </div>
                                ))}
                            
                        </div> */}
                      
                    
                        {/* <div className='event-list'>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            <div className='event-item'>
                                <h4>JobFair tại trường đại học Bách Khoa</h4>
                                <p>11 Jul 8:10 PM</p>
                            </div>
                            
                        </div> */}

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