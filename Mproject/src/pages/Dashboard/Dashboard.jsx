import React, { useState } from 'react';
import './Dashboard.scss';
import users from '../user'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="Dashboard-container">
            <div className="navigate">
                <div className="manage-user">
                    <div className="border-bottom"></div>
                </div>
                <div className="manage-candidate">

                </div>
                <div className="blacklist">

                </div>
            </div>
            <div className="dashboard">
            </div>
        </div>
    );
}
export default Dashboard;
