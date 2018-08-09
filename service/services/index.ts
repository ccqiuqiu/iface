import * as Router from 'koa-router'

import registerV1 from './v1'

const routes = new Router()

registerV1(routes, '/v1')

export default routes
