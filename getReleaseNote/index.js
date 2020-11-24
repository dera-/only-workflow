const core = require("@actions/core");
const fs = require("fs");

try {
	const packageJson = require("../target/package.json");
	const version = packageJson["version"];
	core.setOutput("version", version);
	let body = "";
	if (fs.existsSync("../target/CHANGELOG.md")) {
		const changelog = fs.readFileSync("../target/CHANGELOG.md");
		const changelogArray = changelog.split("\n");
		let matchCount = 0;
		const regex = /## (\d+\.\d+\.[\d\w_\-\.]+)/;
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
	core.setOutput("body", body);
} catch (error) {
	core.setFailed(error.message);
}