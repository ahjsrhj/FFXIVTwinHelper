import OverlayAPI from 'ffxiv-overlay-api'

export const WIPE_REG = /^33\|.{33}\|.{8}\|4000001[026].+$/

export const getEntryReg = (name: string) => new RegExp(`^37\\|.{33}\\|.{8}\\|${name}\\|.{8}\\|(\\d+)\\|(\\d*)\\|.+$`)

const ENTRY_1_NAME = '尼德霍格'
const ENTRY_2_NAME = '赫拉斯瓦尔格'

const DRU_ZONE_ID = 968 // 绝龙诗区域ID

interface IBossInfo {
  maxHP: number
  currentHP: number
  percent: number
  name: string
}

export interface IHPInfo {
  maxHP: number
  currentHP: number
}

const getHPInfo = (regex: RegExp, str: string): IHPInfo => {
  const list = regex.exec(str)
  const [, currentHP, maxHP] = list!

  return {
    maxHP: +maxHP,
    currentHP: +currentHP,
  }
}

export const useOverlayData = () => {
  // ref
  const zoneID = ref<number>(0)
  const checkZoneID = ref<number>(DRU_ZONE_ID)
  const showDebugInfo = ref<boolean>(false)
  const HPDiff = ref<number>(3)
  const showBorder = ref<boolean>(false)
  const boss1Info = reactive<IBossInfo>({ currentHP: 0, maxHP: 0, percent: 0, name: '' })
  const boss2Info = reactive<IBossInfo>({ currentHP: 0, maxHP: 0, percent: 0, name: '' })

  // computed
  const enabledCheck = computed(() => zoneID.value === checkZoneID.value)

  const overlay = new OverlayAPI()

  // init route
  const route = useRoute()
  const { name1, name2, zoneID: _zoneID, debug, diff, border } = route.query

  boss1Info.name = name1?.toString() || ENTRY_1_NAME
  boss2Info.name = name2?.toString() || ENTRY_2_NAME
  showDebugInfo.value = debug === '1'
  if (diff && Number.isInteger(Number(diff)))
    HPDiff.value = Number(diff)
  if (_zoneID && Number.isInteger(Number(_zoneID)))
    checkZoneID.value = Number(_zoneID)
  showBorder.value = border === '1'

  const boss1Reg = getEntryReg(boss1Info.name)
  const boss2Reg = getEntryReg(boss2Info.name)

  // 监听区域变更
  overlay.addListener('ChangeZone', (data) => {
    zoneID.value = data.zoneID
  })

  const processHPInfo = (info: IHPInfo, boss: IBossInfo) => {
    if (info.maxHP > 0)
      boss.maxHP = info.maxHP

    if (info.maxHP === 0 && boss.maxHP === 0)
      boss.maxHP = info.currentHP

    boss.currentHP = info.currentHP
    if (boss.maxHP > 0)
      boss.percent = Math.round(boss.currentHP / boss.maxHP * 1000) / 10
  }

  const resetValue = () => {
    boss1Info.maxHP = 0
    boss2Info.maxHP = 0
    boss1Info.currentHP = 0
    boss2Info.currentHP = 0
    boss1Info.percent = 0
    boss2Info.percent = 0
  }

  // 监听原始log
  overlay.addListener('LogLine', (log) => {
    const rawLine = log.rawLine as string
    if (enabledCheck.value) {
      // 区域一致时,开启校验
      if (boss1Reg.test(rawLine)) {
        const info = getHPInfo(boss1Reg, rawLine)
        processHPInfo(info, boss1Info)
      }
      else if (boss2Reg.test(rawLine)) {
        const info = getHPInfo(boss2Reg, rawLine)
        processHPInfo(info, boss2Info)
      }
      else if (boss1Info.maxHP > 0 && WIPE_REG.test(rawLine)) {
        // 团灭
        resetValue()
      }
    }
  })

  // 开始发送事件
  overlay.startEvent()
  const showInfo = ref(false)

  // const boss1HPPercent = computed(() => boss1Info.maxHP > 0 ? Math.round(boss1Info.currentHP / boss1Info.maxHP * 1000) / 10 : 0)
  // const boss2HPPercent = computed(() => boss2Info.maxHP > 0 ? Math.round(boss2Info.currentHP / boss2Info.maxHP * 1000) / 10 : 0)
  const HPDiffValue = computed(() => Math.abs(boss1Info.percent * 10 - boss2Info.percent * 10) / 10)
  const showBGAlert = computed(() => HPDiffValue.value > HPDiff.value)

  watchEffect(() => {
    if (!showInfo.value) {
      // 隐藏状态
      if (boss1Info.percent > 0 && boss2Info.percent > 0)
        showInfo.value = true
    }
    else {
      if (boss1Info.percent === 0 && boss2Info.percent === 0)
        showInfo.value = false
    }
  })

  return {
    boss1Info,
    boss2Info,
    zoneID,
    showDebugInfo,
    HPDiff,
    checkZoneID,
    HPDiffValue,
    showInfo,
    showBGAlert,
    showBorder,
  }
}
