let input = document.querySelector("input");
let button = document.querySelector("button");
let reposData = document.querySelector(".data");

let getRepos = () => {
	if (!input.value) {
		reposData.innerHTML = "<span>Please enter a valid username</span>";
	} else {
		fetch(`https://api.github.com/users/${input.value}/repos`)
			.then((res) => res.json())
			.then((repos) => {
				reposData.innerHTML = "";
				repos.forEach((repo) => {
					let mainDiv = document.createElement("div");
					let repoName = document.createTextNode(repo.name);
					mainDiv.appendChild(repoName);

					let url = document.createElement("a");
					let urlText = document.createTextNode("Visit");
					url.href = repo.html_url;
					url.target = "_blank";
					url.appendChild(urlText);
					mainDiv.appendChild(url);

					let stars = document.createElement("span");
					let starsText = document.createTextNode(
						`⭐ ${repo.stargazers_count}`
					);
					stars.appendChild(starsText);
					mainDiv.appendChild(stars);

					mainDiv.className = "repo-box";
					reposData.appendChild(mainDiv);
				});
			})
			.catch(() => {
				reposData.innerHTML = "<span>Invalid username</span>";
			});
	}
};

button.onclick = getRepos;
