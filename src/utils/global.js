/* 后期优化提炼这部分 */
export function sortCompanyTree(array) {
  if (!array.length) {
    return []
  }
  return _.map(array, (item) => {
    item.label = item.shortName
    if (item.child && item.child.length) {
      item.children = sortCompanyTree(item.child)
    }
    return item
  })
}

const global = {}
export default global
