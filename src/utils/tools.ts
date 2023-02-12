/**
 * 睡眠函数
 * @param time
 */
export async function sleep(time: number): Promise<void> {
  await new Promise(resolve => {
    setTimeout(() => resolve, time)
  })
}

/**
 * 金额格式化
 * @param num 金额
 * @param symbol 金额前面修饰符号，如$,￥
 */
export function format(num: number | string, symbol = '￥'): string {
  if (Number.isNaN(Number(num))) return `${symbol}0.00`
  return (
    symbol +
    Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  )
}

/**
 * 取消金额格式化
 * @param str 金额
 */
export function unformat(str: string): number | string {
  const s = str.substr(1).replace(/,/g, '')
  return Number.isNaN(Number(s)) || Number(s) === 0 ? '' : Number(s)
}

/**
 * 表格合计行
 * @param str 金额
 */
export function tableSummaries(param: {
  columns: any
  data: any
}): Array<string | number> {
  const { columns, data } = param
  const sums: Array<string | number> = []
  columns.forEach((column: { property: string | number }, index: number) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const values = data.map((item: { [x: string]: any }) =>
      Number(item[column.property]),
    )
    if (!values.every((value: number) => isNaN(value))) {
      sums[index] = values.reduce((prev: number, curr: number) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      const sum = sums[index]
      if (typeof sum === 'number') {
        sums[index] = format(sum.toFixed(2))
      }
    } else {
      sums[index] = 'N/A'
    }
  })

  return sums
}

export function isInput(el: HTMLElement): boolean {
  return el.nodeName.toLocaleLowerCase() === 'input'
}

export function isTextarea(el: HTMLElement): boolean {
  return el.nodeName.toLocaleLowerCase() === 'textarea'
}
/**
 * 判断localStorage有效期是否失效
 * @param name localStorage设置名称
 */
export async function useLocal(name: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const local = getLocal<any>(name)
    if (local.startTime + local.expires < Date.now())
      reject(`${name}已超过有效期`)
    resolve(local)
  })
}

/**
 * 获取localStorage对象并转成对应的类型
 * @param name localStorage设置名称
 */
export function getLocal<T>(name: string): T {
  const l = localStorage.getItem(name)
  const local = JSON.parse(l !== null ? l : '{}') as unknown as T
  return local
}

/**
 * 函数节流
 * @param time 间隔时间
 */
export function throttle(time = 500): () => Promise<void> {
  let timer: NodeJS.Timeout | null = null
  let firstTime = true
  return () => {
    return new Promise(resolve => {
      if (firstTime) {
        resolve()
        return (firstTime = false)
      }
      if (timer) return false
      timer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        timer = null
        resolve()
      }, time)
    })
  }
}

/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */
export function listToTree(
  data: Array<any>,
  pid: string | number = 1,
  isChildNull = false,
): Array<any> {
  const d: Array<any> = []
  data.forEach(val => {
    if (val.parentId == pid) {
      const list = listToTree(data, val.id, isChildNull)
      const obj: any = { ...val }
      if (!isChildNull || list.length !== 0) {
        obj.children = list
      }
      d.push(obj)
    }
  })
  return d
}

/**
 * 字符串首字母大写
 * @param str
 * @returns
 */
export function firstUpperCase(str: string): string {
  return str.replace(/^\S/, s => s.toUpperCase())
}

/**
 * 两次编码url
 * @param url
 * @returns
 */
export function decode(url: string): string {
  return decodeURIComponent(decodeURIComponent(url))
}

/**
 * 两次解码url
 * @param url
 * @returns
 */
export function encode(url: string): string {
  return encodeURIComponent(encodeURIComponent(url))
}
