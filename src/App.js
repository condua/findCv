import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Navigate } from "react-router-dom"
import "./App.css"
import React from "react"
import "./style.css"
import Event from "./pages/Event/Event"
import IRALayout from "./layout/IRALayout"
import EventEdit from "./pages/Event/children/EventEdit"
import EventAdd from "./pages/Event/children/EventAdd"
import EventDetail from "./pages/Event/children/EventDetail"
import Home from "./pages/Interview/Home/Home"
import Edit from "./pages/Interview/Edit/Edit"
import Table from "./pages/Interview/Table/Table";
// import Login from "./pages/Interview/Login/Login";
// import PrivateRoute from "./pages/Interview/Login/PrivateRoute"
// import Navbar from "./pages/Interview/Navbar/Navbar";
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"


import RecruitAdd from "./pages/Recruitment/RecruitAdd"
import Recruitment from "./pages/Recruitment/Recruitment"
import InterviewMain from "./pages/Interview/InterviewMain/InterviewMain"
import InterviewDetail from "./pages/Interview/InterviewDetail/InterviewDetail"
import InterviewMark from "./pages/Interview/InterviewMark/InterviewMark"
import Questions from "./pages/Interview/Questions/Questions"
import RecruitEdit from "./pages/Recruitment/RecruitEdit"
import TableInterviewer from './pages/RECer/TableInterviewer.js'
import InterviewerCalendar from "./pages/Interview/InterviewerCalendar/InterviewerCalendar"
import InterviewInfo from "./pages/interviewInfo/InterviewInfo.js"

import RoomDetail from "./pages/Room/RoomDetail/RoomDetail.js"
import AddCandidate from "./pages/AddCandidate/AddCandidate"

import ManageUser from "./pages/Manage-user/Manage-user"
import DetailUser from "./pages/Detail-user/Detail-user"
import ManageCandidate from "./pages/Manage-candidate/Manage-candidate"
import BlackList from "./pages/Blacklist/Blacklist"
import ReasonBlacklist from "./pages/ReasonBlacklist/ReasonBlacklist"
import DetailBlacklist from "./pages/Detail-blacklist/Detail-blacklist"
import AddInterviewer from "./pages/AddInterviewer/AddInterviewer"
import RoomEdit from "./pages/Room/RoomEdit/RoomEdit.js"
import RoomAdd from "./pages/Room/RoomAdd/RoomAdd"
import Room from "./pages/Room/Room"
import Dashboard from "./pages/Dashboard/Dashboard"
import Result from "./pages/Result/Result"

//Candidate
import Body from "./pages/Body/Body"
import DetailJob from "./pages/Body/DetailJob/DetailJob"
import Company from "./pages/Company/Company"
import CandidateHome from "./pages/CandidateHome/CandidateHome"
import CandidateEvent from "./pages/CandidateEvent/CandidateEvent"
import DetailEvent from "./pages/CandidateEvent/DetailEvent/DetailEvent"
import PersonalInfo from "./pages/PersonalInfo/PersonalInfo"
import Interview from "./pages/Interview/Interview"
import SubmitJob from "./pages/SubmitJob/SubmitJob"
import CVHandler from "./pages/CVHandler/CVHandler"
import CVBuilder from "./pages/CVBuilder/CVBuilder"
import AddQuestion from "./pages/Interview/AddQuestion/AddQuestion"
import EditQuestion from "./pages/Interview/EditQuestion/EditQuestion"

//page not found
import Unauthorized from "./pages/Unauthorized/Unauthorized"

import PrivateRoute from "./pages/Login/privateRoute"



import RecruitDetail from "./pages/Recruitment/RecruitDetail"

import GetUser from "./pages/Login/GetUser"
import RefreshToken from "./pages/Login/RefreshToken"
import Verify from "./pages/Register/Verify"
import Cv from "./pages/Cv/index"

import UserInfo from "./pages/UserInfo/UserInfo"
import ResetPassword from "./pages/Register/ResetPassword"



const App = (props) => {
    return (
        <>
            {/* <Routes> */}
                

                {/* <Route path="/" element={<CandidateHome />} />
                <Route path="/company" element={<Company />} />
                <Route path="/body" element={<Body />} />
                <Route path="/body/detailjob/:id" element={<DetailJob />} />
                <Route path="/candidateevent" element={<CandidateEvent />} />
                <Route
                    path="/candidateevent/detailevent/:id"
                    element={<DetailEvent />}
                />
                <Route path="/personal-info" element={<PersonalInfo />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="/submitjob" element={<SubmitJob />} />
                <Route path="/cvhandler" element={<CVHandler />} />
                <Route path="/cvbuilder" element={<CVBuilder />} /> */}

                {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

            {/* </Routes> */}
            
            <Routes>        
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<Verify/> }/>
                <Route path="/resetpassword" element={<ResetPassword/> }/>

                {/* <Route path="/eventtest" element={<Eventtest/> }/> */}

                <Route path="/" element={<CandidateHome />} />
                <Route path="/company" element={<Company />} />
                <Route path="/cv" element={<Cv />} />
                <Route path="/body" element={<Body />} />
                <Route path="/body/detailjob/:id" element={<DetailJob />} />
                <Route path="/candidateevent" element={<CandidateEvent />} />
                <Route path="/candidateevent/detailevent/:id" element={<DetailEvent/>}/>

                <Route exact path='/' element={<PrivateRoute Roles={['CANDIDATE','ADMIN']}/>}>

                    <Route path="/" element={<CandidateHome />} />
                    
                    <Route path="/personal-info" element={<PersonalInfo />} />
                    <Route path="/submitjob" element={<SubmitJob />} />
                    <Route path="/cvhandler" element={<CVHandler />} />
                    {/* <Route path="/cvbuilder" element={<CVBuilder />} /> */}
                </Route> 
                
                <Route exact path='/' element={<PrivateRoute Roles={['INTERVIEWER', 'ADMIN']}/>}>
                   
                    <Route path="/interviewer" element={<IRALayout><Home/></IRALayout>} /> 

                    <Route path="/managecandidate" element={<IRALayout><Table/></IRALayout>} /> 
                    <Route path="managecandidate/:id" element={<IRALayout><Edit/></IRALayout>} /> 


                   
                    <Route path="/questions" element={<IRALayout><Questions /></IRALayout>} />
                    <Route path="/questions/addquestion" element={<IRALayout><AddQuestion /></IRALayout>} />
                    <Route path="/questions/editquestion/:question_id" element={<IRALayout><EditQuestion /></IRALayout>} />
                    <Route path="/interviewercalendar" element={<IRALayout><InterviewerCalendar /></IRALayout>}/>
                </Route>

                <Route exact path='/' element={<PrivateRoute Roles={['RECRUITER', 'ADMIN']}/>}>
                    
                <Route path='/interviewers' element={<IRALayout><TableInterviewer /></IRALayout>} />
                    <Route path='/interviewers/:id' element={<IRALayout><InterviewInfo /></IRALayout>} />
                    <Route path='/room' element={<IRALayout><Room /></IRALayout>} />
                    <Route path='/room/:id/detail' element={<IRALayout><RoomDetail /></IRALayout>} />
                    <Route path='/room/:id/edit' element={<IRALayout><RoomEdit /></IRALayout>} />
                    <Route path='/room/create' element={<IRALayout><RoomAdd /></IRALayout>} />
                    <Route path='/room/:id/interviewerAssign/candidateAssign' element={<IRALayout><AddCandidate /></IRALayout>} />
                    <Route path='/room/:id/interviewerAssign' element={<IRALayout><AddInterviewer /></IRALayout>} />

                    <Route path="/recruitment" element={<IRALayout><Recruitment /></IRALayout>} />
                    <Route path="/recruitment/add" element={<IRALayout><RecruitAdd /></IRALayout>} />
                    <Route path="/recruitment/:id" element={<IRALayout><RecruitDetail /></IRALayout>} />
                    <Route path="/recruitment/edit/:id" element={<IRALayout><RecruitEdit /></IRALayout>} />  
                    <Route path="/event" element={<IRALayout><Event /></IRALayout>}/>
                    <Route path="/event/:id" element={<IRALayout><EventDetail /> </IRALayout>}/>
                    <Route path="/event/edit/:id" element={<IRALayout><EventEdit /></IRALayout>}/>
                    <Route path="/event/add" element={<IRALayout><EventAdd /></IRALayout>}/>
                </Route>


                <Route exact path='/' element={<PrivateRoute Roles={['ADMIN']}/>}>
                    <Route path='admin' element={<IRALayout><Home /></IRALayout>} />

                    <Route path='manage-user' element={<IRALayout><ManageUser /></IRALayout>} />
                    <Route path='detail-user/:id' element={<IRALayout><DetailUser /></IRALayout>} />
                    
                    <Route path="blacklist" element={<IRALayout>< BlackList /></IRALayout>} />
                    <Route path="reason-blacklist/:id" element={<IRALayout>< ReasonBlacklist /></IRALayout>} />
                    <Route path="detail-blacklist/:id" element={<IRALayout>< DetailBlacklist /></IRALayout>} />
                    <Route path="dashboard" element={<IRALayout>< Dashboard /></IRALayout>} />
                    <Route path="result" element={<IRALayout>< Result/></IRALayout>} />
                </Route>

                <Route exact path='/' element={<PrivateRoute Roles={['INTERVIEWER','RECRUITER','ADMIN']}/>}>
                    <Route path="/userinfo" element={<IRALayout><UserInfo/></IRALayout> }/>
                    <Route path="/interviewmain" element={<IRALayout><InterviewMain /></IRALayout>} />
                    <Route path="/interview/detail/:id" element={<IRALayout><InterviewDetail /></IRALayout>} />
                    <Route path="/interview/detail/:id/:mark_id" element={<IRALayout><InterviewMark /></IRALayout>} />

                </Route>
                <Route exact path='/' element={<PrivateRoute Roles={['CANDIDATE','INTERVIEWER','RECRUITER','ADMIN']}/>}>
                    <Route path='*' element={<IRALayout><Unauthorized /></IRALayout>} />

                </Route>

                   
                {/* 

                <Route path="/event" element={<IRALayout><Event /></IRALayout>}/>
                <Route path="/event/:id" element={<IRALayout><EventDetail /> </IRALayout>}/>
                <Route path="/event/edit/:id" element={<IRALayout><EventEdit /></IRALayout>}/>
                <Route path="/event/add" element={<IRALayout><EventAdd /></IRALayout>}/>
                        
                <Route path="/interviewmain" element={<IRALayout><InterviewMain /></IRALayout>} />
                <Route path="/interview/detail/:id" element={<IRALayout><InterviewDetail /></IRALayout>} />
                <Route path="/interview/detail/:id/:mark_id" element={<IRALayout><InterviewMark /></IRALayout>} />
                <Route path="/questions" element={<IRALayout><Questions /></IRALayout>} />
                <Route path="/questions/addquestion" element={<IRALayout><AddQuestion /></IRALayout>} />
                <Route path="/questions/editquestion/:question_id" element={<IRALayout><EditQuestion /></IRALayout>} />
                <Route path="/interviewercalendar" element={<IRALayout><InterviewerCalendar /></IRALayout>}/>
                <Route path="/recruitment" element={<IRALayout><Recruitment /></IRALayout>} />
                <Route path="/recruitment/add" element={<IRALayout><RecruitAdd /></IRALayout>} />
                <Route path="/recruitment/edit/:id" element={<IRALayout><RecruitEdit /></IRALayout>} />
                <Route path='manage-user' element={<IRALayout><ManageUser /></IRALayout>} />
                <Route path='detail-user/:id' element={<IRALayout><DetailUser /></IRALayout>} />
                <Route path='manage-candidate/:id' element={<IRALayout>< ManageCandidate /></IRALayout>} />
                <Route path="blacklist" element={<IRALayout>< BlackList /></IRALayout>} />
                <Route path="reason-blacklist/:id" element={<IRALayout>< ReasonBlacklist /></IRALayout>} />
                <Route path="detail-blacklist/:id" element={<IRALayout>< DetailBlacklist /></IRALayout>} />
                <Route path="dashboard" element={<IRALayout>< Dashboard /></IRALayout>} />
                <Route path="result" element={<IRALayout>< Result/></IRALayout>} /> */}
                    
                {/* /* <Route path='/interviewers' element={<Table />} /> */ }
                {/* <Route path='/interviewers' element={<IRALayout><InterviewInfo/></IRALayout>} />
                <Route path='/room' element={<IRALayout><Room/></IRALayout>} />
                <Route path='/room/:id/detail' element={<IRALayout><Room /></IRALayout>} />
                <Route path='/room/:id/edit' element={<IRALayout><RoomEdit /></IRALayout>} />
                <Route path='/room/create' element={<IRALayout><RoomAdd /></IRALayout>} />
                <Route path='/room/:id/candidate' element={<IRALayout><AddCandidate /></IRALayout>} />
                <Route path='/room/:id/candidate/interviewerassign' element={<IRALayout><AddInterviewer /></IRALayout>} /> */}
            </Routes>
        </>
    )
}

export default App
