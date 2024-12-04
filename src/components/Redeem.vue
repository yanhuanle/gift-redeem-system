<script setup lang="ts">
import { showToast } from 'vant'

const handleFocus = () => {
  let length = values.value.length
  if (length < 4) {
    field1.value.focus()
  }
  else if (length >= 4 && length < 8) {
    field2.value.focus()
  }
  else if (length >= 8 && length < 12) {
    field3.value.focus()
  }
  else if (length >= 12 && length < 16) {
    field4.value.focus()
  }
  else {
    field1.value.blur()
    field2.value.blur()
    field3.value.blur()
    field4.value.blur()
  }
}

const field1 = ref(null)
const value1 = ref('')
watch(value1, val => {
  if (val.length >= 4) {
    // console.log('1:', val);
    value1.value = val.slice(0, 4)
    field2.value.focus()
  }
})

const field2 = ref(null)
const value2 = ref('')
watch(value2, val => {
  // console.log('2:', val);
  if (val.length >= 4) {
    value2.value = val.slice(0, 4)
    field3.value.focus()
  }
})

const field3 = ref(null)
const value3 = ref('')
watch(value3, val => {
  // console.log('3:', val);
  if (val.length >= 4) {
    value3.value = val.slice(0, 4)
    field4.value.focus()
  }
})

const field4 = ref(null)
const value4 = ref('')
watch(value4, val => {
  // console.log('4:', val);
  if (val.length >= 4) {
    value4.value = val.slice(0, 4)
    field4.value.blur()
    showToast('验证中...')
    setTimeout(() => {
      showToast('兑换成功')
    }, 1000)
  }
})

const values = computed(() => {
  return value1.value + value2.value + value3.value + value4.value
})

const handlePaste = () => {
  var inputElement = document.body
  // 添加粘贴事件监听器
  inputElement.addEventListener('paste', function (event) {
    // 可以通过event.clipboardData获取剪贴板数据
    var clipboardData = event.clipboardData || window.clipboardData
    var pastedText = clipboardData.getData('Text');
    [value1.value, value2.value, value3.value, value4.value] = [
      pastedText.slice(0, 4),
      pastedText.slice(4, 8),
      pastedText.slice(8, 12),
      pastedText.slice(12)
    ]
  })
}

onMounted(() => {
  field1.value.focus()
  handlePaste()
})
</script>

<template>
  <div class="redeem">
    <van-field model-value="请输入兑换码（4组，每组4位）" readonly />
    <div class="cell-group" @click="handleFocus">
      <div class="field-wrapper relative">
        <van-field ref="field1" v-model="value1" @paste="(e) => e.returnValue = false" />
        <div class="field-seperator">
          <span class="seperator"></span>
          <span class="seperator"></span>
          <span class="seperator"></span>
        </div>
      </div>
      <div class="field-wrapper relative">
        <van-field ref="field2" v-model="value2" @paste="(e) => e.returnValue = false" />
        <div class="field-seperator">
          <span class="seperator"></span>
          <span class="seperator"></span>
          <span class="seperator"></span>
        </div>
      </div>
      <div class="field-wrapper relative">
        <van-field ref="field3" v-model="value3" @paste="(e) => e.returnValue = false" />
        <div class="field-seperator">
          <span class="seperator"></span>
          <span class="seperator"></span>
          <span class="seperator"></span>
        </div>
      </div>
      <div class="field-wrapper relative">
        <van-field ref="field4" maxlength="4" v-model="value4" @paste="(e) => e.returnValue = false" />
        <div class="field-seperator">
          <span class="seperator"></span>
          <span class="seperator"></span>
          <span class="seperator"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.cell-group {
  .van-cell {
    border: 1px solid #e5e5e5;
    border-radius: 10px;
    margin-bottom: 10px;
    padding-left: 0;
    padding-right: 0;
    :deep(input) {
      // padding: 0 40px;
      padding-left: 40px;;
      letter-spacing: 40px;
    }
  }

  .field-seperator {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    .seperator {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 10px;
      background-color: #e5e5e5;
      top: 50%;
      transform: translateY(-2.5px);

      &:first-child {
        left: 29%;
      }

      &:nth-child(2) {
        left: 50%;
      }

      &:nth-child(3) {
        left: 71%;
      }
    }
  }
}
</style>
