<script setup lang="ts">
import { useOverlayData } from '../use/ngld'

const { boss1Info, boss2Info, zoneID, showDebugInfo, HPDiff, checkZoneID } = useOverlayData()
const boss1HP = computed(() => boss1Info.value.maxHP > 0 ? Math.round(boss1Info.value.currentHP / boss1Info.value.maxHP * 1000) / 10 : 0)
const boss2HP = computed(() => boss2Info.value.maxHP > 0 ? Math.round(boss2Info.value.currentHP / boss2Info.value.maxHP * 1000) / 10 : 0)
const hpDiffValue = computed(() => Math.abs(boss1HP.value * 10 - boss2HP.value * 10) / 10)
</script>

<template lang="pug">
.container-border.vertical.top.left.p-20.br-18(:class="{ 'cbg-alert': hpDiffValue > HPDiff }")
  .hp-line(v-if="boss1HP > 0")
    .hp-name {{ boss1Info.name }}
    .hp-percent {{ boss1HP }}%
  .hp-line(v-if="boss2HP > 0")
    .hp-name {{ boss2Info.name }}
    .hp-percent {{ boss2HP }}%
  .hp-line(v-if="hpDiffValue > 0")
    .hp-name 血量差
    .hp-percent.hp-disparity {{ hpDiffValue }}%
  template(v-if="showDebugInfo")
    .hp-line
      .hp-name 当前ID
      .fs-16.fc-red {{ zoneID }}
    .hp-line
      .hp-name 工作ID
      .fs-16.fc-red {{ checkZoneID }}
</template>

<style>
.container-border {
  box-sizing: border-box;
  border: 2px solid #e9ff2394;
}

.cbg-alert {
  background-color: #e03c8a43;
}

.hp-line {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
}

.hp-name {
  width: 150px;
  text-align: left;
  color: white;
  font-size: 18px;
  font-weight: bolder;
  text-shadow: 0.2rem 0rem 0.5rem #58b2dc, -0.2rem 0rem 0.5rem #58b2dc,
    0rem 0.2rem 0.5rem #58b2dc, 0rem -0.2rem 0.5rem #58b2dc;
}

.hp-percent {
  color: white;
  font-size: 20px;
  font-weight: bolder;
  text-shadow: 0.2rem 0rem 0.5rem red, -0.2rem 0rem 0.5rem red,
    0rem 0.2rem 0.5rem red, 0rem -0.2rem 0.5rem red;
}

.hp-disparity {
  font-size: 30px;
}

.hp-name-light {
  color: red;
}
</style>
