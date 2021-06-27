import React from 'react'
import PropTypes from 'prop-types';
import DashboardNav  from './DashboardNav';
import { Link } from "react-router-dom";
import "../../asserts/scss/Dashboard.scss";

const Dashboard = props => {

    return (
        <div>
           <DashboardNav />
           <div className="dashboard-main-page">  </div> 
           <div className='landing-inner bg-text'>
          <h1 className='x-large'>Mailer</h1>
          <p className='lead'>
            Schedule your mail Now!!
          </p>
          <div className='buttons'>
          <Link to="/mailform" className="btn btn-large btn-primary">Mail Now</Link>
        
        </div>
          

           </div>
        </div>
    )
}

Dashboard.propTypes = {

}

export default Dashboard
