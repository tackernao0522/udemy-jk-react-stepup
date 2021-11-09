## 再レンダリングされる時はどんな時か？

1. stateが更新されたコンポーネントは再レンダリング<br>
2. propsは変更されたコンポーネントは再レンダリング<br>
3. 再レンダリングされたコンポーネント配下の子要素は再レンダリング<br>

## レンダリング最適化1 (memo)

```
import { memo } from "react" // 必要箇所のみ再レンダリングさせるため

const style = {
    width: '100%',
    height: '200px',
    backgroundColor: 'khaki',
}

export const ChildArea = memo((props) => { // propsが変更しない限り再レンダリングしないという意味になる
    const { open } = props
    console.log("ChildAreaがレンダリングされた！！")

    const data = [...Array(2000).keys()]
    console.log(data)
    data.forEach(() => {
        console.log("...")
    })

    return (
        <>
            {open ? (
                <div style={style}>
                <p>子コンポーネント</p>
                </div>
            ) : null}
        </>
    )
})
```
## レンダリング最適化2 (useCallback)

`App.jsx`<br>

```
import { useState, useCallback } from "react"; // 編集
import { ChildArea } from "./ChildArea";
import "./App.css";

export default function App() {
    console.log('App')
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)

    const onChangeText = (e) => setText(e.target.value)

    const onClickOpen = () => setOpen(!open) // 追記

    const onClickClose = useCallback(() => setOpen(false), [setOpen]) // openが変更になった時のみ動く この場合はfalseにするだけなので[]で良い

    return (
        <div className="App">
            <input value={text} onChange={onChangeText} />
            <br />
            <br />
            <button onClick={onClickOpen}>表示</button>
            <ChildArea open={open} onClickClose={onClickClose} /> // 編集
        </div>
    )
}
```

`ChildArea.jsx`

```
import { memo } from "react" // 必要箇所のみ再レンダリングさせるため

const style = {
    width: '100%',
    height: '200px',
    backgroundColor: 'khaki',
}

export const ChildArea = memo((props) => { // propsが変更しない限り再レンダリングしないという意味になる
    const { open, onClickClose } = props // 編集
    console.log("ChildAreaがレンダリングされた！！")

    const data = [...Array(2000).keys()]
    console.log(data)
    data.forEach(() => {
        console.log("...")
    })

    return (
        <>
            {open ? (
                <div style={style}>
                <p>子コンポーネント</p>
                <button onClick={onClickClose}>閉じる</button> // 追記
                </div>
            ) : null}
        </>
    )
})
```
