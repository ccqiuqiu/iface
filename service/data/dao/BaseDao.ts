import {getManager, getRepository} from 'typeorm'

/**
 * Created by 熊超超 on 2018/6/20.
 */

export class BaseDao<Model> {
  protected entityClass

  constructor(entityClass) {
    this.entityClass = entityClass
  }

  findOne(query): Promise<Model> {
    const entityManager = getManager()
    return entityManager.findOne(this.entityClass , query)
  }
  find(options: any = {}) {
    const entityManager = getManager()
    options.order = {addTime: 'ASC'}
    return entityManager.find(this.entityClass, options)
  }
  save(model: Model) {
    const entityManager = getManager()
    return entityManager.save(this.entityClass, model)
  }
  delete(id) {
    const entityManager = getManager()
    return entityManager.delete(this.entityClass, id)
  }
  async findPaged({pageNum = 1, pageSize = 10, ...where}, options = {}) {
    const repository = getRepository(this.entityClass)
    const total = await repository.count({where})
    const rows = await repository.find({
      order: {addTime: 'ASC'},
      where,
      skip: pageSize * (pageNum - 1),
      take: pageSize,
      ...options,
    })
    return {total, rows}
  }

  getManager() {
    return getManager()
  }
  getRepository() {
    return getRepository<Model>(this.entityClass)
  }
}
