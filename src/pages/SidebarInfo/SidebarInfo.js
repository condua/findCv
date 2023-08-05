// SidebarInfo.js
import React from 'react';
import './SidebarInfo.scss';

const SidebarInfo = () => {
  return (
    <div className="sidebarinfo">
      <div className="icon" onMouseEnter={() => showTooltip('Resume')} onMouseLeave={hideTooltip}>
        Person
      </div>
      <div className="icon" onMouseEnter={() => showTooltip('BuildCV')} onMouseLeave={hideTooltip}>
        Task
      </div>
      <div className="tooltip">Resume</div>
    </div>
  );
};

function showTooltip(text) {
  const tooltip = document.querySelector('.tooltip');
  tooltip.innerText = text;
  tooltip.style.display = 'block';
}

function hideTooltip() {
  const tooltip = document.querySelector('.tooltip');
  tooltip.style.display = 'none';
}

export default SidebarInfo;
