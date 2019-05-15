# j_validator
---

### 验证

* `message`: 错误信息.
* `required`: 是否必填项.
* `max`: 该项最大长度.
* `min`: 该项最小长度.
* `type`: 数据类型检测( Object.prototype.toString.call() ).
* `reg`: 使用正则验证.
* `enum`: 枚举可选类型.
* `same`: 该项等于(===)验证规则.
* `validator`: 复杂逻辑使用自定义方法验证(callback()).
### err 错误信息数组(以data数据序列为准) length 大于0时 校验为不通过 err具体信息看以下实例 length 等于0时 校验通过

### 用法

```javascript
// 规则
let rule = {
    name: { required: true, type: 'String', max: 10, min: 2, message: '姓名填写有误' },
    phone: { required: true, reg: /1[0-9]{10}/g ,message: '电话填写有误' }
    sex: { enum: ['男', '女'], message: '性别填写错误' },
    like: [
        { required: true, type: 'Array', message: '该项填写错误' },
        { validator: function(rule, value, callback) {
            if( value.length < 3 ) {
                callback()
            }
            else{
                callback( new Error('喜欢的项目过少') )
            }
        } }
    ]
}
let data = {
    name: 'Chao jiang',
    phone: '18482155012',
    sex: '男',
    like: ['唱', '跳', 'Rap', '篮球']
}
import j_validator from 'j_j_validator'
let validator = new j_validator(rule)
validator.valid(data)
    .then(err=> {
        // err 错误信息(err: Array)
        // ps: 第一项错误 err => [{ err_key: 'name', err_messge: '姓名填写有误' }]
        // ps: 第一项与第二项错误 err =>  
        //                        [
        //                          {err_key: 'name', err_messge: '姓名填写有误' },
        //                          { err_key: 'phone', err_messge: '电话填写有误' }
        //                        ]
    })
```
