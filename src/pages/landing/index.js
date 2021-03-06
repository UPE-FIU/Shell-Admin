import React, {Component} from 'react';

import './style.css';

import Logo from '../../assets/shellLogo.svg';
import Starfish from '../../assets/Starfish.svg';
import Sandals from '../../assets/Sandals.svg';

import Admin from '../../services/admin';

class Landing extends Component{
    constructor(props){
        super(props)

        this.state = {
            password: null
        }
    }

    handleInputChange(property) {
        return e => {
          this.setState({
            [property]: e.target.value
          });
        };
      }

      /**
       * Calls login service
       */
      submit = async () => {
        const {password} = this.state;
        const{history} = this.props;

        await Admin.login(password,history);
      }

    render(){
        return(
            <div>
                <div className="backgroundObjects">
                    <img id="starfish" className="decor" src={Starfish}/>
                    <img id="sandals" className="decor" src={Sandals} />
                </div>
                    <div className = "landingContainer">
                        <img className = "logo" src={Logo}/>
                        <div className="passwordBox">
                            <h2>PASSWORD</h2>
                            <input type="text" 
                            value={this.state.password} 
                            onChange ={this.handleInputChange('password')}
                            type = "password"
                            />
                        </div>
                    <button className="landingBtn" onClick={this.submit}>Submit</button>
                </div>
            </div>
            
        );
    }
}

export default Landing;