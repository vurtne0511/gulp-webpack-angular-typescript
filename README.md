# API Response 统一处理逻辑

## angular $http 服务默认的返回结果如下

```
response : {
	config: any,
	data: {
		result: any,
		success: boolean,
		count?: number,
		summary?: any (debug only)
	},
	…
}
```

## 封装后

```
import Component from 'app/core/component';

interface BasicListComponentScope extends jxb.GridScope {
    provinces: any[];
}

@Component({
    inject: ['regionApi', ...],
    ...
})
class BasicListComponent {

    constructor(
        private $scope: BasicListComponentScope,
        private regionApi: jxb.api.RegionApiService) {
    }


    $onInit() {
        
        this.loading.show();

        // 开始请求
        this.regionApi.search({ ... })

            // 请求成功
            .then(data => this.$scope.provinces = data.result)

            // 请求失败 
            .catch(error => notify.error('请求错误'))

            // 请求
            .finally(() => this.loading.hide());
    }
}

```

### 成功时

```
data => {
	count?: number,
	result: any,
}
```

### 失败时 

```
error: {                      // 错误信息
    code:            String,  // 错误代码
    message:         String,  // 错误消息
    fields: {                 // 校验错误字段
        字段名: {
                kind:    String,  // 错误类型（required：必要性错误；Number/Date/Boolean：
                                  // 数据类型错误；regexp：字符串格式错误；enum：取值不合法）
                message: String   // 错误消息 
        } 
    }
}

```
