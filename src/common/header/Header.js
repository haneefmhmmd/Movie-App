import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import './Header.css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});






export default function Header(props) {

    const [value, setValue] = useState(0);
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [isRegistrationSuccessful,setIsRegistrationSuccessful] = useState(false);

    const [loginFormInputs, setLoginFormInputs] = useState({
      username : '',
      password : ''
    });
    const [sigInFormInputs, setSignInFormInputs] = useState({
      firstName : '',
      lastName : '',
      email : '',
      password : '',
      contact : ''
    });

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
      const [modalIsOpen, setIsOpen] = React.useState(false);

      function openModal() {
        setIsOpen(true);
      }
    
      function closeModal() {
        setIsOpen(false);
      }  

      const loginClickHandler = ()=>{
          openModal();
      }
      const handleChange = (event, value) => {
        setValue(value);
      };


      const handleLoginFormInputChange = (e)=>{
        const state = {...loginFormInputs};
        state[e.target.name] = e.target.value;
        setLoginFormInputs(state);
      }

      const handleSignInFormInputChange = (e)=>{
        const state = {...sigInFormInputs};
        state[e.target.name] = e.target.value;
        setSignInFormInputs(state);
      }


      const loginBtnHandler = (e)=>{
        if(loginFormInputs.username.length>0 && loginFormInputs.password.length>0){
          console.log('Logging in!', loginFormInputs)
        }
      }

      async function signIn(){
        const rawData = {
          "email_address": sigInFormInputs.email,
          "first_name": sigInFormInputs.firstName,
          "last_name": sigInFormInputs.lastName,
          "mobile_number": sigInFormInputs.contact,
          "password": sigInFormInputs.password
        }
        const rawResp = await fetch("http://localhost:8085/api/v1/signup",{
            method:"POST",
            headers :{
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body : JSON.stringify(rawData)
        });
        const res = await rawResp.json();
        if(res.status === "ACTIVE"){
          setIsRegistrationSuccessful(true);
        }else if(rawResp.status === 422){
          console.error("Already Existing User!")          
        }
        else{
          console.error("Error while trying to register!")
        }
    }
    
      const signInBtnHandler = ()=>{
        if(sigInFormInputs.firstName.length>0 && sigInFormInputs.lastName.length>0 && sigInFormInputs.password.length>0 && sigInFormInputs.email.length>0 && sigInFormInputs.contact.length>0){
          signIn();
        }
      }

    return (
        <header className="app-header">
            <img src={logo} alt="logo image" className="logo"/>
            <div className="btns">
            {props.isMoviePage && <Button variant="contained" color="primary" style={{marginRight : 24}} onClick={props.bookShowHandler}>Book Show</Button>}
            {isLoggedIn ? <Button variant="contained" color="default">Logout</Button> : <Button variant="contained" color="default" onClick={loginClickHandler}>Login</Button>}
            </div>
            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login"
            >
                <AppBar position="static" color="default">
                  <Tabs value={value} 
                    onChange={handleChange} 
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Login" />
                    <Tab label="Register" />
                  </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl required >
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input id="username" type="text" name="username" onChange={handleLoginFormInputChange} required/>
                    </FormControl>
                    <br/><br/>
                    <FormControl required>
                        <InputLabel htmlFor="loginPassword">Password</InputLabel>
                        <Input id="loginPassword" type="password" name="password"  onChange={handleLoginFormInputChange} required/>
                    </FormControl>
                    <br/><br/>
                    {isLoggedIn === true &&
                        <FormControl>
                            <span className="successText">
                                Login Successful!
                            </span>
                        </FormControl>
                    }
                    <Button variant="contained" color="primary" onClick={loginBtnHandler} >LOGIN</Button>
                  </Grid>
                            
                  </TabContainer>}
                {value === 1 && <TabContainer>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >  
                    <FormControl required >
                          <InputLabel htmlFor="firstName">First Name</InputLabel>
                          <Input id="firstName" type="text" name="firstName" onChange={handleSignInFormInputChange} required
                          error={sigInFormInputs.firstName.length > 0 ? false : true}
                          />
                      </FormControl>
                      <br/><br/>
                      <FormControl required >
                          <InputLabel htmlFor="lastName">Last Name</InputLabel>
                          <Input id="lastName" type="text" name="lastName" onChange={handleSignInFormInputChange} required
                          error={sigInFormInputs.lastName.length > 0 ? false : true}
                          />
                      </FormControl>
                      <br/><br/>
                      <FormControl required >
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <Input id="email" type="email" name="email" onChange={handleSignInFormInputChange} required
                            error={sigInFormInputs.email.length > 0 ? false : true}
                          />
                      </FormControl>
                      <br/><br/>
                      <FormControl required>
                          <InputLabel htmlFor="password">Password</InputLabel>
                          <Input id="password" type="password" name="password"  onChange={handleSignInFormInputChange} required
                            error={sigInFormInputs.password.length > 0 ? false : true}
                          />
                      </FormControl>   
                      <br/><br/>               
                      <FormControl required >
                          <InputLabel htmlFor="contact">Contact No.</InputLabel>
                          <Input id="contact" type="text" name="contact" onChange={handleSignInFormInputChange} required
                            error={sigInFormInputs.contact.length > 0 ? false : true}
                          />
                      </FormControl>
                      <br/><br/>
                      {isRegistrationSuccessful === true &&
                          <FormControl>
                              <span className="successText">
                              Registration Successful. Please Login!
                              </span>
                          </FormControl>
                      }
                      <Button variant="contained" color="primary" onClick={signInBtnHandler}>Register</Button>                  
                    </Grid>
                  </TabContainer>}
            </Modal>
        </header>
    )
}
