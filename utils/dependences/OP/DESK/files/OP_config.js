window.ct_CRMBanner_data = {
    banners: {
        smsReminder:{
            priority: 1,
            pages: [],
            script: {
                fnBanner : (email) => {fn_SMSBanner(email)}
            },
            ctaSelector: "#HP_crm_sms_popup #HpSMSSubmitBtn"
        }
    },
    pathScript: "https://media.oliverpeoples.com/utilities/CRMBanners/OP/banner.min.js",
    pages:{
        HP: "Home",
        PLP: "Plp",
        TY: "Thankyou",
        Cart: "CartPage"
    }
}

