console.log('get requests');

// Set variables to select html elements:
var body = $('body');
var fullName = document.getElementById('name');
var blog = document.getElementById('blog');
var join = document.getElementById('join');
var loc = document.getElementById('location');
var email = document.getElementById('email');
var html = document.getElementById('html_url');
var username = document.getElementById('username');
var projects = $('.projects');

// Create a function that iterates through each item on the Repos array
// and inserts each project into the markup
var displayProjects = function(data){
  projects.html(''); //reset the html every time it refreshes

//For each item in the array, create a section called article.project
// and within it, create a header that contains the title and link,
// as well as the time stamp, for the project.
  data.forEach(function(item){
    console.log(item);
    var article = $('<article class="project"></article>');
    var header = $('<header><a href='+ item.html_url +'>'+ item.name +'</a></header>');


    console.log(item.updated_at);

      var date = item.updated_at.toString();
      var split = date.split("");
      var concat = split.splice(0, 10).join("");
      console.log(concat);
      var time = $('<time class="time">Updated ' + concat + '</time>');
  



    var icons = $('<div>'+ item.language + '<a href="#" class="octicon octicon-star"></a>' + item.stargazers_count + '<a class="octicon octicon-git-branch" href"#"></a>' + item.forks_count + '</div>');

    article.append(header); //print the header and timestamp inside article
    article.append(time);
    article.append(icons);

    projects.append(article); //print the articles to the projects section
  });
};

// Create a function that gets the necessary data from the repo API:
var getProjects = function(){
  var handleSuccess = function(data){
    displayProjects(data);
  }
// After the data is gathered, run the function that prints new
// project elements to the markup:
  $.get('https://api.github.com/users/mellenklein/repos', null, handleSuccess);
};


$.getJSON('https://api.github.com/users/mellenklein').done(function(data) {
  console.log(data);
  fullName.innerHTML = data.name;
  email.innerHTML = data.email;
  blog.innerHTML = data.blog;
  loc.innerHTML = data.location;
  // join.innerHTML += " " + concat;
  var avatar = $("#avatar").attr("src", data.avatar_url );
  username.innerHTML += data.login;
  // html.innerHTML += data.html_url;
  var avatarSmall = $("#avatar-small").attr("src", data.avatar_url);

  $(document).ready(function() {
    var date = data.created_at.toString();
    var split = date.split("");
    var concat = split.splice(0, 10).join("");

    console.log(concat);
    join.innerHTML += " " + concat;
  });
});



getProjects();
