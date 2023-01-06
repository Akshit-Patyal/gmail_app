import './SideNavList.css';
import { BsInbox } from "react-icons/bs";
import { CiPaperplane } from 'react-icons/ci';
import React from 'react';
import {BsTrash} from 'react-icons/bs';
import SideNavBar from './SideNavBar';


const SideNavList:React.FC<{ inboxNavCount : number; sentNavCount : number ;trashNavCount : number }> = (props) => {

        return (
            <div className="sidenav">
          
                 <SideNavBar Icon={BsInbox} title="Inbox" count={props.inboxNavCount} /> 
                 <SideNavBar Icon={CiPaperplane} title="Sent" count={props.sentNavCount} /> 
                 <SideNavBar Icon={BsTrash} title="Trash" count={props.trashNavCount} /> 
                
            </div>
        )
}

export default SideNavList;