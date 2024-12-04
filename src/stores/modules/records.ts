import { defineStore } from 'pinia'

export interface RecordStore {
  clearRecords: () => void
}

const useRecordsStore = defineStore('records', () => {
  const records = ref([
    {
      index: 1,
      title: '礼品1',
      desc: '已领取',
      expiredAt: '有效期：xxxx-xx-xx',
      status: 1,
    },
    {
      index: 2,
      title: '礼品2',
      desc: '已领取',
      expiredAt: '有效期：xxxx-xx-xx',
      status: 1,
    },
    {
      index: 3,
      title: '礼品3',
      desc: '已领取',
      expiredAt: '有效期：xxxx-xx-xx',
      status: 1,
    },
    {
      index: 4,
      title: '礼品4',
      desc: '已领取',
      expiredAt: '有效期：xxxx-xx-xx',
      status: 1,
    },
    {
      index: 5,
      title: '礼品5',
      desc: '已领取',
      expiredAt: '有效期：xxxx-xx-xx',
      status: 1,
    },
  ])

  const clearRecords = () => {
    records.value = []
  }

  return {
    records,
    clearRecords,
  }
}, {
  persist: false,
})

export default useRecordsStore
