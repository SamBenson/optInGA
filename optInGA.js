;(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

(function( $ ) {
    $.optInGA = function(options) {

      var settings = $.extend({
        ga_id: null,
        title: 'Google Analytics',
        content: 'We use Google Analytics to help us improve our site.'
      }, options );
      
      function optOut(){
        window['ga-disable-'+settings.ga_id] = true;
        $('#analytics-consent-container').addClass('hidden');
      }

      function init(){
        $("<link/>", {
          rel: "stylesheet",
          type: "text/css",
          href: "https://fonts.googleapis.com/css?family=Open+Sans:600|Roboto:300i"
        }).appendTo("head");

        var html = [
          '<div id="analytics-consent-container">',
            '<h2>'+settings.title+'</h2>',
            '<p>'+settings.content+'</p>',
            '<p>To opt-out, please <a id="ga-opt-out-link" href="#">click here</a>.</p>',
          '</div>',
          '<style>#analytics-consent-container{position:absolute;left:10px;padding:15px;background:#d3d3d3;font-family:\'Open Sans\';border-radius:10px 10px 0 0;transition:.5s all}#analytics-consent-container.hidden{transform:translateY(100%)}#analytics-consent-container h2{margin:0 0 10px;font-family:\'Open Sans\';line-height:1;font-size:14px;font-weight:600}#analytics-consent-container p{margin:0 0 10px;font-weight:300;font-family:Roboto;font-style:italic;line-height:.9;font-size:12px}#analytics-consent-container p a{color:#000}#analytics-consent-container p:last-of-type{margin:0}</style>'
        ].join("\n");

        $('body').append(html);
        $('#analytics-consent-container').css('top', ($('html').outerHeight() - $('#analytics-consent-container').outerHeight()));

        if(typeof Cookies.get('ga-opt-out') !== 'undefined'){
          optOut();
        }

        $(document).on('click', '#ga-opt-out-link', function(e){
          e.preventDefault();

          Cookies.set('ga-opt-out', true, { expires: 999 });
          optOut();
        });

        ga('create', settings.ga_id, 'auto');
        ga('send', 'pageview');
        
        window.ga = ga;
      }

      if(typeof Cookies == 'undefined'){
        $.getScript( "https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.3/js.cookie.min.js", function(){
          init();
        });
      } 
      else { 
        init(); 
      }
 
      return this;
    };
 
}( jQuery ));
