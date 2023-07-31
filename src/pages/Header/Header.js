import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
// import userData from '../../data/userData.json';
import { useSelector, useDispatch } from 'react-redux';
// import { login, logout } from '../../redux/action/action.js';
import { logout } from '../../redux/action/authActions';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './Header.scss';

function Header({userData}) {
 
  const [isCompanyHovered, setCompanyHovered] = useState(false);
  const [isProfileHovered, setProfileHovered] = useState(false);
  const [isJobMenuOpen, setJobMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  let isLoggedIn = 0;
  const handleJobMenuEnter = () => {
    setJobMenuOpen(true);
  };

  const handleJobMenuLeave = () => {
    setJobMenuOpen(false);
  };

  const handleCompanyMouseEnter = () => {
    setCompanyHovered(true);
  };

  const handleCompanyMouseLeave = () => {
    setCompanyHovered(false);
  };

  const handleProfileMouseEnter = () => {
    setProfileHovered(true);
  };

  const handleProfileMouseLeave = () => {
    setProfileHovered(false);
  };
  
  const [data, setData] = useState({
    address: "",
    avatar: "",
    cv_pdf: null,
    email: "",
    experience: "",
    fullName: "",
    gender: "",
    language: [],
    phone: "",
    skill: [],  
  });
  
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reponse = useSelector(state => state.auth)
  const profileData = useSelector((state) => state.profile.profileData);
  if (reponse.data !== null) {
    isLoggedIn = 1;
    console.log(reponse.data)
    // toast.success("Đăng nhập thành công", { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
  }
  else {
    isLoggedIn = 0;
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };
 
  
    useEffect(() => {
      if (profileData) {
        setData(profileData.data);
      }
    }, [profileData]);
    console.log("Response Data Login:" ,profileData)
  // useEffect(() => {
  //   const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
  //   if (storedLoggedInStatus) {
  //     dispatch(login());
  //   }
  // }, [dispatch]);

  // const handleLogin = () => {
  //   dispatch(login());
  //   localStorage.setItem('isLoggedIn', 'true');
  // };

  // const handleLogout = () => {
  //   dispatch(logout());
  //   localStorage.removeItem('isLoggedIn');
  // };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const { name, avatar } = userData;
  const user =  useSelector(state => state.auth.data);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const threshold = 50; // Khoảng cách scroll tối thiểu để coi là đã scroll
    
      if (scrollTop > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Navbar expand="lg" className={`bg-body-tertiary${isScrolled ? ' scrolled' : ''}`}>
      <Container fluid>
        <NavLink to="/">
          <Navbar.Brand>
            <p className="text text-center bg-secondary" style = {{marginTop: "15px"}}>PrimeCMR</p>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink
              to="/company"
              id="/company"
              className={`item ${isCompanyHovered ? 'text-success' : ''}`}
              style={{ textDecoration: 'none' }}
              onMouseEnter={handleCompanyMouseEnter}
              onMouseLeave={handleCompanyMouseLeave}
            >
              <span style = {{fontWeight: "700", color: "#6f716f"}}>Công Ty</span>
            </NavLink>
            <NavLink
              to="/cvhandler"
              className={`item ${isProfileHovered ? 'text-success' : ''}`}
              style={{ textDecoration: 'none' }}
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <span style = {{fontWeight: "700", color: "#6f716f"}}>Hồ sơ & CV</span>
            </NavLink>
            <NavDropdown
              title="Việc làm"
              id="navbarScrollingDropdown"
              className="item job-link custom-title"
              onMouseEnter={handleJobMenuEnter}
              onMouseLeave={handleJobMenuLeave}
              show={isJobMenuOpen}
            >
              <NavDropdown.Item>
                <NavLink
                  to="/body"
                  className={`item ${isProfileHovered ? 'text-success' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="bi bi-search ms-2"></i> <span style = {{fontWeight: "700", color: "#6f716f"}}>Tìm việc làm</span>
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink
                  to="/submitjob"
                  className={`item ${isProfileHovered ? 'text-success' : ''}`}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="bi bi-clipboard-fill ms-2"></i> <span style = {{fontWeight: "700", color: "#6f716f"}}>Việc làm đã ứng tuyển</span>
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink
              to="/candidateevent"
              className={`item ${isProfileHovered ? 'text-success' : ''}`}
              style={{ textDecoration: 'none' }}
              onMouseEnter={handleProfileMouseEnter}
              onMouseLeave={handleProfileMouseLeave}
            >
              <span style = {{fontWeight: "700", color: "#6f716f"}}>Sự kiện</span>
            </NavLink>
          </Nav>
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <div onClick={handleDropdownToggle}>
                <span style = {{fontWeight: "700", color: "#6f716f"}}>{data.fullName}</span>
                
              </div>
              <div className="me-2" style = {{display: "flex"}}>
                <img
                  src={data.avatar}
                  alt="User Avatar"
                  className="user-avatar"
                  onClick={handleDropdownToggle}
                  
                />
                {!isDropdownOpen ? <i className="bi bi-chevron-down ms-1"></i> : ''}

              </div>
              
              {isDropdownOpen && (
                <NavDropdown
                  title=""
                  id="basic-nav-dropdown"
                  show={isDropdownOpen}
                  onToggle={handleDropdownToggle}
                  align="end"
                  className="ms-auto"
                >
                  <NavDropdown.Item>
                    <NavLink
                      to="/personal-info"
                      className={`item ${isProfileHovered ? 'text-success' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-person" style={{ color: '#00b14f', marginRight: '10px', marginTop: '5px' }}></i>
                      Thông tin cá nhân
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink
                      to="/personal-info"
                      className={`item ${isProfileHovered ? 'text-success' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-gear" style={{ color: '#00b14f', marginRight: '10px', marginTop: '5px' }}></i>
                      Phỏng vấn
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <NavLink
                      to="/submitjob"
                      className={`item ${isProfileHovered ? 'text-success' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="bi bi-cloud-minus" style={{ color: '#00b14f', marginRight: '10px', marginTop: '5px' }}></i>
                      Việc làm đã nộp
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left" style={{ color: '#00b14f', marginRight: '10px', marginTop: '5px' }}></i>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: 'red' }}>Đăng xuất</span>
                  </NavDropdown.Item>
                </NavDropdown>
                
              )}
            </div>
          ) : (
            <>
              <NavLink
                      to="/login"
                      className={`item ${isProfileHovered ? 'text-success' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
              <Button className="btn btn-md justify-content-md-end" variant="outline-success">
                Đăng nhập
              </Button>{' '}
              </NavLink>
              <Button className="btn btn-md justify-content-md-end" variant="outline-success">
                Đăng ký
              </Button>
            </>
          )}
            <ToastContainer />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
