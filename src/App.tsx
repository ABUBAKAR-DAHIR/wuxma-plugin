import { useState } from 'react'

function App() {
  const [count, setCount] = useState(5)

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    setCount(parseInt(target.value))
  }

  const handleCreate = () => {
    // parent.postMessage({pluginMessage: {type: 'create-rectangles', count}}, '*')
      parent.postMessage({ pluginMessage: { type: 'create-shapes', count } }, '*')
  }

  const handleCancel = () => {
    // parent.postMessage({pluginMessage: {type: 'cancel', count}}, '*')
      parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }


  return (
    <>
      <h2>Rectangle Creator</h2>
      <p>Count: <input id="count" type="number" value={count} onChange={() => handleChange} /></p>
      <button id="create" onClick={handleCreate}>Create</button>
      <button id="cancel" onClick={handleCancel}>Cancel</button>
    </>
  )
}

export default App
