import { Avatar } from "antd"
// import { useNavigate } from "react-router-dom"


const InterviewDetailDashboard = ({ dataDashboardDetail }) => {

    return (
        <div className='bg-white w-full h-[250px] rounded-xl flex-col'>
            <div style={{ fontWeight: 500, fontSize: 30, paddingLeft: '13%', paddingTop: '2%' }}>{dataDashboardDetail.roomName}</div>
            <button
                type="button" disabled
                style={{
                    color: '#2b7afa',                      // đổi theo Status
                    backgroundColor: 'rgb(178 218 250)',   // đổi theo Status
                    borderRadius: 5,
                    fontWeight: 500,
                    fontSize: 17,
                    padding: '5px 10px',
                    width: 140,
                    position: 'relative',
                    left: 850,
                    top: -35,
                }}
            >
                {dataDashboardDetail.status}
            </button>
            <div style={{ position: 'relative', top: -20, fontWeight: 400, fontSize: 25, paddingLeft: '13%' }}>{dataDashboardDetail.roomDescription}</div>
            <div style={{ fontWeight: 500, fontSize: 18, paddingLeft: '13%' }}>
                <span>Ngày bắt đầu</span>
                <span style={{ paddingLeft: '13%' }}>Số người tham gia</span>
            </div>

            <div style={{ fontWeight: 400, fontSize: 18, paddingLeft: '13%', paddingTop: '0.5%' }}>
                <span>Sep 6, 2023</span>
                <span style={{ paddingLeft: '15%' }}>9</span>
            </div>

            <div style={{ position: 'relative', left: '60%', top: -55, width: 100 }}>
                <Avatar.Group
                    maxCount={7}
                    size="large"
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', fontWeight: 500 }}
                >
                    {dataDashboardDetail.listParticipant.map((participant, index) => (
                        <Avatar key={index} src={participant.urlAvatar} />
                    ))}
                </Avatar.Group>
            </div>
            <div style={{ position: 'relative', bottom: 38, paddingLeft: '13%', fontSize: 18 }}>
                <span style={{ fontWeight: 500, paddingRight: 30 }}>
                    Meeting link:
                </span>
                <a href="https://meet.google.com/?pli=1" target="_blank" rel="noreferrer">
                    https://meet.google.com/?pli=1
                </a>
            </div>
        </div >

    )

}

export default InterviewDetailDashboard