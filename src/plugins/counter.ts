import { Elysia } from 'elysia'

export const counter = new Elysia()
    .state("counter", 0)
    .get('/counter', ({ store }) => store.counter++)