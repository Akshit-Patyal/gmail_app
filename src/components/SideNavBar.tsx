import React from 'react';
import { useHistory } from 'react-router';
import './SideNavBar.css';

const SideNavBar:React.FC<{ Icon : any ;title : string ; count: number }> = (props) => {

    const {Icon, title, count} = props;

    const history = useHistory();

    const navigationHandler = () => {
        switch (title) {
            case 'Inbox':
                return history.replace("/");
            case 'Sent':
                return history.replace("/sent");
            case 'Trash':
                return history.replace("/trash");
            default:
                return history.replace("/");
        }
    
    }


        return (
            <div onClick={navigationHandler} className='sidebarTabs'>
                 <Icon />
                 <h4>{title}</h4>
                 <p>{count}</p>
            </div>
        )
}

export default SideNavBar;