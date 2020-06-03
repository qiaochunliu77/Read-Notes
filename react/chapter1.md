# react 小书笔记
## state 
- this.onstateChange方法 改变状态后触发

## JSX
- 写 React.js 组件,必须从 react 的包当中引入 React 和 React.js 的组件父类 Component。
- ReactDOM 可以帮助我们把 React 组件渲染到页面上去
- 这种“在 JavaScript 写的标签的”语法叫 **JSX**。**编译**的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。
- 所谓的 JSX 其实就是 JavaScript 对象。
- JSX到页面的过程
JSX ——> (Babel编译+react.js构造) ——> js对象 ——> (ReactDom.render) ——> Dom元素 ——>插入页面
- **react-dom** 负责把这个用来描述 UI 信息的 js 对象变成 DOM 元素，并且渲染到页面上。

## 事件监听 
- 这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。
- 由于调用时并不是通过对象方法调用（this.handleClickOnTitle），而是直接通过函数调用 （handleClickOnTitle）,所以事件监听函数内并不能通过this获取到实例。
- 未绑定 this->undefined    bind->this指向该实例化组件Title

## state
- **setState** 方法由父类 Component 所提供。当我们调用这个函数的时候，React.js 会更新组件的状态 state ，并且**重新调用 render 方法**，然后再把 render 方法所渲染的最新的内容显示到页面上。
- **setState之后 ,并不会马上修改 state。**React.js 的 setState 把你的传进来的状态缓存起来，稍后才会帮你更新到 state 上.
- 若要利用上一次 setState 结果进行运算： 可以在setState中传入一个函数
    this.setState((prevState) => {
      return { count: 0 }
    })
## props
- 在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值
- static defaultProps = {
      likedText: 'qq',
      unlikedText: 'xx'
    }

## state VS props
1. state 的主要作用是用于组件保存、控制、修改自己的可变状态。
2. props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件。它是外部传进来的配置参数，组件内部无法控制也无法修改。
state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。
**尽量少地用 state，尽量多地用 props。**

## 渲染列表数据
- 如果你往 {} 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来。
- 对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 **key** 属性，这个 key 必须是每个元素唯一的标识。

## demo
- 父组件通过props给子组件传入一个回调(onSubmit) 
- 子组件通过setstate将最新的数据传给父组件 并由父组件渲染

## 状态提升
  当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为。

## 生命周期
- React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的**挂载**
- 提供了两个方法：
    -> constructor()                //组件初始化 如state
    -> componentWillMount()
    -> render()
    -> componentDidMount()          // 然后构造 DOM 元素插入页面
    -> componentWillUnmount()
    -> 删除

- 组件生命周期
    1. componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
      一些组件启动的动作，包括像 Ajax 数据的拉取操作、一些定时器的启动等。
    2. componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
      组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，
    3. componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。

    4. shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
    5. componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
    6. componentWillUpdate()：组件开始重新渲染之前调用。
    7.componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。

## dom 
1. ref :
  react不能做dom查询 
  React.createRef()可以查找到某个dom元素
2. props.children
3.  dangerouslySetInnerHTML={{__html: this.state.content}}
  这样我们就可以动态渲染元素的 innerHTML 结构了
4. style  驼峰式命名
  <h1 style={{fontSize: '12px', color: 'red'}}>React.js 小书</h1>
  
## PropTypes
  给组件的配置参数加上类型验证
  npm install --save prop-types

  通过 isRequired 关键字来强制组件某个参数必须传入
  static propTypes = {
  comment: PropTypes.object.isRequired
  }

PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.node
PropTypes.element
