import './index.scss'
import { useRef, useState } from 'react';
import { SectionWithList, SectionWithInfo, SectionWithParagraph, SectionWithTable } from '../CvSection';
import { useReactToPrint } from 'react-to-print'
import { faTrash, faPlus, faUpload, faPrint } from '@fortawesome/free-solid-svg-icons';
import Header from "./../Header/Header";
import Footer from "./../Footer/Footer";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CVSelect from "./../CVSelect/CVSelect";

function Cv({ cvref }) {
	const initState = {
		name: 'Nguyen Van A',
		position: 'FullStack Developer',
		info: [
			['Name', 'Nguyen Van A'],
			['Date Of Birth', '18/06/2002'],
			['Phone', '0911467143'],
			['Gmail', 'abc@gmail.com'],
			['Address', 'Dong Hoa, Di An, Binh Duong'],
		],
		overview: `- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills\n- Over 2 years of experience in programming with good communication and quick learning skills`,
		expr: [
			['07/2015 - 03/2018', 'AI&T JSC', `Full-stack Developer\n- Outsourcing projects\n- Create coding frames and design database based on project descriptions`],
			['01/2019 - 01/2020', 'Freelance', `Full-stack Developer\n- Develop web module on given projects.`],
		],
		edu: [
			['08/2020 - 08/2024', 'Bách Khoa University', `- Khóc hơn chục lần\n- Thi lại tới chết\n- Đóng góp Quỹ xây tòa H`],
			['10/2020 - 12/2020', 'Toeic Time', `- Học Tiếng Anh mục tiêu 600\n- Ra trường với Toeic cao`],
			['08/2020 - 08/2024', 'Life Cycle', `- Ăn và code tới khi không ngồi được nữa`],
		],
		skill: [
			['Main', '- HTML, CSS, JavaScript (ReactJS, React-Native, Lit)\n- PHP (Laravel, Symfony, Codeigniter, Yii)\n- Node (ExpressJS)\n- RESTful API, GraphQL'],
			['Others', '- Ruby (Ruby on Rails)\n- SVN, GIT'],
		],
		proj: [
			{
				name: 'Apply Job Web',
				time: '06/2023 - Present',
				client: 'Team 03',
				desc: 'Design and Build an Apply Job website',
				noOfMem: 7,
				pos: 'Front End Dev',
				responsibility: '- Dev\n- Solution Architect',
				technology: '- Frontend: ReactJS\n- Backend: Java \n- Database: GraphQL'
			}
		]
	}

	const [data, setData] = useState(initState)
	const [imgSrc, setImgSrc] = useState('https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.15752-9/358901283_831248694805943_2854589597757346918_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=LUsEQhzmdYcAX_F_Qyg&_nc_ht=scontent.fsgn2-3.fna&oh=03_AdSQDRUprfCbNfsJB6-Y08QiDJpQQdp7Ya_GQU_JZhiJFA&oe=64EF3AB1')
	const fileRef = useRef()

	const handleUpdateData = (type, payload, addField = true) => {
		if (!payload) // payload is null
		{
			setData({ ...data })
			return
		}

		if (addField)
			hanldeAddField(type, payload)
		else
			hanldeRemoveField(type, payload)
		setData({ ...data })
	}

	const hanldeAddField = (type, payload) => {
		if (payload.newVal)
		{
			switch (type)
			{
				case "INFO":
					data.info[payload.idx] = payload.newVal
					break
				case "TABLE":
					data.expr.splice(payload.idx + 1, 0, ['TIME', 'COMPANY', 'CONTENT'])
					break
				case "EDU":
					data.edu.splice(payload.idx + 1, 0, ['TIME', 'UNI OR COURSE', 'CONTENT'])
					break
				case "SKL":
					data.skill.splice(payload.idx + 1, 0, ['TYPE', 'NOTE', 'SKILLS'])
					break
				case "PROJ":
					data.proj.splice(payload.idx + 1, 0, {
						name: "NAME",
						time: "",
						desc: "",
						client: "",
						noOfMem: 0,
						pos: "",
						responsibility: "",
						technology: ""
					})
					break
				default:
					break
			}
			return
		}

		switch (type)
		{
			case "INFO":
				data.info.splice(payload.idx + 1, 0, ['DATA FIELD', 'VALUE'])
				break
			case "TABLE":
				data.expr.splice(payload.idx + 1, 0, ['TIME', 'COMPANY', 'CONTENT'])
				break
			case "EDU":
				data.edu.splice(payload.idx + 1, 0, ['TIME', 'UNI OR COURSE', 'CONTENT'])
				break
			case "SKL":
				data.skill.splice(payload.idx + 1, 0, ['TYPE', 'NOTE', 'SKILLS'])
				break
			case "PROJ":
				data.proj.splice(payload.idx + 1, 0, {
					name: "NAME",
					time: "",
					desc: "",
					client: "",
					noOfMem: 0,
					pos: "",
					responsibility: "",
					technology: ""
				})
				break
			default:
				return
		}
		//handleChange(data)
	}
	const hanldeRemoveField = (type, payload) => {
		switch (type)
		{
			case "INFO":
				data.info.splice(payload.idx, 1);
				break;
			case "TABLE":
				data.expr.splice(payload.idx, 1);
				break;
			case "EDU":
				data.edu.splice(payload.idx, 1);
				break
			case "SKL":
				data.skill.splice(payload.idx, 1);
				break
			case "PROJ":
				data.proj.splice(payload.idx, 1);
				break;
			default:
				return;
		}
		//handleChange(data);
	}

	const handleChangeAvt = async (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();

		reader.onload = function (event) {
			setImgSrc(event.target.result);
		};

		reader.readAsDataURL(file)

		fileRef.current.value = ''
	}
	const generatePDF = useReactToPrint({
		content: () => pagesPDF.current,
		documentTitle: "userData",
		onAfterPrint: () => alert("Data save in PDF")
	  });
	  const pagesPDF = useRef();
	return (
		<>
		<Header/>
		<div style = {{width: "80%", marginLeft: "10%", marginRight: "10%", marginBottom: "20px"}}>
			<Container style = {{width: "100%"}}>
				<Row>
				<Col xs={2} className="sidebar" >
					<CVSelect/>
				</Col>
				<Col xs = {10}>
		<div className='cv' ref = {pagesPDF} style = {{backgroundImage: "url('https://cv.fullstack.edu.vn/backgrounds/graph-dot-top-458966.svg')"}}>
			<div className='page' ref={cvref}>
				<div>
					<input className='cv-ipt name' style = {{color: "green", fontWeight: "600"}} value={data.name} onChange={e => {
						data.name = e.target.value
						handleUpdateData(data)
					}} />
					<br />
					<input className='cv-ipt name' style = {{color: "green", fontWeight: "600", fontSize: "23px"}} value={data.position} onChange={e => {
						data.position = e.target.value
						handleUpdateData(data)
					}} />
					<br/>
				</div>
				<div className='d-flex justify-content-between'>
					<SectionWithInfo
						title={""}
						type={"INFO"}
						sectionData={data.info}
						handleUpdateData={handleUpdateData} />
					<div
						className='img-container'
						style={{
							backgroundImage: `url(${imgSrc})`,
							height: 220,
							width: 220,
							backgroundPosition: "center center",
							backgroundSize: "contain",
							backgroundRepeat: "no-repeat"
						}}
						onClick={() => fileRef.current.click()}
					>
					</div>
					<input
						ref={fileRef}
						type='file'
						accept="image/*"
						className='d-none'
						onChange={handleChangeAvt}
					/>
				</div>
				<SectionWithParagraph
					iconName = {"bi bi-yelp"}
					title={"Overview"}
					sectionData={data.overview} />
				<SectionWithList
					iconName = {"bi bi-pie-chart"}
					title={"Skill"}
					type={"SKL"}
					oneRow={true}
					sectionData={data.skill}
					handleUpdateData={handleUpdateData} />
				<SectionWithList
					iconName = {"bi bi-award"}
					title={"Work Experience"}
					type={"EXPR"}
					sectionData={data.expr}
					handleUpdateData={handleUpdateData} />
				<SectionWithList
					iconName = {"bi bi-box"}
					title={"Education"}
					type={"EDU"}
					sectionData={data.edu}
					handleUpdateData={handleUpdateData} />
				{/* </div>
			<div className='page'> */}
				<SectionWithTable
					iconName = {"bi bi-brightness-high"}
					title={"Project"}
					type={"PROJ"}
					sectionData={data.proj}
					handleUpdateData={handleUpdateData}
				/>
			</div>
		</div >
		<Button variant = "outline-success" onClick = {generatePDF} style = {{marginLeft: "45%", marginTop: "15px"}}>Print PDF</Button>
		</Col>
    </Row>
    </Container>
    </div>
		<Footer/>
		</>
	)
};

export default Cv