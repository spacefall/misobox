import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('clear', () => {
  it('runs clear cmd', async () => {
    const {stdout} = await runCommand('clear')
    expect(stdout).to.contain('hello world')
  })

  it('runs clear --name oclif', async () => {
    const {stdout} = await runCommand('clear --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
