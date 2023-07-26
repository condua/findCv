import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./Edit.scss"
import data from '../data.json';
import TextArea from 'antd/es/input/TextArea';

const Edit = () => {
  const history = useNavigate();
  const { id } = useParams();
  let keyId = parseInt(id);

  const candidate = data.find(item => item.id === parseInt(id));

  const [name, setName] = useState(candidate.name);
  const [email, setEmail] = useState(candidate.email);
  const [image, setImage] = useState(candidate.image);

  const [accountLink,setAccountLink] = useState(false)
  const [notifycation,setNotifycation] = useState(false)

  const [checked, setChecked] = useState(true)

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

    // Create a copy of the data array
    // const updatedData = [...data];

    // // Update the candidate in the copied array
    // const updatedCandidate = {
    //   ...candidate,
    //   name: name,
    //   email: email,
    //   image: image
    // };

    // Find the index of the candidate in the copied array
    // const candidateIndex = updatedData.findIndex(item => item.id === parseInt(id));

    // Replace the old candidate with the updated candidate
    // updatedData[candidateIndex] = updatedCandidate;

    // Update the data in localStorage
    // localStorage.setItem('data', JSON.stringify(updatedData));

    // Redirect back to the home page after submitting

   
    
    // history('/');
  };

  return (
    <div className='edited-container'>
      {/* <div className='top-main'>  
          <h1>Hello Devs !</h1>
      </div>
     */}
      <div className='avatar-container'>
            <img className='avatar-edit' src={image} />
            <h2>{candidate.name}</h2>
            <p>- Người phỏng vấn</p>
      </div>

      <div className='info-container'>
        <h2>Thông tin cơ bản</h2>
        <form onSubmit={handleSubmit} className='form-edit'>
          <div className='info-item' style={{marginTop:'15px'}}>
              <p>Họ và tên</p>
              <input type='text' placeholder={candidate.name}/>
          </div>
          <div className='info-item'>
              <p>Tài khoản</p>
              <input type='text' placeholder={candidate.name}/>
          </div>
          <div className='info-item'>
              <p>Email</p>
              <input type='text' placeholder={email}/>
          </div>
          <div className='info-item'>
              <p>Số điện thoại</p>
              <input type='text' placeholder={candidate.name}/>
          </div>
          <div className='info-item'>
              <p>Địa chỉ</p>
              <TextArea type='text' placeholder={candidate.name}/>
          </div>
          {/* <div className='info-item' style={{marginBottom:'10px'}}>
              <p>Sửa mật khẩu</p>
              <input type='text' placeholder={name}/>
          </div> */}



          <div className='save-item'>

              <div className='save-item-left'>
                  <button className='account-link' onClick={handleClickAccountLink}>Liên kết tài khoản</button>
                  <button className='notifycation' onClick={handleNotifycation}>Thông báo</button>

              </div>
              <button className='button-save'>Lưu thay đổi</button>
              <button className='button-close'>Hủy</button>
              
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
  );
};

export default Edit;
