import { Express } from 'express'
import swaggerJsdoc, { Options } from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

export default function setupSwagger(app: Express) {
  const options: Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Documentation',
        version: '1.2.0'
      },
      components: {
        schemas: {
          MovieInput: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              trailerLink: { type: 'string' },
              poster: { type: 'string'  },
              year: { type: 'number' },
              realaseDate: { type: 'string',format: '2000-05-20' },
              genre: { type: 'array', items: { type: 'string' } },
              
            },
            required: [
              'title',
              'trailerLink',
              'poster',
              'year',
              'realaseDate',
              'genre',
              
            ]
          },
          UserInput: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
              password: { type: 'string', format: 'password' },
              role: { type: 'string' },
            },
            required: ['name', 'email', 'password', 'role']
          },
          
        },
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      },
      security: {
        bearerAuth: []
      }
    },
    apis: ['./src/**/*.ts']
  }
  const specs = swaggerJsdoc(options)
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
}
