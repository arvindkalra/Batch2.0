import React,{useState} from 'react';

const NavButton = ({setTableArray, html}) => {
    const [active,setActive] = useState(false)
    return (
        <li onClick={() => {
            setTableArray();
            setActive(true);

        }} className={active?'active':null} >{html}
        </li>
    );
};

export default NavButton;
