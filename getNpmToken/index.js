const core = require("@actions/core");
const path = require("path");

try {
	const repositoryPath = core.getInput("repository_path");
	const packageJson = require(path.join(repositoryPath, "package.json"));
	const name = packageJson["name"];
	let token = "";
	if (/^@akashic-extension\//.test(name)) {
		token = core.getInput("npm_token_for_akashic_extension");
	} else {
		token = core.getInput("npm_token");
	}
	core.setOutput("token", token);
} catch (error) {
	core.setFailed(error.message);
}
