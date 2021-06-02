## MVVM
架构图如下所示：
![mvvm](MVVM.png)
- view
```text
view 是视图层即页面展示的DOM内容
```

- model
```text
定义在data中的数据模型
```
- viewmodel
```text
作为视图和模型中间的沟通桥梁，实现了两方面的功能：1、数据绑定（Data Binding）
2、Dom监听页面的事件同步吧变化更新至模型中
```
