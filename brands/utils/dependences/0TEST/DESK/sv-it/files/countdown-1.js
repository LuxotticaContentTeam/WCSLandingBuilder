const ct_countdown_SV = {

    init() {

        var ct_DateDelta, ct_DateDays, ct_DateHours, ct_DateMinutes, ct_DateSeconds, ct_DateDeltaTemp;

        this.options = {
            year: new Date().getFullYear(),
            displayDays: true,
            displaySeconds: true,
            durationDays: 1,
            TwoDigitNumbers: true,

            translations: false,

            dividers: " ",
            textdays: "D",
            texthours: "H",
            textminutes: "M",
            textseconds: "S",

            selector: ".ct-countdown--dynamic",

            wrapWithLink: false,

            messages: []
        };

        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = ct_countdown_SV.extendDefaultsOptions(this.options, arguments[0]);
        }

        if ( this.options.translations ) {
            ct_countdown_SV.insertTranslations();
        }

        if ( this.options.messages.length !== 0 ) {
            this.options.selectorCount = this.options.selector + ' .ct-countdown--count';

            ct_countdown_SV.changeMessage( this.options.messages, "default" );
        } else {
            this.options.selectorCount = this.options.selector;
        }

        let ct_DateTempNow = Date.now();

        let ct_DateEnd = new Date(Date.UTC( ( this.options.year || ct_DateTempNow.getFullYear() ), (this.options.month - 1), this.options.day, this.options.hour, ( this.options.minute || 0 ) ) );

        let ct_DateTempEnd = ct_DateEnd.getTime() - ((this.options.timezone * 60) * 60000);

        ct_DateDelta = Math.floor( (ct_DateTempEnd - ct_DateTempNow) / 1000 );

        $('html').addClass(this.options.htmlClass || 'ct-countdown--active');

        ct_countdown_SV.calculate(ct_DateDelta);

        return console.log("%cCountdown started: ends " + ct_DateEnd, "background: green; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");

    },

    calculate(ct_DateDelta) {

        ct_DateDeltaTemp = ct_DateDelta;

        ct_DateDays = Math.floor(ct_DateDeltaTemp / 86400);
        if ( this.options.displayDays !== false ) {
            ct_DateDeltaTemp -= ct_DateDays * 86400;
        }

        ct_DateHours = Math.floor(ct_DateDeltaTemp / 3600);
        ct_DateDeltaTemp -= ct_DateHours * 3600;

        ct_DateMinutes = Math.floor(ct_DateDeltaTemp / 60) % 60;
        ct_DateDeltaTemp -= ct_DateMinutes * 60;

        ct_DateSeconds = ct_DateDeltaTemp % 60;

        if ( this.options.TwoDigitNumbers ) {
            
            if ( ct_DateDays < 10 ) {
                ct_DateDays = '0' + ct_DateDays;
            }
            if ( ct_DateHours < 10 ) {
                ct_DateHours = '0' + ct_DateHours;
            }
            if ( ct_DateMinutes < 10 ) {
                ct_DateMinutes = '0' + ct_DateMinutes;
            }
            if ( ct_DateSeconds < 10 ) {
                ct_DateSeconds = '0' + ct_DateSeconds;
            }
        }

        if ( ct_DateDelta >= 0 ) {

            if (ct_DateDays < this.options.durationDays ) {

                let ct_cwToPrint = '' + ct_DateHours + '' + (this.options.texthours || 'H') + '' + (this.options.dividers || '') + '' + ct_DateMinutes + '' + (this.options.textminutes || 'M');

                if ( this.options.displayDays !== false ) {
                    ct_cwToPrint = '' + ct_DateDays + '' + (this.options.textdays || 'D') + '' + (this.options.dividers || '') + '' + ct_cwToPrint;
                }
                if ( this.options.displaySeconds !== false ) {
                    ct_cwToPrint = ct_cwToPrint + '' + (this.options.dividers || '') + '' + ct_DateSeconds + '' + (this.options.textseconds || 'S');
                }


                if ( this.options.messages.length !== 0 && ( ( ct_DateHours === 23 && ct_DateMinutes === 59 && ct_DateSeconds === 59 ) || ( $( ct_countdown_SV.options.selector ).hasClass('ct-countdown--message-' + this.options.messages[0].day[0]) && !$( ct_countdown_SV.options.selector ).hasClass('ct-countdown--message-changed') ) ) ) {

                    ct_countdown_SV.changeMessage( this.options.messages, ct_DateDays );

                }

                ct_countdown_SV.print( ct_cwToPrint );

            }

            setTimeout(function(){
                ct_DateDelta--;
                ct_countdown_SV.calculate(ct_DateDelta);
            }, 999);
        } else {
            ct_countdown_SV.options.finalEvent() || $( ct_countdown_SV.options.selector ).html( "" );
            console.log("%cCountdown finished", "background: red; color: white; display: inline-block; border-radius: 2px; padding: 2px 5px;");
            $('html').removeClass(this.options.htmlClass || 'ct-countdown--active');
        }

    },

    print( textToPrint ) {

        $( ct_countdown_SV.options.selectorCount ).html( textToPrint );

    },

    changeMessage( messagesToPrint, currentDay ) {

        if ( currentDay == "default" ) {

            $( ct_countdown_SV.options.selector ).html( ct_countdown_SV.composeMessage( messagesToPrint[0].text ) );
            $( ct_countdown_SV.options.selector ).addClass('ct-countdown--message-' + messagesToPrint[0].day[0] );

            if ( this.options.messages.length === 1 ) {
                $( ct_countdown_SV.options.selector ).addClass('ct-countdown--message-changed');
            }

        } else {

            $( ct_countdown_SV.options.selector ).removeClass( 'ct-countdown--message-changed' );

            for (var differentMessages in messagesToPrint) {

                if ( messagesToPrint[differentMessages].day.length == 1 && currentDay == messagesToPrint[differentMessages].day[0] ) {

                    $( ct_countdown_SV.options.selector ).html( ct_countdown_SV.composeMessage( messagesToPrint[differentMessages].text ) );
                    $( ct_countdown_SV.options.selector ).addClass('ct-countdown--message-' + messagesToPrint[differentMessages].day[0] + ' ct-countdown--message-changed');

                } else if ( messagesToPrint[differentMessages].day.length == 2 && currentDay <= messagesToPrint[differentMessages].day[0] && currentDay >= messagesToPrint[differentMessages].day[1] ) {

                    $( ct_countdown_SV.options.selector ).html( ct_countdown_SV.composeMessage( messagesToPrint[differentMessages].text ) );
                    $( ct_countdown_SV.options.selector ).addClass('ct-countdown--message-' + messagesToPrint[differentMessages].day[0] + '-' + messagesToPrint[differentMessages].day[1] + ' ct-countdown--message-changed');

                } else {

                    $( ct_countdown_SV.options.selector ).html( ct_countdown_SV.composeMessage( messagesToPrint[0].text ) );
                    $( ct_countdown_SV.options.selector ).addClass('ct-countdown--message-' + messagesToPrint[0].day[0] );

                }


            }
        }

    },

    composeMessage( messageText ) {

        let currentTextToPrint = '<span class="ct-countdown--count"></span>';

        if ( messageText.before ) {
            currentTextToPrint = '<span class="ct-countdown--text-before">' + messageText.before + '</span>' + currentTextToPrint;
        }
        if ( messageText.after ) {
            currentTextToPrint = currentTextToPrint + '<span class="ct-countdown--text-after">' + messageText.after + '</span>';
        }

        if ( ct_countdown_SV.options.wrapWithLink ) {
            currentTextToPrint = '<a href="'+ct_countdown_SV.options.wrapLink.homePageURL+'/'+ct_countdown_SV.options.wrapLink.url+'" data-element-id="'+ct_countdown_SV.options.wrapLink.dataElementId+'" data-description="'+ct_countdown_SV.options.wrapLink.dataDescription+'" aria-label="'+ct_countdown_SV.options.wrapLink.ariaLabel+'">' + currentTextToPrint + '</a>';
        }

        return currentTextToPrint;

    },

    insertTranslations() {
        for ( var property in ct_countdown_SV.options ) {
            if ( typeof ct_countdown_SV.options[property] === "object" && ct_countdown_SV.options[property] !== null && property !== "messages" && property !== "wrapLink" ) {
                ct_countdown_SV.options[property] = ct_countdown_SV.options[property][ct_countdown_SV.options.translationsFrom];
            }
            if ( property == "messages" && ct_countdown_SV.options[property].length !== 0 ) {
                for ( var days in ct_countdown_SV.options[property] ) {
                    for (var messages in ct_countdown_SV.options[property][days].text ) {
                        if ( typeof ct_countdown_SV.options[property][days].text[messages] === "object" && ct_countdown_SV.options[property][days].text[messages] !== null ) {
                            ct_countdown_SV.options[property][days].text[messages] = ct_countdown_SV.options[property][days].text[messages][ct_countdown_SV.options.translationsFrom];
                        }
                    }
                }
            }
            if ( property == "wrapLink" && ct_countdown_SV.options[property].length !== 0 ) {
                for (var subProp in ct_countdown_SV.options[property] ) {
                    if ( typeof ct_countdown_SV.options[property][subProp] === "object" && ct_countdown_SV.options[property][subProp] !== null ) {
                        ct_countdown_SV.options[property][subProp] = ct_countdown_SV.options[property][subProp][ct_countdown_SV.options.translationsFrom];
                    }
                }
            }
        }
    },

    extendDefaultsOptions(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

};


