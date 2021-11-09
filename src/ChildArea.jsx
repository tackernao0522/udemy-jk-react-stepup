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
