import React, { useState,useEffect } from 'react';
import './SubmitJob.scss';
import Header from './../Header/Header';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import SelectOption from './../SelectOption/SelectOption';
import { Link } from 'react-router-dom';
import Footer from "./../Footer/Footer";
import { useDispatch,useSelector } from 'react-redux';
import { EnvironmentTwoTone, EditOutlined } from '@ant-design/icons';
import { getProfileRequest, updateProfileRequest } from '../../redux/action/profileActions';

function SubmitJob() {
  const [data1, setData1] = useState({
    address: "",
    avatar: "",
    cv_pdf: null,
    email: "",
    experience: "",
    fullName: "",
    gender: "",
    language: "",
    listJobPosting: [],
    phone: "",
    skill: "",  
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const sortOptions = [
    { label: 'Most Recent', value: 'mostRecent' },
    { label: 'Oldest', value: 'oldest' },
  ];
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const profileData = useSelector((state) => state.profile.profileData);
  useEffect(() => {
    dispatch(getProfileRequest(accessToken));
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (profileData) {
      setData1(profileData.data);
    }
  }, [profileData]);
  console.log("USER DATA", profileData)
  const data = profileData?.data?.listJobPosting || []; // Khởi tạo biến data rỗng nếu không có dữ liệu.

  const sortedJobs = data.sort((a, b) => {
    const jobNameA = a.name.toLowerCase();
    const jobNameB = b.name.toLowerCase();
    return jobNameA.localeCompare(jobNameB);
  });

  const filteredJobs = sortedJobs.filter((job) => {
    const jobName = job.name.toLowerCase();
    return jobName.includes(searchTerm.toLowerCase());
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handleDeleteJob = (jobId) => {
    // Xử lý xóa công việc
  };

  return (
    <>
      <Header />
      <div className="submittedjob">
        <Container>
          <Row>
            <Col xs={4} style={{ backgroundColor: '#e9eaec' }}>
              <SelectOption />
            </Col>
            <Col style={{ backgroundColor: '#e9eaec', marginLeft: '20px' }}>
              <div className="job-list-container">
                <div className="filters">
                  <input
                    type="text"
                    placeholder="Search by job name"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <div className="sort">
                    <select value={sortOrder} onChange={handleSortOrder}>
                      <option value="">Sort By</option>
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="job-list" style = {{marginBottom: "20px"}}>
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="flex w-full bg-white rounded-xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all ease-in-out duration-200 mt-2">
                      <div className="flex justify-center w-2/5">
                        <div className="justify-center p-8 items-center bg-center bg-contain cursor-pointer">
                          <img
                            alt="cava"
                            className="w-full h-full object-cover"
                            src={job.image}
                          />
                        </div>
                      </div>
                      <div className="flex w-full">
                        <div className="flex flex-col w-full p-3">
                          <div className="flex text-lg font-sans cursor-pointer w-fit font-medium ">
                          <Link
                          to={`/body/detailjob/${job.id}`}
                          style={{ textDecoration: "none" }}
                          target="_blank"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(`/body/detailjob/${job.id}`, '_blank');
                          }}
                        >
                            {job.name}
                            </Link>
                          </div>
                          <div className="flex text-sm my-1 ">
                            {job.position}
                          </div>
                          <div className="flex text-sm my-1 ">
                            Language: {job.language}
                          </div>
                          <div className="flex my-1 text-sm text-lime-600 font-mono font-medium">
                            CV đã tải lên:
                            <a href={profileData.data.cv_pdf} target="_blank" rel="noreferrer" className="ml-1 text-blue-500 underline">
                              CV_PDF
                            </a>
                          </div>
                          <div className="flex text-sm my-1 ">
                            <EnvironmentTwoTone
                              twoToneColor="#52c41a"
                              className="mx-1"
                            />{" "}
                            Location: {job.location}
                          </div>
                        </div>
                        
                      </div>
                      <div className="flex flex-col w-3/12 my-5 font-mono font-bold text-lime-700 mt-3">
                        {job.salary}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default SubmitJob;
