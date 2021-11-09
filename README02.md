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
