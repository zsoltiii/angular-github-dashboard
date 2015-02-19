'use strict';

var appUserMock = angular.module('serviceMocks.userMock', []);

appUserMock.value('userMock',
    {
        "meta": {
            "status": 200
        },
        "data":
        {
            "login": "angular",
            "id": 139426,
            "avatar_url": "https://avatars.githubusercontent.com/u/139426?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/angular",
            "html_url": "https://github.com/angular",
            "followers_url": "https://api.github.com/users/angular/followers",
            "following_url": "https://api.github.com/users/angular/following{/other_user}",
            "gists_url": "https://api.github.com/users/angular/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/angular/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/angular/subscriptions",
            "organizations_url": "https://api.github.com/users/angular/orgs",
            "repos_url": "https://api.github.com/users/angular/repos",
            "events_url": "https://api.github.com/users/angular/events{/privacy}",
            "received_events_url": "https://api.github.com/users/angular/received_events",
            "type": "Organization",
            "site_admin": false,
            "name": "Angular",
            "company": null,
            "blog": "angularjs.org",
            "location": "",
            "email": null,
            "hireable": null,
            "bio": null,
            "public_repos": 83,
            "public_gists": 0,
            "followers": 101,
            "following": 7,
            "created_at": "2009-10-13T22:16:19Z",
            "updated_at": "2015-01-17T19:55:34Z"
        }
    }
);