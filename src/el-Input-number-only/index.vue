<template>
    <div class="el-input">
        <input
            class="el-input__inner" ref='input'
            :value="value"
            :placeholder="placeholder"
            type="text"
            @blur="handleBlur"
            @input="handleInput">
    </div>
</template>
<script>
import emitter from 'element-ui/src/mixins/emitter';
// 已知bug: 微软输入法中文每打一个字母都会触发input事件而且还会视情况自动加单引号
// 已知bug: copy导致光标位置计算错误
// pattern: /[^0-9]/g => 只允许输入0-9
// pattern: /[^a-zA-Z]/g => 只允许输入字母
export default {
  name: 'ElInputNumberOnly',
  props: {
    value: '',
    pattern: {
      type: RegExp,
      default() {
        return /[^0-9]/g;
      },
    },
    placeholder: '',
    validateEvent: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      preValue: this.value || '',
    };
  },
  mixins: [emitter],
  methods: {
    handleInput() {
      if (this.pattern) {
        this.modifyByPattern();
      }
      this.$emit('input', this.$refs.input.value);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.change', [this.currentValue]);
      }
    },
    handleBlur(event) {
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.currentValue]);
      }
    },
    // 找到两个字符串开始不一样的第一个字符的位置，从0开始, 若完全一样则返回-1
    // 预期str2比str1长
    findPos(str1, str2) {
      const length = Math.min(str1.length, str2.length);
      if (length === 0) {
        return 0;
      }
      for (let idx = 0; idx < length; idx += 1) {
        if (str1[idx] !== str2[idx]) {
          return idx;
        }
      }
      return -1;
    },
    // 找到str2相比str1来说多出的部分
    // str1: 原来的字符串
    // str2: 后来的字符串
    // 改动主要针对剪贴板
    // 返回一个{pre:'',new:''}
    findNew(str1, str2) {
      if (str1.length === 0 || str2.length === 0) {
        return {
          pre: str1,
          new: str2,
        };
      }
      let left = 0;
      let right = 0;
      const length = Math.min(str1.length, str2.length);
      for (left = 0; left < length; left += 1) {
        if (str1[left] !== str2[left]) {
          break;
        }
      }
      for (right = 0; right < length; right += 1) {
        if (str1[str1.length - 1 - right] !== str2[str1.length - 1 - right]) {
          break;
        }
      }
      return [left, right];
    },
    // 设置光标位置
    setCursorPosition(object, start, end) {
      if (object.setSelectionRange) {
        object.focus();
        object.setSelectionRange(start, end);
      } else if (object.createTextRange) {
        const range = object.createTextRange();
        range.collapse(true);
        range.moveEnd('character', end);
        range.moveStart('character', start);
        range.select();
      }
    },
    modifyByPattern() {
      const { input } = this.$refs;
      const rightValue = input.value.replace(this.pattern, '');
      if (input.value !== rightValue) {
        const pos = this.findPos(input.value, rightValue);
        input.value = rightValue;
        this.setCursorPosition(input, pos, pos);
      }
      this.preValue = rightValue;
    },
  },
};
</script>
