# FFXIVTwinHelper FF14双目标血量监控

[![](https://img.shields.io/github/license/ahjsrhj/FFXIVTwinHelper)](https://github.com/ahjsrhj/FFXIVTwinHelper/blob/main/LICENSE)
[![](https://img.shields.io/github/workflow/status/ahjsrhj/FFXIVTwinHelper/build)](https://github.com/ahjsrhj/FFXIVTwinHelper/actions)

针对Raid本中双目标血量差进行监控, 默认配置为监控绝龙诗P6血量差, 你也可以通过调整参数用于绝亚/绝巴哈或者其它任意需要监控双目标血量差的场景.

此工具依赖于 [ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin)

## 食用指南
- 国服: 
  - 绝龙诗: 直接配置 `https://twin.ffxiv.imrhj.cn` 至NGLD悬浮窗插件内即可
  - 绝亚: 配置链接: `https://twin.ffxiv.imrhj.cn/?name1=有生命活水&name2=活水之手zoneID=887&diff=5` (待验证zoneID是否为887)
- 国际服:
  - 绝龙诗有汉化: 直接配置 `https://twin.ffxiv.imrhj.cn` 至NGLD悬浮窗插件内即可
  - 绝龙诗 日语: 配置链接 `https://twin.ffxiv.imrhj.cn/?name1=フレースヴェルグ&name2=ニーズヘッグ` (待验证)
  - 绝龙诗 英语: 配置链接 `https://twin.ffxiv.imrhj.cn/?name1=Hraesvelgr&name2=Nidhogg` (待验证)

  其余副本请参考下方配置项自行配置

## 配置项

通过在url query上配置参数来调整配置项

例如：`https://twin.ffxiv.imrhj.cn/?debug=1`

全部可用选项如下

| 参数名 |说明| 默认值       | 可选值 | 数据类型 |
| :----: |:---:| :----------: | :--: | :----: |
| name1  |对比对象1名称，默认为绝龙诗P6邪龙名称（有汉化补丁）| 尼德霍格     |  | string |
| name2  |对比对象2名称，默认为绝龙诗P6圣龙名称（有汉化补丁）| 赫拉斯瓦尔格 |  | string |
| zoneID |工作区域ID，默认为绝龙诗场地ID| 968          |      | number |
| debug  |是否开启调试信息，开启后可以查看当前角色所在场地ID| 0            | 0 \| 1 | number |
| diff   |血量差大于多少时进行警告，默认3（%）| 3            |      | number |
| border |是否显示边框，辅助定位| 0            | 0 \| 1 | number |



## 其它

Q: 如何获取当前区域ID?

A: url后面加上参数 `debug=1` 开启调试模式, 默认显示当前区域ID和当前监控区域ID

----

## 感谢

- [antfu/vitesse-lite](https://github.com/antfu/vitesse-lite) - MIT License
- [ngld/OverlayPlugin](https://github.com/ngld/OverlayPlugin) - MIT License
- [dsrkafuu/ffxiv-overlay-api](https://github.com/dsrkafuu/ffxiv-overlay-api) - MIT License