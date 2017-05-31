class Offer {

    constructor(token) {
        this._baseUri  = "https://www.nikimember.se/api/v0.1";
        this._offerUrl = "/offers";
        this._cardsUrl = "/cards";
        this._groupsUrl = "/groups";
        this._categoriesUrl = "/categories";

        this.resetQueryState();
    }

    resetQueryState()
    {
        this._queryState = {
            filter: null,
            fields: null,
            order_by: "-id",
            page: 1,
            results: 9
        }
    }

    getOne(id, callback)
    {
        this._request({
            url: this._getBaseUrl()+"/"+id,
            method: "GET",
            data: [],
            ifModifiedSince: null
        }, callback)
    }

    setOrderBy(order_by)
    {
        this._queryState.order_by = order_by;
    }

    setResults(results)
    {
        this._queryState.results = results;
    }

    setFields(fields)
    {
        this._queryState.fields = fields;
    }

    setFilter(filter)
    {
        this._queryState.filter = filter;
    }

    setPage(page)
    {
        this._queryState.page = page;
    }

    getCategories(callback){
        this._request({
            url: this._getCategoriesUrl(),
            method: "GET",
            data: [],
            ifModifiedSince: null
        },callback)
    }

    getMemberCard(userId, callback){

        this._request({
            url: this._getCardsUrl()+"/"+userId, 
            method: "GET",
            data: [],
            ifModifiedSince: null
        },callback)
    }

    getMemberGroups(userId, callback){
        var params = {
            filter: '"user_id='+userId+'"',
            embeds: "groups"
        };

        var str = "";
        var iteration = 0;
        $.each(params, function(key, value){
            if(value != null){
                if(iteration == 0){
                    str += "?";
                }else{
                    str += "&";
                }

                str += key+"="+value;

                iteration++;
            }
        });
        this._request({
            url: this._getCardsUrl()+str, 
            method: "GET",
            data: [],
            ifModifiedSince: null
        },function(data, embedded){
            callback(embedded);
        })
    }

    searchGroups(searchStr,callback){

        var str = "?filter="+encodeURI('"name=%'+searchStr+'%&type=ASSOCIATION"');

        this._request({
            url: this._getGroupsUrl()+str, 
            method: "GET",
            data: [],
            ifModifiedSince: null
        },function(data, embedded){
            callback(data);
        })
    }

    getCollection(callback)
    {
        var queryString = this._createQueryString();
        this._request({
            url: this._getBaseUrl()+queryString,
            method: "GET",
            data: [],
            ifModifiedSince: null
        }, callback)
    }

    _createQueryString()
    {
        var str = "";
        var iteration = 0;
        $.each(this._queryState, function(key, value){
            if(value != null){
                if(iteration == 0){
                    str += "?";
                }else{
                    str += "&";
                }

                str += key+"="+value;

                iteration++;
            }
        });
        str += '&flow=1';
        return str;
    }

    _request(options, callback){  
        var that = this;
        if(!options.data){
            options.data = [];
        }
        $.ajax({
            type: options.method,
            url: options.url,
            data: options.data,
            success: function(data){
                that._handleResponse(data, callback)
            },
            error: function(){

            },
            beforeSend: function(jqXHR){
                var token = "NTZjNTE2YjUtMjY5Zi00OGZmLWIxZTgtMDNmMGI1MGRjNWRl";
                token = btoa(token+':unused');
                jqXHR.setRequestHeader('Authorization', 'Basic '+ token);
                jqXHR.setRequestHeader('Nikimember-App-Version', "1.1.13");
            }
        })
    }

    _getCategoriesUrl(){
        return this._baseUri+this._categoriesUrl;
    }
    
    _getCardsUrl(){
        return this._baseUri+this._cardsUrl;
    }

    _getGroupsUrl(){
        return this._baseUri+this._groupsUrl;
    }

    _getBaseUrl(){
        return this._baseUri+this._offerUrl; 
    }

    _handleResponse(data, callback){ 
        var embedded = false;
        if(data.embedded !== undefined){
            embedded = data.embedded;
        }

        data = data.data;
        callback(data, embedded);
    }
}