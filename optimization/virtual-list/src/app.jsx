import VirtualList1 from './components/VirtualList1'
import VirtualList2 from './components/VirtualList2'
const App = () => {
  return (
    <div>
      <div>
        <h1>固定高度 - 虚拟列表</h1>
        <VirtualList1></VirtualList1>
      </div>
      <div>
        <h1>不定高度 - 虚拟列表</h1>
        <VirtualList2></VirtualList2>
      </div>
    </div>
  )
}

export default App
