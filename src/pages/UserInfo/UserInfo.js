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
import { message } from 'antd';

const UserInfo = () => {

    const auth = useSelector(state => state.auth.data)
    const userinfo = useSelector(state => state.userinfo.data)
    const [fullName, setFullName] = useState(userinfo.fullName);
    const [gender, setGender] = useState(userinfo.gender || '');
    const [dob, setDob] = useState(userinfo.dob || '');
    const [address, setAddress] = useState(userinfo.address);
    const [phone, setPhone] = useState(userinfo.phone);
    const [avatar, setAvatar] = useState(userinfo.avatar);
    // const [imageUrl, setImageUrl] = useState('');

    // const [fullName, setFullName] = useState(userInfo.userInfoEntity.fullName);
    // const [gender, setGender] = useState(userInfo.userInfoEntity.gender || '');
    // const [dob, setDob] = useState(userInfo.userInfoEntity.dob || '');
    // const [address, setAddress] = useState(userInfo.userInfoEntity.address);
    // const [phone, setPhone] = useState(userInfo.userInfoEntity.phone);
    // const [avatar, setAvatar] = useState(userInfo.userInfoEntity.avatar);
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

    const uploadFile = (e) => {
      e.preventDefault();

      if (imageUpload == null) return;
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls(url);
          setImageUpload(null)
        });
      });

    };

    useEffect(() => {
      // Only dispatch the updated user data when the image URL changes
      if (imageUrls) {
        // Prepare the updated user data object
        const updatedUserData = {
          fullName: fullName,
          avatar: imageUrls, // Use the new image URL from the state
          gender: null,
          address: address,
          phone: phone
        };
        // Dispatch the action to update the user information
        dispatch(updateUser(updatedUserData, accessToken));
      }
    }, [imageUrls]);
    const handleSubmit = (e) => {
      e.preventDefault();
    
      // Prepare the updated user data object
      const updatedUserData = {
        "fullName": `${fullName}`,
        // "avatar":"https://noithatbinhminh.com.vn/wp-content/uploads/2022/08/anh-dep-40.jpg",
        "avatar": `${avatar}`,
        "gender": null,
        "address":`${address}`,
        "phone": `${phone}`
      };
        
      // Dispatch the action to update the user information
      dispatch(updateUser(updatedUserData, accessToken))
      if (status === 200) {
        // Show your notification here, for example using a toast library
        // For example, if you're using react-toastify:
        message.success({
          content: 'Thông tin tài khoản đã được thay đổi thành công',

        });
      }
      else{
        message.error({
          content: 'Thông tin tài khoản thay đổi không thành công',

        });
      }
    };
    
    
    
      // useEffect(() => {
        
      // }, [status]);
    
  
      const handleButtonClick = () => {
        fileInputRef.current.click();
      };
    
      console.log(imageUrls)

    return (
        <div className='user-info'>
            <div className='user-info-img-container'>
                <img className='user-info-img' src={imageUrls}/>
                 {/* <input
                    type="file"
                    // accept="image/*"
                    // style={{ display: "none" }}
                    id="photo"
                    // onChange={(e) => setImg(e.target.files[0])}
                /> */}
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
                  {/* {imageUrls.map((url) => {
                    return <img src={url} />;
                  })} */}
            </div>
            
            
            <div className='user-info-form'>
        <div className='user-setting-form'>
          <div className='form-top'>
             <h1>Cài đặt tài khoản</h1>
          </div>
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
                  <input type='text' value={phone} onChange={(e) => setFullName(e.target.value)} />
                </div>
            </div>
            <div className='input-form'>
              <div className='input-sub'>
                <div className='text-form'>
                      Ngày sinh
                  </div>
                  <input type='text' value={dob} onChange={(e) => setFullName(e.target.value)} />
                </div>
              <div className='input-sub' style={{marginRight:'0px'}}>
                <div className='text-form'>
                      Giới tính
                  </div>
                  <input type='text' value={gender} onChange={(e) => setFullName(e.target.value)} />
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
        </div>
      </div>
        </div>
    );
};

export default UserInfo;