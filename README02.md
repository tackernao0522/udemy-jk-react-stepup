## 再レンダリングされる時はどんな時か？

1. stateが更新されたコンポーネントは再レンダリング<br>
2. propsは変更されたコンポーネントは再レンダリング<br>
3. 再レンダリングされたコンポーネント配下の子要素は再レンダリング<br>

## レンダリング最適化1 (memo) コンポーネントのmemo化

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
## レンダリング最適化2 (useCallback) 関数のmemo化

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

## useMemo 変数自体のmemo化

最初に読み込まれたときだけに実行される 4という値を持ったまま使いまわされるイメージである。<br>
変数に設定する処理が複雑になっている場合には使う時があるが使う頻度は少ない。再レンダリングする度に計算しなくて済むことになる。<br>
[]の中は指定する変数を入れればその変数が変更した時のみ動く

`App.js`<br>

```
import { useState, useCallback, useMemo } from "react"; // 編集
import { ChildArea } from "./ChildArea";
import "./App.css";

export default function App() {
    console.log('App')
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)

    const onChangeText = (e) => setText(e.target.value)

    const onClickOpen = () => setOpen(!open)

    const onClickClose = useCallback(() => setOpen(false), [setOpen]) // openが変更になった時のみ動く この場合はfalseにするだけなので[]で良い 変更がない限り再レンダリングされないようにしている

    const temp = useMemo(() => 1 + 3, []) // useMemo 変数自体をmemo化 []の中身が空なので1 + 3が固定
    console.log(temp) // 4

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
```

