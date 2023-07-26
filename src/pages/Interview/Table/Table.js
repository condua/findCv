import React, { useEffect, useState, useRef } from 'react';
import data from '../data.json';
import './Table.scss';
import {BsCameraVideo} from "react-icons/bs"
import {MdOutlineCalendarMonth} from "react-icons/md"
import {BsChatDots} from "react-icons/bs"
import { Link } from 'react-router-dom';
import {TbPlayerTrackNextFilled} from "react-icons/tb"

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const [isToggled, setIsToggled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);



  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  // useEffect(() => {
  //   const filteredData = data.filter(
  //     item =>
  //       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       item.email.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setTableData(filteredData.slice(startIndex, endIndex));
    
  // }, [searchQuery, currentPage]);
  useEffect(() => {
    const filteredData = data.filter(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    // Make sure the currentPage is within a valid range
    const validPage = Math.max(1, Math.min(currentPage, totalPages));

    // Calculate the starting index and ending index for the current page
    const startIndex = (validPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setTableData(filteredData.slice(startIndex, endIndex));
    setCurrentPage(validPage);
  }, [searchQuery, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset the currentPage to 1 when performing a search
    setSearchQuery(e.target.value);
  };


  const handleSortByName = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortById = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder.id === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
    setTableData(sortedData);
    setSortOrder(prevState => ({ ...prevState, id: sortOrder.id === 'asc' ? 'desc' : 'asc' }));
  };

  const handleSortByEmail = () => {
    const sortedData = [...tableData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });
    setTableData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleNameClick = (person) => {
    setSelectedPerson(person);
    setIsSidebarOpen(true);
    setIsToggled(true)
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };


  useEffect(() => {
    const handleClickOutsideSidebar = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !containerRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutsideSidebar);

    return () => {
      document.removeEventListener('click', handleClickOutsideSidebar);
    };
  }, []);

  const handleClickInfo = () => {
    setIsToggled(true);
  };
  const handleClickCV = () => {
    setIsToggled(false);
  };
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
    
    <div className='manage-candidate' style={{width:'100%',height:'auto',backgroundColor:'#e9ecef',paddingBottom:'92px',paddingTop:'1px'}} id='table-manage'>
      <div className="flex w-full absolute right-[1px] mt-[-70px] bg-white h-16 rounded-xl items-center">
                  <div className="ml-10 font-serif text-xl text">Quản lý ứng viên</div>
              </div>
        <div className="outer-wrapper"  >
          <div className="table-wrapper" >
            <input
              className='searchItem'
              style={{ width: '200px' }}
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name or email"
            />
            <div style={{width:'100%',height:'100%', marginTop:'20px'}}>
              <table id="candidates" ref={containerRef} >
                <thead>
                  <tr style={{ position: 'sticky', position: '-webkit-sticky', backgroundColor: 'blue' }}>
                    {/* <th onClick={handleSortById}>ID
                    {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                    </th> */}
                    <th>Avatar</th>
                    <th onClick={handleSortByName}>
                      Name
                      {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                    </th>
                    {/* <th onClick={handleSortByEmail}>
                    Email
                    {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                    </th> */}
                    <th>Ngày phỏng vấn</th>
                    <th>Vị trí ứng tuyển</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(item => (
                    <tr key={item.id} onClick={() => handleNameClick(item)} style={{cursor:'pointer'}}>
                      {/* <td>{item.id}</td> */}
                      <td style={{paddingRight:'5px'}}>
                        <img className='avatar-img' src={item.image}/>
                          
                        
                      </td>
                      <td onClick={() => handleNameClick(item)} style={{cursor:'pointer'}}>
                        <p style={{marginBottom:'10px'}}>{item.name}</p>
                        <p>{item.email}</p>
                      </td>
                      <td>{item.date}</td>
                      <td>{item.position}</td>
                      <td>
                        <div style={getStatusColor(item.status)}>
                          {item.status}
                        </div>
                      </td>
                      <td style={{alignItems:'center'}}><Link style={{textDecoration:'none'}} to={`./${item.id}`}><button className='edit-button'>Edit</button></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          
        </div>
        <div className="pagination-table">
              <button onClick={handlePrevPage} disabled={currentPage === 1} style={{marginRight:'10px'}}>Previous</button>
              <span>Page {currentPage}/{Math.ceil(data.length/itemsPerPage)}</span>
              <button onClick={handleNextPage} disabled={tableData.length < itemsPerPage} style={{marginLeft:'10px'}}>{/*<TbPlayerTrackNextFilled/>*/}Next</button>
        </div>

        {isSidebarOpen && selectedPerson && (
          <div className='container-table'>
            <div className="container-main" ref={sidebarRef}>
              <div className='containerAvatar'>
                
                  <img src={selectedPerson.image} className='avatar'/>
                
                <div className='name'>
                  <h2>{selectedPerson.name}</h2>
                  
                  <p>Ứng tuyển: Java dev</p>
                  <p style={{marginTop:'10px'}}> Ngày ứng tuyển: 23/06/2023</p>
                  <span style={{marginTop:'10px',display:'flex', cursor:'pointer'}}>
                  <BsCameraVideo/> 
                  <MdOutlineCalendarMonth style={{marginLeft:'10px'}}/>
                  <BsChatDots style={{marginLeft:'10px'}}/>
                  </span>

                </div>
              </div>
              <div className='containerInformation'>
                <div className='button'>
                    <button className='button-info' onClick={handleClickInfo}>Thông tin cá nhân</button>
                    <button className='button-cv' onClick={handleClickCV}>Thông tin CV</button>
                    <button className="close-button" onClick={handleCloseSidebar}>
                      x
                    </button>
                </div>
                {isToggled === true 
                  ? 
                  <div className='information'>
                    <div className='itemInfo'>
                        <h3>Họ và tên: {selectedPerson.name} </h3> 
                    </div>
                    <div className='itemInfo'>
                      <h3>Tài khoản: </h3>
                    </div>
                    <div className='itemInfo'>
                      <h3>Email: {selectedPerson.email}</h3>
                    </div>
                    <div className='itemInfo'>
                      <h3>Số điện thoại:</h3>
                    </div>
                    <div className='itemInfo' style={{height:'25%'}}>
                      <h3 style={{marginBottom:'30px'}}>Địa chỉ:</h3>
                    </div>
                  </div>

                  : 
              
                  <div className='information'>
                    <div className='itemInfo'>
                        <h3>Họ và tên: {selectedPerson.name} </h3> 
                    </div>
                    <div className='itemInfo'>
                      <h3>Học vấn: </h3>
                    </div>
                    <div className='itemInfo'>
                      <h3>Kinh nghiệm làm việc: </h3>
                    </div>
                    <div className='itemInfo'>
                      <h3>Số điện thoại:</h3>
                    </div>
                    <div className='itemInfo' style={{height:'25%'}}>
                      <h3 style={{marginBottom:'30px'}}>Dự án:</h3>
                    </div>
                  </div>
                  }
                
            </div>
            
            {/* Add more information as needed */}
          </div>
        </div>
      )} 
    </div>
    </div>
  );
};

export default Table;


