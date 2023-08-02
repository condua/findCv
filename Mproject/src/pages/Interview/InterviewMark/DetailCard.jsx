import { Avatar } from "antd"
import { useState } from "react";


const DetailCard = ({ dataInterviewDetail, id }) => {


    const getObjectByDetailID = (dataInterviewDetail, id) => {
        return dataInterviewDetail.find(item => item.detailID === id);
    };

    const data = getObjectByDetailID(dataInterviewDetail, id);



    return (

        < div className='bg-white w-1/4 h-[240px] rounded-xl' style={{marginTop: 10}} >
            <Avatar
                src={data.avatar}
                style={{ width: 50, height: 50, position: 'relative', left: '42%', top: '5%' }}
            />
            <div style={{ fontWeight: 500, fontSize: 19, paddingTop: '4%', paddingLeft: '0%', textAlign: 'center' }}>{data.name}</div>
            <div style={{ fontWeight: 300, fontSize: 16, paddingLeft: '1%', textAlign: 'center' }}>{data.position}</div>
            <div style={{ paddingTop: '4%', paddingLeft: '10%', fontSize: 15 }}>
                <label style={{ paddingRight: 95 }}>Kỹ năng</label>
                <label>Kinh nghiệm</label>
            </div>
            <div style={{ paddingTop: '0.5%', paddingLeft: '10%', fontSize: 14, fontWeight: 200 }}>
                <label style={{ paddingRight: 40 }}>{data.skill}</label>
            </div>

            <div style={{ position: 'relative', left: 178, top: -20, fontSize: 14, fontWeight: 200 }}>
                <label>{data.experience}</label>
            </div>

            <div style={{textAlign: 'center'}}>
                <label
                    style={{
                        height: 26,
                        // marginLeft: '38%',
                        backgroundColor: data.status === 'Đã chấm' ? '#b7f1b7' : '#ffa9a9',
                        color: data.status === 'Đã chấm' ? 'green' : 'red',
                        fontWeight: 500,
                        padding: '3px 10px',
                        textAlign: 'center',
                        borderRadius: 5
                    }}
                >
                    {data.status}
                </label>
            </div>
        </div >


    )
}

export default DetailCard