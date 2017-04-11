class Offer {

    constructor(token) {
        this._baseUri  = "https://www.nikimember.se/api/v0.1";
        this._offerUrl = "/offers";

        this.resetQueryState();
    }

    resetQueryState()
    {
        this._queryState = {
            filter: null,
            fields: null,
            order_by: "-id",
            page: 1,
            results: 10
        }
    }

    getOne(id, callback){
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
        console.log(str)
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
                var token = "YzAwNDVhZjYtODUyYS00ZGMwLWE4OTgtZjI5MTUxYjg5MTcw";
                token = btoa(token+':unused');
                jqXHR.setRequestHeader('Authorization', 'Basic '+ token);
                jqXHR.setRequestHeader('Nikimember-App-Version', "1.1.13");
            }
        })
    }

    _getBaseUrl(){
        return this._baseUri+this._offerUrl;
    }

    _handleResponse(data, callback){
        data = data.data;
        callback(data);
    }
}