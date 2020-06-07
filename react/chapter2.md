# 超级难的redux

## dispatch
    所有对数据的操作必须通过 disptach 函数，他接受一个action对象作为参数，里面必须包含一个type字段来声明你到底想干什么
    任何模块想要获取 / 修改状态，必须调用dispatch
    ```
     dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) 
    ```
## store
    构建一个函数 createStore，用来专门生产这种 state 和 dispatch 的集合

```createStore (state, stateChanger) ```
createStore 接受两个参数，一个是表示应用程序状态的 state；另外一个是 stateChanger，它来描述应用程序状态会根据 action 发生什么变化

```import counter from './reducers';   //将所有的store放在reducers下```
```const store = createStore(counter)  //couter就是一个store```
```store.dispatch({ type: 'INCREMENT' })```
```store.getState()```
createStore 会返回一个对象，这个对象包含两个方法 getState 和 dispatch。**getState** 用于获取 state 数据，其实就是简单地把 state 参数返回。
**dispatch** 用于修改数据，和以前一样会接受 action，然后它会把 state 和 action 一并传给 stateChanger，那么 stateChanger 就可以根据 action 来修改 state 了。

```store.subscribe(render)```
数据发生改变就重新渲染

### 完整代码
```
import Counter from './components/Counter';
const store = createStore(counter); //reducer 

const render = () =>ReactDOM.render(
  <Counter 
   // 读取store中的状态
    value={store.getState()} 
    // 属性
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  document.getElementById('root')
);

render()

// 监听 只要store发生改变 就重新执行
store.subscribe(render)
```

## 纯函数 pure function
- 函数的返回结果只依赖于它的参数。
    不依赖外部定义的变量 如a
- 函数执行过程里面没有副作用。
    函数的执行修改了 外部传进来的对象

## 共享结构的对象提高性能
每当更新数据就重新渲染整个 App  (X)
在每个渲染函数执行渲染操作之前先做个判断，判断传入的新数据和旧的数据是不是相同，相同的话就不渲染了。
const obj2 = { ...obj } 其实就是新建一个对象 obj2，然后把 obj 所有的属性都复制到 obj2 里面，相当于对象的浅复制
还要优化 stateChanger 为 reducer，定义了 reducer 只能是纯函数，功能就是负责初始 state，和根据 state 和 action 计算具有共享结构的新的 state。
## 共享结构的对象提高性能
每当更新数据就重新渲染整个 App  (X)
在每个渲染函数执行渲染操作之前先做个判断，判断传入的新数据和旧的数据是不是相同，相同的话就不渲染了。
const obj2 = { ...obj } 其实就是新建一个对象 obj2，然后把 obj 所有的属性都复制到 obj2 里面，相当于对象的浅复制
还要优化 stateChanger 为 reducer，定义了 reducer 只能是纯函数，功能就是负责初始 state，和根据 state 和 action 计算具有共享结构的新的 state。