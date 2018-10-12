#### el-input-number-only
- 只允许输入数字, 而不是等输入其他字符之后再提示错误  
- `type=number`允许输入`+-.e`  
- only allow input number, instead of showing error message after value changed  
- `type=number`will allow characters `+-.e`    
#### install  
`npm i el-input-number-only -S`  
#### usage  
```
<el-input-number-only v-model="form.v1" placeholder="0-9 only" />
<el-input-number-only v-model="form.v2" :pattern="/[^1-9]/g" placeholder="1-9 only" />
```
#### note 
- 可以定义允许输入的内容不过有种情况下会出bug并且还不知道咋修  
- 情景: 只允许输入字母的时候,使用微软的拼音输入法