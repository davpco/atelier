(function($) {
  $(function() { //on DOM ready
    var App = {};


    App.init = function(){
      App.retrieveData(function(data){
        App.renderUI(data);
        App.bindUI();
      });
    };

    App.renderUI = function(data){
        var itemsPerColumn,
          itemListSize = data.length,
          i,
          $verticalSlider,
          $actualColumn,
          actualColumnIndex = 0,
          actualColumnItemIndex = 0,
          templateSource;

      //Debemos dividir entre la cantidad de columnas la cantidad
      //de items para que quede lo mas equitativo posible
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

    App.renderItem = function(item){
      var compiledTemplateFunction;
      compiledTemplateFunction = App.getCompiledTemplate(item.type);
      return compiledTemplateFunction(item);
    };

    App.bindUI = function(){
      $('#app').imagesLoaded(function () {
        App.unLockInterfaceAction();
        App.initScrollAction();
        App.playVideo();
      });
    };

    App.playVideo = function(){
      $('.video-slide .vid').each(function () {
          $(this).get(0).play();
      });
    };

    /**
     * Init the scroll
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

    App.unLockInterfaceAction = function(){
      $('#loading-icon').hide();
    };

    App.retrieveData = function(callback){
      var data = [];

      data = APP_CONFIG.testData.items;
      //Pide la data al servidor y cuando la misma llega
      //pinta renderea los elementos
      callback(data);
    };

    App.getResolution = function(){
      return $(window).width();
    };

    App.getColumnCount = function(){
      var columnCount = 4;
      //Debemos saber cuantas columnas se van a renderear
      if(App.getResolution() < 768){
        columnCount = 2;
      }
      return columnCount;
    };

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
