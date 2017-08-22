# js 基本语法

## 变量、函数命名

1. 变量函数命名采用驼峰式结构
2. 变量名以名词为主、函数名以动宾结构为主，事件类函数名命名为对象名+事件名（itemClick）
3. 命名做到简单、明确，但不过分修饰，一般不超过3个单词
4. 命名中不建议使用'_'字符
5. 回调方法 尽量使用 lambda 表达式来避免 this 作用域的问题
6. 鼓励使用更多的 es6 的语法，es6 语法在运行时编译成 es5 来运行，所以不用担心兼容性的问题 -- babel 编译
    
## 排版 （按自动格式化的标准养成排版习惯）
1. 缩进
2. 空格
3. 换行
4. 注释

## 不写无用的代码
1. 不使用的变量不要定义及赋值，或注释掉
2. 不过分使用空行
3. 删除运行不到的代码
<!-- 4. angularjs不使用的服务不要注入 -->


# Angular 元素命名

## 组件 Component

1. js文件命名: [name].component.ts， 最后要以 component.ts 后缀来命名，名称单词之间用《-》分割
2. 模板文件命名: [name].component.html，规则同上
3. 样式文件命名: [name].component.less/css，规则同上
4. 注册成功的组件名称会以驼峰命名法注册 
    (例：class-list.component.ts => classList )

## 服务(单例) Service

1. js文件命名: [name].service.ts， 最后要以 service.ts 后缀来命名，名称单词之间用《-》分割
2. 注册成功的服务名称会以驼峰命名法注册
    (例：class.service.ts => class, class-term.service.ts => classTerm )

## 服务(工厂) Factory

1. js文件命名: [name].factory.ts， 最后要以 factory.ts 后缀来命名，名称单词之间用《-》分割
2. 注册成功的服务名称会以驼峰命名法注册
    (例：class.service.ts => class, class-term.service.ts => classTerm )
3. 尽量使用 Service 来实现服务

## 指令 Directive

1. js文件命名: [name].directive.ts， 最后要以 directive.ts 后缀来命名，名称单词之间用《-》分割
2. 如果模板代码较多，用 Component 完成可能更合适

## 过滤器 Filter

1. js文件命名: [name].filter.ts， 最后要以 filter.ts 后缀来命名，名称单词之间用《-》分割
2. 如果在模板中显示的数据原格式不能满足，请用 filter 实现
