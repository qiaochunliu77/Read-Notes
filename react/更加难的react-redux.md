# react-redux
    问题：每当redux里面的state改变了 通过subscribr页面都会重新渲染
    react-redux中的connect方法将store上的getState 和 dispatch 包装成组件的props。

## context
    跨层级传输state
    const context = createContext()

## Provider
    这个方法可以传入两个可选参数:mapStateToProps 和 mapDispatchToProps
    mapStateToProps :  将 store 中的数据作为 props 绑定到组件上
    mapDispatchToProps  :  将 action 作为 props 绑定到 组件 上。


