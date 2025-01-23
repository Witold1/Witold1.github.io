var rootPath = location.href.replace(location.origin,'');

pageTitle = "Blog"
if (rootPath.includes("blog/posts/")) {
  //  Your code running if condition1 === true
  rootPath = "../../../"
} else if (rootPath.includes("blog/")) {
  //  Some other code running if condition2 === true
  rootPath = ".."
} else if (rootPath.includes("gallery/")) {
  //  Some other code running if condition2 === true
  pageTitle = "DataViz"
  rootPath = ".."
} else {
  //  Code running for all other cases
  rootPath = "."
}
let appTopNavigationBar = `
  <a class="home-page" href="${rootPath}/index.html">📝 <b>Witold's</b> ${pageTitle} Project</a>
  <a href="${rootPath}/gallery/index.html" style="float: right" alt="Portfolio Gallery link:" title="To DataViz Gallery Project" >Portfolio Gallery</a>
  <a href="${rootPath}/blog/index.html" style="float: right" alt="Blog link:" title="To Blog Project" >Blog</a>
  <a href="https://www.linkedin.com/in/vital-yevtushenko/" class="fa fa-linkedin-square" style="float: right" aria-label="Linkedin" alt="linkedin link: linkedin.com/in/vital-yevtushenko/" title="To LinkedIn" ></a>
  <a href="https://github.com/witold1/" class="fa fa-github-alt" style="float: right" aria-label="Github" alt="github link: github.com/witold1/" title="To Github" ></a>
  <a href="javascript:void(0);" class="flip" onclick="onClickPanelShow()" style="float: right" alt="about me block" title="Show about me block" >About Me</a>
  <a href="javascript:void(0);" aria-label="Responsive top navigation" class="icon" onclick="myFunction()">
  <i class="fa fa-bars"></i>
`;
document.getElementById("top-navigation").innerHTML = appTopNavigationBar;

let appFooterBar = `
  <a href="${rootPath}/sitemap.html">Sitemap</a>
  <div>© Copyright 2024 by Witold's Data Consulting, LLC. All rights reserved. Designed and developed by Witold's Data Consulting, LLC.</div>
`;
document.getElementById("bottom-navigation").innerHTML = appFooterBar;

let appAboutMe = `
  <h2> 👨‍💻 Brief introduction</h2>
  <p>Hello, <a href="https://witold1.github.io/">Witold1</a> is here! You might recognize me from my involvement in various analytical projects, insightful blog comments, and captivating data visualization products.</p>
  <p>If you're interested in collaborating on projects that require joint expertise don't hesitate to reach out.</p>
`;
document.getElementById("panel").innerHTML = appAboutMe;
