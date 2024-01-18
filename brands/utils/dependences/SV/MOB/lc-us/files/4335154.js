window.userGender = null;
window.userHistoryGender = null;
window.todayDate = new Date().toISOString().slice(0,10);
var expCookie = 365;
console.log('test monetate gender');
var singletonInstanceGender = {
  getCountGender: function (gender) {
    if (sessionStorage.getItem('gender') === null || sessionStorage.getItem('gender') === undefined) {
      return 0;
    }
    return JSON.parse(sessionStorage.getItem('gender'))[gender];
  },

  getGenderSession: function () {
    if (parseInt(JSON.parse(sessionStorage.getItem('gender')).male) >=2 || parseInt(JSON.parse(sessionStorage.getItem('gender')).female) >= 2) {
      if (parseInt(JSON.parse(sessionStorage.getItem('gender')).male) === parseInt(JSON.parse(sessionStorage.getItem('gender')).female)) {
        return window.userGender = 'default';
      }
      window.userGender = parseInt(JSON.parse(sessionStorage.getItem('gender')).male) > parseInt(JSON.parse(sessionStorage.getItem('gender')).female) ? 'male' : 'female';
      console.log('getGenderSession = ' + sessionStorage.getItem('gender'));
      return window.userGender;
    } else {
      return window.userGender;
    }
  },

  setHistoryGender: function () {
    console.log('setHistoryGender');
    let historyGender = localStorage.getItem('historyGender') ? JSON.parse(localStorage.getItem('historyGender')) : {};
    historyGender[todayDate] = singletonInstanceGender.getGenderSession();
    localStorage.setItem('historyGender', JSON.stringify(historyGender));
    singletonInstanceGender.getHistoryGender();
    return historyGender;
  },

  getHistoryGender: function () {
    console.log('getHistoryGender function');
    let historyGender = JSON.parse(localStorage.getItem('historyGender'));
    let maleCount = 0;
    let femaleCount = 0;
    Object.values(historyGender).forEach(
      (gender) => {
        if(gender === 'male'){
          maleCount++;
        } else {
          femaleCount++;
        }
      }
    );

    if(maleCount === femaleCount){
      window.userHistoryGender = 'default';
      console.log('maleCount === femaleCount')
    } else {
      console.log( maleCount > femaleCount ? 'male' : 'female')
      window.userHistoryGender = maleCount > femaleCount ? 'male' : 'female';    
    }

    document.cookie = singletonInstanceGender.setCookie('userGender', window.userHistoryGender, expCookie);
    return window.userHistoryGender;

  },

  setCookie: function(cname,cvalue,exdays){
    console.log('set cookie ' + cname + ' ' + cvalue)
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();

    return  cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  incrementGenderCount: function (gender) {
    console.log('increment');
    var genderObjectIncremented = (gender === 'male') ? { male: parseInt(singletonInstanceGender.getCountGender('male')) + 1, female: singletonInstanceGender.getCountGender('female') } : { male: singletonInstanceGender.getCountGender('male'), female: parseInt(singletonInstanceGender.getCountGender('female') + 1) };

    sessionStorage.setItem('gender', JSON.stringify(genderObjectIncremented));
    singletonInstanceGender.setHistoryGender();

    return JSON.parse(sessionStorage.getItem('gender'));

  },


  isSessionMale: function () {
    return (singletonInstanceGender.getGenderSession() === 'male') ? true : false;
  },

  isSessionFemale: function () {
    return (singletonInstanceGender.getGenderSession() === 'female') ? true : false;
  },

  isHistoryMale: function () {
    return (singletonInstanceGender.getHistoryGender() === 'male') ? true : false;
  },

  isHistoryFemale: function () {
    return (singletonInstanceGender.getHistoryGender() === 'female') ? true : false;
  },

  searchIn: function (text) {
    console.log('start search')
    var searchStrings = [];
    searchStrings.male = ['man', 'men', 'mens', 'male', 'males'];
    searchStrings.female = ['woman', 'women', 'womens', 'female', 'females'];

    console.log(text);
    for (var gender in searchStrings) {

      for (var i = 0; i < searchStrings[gender].length; i++) {

        if (text.match(new RegExp('\\b(' + searchStrings[gender][i] + ')\\b')) !== null) {
          console.log('get increment');
          singletonInstanceGender.incrementGenderCount(gender);
        }

      }

    }

  },
  monetateRetrack: function(){
    console.log('retrack');
    window.monetateQ = window.monetateQ || [];    
    window.monetateQ.push([ "setPageType", window.ct_pageType ? window.ct_pageType : null ]);
    window.monetateQ.push([
      "trackData"
    ]);

  }

};


if(utag_data.Page_Type == 'Plp'){
  /*if(document.querySelectorAll("#breadcrumbGender span")[0]){
    singletonInstanceGender.searchIn(document.querySelectorAll("#breadcrumbGender span")[0].innerText.toLowerCase());
    console.log('search da bread')
  } else if(document.querySelectorAll(".filter-button.selected")[0]){
    singletonInstanceGender.searchIn(document.querySelectorAll(".filter-button.selected")[0].innerText.toLowerCase());
    console.log('search da filter')
  }*/
 singletonInstanceGender.searchIn(location.href);
 singletonInstanceGender.monetateRetrack();
  
}

if(utag_data.Page_Type == 'Pdp'){
  singletonInstanceGender.searchIn(utag.data.Action_PreviousAction.toLowerCase());
  console.log('search da pdp');
  singletonInstanceGender.monetateRetrack();
}



// PLP   PAGE TYPE == CATALOG


// PDP search in utag_data
//singletonInstanceGender.searchIn(utag_data.Action_PreviousAction.toLowerCase());




// CLICK EVENT

/*
var configClick = {
  'elementSelector': '.ct_menu__highlights_item',
  'isDataElement': true,
  'infoSource': 'elementId'
};

document.querySelectorAll(configClick.elementSelector).forEach(
  (element) => {
    //console.log(element);
    element.addEventListener('click', (el) => {

      let clickTarget = configClick.isDataElement ? el.currentTarget.dataset[configClick.infoSource] : el.currentTarget[configClick.infoSource];
	 console.log('click su element');	
	 console.log(clickTarget.toLowerCase());	
      singletonInstanceGender.searchIn(clickTarget.toLowerCase());
    }, false);
  }
);*/