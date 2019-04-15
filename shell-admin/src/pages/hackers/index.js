import React,{Component,Fragment} from 'react';
import axios from 'axios';

import Hacker from '../../components/hacker';
import './style.css';

import Navbar from '../../components/navbar'

const SERVER_URL = "http://e2797737.ngrok.io"

class Hackers extends Component{
    constructor(props){
        super(props)

        this.state = {
            applicants: null,
            hackers: null,
        }
    }

    async componentDidMount(){
        try{
        const token = await localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization':'Bearer '+ token
            }
        }

        const {data} = await axios.get(SERVER_URL+"/application",config);
        const {applicants} = data.data

        this.setState({applicants,hackers:applicants})
       
        }catch(e){
            alert('Unauthorized, please login')
            await localStorage.setItem("token",null)
            this.props.history.push('/')
        }
    }

    hackerSearch = (event) => { 
       const{value} = event.target
       const{applicants} = this.state
       let arr = [];

        applicants.map(hacker => {
            for(let key in hacker){
                let hackerVal = hacker[key]

                if(hackerVal && String(hackerVal).toLowerCase().includes(String(value).toLowerCase())){
                    arr.push(hacker)
                    break;
                }
            }
        })

        this.setState({hackers:arr})
    }

    render(){
        const{hackers} = this.state

        return(
            hackers ?
            <div className="background">
                <Navbar />
                    <div className="hackerOuter">
                        <input 
                        onChange = {this.hackerSearch} 
                        placeholder="Search for hacker" 
                        className="hackerInput" 
                        type='text'
                        />
                        <h2>{hackers.length} Hackers Found</h2>
                        <button className="allBtn">Accept All</button>
                        <div className="hackersContainer">
                            {hackers.map(hacker => {
                                return <Hacker data = {hacker} />
                            })}
                        </div>
                    </div>
            </div>
            :
            <div className="hackerOuter">
                <h1 id="loading">Loading...</h1>
            </div>

        )
    }
}

export default Hackers;