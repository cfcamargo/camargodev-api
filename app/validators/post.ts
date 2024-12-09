import vine from '@vinejs/vine'

export const createPostValidate = vine.compile(
    vine.object({
        title: vine.string().minLength(3).maxLength(255),
        content: vine.string().minLength(5)
    })
)