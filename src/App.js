import { useState, useCallback } from "react";
import { ChildArea } from "./ChildArea";
import "./App.css";

export default function App() {
    console.log('App')
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)

    const onChangeText = (e) => setText(e.target.value)

    const onClickOpen = () => setOpen(!open)

    const onClickClose = useCallback(() => setOpen(false), [setOpen]) // openが変更になった時のみ動く この場合はfalseにするだけなので[]で良い 変更がない限り再レンダリングされないようにしている

    return (
        <div className="App">
            <input value={text} onChange={onChangeText} />
            <br />
            <br />
            <button onClick={onClickOpen}>表示</button>
            <ChildArea open={open} onClickClose={onClickClose} />
        </div>
    )
}
