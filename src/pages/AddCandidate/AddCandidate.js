import React, { useEffect, useState, useRef } from 'react';
import data from './data.json';
import './AddCandidate.scss';
import { BsCameraVideo } from "react-icons/bs"
import { MdOutlineCalendarMonth } from "react-icons/md"
import { useNavigate, useParams, Link, useHistory } from 'react-router-dom';
import { BsChatDots } from "react-icons/bs"
const AddCandidate = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPerson, setSelectedPerson] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const [isToggled, setIsToggled] = useState(true);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const filteredData = data.filter(
      item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTableData(filteredData);
  }, [searchQuery]);

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
      case 'Đã chấm':
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: '#00A3FF',
          backgroundColor: '#F1FAFF',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
      case 'Đang chấm':
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: '#F1BC00',
          backgroundColor: '#FFF8DD',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
      case 'Chấp nhận':
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: '#50CD89',
          backgroundColor: '#E8FFF3',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
      default:
        return {
          padding: '6px, 12px, 6px, 12px',
          textAlign: 'center',
          color: 'red',
          backgroundColor: '#FFF5F8',
          border: 'none',
          padding: '8px 6px',
          borderRadius: '30px',
          fontWeight: 'bolder'
        };
    }
  };
  const handleAddButton = (item) => {
    navigate(`/room/${id}/candidate/interviewerassign`, { state: { candidateName: item.name } });
  };

  return (
    <div className='AddCandidate-Home'>
      <div style={{ width: '100%', height: 'auto', backgroundColor: '#e9ecef', paddingBottom: '92px', paddingTop: '1px' }}>
        <div className="outer-wrapper"  >
          <div className="table-wrapper">
            <div className='container-search'>
              <input
                className='searchItem'
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name or email"

              />
              <span class="search-icon"></span>
            </div>

            <div style={{ width: '100%', height: '100%', overflowY: 'scroll', marginTop: '20px' }}>
              <table id="candidates" ref={containerRef} >
                <thead>
                  <tr style={{ position: 'sticky', position: '-webkit-sticky', backgroundColor: 'blue' }}>
                    {/* <th onClick={handleSortById}>ID
                {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th> */}
                    <th style={{ borderLeft: '1px dashed ' }}>Avatar</th>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map(item => (
                    <tr key={item.id} onClick={() => handleNameClick(item)} style={{ cursor: 'pointer' }}>
                      {/* <td>{item.id}</td> */}
                      <td style={{ paddingRight: '5px' }}>
                        <img className='avatar-img' src={item.image} />


                      </td>
                      <td onClick={() => handleNameClick(item)} style={{ cursor: 'pointer' }}>
                        <p style={{ marginBottom: '10px' }}>{item.name}</p>
                        <p>{item.email}</p>
                      </td>
                      <td>{item.date}</td>
                      <td>{item.position}</td>
                      <td>
                        <div style={getStatusColor(item.status)}>
                          {item.status}
                        </div>
                      </td>
                      <td style={{ alignItems: 'center' }}><Link style={{ textDecoration: 'none' }}
                        onClick={() => handleAddButton(item)}
                        to={{
                          pathname: `/room/${id}/candidate/interviewerassign`,
                          state: { candidateName: item.name }
                        }}
                      ><button className='edit-button'>Thêm</button></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isSidebarOpen && selectedPerson && (
            <div className='container'>
              <div className="container-main" ref={sidebarRef}>
                <div className='containerAvatar'>

                  <img src={selectedPerson.image} className='avatar' />

                  <div className='name'>
                    <h2>{selectedPerson.name}</h2>

                    <p>Ứng tuyển: Java dev</p>
                    <p style={{ marginTop: '10px' }}> Ngày ứng tuyển: 23/06/2023</p>
                    <span style={{ marginTop: '10px', cursor: 'pointer' }}>
                      <BsCameraVideo />
                      <MdOutlineCalendarMonth style={{ marginLeft: '10px' }} />
                      <BsChatDots style={{ marginLeft: '10px' }} />
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
                      <div className='itemInfo'>
                        <h3>Quốc gia:</h3>
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
                      <div className='itemInfo'>
                        <h3>Dự án:</h3>
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
    </div>
  );
};

export default AddCandidate;
