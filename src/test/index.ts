import OverlayAPI from 'ffxiv-overlay-api'

const boss1Line
  = '37|2020-09-05T21:05:51.3440000+08:00|4000BE27|尼德霍格|00002D6F|12889000|12889320|10000|10000|0||100|100|2.384186E-07|-4.792213E-05|01|0|0|0||5d49346282276ae155b3c5510f829982'
const boss2Line
  = '37|2020-09-05T21:05:51.3440000+08:00|4000BE27|赫拉斯瓦尔格|00002D6F|12889000|12889320|10000|10000|0||100|100|2.384186E-07|-4.792213E-05|01|0|0|0||5d49346282276ae155b3c5510f829982'

const START_HP = 12889000

const startMock = () => {
  const overlay = new OverlayAPI()
  overlay.simulateData({
    type: 'ChangeZone',
    zoneID: 968,
  })

  const processLogLine = (line: string, value: number) => {
    const rawLine = line.replace(`${START_HP}`, `${value}`)
    overlay.simulateData({
      type: 'LogLine',
      rawLine,
    })
  }

  let boss1HP = START_HP
  let boss2HP = START_HP

  const { pause } = useIntervalFn(() => {
    boss1HP -= Math.round(200000 - 150000 * Math.random())
    boss2HP -= Math.round(200000 - 150000 * Math.random())
    processLogLine(boss1Line, boss1HP > 0 ? boss1HP : 0)
    processLogLine(boss2Line, boss2HP > 0 ? boss2HP : 0)
    if (boss1HP <= 0 && boss2HP <= 0)
      pause()
  }, 1000)
}

setTimeout(startMock, 2000)
