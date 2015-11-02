console.log('get requests');

// Set variables to select html elements:

var projects = $('.projects');
var sidebar = $('.sidebar');
var url = 'https://api.github.com/users/mellenklein/repos';
var url2 = 'https://api.github.com/users/mellenklein';
var plus = $('#plus');


function displayProjects(data){
  var projectItem = $('#projectItem');
  //set up a template in the html:
  var projectTemplate = projectItem.html(); //selecting the innerHTML
  var compiledProjectTemplate = _.template(projectTemplate);
  //change the output of updated_at to print in 'days ago' format:
  data.updated_at = moment(data.updated_at).fromNow();
  //append the new compiled template to the inside of the real html section
  projects.append(compiledProjectTemplate(data));
}
 //set up a function that iterates thru each project object and prints it to the html markup, one after another:
function getProjects(){
  $.ajax(url).done(function(data){
    data.forEach(displayProjects);
  });
}
//call the function so it actually starts:
getProjects();





//////////// Pulling from Profile Page: ////////

function displaySidebar(data){
  var sidebarItem = $('#sidebarItem');
  var sidebarTemplate = sidebarItem.html();
  var compiledSidebarTemplate = _.template(sidebarTemplate);
  data.created_at = new Date(data.created_at).toDateString();
  sidebar.append(compiledSidebarTemplate(data));
}

function getSidebar(){
  $.ajax(url2).done(displaySidebar);
}

getSidebar();


//////////// Dropdown menus //////////////
$('.octicon-plus').click(function(){
  $('.dropdown#new').toggleClass('expanded')
  console.log('log plus clicked');
});

$('#avatar-small').click(function(){
  $('.dropdown#profile').toggleClass('expanded')
  console.log('img menu clicked');
});
