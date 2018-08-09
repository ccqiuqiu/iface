/**
 * Created by 熊超超 on 2018/5/24.
 */

export default (routes: any, prefix: string) => {
  require('./public').default(routes, prefix)
  require('./baseData').default(routes, prefix)
  require('./system').default(routes, prefix)
  require('./base').default(routes, prefix)
  require('./wx').default(routes, prefix)

}
