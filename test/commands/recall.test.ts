import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('recall', () => {
  it('runs recall cmd', async () => {
    const {stdout} = await runCommand('recall')
    expect(stdout).to.contain('hello world')
  })

  it('runs recall --name oclif', async () => {
    const {stdout} = await runCommand('recall --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
