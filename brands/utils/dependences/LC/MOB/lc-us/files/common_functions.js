// create dummy variables so that the js doesn't
// error out when referencing dojo
var error_list = new Array(); //holds errors for tealium tagging

//vars for gateway modal
var modalWidth, forgotWidth, signinWidth = -1
    var currentPage = '';
var products_in_comparison = new Array();
modelPWReset = true;

dojo = {};
dojo.addOnLoad = function (f) {
    $(document).ready(f);
};
dojo.require = function () {};

// extend jquery with useful url functions
$.extend({
    getUrlVars: function () {
        var vars = [],
        hash;
        if (!window.location.href.includes("?")) {
            return vars;
        }
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            if (vars[hash[0]]) { //if the var is already present, such as 'facet', append the new value to the existing value, separated by an ampersand
                var value = vars[hash[0]].split('#')[0]; //Handle '#notOpenRefine' at the end of the URL
                value += '&' + decodeURIComponent(hash[1]);
                vars[hash[0]] = value;
            } else {
                vars.push(hash[0]);
                vars[hash[0]] = decodeURIComponent(hash[1]);
            }
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

//provides utag.link functionality with added exception handling to prevent breaking everything;
//arguments are passed through, rather than explicitly enumerated
function utagLinkSafe() {
    try {
        console.debug('utagLinkSafe utag = ' + utag);
        if (typeof utag != "undefined") {
            utag.link.apply(utag, arguments);
        }
    } catch (err) {
        console.error(err);
    }
}

/**
 * @fileOverview This javascript is used across the site
 * @version 1.0
 */
CommonFunctions = {
    /**
     * Remove tealium data
     * @param utagObj
     * @return
     */
    removeEmptyUtagEntries: function (utagObj) {

        $.each(utagObj, function (key, val) {
            if (val == undefined)
                return;

            if (val == "" || val == null) {
                delete utagObj[key]
            }
            if (typeof val == "string") {
                val = val.replace(/\\/g, "\\\\");
                val = val.replace(/'/g, "\\'");
                val = val.replace(/"/g, "\\\"");
                //document.title = document.title.split(String.fromCharCode(8217)).join('');	// remove non-ascii apostrophe

            } else {
                if (utagObj.length <= 0) {
                    delete utagObj[key];
                }
            }
            utagObj[key] = val;

        });
    },

    getUserInsuranceEligibilityStatus: function () {
        var userInsuranceEligibilityStatus = 'not synced';
        if (constants.ajaxParams['insuranceCheckEligibility']) {
            userInsuranceEligibilityStatus = "synced";
        }
        return userInsuranceEligibilityStatus;
    }
}

var RiaHelper = {
    getCookie: function (cookieName, parseJSON) {
		var cookieValue = null;
        var cookieValueStr = '';
        var cookieArray = document.cookie.split(';');
		
        var ca = cookieArray.map(function (cookie) {
            try {
                return decodeURIComponent(cookie);
            } catch (err) {
                return cookie;
            }
        });

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(cookieName) == 0) {
                cookieValueStr = c.substring(cookieName.length + 1, c.length);
            }
        }

		if (cookieValueStr && parseJSON) {
			try {
				cookieValue = JSON.parse(cookieValueStr);
			} catch (e) {
				console.error('Unable to parse cookie as JSON');
			}
		} else {
			cookieValue = cookieValueStr;
		}

        return cookieValue;
    },

    getInsuranceCookie: function () {
        var payload = RiaHelper.getCookie('ria_1');
        return payload !== '' ? payload : RiaHelper.getCookie('ria_0');
    },

	getAllInsuranceJSON: function() {
		var plans = [];

		var primaryPlan = RiaHelper.getCookie('ria_0', true);

		if (!primaryPlan) {
			primaryPlan = RiaHelper.getCookie('ria_1', true);
		}

		if (primaryPlan) {
			plans.push(primaryPlan);

			var secondaryPlan = RiaHelper.getCookie('ria_2', true);

			if (secondaryPlan) {
				plans.push(secondaryPlan);
			}
		}

		return plans;
	},

    loadJsonInsurance: function (category) {
		var jsonInsurance = null;
		var plans = RiaHelper.getAllInsuranceJSON();

		if (plans && plans.length > 0) {
			jsonInsurance = plans[0];

			if (category) {
				var i = 0;
				var tempPlan = null;
	
				while (i < plans.length && !tempPlan) {
					var plan = plans[i];
					
					if (plan.data) {
						var j = 0;
						var categoryKeys = Object.keys(plan.data);
	
						while (j < categoryKeys.length && !tempPlan) {
							var categoryKey = categoryKeys[j];
							
							if (categoryKey === category && plan.data[categoryKey][0].available === true) {
								tempPlan = plan;
							}
	
							j++;
						}
					}
	
					i++;
				}

				if (tempPlan !== null) {
					jsonInsurance = tempPlan;
				}
			}
		}

		return jsonInsurance;
    },

    getTentativeUserCookie: function () {
        return RiaHelper.getCookie('tentative_user');
    },

    setInsuranceCookie: function (data) {
        var now = new Date(),
        time = now.getTime() + 1800 * 1000;
        now.setTime(time);

        function fixInsurancePlanName(riaInsuranceInformation) {
            // Comma in cookie - Safari fix
            if (riaInsuranceInformation && riaInsuranceInformation.planName) {
                riaInsuranceInformation.planName = riaInsuranceInformation.planName.replace(',', '');
                riaInsuranceInformation = JSON.stringify(riaInsuranceInformation);
            }

            return riaInsuranceInformation;
        }
       
        if (!data.plans) {
            // Single insurance plan
            data.riaInsuranceInformation = fixInsurancePlanName(data.riaInsuranceInformation);

            var jsonStr = JSON.stringify(data);

            if (RiaHelper.getCookie('ria_0')) {
                document.cookie = 'ria_0' + '=' + jsonStr + '; path=/; expires=' + now.toUTCString() + ';';
            } else {
                document.cookie = 'ria_1' + '=' + jsonStr + '; path=/; expires=' + now.toUTCString() + ';';
            }
        } else if (data.plans && Array.isArray(data.plans) && data.plans.length === 2 && data.activePlanId) {
            // Multiple insurance plans (UHC)
            var expireDate = now.toUTCString();

            // Set active plan token cookie
            document.cookie = 'ria_active=' + data.activePlanId + '; path=/; expires=' + expireDate + ';';

            for (var i = 0; i < data.plans.length; i++) {
                var plan = data.plans[i];

                plan.riaInsuranceInformation = fixInsurancePlanName(plan.riaInsuranceInformation);

                var jsonStr = JSON.stringify(plan);

                if (i === 0) {
                    if (RiaHelper.getCookie('ria_0')) {
                        document.cookie = 'ria_0' + '=' + jsonStr + '; path=/; expires=' + expireDate + ';';
                    } else {
                        document.cookie = 'ria_1' + '=' + jsonStr + '; path=/; expires=' + expireDate + ';';
                    }
                } else if (i === 1) {
                    document.cookie = 'ria_2' + '=' + jsonStr + '; path=/; expires=' + expireDate + ';';
                }
            }
        }
    },

    toggleInsurance: function (on) {
        var now = new Date(),
        time = now.getTime() + 1800 * 1000;
        now.setTime(time);

		var jsonString = '';

        if (on) {
            jsonString = RiaHelper.getCookie('ria_0');
            document.cookie = 'ria_0=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            RiaHelper.setTentativeCookie(4);

            // PDP
            if ($('.pdp-container').length > 0) {
                // deselect addons
                $(".lc-lens-enh-item.added").removeClass('added');
                $('.existing-lens-addons').empty();
            }
        } else {
            jsonString = RiaHelper.getCookie('ria_1');
            document.cookie = 'ria_1=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }

        document.cookie = 'ria_' + (on ? '1' : '0') + '=' + jsonString + '; path=/; expires=' + now.toUTCString() + ';';
    },

    isInsuranceOn: function () {
        return RiaHelper.getCookie('ria_1') !== '' ? true : false;
    },

    setTentativeCookie: function (val) {
        var now = new Date();
        var time = now.getTime() + 3600 * 1000;
        now.setTime(time);

        if (val)
            document.cookie = 'tentative_user=' + val + '; path=/;';
        else
            document.cookie = 'tentative_user=0; path=/; expires=' + now.toUTCString() + ';';
    },

    removeInsuranceCookie: function () {
        document.cookie = "ria_0=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "ria_1=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		document.cookie = "ria_2=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "tentative_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "ria_active=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },

    /**
	 * Checks if the current logged member has all benefits
	 * @returns {boolean}
	 */
    checkAllBenefits: function () {
		var benefitsAvailable = false;

		if (RiaHelper.getInsuranceCookie() !== '') {
			var i = 0;
			var tempBenefitsAvailable = true;
			var plans = RiaHelper.getAllInsuranceJSON();

			while (i < plans.length && tempBenefitsAvailable) {
				var plan = plans[i];
				
				if (plan.data) {
					var j = 0;
					var categoryKeys = Object.keys(plan.data);

					while (j < categoryKeys.length && tempBenefitsAvailable) {
						var categoryKey = categoryKeys[j];
						
						if (plan.data[categoryKey][0].available !== true) {
							tempBenefitsAvailable = false;
						}

						j++;
					}
				}

				i++;
			}

			if (tempBenefitsAvailable) {
				benefitsAvailable = tempBenefitsAvailable;
			}
		}

		return benefitsAvailable;
    },

    /**
     * Checks if the current logged member is eligible for the benefit category
     * @param {string} category
     * @returns {boolean}
     */
    checkSingleBenefit: function (benefitCategory) {
        var benefitAvailable = false;

		if (RiaHelper.getInsuranceCookie() !== '' && benefitCategory) {
			var i = 0;
			var plans = RiaHelper.getAllInsuranceJSON();

			while (i < plans.length && !benefitAvailable) {
				var plan = plans[i];
				
				if (plan.data) {
					var j = 0;
					var categoryKeys = Object.keys(plan.data);

					while (j < categoryKeys.length && !benefitAvailable) {
						var categoryKey = categoryKeys[j];
						
						if (categoryKey === benefitCategory && plan.data[categoryKey][0].available === true) {
							benefitAvailable = true;
						}

						j++;
					}
				}

				i++;
			}
		}

		return benefitAvailable;
    },
	
	/**
     * Returns active planId stored in ria_active cookie in case of UHC multiple plans
     * @returns {number} the active planId
     */
    getInsuranceActivePlanId: function () {
    	return RiaHelper.getCookie('ria_active');
    },
    
    /**
     * Sets the active planId in the ria_active cookie in case of UHC multiple plans
     * @param {number} the active planId
     */
    setInsuranceActivePlanId: function (planId) {
    	if (planId) {
    		var now = new Date();
            var time = now.getTime() + 1800 * 1000;
            now.setTime(time);
    		
    		document.cookie = 'ria_active=' + planId + '; path=/; expires=' + now.toUTCString() + ';';
    	}
    },
};

var sha256 = function sha256(ascii) {

	if(isBlank(ascii)){
		return undefined;
	}
	
	ascii = ascii.toLowerCase().trim();
	
	function isBlank(str) {
	    return (!str || /^\s*$/.test(str));
	}


	function rightRotate(value, amount) {
		return (value>>>amount) | (value<<(32 - amount));
	};
	
	var mathPow = Math.pow;
	var maxWord = mathPow(2, 32);
	var lengthProperty = 'length'
	var i, j; // Used as a counter across the whole file
	var result = ''

	var words = [];
	var asciiBitLength = ascii[lengthProperty]*8;
	
	//* caching results is optional - remove/add slash from front of this line to toggle
	// Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
	// (we actually calculate the first 64, but extra values are just ignored)
	var hash = sha256.h = sha256.h || [];
	// Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
	var k = sha256.k = sha256.k || [];
	var primeCounter = k[lengthProperty];
	/*/
	var hash = [], k = [];
	var primeCounter = 0;
	//*/

	var isComposite = {};
	for (var candidate = 2; primeCounter < 64; candidate++) {
		if (!isComposite[candidate]) {
			for (i = 0; i < 313; i += candidate) {
				isComposite[i] = candidate;
			}
			hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
			k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
		}
	}
	
	ascii += '\x80' // Append Ƈ' bit (plus zero padding)
	while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
	for (i = 0; i < ascii[lengthProperty]; i++) {
		j = ascii.charCodeAt(i);
		if (j>>8) return; // ASCII check: only accept characters in range 0-255
		words[i>>2] |= j << ((3 - i)%4)*8;
	}
	words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
	words[words[lengthProperty]] = (asciiBitLength)
	
	// process each chunk
	for (j = 0; j < words[lengthProperty];) {
		var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
		var oldHash = hash;
		// This is now the undefinedworking hash", often labelled as variables a...g
		// (we have to truncate as well, otherwise extra entries at the end accumulate
		hash = hash.slice(0, 8);
		
		for (i = 0; i < 64; i++) {
			var i2 = i + j;
			// Expand the message into 64 words
			// Used below if 
			var w15 = w[i - 15], w2 = w[i - 2];

			// Iterate
			var a = hash[0], e = hash[4];
			var temp1 = hash[7]
				+ (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
				+ ((e&hash[5])^((~e)&hash[6])) // ch
				+ k[i]
				// Expand the message schedule if needed
				+ (w[i] = (i < 16) ? w[i] : (
						w[i - 16]
						+ (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
						+ w[i - 7]
						+ (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
					)|0
				);
			// This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
			var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
				+ ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
			
			hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
			hash[4] = (hash[4] + temp1)|0;
		}
		
		for (i = 0; i < 8; i++) {
			hash[i] = (hash[i] + oldHash[i])|0;
		}
	}
	
	for (i = 0; i < 8; i++) {
		for (j = 3; j + 1; j--) {
			var b = (hash[i]>>(j*8))&255;
			result += ((b < 16) ? 0 : '') + b.toString(16);
		}
	}
	return result;
};

var MD5 = function (string) {

	if(isBlank(string)){
		return undefined;
	}
	
	string = string.toLowerCase().trim();
	
	function isBlank(str) {
	    return (!str || /^\s*$/.test(str));
	}
	
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4,
        lY4,
        lX8,
        lY8,
        lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "",
        WordToHexValue_temp = "",
        lByte,
        lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k,
    AA,
    BB,
    CC,
    DD,
    a,
    b,
    c,
    d;
    var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
    var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
    var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
    var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
};

$('#subscribeContainer').on('click', '.subscribeUserLink', function () {
    var isSubscribed = $(this).attr('data-subscribe');
    var subscribeType = $(this).attr('data-subtype');
    var dataType = $(this).data("subtype");

    profileSubscribeFormSubmit($(this).parents('form'), isSubscribed, subscribeType);
    if (dataType == "email") {
        var email = $(this).siblings(".pref-email").text().toLowerCase();
        // Analytics Framework
        try {
            var obj = {
                id: 'WCS-D-Unsubscribe', // utag_data properties
                User_Email_MD5: MD5(email),
                User_Email_SHA256: sha256(email)
            };

        } catch (err) {
            var obj = {
                id: 'WCS-D-Unsubscribe-Error',
                Error_Source: 'Server',
                Error_Code: 'utag_data syntax - ' + err.message
            };
            tealium_data2track.push(obj);
        }
        finally {
            obj.id = 'WCS-D-Unsubscribe';
            obj.User_Email_MD5 = MD5(email);
            obj.User_Email_SHA256 = sha256(email);
            tealium_data2track.push(obj);
        }
        // END Analytics Framework

    }
    return false;
});

function setupTooltips() {
    var t = setTimeout(function () {
        $('.tooltip-link').each(function () {
            var $this = $(this),
            $tool = $this.prev('.tooltip'),
            top = $tool.height() - 15,
            left = ($tool.width() / 2) - 20;

            $tool.css('left', '-9999px').show();
            $tool.css('top', '-' + top + 'px').css('left', '-' + left + 'px').hide();

            $this.hover(function () {
                $tool.show();
            },
                function () {
                $tool.hide();
            });
        });
    }, 100)
}

function updateTotalInput(e){
	e = e || window.event;
	
	var amexRegex = /^3[47][0-9]{5,}$/;
	var inputValue = $("input[name='payment_card_1']").val();
	isAmex = amexRegex.test(inputValue.replace(new RegExp(CheckoutPayments.cardSeparator, 'g'), ''));

	if(e.keyCode != 8 && ((!isAmex && inputValue.length < 22) || (isAmex && inputValue.length < 20))) {
		if (isAmex){
			var inputValue = $("input[name='payment_card_1']").val().replace(new RegExp(CheckoutPayments.cardSeparator, 'g'), '');
			var first4 = inputValue.slice(0, 4);
			var next6 = inputValue.slice(4, 10);
			var last5 = inputValue.slice(10);
			newValue = first4 + CheckoutPayments.cardSeparator + next6 + CheckoutPayments.cardSeparator + last5;
		}else{
			var blocks = $("input[name='payment_card_1']").val().replace(new RegExp(CheckoutPayments.cardSeparator, 'g'), '').match(/.{1,4}/g);
			$("input[name='payment_card_1']").val('');
			var newValue = $("input[name='payment_card_1']").val();
			if(blocks != null){
				var index = 0;
				$.each(blocks, function(index, value){
					index++;
					if(value.length == 4 && index < 4){
						value = value + CheckoutPayments.cardSeparator;
					}
					newValue = newValue + value;		
				});
			}
		}
		$("input[name='payment_card_1']").val(newValue);
		$("input[name='account1']").val($("input[name='payment_card_1']").val().replace(new RegExp(CheckoutPayments.cardSeparator, 'g'), ''));
		$("input[name='account1']").change();
	}
}
 
function clearLoginErrorMessages(){
		$('.LogOnFailureResponseMessageDiv').empty();
		$('.header-sign-in-modal span.required ').not('.LogOnFailureResponseMessageDiv').remove();
		
}

function clearLoginFields(){
		$('.headerEmailAddress').val('');
		$('.header-logonPassword').val('');	
}

function clearRegErrorMessages(){
	$('.RegFailureResponseMessageDiv').empty();
	$('.header-register-modal span.required ').not('.RegFailureResponseMessageDiv').remove();
}

function clearResetForgotPWDErrors(){
    $('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').val('');
    $('.logonPassword_updateModel').val('');
    $('.WC_PasswordUpdateForm_FormInput_logonPasswordVerify_In_Logon_1').val('');
    $('.PasswordUpdateFailureResponseMessageDiv').empty();
    $('.header-set-a-new-password-modal span.required').not('.ResetPasswordFailureResponseMessageDiv').remove();
    $('.logonPassword_updateModel,.WC_PasswordUpdateForm_FormInput_logonPasswordVerify_In_Logon_1,.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1,.WC_PasswordUpdateForm_FormInput_EmailAddress').addClass('resetHighlight');
}

function clearResetPwdErrorMessages(){
	document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')[0].value='';
	$('.ResetPasswordFailureResponseMessageDiv').empty();
	$('.header-reset-password-modal span.required').not('.ResetPasswordFailureResponseMessageDiv').remove();
}
function hideSaveFavorites() {
	$('.save-favorites-modal-text').hide();
	$.cookie('saveFavoritesHidePrompt', '1', {path:'/'});
}

modelPWReset = true;

function showLogonModal() {
	hideSaveFavorites();
	$('.header-register-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.header-update-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.background-update-reset').css('display', 'none');
	$('.header-reset-password-done-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.header-set-a-new-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.header-sign-in-modal').css('display', 'block').attr('aria-hidden', 'false');
	$('.headerEmailAddress').focus ();
	$('.notification-count').removeClass('active');
	$('.sign-in-link').addClass("open");
	window.scrollTo(0, 0); // take the user to the top of the page (where the
							// modal is displayed)
	$('.headerEmailAddress').focus();
	clearResetPwdErrorMessages();
	clearResetForgotPWDErrors();
	clearRegErrorMessages();

	if($.getUrlVar('resetPassword') !== undefined && $.getUrlVar('resetPassword') == 'true') {
		$('.header-sign-in-modal').css('display', 'none').attr('aria-hidden', 'true');    
		$('.header-set-a-new-password-modal').css('display', 'block').attr('aria-hidden', 'false');	
		$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
		
	    var email="";
        if($.getUrlVar('emailId') !==undefined ) {
    		email = $.getUrlVar('emailId');
    		document.getElementsByClassName('WC_PasswordUpdateForm_FormInput_EmailAddress').value = email;      
    	}	
        return true;
	} else {
		return false;
	}
}

function closeForgetPasswordPopUp(){
	$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.header-reset-password-done-modal').css('display', 'none').attr('aria-hidden', 'true');
	//$('.header-sign-in-modal').css('display', 'block').attr('aria-hidden', 'true');
	if($(".thank-you-page-overlay")){
		$(".thank-you-page-overlay").addClass('hidden');
	}
	$('.headerEmailAddress').focus ();
	$('.sign-in-link').removeClass("open");
	clearResetPwdErrorMessages();
	$('#myaccount-rectangle > .backdrop').addClass('hide');
}

$('.close-reset-password-done').click(function(){
	$('.header-reset-password-done-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.sign-in-link').removeClass("open");
	return false;
});

$('.close-reset-cancel-password').click(function(){
    $('.header-set-a-new-password-modal').css('display', 'none').attr('aria-hidden', 'true');
    $('.header-reset-password-done-modal ').css('display', 'none').attr('aria-hidden', 'true');
    $('.header-sign-in-modal').css('display', 'block').attr('aria-hidden', 'true');
    $('.headerEmailAddress').focus ();
    $('.sign-in-link').removeClass("open");
    $('#myaccount-rectangle > .backdrop').addClass('hide');
    clearResetPwdErrorMessages();
    clearResetForgotPWDErrors();
    return false;
 });

$('.close-update-reset-cancel-password').click(function(){
    $('.header-update-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
    $('.background-update-reset').css('display', 'none');
    $('#myaccount-rectangle > .backdrop').addClass('hide');
    return false;
 });

function closeUpdatePsw() {
	$('.header-update-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.background-update-reset').css('display', 'none');
    $('#myaccount-rectangle > .backdrop').addClass('hide');
    return false;
}

$('.set-new-password').click(function(){
	$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.header-set-a-new-password-modal').css('display', 'block').attr('aria-hidden', 'false');
	return false;
});	

$('.close-set-new-password').click(function(){
	$('.header-set-a-new-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	$('.sign-in-link').removeClass("open");
	return false;
});

function filterAjaxResponseCart(response){
	if (response && typeof response == 'string' && response.length){
		return $.parseJSON(response.replace(/^\s*\/\*/, "").replace(/\*\/\s*$/, ""));
	}else{
		return response;
	}
}

function invokeResetPasswordService(params,showModal){
	var promiseObj = $.ajax({
		url: getAbsoluteURL() +"AjaxResetPassword",
		data: params,
		dataType: 'html',
		type: 'post',
		success: function(response){		
			try{
				var serviceResponse = response;
				if (typeof serviceResponse == 'string'){
					serviceResponse = filterAjaxResponseCart(response);
				}
				var modalForError = '.examResetPasswordFailureResponseMessageDiv';
				var hidePWModalForFavorites = true;
				if(modelPWReset){
					modalForError = '#favoriteSignInModal .ForgotPasswordSection .examResetPasswordFailureResponseMessageDiv';
				}
				var tempurl = MessageHelper.messages["RediectHomePageURL"];
				if((serviceResponse.errorMessage!=null && !serviceResponse.errorMessage.success) || serviceResponse.success == false){					
					var msg = $('.ResetPasswordErrorMsg').html();
					if($('.ResetPasswordFailureResponseMessageDiv').length > 0){						
						if(serviceResponse.errorMessage == 'EXIST_IN_US'){							
							$('.ResetPasswordFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);							
							$('.ResetPasswordFailureResponseMessageDiv').append("<a target='_blank' href='"+tempurl+"'>"+MessageHelper.messages["LenscrafterUS"]+"</a>?");
						//	$('.ResetPasswordFailureResponseMessageDiv').append("<a onClick='window.location='"+MessageHelper.messages["RediectHomePageURL"]+"' '>hi</a>").show();
							$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
						}else if(serviceResponse.errorMessage == 'EXIST_IN_CA'){
							$('.ResetPasswordFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
							$('.ResetPasswordFailureResponseMessageDiv').append("<a target='_blank' href='"+tempurl+"'>"+MessageHelper.messages["LenscrafterCA"]+"</a>?").show();
							$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
						}else {	
							if(serviceResponse.errorMessage.indexOf('personal information is not complete') > -1){
								$('.ResetPasswordFailureResponseMessageDiv').html('This email is not associated with a member account. If this email is in use with a social account, please use social login to proceed');
							}else{
								$('.ResetPasswordFailureResponseMessageDiv').html(serviceResponse.errorMessage);
							}
							$('.ResetPasswordFailureResponseMessageDiv').css('display', 'block').attr('aria-hidden', 'false');
						}
					}
					
					if($(modalForError).length > 0){
						$(modalForError).html(msg);
					}
					hidePWModalForFavorites = false;
				}
				else if(serviceResponse.PASSWORDEXPIRED !=null){
					$('.header-reset-password-modal').css('display', 'none');
					$('.header-set-a-new-password-modal').css('display', 'block');
					$('.sign-in-link').addClass("open");
					removeUIoverlay();
					addUIoverlay();
					return false;
				}
				else{ 
					data =  { "site_events": { 
						"forgot_password_submit": true
							}
							};
					callTrackAnalytics(data);
					var currentID = '';
					if(document.getElementsByClassName('currentID')!= null){
						currentID = document.getElementsByClassName('currentID').value;
					}
					if($('.ResetPasswordSuccessFullResponseMessageDiv').length > 0) {
						$('.ResetPasswordFailureResponseMessageDiv').html('');
						$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
						if(showModal){
							$('.header-reset-password-done-modal').css('display', 'block').attr('aria-hidden', 'false');
							//$('.sentTempPasswordText').text($('.sentTempPasswordText').text('{0}').css({"color" : "#0000FF"}));
							//$('.sentTempPasswordText').text($('.sentTempPasswordText').text().replace('{0}',currentID));
							$('.sentTempPasswordText').html($('.sentTempPasswordText').html().replace('{0}',currentID));
						}
					}
					if($('.examResetPasswordSuccessFullResponseMessageDiv').length > 0){
						$('.examResetPasswordSuccessFullResponseMessageDiv').html(MessageHelper.messages["PASSWORD_RESET_SUCCESS"]);
					}
				}

				if(modelPWReset){
					modelPWReset = false;
				}
				if(hidePWModalForFavorites){
					$('#favoriteSignInModal').parent().hide();
					$('.ui-widget-overlay').hide();
				}
			}catch(err){
				console.error(err);
			}
		},
		error: function(response){
			if (response){
				try{
					//var serviceResponse = filterAjaxResponseCart(response);
					var serviceResponse = filterAjaxResponseCart(response.responseText);
					var modalForError = '.ResetPasswordFailureResponseMessageDiv';
					var tempurl = MessageHelper.messages["RediectHomePageURL"];	
					if(modelPWReset){
						modalForError = '#favoriteSignInModal .ForgotPasswordSection .examResetPasswordFailureResponseMessageDiv';
						modelPWReset = false;
					}
					
					if(serviceResponse){
						var errMsg = serviceResponse.errorMessage;
						if(errMsg == 'EXIST_IN_US'){
							$('.ResetPasswordFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
							$('.ResetPasswordFailureResponseMessageDiv').append("<a target='_blank' href='"+tempurl+"'>www.lenscrafters.com</a>?").show();
						}
						else if(errMsg == 'EXIST_IN_CA'){
							$('.ResetPasswordFailureResponseMessageDiv').html(MessageHelper.messages["ERR_MSG_DID_YOU_MEAN"]);
							$('.ResetPasswordFailureResponseMessageDiv').append("<a target='_blank' href='"+tempurl+"'>www.lenscrafters.ca</a>?").show();
						}else{
							if (serviceResponse.errorMessage) {
								if($(modalForError).length > 0){
									$(modalForError).html(serviceResponse.errorMessage);
								}
							} else {
								if (serviceResponse.errorMessageKey) {
									if($(modalForError).length > 0){
										$(modalForError).html(serviceResponse.errorMessageKey);
									}
								}
							}
						}
					}
				}catch(e){
					console.error(e);
				}
			}
		}
	});
	
	return promiseObj;
}

function showPassword(id){
	var x = document.getElementById(id);
	var icon = document.getElementById(id + '-icon');
	if (x.type === "password") {
		x.type = "text";
		icon.querySelector("use").setAttribute('href', '#eye-icon-hide');
	} else {
		x.type = "password";
		icon.querySelector("use").setAttribute('href', '#eye-icon-show');
	}
}

function resetPswMobile() {
	var f = $('.ResetPasswordUpdateSubmitForm');
	var currentTime = new Date().valueOf();
	var timeDiff = currentTime - startTime;
	var sessiontimeOut = $('.sessionDuration').val() || '';
	if(timeDiff >= sessiontimeOut && sessiontimeOut != ''){
		
		window.location.reload();
	}else{
		var data = f.serializeArray(),
		newData = [{name: 'logonId', value: logonId}],
		originalURL = null;
	
		$('#successPassword').hide();
		
		// since this is a jsonp request, we always set the destination
		// URL to a jsonp-compatible page
		for (var i = 0; i < data.length; i++){
			var d = data[i];
			if (d['name'] == 'URL'){
				originalURL = d['value'];
				
				newData.push({
					name: 'URL',
					value: 'ResetPasswordAjaxView'
				});
			}else{
				newData.push(d);
			}
		}
		
		$.ajax({
			url: getAbsoluteURL(true) + 'ResetPassword',
			data: newData,
			type: 'POST',
			dataType: 'json',
			success: function(data) {
				
				if(data.success) {
					// If success message is on page, then we are not in
					// the global header.
					if($('#successPassword').html() == null){ 
					var nextUrl = originalURL;
                       if (nextUrl != null && nextUrl.length && nextUrl.charAt(nextUrl.length - 1) == "#") {
                            nextUrl = nextUrl.substring(0, x.length - 1)
                        }
                       
                        window.location = nextUrl
					}else{
                        $('#successPassword').show();
					}
				}
				else {
					$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) { // unexpected
																// error
																// case
																// -
																// system
																// error
				$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
			}
		});
	}	
}

$('document').ready(function () {
	
	if($.validator != undefined){
		
	$.validator.addMethod("atLeastOneLetterAndOneDigit", function(value, element){
		var regex = /^(?=.*[0-9])(?=.*[a-zA-Z])(.*)$/;
		return regex.test(value);
	});
	
	$('.ResetPasswordUpdateSubmitForm').validate({
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonId: {
				required: true,
				email: true,
			},
			logonTempPassword: {
				required: true,
				minlength: 2,
			},
			logonPassword: {
				required: true,
				minlength: 8,
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true,
			},
			logonPasswordVerify: {
				required: true,
				equalTo: '#new-password',
			}
		},
		messages: {
			logonId: {
				required: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
				email: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
			},
			logonTempPassword: {
				required: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
				minlength: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
			},
			logonPassword: {
				required: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				minlength: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
			},
			logonPasswordVerify: {
				required: MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
				equalTo: MessageHelper.messages["ERROR_PASSWORD_MISMATCH"],
			}
		},
		showErrors: function(errorMap, errorList){
			console.log(errorMap, errorList);
			this.defaultShowErrors();
			// update password validation indicators
			var icons = {true: "#pass-valid", false: "#pass-invalid"};
			var value = $("#new-password").val();

			/*if (value || errorMap.logonPassword) {
				$(".passwordRequirementsDetail.minlength svg.icon use")[0].href.baseVal = icons[value.length >= 6];
				$(".passwordRequirementsDetail.atLeastOneDigit svg.icon use")[0].href.baseVal = icons[/[0-9]/.test(value)];
				$(".passwordRequirementsDetail.atLeastOneLetter svg.icon use")[0].href.baseVal = icons[/[a-zA-Z]/.test(value)];
			}*/
	    }
	});
	
	$('.UpdatePasswordUpdateSubmitForm').validate({
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
		rules: {
			logonId: {
				required: true,
				email: true,
			},
			logonTempPassword: {
				required: true,
				minlength: 2,
			},
			logonPassword: {
				required: true,
				minlength: 8,
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: true,
			},
			logonPasswordVerify: {
				required: true,
				equalTo: '.logonPassword_updateModel',
			}
		},
		messages: {
			logonId: {
				required: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
				email: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
			},
			logonTempPassword: {
				required: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
				minlength: MessageHelper.messages["OLD_PASSWORD_EMPTY_ERROR"],
			},
			logonPassword: {
				required: MessageHelper.messages["PASSWORD_MIN_LENGTH_ERROR"],
				minlength: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
				atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial: MessageHelper.messages["PASSWORD_UPDATE_INVALID_ERROR"],
			},
			logonPasswordVerify: {
				required: MessageHelper.messages["PASSWORD_UPDATE_CONFIRM_ERROR"],
				equalTo: MessageHelper.messages["ERROR_PASSWORD_MISMATCH"],
			}
		},
		errorPlacement:function (error, element) {
			if ($(element).attr('name') == 'logonPassword') {
				$(error).insertAfter($(element).closest("form").find(".check-psw"));
			} else {
				$(error).insertAfter(element);
			}

			$(error).attr ('aria-live', 'rude');
		},
		showErrors: function(errorMap, errorList){
			console.log(errorMap, errorList);
			this.defaultShowErrors();
			// update password validation indicators
			var icons = {true: "#pass-valid", false: "#pass-invalid"};
			var value = $("#new-password").val();

			/*if (value || errorMap.logonPassword) {
				$(".passwordRequirementsDetail.minlength svg.icon use")[0].href.baseVal = icons[value.length >= 6];
				$(".passwordRequirementsDetail.atLeastOneDigit svg.icon use")[0].href.baseVal = icons[/[0-9]/.test(value)];
				$(".passwordRequirementsDetail.atLeastOneLetter svg.icon use")[0].href.baseVal = icons[/[a-zA-Z]/.test(value)];
			}*/
	    }
	});

	function closeModal(){
		$('html,body').toggleClass('hidden-overflow');
		!!window.loginFlowHandler && window.loginFlowHandler.onCancel();

		$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.header-reset-password-done-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.header-update-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.background-update-reset').css('display', 'none');
		//$('.header-sign-in-modal').css('display', 'block').attr('aria-hidden', 'true');
		if($(".thank-you-page-overlay")){
			$(".thank-you-page-overlay").addClass('hidden');
		}
		$('.headerEmailAddress').focus ();
		$('.sign-in-link').removeClass("open");
		clearResetPwdErrorMessages();
		$('#myaccount-rectangle > .backdrop').addClass('hide');
		return false;
	}
	
	$('.close-reset-password').click(closeModal);
	
	$('.close-reset-cancel-password').click(function(){
	    $('.header-set-a-new-password-modal').css('display', 'none').attr('aria-hidden', 'true');
	    $('.header-reset-password-done-modal ').css('display', 'none').attr('aria-hidden', 'true');
	    $('.header-sign-in-modal').css('display', 'block').attr('aria-hidden', 'true');
	    $('.headerEmailAddress').focus ();
	    $('.sign-in-link').removeClass("open");
	    $('#myaccount-rectangle > .backdrop').addClass('hide');
	    clearResetPwdErrorMessages();
	    clearResetForgotPWDErrors();
	    return false;
	 });
	
	$('.close-reset-password-done').click(function(){
		$('.header-reset-password-done-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.sign-in-link').removeClass("open");
		return false;
	});
	
	$('.set-new-password').click(function(){
		$('.header-reset-password-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.header-set-a-new-password-modal').css('display', 'block').attr('aria-hidden', 'false');
		return false;
	});	
	
	$('.close-set-new-password').click(function(){
		$('.header-set-a-new-password-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.sign-in-link').removeClass("open");
		return false;
	});
	
	$('.ResetPasswordForm').validate({
		onfocusout: false,
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',

		rules: {
			logonId: {required:true, email:true},
		},
		messages: {
			logonId:{required: MessageHelper.messages["ERROR_Logon_model_EmailInvalid"],
			email:MessageHelper.messages["ERROR_Logon_model_EmailInvalid"]}
		}
	});
	
	$('#PasswordUpdateForm').validate({
		onkeyup: false,
		onclick: false,
		errorClass: 'required',
		errorElement: 'span',
	
		rules: {
			logonPassword :{required:true,minlength:2,pattern:/\d/},
			logonPasswordVerify : {required:true,minlength:2,pattern:/\d/,equalTo:'.logonPassword_updateModel'}
		},
		messages: {
			logonPassword :{required:MessageHelper.messages["PASSWORD_MIN_LENGTH_ERROR"],
							minlength: MessageHelper.messages["PASSWORD_MIN_LENGTH_ERROR"],
							pattern: MessageHelper.messages["PASSWORD_MIN_LENGTH_NUMERIC_ERROR"]},
			logonPasswordVerify :{required:MessageHelper.messages["PASSWORD_MIN_LENGTH_ERROR"],
								minlength: MessageHelper.messages["PASSWORD_MIN_LENGTH_ERROR"],
								pattern: MessageHelper.messages["PASSWORD_MIN_LENGTH_NUMERIC_ERROR"],
								 equalTo:MessageHelper.messages["ERROR_PASSWORD_MISMATCH"]}		
		}

		});
	
	$('.ResetPasswordUpdateSubmitForm').off('submit').on('submit', function ()  {
		resetFormSubmit($(this));
		return false;
	});
	
	$('.UpdatePasswordUpdateSubmitForm').off('submit').on('submit', function ()  {
		updateFormSubmit($(this));
		return false;
	});
	
	$('.ResetPasswordForm').keypress(function(e) {
		if(e.keyCode == 13) {
			if($('.ResetPasswordForm').valid()){
				resetPassword();
			}
			return false;
		}
		return true;
	});
	
	if($.validator != undefined){
		$.validator.addMethod("atLeastOneLetterUpperAndLowerAndOneDigitAndSpecial", function(value, element){
			var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])(.*)$/;
			return regex.test(value);
		});
	}
	
	$('.forgotPasswordLink, #forgotPassword').on('click', function() {
		clearLoginFields();
		clearLoginErrorMessages();
		$('html,body').toggleClass('hidden-overflow');
		$('.examSignInModal').dialog('close');
		$('.header-sign-in-modal').css('display', 'none').attr('aria-hidden', 'true');
		$('.header-reset-password-modal').css('display', 'block').attr('aria-hidden', 'false');
		$('.sign-in-link').addClass("open");
		$('#myaccount-rectangle > .backdrop').removeClass('hide');
		$('#myaccount-rectangle').removeClass('hide');
		$('.WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1').focus();
		return false;
	});
	
	function updateFormSubmit(form){
		var f = $(form);
		var currentTime = new Date().valueOf();
		startTime = new Date().valueOf();
		var timeDiff = currentTime - startTime;
		var sessiontimeOut = $('.sessionDuration').val() || '';
		if(timeDiff >= sessiontimeOut && sessiontimeOut != ''){
			
			window.location.reload();
		}else{
			if(f.valid()){
			$('#successPassword').hide();
			
			var logonId = $("#passwordUpdateEmailInput").val();
			var logonPassword = f.find('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').val();
			var errorViewName = 'LogonAjaxView';
			var reLogonURL = 'LogonAjaxView';
			var rememberMe = 'true';
			var url = 'LogonAjaxView';
			var temp_signinPassword = '';
			var autoPopulatedEmail = f.find('.autoPopulatedEmailHiddenDesktop').val();
			
			if(!constants.ajaxParams.loggedIn){
				var logonAjaxData = {
					'storeId': constants.ajaxParams['storeId'],
					'catalogId': constants.ajaxParams['catalogId'],
					'langId': constants.ajaxParams['langId'],
					'logonId': logonId,
					'logonPassword': logonPassword,
					'errorViewName': errorViewName,
					'reLogonURL': reLogonURL,
					'rememberMe': rememberMe,
					'URL': url,
					'temp_signinPassword': temp_signinPassword
				};
				var url = 'LogonAjax';
				$.ajax({
					url: getAbsoluteURL(true) +  url,
					data: logonAjaxData,
					type: 'POST',
					dataType: 'json',
					success: function(response) {
					/*
					 * if(response.passwordExpired && response.passwordExpired ==
					 * '1') { $('.header-sign-in-modal').css('display',
					 * 'none').attr('aria-hidden', 'true');
					 * $('.header-set-a-new-password-modal').attr('aria-hidden',
					 * 'true').css("display", "block"); } else
					 * if(fromSubmitReview){ window.location = ReviewSuccessURL; }
					 * else
					 */
					if(response.success) {
						var data = $('.UpdatePasswordUpdateSubmitForm').serializeArray(),
						newData = [{name: 'logonId', value: logonId}],
						originalURL = null;
						myperksURL = null;
						// since this is a jsonp request, we always set the
						// destination URL to a jsonp-compatible page
						for (var i = 0; i < data.length; i++){
							var d = data[i];
							if (d['name'] == 'URL'){
								originalURL = d['value'];
								
								newData.push({
									name: 'URL',
									value: 'ResetPasswordAjaxView'
								});
							}else{
								newData.push(d);
							}
						}
						
						$.ajax({
							url: getAbsoluteURL(true) + 'ResetPassword',
							data: newData,
							type: 'POST',
							dataType: 'json',
							success: function(data) {
								
								if(data.success) {
									
									if ($('#guestShopperContinue')[0]) {
										var userType = document.getElementById("userType").value;
							            var nextStepURL = document.getElementById("nextStepURL").value;
							            var PhysicalStoreSelectionURL = document.getElementById("PhysicalStoreSelectionURL").value;
							            setTimeout(function() {
							                if (CheckoutHelperJS.canCheckoutContinue(userType) && CheckoutHelperJS.updateShoppingCart(document.ShopCartForm, true)) {
							                    ShipmodeSelectionExtJS.guestShopperContinue(nextStepURL, PhysicalStoreSelectionURL);
							                }
							            }, 500);
									}
									
									if ($('.schedule-exam-reset')[0]) {
										sessionStorage.setItem('psw_reset', $('#new-password-update').val());
										$('.background-update-reset').css('display', 'block');
										$('.schedule-exam-reset')[0].click();
									} else {
										var nextUrl = '/myAccount?myAcctMain=1&catalogId=' + catalogId + '&langId=' + langId + '&registration=true&storeId=' + storeId;
										utagLinkSafe({link_name:"login"});
										window.location = nextUrl;
									}
								}
								else {
									$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
								}
							},
							error: function(jqXHR, textStatus, errorThrown) { // unexpected
																				// error
																				// case
																				// -
																				// system
																				// error
								$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
							}
						});			
					}
					else {
						if(response.errorCode == '20101'){
							$('.WC_PasswordUpdateForm_FormInput_EmailAddress').addClass('required').removeClass('valid resetHighlight');
						}else if(response.errorCode == '20301'){
							$('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').addClass('required').removeClass('valid resetHighlight');
						}
						$('.PasswordUpdateFailureResponseMessageDiv').html(response.errorMessage).show();
					}
					},
					error: function(jqXHR, textStatus, errorThrown) { // unexpected
																		// error
																		// case
																		// -
																		// system
																		// error
						$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.').show();
					}
				});
				
				}else{
					if(logonId != autoPopulatedEmail){
						$('.WC_PasswordUpdateForm_FormInput_EmailAddress').addClass('required').removeClass('valid resetHighlight');
						$('.PasswordUpdateFailureResponseMessageDiv').html("Your email address is incorrect, please try again.").show();
					}else{
						var data = $('.ResetPasswordUpdateSubmitForm').serializeArray(),
						newData = [{name: 'logonId', value: logonId}],
						originalURL = null;
						myperksURL = null;
						// since this is a jsonp request, we always set the
						// destination URL to a jsonp-compatible page
						for (var i = 0; i < data.length; i++){
							var d = data[i];
							if (d['name'] == 'URL'){
								originalURL = d['value'];
								
								newData.push({
									name: 'URL',
									value: 'ResetPasswordAjaxView'
								});
							}else{
								newData.push(d);
							}
						}

						newData.push({name: 'logonId', value: logonId});
						
						$.ajax({
							url: getAbsoluteURL(true) + 'ResetPassword',
							data: newData,
							type: 'POST',
							dataType: 'json',
							success: function(data) {
								
								if(data.success) {
									// If success message is on page, then we
									// are not in the global header.
									var nextUrl = $('#headerMyAccountURL').val();
									utagLinkSafe({link_name:"login"});
									window.location = nextUrl;
								}
								else {
									$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
								}
							},
							error: function(jqXHR, textStatus, errorThrown) { // unexpected
																				// error
																				// case
																				// -
																				// system
																				// error
								$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
							}
						});	
					}
				}
			}
		}
	}
	
	function resetFormSubmit(form){
		var f = $(form);
		var currentTime = new Date().valueOf();
		startTime = new Date().valueOf();
		var timeDiff = currentTime - startTime;
		var sessiontimeOut = $('.sessionDuration').val() || '';
		if(timeDiff >= sessiontimeOut && sessiontimeOut != ''){
			
			window.location.reload();
		}else{
			if(f.valid()){
			$('#successPassword').hide();
			
			var logonId = $("#passwordUpdateEmailInput").val(); // Qui non mi arriva se apro una nuova sessione
			
			if(!logonId){
				logonId = $('form[name="ResetPasswordUpdateSubmitForm"] > #passwordUpdateEmailInput').val();
			}
			
			var logonPassword = f.find('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').val();
			var errorViewName = 'LogonAjaxView';
			var reLogonURL = 'LogonAjaxView';
			var rememberMe = 'true';
			var url = 'LogonAjaxView';
			var temp_signinPassword = '';
			var differentErrorMessgaeRequired = 'true';
			var autoPopulatedEmail = f.find('.autoPopulatedEmailHiddenDesktop').val();
			
			if(!constants.ajaxParams.loggedIn){
				var logonAjaxData = {
					'storeId': constants.ajaxParams['storeId'],
					'catalogId': constants.ajaxParams['catalogId'],
					'langId': constants.ajaxParams['langId'],
					'logonId': logonId,
					'logonPassword': logonPassword,
					'errorViewName': errorViewName,
					'reLogonURL': reLogonURL,
					'rememberMe': rememberMe,
					'URL': url,
					'temp_signinPassword': temp_signinPassword,
					'differentErrorMessgaeRequired': differentErrorMessgaeRequired
				};
				var url = 'LogonAjax';
				$.ajax({
					url: getAbsoluteURL(true) +  url,
					data: logonAjaxData,
					type: 'POST',
					dataType: 'json',
					success: function(response) {
					/*
					 * if(response.passwordExpired && response.passwordExpired ==
					 * '1') { $('.header-sign-in-modal').css('display',
					 * 'none').attr('aria-hidden', 'true');
					 * $('.header-set-a-new-password-modal').attr('aria-hidden',
					 * 'true').css("display", "block"); } else
					 * if(fromSubmitReview){ window.location = ReviewSuccessURL; }
					 * else
					 */ if(response.success) {
						var data = $('.ResetPasswordUpdateSubmitForm').serializeArray(),
						newData = [{name: 'logonId', value: logonId}],
						originalURL = null;
						myperksURL = null;
						// since this is a jsonp request, we always set the
						// destination URL to a jsonp-compatible page
						for (var i = 0; i < data.length; i++){
							var d = data[i];
							if (d['name'] == 'URL'){
								originalURL = d['value'];
								
								newData.push({
									name: 'URL',
									value: 'ResetPasswordAjaxView'
								});
							}else{
								newData.push(d);
							}
						}

						newData.push({name: 'logonId', value: logonId});
						
						$.ajax({
							url: getAbsoluteURL(true) + 'ResetPassword',
							data: newData,
							type: 'POST',
							dataType: 'json',
							success: function(data) {
								
								if(data.success) {
									if (!!window.loginFlowHandler) {
										window.loginFlowHandler.onSuccess();
										closeModal();
										return;
									}
									var nextUrl = originalURL || '/account';
									utagLinkSafe({link_name:"login"});
									window.location = nextUrl;
								}
								else {
									$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
								}
							},
							error: function(jqXHR, textStatus, errorThrown) { // unexpected
																				// error
																				// case
																				// -
																				// system
																				// error
								$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
							}
						});			
					}
					else {
						if(response.errorCode == '20101'){
							$('.WC_PasswordUpdateForm_FormInput_EmailAddress').addClass('required').removeClass('valid resetHighlight');
						}else if(response.errorCode == '20301'){
							$('.WC_PasswordUpdateForm_FormInput_logonPasswordOld_In_Logon_1').addClass('required').removeClass('valid resetHighlight');
						}
						$('.PasswordUpdateFailureResponseMessageDiv').html(response.errorMessage).show();
					}
					},
					error: function(jqXHR, textStatus, errorThrown) { // unexpected
																		// error
																		// case
																		// -
																		// system
																		// error
						$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.').show();
					}
				});
				
				}else{
					if(logonId != autoPopulatedEmail){
						$('.WC_PasswordUpdateForm_FormInput_EmailAddress').addClass('required').removeClass('valid resetHighlight');
						$('.PasswordUpdateFailureResponseMessageDiv').html("Your email address is incorrect, please try again.").show();
					}else{
						var data = $('.ResetPasswordUpdateSubmitForm').serializeArray(),
						newData = [{name: 'logonId', value: logonId}],
						originalURL = null;
						myperksURL = null;
						// since this is a jsonp request, we always set the
						// destination URL to a jsonp-compatible page
						for (var i = 0; i < data.length; i++){
							var d = data[i];
							if (d['name'] == 'URL'){
								originalURL = d['value'];
								
								newData.push({
									name: 'URL',
									value: 'ResetPasswordAjaxView'
								});
							}else{
								newData.push(d);
							}
						}
						
						$.ajax({
							url: getAbsoluteURL(true) + 'ResetPassword',
							data: newData,
							type: 'POST',
							dataType: 'json',
							success: function(data) {
								
								if(data.success) {
									if (!!window.loginFlowHandler) {
										window.loginFlowHandler.onSuccess();
										closeModal();
										return;
									}
									// If success message is on page, then we
									// are not in the global header.
									var nextUrl = $('#headerMyAccountURL').val();
									utagLinkSafe({link_name:"login"});
									window.location = nextUrl;
								}
								else {
									$('.PasswordUpdateFailureResponseMessageDiv').html(data.errorMessage);
								}
							},
							error: function(jqXHR, textStatus, errorThrown) { // unexpected
																				// error
																				// case
																				// -
																				// system
																				// error
								$('.PasswordUpdateFailureResponseMessageDiv').html('Reset password update failed - please try again later.');
							}
						});	
					}
				}
			}
		}
	}
		
	function resetPassword(){
		var resetForm= document.ResetPasswordForm;
		
		if(resetForm.logonId.value == ""){
			resetForm= $("#favoriteSignInModal .ForgotPasswordSection .ResetPasswordForm")[0];
		}
		
		var params = {};
		params.challengeAnswer = resetForm.challengeAnswer.value
		params.state = resetForm.state.value
		params.URL = resetForm.URL.value
		params.errorViewName = resetForm.errorViewName.value
		params.logonId =resetForm.logonId.value 
		params.email1 = resetForm.logonId.value
		params.emailType = "forgotpassword";
		params.senderEmail = resetForm.logonId.value;
		params.senderName = resetForm.logonId.value;
		params.email1 = resetForm.logonId.value;
		params.receiveEmail = "true";
		params.recipientEmail = resetForm.logonId.value;
		params.receiveEmail = "true";
		params.fromName = resetForm.logonId.value;
		params.pdp_18yrs = "true";
		params.storeId = resetForm.storeId.value;
		
		if(!params.logonId){
			params.logonId = sessionStorage.getItem('resendEmail');
		}
		if(!params.email1){
			params.email1 = sessionStorage.getItem('resendEmail');
		}
		if(!params.senderEmail){
			params.senderEmail = sessionStorage.getItem('resendEmail');
		}
		if(!params.senderName){
			params.senderName = sessionStorage.getItem('resendEmail');
		}
		if(!params.email1){
			params.email1 = sessionStorage.getItem('resendEmail');
		}
		if(!params.recipientEmail){
			params.recipientEmail = sessionStorage.getItem('resendEmail');
		}
		if(!params.fromName){
			params.fromName = sessionStorage.getItem('resendEmail');
		}
		
		invokeResetPasswordService(params,true);
		sessionStorage.setItem('resendEmail', resetForm.logonId.value);
	}
	
	$('.LogOnModalSubmitButton').click(function() {
		logonFormSubmit($(this).parents('form'));
		
		var emailIdToAutoPopulate = document.getElementsByClassName('headerEmailAddress')[0].value;
		if(emailIdToAutoPopulate){
			document.getElementsByClassName('WC_PasswordUpdateForm_FormInput_EmailAddress').value=emailIdToAutoPopulate;
			document.getElementsByClassName('autoPopulatedEmailHiddenDesktop').value=emailIdToAutoPopulate;
		}
		
		return false;
	});

	$('.passwordResetSubmitButton, .passwordResetResendButton').off('click').on('click', function() {
		$('.ResetPasswordFailureResponseMessageDiv').css('display', 'none').attr('aria-hidden', 'false');
		if(document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')!=null && document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')[0].value !='Enter your email address'){
			var currentID = document.getElementsByClassName('currentID');
			if(currentID!=null){
				currentID.value = document.getElementsByClassName('WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1')[0].value;
			}			
		}
		if($('.ResetPasswordForm').valid()){
			resetPassword();
			$('.ResetPasswordForm .WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1').removeClass("error");
			$('.ResetPasswordForm .icon-error-field').css('display','none');
			$('.empty-email-message').addClass("hide");
			$('.invalid-email-message').addClass("hide");
		}else{
			$('.ResetPasswordForm .WC_PasswordResetForm_FormInput_logonId_In_ResetPasswordForm_1').addClass("error");
			$('.ResetPasswordForm .icon-error-field').css('display','block');
			if(!$('.ResetPasswordForm #logonId').val()) {
				$('.empty-email-message').removeClass("hide");
				$('.invalid-email-message').addClass("hide");
			}
			if($('.ResetPasswordForm #logonId').val()) {
				$('.empty-email-message').addClass("hide");
				$('.invalid-email-message').removeClass("hide");
			}
		}
		return false;
	});
	
	function checkPassword() {
		var value = document.getElementById('new-password-create').value;
		var icons = {true: "#pass-valid", false: "#pass-invalid"};
		$(".passwordRequirementsDetailTYP.minlength svg.icon use")[0].href.baseVal = icons[value.length >= 6];
		$(".passwordRequirementsDetailTYP.atLeastOneDigit svg.icon use")[0].href.baseVal = icons[/[0-9]/.test(value)];
		$(".passwordRequirementsDetailTYP.atLeastOneLetter svg.icon use")[0].href.baseVal = icons[/[a-zA-Z]/.test(value)];
	}
	
	$('.setNewPassword').click(function(){
		// show email input field if user came from email link
		if (!window.sessionStorage.resendEmail) {
			$('.logon-email').hide();
		} else {
			$('.logon-email').text(window.sessionStorage.resendEmail);
			$('.logon-email').show();
			$("#passwordUpdateEmailInput").val(window.sessionStorage.resendEmail);
			$("#passwordUpdateEmailInputContainer").hide();
		}
		
		/*
		 * OLD
		// reset new password validation indicators
		$(".passwordRequirementsDetail.minlength svg.icon use")[0].href.baseVal = "#pass-placeholder";
		$(".passwordRequirementsDetail.atLeastOneLetter svg.icon use")[0].href.baseVal = "#pass-placeholder";
		$(".passwordRequirementsDetail.atLeastOneDigit svg.icon use")[0].href.baseVal = "#pass-placeholder";
		*/
		
		$('.header-set-a-new-password-modal').css('display', 'block').attr('aria-hidden', 'false');
		document.getElementsByClassName('WC_PasswordUpdateForm_FormInput_EmailAddress').value=document.getElementsByClassName('currentID').value;
	});
	}
});

function removeDisabledAttr(){
	$('#shippingBillingPageNext').removeAttr('disabled');
}

function updateDateInput(){
	$(".expdateFinal").val($("select[name='payment_expire_1']").val() + '/'+
			$("select[name='payment_expire_2']").val().slice(2,4)).change();
	removeDisabledAttr();
}

function savePlacement(){
	currentTopPosition = $(window).scrollTop();
}

function getPlacement(){
	return currentTopPosition;
}
