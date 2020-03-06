// JavaScript source code
// v23_hcc.js contains all code that is specific to the v23 coding model vs other models.Right now this is just interactions


function v23_interactions(ccs, disabl, age = '') {
    /*
    Calculated interaction HCCs given a dict of hccs, age, and disability flag
    :param ccs: List of HCCs in the format "HCC18" no trumping or cleaning of HCCs is done in this function
    :param disabl: CMS disabled flag
    :param age: Optional age of beneficiary; only one interaction uses age and it will be assumed false if not entered
    :return: List of HCC codes, including interaction codes
    */
    var cc_set = new Set(ccs);
    var int_hccs = {};

    // diagnostic categories

    var diag_cats = {
        "CANCER": new Set(["HCC8", "HCC9", "HCC10", "HCC11", "HCC12"]),
        "DIABETES": new Set(["HCC17", "HCC18", "HCC19"]),
        "CARD_RESP_FAIL": new Set(["HCC82", "HCC83", "HCC84"]),
        "CHF": new Set(["HCC85"]),
        "gCopdCF": new Set(["HCC110", "HCC111", "HCC112"]),
        "RENAL_V23": new Set(["HCC134", "HCC135", "HCC136", "HCC137","HCC138"]),
        "SEPSIS": new Set(["HCC2"]),
        "gSubstanceAbuse_V23": new Set(["HCC54", "HCC55","HCC56"]),
        "gPsychiatric_V23": new Set(["HCC57", "HCC58","HCC59", "HCC60"])
    };

    var my_dcs = {};

    for (var key in diag_cats) {
        if (diag_cats.hasOwnProperty(key)) {
            var key_set = new Set(diag_cats[key])
            var new_values = new Set([...key_set].filter(x => cc_set.has(x)));
            my_dcs[key] = new_values;
        }
    
    }
    // Community Interactions
    int_hccs["HCC47_gCancer"] = my_dcs["CANCER"] && new Set([...new Set(["HCC47"])].filter(x => cc_set.has(x)));
    int_hccs["HCC85_gDiabetesMellit"] = my_dcs["DIABETES"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));
    int_hccs["HCC85_gCopdCF"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));
    int_hccs["HCC85_gRenal_V23"] = my_dcs["RENAL_V23"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));
    int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];
    int_hccs["HCC85_HCC96"] = new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC96"])].filter(x => cc_set.has(x)));
    int_hccs["gSubstanceAbuse_gPsychiatric_V23"] = my_dcs["gPsychiatric_V23"] && my_dcs["gSubstanceAbuse_V23"];

    // institutional model interactions
    int_hccs["PRESSURE_ULCER"] = new Set([...new Set(["HCC157", "HCC158"])].filter(x => cc_set.has(x)));
    int_hccs["CHF_gCopdCF"] = my_dcs["CHF"] && my_dcs["gCopdCF"];
    int_hccs["gCopdCF_CARD_RESP_FAIL"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];
    int_hccs["SEPSIS_PRESSURE_ULCER"] = my_dcs["SEPSIS"] && int_hccs["PRESSURE_ULCER"];
    int_hccs["SEPSIS_ARTIF_OPENINGS"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x)));
    int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];
    int_hccs["DIABETES_CHF"] = my_dcs["DIABETES"] && my_dcs["CHF"];
    int_hccs["gCopdCF_ASP_SPEC_B_PNEUM"] = my_dcs["gCopdCF"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));
    int_hccs["ASP_SPEC_BACT_PNEUM_PRES_ULC"] = new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];
    int_hccs["SEPSIS_ASP_SPEC_BACT_PNEUM"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC114"])].filter(x => cc_set.has(x)));
    int_hccs["SCHIZOPHRENIA_gCopdCF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["gCopdCF"];
    int_hccs["SCHIZOPHRENIA_CHF"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && my_dcs["CHF"];
    int_hccs["SCHIZOPHRENIA_SEIZURES"] = new Set([...new Set(["HCC57"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC79"])].filter(x => cc_set.has(x)));

    if (typeof disabl !== 'undefined') {
        int_hccs["DISABLED_HCC85"] = new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));
        int_hccs["DISABLED_PRESSURE_ULCER"] = int_hccs["PRESSURE_ULCER"];
        int_hccs["DISABLED_HCC161"] = new Set([...new Set(["HCC161"])].filter(x => cc_set.has(x)));
        int_hccs["DISABLED_HCC39"] = new Set([...new Set(["HCC39"])].filter(x => cc_set.has(x)));
        int_hccs["DISABLED_HCC77"] = new Set([...new Set(["HCC77"])].filter(x => cc_set.has(x)));
        int_hccs["DISABLED_HCC6"] = new Set([...new Set(["HCC6"])].filter(x => cc_set.has(x)));

        if (typeof age !== 'undefined' && age < 65) {
            int_hccs["disable_substAbuse_psych_V23"] = int_hccs["gSubstanceAbuse_gPsychiatric_V23"]
        }
    }

    var int_hccs_new = [];
    for (var key in int_hccs) {
       if (int_hccs.hasOwnProperty(key)) {
            if (int_hccs[key].size !== 0) {
                int_hccs_new.push(key);
            }
        }
    }
    
    return ccs.concat(int_hccs_new)
}
