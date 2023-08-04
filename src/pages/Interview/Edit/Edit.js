import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./Edit.scss"
// import data from '../data.json';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
const Edit = () => {
  const history = useNavigate();
  const { id } = useParams();
  let keyId = parseInt(id);
  const data = useSelector(state => {
    const userData = state.getuser.usernames.data.data;
    const candidateUsers = userData.filter(user => user.permission === "CANDIDATE");
    return candidateUsers;
  });

  // const candidate = data.find(item => item.id === parseInt(id));

  console.log(id)
  // console.log(candidate)

  // const [name, setName] = useState(candidate.name);
  // const [email, setEmail] = useState(candidate.email);
  // const [image, setImage] = useState(candidate.image);

  const [accountLink,setAccountLink] = useState(false)
  const [notifycation,setNotifycation] = useState(false)
  const [userData, setUserData] = useState("");

  const [checked, setChecked] = useState(true)

  const accessToken = useSelector(state => state.auth.accessToken)
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  const fetchUserData = async () => {
    setUserData("")
    try {
      const response = await fetch(`https://qltd01.cfapps.us10-001.hana.ondemand.com/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Handle error if the API call fails
        console.error("Error fetching user data:", response.status);
        return;
      }

      const data = await response.json();
      // Handle the retrieved user data here
      setUserData(data.data.cv_pdf);
    } catch (error) {
      // Handle errors if the API call fails
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleClickAccountLink = () =>{
    setAccountLink(true)
  }
  const handleClickNotifycation = () =>{
    setNotifycation(true)
  }
  const handleNotifycation = () =>{
    setNotifycation(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  return (
    <div>
    {data.map((event) => {
      if(event.id === parseInt(id))
      {
        return(
          <div  className='edited-container'>
            <div className='info-container'>
              {/* <h2>Thông tin cơ bản</h2> */}
              <div className='avatar-container'>
                  <img className='avatar-edit' src={event.avt} />
                  <h2>{event.name}</h2> <span style={{fontSize:'20px',paddingTop:'14px',marginLeft:'10px'}}>- Ứng viên</span>

              </div>
              <form onSubmit={handleSubmit} className='form-edit'>
                {/* <div className='info-item' style={{marginTop:'15px'}}>
                    <p>Họ và tên</p>
                    <input type='text' placeholder={candidate.name}/>
                </div> */}
                <div className='info-item' style={{marginTop:'15px'}}>
                    <p>Username</p>
                    <input type='text' placeholder={event.username} disabled/>
                </div>
                <div className='info-item'>
                    <p>Email</p>
                    <input type='text' placeholder={event.email} disabled/>
                </div>
                <div className='info-item'>
                    <p>Ngày khởi tạo</p>
                    <input type='text' placeholder={formatDate(event.dateRegister)} disabled/>
                </div>
                <div className='info-item'>
                    <p>Xác thực tài khoản</p>
                    <input type='text' placeholder={event.accountStatus} disabled/>
                </div>

                <div className='info-item'>
                    <p>Kĩ năng</p>
                    <input type='text' placeholder={event.skill} disabled/>
                </div>
                <div className='info-item'>
                    <p>Kinh nghiệm làm việc</p>
                    <input type='text' placeholder={event.experience} disabled/>
                </div>
                <div className='info-item'>
                    <p>Status</p>
                    <input type='text' placeholder={event.username} disabled/>
                </div>
                <div className='info-item'>
                    <p>Thông tin Cv</p>
                    {
                      userData === "" ? <input type='text' placeholder="" disabled/>
                      : userData
                      ? <input style={{cursor:'pointer'}} type='text' placeholder='Nhấn vào đây để xem' onClick={() => window.open(userData, '_blank')} className='link-input' readOnly />               
                      : <input type='text' placeholder="Không có" disabled/>
                    }
                    {/* <input style={{cursor:'pointer'}} type='text' placeholder='Click to view CV' onClick={() => window.open(userData, '_blank')} className='link-input' readOnly />                 */}
                </div>
                <div className='info-item'>
                    <p>Địa chỉ</p>
                    <TextArea type='text' placeholder={event.address} disabled/>
                </div>
                {/* <div className='info-item' style={{marginBottom:'10px'}}>
                    <p>Sửa mật khẩu</p>
                    <input type='text' placeholder={name}/>
                </div> */}



                <div className='save-item'>

                    {/* <div className='save-item-left'>
                        <button className='account-link' onClick={handleClickAccountLink}>Liên kết tài khoản</button>
                        <button className='notifycation' onClick={handleNotifycation}>Thông báo</button>

                    </div>
                    <button className='button-save'>Lưu thay đổi</button>
                    <button className='button-close'>Hủy</button> */}
                    
                    {accountLink === true && (
                      <div className='account-link-form'>
                        <div className='account-link-form-main'>
                          <h4 style={{width:'100%', margin:'20px'}}>Liên kết tài khoản</h4>
                          
                          <div className='content-form'>
                            <div className='content-form-item' style={{backgroundColor:'#F1FAFF',border:'1px dashed #00A3FF',marginTop:'15px'}}>
                              <img className='icon' src='https://icons.veryicon.com/png/o/business/pinjamango2018/verification-code-7.png'/>
                              <p style={{position:'absolute', top:'20%', left:'10%'}}>Xác thực hai yếu tố bổ sung thêm một lớp bảo mật cho tài khoản của bạn. <br/>Để đăng nhập, bạn cần cung cấp mã tuyệt vời gồm 4 chữ số.</p>
                            </div>
                            
                            <div className='content-form-item'>
                              <img className='icon' src='https://cdn-icons-png.flaticon.com/512/2991/2991148.png'/>
                              <div className='content'>
                            
                                <h3>Google</h3>
                                
                                <p>Plan property your workflow</p>
                              </div>
                              <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                              </label>
                            </div>
                            <div className='content-form-item'>
                            <img className='icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png'  style={{borderRadius:'0px'}}/>
                              <div className='content'>
                            
                                <h3>LinkedIn</h3>
                                
                                <p>Manage your professional identity.</p>
                              </div>
                              <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                              </label>
                            </div>
                            <div className='content-form-item' style={{borderBottom:'none'}}>
                              <img className='icon' src='https://cdn-icons-png.flaticon.com/512/732/732245.png'/>
                              <div className='content'>
                            
                                <h3>Slack</h3>
                                
                                <p>Integrate Projects Discussions</p>
                              </div>
                              <label class="switch">
                                <input type="checkbox"/>
                                <span class="slider round"></span>
                              </label>
                            </div>
                          </div>
                          <div className='content-bottom'>
                            <button className='save-button'>Lưu thay đổi</button>    
                            <button className='close-button' onClick={()=>{setAccountLink(false)}}>Hủy</button>
                          </div>

                        </div>

                      </div>
                    )}

                    {notifycation === true && (
                      <div className='notifycation-form'>
                        <div className='notifycation-form-main'>
                          <h3>Thông báo</h3>

                          <div className='notifycation-form-item'>
                            <h4>Thông báo</h4>
                            <input type='checkbox' className='checkbox1' defaultChecked/>
                            <input type='checkbox' className='checkbox2'/>

                          </div>
                          <div className='notifycation-form-item'>
                            <h4>Billing Updates</h4>
                            <input type='checkbox' className='checkbox1'/>
                            <input type='checkbox' className='checkbox2' defaultChecked/>
                          </div>
                          <div className='notifycation-form-item'>
                            <h4>New Team Members</h4>
                            <input type='checkbox' className='checkbox1' defaultChecked/>
                            <input type='checkbox' className='checkbox2'/>
                          </div>
                          <div className='notifycation-form-item'>
                            <h4>Completed Projects</h4>
                            <input type='checkbox' className='checkbox1'/>
                            <input type='checkbox' className='checkbox2' defaultChecked/>
                          </div>
                          <div className='notifycation-form-item' style={{borderBottom:'1px solid #EFF2F5'}}>
                            <h4>Newsletters</h4>
                            <input type='checkbox' className='checkbox1' defaultChecked/>
                            <input type='checkbox' className='checkbox2'/>
                        
                          </div>

                          <div className='notifycation-form-bottom'>
                            <button className='close-button' onClick={()=>{setNotifycation(false)}}>
                              Hủy
                            </button>
                            <button className='save-button'>
                              Lưu thay đổi
                            </button>
                          </div>
                        </div>
                      </div>
                    
                    )}
                </div>
                {/* <div>
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Save</button> */}
              </form>
            </div>    
      </div>
      )}
    })}
    </div>
  );
};

export default Edit;
