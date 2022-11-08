import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import { guessRoutes } from './routes/guess'
import { userRoutes } from './routes/user'

// é a primeira função que será executada pelo código
// o logger serve para monitorar se está dando erros na aplicação
async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    // o origin true permite qualquer aplicação acessar o backend
    await fastify.register(cors, {
        origin: true,
    })

    // Em produção isso precisa ser uma variável amiente
    await fastify.register(jwt, {
        secret: 'nlwcopa',
    })

    await fastify.register(poolRoutes)
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes)

    // a aplicação será executada na porta 3333
    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()