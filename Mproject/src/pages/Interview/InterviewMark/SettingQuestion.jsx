// import { InputNumber, Select, Space } from "antd";
// import { useEffect, useState } from "react";


// const SettingQuestion = ({ numberOrder, data, id, score }) => {

//     const onChangeMark = (value) => {
//         console.log('changed', value);
//     };
//     const onChangeQuestion = (value) => {
//         console.log(`selected ${value}`);
//     };

//     const onSearchQuestion = (value) => {
//         console.log('search:', value);
//     };

//     console.log(numberOrder, score)
//     // console.log(id)
//     // Dùng onChange, filter để lọc những câu hỏi nào đã được chọn trong bộ câu hỏi rồi thì không hiện thị lại khi chọn câu hỏi khác chung bộ câu hỏi

//     // Tính điểm trung bình

//     const handleBlur = (value) => {
//         // console.log("Blur", value)
//         const storedDataScore = localStorage.getItem(`dataScore${id}`);
//         const dataArray = storedDataScore ? JSON.parse(storedDataScore) : [];
//         dataArray.push(value);
//         const updatedData = JSON.stringify(dataArray);
//         localStorage.setItem(`dataScore${id}`, updatedData);
//     }

//     return (
//         <Space>
//             <label style={{ width: 767, height: 35, fontWeight: 400, fontSize: 17 }}>{numberOrder}.</label>
//             <Select
//                 style={{ width: 620, height: 35, paddingTop: 2 }}
//                 showSearch
//                 placeholder="Select a question"
//                 optionFilterProp="children"
//                 onChange={onChangeQuestion}
//                 onSearch={onSearchQuestion}
//                 filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
//                 options={data}
//             >

//             </Select>

//             <InputNumber min={1} max={10}
//                 onChange={onChangeMark}
//                 style={{ width: 60, backgroundColor: '#e7e7e7', marginLeft: '20%' }}
//                 onBlur={(e) => handleBlur(e.target.value)}
//                 value={score}
//             />
//         </Space>
//     )
// }


// export default SettingQuestion