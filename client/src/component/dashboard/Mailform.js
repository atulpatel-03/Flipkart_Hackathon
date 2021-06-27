import React,{ useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import DashboardNav from './DashboardNav';
import { Link } from "react-router-dom";
import "../../asserts/scss/Form.scss";
import { sendMail } from '../../redux/actions/post';
import { connect } from "react-redux";
import "../../asserts/scss/Model.scss";

const Mailform = ({ sendMail }) => {

    const [formData, setFormData]= useState({
        to:'',
        subject:'',
        schedule:'',
        text:'',
        cc:''

    })

    const{
       to,
       subject,
       schedule,
       text,
       cc
    }= formData;

   

    const onChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value})
        
    }

    const onSubmit = async e => {
        e.preventDefault();
        console.log("Mail sended", formData);
        await sendMail(formData);
        alert("Your mail is sended!!");
        setFormData({
            to:'',
            subject:'',
            schedule:'',
            text:'',
            cc:''

        })
    }

    return (
        <div>
        <DashboardNav />
          
            <div className="modal-primary-container">
            <div className="modal-primary search-modal">
           <form className="detailsform" onSubmit={onSubmit}>
                <div className="maildetails">
                    <h3>Schedule your mail</h3>
                    <div className="form-group">
                    <label>To</label>
                    <input 
                        type="email"
                        className="form-control"
                        placeholder="Enter Recipient Email"
                        name="to"
                        value={to}
                        onChange={onChange}
                        required
                    />
                    </div>
                    <div className="form-group">
                    <label>Cc</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder=" "
                        name="cc"
                        value={cc}
                        onChange={onChange}
                       
                    />
                    </div>
                    <div className="form-group">
                    <label>Subject</label>
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Enter Subject"
                        name="subject"
                        value={subject}
                        onChange={onChange}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label>Schedule</label>
                    <select 
                        id="class" 
                        class="form-control" 
                        name="schedule" 
                        onChange={onChange} 
                        value={schedule} 
                        required 
                    >
                        <option selected value="once">Only One Time</option>
                        <option selected value="sec">Every 30 Sec</option>
                        <option selected value="min">Every 5 min</option>
                        <option selected value="hour">Every Hour</option>
                        <option selected value="day">Every Day</option>
                        <option selected value="weekday">Every Weekday</option>
                        <option selected value="weekend">Every Weekend</option>
                        <option selected value="month">Every Month</option>
                        <option selected value="year">Every Year</option>
                        
                        
                    </select>
                    </div>
                    <div className="form-group">
                    <label>Body</label>
                    <textarea
                        cols="100"
                        rows="6" 
                        type="email"
                        className="form-control"
                        placeholder="Message You want Deliver"
                        name="text"
                        value={text}
                        onChange={onChange}
                        required
                    />
                    </div>
                    
                    <button type="submit" className="btn btn-primary sendbtn" >Send</button>
                    <Link to="/dashboard" className="btn btn-large gobackbtn">Go Back</Link>
                </div>
                
                </form>
           </div>
           </div>
     
        </div>
    )
}

Mailform.propTypes = {
sendMail:PropTypes.func.isRequired,
}



const mapStateToProps = (state) => ({
    auth:state.auth
  });

export default connect(mapStateToProps,{sendMail})(Mailform);
