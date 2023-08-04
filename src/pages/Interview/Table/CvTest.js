import React from 'react';

const cvList = [
  { name: 'CV 1.pdf' },
  { name: 'https://www.tutorialspoint.com/reactjs/reactjs_tutorial.pdf' },
  { name: 'CV 3.pdf' },
  { name: 'CV 4.pdf' },
];

const CvTest = () => {
  // Lọc các đối tượng CV có tên chứa chuỗi ".pdf"
  const filteredCVs = cvList.filter(cv => cv.name.includes('.pdf'));

  return (
    <div>
      <h1>List of CVs:</h1>
      <ul>
        {filteredCVs.map((cv, index) => (
          <li key={index}>
            <a href={`${cv.name}`} target="_blank" rel="noopener noreferrer">
              CV {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CvTest;
