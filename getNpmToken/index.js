const core = require("@actions/core");
const path = require("path");

try {
	const repositoryPath = core.getInput("repository_path");
	const packageJson = require(path.join(repositoryPath, "package.json"));
	const name = packageJson["name"];
	let token = "";
	if (/^@akashic-extension\//.test(name)) {
		token = process.env.EXTENSION_NPM_TOKEN;
	} else {
		token = process.env.NPM_TOKEN;
	}
	core.setOutput("token", token);
} catch (error) {
	core.setFailed(error.message);
}
