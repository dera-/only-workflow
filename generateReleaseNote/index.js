const core = require("@actions/core");
const fs = require("fs");
const path = require("path");

try {
	const repositoryPath = core.getInput("repositoryPath");
	const packageJson = require(path.join(repositoryPath, "package.json"));
	const version = packageJson["version"];
	console.log("version", version);
	core.setOutput("version", "v" + version);
	let body = "";
	const changelogPath = path.join(repositoryPath, "CHANGELOG.md");
	if (fs.existsSync(changelogPath)) {
		const changelog = fs.readFileSync(changelogPath).toString();
		const changelogArray = changelog.split("\n");
		let matchCount = 0;
		const regex = /## (\d+\.\d+\..+)/;
		for (let i = 0; i < changelogArray.length; i++) {
			const match = changelogArray[i].match(regex);
			if (match) {
				if (matchCount > 0) {
					break;
				} else if (match[1] === version) {
					matchCount++;
				}
			} else if (matchCount > 0) {
				body += changelogArray[i] + "\n";
			}
		}
	}
	console.log("body", body);
	core.setOutput("body", body);
} catch (error) {
	core.setFailed(error.message);
}