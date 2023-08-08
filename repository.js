import { Schema, Repository } from 'redis-om'
import { redis } from './initRedis.js'

const schema = new Schema('person', {
    username: { type: 'string' },
    message: { type: 'string' }
})

export const personRepository = new Repository(schema, redis)

await personRepository.createIndex()