var default_dxmap, default_hccmap, default_hcccoefn;
fetch('https://pnchakravarthula.github.io/epicc.github.io/dist/load_dxmap.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here
    default_dxmap = data;
  })
  .catch(err => {
    // Do something for an error here
  });
fetch('https://pnchakravarthula.github.io/epicc.github.io//dist/load_hccmap.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here
    default_hccmap = data;
  })
  .catch(err => {
    // Do something for an error here
  });
fetch('https://pnchakravarthula.github.io/epicc.github.io//dist/load_hcccoefn.json')
  .then(response => {
    return response.json();
  })
  .then(data => {
    // Work with JSON data here
    default_hcccoefn = data;
  })
  .catch(err => {
    // Do something for an error here
  });
var default_ver = 'v23';
var default_model = 'CNA'; 
var default_baserate = 868.0;
var default_verbose = true;
var default_never_trump = 0;
var interactions = {'v22': v22_interactions, 'v23': v23_interactions, 'v24': v24_interactions};

/**
 * Utility to calculate raf from list of DX codes
 * @customfunction
 * @param {string[][]} dx_array accepts array of dx codes
 */
function dx_raf(dx_array, age = 0, ver = '', model = '', sex = '', disabl = false, verbose = false, never_trump = 0, baserate = 0.0) {
  /*
  Utility to calculate raf from list of DX codes
  */
  for (i = 0; i < dx_array.length; i++) {
    for (j = 0; j < dx_array[i].length; j++) {
      dx_array = dx_array;
    }
  }
  var temp_dx_array = dx_array.toString();
  temp_dx_array = temp_dx_array.split(",");

  var raf_value = dx2raf(temp_dx_array, age, ver, model, sex, disabl, verbose, never_trump, baserate);
  return raf_value.toString();
}

/**
 * Convert string to list, dedupe, and ensure DX are formatted correctly.
 * @customfunction
 * @param {string[][]} dx_array accepts array of dx codes
 */
function clean_dx(dx_array, ver = '') {
  // Convert string to list, dedupe, and ensure DX are formatted correctly.
  for (i = 0; i < dx_array.length; i++) {
    for (j = 0; j < dx_array[i].length; j++) {
      dx_array = dx_array;
    }
  }
  var temp_dx_array = dx_array.toString();
  temp_dx_array = temp_dx_array.split(",");

  var dx_values = clean_dxlist(temp_dx_array, ver);
  var dx_set_values = [];
  dx_values.forEach(v => dx_set_values.push(v));
  return dx_set_values.toString();
}

/**
 * clean hcc
 * @customfunction
 * @param {string[][]} cc_array accepts array of hcc codes
 */
function clean_cc(cc_array, ver = '') {
  for (i = 0; i < cc_array.length; i++) {
      for (j = 0; j < cc_array[i].length; j++) {
        cc_array = cc_array;
      }
  }
  var temp_cc_array = cc_array.toString();
  temp_cc_array = temp_cc_array.split(",");

  var hcc_values = clean_hcclist(temp_cc_array, ver = '');
  hcc_values = hcc_values.toString();
  return hcc_values;
}


function dx2raf(dx_list, age = 0, ver = '', model = '', sex = '', disabl = false, verbose = false, never_trump = 0, baserate = 0.0) {
  /*
  Utility to calculate raf from list of DX codes
  */
  ver = ver || default_ver;
  model = model || default_model;
  baserate = baserate || default_baserate;
  never_trump = never_trump || never_trump;

  var hccs = dx2hcc(dx_list, age, ver, sex, disabl, never_trump, verbose);
  var raf = get_raf([], hccs, ver = ver, model = model, baserate = baserate);
  return raf["hcc_score"];
}

function dx2hcc(dx_list, age = 0, ver = '', sex = '', disabl = false, never_trump = 0, verbose = false) {
  /*
  Utility to calculate a list of unique, trumped, HCCs from dx codes, includes interactions and age/sex edits.
  :param dx_list: list of str
                  List of DX Codes (case and decimal insensitive)
  :param ver: str
              HCC Model version
  :param age: float
              Beneficiary age
  :param verbose:
  :param disabl: bool
                  Disability flag
  :param sex: Gender {"M" or "F"}
  :return: list of str
          List of HCC codes
  */
  ver = ver || default_ver;
  never_trump = never_trump || default_never_trump;
  var dx_dct = dx_hccs(dx_list, ver = ver, age = age, sex = sex, verbose = verbose);
  var unique_hccs = dxdct_hccs(dx_dct, never_trump = never_trump);
  var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
  unique_hccs.sort(collator.compare);
  unique_hccs = interactions[ver](unique_hccs, disabl, age);
  return unique_hccs;
}

function dx_hccs(dx_list, ver = '', age = 0, sex = '', verbose = true) {
  /*
  Look up the HCC code for each unique DX code in a list of DX. Includes trumping and agesex edits
  :param dx_list: list of str
                  List of dx codes; case and decimal insensitive
  :param ver: str
              Optional HCC version. Otherwise uses default version of ccalc object
  :param age: float
              Member age
  :param sex: str
              Member gender {"M"/"F"}
  :param verbose: bool
                  Include Non HCC DX in outputs
  :return: dict
          Dict of unique DX codes and their corresponding hcc codes
  */
  ver = ver || default_ver;
  verbose = verbose || default_verbose;

  var dxmap = default_dxmap[ver];
  var hccmap = default_hccmap[ver];

  var dx_dct = {};

  var unique_dx = clean_dxlist(dx_list, ver);
  // Validate DX against model and pull in DX info  
  for (var dx of unique_dx) {
      if (dx in dxmap) {
          dx_dct[dx] = JSON.parse(JSON.stringify(dxmap[dx]));
      } else if (verbose) {
          dx_dct[dx] = { "desc": "", "hccs": {} };
      }
  }

  if (age && sex) {  // age and sex are optional. w/o them this function can still generically do dx->hcc calcs
      agesex_edits(dx_dct, age, sex);
  }

  // Find all unique HCCs that are valid in the hcc ver
  var unique_hccs = new Set();

  for (var key in dx_dct) {
      if (dx_dct.hasOwnProperty(key)) {
          for (var hcc in dx_dct[key]['hccs']) {
              if (dx_dct[key]['hccs'].hasOwnProperty(hcc)) {
                  if (dx_dct[key]['hccs'][hcc] in hccmap) {
                      unique_hccs.add(dx_dct[key]['hccs'][hcc]);
                  }
              }
          }
      }
  };

  var got_trumped = {};
  for (var hcc of unique_hccs) {
      for (var child of hccmap[hcc]['children']) {
          got_trumped[child] = hcc;
      }
  }

  // Apply trumping and convert to HCC sets to lists (better for json serialization)

  for (var dx in dx_dct) {
      if (dx_dct.hasOwnProperty(dx)) {
          var temp_a = dx_dct[dx]['hccs'];
          var temp_b = [];
          for (var i in dx_dct[dx]['hccs']) {
              temp_b.push({ 'desc': hccmap[dx_dct[dx]['hccs'][i]]['desc'] });
          }
          var c = temp_a.map(function (e, i) {
              return [e, temp_b[i]];
          });
          var temp_c = {};
          for (var key in c) {
              if (c.hasOwnProperty(key)) {
                  temp_c[c[key][0]] = c[key][1];
              }
          }
          dx_dct[dx]['hccs'] = temp_c;
          for (var trumped_hcc in got_trumped) {
              if (got_trumped.hasOwnProperty(trumped_hcc)) {
                  if (got_trumped[trumped_hcc] in dx_dct[dx]['hccs']) { // If we find trumped HCC, replace with note of its demise
                      dx_dct[dx]['hccs'][got_trumped[trumped_hcc]]['trumped by'] = got_trumped[got_trumped[trumped_hcc]];
                  }
              }
          }
      }
  }
  return dx_dct;
}

function dxdct_hccs(dx_dct, never_trump = 0) {
  never_trump = never_trump || default_never_trump;
  var hcc_list = new Set();

  if (never_trump == 0) {
      for (var key in dx_dct) {
          if (dx_dct.hasOwnProperty(key)) {
              for (var hcc in dx_dct[key]['hccs']) {
                  if (dx_dct[key]['hccs'].hasOwnProperty(hcc)) {
                      if (!(dx_dct[key]['hccs'][hcc].hasOwnProperty(['trumped by']))) {
                        hcc_list.add(hcc);                          
                      }
                  }
              }
          }
      }
      hcc_list = Array.from(hcc_list);
      var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
      hcc_list.sort(collator.compare);
  } else {
    var hcc_list = new Set();
    for (var key in dx_dct) {
        if (dx_dct.hasOwnProperty(key)) { 
            for (var hcc in dx_dct[key]['hccs']){
                hcc_list.add(dx_dct[key]['hccs'][hcc]);
            }
        }
    }
    hcc_list = Array.from(hcc_list);
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    hcc_list.sort(collator.compare);
  }
  return hcc_list;
}

function clean_dxlist(dx_list, ver = '') {
  // Convert string to list, dedupe, and ensure DX are formatted correctly.
  ver = ver || default_ver;
  var dxmap = default_dxmap[ver];
  var list_dx = [];
  for (var i in dx_list) {
      if (dx_list[i] != '') {
          list_dx[i] = (String(dx_list[i]).replace('.', '')).toUpperCase();
      }
  }
  if (typeof (list_dx) == 'string') {
      list_dx = list_dx.split(/\s*,\s*|\s+|\s*;\s*|\s*:\s*/);
  }
  var dx_set = new Set();
  for (var dx of list_dx) {
      if (dxmap.hasOwnProperty(dx)) {
          dx_set.add(dx);
      }
  }
  return dx_set;
}

function clean_hcclist(hcc_list, ver = '') {
  ver = ver || default_ver;
  var hcc_map = default_hccmap[ver];

  if (typeof hcc_list == 'string') {
    hcc_list = hcc_list.split(/\s*,\s*|\s+|\s*;\s*|\s*:\s*/);
  }
  else if (typeof hcc_list == 'number') {
    hcc_list = [hcc_list];
  }

  // If you got integers, add the HCC prefix. If strings, make sure they're stripped and uppercase
  var hcc_list_temp = [];
  for (var hcc of hcc_list) {
      if (!isNaN(hcc.toString().trim())) {
          hcc_list_temp.push("HCC" + hcc.toString().trim());
      } else {
          hcc_list_temp.push(hcc.trim().toUpperCase());
      }
  }
  hcc_list = hcc_list_temp;
  //Replacing HCC019 to HCC19
  var hcc_list_temp = [];
  for (var hcc1 of hcc_list) {
      hcc_list_temp.push(hcc1.replace(/HCC0+/, 'HCC'));
  }
  hcc_list = hcc_list_temp;

  // We want HCC1 rather than HCC001, etc.
  var hcc_set = new Set();
  for (var hcc2 of hcc_list) {
      if (hcc_map.hasOwnProperty(hcc2)) {
          hcc_set.add(hcc2);
      }
  }
  return Array.from(hcc_set);
}


function agesex_edits(dx_dct, age, sex) {
  /*
  Edits DX List for a beneficiary based on AGE/SEX (From CMS I0V05ED2.TXT)
  Valid for V22, V23, V24
  :param dx_dct: dict
                 Dict of {DX:HCC}
  :param age: float
              Age of member
  :param sex: str
              Member's gender
  :return: dx_dct: dict
              Dictionary of {DX:HCC} edited per member age/sex rules
  */
  var ed_leukemia = ["C9100", "C9101", "C9102", "C9500", "C9501", "C9502",
      "C7400", "C7401", "C7402", "C7410", "C7411", "C7412",
      "C7490", "C7491", "C7492"];

  var ed_bronchitis = ["J410", "J411", "J418", "J42", "J440", "J441"];

  var ed_vasc_insf = ["K55011", "K55012", "K55019", "K55021", "K55022",
      "K55029", "K55031", "K55032", "K55039", "K55041", "K55042",
      "K55049", "K55051", "K55052", "K55059", "K55061", "K55062",
      "K55069", "K5530", "K5531", "K5532", "K5533"];

  var ed_emphysema = ["J430", "J431", "J432", "J438", "J439", "J449", "J982", "J983"];

  var ed_breastca = ["C50011", "C50012", "C50019", "C50021", "C50022", "C50029",
      "C50111", "C50112", "C50119", "C50121", "C50122", "C50129",
      "C50211", "C50212", "C50219", "C50221", "C50222", "C50229",
      "C50311", "C50312", "C50319", "C50321", "C50322", "C50329",
      "C50411", "C50412", "C50419", "C50421", "C50422", "C50429",
      "C50511", "C50512", "C50519", "C50521", "C50522", "C50529",
      "C50611", "C50612", "C50619", "C50621", "C50622", "C50629",
      "C50811", "C50812", "C50819", "C50821", "C50822", "C50829",
      "C50911", "C50912", "C50919", "C50921", "C50922", "C50929"];

  var ed_low_bw = ["P0500", "P0501", "P0502", "P0503", "P0504", "P0505",
      "P0506", "P0507", "P0508", "P0509", "P0510", "P0511",
      "P0512", "P0513", "P0514", "P0515", "P0516", "P0517",
      "P0518", "P0519", "P052", "P059", "P0700", "P0701",
      "P0702", "P0703", "P0710", "P0714", "P0715", "P0716",
      "P0717", "P0718", "P0720", "P0721", "P0722", "P0723",
      "P0724", "P0725", "P0726", "P0730", "P0731", "P0732",
      "P0733", "P0734", "P0735", "P0736", "P0737", "P0738",
      "P0739", "P080", "P081", "P0821", "P0822"];

  var ed_conjoined = ["Q894"];

  var ed_newbn_substance = ["K551", "K558", "K559",
      "P041", "P0411", "P0412", "P0413", "P0414", "P0415",
      "P0416", "P0417", "P0418", "P0419", "P041A",
      "P042", "P043", "P0440", "P0441", "P0442", "P0449",
      "P045", "P046", "P048", "P0481", "P0489",
      "P049", "P930", "P938", "P961", "P962",
      "Q390", "Q391", "Q392", "Q393", "Q394", "Q6410",
      "Q6411", "Q6412", "Q6419", "Q790", "Q791", "Q792",
      "Q793", "Q794", "Q7951"];

  var ed_chron_resp = ["P270", "P271", "P278", "P279"];

  var ed_disruptive_mood = ["F3481"];

  var ed_hemophilia = ["D66", "D67"];

  // Optimal to have the loop outside of the age checks, but this is easier to read
  for (var dx in dx_dct) {

      // Split acute lymphoid and other acute leukemias, except  myeloid diagnoses to age 18+ (HCC 8)
      // and age <18 (HCC 9). Split adrenal gland cancer diagnoses to age 18+ (HCC 10) and age <18 (HCC 9).
      if (age < 18 && ed_leukemia.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC9"]);
      }

      // Split chronic bronchitis diagnoses to age 18+ (HCC 160) and age <18 (HCC 161)
      if (age < 18 && ed_bronchitis.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC161"]);
      }

      // Split acute vascular insufficiency of intestine diagnosis to age 2+ (HCC 154) and age <2 (HCC 42)
      if (age < 2 && ed_vasc_insf.includes(dx)) {
        dx_dct[dx]['hccs'] = [("HCC42")];
      }

      // Split breast cancer diagnoses to age 50+ (HCC 12) and age <50 (HCC 11)
      if (age < 50 && ed_breastca.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC11"]);
      }

      // Split emphysema diagnoses to age 18+ (HCC 160) and age 2-17 (HCC160; split not needed in HHS model).
      // If age <2 out of payment model
      if (age < 2 && ed_emphysema.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC-1"]);
      }

      // Edit for newborn low birthweight. If age 1+ out of payment model
      if (age != 0 && ed_low_bw.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC-1"]);
      }

      // Split conjoined twins diagnoses to age 1+ (HCC 97) and age <1 (HCC 247)
      if (age >= 1 && ed_conjoined.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC97"]);
      }

      // Neonatal effects of maternal drug abuse: If age 2+ out of payment model
      if (age >= 2 && ed_newbn_substance.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC-1"]);
      }

      // Split chronic respiratory disease arising in the perinatal period diagnoses to age 2+
      // (HCC 162) and age <2 (HCC 127).
      if (age >= 2 && ed_chron_resp.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC162"]);
      }

      // Mood disorder: Edit for targeted age of diagnosis. If age <6 or age >18 out of payment model.
      if (age < 6 || age > 18 && ed_disruptive_mood.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC-1"]);
      }

      // Split hemophilia diagnoses to male (HCC 66 if age <65 or HCC 66 if age 65+; age split not needed in HHS model)
      //  and female (HCC 75)
      female_sex = ["2", "F", "Female"];
      if (female_sex.includes(sex) && ed_hemophilia.includes(dx)) {
        dx_dct[dx]['hccs'] = (["HCC75"]);
      }
  }

  edit_dct = {};  // Build new dict after filtering out all HCCs edited out
  for (dx in dx_dct) {
      if (dx_dct[dx]['hccs'] != (["HCC-1"])) {
          edit_dct[dx] = dx_dct[dx];
      }
  }

  return edit_dct;
}

function get_raf(demo_lst, hcc_lst, ver = '', model = '', verbose = true, baserate = 0.0) {
  /*
  Look up demographic and hcc RAF for a member given codes. IMPORTANT: ASSUMES HCCs are already clean and deduped
  and hierarchy. Based on CMS V2218O1P.TXT.  Returns a dict of risk scores in the format:
  {
      raf: float of total risk factor,
      premium: PM PM payment for members of this raf and base rate($)
      demo_raf: float of demographic risk factor
      hcc_raf: float of hcc risk factor
      demo_detail: dict of {demographic_code: demo_raf} for each demographic code in list
      hcc_defail: dict of {hcc_code: hcc:raf} for each hcc code in list
  :param model: str
                  Hcc model for use
  :param demo_lst: list of str
                  List of applicable demographic codes for a member (eg CNA_F65_70)
  :param hcc_lst: list of str
                  List of hccs (assumes hccs have already been trumped)
  :param ver: str
                  Optional HCC version to be used in calculation
  :param model: str
          Optional HCC model to be used in calculation
  :param verbose: bool
  :param baserate: float
                  pmpm premium base rate
  :return: dict
          raf_dct
  */
  ver = ver.toLowerCase() || default_ver;
  model = (String(model)).toUpperCase() || default_model;
  baserate = baserate || default_baserate;
  verbose = verbose || default_verbose;

  var hcccoefn = default_hcccoefn[ver];
  var demo_detail = {};
  var hcc_detail = {};
  var demo_raf = 0.0;
  var hcc_raf = 0.0;

  for (var demo of demo_lst) {
      if (hcccoefn.hasOwnProperty(demo)) {
          demo_detail[demo] = hcccoefn[demo];
          demo_raf += hcccoefn[demo];
      }
  }

  for (var hcc in hcc_lst) {
      var label = model + "_" + hcc_lst[hcc];
      if (label in hcccoefn) {
          hcc_detail[label] = hcccoefn[label];
          hcc_raf += hcccoefn[label];
      } else if (verbose) {
          hcc_detail[label] = 0.0;
      }
  }

  var score = (demo_raf + hcc_raf).toFixed(4);
  var raf_dct = {
      "score": score,
      "premium": (score * baserate).toFixed(2),
      "demo_score": (demo_raf).toFixed(4),
      "hcc_score": (hcc_raf).toFixed(4),
      "demo_detail": demo_detail,
      "hcc_detail": hcc_detail
  };
  return raf_dct;
}

function v22_interactions(ccs, disabl, age = '') {
  /*
  Calculated interaction HCCs given a list of hccs, age, and disability flag
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
      "RENAL": new Set(["HCC134", "HCC135", "HCC136", "HCC137"]),
      "SEPSIS": new Set(["HCC2"]),
      "gSubstanceAbuse": new Set(["HCC54", "HCC55"]),
      "gPsychiatric": new Set(["HCC57", "HCC58"])
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
  int_hccs["HCC85_gRenal_V23"] = my_dcs["RENAL"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));
  int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];
  int_hccs["HCC85_HCC96"] = new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC96"])].filter(x => cc_set.has(x)));
  int_hccs["gSubstanceAbuse_gPsychiatric"] = my_dcs["gPsychiatric"] && my_dcs["gSubstanceAbuse"];

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

function v24_interactions(ccs, disabl, age = '') {
  /*
  Calculated interaction HCCs given a list of hccs, age, and disability flag
  :param ccs: List of HCCs in the format "HCC18" no trumping or cleaning of HCCs is done in this function
  :param disabl: CMS disabled flag
  :param age: Optional age of beneficiary; only one interaction uses age and it will be assumed false if not entered
  :return: List of HCC codes, including interaction codes
  */
  var cc_set = new Set(ccs);
  var int_hccs = {};
   var cnt= cc_set.length;
   int_hccs["D10P"]=cnt>9
   var index = "D".concat(cnt)
   int_hccs[index] = (cnt > 3 && cnt <10)
  // diagnostic categories

  var diag_cats = {
      "CANCER": new Set(["HCC8", "HCC9", "HCC10", "HCC11", "HCC12"]),
      "DIABETES": new Set(["HCC17", "HCC18", "HCC19"]),
      "CARD_RESP_FAIL": new Set(["HCC82", "HCC83", "HCC84"]),
      "CHF": new Set(["HCC85"]),
      "gCopdCF": new Set(["HCC110", "HCC111", "HCC112"]),
      "RENAL_V24": new Set(["HCC134", "HCC135", "HCC136", "HCC137", "HCC138"]),
      "SEPSIS": new Set(["HCC2"]),
      "gSubstanceAbuse_V24": new Set(["HCC54", "HCC55", "HCC56"]),
      "gPsychiatric_V24": new Set(["HCC57", "HCC58", "HCC59", "HCC60"])
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
  int_hccs["HCC85_gRenal_V24"] = my_dcs["RENAL_V24"] && new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x)));
  int_hccs["gRespDepandArre_gCopdCF"] = my_dcs["gCopdCF"] && my_dcs["CARD_RESP_FAIL"];
  int_hccs["HCC85_HCC96"] = new Set([...new Set(["HCC85"])].filter(x => cc_set.has(x))) && new Set([...new Set(["HCC96"])].filter(x => cc_set.has(x)));
  int_hccs["gSubstanceAbuse_gPsychiatric_V24"] = my_dcs["gPsychiatric_V24"] && my_dcs["gSubstanceAbuse_V24"];

  // institutional model interactions
  int_hccs["PRESSURE_ULCER"] = new Set([...new Set(["HCC157", "HCC158"])].filter(x => cc_set.has(x)));   
  int_hccs["SEPSIS_PRESSURE_ULCER"] = my_dcs["SEPSIS"] && int_hccs["PRESSURE_ULCER"];
  int_hccs["SEPSIS_ARTIF_OPENINGS"] = my_dcs["SEPSIS"] && new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x)));
  int_hccs["ART_OPENINGS_PRESSURE_ULCER"] = new Set([...new Set(["HCC188"])].filter(x => cc_set.has(x))) && int_hccs["PRESSURE_ULCER"];       
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
