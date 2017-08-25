# angular 


## angular 模块

新框架的 angular 元素加入了批量注册，定义了 注册器 Provider 

```
Provider : { 
    component: (module: ng.IModule, context: any) => void,
    directive: (module: ng.IModule, context: any) => void,
    service: (module: ng.IModule, context: any) => void,
    factory: (module: ng.IModule, context: any) => void,
    filter: (module: ng.IModule, context: any) => void,
}
```
 
### 组件 Component

```typescript
/*  
 * 文件命名: [name].component.ts， 最后要以 component.ts 后缀来命名，名称单词之间用《-》分割
 * 模板文件命名: [name].component.html，规则同上
 * 样式文件命名: [name].component.less/css，规则同上
 * 注册成功的组件名称会以驼峰命名法注册 
 * (例：class-list.component.ts => classList )
 * 新建一个 Component，通过一个装饰器 (Decorator) 来注册
 */

import Component from 'app/core/component';

interface DashboardComponentScope extends jxb.Scope {
    name: string;
}

@Component({
    inject: ['$scope', '$http'],
    templateUrl: './app/dashboard.component.html'
})
export default class DashboardComponent {

    constructor(
        private $scope: DashboardComponentScope,
        private $http: ng.IHttpService) {
    }

    $onInit() {
        console.log('start');
    }

    $onDestroy() {
        console.log('end');
    }
}

```

### 服务(单例) Service

```typescript
/*  
 * 文件命名: [name].service.ts， 最后要以 service.ts 后缀来命名，名称单词之间用《-》分割
 * 注册成功的服务名称会以驼峰命名法注册
 * (例：class.service.ts => class, class-term.service.ts => classTerm )
 * 
 * 新建一个 Service，通过一个装饰器 (Inject) 来描述依赖注入服务
 */

import Injector from 'app/core/injector';

@Injector('$timeout')
export default class LoadingService implements jxb.shared.LoadingService {

    template = `
        <div class="loading" style="background-color:rgba(0,0,0,.1);display: none;">
            <i class="circle"></i><i class="icon-bang-logo"></i>
        </div>
    `;

    $loading: JQuery;

    constructor(private $timeout: ng.ITimeoutService) {
        this.$loading = $(this.template);
    }

    show(selector: string = '.frame-group', text: string = '') {
        let $parent = $(selector);
        if ($parent.css('position') === 'static') {
            $parent.css('position', 'relative');
        }
        this.$loading.appendTo($parent).show();
    }

    hide() {
        if (!!this.$loading) {
            this.$loading.hide().remove();
        }
    }
}

```

*   

*   
    

### 服务(工厂) Factory

*   文件命名: [name].factory.ts， 最后要以 factory.ts 后缀来命名，名称单词之间用《-》分割

*   注册成功的服务名称会以驼峰命名法注册

    (例：class.service.ts => class, class-term.service.ts => classTerm )

*   尽量使用 Service 来实现服务

### 指令 Directive

*   文件命名: [name].directive.ts， 最后要以 directive.ts 后缀来命名，名称单词之间用《-》分割

*   如果模板代码较多，用 Component 完成可能更合适

### 过滤器 Filter

*   文件命名: [name].filter.ts， 最后要以 filter.ts 后缀来命名，名称单词之间用《-》分割

*   如果在模板中显示的数据原格式不能满足，请用 filter 实现
