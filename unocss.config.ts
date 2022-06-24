import chalk from 'chalk'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  // presetUno,
  // presetWebFonts,
  // transformerDirectives,
  // transformerVariantGroup,
} from 'unocss'
import extractorPug from '@unocss/extractor-pug'
import { extractorSplit } from '@unocss/core'
function warn(msg: string) {
  console.warn(chalk.bgRed.black('[ACCESS][ERROR]'), msg)
}

const n2px = (size: number | string) => `${size}px`

const HEX_REGEX = /^(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8}|[0-9a-fA-F]{3}|[0-9a-fA-F]{4})$/

const transformColor = (color: string) => {
  if (HEX_REGEX.test(color))
    return `#${color}`

  const base = ['white', 'red', 'blue', 'yellow', 'black']
  if (base.includes(color))
    return color

  warn(`当前颜色不被支持: ${color}`)
  return color
}

export default defineConfig({
  shortcuts: [
    // ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    // ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
  ],
  presets: [
    // presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    // presetWebFonts({
    //   fonts: {
    //     sans: 'DM Sans',
    //     serif: 'DM Serif Display',
    //     mono: 'DM Mono',
    //   },
    // }),
  ],
  rules: [
    [/^w-(\d+)$/, ([, d]) => ({ width: n2px(d) })],
    [/^h-(\d+)$/, ([, d]) => ({ height: n2px(d) })],
    [/^m-(\d+)$/, ([, d]) => ({ margin: n2px(d) })],
    [/^p-(\d+)$/, ([, d]) => ({ padding: n2px(d) })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': n2px(d) })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': n2px(d) })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': n2px(d) })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': n2px(d) })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': n2px(d) })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': n2px(d) })],
    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': n2px(d) })],
    [/^fc-(\w+)$/, ([, c]) => ({ color: transformColor(c) })],
    [/^ta-(\w+)$/, ([, c]) => ({ 'text-align': c })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': n2px(d) })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${d}` })],
    [/^bg-(\w+)$/, ([, c]) => ({ background: transformColor(c) })],
    [/^zi-(\d+)$/, ([, d]) => ({ 'z-index': `${d}` })],
    [/^br-(\d+)$/, ([, d]) => ({ 'border-radius': n2px(d) })],
  ],
  extractors: [extractorPug(), extractorSplit],
  // transformers: [
  //   transformerDirectives(),
  //   transformerVariantGroup(),
  // ],
})
