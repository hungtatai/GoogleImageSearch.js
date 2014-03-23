/*
 * Author: HondaDai (http://github.com/HondaDai)
 * MIT License
 */


;(function($){

  var default_opt = {
    api_url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0",
    rsz: "&rsz=",
    q: "&q=",
    start: "&start=",
    page_size: 8, // 1~8
    keyword: "",
    result_size: 8
  }

  var GoogleImageSearch = function(opt) {
    if (typeof opt === "string")
      opt = {keyword: opt};
    this.opt = $.extend(default_opt, opt);

    if (this.opt.keyword == "") 
      return $.Deferred().resolve([]);
    else
      return this._request();
  }

  GoogleImageSearch.prototype._request = function() {
    var opt = this.opt;
    var results = [];
    var ajaxs = [];
    var def = $.Deferred();
    
    for (var i=0; opt.page_size*i < opt.result_size; ++i) {
      var url = [opt.api_url, opt.rsz, opt.page_size, opt.q, opt.keyword, opt.start, i].join("");
      var ajax = $.ajax({
        url: url,
        dataType: "jsonp"
      }).done(function(data){
          results = results.concat(data.responseData.results);
      })
      
      ajaxs.push(ajax);
      
    }
    $.when.apply($, ajaxs).done(function(){
      def.resolve(results.slice(0, opt.result_size));
    });
    return def;
  };

  window.GoogleImageSearch = GoogleImageSearch;

})(jQuery);



