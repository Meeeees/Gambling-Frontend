import React from "react";
import style from '../styles/nav.module.css';
const Nav = ({ data }) => {
    return (
        <nav className={`${style.nav} container`}>
            {Object.keys(data).length > 0 ?
                (
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/gamble">Gamble</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li className={style.balance}>Balance: {data.balance}</li>
                    </ul>
                )
                :
                (
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/signin">Login</a></li>
                        <li><a href="/signup">Signup</a></li>
                    </ul>
                )}

        </nav>
    );
}

export default Nav;