const core = require("@actions/core");
const github = require("@actions/github");

try {
	const repositoryName = core.getInput("repository_name");
	const githubToken = core.getInput("github_token");
	const octokit = github.getOctokit(githubToken);
	octokit.pulls.list({
        owner: 'dera-',
        repo: repositoryName,
    }).then(pr => { console.log(pr); });
} catch (error) {
	core.setFailed(error.message);
}
