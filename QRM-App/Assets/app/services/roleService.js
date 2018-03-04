 
app.service('roleService', ['$http', function ($http) {
     
    this.getRoles = function (config) {
        var req = {
            method: 'GET',
            url: config.apiUrl + 'api/Role/GetRoles'
        };

        return $http(req).then(function (reponse) {
            
            return reponse.data;

        });
    }



    this.deleteRole = function (index, config) {
        var req = {
            method: 'GET',
            url: config.apiUrl + 'api/Role/DeleteRole/' + index 
        };

        return $http(req).then(function (reponse) {

            return reponse.data;

        });
    }

    this.UpdateRole = function (index, isActive,roleName, config) {
        var url = config.apiUrl + 'api/Role/UpdateRole/?id=' + index + '&isActive=' + isActive +
                           '&roleName=' + roleName;
        return $http.get(url);
    }

    this.saveRoles = function (data, config) {
        var req = {
            method: 'POST',
            data: data,
            url: config.apiUrl + 'api/Role/SaveRoles'
        };

        return $http(req).then(function (reponse) {

            return reponse.data;

        });
    }
}]);


