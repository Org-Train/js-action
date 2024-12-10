const core = require('@actions/core')
const  github  = require('@actions/github')


async function run() {
  try {
    const token = core.getIDToken('token')
    const title = core.getIDToken('title')
    const body = core.getIDToken('body')
    const assignees = core.getIDToken('assignees')
    const octokit = github.getOctokit(token)
    const response = await octokit.rest.issues.create(
     // {owner: github.context.repo.owner, repo:github.context.repo.repo}
     {...github.context.repo,
      title,
       body,
       assignees: assignees ? assignees.split("\n") : undefined,
      }

    )
    core.setOutput('issue', response.data)

  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = {
  run
}
