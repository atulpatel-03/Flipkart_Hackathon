import React from 'react';
import { withRouter } from "react-router-dom";
import { Drawer as MUIDrawer } from '@material-ui/core';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "../../asserts/scss/DashboardNav.scss";
import { logout } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
      
    },
    ListItemText:{
        fontSize:'5rem',//Insert your required size
      },
   
  });



const Drawer = ({logout, history }) => {
    // const {  history } =props;
    const [state, setState] = React.useState({
        top: false,
        
      });
    
      function setClick(){
        setState({
          top:false
        });
      }
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    const classes = useStyles();
    const itemList = [
        {
            text:"Dashboard",
            onClicked: () => history.push('/dashboard')
        },
        {
            text:"Your Mails",
            onClicked: () => history.push('/futuremail')
        },
        {
            text:"History Mails",
            onClicked: () => history.push('/historymail')
        },
        {
            text:"Logout",
            onClicked: () => history.push('/logout')
        }
    ];

    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
        <List>
                {itemList.map((item, index) =>{
                    const { text, onClicked } = item;

                    return(
                      
                        <ListItem button key={text} className="list-text" onClick={onClicked}>
                            <ListItemText className="list-t"   primary={text} />
                        </ListItem>
                        
                        
                    );
                })}
            </List>
        </div>
  );

    return (
        <div>
           {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className="left btn btn-large" onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <MUIDrawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <button className="btn btn-large drawerbtn" onClick={setClick}>Back</button>
            {list(anchor)}
           
          </MUIDrawer>
          </React.Fragment>
      ))} 
        </div>
    )
}

Drawer.propTypes = {
    logout: PropTypes.func.isRequired,
}

export default withRouter(Drawer);

