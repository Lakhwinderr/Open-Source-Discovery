const z= require('zod')

const createUser = z.object({
    useremail: z.string().email(), 
    username: z.string()
})

const createRepo = z.object({
            repoId: z.number(),
            name: z.string(),
            url: z.string(),
            description: z.string(),
            stars: z.number(),
            forks: z.number(),
            language: z.string(),
            labels: z.array(z.string())
})

module.exports = {
    createRepo: createRepo,
    createUser: createUser
}