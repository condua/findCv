import './index.scss'

function SectionWithParagraph({ iconName, title, sectionData }) {
	return (
		<div className='section'>
			<i className={iconName} style={{ fontSize: '25px', color: "green" }} >{' '}{title}</i>
			
			<hr />
			<div className='cv-ipt para' contentEditable>
				{sectionData}
			</div>
		</div>
	)
};

export default SectionWithParagraph