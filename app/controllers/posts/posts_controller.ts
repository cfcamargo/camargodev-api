import Post from '#models/post'
import { MinioStorageProvider } from '#services/minio/upload_file_service'
import { createPostValidate } from '#validators/post'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  private minioService = new MinioStorageProvider()

  async index({request, response}: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('perPage', 10)

    const posts = await Post.query()
      .orderBy('created_at', 'desc')
      .paginate(page, limit)

    return response.status(200).json({
      posts
    })
  }

  async store({ request, response, auth }: HttpContext) {

      try {
        const requestFile = request.file('file') as MultipartFile

        let path = null

        if(requestFile){
          path = await this.minioService.upload(requestFile)

          if(!path){
              return response.json({
                  message: 'Error on archive upload. Try Again'
              })
          }

        }

        const { title, content } = await request.validateUsing(createPostValidate)

        const new_post = {
            title,
            content, 
            authorId: auth.user?.id,
            midiaPath : path
        }

        const post = await Post.create(new_post)

        return {
          post
        }

      }catch(e){
        return response.internalServerError({
          message: 'Error create post. Try Again',
          error: e.message
        })
      }

  }

  // async show({ params }: HttpContext) {}

  // async update({ params, request }: HttpContext) {}

  // async destroy({ params }: HttpContext) {}
}