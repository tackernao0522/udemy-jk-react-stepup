import { useState } from "react";
import "./App.css";

export default function App() {
    console.log('App')
    const [count, setCount] = useState(0)

    const onClickCountup = () => {
        setCount(count + 1)
    }

    return (
        <div className="App">
            <p>{count}</p>
            <button onClick={onClickCountup}>カウントアップ</button>
        </div>
    )
}
