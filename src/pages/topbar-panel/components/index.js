const modules = import.meta.globEager('./*.vue')
const comps = []
for (const path in modules) {
  let cname = modules[path].default.name
  comps.push(modules[path].default)
}
export default comps.sort((a,b)=>{
  return a.index - b.index
})