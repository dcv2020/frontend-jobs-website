window.onload = async () => {
    const jobs = document.querySelector("#jobs");
    const url = "https://frontend-jobs-api.cyclic.app";

    try {
        const data = await fetch(url);
        const results = await data.json();
        if (results.length) {
            const jobsData = results.map((obj) => {
                return {
                    jobTitle: obj.title,
                    companyName: obj.company.display_name,
                    location: obj.location.display_name,
                    jobURL: obj.redirect_url,
                    description: obj.description.slice(0, 160) + "...",
                };
            });

            jobsData.map((job) => {
                const article = createArticle(job);
                jobs.append(article);
            });
        }
    } catch (err) {
        console.log(err);
    }
};

function createArticle(job) {
    const article = document.createElement("article");
    article.classList.add("jobPost");

    let h2 = document.createElement("h2");
    h2.textContent = job.jobTitle;
    h2.classList.add("jobTitle");

    let div = document.createElement("div");
    div.classList.add("jobContent");

    let companyName = document.createElement("h4");
    companyName.textContent = job.companyName;
    companyName.classList.add("companyName");

    let location = document.createElement("div");
    location.textContent = job.location;
    location.classList.add("location");

    let description = document.createElement("p");
    description.textContent = job.description;
    description.classList.add("description");

    let jobURL = document.createElement("a");
    jobURL.textContent = "View Full Job Post";
    jobURL.setAttribute("href", job.jobURL);
    jobURL.classList.add("jobURL");

    article.append(h2);
    div.append(companyName);
    div.append(location);
    div.append(description);
    div.append(jobURL);
    article.append(div);
    return article;
}
