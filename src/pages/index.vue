<script setup lang="ts">
import { useOverlayData } from '../use/ngld'

const {
  boss1Info,
  boss2Info,
  zoneID,
  showDebugInfo,
  checkZoneID,
  showInfo,
  showBGAlert,
  HPDiffValue,
  showBorder,
  version,
} = useOverlayData()
</script>

<template lang="pug">
.vertical.top.left.p-20.br-18(:class="{ 'cbg-alert': showBGAlert, 'container-border': showBorder }")
  template(v-if="showInfo")
    .hp-line
      .hp-name(:class="{ 'hp-name-light': boss1Info.percent > boss2Info.percent }")
        | {{ boss1Info.name }}
      .hp-percent {{ boss1Info.percent }}%
    .hp-line
      .hp-name(:class="{ 'hp-name-light': boss1Info.percent < boss2Info.percent }")
        | {{ boss2Info.name }}
      .hp-percent {{ boss2Info.percent }}%
    .hp-line
      .hp-name 血量差
      .hp-percent.hp-disparity {{ HPDiffValue }}%
  template(v-if="showDebugInfo")
    .hp-line
      .hp-name 当前ID
      .fs-16.fc-red {{ zoneID }}
    .hp-line
      .hp-name 工作ID
      .fs-16.fc-red {{ checkZoneID }}
    .hp-line
      .hp-name 版本号
      .fs-16.fc-red {{ version }}
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
