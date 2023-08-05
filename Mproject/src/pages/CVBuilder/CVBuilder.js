import React, { useState, useEffect, useRef } from 'react';
import './CVBuilder.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faUpload, faPrint } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import cvFields from '../../data/cvFields.json';
import { useReactToPrint } from 'react-to-print'
import Header from "./../Header/Header";
import CVSelect from "./../CVSelect/CVSelect";
import Footer from "./../Footer/Footer";


function CVBuilder() {
  const pagesPDF = useRef();
  const [headerFields, setHeaderFields] = useState({});
  const [overview, setOverview] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);
  const [avatar, setAvatar] = useState('');
  const [activeInput, setActiveInput] = useState('');
  const [expandedFields, setExpandedFields] = useState({});
  const [showIcons, setShowIcons] = useState(false);
  const [tables, setTables] = useState([{ time: '', detail: '' }]);;
  const [projects, setProjects] = useState([
    {
      projectName: 'MYCV.VN',
      time: '06/2018 - Present',
      descriptions: 'Standard CV writing application, always support free PDF download (https://mycv.vn)',
      numberOfMembers: '1',
      responsibilities: '- Developer',
      technologyInUse: '- Frontend: ReactJS\n- Backend: PHP',
    },
  ]);
  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        projectName: '',
        time: '',
        descriptions: '',
        numberOfMembers: '',
        responsibilities: '',
        technologyInUse: '',
      },
    ]);
  };
  
  useEffect(() => {
    setHeaderFields(cvFields.header);
    setOverview(cvFields.overview);
    setWorkExperience(cvFields.workExperience);
  }, []);
  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleProjectChange = (index, field, e) => {
    const newProjects = [...projects];
    newProjects[index][field] = e.target.value;
    setProjects(newProjects);
  };
  const handleAddField = (col) => {
    const newFields = { ...headerFields };
    const col1Length = newFields.col1 ? newFields.col1.length : 0;
    const col2Length = newFields.col2 ? newFields.col2.length : 0;
    const targetCol = col1Length <= col2Length ? 'col1' : 'col2';
    newFields[targetCol] = newFields[targetCol]
      ? [...newFields[targetCol], { label: newFields[col][0].label, value: '' }]
      : [{ label: newFields[col][0].label, value: '' }];
    setHeaderFields(newFields);
  };


  const handleRemoveField = (col, index) => {
    const newFields = { ...headerFields };
    if (newFields[col]) {
      newFields[col].splice(index, 1);
      setHeaderFields(newFields);
    }
  };

  const handleContentChange = (col, index, e) => {
    const newFields = { ...headerFields };
    if (newFields[col]) {
      newFields[col][index].value = e.target.textContent;
      setHeaderFields(newFields);
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
        const newFields = { ...headerFields };
        if (newFields.col3) {
          newFields.col3[0].value = reader.result;
        }
        setHeaderFields(newFields);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputFocus = (col, index) => {
    setActiveInput(`${col}-${index}`);
  };

  const handleInputBlur = () => {
    setActiveInput('');
  };

  const isInputActive = (col, index) => {
    return activeInput === `${col}-${index}`;
  };

  const handleClickField = (col, index) => {
    setExpandedFields({ ...expandedFields, [`${col}-${index}`]: true });
    setShowIcons(true);
  };

  const handleRemoveFieldClick = (col, index) => {
    const newFields = { ...headerFields };
    if (newFields[col]) {
      newFields[col].splice(index, 1);
      setHeaderFields(newFields);
    }
    const newExpandedFields = { ...expandedFields };
    delete newExpandedFields[`${col}-${index}`];
    setExpandedFields(newExpandedFields);
    setShowIcons(false);
  };

  const handleClickOutside = (e) => {
    const isClickInside = e.target.closest('.value');
    if (!isClickInside) {
      setActiveInput('');
      setShowIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddOverview = () => {
    setOverview([...overview, '']);
  };

  const handleRemoveOverview = (index) => {
    const newOverview = [...overview];
    newOverview.splice(index, 1);
    setOverview(newOverview);
  };

  const handleOverviewChange = (index, e) => {
    const newOverview = [...overview];
    newOverview[index] = e.target.textContent;
    setOverview(newOverview);
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([...workExperience, { time: '', detail: '' }]);
  };

  const handleRemoveWorkExperience = (index) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience.splice(index, 1);
    setWorkExperience(newWorkExperience);
  };

  const handleWorkExperienceChange = (index, field, e) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index][field] = e.target.value;
    setWorkExperience(newWorkExperience);
  };

  const handleAddTable = () => {
    setTables([...tables, { time: '', detail: '' }]);
  };

  const handleRemoveTable = (index) => {
    const newTables = [...tables];
    newTables.splice(index, 1);
    setTables(newTables);
  };

  const handleTableCellChange = (tableIndex, rowIndex, colIndex, e) => {
    const newTables = [...tables];
    newTables[tableIndex][colIndex] = e.target.textContent;
    setTables(newTables);
  };
  const generatePDF = useReactToPrint({
    content: () => pagesPDF.current,
    documentTitle: "userData",
    onAfterPrint: () => alert("Data save in PDF")
  });

  return (
    <>
    <Header/>
    <div style = {{width: "80%", marginLeft: "10%", marginRight: "10%"}}>
    <Container>
        <Row>
        <Col xs={2} className="sidebar" >
            <CVSelect/>
          </Col>
        <Col xs = {10}>

    <div className="cv-builder" ref = {pagesPDF}  style = {{backgroundImage: "url('https://cv.fullstack.edu.vn/backgrounds/graph-dot-top-458966.svg')", backgroundPosition: "center", backgroundSize: "contain"}}>
      <Container>
        <Row>
          <Col xs={8}>
            <Row>
              <Col>
                <div className="header" >
                  <div className="column0">
                    {headerFields.col0 &&
                      headerFields.col0.map((field, index) => (
                        <div
                          className={`field ${expandedFields[`col0-${index}`] ? 'expanded' : ''}`}
                          key={index}
                          // onClick={() => handleClickField('col0', index)}
                        >
                          <div
                           style = {{fontSize: "23px", color: "green"}}
                            className={`value ${
                              isInputActive('col0', index) ? 'input-active' : 'input-borderless'
                            }`}
                            contentEditable="true"
                            onBlur={(e) => handleContentChange('col0', index, e)}
                            onFocus={() => handleInputFocus('col0', index)}
                            dangerouslySetInnerHTML={{ __html: field.value }}
                          />
                          {expandedFields[`col0-${index}`] && (
                            <div className="buttons">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="remove-button"
                                onClick={() => handleRemoveFieldClick('col0', index)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="header" >
                  <div className="column">
                    {headerFields.col1 &&
                      headerFields.col1.map((field, index) => (
                        <div contentEditable="true"
                          className={`field ${expandedFields[`col1-${index}`] ? 'expanded' : ''}`}
                          key={index}
                          onClick={() => handleClickField('col1', index)}
                        >
                          <span className="label" contentEditable="true">{field.label}:</span>
                          <div
                            className={`value ${
                              isInputActive('col1', index) ? 'input-active' : 'input-borderless'
                            }`}
                            contentEditable="true"
                            onBlur={(e) => handleContentChange('col1', index, e)}
                            onFocus={() => handleInputFocus('col1', index)}
                            dangerouslySetInnerHTML={{ __html: field.value }}
                          />
                          {expandedFields[`col1-${index}`] && (
                            <div className="buttons">
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="add-button"
                                onClick={() => handleAddField('col1')}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="remove-button"
                                onClick={() => handleRemoveFieldClick('col1', index)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                  <div className="column">
                    {headerFields.col2 &&
                      headerFields.col2.map((field, index) => (
                        <div
                          className={`field ${expandedFields[`col2-${index}`] ? 'expanded' : ''}`}
                          key={index}
                          onClick={() => handleClickField('col2', index)}
                        >
                          <span className="label">{field.label}:</span>
                          <div
                            className={`value ${
                              isInputActive('col2', index) ? 'input-active' : 'input-borderless'
                            }`}
                            contentEditable="true"
                            onBlur={(e) => handleContentChange('col2', index, e)}
                            onFocus={() => handleInputFocus('col2', index)}
                            dangerouslySetInnerHTML={{ __html: field.value }}
                          />
                          {expandedFields[`col2-${index}`] && (
                            <div className="buttons">
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="add-button"
                                onClick={() => handleAddField('col2')}
                              />
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="remove-button"
                                onClick={() => handleRemoveFieldClick('col2', index)}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
            </Row>
            
          </Col>
          <Col>
            <div className="field">
              <div className="value">
                <img
                  src={headerFields.col3 && headerFields.col3[0].value}
                  alt="Avatar"
                  className="uploaded-image"
                  width = "600px"
                  height = "600px"
                />
                <label htmlFor="avatar-upload" className="upload-button">
                  <FontAwesomeIcon icon={faUpload} />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    width = "600px"
                    height = "600px"
                    onChange={handleAvatarUpload}
                  />
                </label>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="overview" contentEditable="true">
            <i className="bi bi-yelp" style={{ fontSize: '25px' }}>{' '}Overview</i>
              <div className="content">
                {overview.map((item, index) => (
                  <div key={index} className="overview-item">
                    <div
                      className="overview-content"
                      contentEditable="true"
                      onBlur={(e) => handleOverviewChange(index, e)}
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="work-experience" contentEditable="true">
              <i className="bi bi-pie-chart" style={{ fontSize: '25px' }}>{' '}Work Experience</i>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Time</th>
                    <th style={{ width: '75%' }}>Detail</th>
                    <th style={{ width: '10%' }}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="add-button"
                        onClick={handleAddWorkExperience}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workExperience.map((experience, index) => (
                    <tr key={index}>
                      <td>
                        <div
                          className="work-experience-content"
                          contentEditable="true"
                          onBlur={(e) =>
                            handleWorkExperienceChange(index, 'time', e)
                          }
                          dangerouslySetInnerHTML={{
                            __html: experience.time,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="work-experience-content"
                          contentEditable="true"
                          onBlur={(e) =>
                            handleWorkExperienceChange(index, 'detail', e)
                          }
                          dangerouslySetInnerHTML={{
                            __html: experience.detail,
                          }}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="remove-button"
                          onClick={() => handleRemoveWorkExperience(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
       <Row>
          <Col>
            <div className="work-experience" contentEditable="true">
            <i className="bi bi-award" style={{ fontSize: '25px' }}>{' '}Awards</i>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>Time</th>
                    <th style={{ width: '75%' }}>Detail</th>
                    <th style={{ width: '10%' }}>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="add-button"
                        onClick={handleAddWorkExperience}
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {workExperience.map((experience, index) => (
                    <tr key={index}>
                      <td>
                        <div
                          className="work-experience-content"
                          contentEditable="true"
                          onBlur={(e) =>
                            handleWorkExperienceChange(index, 'time', e)
                          }
                          dangerouslySetInnerHTML={{
                            __html: experience.time,
                          }}
                        />
                      </td>
                      <td>
                        <div
                          className="work-experience-content"
                          contentEditable="true"
                          onBlur={(e) =>
                            handleWorkExperienceChange(index, 'detail', e)
                          }
                          dangerouslySetInnerHTML={{
                            __html: experience.detail,
                          }}
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="remove-button"
                          onClick={() => handleRemoveWorkExperience(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="skill" contentEditable="true">
            <i className="bi bi-box" style={{ fontSize: '25px' , color: 'green'}}>{' '}Skill</i>
            <Table striped bordered>
            <tbody>
              <tr>
                <td>
                  <div className = "skill-content" contentEditable="true">
                          Main:
                  </div>
                </td>
                <td>
                <div className = "skill-content" contentEditable="true">
                  <li>HTML, CSS, JavaScript (ReactJS, React-Native, Lit)</li>
                  <li>PHP (Laravel, Symfony, Codeigniter, Yii)</li>
                  <li>Node (ExpressJS)</li>
                  <li>RESTful API, GraphQL</li>
                  <li>MySQL, PostgreSQL, NoSQL (MongoDB)</li>
                  <li>Server (Apache, Nginx, Redis, Memcached, Queue, Log, Crontjob...), Rancher, K8S, Docker</li>
                  <li>AWS (Load balancing, EC2, ECS, Router 53, RDS, S3)</li>
                </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className = "skill-content" contentEditable="true">
                          Other:
                  </div>
                </td>
                <td>
                <div className = "skill-content" contentEditable="true">
                  <li>Ruby (Ruby on Rails)</li>
                  <li>SVN, GIT</li>
                  <li>Python (selenium automation test, crawler)</li>
                  <li>Elasticsearch</li>
                  <li>Tensorflow</li>
                </div>
                </td>
              </tr>
            </tbody>
            </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="project">
            <i className="bi bi-brightness-high" style={{ fontSize: '25px', color: 'green' }}>{' '}Projects</i>
              {projects.map((project, index) => (
                <div className="project-item" key={index}>
                  <Table striped bordered>
                    <tbody>
                      <tr>
                        <td>Project Name:</td>
                        <td>
                          <div
                            className="project-projectName"
                            contentEditable="true"
                            onBlur={(e) => handleProjectChange(index, 'projectName', e)}
                            dangerouslySetInnerHTML={{ __html: project.projectName }}
                          />
                         
                        </td>
                      </tr>
                      <tr>
                        <td>Time:</td>
                        <td>
                        <div
                            className="project-time"
                            contentEditable="true"
                            onBlur={(e) => handleProjectChange(index, 'time', e)}
                            dangerouslySetInnerHTML={{ __html: project.time }}
                          />
                        
                        </td>
                      </tr>
                      <tr>
                        <td>Descriptions:</td>
                        <td>
                          <div
                            className="project-descriptions"
                            contentEditable="true"
                            onBlur={(e) => handleProjectChange(index, 'descriptions', e)}
                            dangerouslySetInnerHTML={{ __html: project.descriptions }}
                          />
                          
                        </td>
                      </tr>
                      <tr>
                        <td>Number of Members:</td>
                        <td>
                          <div
                            className="project-numberOfMembers"
                            contentEditable="true"
                            onBlur={(e) => handleProjectChange(index, 'numberOfMembers', e)}
                            dangerouslySetInnerHTML={{ __html: project.numberOfMembers }}
                          />
                      
                        </td>
                      </tr>
                      <tr>
                        <td>Responsibilities:</td>
                        <td>
                          <div
                            className="project-responsibilities"
                            contentEditable="true"
                            onBlur={(e) => handleProjectChange(index, 'responsibilities', e)}
                            dangerouslySetInnerHTML={{ __html: project.responsibilities }}
                          />
                      
                        </td>
                      </tr>
                      <tr>
                        <td>Technology in use:</td>
                        <td>
                        <div
                            className="project-technology"
                            contentEditable="true"
                            onBlur={(e) => handleProjectChange(index, 'technologyInUse', e)}
                            dangerouslySetInnerHTML={{ __html: project.technologyInUse }}
                          />
                      
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="remove-button"
                    onClick={() => handleRemoveProject(index)}
                  />
                </div>
              ))}
              <FontAwesomeIcon
                icon={faPlus}
                className="add-button"
                onClick={handleAddProject}
              />
            </div>
          </Col>
        </Row>
      </Container>
      
    </div>
    <Button onClick = {generatePDF}>PDF</Button>
    </Col>
    </Row>
    </Container>
    </div>
    <Footer/>
    </>
  );
}

export default CVBuilder;
