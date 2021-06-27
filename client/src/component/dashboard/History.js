import React, {useState , useEffect } from 'react'
import PropTypes from 'prop-types'
import DashboardNav from './DashboardNav';
import { connect } from "react-redux";
import { loadUser } from "../../redux/actions/auth";
import { deleteHistoryMail } from '../../redux/actions/post';
import "../../asserts/scss/Mails.scss";
import formatDate from '../../utils/formatDate';

const History = ({auth:{user}, loadUser, deleteHistoryMail }) => {
    
    const [mails, setMails] = useState([]);
    
    useEffect(async () =>{
        let temp= await loadUser();
        
        await setMails(temp.history);
    },[])

  

    const handleClick = async (id) =>{
      
        let temp1= mails.filter((noti) => noti._id !== id);
        
        await deleteHistoryMail(id);
        setMails(temp1);
    }


    const allMails=mails.map((t) =>{
        return <div className="mail-card">
                <div className="date">{t.date}</div>
                <div className="detail">
                <div className="to"><span>To - </span>{t.to}</div>
                <div className="subject"><span>Subject - </span>{t.subject}</div>
                </div>
                <div className="buttons">  
              
                <button type="button" className="btn btn-large delete" onClick={()=>handleClick(t._id)}>Delete</button>
                </div>
        </div>
    })
    return (
        <div>
        <DashboardNav />
        <div className="allmails">History Mails</div>
        {mails.length>0 ? <div  className="mails">
               {allMails}
           </div>: <div className="no-mails">Till Now You have't send any mail!!</div>}
        </div>
    )
}

History.propTypes = {
    loadUser:PropTypes.func.isRequired,
    deleteHistoryMail:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth:state.auth
  });

export default connect(mapStateToProps,{loadUser, deleteHistoryMail})(History);
