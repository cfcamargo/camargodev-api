const AuthController = () => import('#controllers/auth/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import PostsController from '#controllers/posts/posts_controller'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register']).as('auth.register')
router.post('/login', [AuthController, 'login']).as('auth.login')
router.delete('/logout', [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
router.get('/me', [AuthController, 'me']).as('auth.me')


router.get('/posts', [PostsController,'index']).as('post.list')
router.post('/posts', [PostsController,'store']).as('post.create').use(middleware.auth())
