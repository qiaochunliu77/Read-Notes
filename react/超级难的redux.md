# 超级难的redux
redux => 现在最火的状态管理方案就是redux

## store
    构建一个函数 createStore，用来专门生产这种 state 和 dispatch 的集合
    ```
    import { createStore } from 'redux'
    const store = createStore(reducer)
    ```

## action 
    指的是客户端发起的一个操作，告诉我们store需要改变 
    每个 action 必须有一个 type 属性，这表示 action 的名称
    ```
    const action = {
        type: 'ADD_ITEM',
        payload: 'new item', // 可选属性
    }
    ```
## reducer 
    redux还定义了 一个叫dispatch的东西，它专门用来发出action
    reducer计算返回新的state
### dispatch
    所有对数据的操作必须通过 disptach 函数，他接受一个action对象作为参数，里面必须包含一个type字段来声明你到底想干什么
    任何模块想要获取 / 修改状态，必须调用dispatch
    ```
     store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }) 
    ```


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

## reducer是一个 纯函数 pure function
- 函数的返回结果只依赖于它的参数。
    不依赖外部定义的变量 如a
- 函数执行过程里面没有副作用。
    函数的执行修改了 外部传进来的对象

## 总结
    我们在创建store的时候，我们在createStore里面传入了一个reducer参数，在这里，我们就是为了，每次store.dispatch发送一个新的action,redux都会自动调用reducer，返回新的state。


## 共享结构的对象提高性能
每当更新数据就重新渲染整个 App  (X)
在每个渲染函数执行渲染操作之前先做个判断，判断传入的新数据和旧的数据是不是相同，相同的话就不渲染了。
const obj2 = { ...obj } 其实就是新建一个对象 obj2，然后把 obj 所有的属性都复制到 obj2 里面，相当于对象的浅复制
还要优化 stateChanger 为 reducer，定义了 reducer 只能是纯函数，功能就是负责初始 state，和根据 state 和 action 计算具有共享结构的新的 state。

## immulable
  在js中，引用类型的数据，优点在于频繁的操作数据都是在原对象的基础上修改，不会创建新对象，从而可以有效的利用内存，不会浪费内存，这种特性称为mutable（可变），但恰恰它的优点也是它的缺点，太过于灵活多变在复杂数据的场景下也造成了它的不可控性，假设一个对象在多处用到，在某一处不小心修改了数据，其他地方很难预见到数据是如何改变的，针对这种问题的解决方法，一般就像刚才的例子，会想复制一个新对象，再在新对象上做修改，这无疑会造成更多的性能问题以及内存浪费。

特性：
    1. 持久化数据结构
        一个数据，在被修改时，仍然能够保持修改前的状态
    2. 结构共享
        当我们对一个Immutable对象进行操作的时候，ImmutableJS会只clone该节点以及它的祖先节点，其他保持不变，这样可以共享相同的部分，大大提高性能。
    3. 惰性操作
        使用immutable处理数据，会更少次的执行，程序效率高
        


定义 ：即如果对象树中一个节点发生变化，只修改这个节点和受它影响的父节点，其它节点则进行共享。
- 运用immutable 结构共享的特性 优化性能
- 任何修改或添加删除操作都会返回一个新的 Immutable 对象
- 使用旧数据创建新数据时，要保证旧数据同时可用且不变

APi 
1. fromJS() 所有immutable数据
2. Map() 对应原生 Object 数组
3. toJS() 对两个 immutable 对象进行值比较的
4. List() 对应原生 Array 数组
添加元素 ： set setIn
取到元素 ： get getIn

