'use strict';

var appServiceMocks = angular.module('serviceMocks',
    [
        'serviceMocks.userMock',
        'serviceMocks.reposMock',
        'serviceMocks.issuesMock',
        'serviceMocks.watchersMock'
    ]);
