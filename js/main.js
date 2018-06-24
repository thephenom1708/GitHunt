$(document).ready(function() {
    $('#searchUser').on('keyup', function(e) {
        let username = e.target.value;

        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id: '26d397501a220e813f07',
                client_secret: 'a2a5a6ec60eae3efde0369c418b4464f53e7583f'
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id: '26d397501a220e813f07',
                    client_secret: 'a2a5a6ec60eae3efde0369c418b4464f53e7583f',
                    sort: 'created: asc',
                    per_page: 10
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){

                    var repoHtml =
                        `<div class="well">
                          <div class="row">
                            <div class="col-md-7">
                            <div class="alert alert-dismissible alert-primary">
                              <h4 class="alert-heading"><strong>${repo.name}</strong>:</h4>
                              <p class="mb-0">${repo.description}</p>
                            </div>
                            </div>
                            <div class="col-md-3">
                              <span class="badge badge-info">Forks: ${repo.forks_count}</span>
                              <span class="badge badge-success">Watchers: ${repo.watchers_count}</span>
                              <span class="badge badge-danger">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                              <a href="${repo.html_url}" target="_blank" class="btn btn-primary">Repo Page</a>
                            </div>
                          </div>
                        </div>`

                    $('#repos').append(repoHtml);
                });
            });

            var profileHtml =
                `<div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}"><br><br>
                        <a target="_blank" class="btn btn-success btn-block" href="${user.html_url}">View Profile</a>
                      </div>
                      <div class="col-md-9">
                      <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                      <span class="badge badge-success">Public Gists: ${user.public_gists}</span>
                      <span class="badge badge-danger">Followers: ${user.followers}</span>
                      <span class="badge badge-info">Following: ${user.following}</span>
                      <br><br>
                      <ul class="list-group">
                        <li class="list-group-item">Company: ${user.company}</li>
                        <li class="list-group-item">Website/blog: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
                        <li class="list-group-item">Location: ${user.location}</li>
                        <li class="list-group-item">Member Since: ${user.created_at}</li>
                      </ul>
                      </div>
                    </div>
                  </div>
                </div><br>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>`

            $('#profile').html(profileHtml);
        });
    });
});
