import { defineStore } from 'pinia'

export interface UserInfo {
  name: string,
  account: string,
  department: string,
  avatar: string,
  orgList: {
    companyId: number,
    companyName: string,
    departmentId: number,
    departmentName: string,
    jobId: number,
    jobName: string,
    userType: number, // 1-普通员工, 2-高管, 3-HRBP

  }
}

const useUserStore = defineStore('user', () => {
  const currentUser = ref<UserInfo>()

  const getCurrentUser = async () => {
    const res: Response = await getUserInfo()
    currentUser.value = res?.data || {}
  }

  return {
    currentUser,
    getCurrentUser,
  }
}, {
  persist: true,
})

export default useUserStore
