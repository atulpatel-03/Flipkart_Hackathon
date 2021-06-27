import React,{useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DashboardNav from './DashboardNav';
import { loadUser } from '../../redux/actions/auth';
import { connect } from "react-redux";
import "../../asserts/scss/Mails.scss";
import formatDate from '../../utils/formatDate';
import { deleteYourMail, sendMail } from '../../redux/actions/post';
import "../../asserts/scss/Model.scss";


const Future = ({auth: {user}, loadUser, deleteYourMail, sendMail}) => {

    const [mails, setMails] = useState([]);

    
    
    useEffect(async () =>{
        let temp= await loadUser();

        let tempArray= await temp.yourmails.map((t) =>{
            return{
                isActive:false,
                detail:t
            }
        })
        console.log("temparray",tempArray);
        await setMails(tempArray);
    },[])

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
        alert("Your mail is updated");
        
    }


    const handleClick = async (id) =>{
      
        let temp1= mails.filter((noti) => noti.dateil._id !== id);
        
        await deleteYourMail(id);
        setMails(temp1);
    }

    const handleClick1 = async (id) =>{
        let temp1= mails.map(t=>{
            if(t.detail._id === id){
               let fun = {
                to:t.detail.to,
                subject:t.detail.subject,
                schedule:t.detail.schedule,
                text:t.detail.text,
                cc:t.detail.cc
               }
               setFormData(fun);
                return {
                    ...t,
                    isActive:!t.isActive
                }
            }
            return t;
        });

        
        setMails(temp1);
    }

    const handleClick2 = async (id) =>{
        let temp1= mails.map(t=>{
            if(t.detail._id === id){
               let fun = {
                to:'',
                subject:'',
                schedule:'',
                text:'',
                cc:''
               }
               setFormData(fun);
                return {
                    ...t,
                    isActive:!t.isActive
                }
            }
            return t;
        });

        
        setMails(temp1);
    }


    const allMails=mails.map((t) =>{
        if(t.isActive){
            return <div className="modal-primary-container">
            <div className="modal-primary search-modal">
           
                
                <form className="detailsform" onSubmit={onSubmit}>
                <div className="maildetails">
                    <h3>Edit your mail</h3>
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
                    
                    <button type="submit" className="btn btn-primary sendbtn" >Update</button>
                    <button type="button" className="btn btn-large goback" onClick={() => handleClick2(t.detail._id)}>Go Back</button>
                </div>
                
                </form>

                </div>
        </div>
        }else{
            return <div className="mail-card">
                <div className="date">{t.detail.date}</div>
                <div className="detail">
                <div className="to"><span>To - </span>{t.detail.to}</div>
                <div className="subject"><span>Subject - </span>{t.detail.subject}</div>
                </div>
                <div className="buttons">  
                <button type="button" className="btn btn-large btn-primary read" onClick={() =>handleClick1(t.detail._id)}>Edit</button>
                <button type="button" className="btn btn-large delete" onClick={()=> handleClick(t.detail._id)}>Delete</button>
                </div>
        </div>
        }
    })

    return (
        <div>
        <DashboardNav />
        <div className="allmails">Your Mails</div>
           {mails.length>0 ? <div  className="mails">
               {allMails}
           </div>: <div className="no-mails">Till Now You have't send any mail!!</div>}
        </div>
    )
}

Future.propTypes = {
    deleteYourMail:PropTypes.func.isRequired,
    loadUser:PropTypes.func.isRequired,
    sendMail:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth:state.auth
  });

export default connect(mapStateToProps,{loadUser, deleteYourMail, sendMail})(Future);
