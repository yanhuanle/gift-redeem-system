<script setup lang="ts">
import { showToast } from 'vant'

interface VerifyCodeRequest {
  code: string; // 完整兑换码
}

interface VerifyCodeResponse {
  success: boolean;
  giftInfo?: {
    id: string;
    name: string;
    description: string;
    expireTime: string;
    items: Array<{
      id: string;
      name: string;
      icon: string;
      amount: number;
    }>;
  };
  error?: {
    code: number;
    message: string;
  };
}

const isPasting = ref(false)

const cellGroup = ref(null)

const field1 = ref(null)
const value1 = ref('')
watch(value1, val => {
  if (val.length >= 4) {
    value1.value = val.slice(0, 4)
    if (!isPasting.value) {
      field2.value.focus()
    }
  }
})

const field2 = ref(null)
const value2 = ref('')
watch(value2, val => {
  if (val.length >= 4) {
    value2.value = val.slice(0, 4)
    if (!isPasting.value) {
      field3.value.focus()
    }
  }
})

const field3 = ref(null)
const value3 = ref('')
watch(value3, val => {
  if (val.length >= 4) {
    value3.value = val.slice(0, 4)
    if (!isPasting.value) {
      field4.value.focus()
    }
  }
})

const field4 = ref(null)
const value4 = ref('')
watch(value4, val => {
  if (val.length >= 4) {
    value4.value = val.slice(0, 4)
    field4.value.blur()
    redeem()
  }
})

const values = computed((): VerifyCodeRequest => {
  return {
    code: value1.value + value2.value + value3.value + value4.value
  }
})

// 当前兑换码输入到第几组
const stage = computed(() => {
  let length = values.value.code.length
  if (length < 4) {
    return 1
  }
  else if (length >= 4 && length < 8) {
    return 2
  }
  else if (length >= 8 && length < 12) {
    return 3
  }
  else if (length >= 12 && length < 16) {
    return 4
  }
  else {
    return 5
  }
})

const handleFocus = () => {
  switch (stage.value) {
    case 1:
      field1.value.focus()
      break
    case 2:
      field2.value.focus()
      break
    case 3:
      field3.value.focus()
      break
    case 4:
      field4.value.focus()
      break
    default:
      field1.value.blur()
      field2.value.blur()
      field3.value.blur()
      field4.value.blur()
  }
}

const handleDelete = () => {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Backspace') {
      // 在这里执行需要的操作
      if (values.value.code.length <= 4) {
        const input = cellGroup.value.querySelector('input')
        input.setSelectionRange(input.value.length, input.value.length);

        field1.value.focus()
      }
      else if (values.value.code.length <= 8) {
        field2.value.focus()
      }
      else if (values.value.code.length <= 12) {
        field3.value.focus()
      }
    }
  })
}

const handlePaste = () => {
  var inputElement = document.body
  // 添加粘贴事件监听器
  inputElement.addEventListener('paste', function (event) {
    isPasting.value = true
    // 可以通过event.clipboardData获取剪贴板数据
    var clipboardData = event.clipboardData || window.clipboardData
    var pastedText = clipboardData.getData('Text');
    [value1.value, value2.value, value3.value, value4.value] = [
      pastedText.slice(0, 4),
      pastedText.slice(4, 8),
      pastedText.slice(8, 12),
      pastedText.slice(12)
    ]

    switch (stage.value) {
      case 1:
        field1.value.blur()
        setTimeout(() => {
          field1.value.focus()
        }, 1)
        break
      case 2:
        field2.value.blur()
        setTimeout(() => {
          field2.value.focus()
        }, 100)
        break
      case 3:
        field3.value.blur()
        setTimeout(() => {
          field3.value.focus()
        }, 1)
        break
      default:
        field4.value.blur()
        setTimeout(() => {
          field4.value.focus()
        }, 1)
    }

    setTimeout(() => {
      isPasting.value = false
    }, 200)
  })
}

const redeem = async () => {
  showToast('验证中...')

  // TODO: 发送兑换请求

  // let values: VerifyCodeRequest = {
  //   code: value1.value + value2.value + value3.value + value4.value
  // }

  // const res: VerifyCodeResponse = await request.post(`/code-redeem`, { values })
  // if (res.success) {
  //   showToast('兑换成功')
  // }
  // else {
  //   showToast('兑换失败')
  // }

  setTimeout(() => {
    showToast('兑换成功')
  }, 1000)
}

onMounted(() => {
  field1.value.focus()
  handlePaste()
  handleDelete()
})
</script>

<template>
  <div class="redeem">
    <van-field model-value="请输入兑换码（4组，每组4位）" readonly />
    <div ref="cellGroup" class="cell-group" @click="handleFocus">
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
      padding-left: 40px;
      ;
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
