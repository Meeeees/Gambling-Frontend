import React from "react";
import config from '../config.json'

const Gamble = ({ setToken, setBalance }) => {
    const [bet, setBet] = React.useState(0);
    const [guesses, setGuesses] = React.useState([0]);
    const [clientBalance, setClientBalance] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${config.Backend.url}/auth/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token
                })
            }).then(res => res.json()).then(data => {
                if (data.status !== 200) {
                    localStorage.removeItem('token');
                    return;
                } else {
                    setToken(data.load.user.token);
                    setClientBalance(data.load.user.balance);
                }
            })
        } else {
            setToken(null);
            window.location.href = '/';
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(bet) <= 0) return;
        if (guesses.length < 1) return;
        if (parseInt(clientBalance) < parseInt(bet)) return;
        for (let i = 0; i < guesses.length; i++) {
            if (parseInt(guesses[i]) < 0) return;
        }
        setLoading(true);
        console.log(bet, guesses)
        fetch(`${config.Backend.url}/games/dice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bet,
                guesses,
                'token': localStorage.getItem('token')
            })
        }).then(res => res.json()).then(data => {
            console.log(data)
            setBalance(data.newBalance)
            setClientBalance(data.newBalance)
            setLoading(false);
        }).catch(err => console.log(err));
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Dice</h2>
                <p>
                    Game description
                    <br />
                    If you guess once and you guess correctly, you will get 5x the amount you bet.
                    If you guess twice and you guess correctly, you will get 3x the amount you bet.
                    If you guess three times and you guess correctly, you will get 2x the amount you bet.
                </p>
                <input type="number" name="bet" placeholder="Bet" onChange={(e) => setBet(e.target.value)} value={bet} />
                <div className="guesses">
                    {guesses.map((guess, index) => (
                        <input key={index} type="number" name="guesses" placeholder="Guess" onChange={(e) => setGuesses([...guesses.slice(0, index), e.target.value, ...guesses.slice(index + 1)])} value={guess} />
                    ))}
                    <button type="button" onClick={() => setGuesses([...guesses, 0])}>Add Guess</button>
                </div>

                <button type="submit" disabled={loading} aria-busy={`${loading ? true : false}`}>Gamble</button>
            </form>
        </div>
    )
}

export default Gamble