import Knex from 'knex'
import config from '../../knexfile'

const environment = process.env.ENVIRONMENT || 'development'

export default Knex(config[environment])
