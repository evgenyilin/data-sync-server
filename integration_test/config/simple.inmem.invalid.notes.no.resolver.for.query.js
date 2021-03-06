'use strict'

const time = new Date()

const datasources = [
  {
    id: 1,
    name: 'nedb_notes',
    type: 'InMemory',
    config: '{"options":{"timestampData":true}}',
    createdAt: time,
    updatedAt: time
  }
]

const notesSchema = {
  id: 1,
  name: 'default',
  // language=GraphQL
  schema: `
  
  schema {
    query: Query
  }

  type Query {
    listNotes: [Note]
    foo: Boolean            # no resolver for this
  }

  type Note {
      id: String
      title: String
  }
    
  `,
  createdAt: time,
  updatedAt: time
}

const resolvers = [
  {
    type: 'Query',
    field: 'listNotes',
    DataSourceId: 1,
    GraphQLSchemaId: 1,
    requestMapping: '{"operation": "find","query": {}}',
    responseMapping: '{{toJSON context.result}}',
    createdAt: time,
    updatedAt: time
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DataSources', datasources, {})
    await queryInterface.bulkInsert('GraphQLSchemas', [notesSchema], {})
    return queryInterface.bulkInsert('Resolvers', resolvers, {})
  }
}

// IMPORTANT: please describe the config here. things would be complicated for test maintainers otherwise
module.exports.description = 'A simplified invalid config that uses a in-mem data source with a query which does not have a resolver'
