import React from "react";
const Nav = ({ data }) => {
    return (
        <nav>
            {Object.keys(data).length > 0 ?
                (
                    <ul>
                        <li>Balance: {data.balance}</li>
                        <li><a href="/">Home</a></li>
                        <li><a href="/gambling">Gambling</a></li>
                        <li><a href="/profile">Profile</a></li>
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