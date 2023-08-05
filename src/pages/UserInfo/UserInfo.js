import React,{useState,useEffect,useRef} from 'react';
import "./UserInfo.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { uploadRequest, uploadSuccess } from '../../redux/action/authActions';
import { updateUserFields } from '../../redux/action/authActions';
import { updateUser } from '../../redux/action/userAction';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import { message as messageInfo } from 'antd';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useCallback } from 'react';
import {Input} from 'antd'

function MyVerticallyCenteredModal(props) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const accessToken = useSelector(state=>state.auth.accessToken)
  
  const handleHide = () =>{
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
    props.onHide();
  }
  useEffect(() => {
    // Reset form values when the modal is shown
    setPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }, [props.show]);

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới không trùng khớp với mật khẩu xác nhận.");
      return;
    }

    // Replace 'URL_API_CUA_BAN' with your API PUT endpoint
    const apiUrl = 'https://qltd01.cfapps.us10-001.hana.ondemand.com/user/password';

    const authHeader = { headers: { Authorization: `Bearer ${accessToken}` } };

    const payload = {
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    axios
      .put(apiUrl, payload, authHeader)
      .then((response) => {
        console.log(response)
        if(response.data.message === "Wrong Password!" )
        {
          alert("Wrong Password!");
          return
        }
        if(response.data.message === "Wrong confirm password!" )
        {
          alert("Wrong confirm password!");
          return
        }
        // Handle the response here if needed
        alert("Đổi mật khẩu thành công!");
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
        props.onHide();
      })
      .catch((error) => {
        // Handle error here if needed
        alert("Đổi mật khẩu thất bại!");
      });
  };

  return (
    <Modal
      {...props}
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thay đổi mật khẩu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label style={{margin:'0px 0px 5px 0px'}} htmlFor="currentPassword">Mật khẩu hiện tại:</label>
          <Input.Password
            style={{padding:'10px'}}
            // className="form-control"
            // id="currentPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{margin:'5px 0px 5px 0px'}} htmlFor="newPassword">Mật khẩu mới:</label>
          <Input.Password
            style={{padding:'10px'}}
            // type="password"
            // className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label style={{margin:'5px 0px 5px 0px'}} htmlFor="confirmPassword">Nhập lại mật khẩu:</label>
          <Input.Password
            style={{padding:'10px'}}
            // type="password"
            // className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-primary" style={{color:'black'}} onClick={handleChangePassword}>OK</Button>
        <Button className="btn-secondary" style={{color:'black'}} onClick={handleHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


const UserInfo = () => {

    const auth = useSelector(state => state.auth.data)
    const userinfo = useSelector(state => state.userinfo.data)
    console.log(userinfo)
    const [fullName, setFullName] = useState(userinfo.fullName);
    const [gender, setGender] = useState(userinfo.gender || '');
    const [dob, setDob] = useState(userinfo.dob || '');
    const [address, setAddress] = useState(userinfo.address);
    const [phone, setPhone] = useState(userinfo.phone);
    const [avatar, setAvatar] = useState(userinfo.avatar);

    const dispatch = useDispatch()
    const accessToken = useSelector(state=>state.auth.accessToken)
    const username = useSelector(state=>state.auth.data.username)
    const email = useSelector(state=>state.auth.data.email)

    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState(avatar);

    const imagesListRef = ref(storage, "images/");
    const fileInputRef = useRef(null);
    const [success, setSuccess] = useState(false);
    
    const status = useSelector(state => state.userinfo.message)

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [checkAvatar, setCheckAvatar] = useState(false)

    const [modalShow, setModalShow] = useState(false);


    
    const uploadFile = () => {
      // e.preventDefault();

      if (imageUpload == null) return;

      
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls(url);
          setCheckAvatar(true)
          setImageUpload(null);
        });
      });

    };

    useEffect(() => {
      // if(imageUrls === avatar)
      // {
      //   console.log(1)
      //   return
      // }
      // Only dispatch the updated user data when the image URL changes
      if (checkAvatar ===   true) {
        // Prepare the updated user data object
        const updatedUserData = {
          
          avatar: imageUrls, // Use the new image URL from the state
          
        };
        // Dispatch the action to update the user information
        setCheckAvatar(false)
        dispatch(updateUser(updatedUserData, accessToken));
      }
    }, [imageUrls]);
    console.log(checkAvatar)
    const handleTest = (e) =>{
      e.preventDefault()
    }
    const handleSubmit = (e) => {
      e.preventDefault();
    
      // // Prepare the updated user data object
      const updatedUserData = {
        "fullName": `${fullName}`,
        // "avatar":"https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg",
        "dob": `${dob}`,
        
        "gender": `${gender}`,
        "address":`${address}`,
        "phone": `${phone}`
      };
        
      // Dispatch the action to update the user information
      dispatch(updateUser(updatedUserData, accessToken))
    };
  
      const handleButtonClick = () => {
        fileInputRef.current.click();
        console.log(imageUrls)
      };

    return (
        <div className='user-info'>
            <div className='user-info-img-container'>
                <img className='user-info-img' src={imageUrls}/>
                <div>
                <button
                  style={{ display: 'block', width: '120px', height: '30px' }}
                  onClick={handleButtonClick}
                >
                  Chọn ảnh đại diện
                </button>
                  <input 
                    type='file'
                    accept="image/*"
                    style={{display:'none'}}
                    ref={fileInputRef}
                    
                    placeholder="Chọn file"
                    onChange={(event) => {
                      setImageUpload(event.target.files[0]);
                    }}
                  />
                </div>

                
                {
                  imageUpload &&  <button onClick={uploadFile} className='change-img-button'> Cập nhật ngay</button>
                }
            </div>
            
            
      <div className='user-info-form'>
        <div className='user-setting-form'>
          <div className='form-top'>
             <h1>Cài đặt tài khoản</h1>
          </div>
          {/* <form onSubmit={handleSubmit}> */}
          <form onSubmit={handleSubmit}>
            <div className='input-form'>
              <div className='input-sub'>
                <div className='text-form'>
                      Họ và tên
                  </div>
                  <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              <div className='input-sub' style={{marginRight:'0px'}}>
                <div className='text-form'>
                      Username
                  </div>
                  <input type='text' value={username} disabled />
                </div>
            </div>

            <div className='input-form'>
              <div className='input-sub'>
                <div className='text-form'>
                    Email
                </div>
                <input type='text' value={email} disabled/>
              </div>
              <div className='input-sub' style={{marginRight:'0px'}}>
                <div className='text-form'>
                      Điện thoại
                  </div>
                  <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>
            <div className='input-form'>
              <div className='input-sub'>
                <div className='text-form'>
                      Ngày sinh
                  </div>
                    <input
                      type='date'
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />               
                  </div>
              <div className='input-sub' style={{marginRight:'0px'}}>
                <div className='text-form'>
                      Giới tính
                  </div>
                    <select style={{width:'100%',height:'60%',border:'1px solid black',borderRadius:'5px',paddingLeft:'5px'}} value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="">Chọn</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                    </select>
                    {/* <input type='text' value={gender} onChange={(e) => setGender(e.target.value)} /> */}
              </div>
            </div>
            <div className='input-form-location'>
              <div className='input-sub'>
                <div className='text-form'>
                      Địa chỉ
                  </div>
                  <textarea style={{height:'60px'}} type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <button type='submit' className='button-change'>Update</button>
            <button className='button-resetpassword'  type="button" onClick={() => setModalShow(true)}>Thay đổi mật khẩu</button>
            
            

            {/* <div>
              <label>Full Name:</label>
              <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div>
              <label>Gender:</label>
              <input type='text' value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
            <div>
              <label>Date of Birth:</label>
              <input type='text' value={dob} onChange={(e) => setDob(e.target.value)} />
            </div>
            <div>
              <label>Avatar:</label>
              <input type='text' value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            </div>
            <div>
              <label>Address:</label>
              <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
              <label>Phone:</label>
              <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div> */}
          </form>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
      </div>
        </div>
    );
};

export default UserInfo;