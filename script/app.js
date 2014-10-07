(function($) {
  $(function() { //on DOM ready
    var App = {};

    /**
     * Init function, the app starting point
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     */
    App.init = function(){
      // retrieve data from server and execute a callback after
      // finish that
      App.retrieveData(function(data){
        App.renderUI(data);
        App.bindUI();
      });
    };

    /**
     * Render the application data
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     * @param  {[type]}   data items JSON
     */
    App.renderUI = function(data){
        var itemsPerColumn,
          itemListSize = data.length,
          i,
          $verticalSlider,
          $actualColumn,
          actualColumnIndex = 0,
          actualColumnItemIndex = 0,
          templateSource;

      // we divide by the number of columns the number of items
      // to make it as fair as possible more
      itemsPerColumn = Math.floor(itemListSize / App.getColumnCount());

      $verticalSlider = $('#app').find('.slideshow-vertical');
      $actualColumn = $($verticalSlider[0]);

      for (i = 0; i < itemListSize; i++) {
        if(actualColumnItemIndex === itemsPerColumn){
          $actualColumn = $verticalSlider[++actualColumnIndex];
          actualColumnItemIndex = 0;
        }
        actualColumnItemIndex++;
        $($actualColumn).append(App.renderItem(data[i]));
      }
    };

    /**
     * Render an item
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     * @param  {model}   item Can be video or image model representation
     */
    App.renderItem = function(item){
      var compiledTemplateFunction;
      compiledTemplateFunction = App.getCompiledTemplate(item.type);
      return compiledTemplateFunction(item);
    };

    /**
     * Put all event listeners
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     */
    App.bindUI = function(){
      $('#app').imagesLoaded(function () {
        App.unLockInterfaceAction();
        App.initScrollAction();
        App.playVideo();
      });

      $(window).on("resize", function() {
        $( ".vert" ).height($(window).height() - 80);
      });
    };

    /**
     * Init the infinite scroll loop
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-04
     */
    App.initScrollAction = function(){
      var columnCount = App.getColumnCount(),
          actualColumn = 0,
          $verticalSlider = $('#app').find('.slideshow-vertical'),
          direction;

      while(actualColumn < columnCount){
        if(actualColumn === 1 || actualColumn === 3){
          direction = 'backwards';
        }else{
          direction = 'forwards';
        }
        $($verticalSlider[actualColumn]).simplyScroll({
          customClass: 'vert',
          orientation: 'vertical',
                auto: true,
                manualMode: 'loop',
          frameRate: 24,
          speed: 1,
          direction: direction
        });
        $($(".vert")[actualColumn]).height($(window).height() - 80);
        actualColumn++;
      }
    };

    /**
     * Hide the init load layer
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     */
    App.unLockInterfaceAction = function(){
      $('#loading-icon').hide();
    };

    /**
     * Play all videos
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     */
    App.playVideo = function(){
      $('.video-slide .vid').each(function () {
          $(this).get(0).play();
      });
    };

    /**
     * Retrieve model data from backend
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    App.retrieveData = function(callback){
      var data = [];

      data = APP_CONFIG.testData.items;
      //Pide la data al servidor y cuando la misma llega
      //pinta renderea los elementos
      callback(data);
    };

    /**
     * Return the window resolution
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     * @return {[type]}   [description]
     */
    App.getResolution = function(){
      return $(window).width();
    };

    /**
     * Get the columns counts based on screen resolution
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     * @return {[type]}   [description]
     */
    App.getColumnCount = function(){
      var columnCount = 4;
      //Debemos saber cuantas columnas se van a renderear
      if(App.getResolution() < 768){
        columnCount = 2;
      }
      return columnCount;
    };

    /**
     * Return a compiled template
     * @author Dariel Noel <darielnoel@gmail.com>
     * @since  2014-10-06
     * @param  {[type]}   type [description]
     * @return {[type]}        [description]
     */
    App.getCompiledTemplate = function(type){
      var templateType = "#item-image-template",
          template;
      if(type === 'image'){
        if(!App.imageCompiledTemplate){
          source   = $(templateType).html();
          App.imageCompiledTemplate = Handlebars.compile(source);
        }
        template = App.imageCompiledTemplate;
      } else if(type === 'video'){
        templateType = '#item-video-template';
        if(!App.videoCompiledTemplate){
          source   = $(templateType).html();
          App.videoCompiledTemplate = Handlebars.compile(source);
        }
        template = App.videoCompiledTemplate;
      }

      return template;
    };

    App.init();
  });
})(jQuery);
