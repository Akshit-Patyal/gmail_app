import React  from 'react';
import './Header.css';
import { BiPencil } from 'react-icons/bi';


const Header = () => {

    var id=Math.random();
    let to=Math.random().toString(36).substring(2,7);
    let from=Math.random().toString(36).substring(2,9);
    let isMailedRead=false;
    let isDeleted=false;
    let subject=Math.random().toString(36).substring(2,20);;
    let type="Inbox";
    let description=Math.random().toString(36).substring(2,30);

    

    function newMailhandler() {
    
        let item = {id,to,from,description,isMailedRead,isDeleted,subject,type}
        fetch('http://localhost:3000/emails', {
          method: "POST",
          headers:{
           'Accept':'application/json',
           'Content-Type':'application/json'
          },
          body:JSON.stringify(item)
        }).then((result) => {
          result.json().then((response) => {
            console.warn(response);
          });
        });
      }


    return (
        <div className="header">
            <div className="header-left">
                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png" alt="Mail Logo" />
                <h2 className='heading'>Demo Mail</h2>
            </div>

            <div className='header-middle'>
                <button id='newMail' onClick={newMailhandler} className='btn btn-primary'><BiPencil />  Compose</button>
            </div>
            
        </div> 
    )
}

export default Header;