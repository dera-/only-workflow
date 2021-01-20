const core = require("@actions/core");
const github = require("@actions/github");

try {
	const repositoryName = core.getInput("repository_name");
	const octokit = github.getOctokit(myToken);
	const pullRequests = await octokit.pulls.list({
        owner: 'dera-',
        repo: repositoryName,
    });
	console.log(pullRequests);
} catch (error) {
	core.setFailed(error.message);
}
