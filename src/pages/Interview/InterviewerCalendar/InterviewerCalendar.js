import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Calendar, Modal } from 'antd';
import axios from 'axios';
import "./InterviewerCalendar.scss"
const InterviewerCalendar = () => {
    const [popupContent, setPopupContent] = useState([]);
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        fetchEventCalendar();
    }, []);

    const eventCalendarApi = "https://qltd01.cfapps.us10-001.hana.ondemand.com/calendar/my-calendar";

    const fetchEventCalendar = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };
            const response = await axios.get(eventCalendarApi, { headers });
            setPopupContent(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const convertEventDataArray = (dataArray) => {
        const eventDataMap = {};

        dataArray.forEach((data) => {
            const { type, date, title } = data;
            const eventDate = new Date(date);
            const day = eventDate.getDate();
            const month = eventDate.getMonth();
            const year = eventDate.getFullYear();

            if (!eventDataMap[day]) {
                eventDataMap[day] = {};
            }

            if (!eventDataMap[day][month]) {
                eventDataMap[day][month] = {};
            }

            if (!eventDataMap[day][month][year]) {
                eventDataMap[day][month][year] = [];
            }

            eventDataMap[day][month][year].push({
                type: 'success',
                content: title,
            });
        });

        return eventDataMap;
    };

    const getListData = (value) => {
        const day = value.date();
        const month = value.month();
        const year = value.year();

        const events = convertEventDataArray(popupContent);

        return events[day]?.[month]?.[year] || [];
    };

    const handleDateClick = (value) => {
        const listData = getListData(value);
        // Show the popup using Antd's Modal component
        Modal.info({
            title: 'Sự kiện ngày ' + value.format('DD-MM-YYYY'),
            content: (
                <ul>
                    {listData.map((item) => (
                        <li key={item.content}>
                            <Badge status={item.type} text={<span style={{ color: 'black' }}>{item.content}</span>} />
                        </li>
                    ))}
                </ul>
            ),
            okButtonProps: {
                style: { background: 'blue', borderColor: 'blue' },
            },
        });
    };

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div onClick={() => handleDateClick(value)}>
                <ul className="events">
                    {listData.map((item) => (
                        <li key={item.content}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        return info.originNode;
    };

    return (
        <>
            <div className="flex w-full mt-7 bg-white h-[800px] flex-col" style={{ borderRadius: 5 }}>
                <div className="flex w-full absolute right-[1px] mt-[-99px] bg-white h-16 rounded-xl items-center">
                    <div className="ml-10 text-xl text">Lịch làm việc</div>
                </div>
                <Calendar cellRender={cellRender} />
            </div>
        </>
    );
};

export default InterviewerCalendar;
