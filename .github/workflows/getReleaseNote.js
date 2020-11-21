const core = require("@actions/core");
const fs = require("fs");

try {
	const packageJson = require("./package.json");
	const version = packageJson["version"];
	core.setOutput("version", version);
	let body = "";
	if (fs.existsSync("./CHANGELOG.md")) {
		const changelog = fs.readFileSync("./CHANGELOG.md");
		const changelogArray = changelog.split("\n");
		let matchCount = 0;
		const regex = /## \d+\.\d+\.[\d\w_\-\.]+/;
		for (let i = 0; i < changelogArray.length; i++) {
			if ( changelogArray[i].match(regex)) {
				if (matchCount > 0) {
					break;
				}
				matchCount++;
			} else if (matchCount > 0) {
				body += changelogArray[i] + "\n";
			}
		}
	}
	core.setOutput("body", body);
} catch (error) {
	core.setFailed(error.message);
}