
## JavaScript/TypeScript 问题

### 没有采用大坨峰风格的命名  

```typescript

// src > app > compotition > contest > contest-common-delete-modal.component.ts

export default class contestCommonDeleteModalComponent {
    // ...
}

```

### 表单提交使用 validate-submit 指令

```typescript

// src > app > compotition > contest > contest-detail-level-detail.component.ts

export default class ContestDetailLevelDetailComponent {

    // ...


    // private submit(inValid: any) { // 不好的实现
    private submit() {

        // 不好的实现
        // if (inValid) {
        //    this.$scope.$broadcast('fieldCheckValidity');
        //    return;
        // }

        let submitData = {
            id: this.$scope.info.id,
            name: this.$scope.info.name,
            gender: this.$scope.info.gender,
            contestId: this.$stateParams.contestId,
            ageGrades: this.$scope.info.ageGrades,
        };

        this.loading.show();
        this.contestApi.levelEdit(submitData)
            .then(data => {
                notify.success("赛试组别编辑成功");
                history.back();
            })
            .catch(error => notify.error(`赛试组别编辑失败\n${error.message || error.code}`))
            .finally(() => this.loading.hide());
    }
}

```
```html
<!-- 旧 <form name="groupEditForm" novalidate> -->
<form name="groupEditForm" validata-submit="$ctrl.submit()" novalidate>
    
    <!--...省略代码-->

    <div class='text-center'>
        <!-- 旧 <button type="button" 
            ng-click="$ctrl.submit(groupEditForm.$invalid)" 
            class="btn btn-primary">保存</button> -->
        <button type="submit" class="btn btn-primary">保存</button>
    </div>
</form>
```

### 没有在组件的Scope接口里显示声明变量


```typescript

// src > app > compotition > contest > contest-detail-stage-detail.component.ts

import Component from 'app/core/component';
import * as moment from 'moment';
import notify from 'libs/notify';

// 没有任何变量声明，无法直观的了解 $scope 挂载的变量数量和类型
// 注：jxb.Scope 接口的类型 [key: string]: any; 会屏蔽 key 的检查。
//    定义此接口的初衷是为了方便迁移旧代码，并不是为了屏蔽这个检查。
interface TemplateStageDetailComponentScope extends jxb.Scope { }

@Component({
    inject: ['$scope', 'contestApi', '$stateParams', 'loading'],
    templateUrl: './app/competition/contest/contest-detail-stage-detail.component.html'
})
export default class templateStageDetailComponent {
    constructor(
        private $scope: TemplateStageDetailComponentScope,
        private ContestApi: jxb.api.ContestApiService,
        private $stateParams: ng.ui.router.StateParams,
        private loading: jxb.shared.LoadingService,
    ) {
        /**
         * 赛程类型
         */
        $scope.typeList = [
            // ...
        ];

        /**
         * 添加成绩等级
         */
        $scope.addRank = (array: any[]) => {
            // ...
        };

        /**
         * 删除成绩等级
         */
        $scope.deleteRank = (array: any[], index: number) => {
            // ...
        };
     }

     private getStage() {

         // ... 
         this.ContestApi.stageDetail(params)
            .then(data => {
                this.$scope.info = {
                    // ...
                };
            });

        // ...
     }
}
```

### 接口成员的分隔符错误

```typescript

// src > app > compotition > question > question-add.component.ts

// 接口(interface)并非 Object 对象不能以","来分隔成员，应该使用 ";"

// 错误
interface QuestionAddComponentScope extends jxb.Scope {
    templateId: string,
    stageList: any
}

// 正确
interface QuestionAddComponentScope extends jxb.Scope {
    templateId: string;
    stageList: any;
}

```

### 单行占用的代码数过长

```typescript

// src > app > compotition > group > group-detail.component.ts

// ...

export default class GroupDetailComponent {

    constructor(
        private $scope: GroupDetailComponentScope,
        private groupApi: CompetitionGroupApiService,
        private loading: jxb.shared.LoadingService,
        private $stateParams: ng.ui.router.StateParams        
    ) {

        // 此行代码在文件中过长，应该用 es6 模板字符串或 数组合并的方式 来代替
        // 旧 $scope.questionHint = "1、拼音写在双中括号内，如[[wù]]-->适用于所有需要标注拼音的题目及答案2、诗词的出处、选错别字成语的答案、连词成句的答案：创建第二列，即题目的右侧列中-->适用于限时读诗、辨意选字、选错别字成语、连词成句3、选择题答案为正确答案的序号，并将每个选项列出来4、选错别字选项的表现形式：在选项后加#1#，如：在这千均一发的时刻-->在这千均#1#一发的时刻5、句子需要换行，在换行处添加换行符&lt;br&gt，如锄禾日当午，&lt;br&gt汗滴禾下土。";

        // case 1 
        $scope.questionHint = `
            1、拼音写在双中括号内，如[[wù]]-->适用于所有需要标注拼音的题目及答案
            2、诗词的出处、选错别字成语的答案、连词成句的答案：创建第二列，即题目的右侧列中-->适用于限时读诗、辨意选字、选错别字成语、连词成句
            3、选择题答案为正确答案的序号，并将每个选项列出来
            4、选错别字选项的表现形式：在选项后加#1#，如：在这千均一发的时刻-->在这千均#1#一发的时刻
            5、句子需要换行，在换行处添加换行符&lt;br&gt，如锄禾日当午，&lt;br&gt汗滴禾下土。`;

        // case 2 
        $scope.questionHint = [
            '1、拼音写在双中括号内，如[[wù]]-->适用于所有需要标注拼音的题目及答案',
            '2、诗词的出处、选错别字成语的答案、连词成句的答案：创建第二列，即题目的右侧列中-->适用于限时读诗、辨意选字、选错别字成语、连词成句',
            '3、选择题答案为正确答案的序号，并将每个选项列出来',
            '4、选错别字选项的表现形式：在选项后加#1#，如：在这千均一发的时刻-->在这千均#1#一发的时刻',
            '5、句子需要换行，在换行处添加换行符&lt;br&gt，如锄禾日当午，&lt;br&gt汗滴禾下土。',
        ].join('');

        $scope.descriptionHint = "1、限时读句中的出处、作者；2、选错别字成语的正确答案；3、连词成句的答案";
    }
}
```

### 外部文件引用路径优化

``` typescript

// 旧
import Component from '../../core/component';
import notify from "../../../libs/notify";

// 新
import Component from 'app/core/component';
import notify from "app/libs/notify";

```

### 注入服务型参风格

```typescript

// src > app > finance > order > order-list.component.ts

// angular 和 angular插件内置的服务名，都是以 $ 字符开始，这是为了避免跟其他服务重名引起的麻烦
// 因此我们自己的服务名不以 $ 开头，这样更好来区分系统内置的服务和 自定义的服务


// 形参 应该以 服务别名保持一致 $scope => $scope， loading => loading 

@Component({
    inject: ['$scope', 'accountApi', 'loading', 'export'],
    templateUrl: './app/finance/order/order-list.component.html',
})
export default class OrderListComponent {

    constructor(
        
        // 不符合
        private scope: OrderListComponentScope, 

        // 符合规范
        private accountApi: jxb.api.AccountApiService,

        // 不符合
        private loadingService: jxb.shared.LoadingService, 

        // 不符合 
        private exporter: jxb.shared.ExportService)  { 
        
        }
}

```

### API 服务的类型信息

```typescript

// src > app > finance > review > review-detail.component.ts

import Component from 'app/core/component';

// 不需要引用类型 用 jxb.api.xxx 替代
import AccountApiService from 'app/api/account-api.service';

// 不需要引用类型 用 jxb.api.xxx 替代
import SchoolApiService from 'app/api/school-api.service';

import notify from 'libs/notify';

interface ReviewDetailComponentScope extends ng.IScope {
    permit: Dictionary;
    accountId: string;
    accountInfoData: any;
}

@Component({
    inject: ['$scope', 'loading', 'accountApi', 'schoolApi', 'strings', '$stateParams'],
    templateUrl: './app/finance/review/review-detail.component.html',
     styleUrl:require('./review.less')
})
export default class ReviewDetailComponent {
    constructor(
        public $scope: ReviewDetailComponentScope,
        private loading: jxb.shared.LoadingService,
        private accountApi: AccountApiService,  // jxb.api.AccountApiService
        private schoolApi: SchoolApiService,    // jxb.api.SchoolApiService
        private strings: any,
        private $stateParams: any               // 尽可能的去 声明类型
    ) {
        // ...
    }

    // ...
}

```

### 未知的模块

```typescript

// src > app > finance > settlement > settlement-list.component.ts

import Component from '../../core/component';
import moment = require("moment");

// 这是什么？
import {error} from "util";

```


## CSS/LESS 问题清单

### 
