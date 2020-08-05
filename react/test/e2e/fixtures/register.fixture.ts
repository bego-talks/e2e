import { initSandbox, checkinSandbox } from '../helpers/sandbox'
import { createFactory } from '../helpers/factory'
import AppModel from '../app.model'

const app = new AppModel()

fixture('register')
  .page(app.url.root)
  .beforeEach(async t => {
    const sandboxId = await initSandbox(t)
    t.ctx.factory = await createFactory(sandboxId)
  })
  .afterEach(async t => checkinSandbox(t))

test('Registering as new user', async t => {
  await t
    .click(app.navigation.register)
    .typeText(app.register.nameField, 'Joe')
    .typeText(app.register.passwordField, 'Password')
    .click(app.register.submitButton)
    .expect(app.url.isRoot())
    .ok()
    .expect(app.navigation.todos.exists)
    .ok()
    .expect(app.navigation.logoutButton.exists)
    .ok()
})
