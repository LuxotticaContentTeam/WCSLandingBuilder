var opsm = window.opsm || {};

(function (window, document, $, opsm) {
  /*
   * Description : General OPSM JS functions which are used in other module
   * javascript files
   * 
   */
  opsm.catalog = (function () {

    /* conditional mapping: "if" to be to be removed, when all environments will be aligned  */
    /* uat mapping has to be aligned to production mapping, when uat db will be aligned from production */
    var getFilterCategoryIds = function () {
      var host = window.location.host;
      if (host == "uat.opsm.com.au" || host == "uat.opsm.co.nz" || host == "stguat.opsm.com.au" || host == "stguat.opsm.co.nz") {
        return {
          ads_f19501_ntk_cs: 'facets-frequency',
          mfName_ntk_cs: 'facets-brand',
          ads_f14001_ntk_cs: 'facets-gender',
          ads_f12001_ntk_cs: 'facets-frameshape',
          ads_f18001_ntk_cs: 'facets-framecolour',
          ads_f20001_ntk_cs: 'facets-type',
          ads_f19001_ntk_cs: 'facets-lenscolour',
          ads_f17501_ntk_cs: 'facets-manufacturer',
          ads_f11001_ntk_cs: 'facets-rim',
          ads_f11501_ntk_cs: 'facets-material',
          ads_f13501_ntk_cs: 'facets-faceshape',
          ads_f13001_ntk_cs: 'facets-fit'
        }
      }
      if (host == "www.opsm.com.au" || host == "www.opsm.co.nz" || host == "stage.opsm.com.au" || host == "stage.opsm.co.nz") {
        return {
          ads_f17001_ntk_cs: 'facets-frequency',
          mfName_ntk_cs: 'facets-brand',
          ads_f14001_ntk_cs: 'facets-gender',
          ads_f12001_ntk_cs: 'facets-frameshape',
          ads_f18001_ntk_cs: 'facets-framecolour',
          ads_f15001_ntk_cs: 'facets-type',
          ads_f19001_ntk_cs: 'facets-lenscolour',
          ads_f17501_ntk_cs: 'facets-manufacturer',
          ads_f16501_ntk_cs: 'facets-lenstechnology',
          ads_f11001_ntk_cs: 'facets-rim',
          ads_f11501_ntk_cs: 'facets-material',
          ads_f13501_ntk_cs: 'facets-faceshape',
          ads_f13001_ntk_cs: 'facets-fit'
        }
      }
      return {
        ads_f19501_ntk_cs: 'facets-frequency',
        mfName_ntk_cs: 'facets-brand',
        ads_f14001_ntk_cs: 'facets-gender',
        ads_f12001_ntk_cs: 'facets-frameshape',
        ads_f18001_ntk_cs: 'facets-framecolour',
        ads_f20001_ntk_cs: 'facets-type',
        ads_f19001_ntk_cs: 'facets-lenscolour',
        ads_f17501_ntk_cs: 'facets-manufacturer',
        ads_f11001_ntk_cs: 'facets-rim',
        ads_f11501_ntk_cs: 'facets-material',
        ads_f13501_ntk_cs: 'facets-faceshape',
        ads_f13001_ntk_cs: 'facets-fit'
      }
    }

    /*
     * 
     *Modifying the url as per the facet selection. 
     *This function will be called as a callback function from loadpanels.
     * 
     */
    var modifyUrl = function () {

      var topCategoryName = $('#topCategoryName').val();
      if (topCategoryName.length) {
        var facetSelectionIndexes = JSON.parse(localStorage.getItem('facetSelectionIndexes'));
        if (!facetSelectionIndexes) {
          facetSelectionIndexes = {};
        }

        facetSelectionIndexes[topCategoryName] = facetSelectionIndexes[topCategoryName] ? facetSelectionIndexes[topCategoryName] : {};

        var filterCategoryIds = getFilterCategoryIds();
        //for frames and sunglasses if frameshap or brand is not selected, then we don't want to modify the url.		
        var facet_brand_selection_status = facetSelectionIndexes[topCategoryName]['facets-brand'] && Object.keys(facetSelectionIndexes[topCategoryName]['facets-brand']).length;
        var facet_frameshape_selection_status = facetSelectionIndexes[topCategoryName]['facets-frameshape'] && Object.keys(facetSelectionIndexes[topCategoryName]['facets-frameshape']).length;
        var status = true;

        if ((topCategoryName != 'ContactLenses') && (topCategoryName != 'All Contact Lenses')) {
          if (!(facet_brand_selection_status || facet_frameshape_selection_status)) {
            status = false;
          }
        }
        var urlExtension = '';
        if (status) {
          $.each(filterCategoryIds, function (k, facetCategory) {
            if (facetSelectionIndexes[topCategoryName][facetCategory]) {
              ;
              var urlPart = getMinimumSelectIndexValue(facetSelectionIndexes[topCategoryName][facetCategory]);
              //OOC-3311: To display the Metadata,url,title and description as only 'Coloured' and not 'Coloured Contacts'
              if (urlPart == 'colored-contacts' || urlPart == 'coloured-contacts')
                urlPart = 'coloured';
              if (urlPart) {
                urlExtension += '/' + urlPart;
              }
            }
          });
        }

        var targetUrl = window.location.origin;
        var category = (window.location.pathname.split("/"))[1];
        if (category.split('-').length > 1 && !(category == 'contact-lenses')) {   //if category is women-sunglasses like, then we need to take only the sunglasses
          category = (category.split('-'))[1];
        }
        var newUrl = category + urlExtension;
//				if(window.location.host == 'localhost') {
//					window.history.pushState({url: "" + targetUrl + ""}, null, 'http://' + newUrl);
//				}else {
//					window.history.pushState({url: "" + targetUrl + ""}, null, newUrl);
//				}			
        //window.history.go(-1);
        if (newUrl.indexOf('webapp') == -1) {
          window.history.pushState({}, null, targetUrl + '/' + category + urlExtension);
          //location.href = urlExtension;
        }


      }

    }


    // facets code
    var applyFacets = function (newFactes, filterTypeID) { /* 11/06/2013 - Defect #2882 - Added param 'filterTypeID'*/
      // read base url and currently applied facets from hidden fields
      // appends new facets to the applied facets and call
      // buildPLVAjax(url,facets)
      // newFactes = ' ntk1:"val1",ntk2:"val2" '
      /* get base plv url */
      var basePageUrl = $('#basePageURL').val();
      /*
       * Fetch previously applied facets ,of format
       * facet=ntk_cs1:"value",facet=ntk_cs2:"value"
       */
      var appliedFacets = $('#existingFacetList').val();

      /* params , which contains all facets */
      var params = "";

      params = createFacetValues(newFactes, appliedFacets);
      opsm.catalog.loadpanels(basePageUrl, params, true, 'POST', false, filterTypeID, modifyUrl);
      /* 11/06/2013 - Defect #2882 - Added param 'filterTypeID'*/

    }

    var getMinimumSelectIndexValue = function (obj) {
      if (!obj) {
        return null;
      }
      var keys = Object.keys(obj);
      if (!keys.length) {
        return null;
      }
      keys = keys.map(function (item) {
        return parseInt(item, 10);
      });
      var min = keys[0];
      $.each(keys, function (k, v) {
        if (v < min) {
          min = v;
        }
      });
      return obj[min];
    }

    var getMaxIndexOfFacetSelection = function (obj) {
      if (!obj) {
        return 0;
      }
      var keys = Object.keys(obj);
      if (!keys.length) {
        return 0;
      }
      keys = keys.map(function (item) {
        return parseInt(item, 10);
      });
      var max = keys[0];
      $.each(keys, function (k, v) {
        if (v > max) {
          max = v;
        }
      });
      return max;
    }

    var formatFacetName = function (facetName) {
      facetName = trim(facetName);
      var facetName = facetName.substr(1, facetName.length - 2).replace(/[^\w\s]/gi, ' ');
      facetName = (facetName.split(' ').join('-')).toLowerCase();
      if (facetName == 'women' || facetName == 'men' || facetName == 'kid') {
        facetName = facetName + 's';
      }
      return facetName;
    }

    var updateMetaData = function () {
      var facetSelectionIndexes = JSON.parse(localStorage.getItem('facetSelectionIndexes'));
      var topCategory = $('#topCategoryName').val();
      var metaDataText = {"facets-framecolour": "", "facets-brand": "", "facets-frameshape": "", "facets-gender": ""};

      if (topCategory == 'Sunglasses' && facetSelectionIndexes[topCategory]) {
        var facetSelections = facetSelectionIndexes[topCategory];
        var facetBrandCount = facetSelections['facets-brand'] ? Object.keys(facetSelections['facets-brand']).length : 0;
        var facetFrameshapeCount = facetSelections['facets-frameshape'] ? Object.keys(facetSelections['facets-frameshape']).length : 0;
        var facetGenderCount = facetSelections['facets-gender'] ? Object.keys(facetSelections['facets-gender']).length : 0;
        var facetFramecolourCount = facetSelections['facets-framecolour'] ? Object.keys(facetSelections['facets-framecolour']).length : 0;

        //if(facetBrandCount <=1 && facetFrameshapeCount <=1 && facetGenderCount <=1 && facetFramecolourCount <=1){
        var order = {
          ads_f18001_ntk_cs: 'facets-framecolour',
          mfName_ntk_cs: 'facets-brand',
          ads_f12001_ntk_cs: 'facets-frameshape',
          ads_f14001_ntk_cs: 'facets-gender'
        }

        if (Object.keys(facetSelections).length) {
          $.each(order, function (key, facetCategory) {
            if (facetSelections[facetCategory] && Object.keys(facetSelections[facetCategory]).length) {
              var selections = facetSelections[facetCategory];
              var minimum = getMinimumSelectIndexValue(selections);
              var temp = minimum.split('-');
              temp = temp.map(function (item) {
                return item.toUpperCase();
              });
              metaDataText[facetCategory] = temp.join(' ');
            }
          })
        }
        var metadataTextString = ' ';
        metadataTextString += metaDataText['facets-framecolour'] ? (metaDataText['facets-framecolour'] + ' ') : '';
        metadataTextString += metaDataText['facets-brand'] ? (metaDataText['facets-brand'] + ' ') : '';
        metadataTextString += metaDataText['facets-frameshape'] ? (metaDataText['facets-frameshape'] + ' ') : '';
        metadataTextString = capitalizeEachWord(metadataTextString);

        var genderMetaTitle = '';
        if (metaDataText['facets-gender']) {

          if (genderMetaTitle = metaDataText['facets-gender'] == 'MENS') {
            // ? "Men's" : "Women's";
            genderMetaTitle = "Men's";
          }
          else if (genderMetaTitle = metaDataText['facets-gender'] == 'WOMENS') {
            genderMetaTitle = "Women's";
          }
          else {
            genderMetaTitle = "Kid's";
          }
        }

        if (!metaDataText['facets-gender'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + ' Sunglasses | OPSM' + '</title>');
        }
        else if (!metaDataText['facets-gender'] && !metaDataText['facets-framecolour'] && metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-brand']) + ' | Sunglasses | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + genderMetaTitle + ' | Sunglasses | OPSM' + '</title>');
        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-brand'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-brand']) + ' Sunglasses | ' + genderMetaTitle + ' | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-frameshape'] && !metaDataText['facets-brand'] && !metaDataText['facets-framecolour']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' Sunglasses | ' + genderMetaTitle + ' | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-framecolour'] && !metaDataText['facets-frameshape'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Sunglasses | ' + genderMetaTitle + ' | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-frameshape'] && metaDataText['facets-brand'] && !metaDataText['facets-framecolour']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + genderMetaTitle + ' Sunglasses | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-framecolour'] && metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + genderMetaTitle + ' Sunglasses | OPSM' + '</title>');
        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-framecolour'] && metaDataText['facets-brand'] && metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' ' + genderMetaTitle + ' Sunglasses | OPSM' + '</title>');
        }
        else if (metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && !metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Sunglasses | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | ' + ' Sunglasses | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Sunglasses | ' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' Sunglasses' + ' | ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | OPSM' + '</title>');
        }
        else if (!metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Sunglasses' + ' | ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Sunglasses' + ' | ' + capitalizeEachWord(metaDataText['facets-brand']) + ' ' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | OPSM' + '</title>');

        }

        else if (metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && metaDataText['facets-gender'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | ' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' ' + genderMetaTitle + ' Sunglasses | OPSM' + '</title>');

        }
        var genderMetaDesc = '';
        if (metaDataText['facets-gender']) {

          if (metaDataText['facets-gender'] == 'MENS') {
            // ? "Men's" : "Women's";
            genderMetaDesc = "men";
          }
          else if (metaDataText['facets-gender'] == 'WOMENS') {
            genderMetaDesc = "women";
          }
          else {
            genderMetaDesc = "kid";
          }
        }
        $('meta[name=description]').remove();
        $('head').append('<meta name="description" content="Protect your eyes in style with the latest' + metadataTextString + ' sunglasses for ' + genderMetaDesc + '. Visit your local OPSM store or purchase online today!">');


      }
      else if ($('#topCategoryName').val() == 'Sunglasses') {
        $('title').remove();
        $('head').append('<title>' + ' Sunglasses | OPSM' + '</title>');
        $('meta[name=description]').remove();
        $('head').append('<meta name="description" content="Protect your eyes in style with the latest' + ' sunglasses for ' + '. Visit your local OPSM store or purchase online today!">');

      }
      else if (topCategory == 'Frames' && facetSelectionIndexes[topCategory]) {
        var order = {

          ads_f18001_ntk_cs: 'facets-framecolour',
          mfName_ntk_cs: 'facets-brand',
          ads_f12001_ntk_cs: 'facets-frameshape',
          ads_f14001_ntk_cs: 'facets-gender',
        }
        var facetSelections = facetSelectionIndexes[topCategory];
        if (Object.keys(facetSelections).length) {
          $.each(order, function (key, facetCategory) {
            if (facetSelections[facetCategory] && Object.keys(facetSelections[facetCategory]).length) {
              var selections = facetSelections[facetCategory];
              var minimum = getMinimumSelectIndexValue(selections);
              var temp = minimum.split('-');
              temp = temp.map(function (item) {
                return item.toUpperCase();
              });
              metaDataText[facetCategory] = temp.join(' ');
            }
          })
        }
        var metadataTextString = ' ';
        metadataTextString += metaDataText['facets-framecolour'] ? (metaDataText['facets-framecolour'] + ' ') : '';
        metadataTextString += metaDataText['facets-brand'] ? (metaDataText['facets-brand'] + ' ') : '';
        metadataTextString += metaDataText['facets-frameshape'] ? (metaDataText['facets-frameshape'] + ' ') : '';
        metadataTextString = capitalizeEachWord(metadataTextString);
        var genderMetaTitle = '';
        if (metaDataText['facets-gender']) {

          if (genderMetaTitle = metaDataText['facets-gender'] == 'MENS') {
            // ? "Men's" : "Women's";
            genderMetaTitle = "Men's";
          }
          else if (genderMetaTitle = metaDataText['facets-gender'] == 'WOMENS') {
            genderMetaTitle = "Women's";
          }
          else {
            genderMetaTitle = "Kid's";
          }
        }

        if (!metaDataText['facets-gender'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + ' Frames | OPSM' + '</title>');
        }
        else if (!metaDataText['facets-gender'] && !metaDataText['facets-framecolour'] && metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-brand']) + ' | Frames | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + genderMetaTitle + ' | Frames | OPSM' + '</title>');
        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-brand'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-brand']) + ' Frames | ' + genderMetaTitle + ' | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-frameshape'] && !metaDataText['facets-brand'] && !metaDataText['facets-framecolour']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' Frames | ' + genderMetaTitle + ' | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-framecolour'] && !metaDataText['facets-frameshape'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Frames | ' + genderMetaTitle + ' | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-frameshape'] && metaDataText['facets-brand'] && !metaDataText['facets-framecolour']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + genderMetaTitle + ' Frames | OPSM' + '</title>');

        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-framecolour'] && metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + genderMetaTitle + ' Frames | OPSM' + '</title>');
        }
        else if (metaDataText['facets-gender'] && metaDataText['facets-framecolour'] && metaDataText['facets-brand'] && metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' ' + genderMetaTitle + ' Frames | OPSM' + '</title>');
        }
        else if (metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && !metaDataText['facets-brand'] && !metaDataText['facets-frameshape']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Frames | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | ' + 'Frames | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Frames | ' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && !metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' Frames' + ' | ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | OPSM' + '</title>');
        }
        else if (!metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Frames' + ' | ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && !metaDataText['facets-gender'] && metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' Frames' + ' | ' + capitalizeEachWord(metaDataText['facets-brand']) + ' ' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | OPSM' + '</title>');

        }

        else if (metaDataText['facets-frameshape'] && metaDataText['facets-framecolour'] && metaDataText['facets-gender'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frameshape']) + ' | ' + capitalizeEachWord(metaDataText['facets-framecolour']) + ' ' + genderMetaTitle + ' Frames | OPSM' + '</title>');

        }
        var genderMetaDesc = '';
        if (metaDataText['facets-gender']) {

          if (metaDataText['facets-gender'] == 'MENS') {
            // ? "Men's" : "Women's";
            genderMetaDesc = "men";
          }
          else if (metaDataText['facets-gender'] == 'WOMENS') {
            genderMetaDesc = "women";
          }
          else {
            genderMetaDesc = "kid";
          }
        }
        $('meta[name=description]').remove(); //[Colour] [Brand] [Style] sunglasses for [Gender]
        $('head').append('<meta name="description" content="Frame your face in style with the latest' + metadataTextString + ' frames  for ' + genderMetaDesc + '. Visit your local OPSM store for a fitting or purchase online now!">');
      }
      else if ($('#topCategoryName').val() == 'Frames') {
        $('title').remove();
        $('head').append('<title>' + ' Frames | OPSM' + '</title>');

        $('meta[name=description]').remove(); //[Colour] [Brand] [Style] sunglasses for [Gender]
        $('head').append('<meta name="description" content="Frame your face in style with the latest' + ' frames  for ' + '. Visit your local OPSM store for a fitting or purchase online now!">');
      }
      else if ((topCategory == 'ContactLenses' || topCategory == 'All Contact Lenses') && facetSelectionIndexes[topCategory]) {
        var order = {
          ads_f20001_ntk_cs: 'facets-type',
          mfName_ntk_cs: 'facets-brand',
          ads_f17001_ntk_cs: 'facets-frequency',
        }
        var facetSelections = facetSelectionIndexes[topCategory];
        metaDataText = {"facets-type": "", "facets-brand": "", "facets-frequency": ""};
        if (Object.keys(facetSelections).length) {
          $.each(order, function (key, facetCategory) {
            if (facetSelections[facetCategory] && Object.keys(facetSelections[facetCategory]).length) {
              var selections = facetSelections[facetCategory];
              var minimum = getMinimumSelectIndexValue(selections);
              //OOC-3311: To display the Metadata,title and description as only 'Coloured' and not 'Coloured Contacts'
              if (minimum == 'colored-contacts' || minimum == 'coloured-contacts')
                minimum = 'coloured';
              var temp = minimum.split('-');
              temp = temp.map(function (item) {
                return item.toUpperCase();
              });
              metaDataText[facetCategory] = temp.join(' ');
            }
          })
        }
        var metadataTextString = ' ';
        metadataTextString += metaDataText['facets-type'] ? (metaDataText['facets-type'] + ' ') : '';
        metadataTextString += metaDataText['facets-brand'] ? (metaDataText['facets-brand'] + ' ') : '';
        metadataTextString += metaDataText['facets-frequency'] ? (metaDataText['facets-frequency'] + ' ') : '';
        metadataTextString = capitalizeEachWord(metadataTextString);

        var titledataTextString = ' ';
        if (!metaDataText['facets-frequency'] && !metaDataText['facets-type'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + 'Contact Lenses | OPSM' + '</title>');
        } else if (metaDataText['facets-frequency'] && !metaDataText['facets-type'] && !metaDataText['facets-brand']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frequency']) + ' | Contact Lenses | OPSM' + '</title>');
        } else if (metaDataText['facets-frequency'] && metaDataText['facets-brand'] && !metaDataText['facets-type']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frequency']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | Contact Lenses | OPSM' + '</title>');
        } else if (metaDataText['facets-frequency'] && !metaDataText['facets-brand'] && metaDataText['facets-type']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frequency']) + ' ' + capitalizeEachWord(metaDataText['facets-type']) + ' | Contact Lenses | OPSM' + '</title>');
        }
        else if (metaDataText['facets-frequency'] && metaDataText['facets-brand'] && metaDataText['facets-type']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-frequency']) + ' ' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + capitalizeEachWord(metaDataText['facets-type']) + ' Contact Lenses | OPSM' + '</title>');
        }

        else if (!metaDataText['facets-frequency'] && metaDataText['facets-brand'] && !metaDataText['facets-type']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-brand']) + ' | Contact Lenses | OPSM' + '</title>');
        }
        else if (!metaDataText['facets-frequency'] && !metaDataText['facets-brand'] && metaDataText['facets-type']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-type']) + ' | Contact Lenses | OPSM' + '</title>');
        }
        else if (!metaDataText['facets-frequency'] && metaDataText['facets-brand'] && metaDataText['facets-type']) {
          $('title').remove();
          $('head').append('<title>' + capitalizeEachWord(metaDataText['facets-brand']) + ' | ' + capitalizeEachWord(metaDataText['facets-type']) + ' Contact Lenses | OPSM' + '</title>');
        }

        titledataTextString += metaDataText['facets-frequency'] ? (metaDataText['facets-frequency'] + ' | ') : '';
        titledataTextString += metaDataText['facets-brand'] ? (metaDataText['facets-brand'] + ' | ') : '';
        titledataTextString += metaDataText['facets-type'] ? (metaDataText['facets-type'] + ' | ') : '';
        titledataTextString = capitalizeEachWord(titledataTextString);

        $('meta[name=description]').remove(); //[Colour] [Brand] [Style] sunglasses for [Gender]
        $('head').append('<meta name="description" content="OPSM offers ' + metadataTextString + ' contact lenses for your convenience and all day comfort. Purchase online now for FREE delivery!">');
      }
      else if ($('#topCategoryName').val() == 'ContactLenses') {
        $('title').remove();
        $('head').append('<title>' + 'Contact Lenses | OPSM' + '</title>');
        $('meta[name=description]').remove(); //[Colour] [Brand] [Style] sunglasses for [Gender]
        $('head').append('<meta name="description" content="OPSM offers' + ' contact lenses for your convenience and all day comfort. Purchase online now for FREE delivery!">');
      }
      //console.log('==========================');
      //console.log(metaDataText);
    }

    var storeFacetSelection = function (newFacets, filterTypeID) {
      initializeLocalStorageForFacetSelection();
      facetName = (newFacets.split(":"))[1];
      facetName = formatFacetName(facetName);
      var filterCategoryIds = getFilterCategoryIds();

      var facetCategory = (newFacets.split(":"))[0]; //taking ads_f12001_ntk_cs from ads_f12001_ntk_cs:"Cat Eye"	
      facetCategory = filterCategoryIds[facetCategory];

      var facetSelectionIndexes = JSON.parse(localStorage.getItem('facetSelectionIndexes'));
      if (!facetSelectionIndexes) {
        facetSelectionIndexes = {};
      }

      var topCategoryName = $('#topCategoryName').val();
      var facetTopCategory = facetSelectionIndexes[topCategoryName] ? facetSelectionIndexes[topCategoryName] : {};
      if (!(Object.keys(facetTopCategory).length)) {
        facetSelectionIndexes[topCategoryName] = {};
      }

      var facetSelectionIndexesOfCategory = facetSelectionIndexes[topCategoryName][facetCategory] ? facetSelectionIndexes[topCategoryName][facetCategory] : {};
      if (!(Object.keys(facetSelectionIndexesOfCategory).length)) {

        facetSelectionIndexes[topCategoryName][facetCategory] = {};
      }

      var index = getMaxIndexOfFacetSelection(facetSelectionIndexes[topCategoryName][facetCategory]);
      facetSelectionIndexes[topCategoryName][facetCategory][index + 1] = facetName;

      localStorage.setItem('facetSelectionIndexes', JSON.stringify(facetSelectionIndexes));
    }

    var removeFacetSelectionIndexes = function (facets) {
      if (facets) { //remove all the selected facets from the side category

        var facets = facets.split(',');
        $.each(facets, function (k, facet) {
          storeFacetDeselection(facet);
        });
        opsm.catalog.updateMetaData();
      } else { //remove all in that particular top category	
        var topCategoryName = $('#topCategoryName').val();
        var facetSelectionIndexes = JSON.parse(localStorage.getItem('facetSelectionIndexes'));
        facetSelectionIndexes[topCategoryName] = facetSelectionIndexes[topCategoryName] ? facetSelectionIndexes[topCategoryName] : {};
        delete(facetSelectionIndexes[topCategoryName]);
        localStorage.setItem('facetSelectionIndexes', JSON.stringify(facetSelectionIndexes));
        opsm.catalog.updateMetaData();
      }


    }

    var storeFacetDeselection = function (facet, filterTypeID) {
      facetName = (facet.split(":"))[1];
      facetName = formatFacetName(facetName);
      var filterCategoryIds = getFilterCategoryIds();
      var facetCategory = (facet.split(":"))[0]; //taking ads_f12001_ntk_cs from ads_f12001_ntk_cs:"Cat Eye"	
      if (!filterCategoryIds[facetCategory]) { // if this category is not concidering for url modification. return.
        return;
      }
      facetCategory = filterCategoryIds[facetCategory];

      var facetSelectionIndexes = JSON.parse(localStorage.getItem('facetSelectionIndexes'));
      if (!facetSelectionIndexes) {
        return;
      }

      var topCategoryName = $('#topCategoryName').val();
      var facetTopCategory = facetSelectionIndexes[topCategoryName] ? facetSelectionIndexes[topCategoryName] : {};
      if (!(Object.keys(facetTopCategory).length)) {
        return;
      }

      var facetSelectionIndexesOfCategory = facetSelectionIndexes[topCategoryName][facetCategory] ? facetSelectionIndexes[topCategoryName][facetCategory] : {};
      if (!(Object.keys(facetSelectionIndexesOfCategory).length)) {
        return;
      }

      $.each(facetSelectionIndexesOfCategory, function (index, fctName) {
        if (fctName == facetName) {
          delete(facetSelectionIndexesOfCategory[index]);
          return false;
        }
      });
      localStorage.setItem('facetSelectionIndexes', JSON.stringify(facetSelectionIndexes));
    }

    /*
     * Splits facet string to facet value to be passes input :-
     * ntk_cs1:"value",ntk_cs2:"value2" , appliedFacets output :-
     * appliedfacets + facet=ntk_cs1:"value",ntk_cs2:"value2"
     * 
     * appliedFacets as  facet=ntk_cs1:"value",facet=ntk_cs2:"value"
     */
    var createFacetValues = function (facetVals, appliedFacets) {
      var facetParams = '';
      var facetValArray = '';

      //convert applied facets to facet = ntk:value
      if (appliedFacets != '') {
        facetValArray = appliedFacets.split(",");
        for (i = 0; i < facetValArray.length; i++) {

          if (facetParams.length > 0) {
            facetParams = facetParams + ",";
          }
          facetParams = facetParams + "facet=" + escape(unescape(facetValArray[i]));
        }
      }
      //Merge the new facets
      facetValArray = facetVals.split(",");
      for (i = 0; i < facetValArray.length; i++) {

        /* Only add if not already existing in the applied facets */
        if (appliedFacets == undefined || appliedFacets == ""
          || appliedFacets.indexOf(facetValArray[i]) == -1) {

          if (facetParams.length > 0) {
            facetParams = facetParams + ",";
          }
          facetParams = facetParams + "facet=" + escape(unescape(facetValArray[i]));

        }

      }

      return facetParams;
    }

    // same will be used for all reset all fucntions
    var removeFacets = function (expiredFactes, filterTypeID) { /* 11/06/2013 - Defect #2882 - Added param 'filterTypeID'*/

      // read base url and currently applied facets from hidden fields
      // remove new facets from the applied facets and call
      // buildPLVAjax(url,facets)
      // newFactes = ' ntk1:"val1",ntk2:"val2"

      /* get base plv url */
      var basePageUrl = $('#basePageURL').val();

      /*
       * Fetch previously applied facets ,of format
       * facet=ntk_cs1:"value",facet=ntk_cs2:"value"
       */
      var appliedFacets = $('#existingFacetList').val();
      /* params , which contains all facets */
      var params = "";

      /*
       * For reset all , in that case expiredFactes will come empty
       */
      if (appliedFacets != undefined && expiredFactes != '') {

        params = removeFacetValues(expiredFactes, appliedFacets);

      }
      if (!expiredFactes) {
        removeFacetSelectionIndexes();// reset all call. remove facet selection indexes for this particular top category only
      } else {
        removeFacetSelectionIndexes(expiredFactes);//remove facet selection indexes for this particular top category and this particular side category
      }

      opsm.catalog.loadpanels(basePageUrl, params, true, 'POST', false, filterTypeID, modifyUrl);
      /* 11/06/2013 - Defect #2882 - Added param 'filterTypeID'*/

    }

    /*
     * Splits appliedFacets string and removes the facets that needs to be
     * removed appliedFacets = facet=ntk_cs1:"value",facet=ntk_cs2:"value"
     * 
     * input :- ntk_cs1:"value",ntk_cs2:"value2" output :-
     * facet=ntk_cs1:"value",ntk_cs2:"value2"
     */
    var removeFacetValues = function (facetVals, appliedFacets) {
      var facetParams = "";
      var removeParam;
      var appliedFacetList = appliedFacets.split(",");

      for (i = 0; i < appliedFacetList.length; i++) {
        /* add it to params only if its not part of expired facets */
        /*
         * if a facet param get only the facet value part that is
         * ntk_cs:"value"
         */
        if (facetVals.indexOf(appliedFacetList[i]) == -1) {
          if (facetParams != undefined && facetParams.length > 0) {
            facetParams = facetParams + ",";
          }
          facetParams = facetParams + "facet=" + escape(unescape(appliedFacetList[i]));
        }
      }
      return facetParams;
    }

    /* Load panel wrapper calls the load panel that renders the facets */
    var loadPanelWrapper = function (baseUrl, params) {
      /* Create cookie for back button */
      /* Get the ajax divs */
      /* Ajax response page divs */
      var srcDivs = new Array(2);
      srcDivs[0] = "categoryListingMain";
      srcDivs[1] = "facetArea";

      /* Parent page divs */
      var destDivs = new Array(2);
      destDivs[0] = "list";
      destDivs[1] = "facetArea";

      /* Load ajax */
      loadPanels(baseUrl, params, srcDivs, destDivs, 'POST', false);
    }

    var generateFacetsParams = function (appliedFacets) {
      //convert applied facets to facet = ntk:value
      var facetParams = "";
      if (appliedFacets != '') {
        facetValArray = appliedFacets.split(",");
        for (i = 0; i < facetValArray.length; i++) {

          if (facetParams.length > 0) {
            facetParams = facetParams + ",";
          }
          facetParams = facetParams + "facet=" + escape(unescape(facetValArray[i]));
        }
      }
      return facetParams;

    }

    /* Catalog Page Show more Button and Sort by Ajax Call */
    var loadpanels = function (url, params, isFacetIncluded, type, append, filterTypeID, callback, callbackParam) {/* 11/06/2013 - Defect #2882 - Added param 'filterTypeID'*/

      var respagesizeorderBy = $('#pagesizeorderBy').val();
      var rescookiepagesize = $('#pageSizecookie').val();
      params = (params + "," + respagesizeorderBy + "," + rescookiepagesize);
//      updateReloadFacetCookie(params);
      if (params != undefined) {
        params = params.replace(/,/g, '&');
      }
      // var activePanel = $('a.wcs-filter-link.wcs-active').attr('id');
      /* Add loading icon */

      /* To update reload facet cookie 
       * PN: This function call needs to be plcaed before the params.replace code below  */

      /* always let the call get new results*/
      
      params = params + "&forceSearch=1";
      
      if(type === 'GET') {
    	  var urlSplit = url.split('?');
    	  if(urlSplit.length > 1)
    		  url = urlSplit[0] + '?' + params + '&' + urlSplit[1];
    	  else
    	  	  url += '?' + params;
    	  params = '';
      }

      $.ajax({
        url: (url.indexOf('https') > -1) ? url : url.replace('http', 'https'),
        type: type,
        data: params,
        dataType: 'html',
        async: true,
        beforeSend: function () {
          // Set topoverlay
          $(".filters--topoverlay").addClass("filters--topoverlay-show");
          //var loaderDiv = '<div class="ajax-loader-disabled"> </div>',
          //	products = $(".products"),
          //	button = $(".ajaxnextload.load");
          //if(!$(".show-more-container button").hasClass("hide")){
          //	$(".show-more-container", products).append(loaderDiv);
          //}
          //$(".sort", products).append(loaderDiv);
          //$(".catalogue .facets").addClass("loading");
        },
        success: function (data) {
            // var getDataAttr = $('#categoryListingMain',data)
            // || {}
        	
        	/* OPSMD-4639*/
        	try {
        		if ($(data).filter("title").text() &&
        			$(data).filter("title").text().toLowerCase().indexOf('error')!=-1){
        			utagFiller.asyncSendErrorEvolvedDetails('Unable to search for products', null, 'Client', 'Search');
        		}
        	} catch(e){}
        	
            var getDataAttr = $(data).filter("div[id=categoryListingMain]"), getHTMLtoDiv = getDataAttr.html();
            opsm.catalog.loadOrAppendHTML($("#products-listing-list")[0], getHTMLtoDiv, append);
            // Remove topoverlay
            $(".filters--topoverlay").removeClass("filters--topoverlay-show");
            $('#btn-show-more').removeClass('d-none');
            $('#load-more-product-spinner').addClass('d-none');

            //$(".ajax-loader-disabled").remove();
            //$(".ajaxnextload.load").removeClass("loading");
            //$(".sorting").removeClass("loading");
            //$("#facetArea").removeClass("loadingSpinner");
            //$(".catalogue .facets").removeClass("loading");
            //$(this).closest("section").removeClass("loading");

          var nextPage = $(data).filter("input[id=nextPage]");
          var facetVal = $(data).find("input#teliumFacetListVal").val();
          var topCategoryName = $("input#topCategoryName").val();
          var categoryName = $("input#categoryName").val();
          var pageNameValue = $("input#pageNameValue").val();
          var startCount = $($(data).filter("input[id=startCount]")).val();
          var currentCount = $(getDataAttr.find("input[id=currentCount]")).val();
          var resultCount = $($(data).filter("input[id=totalCount]")).val();

          //utag_data.facetValue = facetVal;
          //callAnalyticsForFacetSelection(topCategoryName, categoryName, pageNameValue, facetVal);

          /* Senthil - 21-oct-2013 - Product and page count - Start */
          // update labels 
          /*var totalProductsShown = 0;
          if (append) {
        	  var currentCount = $(".products-listing--showing-product-number").text();
        	  if (currentCount !== "") {
        		  totalProductsShown = parseInt(currentCount, 10);
        	  }
          }*/
          $("#products-listing--total-results--count").html(resultCount);
          $(".products-listing--showing-product-total").html(resultCount);
          $(".products-listing--showing-product-number").html(currentCount);
          
          $('#analyticsPLPTotal').val(resultCount);
          
          opsm.catalog.hideDuplicateAndUpdateCount();

          respageCount = $($(data).filter("input[id=currentpagecount]")).val();
          $("#pagecount").html(respageCount);

          var restotalpageCount = $($(data).filter("input[id=totalpages]")).val();
          $("#totalpagecount").html(restotalpageCount);

          var isFullPage = "";
          if ($("#isFullPage").length > 0) {
            isFullPage = $("#isFullPage").val();
          }
          if ($("#isFullPage").val() === "" && currentCount === resultCount) {
            isFullPage = "yes";
          }
          if (isFullPage == "yes" || respageCount == restotalpageCount) {
            $(".summary.pages").addClass("hide");
            $(".viewAllTop").addClass("hide");
          }
          else {
            $(".summary.pages").removeClass("hide");
            $(".viewAllTop").removeClass("hide");
          }


          /* Senthil - 21-oct-2013 - Product and page count - End */

          if (isFullPage == "yes" || typeof (nextPage.val()) == "undefined") {
              $("#btn-show-more").addClass("hide");
              $(".products-listing--showing").addClass("hide");
          } else {
            $("#btn-show-more").removeClass("hide");
            $(".products-listing--showing").removeClass("hide");
            $("#btn-show-more").attr("data-url", $(nextPage).val());
          }

          if (isFacetIncluded == true) {
            // Replace facet section
            getDataAttr = $(data).filter("div[id=filters]"),
              getHTMLtoDiv = getDataAttr.html();
            opsm.catalog.loadOrAppendHTML($("#filters"), getHTMLtoDiv, false);

            /* this code was used to open facet types */
            $.each($(".facets section ul li a.active"), function () {
              var facetLink = $(".catalogue .facets .nav a[href='#" + $(this).closest("section").attr("id") + "']");
              //facetLink.find("i").remove();
              var activeFilters = $(this).closest("section").find("a.active");

              if (activeFilters.length) {
                $(this).closest("section").addClass("applied");

                /* 11/06/2013 - Defect #2882 */
                if ($(this).closest("section").attr("id") == filterTypeID && !$(this).closest("section").hasClass("open")) {
                  $(this).closest("section").addClass("open");
                }
                /* 11/06/2013 - Defect #2882 */

                if (facetLink.find("i").length > 0) {
                  $(facetLink.find("i")[0]).append(" | " + $(this).text());
                }
                else {
                  facetLink.append("<i>" + $(this).text() + "</i>");
                }
              } else {
                $(this).closest("section").removeClass("applied");
              }
            });
            /* Senthil - 21-oct-2013 - Product and page count - End */
          }
          $("body").removeClass("catalogue-sorting-open");

          if (callback) {
            callback(callbackParam);
          }
          
          //GTM removal
          /*
          if(typeof dataLayer != undefined && dataLayer != null && 'function' == typeof dataLayer.push) {
            var impressions = [];
            $(data).find('input[id^=productDetailsData_]').each(function () {
              var productList = $(this).val().split(":");
              var productDetails = {};
              var list = 'Category Pages';
              if ($("#listPage").length > 0) {
                list = 'Search Results';
              }
              productDetails['name'] = productList[0];
              productDetails['id'] = productList[1];
              productDetails['price'] = productList[2];
              productDetails['brand'] = productList[3];
              productDetails['category'] = productList[4];
              productDetails['variant'] = productList[5];
              productDetails['position'] = productList[6];
              productDetails['list'] = list;
              impressions.push(productDetails);
            });
            if (impressions.length > 0) {
              document.getElementById('productDetails').value = "";
              document.getElementById('productDetails').value = encodeURIComponent(JSON.stringify(impressions));
              gtmShowMoreProducts($('#productDetails').val());
            }
          }
          */
          $(".ghost-thumbnail").parent().addClass("d-none");
          $(".product--color-more").each(function(){
            $(this).parent().append($(this));
          });
          utagFiller.asyncSetPLPParams();
        },
        error: function (data) {
          $(".filters--topoverlay").removeClass("filters--topoverlay-show");
          /* OPSMD-4639*/
          try {
      		utagFiller.asyncSendErrorEvolvedDetails('Unable to search for products', null, 'Client', 'Search');
      	  } catch(e){}
        }
      });
      $('body').css({
        'cursor': 'default'
      });
      /* Resetting cursor style to default */
    }

    /** Refactor: deduplicate objects and update counter */
    var hideDuplicateAndUpdateCount = function () {
    	if ($("#hasItemInResults").val() === "true") {
	        var testPI = {};
	        var countItems = 0;
	        $(".product.card").each(function(){
	      	  var $this = $(this);
	      	  var productId = $this.data("product-id");
	      	  if (!testPI[productId]) {
	          	  testPI[productId] = true;
	          	  countItems += $this.find(".product--color-item").length;
	      	  } else {
	      		  $this.parent().addClass("d-none");
	      	  }
	  	  	});
	        $(".products-listing--showing-product-number").html(countItems);
    	}
    }

    /* Ajax load to replace the div content */
    var loadOrAppendHTML = function (elementId, data, append) {
      if (append == true) {
        $(elementId).append(data);
      } else {
        $(elementId).html(data);
      }
    }


    //--------cookie for facet

    /* This sets the facet parameters to the cookie so that it can be used to reload the page */
//    var updateReloadFacetCookie = function (params) {

      /* var respagesizeorderBy= $('#pagesizeorderBy').val(); 
       var rescookiepagesize= $('#pageSizecookie').val();*/


      /* Create a cookie with page id and all parameters plus page id
      * Do only if there is a page id available  as it needs to be done only for PLV /CLV pages and not for search
        *  */
//      if ($('#pageId').length > 0) {

        /* Delete existing cookie */
//        SetCookie("ReloadFacetCookie", "", -1);

        /* The cookie format will be as below 
         * pageIdentifier--facet=xf_mopsp_ntk:"value",facet=xf_mopsp_ntk:"value",totalPageSize=24
         * 
         * pageIdentifier is preceded with a separator $$ and all parameters succeed
         * If a a pagination is to be applied we will maintain a  totalPageSize as the total page size rendered.
         * that is if pagesize is 
         * */

//        var pageID = $('#pageId').val();
//        SetCookie("ReloadFacetCookie", pageID + "#" + params, 1);
//      }
//
//    }

    var SetCookie = function (cookieName, cookieValue, nDays) {
      var today = new Date();
      var expire = new Date();
      if (nDays == null || nDays == 0) nDays = 1;
      expire.setTime(today.getTime() + 3600000 * 24 * nDays);
      document.cookie = cookieName + "=" + escape(unescape(cookieValue))
        + ";expires=" + expire.toGMTString() + ";path=/;";
    }

    var initializeLocalStorageForFacetSelection = function () {
      var topCategoryName = $('#topCategoryName').val();
      var facetSelectionIndexes = JSON.parse(localStorage.getItem('facetSelectionIndexes'));
      if (!facetSelectionIndexes) {
        return;
      }
      var topCategories = {
        0: 'Sunglasses',
        1: 'Frames',
        2: 'ContactLenses'
      }
      $.each(topCategories, function (k, v) {
        if (v != topCategoryName) {
          if (facetSelectionIndexes[v]) {
            delete(facetSelectionIndexes[v]);
          }
        }
      });
      localStorage.setItem('facetSelectionIndexes', JSON.stringify(facetSelectionIndexes));
    }

    var getAppliedFacets = function() {
	    var params = [];
	    /* refactor */
        for (var index = 0; index < opsm.filters.selectedFilter.length; index++) {
          var filter = opsm.filters.selectedFilter[index];
          if (filter.filter === "price") {
            var minMax = filter.value.split(",");
            var currency = $("#price-facet-currency").val();
            if (typeof currency !== "undefined" && currency !== null) {
              params.push("facet=" + encodeURIComponent('price_' + currency + ':({' + minMax[0] + ' ' + minMax[1] + '} "' + minMax[1] + '")'));
            }
          } else {
            params.push("facet=" + encodeURIComponent(filter.value));
          }
        }
	    return params
	};

    var init = function () {
      if ($('.catalogue').length == 0)
        return;

      //opsm.utils.registerPage();			
    };

    return {
      loadpanels: loadpanels,
      hideDuplicateAndUpdateCount: hideDuplicateAndUpdateCount, 
      loadOrAppendHTML: loadOrAppendHTML,
      applyFacets: applyFacets,
      storeFacetSelection: storeFacetSelection,
      updateMetaData: updateMetaData,
      storeFacetDeselection: storeFacetDeselection,
      removeFacets: removeFacets,
//      updateReloadFacetCookie: updateReloadFacetCookie,
      generateFacetsParams: generateFacetsParams,
      getAppliedFacets: getAppliedFacets,
      init: init
    }
  }());
}(window, document, jQuery, opsm));

//Bind init function to DOM load
jQuery(opsm.catalog.init);

$(document).ready(function () {
  
  var sortProducts = function (sortControl) {
    var url = sortControl.data("href");
    var orderBy = sortControl.attr("orderBy");
    $("#pagesizeorderBy").val(orderBy);
	$('#pageSizecookie').val("pageSize=" + 18);
    opsm.catalog.loadpanels(url, opsm.catalog.getAppliedFacets(), false, "POST", false);
  };
  
  $("body").on("change", ".sort-by select", function (e) {
    e.preventDefault();
    var sortControl = $(this).find("option:selected");
    sortProducts(sortControl);
  });
  
  $("body").on("click", ".sort-by button", function (e) {
    e.preventDefault();
    var sortControl = $(this);
    sortProducts(sortControl);
  });
  
  $("body").on('click', ".products-listing--showing .ajaxnextload", function(e) {
    // $('#searchResultsLoadMoreContainer').remove();
	$('#btn-show-more').addClass('d-none');
	$('#load-more-product-spinner').removeClass('d-none');
    var srcDivs = new Array(1);
    // srcDivs[0] = $('#searchResultsDiv').val();
    var nextPageURL = $(this).attr('data-url');
    var pagesize=$('#pageSizecookie').val();
    var pageSize;
    var addPageSize = eval(pagesize)+18;	
	
    //update to the latest page size
    $('#pageSizecookie').val("pageSize=" + 18);
    opsm.catalog.loadpanels(nextPageURL, opsm.catalog.getAppliedFacets(), false, 'POST', true);
	//update to the latest page size
	$('#pageSizecookie').val("pageSize=" + addPageSize);
	
    var respagesizeorderBy= $('#pagesizeorderBy').val(); 
    var rescookiepagesize= $('#pageSizecookie').val();  

//    opsm.catalog.updateReloadFacetCookie(opsm.catalog.getAppliedFacets()+","+respagesizeorderBy+",pageSize=18");
  });
  
  
  
// 	/* OPTWO-3219 - Start */
// 	/*$(".sorting h2, button.sort, .sorting button.close").live("click", function(e){
// 		$("body").toggleClass("catalogue-sorting-open");
// 	});*/
//	
// 	$(".sorting > ul > li > a").live("click", function(e){
// 		e.preventDefault();
// 		var sortControl = $(this);
// 		var url = sortControl.attr("href");
// 		var orderBy = sortControl.attr("orderBy");
// 		$('#pagesizeorderBy').val(orderBy);
//		
// 		var appliedFacets = $('#existingFacetList').val();
// 		appliedFacets = opsm.catalog.generateFacetsParams(appliedFacets);
// 		$("button.sort").addClass("active");
// 		$(".sorting").addClass("loading");
// 		$("a", sortControl.parents("ul")[0]).removeClass("active");
// 		sortControl.addClass("active");
// 		opsm.catalog.loadpanels(url, appliedFacets, false, 'POST', false);
// 	});
//	
// 	// ------------facets apply remove
// 	$(".catalogue").on("click", "button.refine", function(e) {
// 		$("body").addClass("catalogue-facets-open");
// 	});
// 	$(".catalogue").on("click", ".facets button.close",
// 			function(e) {
// 				$("body").removeClass("catalogue-facets-open");
// 			});
// 	/*
// 	 * $(".catalogue").on("click", ".list button", function(e) {
// 	 * $(this).toggleClass("make-favourite unmake-favourite"); });
// 	 */
//
// 	// Onclick for opening the subsection of the facets
// 	$(".catalogue").on("click", ".facets .nav a", function(e) {
// 		e.preventDefault();
// 		var ele = $(this).attr('href'),
// 			headingHeight = $(ele).find("h3").outerHeight();
//
// 		$(ele).addClass("open");
// 		$(ele).css("height",$(".facets ul.nav").height()+headingHeight);
// 		// Bringing the subsection to top.
// 		$('#facetArea').scrollTop(0);
// 	})
//
// 	$(".catalogue").on("click", ".facets section button.done",
// 			function(e) {
// 				$(this).parent("section").removeClass("open");
// 				$("body").removeClass("catalogue-facets-open");
// 			});
//
// 	$(".catalogue").on("click", ".facets section h3", function(e) {
// 		$(this).closest("section").toggleClass("accordion-closed");
// 	});
//
// 	$(".catalogue").on("click",".facets section a.enabled",function(e) {
// 		e.preventDefault();
// 		$(this).toggleClass("active");
//		
// 		if ($(".catalogue .facets section a.active").length) {
// 			$(".catalogue button.refine").addClass(
// 					"active");
// 			$(".catalogue .facets").addClass(
// 					"applied");
// 		} else {
// 			$(".catalogue button.refine")
// 					.removeClass("active");
// 			$(".catalogue .facets").removeClass(
// 					"applied");
// 		}
// 		// $(".catalogue
// 		// .facets").addClass("loading");
// 		$(this).closest("section").addClass("loading");
//
// 		var facets = $(this).attr("facet-ntk");
// 		var nextAction = $(this).attr('nextaction');
// 		//console.log("ddd:"+facets);
//
// 		/*
// 		 * Use nextaction to decide if it is an
// 		 * apply/remove
// 		 */
//		
// 		if($(this).hasClass('active')) {
// 			opsm.catalog.storeFacetSelection(facets, $(this).closest("section").attr("id"));			
// 		//	console.log(localStorage.getItem('facetSelectionIndexes'));										
// 			opsm.catalog.updateMetaData();								
// 		}else {										
// 			opsm.catalog.storeFacetDeselection(facets, $(this).closest("section").attr("id"));
// 			opsm.catalog.updateMetaData();
// 			//console.log(localStorage.getItem('facetSelectionIndexes'));
// 		}
//		
// 		if (nextAction == 'A') {
// 			opsm.catalog.applyFacets(facets, $(this).closest("section").attr("id"));
// 		} else {
// 			opsm.catalog.removeFacets(facets, $(this).closest("section").attr("id"));
// 		}
// 	});
//	
// 	/* Senthil - 22-Oct-2013 - moved "applied" class to inner DIV */
// 	$(".catalogue").on("click", ".facets div.applied > button.clear", function(e) {
// 		$(".catalogue .facets .nav a i").remove();
// 		$(".catalogue .facets section a.active")
// 				.removeClass("active");
// 		$(".catalogue button.refine").removeClass(
// 				"active");
// 		$(".catalogue .facets").removeClass(
// 				"applied");
// 		$(".catalogue .facets section")
// 				.removeClass("applied");
//		
//		
// 		$("#facetArea").addClass("loadingSpinner");
// 		/*
// 		 * Use nextaction to decide if it is an
// 		 * apply/remove
// 		 */
// 		var facets = $(this).attr("facet-ntk");
// 		opsm.catalog.removeFacets(facets);
// 	});
// 	$(".catalogue").on("click", ".facets section > button.clear", function(e) {
// 		$(".catalogue .facets .nav a[href='#" + $(this).closest("section").attr("id") + "'] i").remove();
// 		$(this).closest("section").find("a.active")
// 				.removeClass("active");
// 		$(this).closest("section").removeClass(
// 				"applied");
// 		if ($(".catalogue .facets section a.active").length) {
// 			$(".catalogue button.refine").addClass(
// 					"active");
// 			$(".catalogue .facets").addClass(
// 					"applied");
// 		} else {
// 			$(".catalogue button.refine")
// 					.removeClass("active");
// 			$(".catalogue .facets").removeClass(
// 					"applied");
// 		}
// 		// $(".catalogue
// 		// .facets").addClass("loading");
//		
// 		$(this).closest("section").addClass("loading");
//		
// 		var facets = $(this).attr("facet-ntk");
// 		opsm.catalog.removeFacets(facets);
// 	});
// 	var winResizeTimeout;
// 	$(window).on('load resize.opsm.catalogue', function() {
// 		clearTimeout(winResizeTimeout);
// 		winResizeTimeout = setTimeout( function() {
// 			$(".catalogue .facets section .wrapper").each(
// 					function() {
// 						if ($(this).height() < $(this)
// 								.find("ul").height()) {
// 							$(this).addClass("scroll");
// 						} else {
// 							$(this).removeClass("scroll");
// 						}
// 					});
// 		}, 200);
// 	});
//
// 	// -------------more results------
  /*  $(".filters .filters--content .filters--box .filters--custom-checkbox input").on("change",function(ev) {
      var params = [];
      $(".filters .filters--content .filters--box .filters--custom-checkbox input:checked").each(
        function(){
          params.push("facet=" + encodeURIComponent($(this).val()));
        }
      );
      opsm.catalog.loadpanels($("#basePageURL").val(), params.join(","), false, "POST", false);
    });*/
  /*opsm.filters.executeChange = function(ev, extraParams) {
    if (typeof extraParams !== "undefined" && extraParams === "Reset") {
      return;
    }
    opsm.filters.executeFilter();
  };
  $(".filters .filters--content .filters--box .filters--custom-checkbox input").on("change",opsm.filters.executeChange);*/
});

function callAnalyticsForShowMoreProductsLink(trackvars, trackEvents, linktype, pCount, linktext, pName) {
//  if (isAnalyticsEnabled) {
//    respageCount++;
//    if (utag_flag)
//      utag.track("link", {
//        linkTrackVars: trackvars,
//        linkTrackEvents: trackEvents,
//        link_type: linktype,
//        pagination: respageCount,
//        link_text: linktext,
//        linkPageName: pName
//      });
//  }
}


function callAnalyticsForFacetSelection(topCategoryName, categoryName, pageNameValue, facetValues) {
//  if (isAnalyticsEnabled) {
//
//    var loggedInStatus = "NotLoggedIn";
//    if (isGuestUser != 'true') {
//      loggedInStatus = "LoggedIn";
//    }
//    if (utag_flag)
//
//      utag.view({
//        country: countryCode,
//        currency: currencyCode,
//        pageName: pageNameValue,
//        channel: topCategoryName,
//        subSection: categoryName,
//        facetValue: facetValues,
//        pagination: respageCount,
//        authenticated: loggedInStatus
//      });
//  }


}

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
