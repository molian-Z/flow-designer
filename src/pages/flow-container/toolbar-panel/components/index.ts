const modules:any = import.meta.globEager('./*.vue')
const comps = <any>[]
for (const path in modules) {
  let cname = <String>modules[path].default.name
  comps.push(modules[path].default)
}
export default comps.sort((a:any,b:any)=>{
  return a.index - b.index
})