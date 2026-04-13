import { useState } from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className={"max-w-4xl mx-auto pt-5"}>
            <h1 className={"text-blue-500 text-2xl"}>Hello, World!</h1>
            <p>Count: {count}</p>
            <button className={"px-10 py-2 bg-blue-500 text-white rounded-xl transition hover:bg-blue-600 active:bg-blue-700"} onClick={() => setCount(count + 1)}>Click</button>
        </div>
    )
}

export default App
