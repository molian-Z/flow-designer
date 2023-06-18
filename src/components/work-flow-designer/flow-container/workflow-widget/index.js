const nodeModules = import.meta.globEager('./node/*.vue')
const edgeModules = import.meta.globEager('./edge/*.vue')
const modules = {...nodeModules,...edgeModules}
const comps = {}
for (const path in modules) {
  let cname = modules[path].default.name
  comps[cname] = modules[path].default
}

export default comps