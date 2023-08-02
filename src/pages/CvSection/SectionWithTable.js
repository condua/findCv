import './index.scss'

function SectionWithTable({ iconName,title, type, sectionData, handleUpdateData }) {
	const BtnAddItem = (props) => (
		<button
			data-bs-toggle="tooltip" title="Add new item"
			className='btn-add btn btn-outline-primary'
			onClick={() => handleUpdateData(type, { idx: props.idx })}>
			+
		</button>
	)
	const BtnRemoveItem = (props) => (
		<button
			data-bs-toggle="tooltip" title="Remove this item"
			className='btn-remv btn btn-outline-danger'
			onClick={() => handleUpdateData(type, { idx: props.idx }, false)}>
			-
		</button>
	)

	const dictionary = {
		client: 'Client',
		desc: 'Descriptions',
		noOfMem: 'Number of members',
		pos: 'Position',
		responsibility: 'Responsibilities',
		technology: 'Technology in use'
	}

	return (
		<div className='section'>
			<i className={iconName} style={{ fontSize: '25px', color: "green" }} >{' '}{title}</i>
			<hr />
			{sectionData.map((tbl, idx) => (
				<div className='proj-tbl' key={idx}>
					<div className='cv-ipt proj-name' contentEditable>Name Project: {tbl.name}</div>
					{/* <i>(</i> */}
					<span className='cv-ipt proj-time' contentEditable>Time: {tbl.time}</span>
					{/* <i>)</i> */}

					<table>
						{
							Object.entries(tbl).splice(2).map((item, j) => (
								<tr key={j}>
									<td className='cv-ipt' contentEditable>{dictionary[item[0]]}</td>
									<td className='cv-ipt' contentEditable>{item[1]}</td>
								</tr>
							))
						}
					</table>
					<BtnAddItem idx={idx} />
					<BtnRemoveItem idx={idx} />
				</div>
			))}
		</div>

	)
};

export default SectionWithTable