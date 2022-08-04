import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import "./DomainCheck.css"

function DomainChecker() {
    const [domain,setDomain]=useState({
        domname:""
    })
    const [responseData,setResponseData]=useState({
        manufacture_date:"",
        is_registered:"",
        domain_name:""
    })

    function handleClick(e){

        e.preventDefault();
        const url=`https://api.whoisfreaks.com/v1.0/whois?apiKey=5c3f4f73e8384fb79c6f1c9e9d35cf83&whois=live&domainName=${domain.domname}`
        const data=axios.get(url);
        data.then((promiseData)=>{
       
            setResponseData(
                {
                    manufacture_date:(promiseData.data.create_date),
                    is_registered:(promiseData.data.domain_registered),
                    domain_name:(promiseData.data.domain_name)
                }
            )
        })
        //console.log(responseData.manufacture_date)
    }

  return (
    <div className='Domain-check'>
        <div className='Domain-container'>
            <h1>
                Write domain here to check the availability
            </h1>
            <div className='domain-chk'>
            <input id='dom-comp' name='domname' value={domain.domname} onChange={({currentTarget:input})=>{setDomain({...domain,[input.name]:input.value})}}/>
        <button  id='dom-comp-button'onClick={handleClick}>
            Check
        </button>
            </div>
            <div style={{"marginTop":"30px"}}>
            <h4>
                Domain name:{responseData.domain_name}
            </h4>
            <h4>
                Domain is Registered:{responseData.is_registered}
            </h4>
            <h4>
                Domain Creation Date:{responseData.manufacture_date}
            </h4>
            </div>
            
        </div>
        
    </div>
  )
}

export default DomainChecker
