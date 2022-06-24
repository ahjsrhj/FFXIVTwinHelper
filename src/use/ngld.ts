import OverlayAPI from 'ffxiv-overlay-api'

export const WIPE_REG = /^33\|.{33}\|.{8}\|4000001[026].+$/

export const getEntryReg = (name: string) => new RegExp(`^37\\|.{33}\\|.{8}\\|${name}\\|.{8}\\|(\\d+)\\|(\\d*)\\|.+$`)

const ENTRY_1_NAME = '尼德霍格'
const ENTRY_2_NAME = '赫拉斯瓦尔格'

const DRU_ZONE_ID = 758

interface IBossInfo {
  maxHP: number
  currentHP: number
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
  const zoneID = ref<number>(0)
  const checkZoneID = ref<number>(DRU_ZONE_ID)
  const showDebugInfo = ref<boolean>(false)
  const HPDiff = ref<number>(3)

  const boss1Info = ref<IBossInfo>({ currentHP: 0, maxHP: 0, name: '' })
  const boss2Info = ref<IBossInfo>({ currentHP: 0, maxHP: 0, name: '' })

  const enabledCheck = computed(() => zoneID.value === checkZoneID.value)

  const overlay = new OverlayAPI()

  const route = useRoute()
  const { name1, name2, zoneID: _zoneID, debug, diff } = route.query
  boss1Info.value.name = name1?.toString() || ENTRY_1_NAME
  boss2Info.value.name = name2?.toString() || ENTRY_2_NAME
  showDebugInfo.value = debug === '1'
  if (Number.isInteger(diff))
    HPDiff.value = Number(diff)

  const boss1Reg = getEntryReg(boss1Info.value.name)
  const boss2Reg = getEntryReg(boss2Info.value.name)

  if (Number.isInteger(_zoneID))
    checkZoneID.value = Number(_zoneID)

  const dispatchLogLine = (rowLine: string) => {
    if (enabledCheck.value) {
      if (boss1Reg.test(rowLine)) {
        const info = getHPInfo(boss1Reg, rowLine)
        if (info.maxHP > 0)
          boss1Info.value.maxHP = info.maxHP

        if (info.maxHP === 0 && boss1Info.value.maxHP === 0)
          boss1Info.value.maxHP = info.currentHP

        boss1Info.value.currentHP = info.currentHP
      }
      else if (boss2Reg.test(rowLine)) {
        const info = getHPInfo(boss2Reg, rowLine)
        if (info.maxHP > 0)
          boss2Info.value.maxHP = info.maxHP

        if (info.maxHP === 0 && boss2Info.value.maxHP === 0)
          boss2Info.value.maxHP = info.currentHP

        boss2Info.value.currentHP = info.currentHP
      }
      else if (boss1Info.value.maxHP > 0 && WIPE_REG.test(rowLine)) {
        // 团灭
        boss1Info.value.maxHP = 0
        boss2Info.value.maxHP = 0
        boss1Info.value.currentHP = 0
        boss2Info.value.currentHP = 0
      }
    }
  }

  overlay.addListener('ChangeZone', (data) => {
    zoneID.value = data.zoneID
  })

  overlay.addListener('LogLine', (log) => {
    const rawLine = log.rawLine as string
    dispatchLogLine(rawLine)
  })
  overlay.startEvent()

  return {
    boss1Info,
    boss2Info,
    zoneID,
    showDebugInfo,
    HPDiff,
  }
}
