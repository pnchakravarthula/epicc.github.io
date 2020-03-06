class RAFCalc {
    constructor(ver = 'v23', model = 'CNA', verbose = true, baserate = 868.0, approximation_len = 0, never_trump = 0) {
        /*

            Condition Calculator is an HCC model calculator. It can be used to calculate the full risk score of a member

            or be used to do piecewise transformations or lookups on DX Codes, HCCs for the purpose of risk adjustment

            calculations

            :param ver: str

                        Default HCC version for calculations ('v22', 'v23', 'v24' currently supported)

            :param ver: str

                        Default HCC model for calculation (Assumes "CNA" for Community NonDual Aged if not specified)

            :param verbose: bool

                        Show more calculation detail: trumped HCCs, DX Codes not in model, etc

        */
        // Later, add DOS as alternative to impute version.  If both are specified, go with version
        if (typeof ver == 'number') {
            ver = 'v' + ver
        };

        this.default_ver = ver.toLowerCase(); // Default version for this calculator

        this.default_model = (String(model)).toUpperCase();  // Default HCC model for this calculator (Community NonDual Aged is most common)  # noqa: E501

        this.default_baserate = baserate;

        this.verbose = verbose;

        this.never_trump = never_trump;

        // Each of the following are lookup dicts, with HCC version (eg 'v23') as the primary key
        this.dxmap = load_dxmap; // Get DX description and hcc data

        this.hccmap = load_hccmap;  // Get HCC description and trumping tables


        //CMS RAF coefficient tables for each Model_HCC pair
        this.hcccoefn = load_hcccoefn;

        //Interaction calculation functions
        this.interactions = { 'v22': v22_interactions, 'v23': v23_interactions, 'v24': v24_interactions }

    }

    member(condition_list, age = 65, sex = 'M', model = '', orec = '0', ver = '', baserate = 0.0) {
        /*
            Builds an HCC risk score for a Medicare Advantage member given demographic and disease factors
            :param dx_list: list of str
                            List of DX codes; case and decimal insensitive
            :param age: float
                        Age of member
            :param sex: str
                        Gender of Member: Accepts "M"/"F", "Male"/"Female" or CMS numerical codes 1/2
            :param model: str
                        HCC Model to be used for member. Accepts:
                            "CNA": Community - Non-dual aged
                            "CND": Community - Non-dual disabled
                            "CFA": Community - Full Benefit dual aged
                            "CFD": Community - Full Benefit dual disabled
                            "CPA": Community - Partial Benefit dual aged
                            "CPD": Community - Partial Benefit dual disabled
                            "INS": Institutional
                            "NE": New enrollee
                            "SNPNE": C-SNP new enrolee
            :param orec: str
                        Original Reason for Entitlement:
                            "0": Old age (OASI)
                            "1": Disability (DIB)
                            "2": End Stage Renal Disease (ESRD)
                            "3": Both DIB and ESRD
    
            :param ver: str
                        Version of HCC Model to be used (overrides default version set in Ccalc).
                        Accepts {'v22', 'v23', 'v24'}
            :return: dict
                    Map of factors and risk scores for member
        */
        ver = ver.toLowerCase() || this.default_ver;
        model = (String(model)).toUpperCase() || this.default_model;
        baserate = baserate || this.default_baserate;
        let interactions = this.interactions[ver];

        // Get age/sex/disability demographic codes
        let disabl = model.endsWith("D");
        let demo_codes = agesex(age, sex, orec, model);
        let cond_dict = this.condition_resolver(condition_list, ver = ver);
        let condition = cond_dict['condition'];
        let allhcc = cond_dict['allhcc'];
        let verbose = this.verbose;
        let flag;
        let raf;
        let dx_dct;

        if (allhcc == 1) {
            let hcc_dct = this.hcc_dct(condition, ver = ver, age = age, sex = sex, verbose = verbose);
            let dx_dct = hcc_dct;
            unique_hccs = prep_hccs(condition, ver = ver, age = age);
            unique_hccs = interactions(unique_hccs, disabl, age);
            raf = get_raf(demo_codes, unique_hccs, ver = ver, model = model, baserate = baserate);
            flag = 'hcc';
        } else {
            // process DX list
            dx_dct = this.dx_hccs(condition, ver = ver, age = age, sex = sex, verbose = this.verbose);
            let unique_hccs = this.dxdct_hccs(dx_dct);
            unique_hccs = interactions(unique_hccs, disabl, age);
            raf = this.get_raf(demo_codes, unique_hccs, ver = ver, model = model, baserate = baserate);
            flag = 'dx';
        }

        return {
            "hcc_model": { "version": ver, "model": model },
            "demo": { "age": age, "sex": sex, "orec": orec },
            "raf": raf,
            'flag': flag,
            "dx_hccs": dx_dct
        }
    }

    dxdct_hccs(dx_dct, never_trump = 0) {
        var never_trump = never_trump || this.never_trump;
        var hcc_list = new Set();

        if (never_trump == 0) {
            for (const [key, value] of Object.entries(dx_dct)) {
                if (dx_dct.hasOwnProperty(key)) {
                    for (const [hcc, trump] of Object.entries(dx_dct[key]['hccs'])) {
                        if (dx_dct[key]['hccs'].hasOwnProperty(hcc)) {
                            if ((dx_dct[key]['hccs'][hcc]['trumped by'] == undefined)) {
                                hcc_list.add(hcc);
                            }
                        }
                    }
                }
            };
            hcc_list = Array.from(hcc_list)
            let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            hcc_list.sort(collator.compare);
        } else {
            var hcc_list = new Set();
            for (let key in dx_dct) {
                if (dx_dct.hasOwnProperty(key)) {
                    for (let hcc in dx_dct[key]['hccs']) {
                        hcc_list.add(dx_dct[key]['hccs'][hcc]);
                    }
                }
            };
            hcc_list = Array.from(hcc_list);
            let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
            hcc_list.sort(collator.compare);
        }
        return hcc_list;
    }

    dx2raf(dx_list, age = 0, ver = '', model = '', sex = '', disabl = false, verbose = false, never_trump = 0, baserate = 0.0) {
        /*
        Utility to calculate raf from list of DX codes
        */

        ver = ver.toLowerCase() || this.default_ver;
        model = (String(model)).toUpperCase() || this.default_model;
        baserate = baserate || this.default_baserate;
        never_trump = never_trump || this.never_trump;

        let hccs = this.dx2hcc(dx_list = dx_list, age = age, ver = ver, sex = sex, disabl = disabl, verbose = verbose, never_trump = never_trump);
        let raf = this.get_raf([], hccs, ver = ver, model = model, baserate = baserate);
        return raf["hcc_score"]
    }

    hcc2raf(hcc_list, ver = '', model = '', disabl = false, age = 0, never_trump = 0, baserate = 0.0) {
        /*
        Utility for calculating hcc raf for a list of hccs
        */

        ver = ver.toLowerCase() || this.default_ver;
        model = model || this.default_model;
        baserate = baserate || this.default_baserate;
        never_trump = never_trump || this.never_trump;

        hcc_list = this.prep_hccs(hcc_list, ver = ver, age = age, disabl = disabl, never_trump = 0);
        let raf = this.get_raf([], hcc_list, ver = ver, model = model, baserate = baserate);
        return raf["hcc_score"];
    }

    prep_hccs(hcc_list, ver = '', age = 0, disabl = false, never_trump = 0) {
        /*
        Utility for prepping an HCC list, applying Trumping and Interactions; does not include age/sex interactions
        as they at the DX level
        */
        if (ver) {
            var ver = ver;
        } else {
            var ver = this.default_ver;
        }
        never_trump = never_trump || this.never_trump;

        var hccs = this.trump_hccs(hcc_list, ver = ver, never_trump = never_trump);
        hccs = this.interactions[ver](hccs, disabl, age);
        return hccs;
    }

    trump_hccs(hcc_list, ver = '', never_trump = 0) {
        // Given a list of HCCs and an HCC version, returns a list of HCCs after trumping
        var ver = ver || this.default_ver;
        var never_trump = never_trump || this.never_trump;
        var hccmap = this.hccmap[0][ver];

        // Make sure we're getting the right format
        var hcc_list = this.clean_hcclist(hcc_list, ver = ver);
        if (never_trump == 0) {
            var hcc_set = new Set(hcc_list);
            var trumped_set = new Set();
            for (let hcc of hcc_set) {
                if (hcc in hccmap) {
                    for (let child of hccmap[hcc]['children']) {
                        trumped_set.add(child)
                    }
                }
            }
            hcc_set = new Set([...hcc_set].filter(x => !trumped_set.has(x)))
            hcc_list = Array.from(hcc_set)
        }

        let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        hcc_list.sort(collator.compare);
        return hcc_list
    }

    dx2hcc(dx_list, age = 0, ver = '', sex = '', disabl = false, never_trump = 0, verbose = false) {
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
        var ver = ver || this.default_ver;
        var never_trump = never_trump || this.never_trump;
        let interactions = this.interactions[ver];
        let dx_dct = this.dx_hccs(dx_list, ver = ver, age = age, sex = sex, verbose = this.verbose);
        let unique_hccs = this.dxdct_hccs(dx_dct, never_trump = never_trump);
        let collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
        unique_hccs.sort(collator.compare);
        unique_hccs = interactions(unique_hccs, disabl, age);
        return unique_hccs;

    }

    hcc_diff(old_list = [], new_list = [], ver = '', age = 0, sex = '', model = '', disabl = false, never_trump = 0, baserate = 0.0) {
        /*
        Calculate the changes between two hcc lists, {"adds":[], "upgraded":[] "downgraded":[], "deletes":[]}
        - "adds" are new HCC Codes (includes upgrades of other codes),
        - "upgraded" are codes from base that are no longer relevant due to new codes
        - "downgraded" are codes from base that are present at a lower specificity in new
        - "deletes" are codes from base that are no longer present at all
        */

        ver = ver.toLowerCase() || this.default_ver;
        model = model || this.default_model;
        baserate = baserate || this.default_baserate;
        never_trump = never_trump || this.never_trump;

        let hccmap = this.hccmap[0][ver];
        // Prep cleans and trumps the list and add interactions
        let old_set = new Set(this.prep_hccs(old_list, ver = ver, age = age, disabl = disabl));
        let new_set = new Set(this.prep_hccs(new_list, ver = ver, age = age, disabl = disabl, never_trump = never_trump));

        // Find the full set of codes that each set can trump
        let old_children = new Set();
        let new_children = new Set();
        let new_parents = new Set();
        for (let hcc of old_set) {
            if (hcc in hccmap) {
                for (let child of hccmap[hcc]['children']) {
                    old_children.add(child)
                }
            }
        }
        for (let hcc of new_set) {
            if (hcc in hccmap) {
                for (let child of hccmap[hcc]['children']) {
                    old_children.add(child)
                }
            }
        }
        for (let hcc of new_set) {
            if (hcc in hccmap) {
                for (let child of hccmap[hcc]['children']) {
                    old_children.add(child)
                }
            }
        }

        // New HCCs, except where they are trumped by old HCCs (downgrades)
        let new_hccs_temp = new Set([...new_set].filter(x => !old_set.has(x)));
        let new_hccs = new Set([...new_hccs_temp].filter(x => !old_children.has(x)));
        let downgraded_temp = new Set([...old_set].filter(x => !new_set.has(x)));
        let downgraded = new Set([...downgraded_temp].filter(x => new_parents.has(x)));
        let downgrade_to_temp = new Set([...new_set].filter(x => !old_set.has(x)));
        let downgrade_to = new Set([...downgrade_to_temp].filter(x => old_children.has(x)));
        //new_hccs = new_set.difference(old_set).difference(old_children)
        //downgraded = old_set.difference(new_set).intersection(new_parents)
        //downgrade_to = new_set.difference(old_set).intersection(old_children)
        let upgraded = new Set();
        if (never_trump === 1) {
            let prep_hccs_set = new Set(this.prep_hccs(Array.from(new_set)));
            let upgraded_temp = new Set([...old_set].filter(x => !prep_hccs_set.has(x)));
            let upgraded = ([...upgraded_temp].filter(x => new_children.has(x)));
            //old_set.difference(set(this.prep_hccs(list(new_set)))).intersection(new_children)
        } else {
            let upgraded_temp = new Set([...old_set].filter(x => !new_set.has(x)));
            let upgraded = ([...upgraded_temp].filter(x => new_children.has(x)));
            //upgraded = old_set.difference(new_set).intersection(new_children)
        }

        let del_hccs_temp = new Set([...old_set].filter(x => !new_set.has(x)));
        let del_hccs_union = new Set([...upgraded, ...downgraded]);
        let del_hccs = new Set([...del_hccs_temp].filter(x => !del_hccs_union.has(x)));
        //del_hccs = old_set.difference(new_set).difference(upgraded.union(downgraded))

        let old_raf = this.hcc2raf(Array.from(old_set), ver = ver, model = model, baserate = baserate, never_trump = never_trump);
        let new_raf = this.hcc2raf(Array.from(new_set), ver = ver, model = model, baserate = baserate, never_trump = never_trump);
        let delta_raf = new_raf - old_raf;

        let diff = {
            "adds": Array.from(new_hccs),
            "upgraded": Array.from(upgraded),
            "downgraded": Array.from(downgraded),
            "downgrade_to": Array.from(downgrade_to),
            "deletes": Array.from(del_hccs),
            "raf": delta_raf,
            "premium": Math.round(delta_raf * baserate, 2)
        }
        return diff;
    }

    dx_diff(old_list = [], new_list = [], ver = '', model = '', never_trump = 0, baserate = 0.0) {
        /*
        Utility to compare HCCs and RAF for two lists of dx codes
        */
        ver = ver || this.default_ver;
        model = (String(model)).toUpperCase() || this.default_model;
        baserate = baserate || this.default_baserate;
        never_trump = never_trump || this.never_trump;

        let old_dx = this.clean_dxlist(old_list, ver);
        let new_dx = this.clean_dxlist(new_list, ver);
        let old_hccs = this.dx2hcc(old_list, ver = ver, never_trump = never_trump);
        let new_hccs = this.dx2hcc(new_list, ver = ver, never_trump = never_trump);

        let diff = this.hcc_diff(old_hccs, new_hccs, ver = ver, model = model, never_trump = never_trump, baserate = baserate);
        let dxdiff = {
            "adds": Array.from(this._get_hcc_dx(diff['adds'], new_dx, ver)),
            "upgraded": Array.from(this._get_hcc_dx(diff["upgraded"], old_dx, ver)),
            "downgraded": Array.from(this._get_hcc_dx(diff["downgraded"], old_dx, ver)),
            "downgrade_to": Array.from(this._get_hcc_dx(diff["downgrade_to"], new_dx, ver)),
            "deletes": Array.from(this._get_hcc_dx(diff["deletes"], old_dx, ver)),
        }
        dxdiff['raf'] = diff['raf'];
        dxdiff['premium'] = diff['premium'];
        return dxdiff;

    }

    _get_hcc_dx(hcc_list, dx_list, ver) {
        let dxmap = this.dxmap[0][ver];
        let hcc_set = new Set(hcc_list);
        let mydx = new Set();
        for (let dx of dx_list) {
            let temp_set = new Set(dxmap[dx]['hccs']);
            let temp = ([...temp_set].filter(x => hcc_set.has(x)));
            if (dxmap.hasOwnProperty(dx) && temp) {
                mydx.add(dx);
            }
        }
        // mydx = {dx for dx in dx_list if dx in dxmap and dxmap[dx]['hccs'].intersection(hcc_set)}
        return mydx;
    }

    cc_increment(old_list = [], new_list = [], ver = '', model = '', age = 0, disabl = false, never_trump = 0, baserate = 0.0) {
        // Utility to identify the incremental HCCs and value of adding a new list HCCs to a base list of HCCs
        var ver = ver.toLowerCase() || this.default_ver
        var model = model.toUpperCase() || this.default_model
        var baserate = baserate || this.default_baserate
        var never_trump = never_trump || this.never_trump
        var new_hccs = this.prep_hccs(new_list, ver = ver, age = age, disabl = disabl, never_trump = never_trump)
        var old_hccs = this.prep_hccs(old_list, ver = ver, age = age, disabl = disabl)
        var final_hccs = this.prep_hccs(new_hccs.concat(old_hccs), ver = ver, age = age, disabl = disabl, never_trump = never_trump)
        var diff = this.hcc_diff(old_hccs, final_hccs, ver = ver, model = model, disabl = disabl, baserate = baserate, never_trump = never_trump)
        diff["final_hccs"] = final_hccs;
        delete diff['downgraded'];
        delete diff['downgrade_to'];
        delete diff['deletes'];
        return diff
    }


    dx_increment(old_list = [], new_list = [], ver = '', model = '', age = 0, disabl = false, never_trump = 0, baserate = 0.0) {
        // Utility to identify the incremental HCCs and value of adding a new list DXs to a base list of DXs

        var ver = ver.toLowerCase() || this.default_ver
        var model = model.toUpperCase() || this.default_model
        var baserate = baserate || this.default_baserate
        var never_trump = never_trump || this.never_trump
        var old_hccs = this.dx2hcc(old_list, ver = ver, age = age, disabl = disabl, never_trump = never_trump)
        var new_hccs = this.dx2hcc(new_list, ver = ver, age = age, disabl = disabl, never_trump = never_trump)
        var diff = this.hcc_increment(old_hccs, new_hccs, ver = ver, model = model, age = age, disabl = disabl, baserate = baserate, never_trump = never_trump)

        var dxinc = {
            "adds": Array.from(this._get_hcc_dx(diff['adds'], this.clean_dxlist(new_list), ver)),
            "upgraded": Array.from(this._get_hcc_dx(diff["upgraded"], this.clean_dxlist(old_list), ver)),
        };
        dxinc['raf'] = diff['raf']
        dxinc['premium'] = diff['premium']
        return dxinc
    }

    condition_resolver(conditionlist, ver = '', never_trump = 0, allhcc = 0) {
        //need factoring
        ver = ver || this.default_ver;
        never_trump = never_trump || this.never_trump;
        let list_hcc = [];
        list_hcc = conditionlist.filter(item => Number.isInteger(item) || item.startsWith('HCC'));
        let list_dx = [];
        let list_dx_clean = [];
        let dct = new Set();
        if ((list_hcc.length > 0) || allhcc) {
            allhcc = 1;
            list_dx = conditionlist.filter(item => !(list_hcc.includes(item)));
            list_dx_clean = this.clean_dxlist(list_dx, ver);
            let hccs = this.dx2hcc(list_dx_clean, ver = ver, never_trump = never_trump);
            let combined_hccs = list_hcc.concat(hccs);
            dct = { 'allhcc': allhcc, 'condition': combined_hccs };

        } else {
            list_dx = conditionlist;
            dct = { 'allhcc': allhcc, 'condition': list_dx };
        }
        return dct;
    }

    hcc_gaps(old_list = [], new_list = [], ver = '', model = '', age = 0, disabl = false, baserate = 0.0) {
        /*
        Utility to identify hccs that were dropped or downgraded from one list to the next
        */

        ver = ver.toLowerCase() || this.default_ver;
        model = (String(model)).toUpperCase() || this.default_model;
        baserate = baserate || this.default_baserate;

        let new_hccs = this.prep_hccs(new_list, ver = ver, age = age, disabl = disabl);
        let old_hccs = this.prep_hccs(old_list, ver = ver, age = age, disabl = disabl);

        let diff = this.hcc_diff(old_hccs, new_hccs, ver = ver, model = model, disabl = disabl, baserate = baserate);
        let raf = - this.hcc2raf(diff['deletes']) - this.hcc2raf(diff['downgraded']) + this.hcc2raf(diff['downgrade_to']);
        let gaps = { "Deletes": diff["deletes"], "Downgraded": diff["downgraded"], "raf": raf, "premium": Math.round(raf * baserate, 2) };
        return gaps;
    }

    dx_gaps(old_list = [], new_list = [], ver = '', model = '', age = 0, disabl = false, baserate = 0.0) {
        /*
        Utility to identify hccs that were dropped or downgraded from one list to the next
        */

        ver = ver.toLowerCase() || this.default_ver;
        model = (String(model)).toUpperCase() || this.default_model;
        baserate = baserate || this.default_baserate;

        let old_hccs = this.dx2hcc(old_list, ver = ver, age = age, disabl = disabl);
        let new_hccs = this.dx2hcc(new_list, ver = ver, age = age, disabl = disabl);

        let diff = this.hcc_gaps(old_hccs, new_hccs, ver = ver, model = model, age = age, disabl = disabl, baserate = baserate);
        diff['Downgraded'] = Array.from(this._get_hcc_dx(diff['Downgraded'], this.clean_dxlist(old_list), ver));
        diff['Deletes'] = Array.from(this._get_hcc_dx(diff['Deletes'], this.clean_dxlist(old_list), ver));
        return diff;
    }

    clean_dxlist(dx_list, ver = '') {
        // Convert string to list, dedupe, and ensure DX are formatted correctly.
        ver = ver || this.default_ver;
        let dxmap = this.dxmap[0][ver];
        let list_dx = [];
        for (let i in dx_list) {
            if (dx_list[i] != '') {
                list_dx[i] = (String(dx_list[i]).replace('.', '')).toUpperCase();
            }
        }
        if (typeof (list_dx) == 'string') {
            list_dx = list_dx.split(/\s*,\s*|\s+|\s*;\s*|\s*:\s*/);
        }
        let dx_set = new Set();
        for (let dx of list_dx) {
            if (dxmap.hasOwnProperty(dx)) {
                dx_set.add(dx);
            }
        }
        return Array.from(dx_set);
    }

    clean_hcclist(hcc_list, ver = '') {
        ver = ver || this.default_ver;
        var hccmap = this.hccmap[0][ver];

        if (typeof hcc_list == 'string') {
            hcc_list = hcc_list.split(/\s*,\s*|\s+|\s*;\s*|\s*:\s*/)
        }
        else if (typeof hcc_list == 'number') {
            hcc_list = [hcc_list]
        }


        // If you got integers, add the HCC prefix. If strings, make sure they're stripped and uppercase
        var hcc_list_temp = [];
        for (let hcc of hcc_list) {
            if (!isNaN(hcc.toString().trim())) {
                hcc_list_temp.push("HCC" + hcc.toString().trim())
            } else {
                hcc_list_temp.push(hcc.trim().toUpperCase())
            }
        }
        var hcc_list = hcc_list_temp
        //Replacing HCC019 to HCC19
        var hcc_list_temp = [];
        for (let hcc of hcc_list) {
            hcc_list_temp.push(hcc.replace(/HCC0+/, 'HCC'));
        }
        var hcc_list = hcc_list_temp

        // We want HCC1 rather than HCC001, etc.
        var hcc_set = new Set();
        for (let hcc of hcc_list) {
            if (hcc in hccmap) {
                hcc_set.add(hcc);
            }
        }
        return Array.from(hcc_set)
    }

    dx_hccs(dx_list, ver = '', age = 0, sex = '', verbose = true) {
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
        ver = ver || this.default_ver;
        verbose = verbose || this.verbose;

        var dxmap = this.dxmap[0][ver];
        var hccmap = this.hccmap[0][ver];

        let dx_dct = {};

        let unique_dx = this.clean_dxlist(dx_list, ver);
        // Validate DX against model and pull in DX info
        /*for dx in unique_dx:
            if dx in dxmap:
                dx_dct[dx] = deepcopy(dxmap[dx])  # Get details for this DX Code
            elif verbose:
                dx_dct[dx] = {"desc": "", "hccs": {}}*/
        for (let dx of unique_dx) {
            if (dx in dxmap) {
                dx_dct[dx] = JSON.parse(JSON.stringify(dxmap[dx]));
            } else if (verbose) {
                dx_dct[dx] = { "desc": "", "hccs": {} }
            }
        }

        if (age && sex) {  // age and sex are optional. w/o them this function can still generically do dx->hcc calcs
            agesex_edits(dx_dct, age, sex);
        }

        // Find all unique HCCs that are valid in the hcc ver
        let unique_hccs = new Set();

        for (let key in dx_dct) {
            if (dx_dct.hasOwnProperty(key)) {
                for (let hcc in dx_dct[key]['hccs']) {
                    if (dx_dct[key]['hccs'].hasOwnProperty(hcc)) {
                        if (dx_dct[key]['hccs'][hcc] in hccmap) {
                            unique_hccs.add(dx_dct[key]['hccs'][hcc]);
                        }
                    }
                }
            }
        };

        var got_trumped = {};
        for (let hcc of unique_hccs) {
            for (let child of hccmap[hcc]['children']) {
                got_trumped[child] = hcc;
            }
        }


        // Apply trumping and convert to HCC sets to lists (better for json serialization)

        for (let dx in dx_dct) {
            if (dx_dct.hasOwnProperty(dx)) {
                var temp_a = dx_dct[dx]['hccs'];
                var temp_b = [];
                for (let i in dx_dct[dx]['hccs']) {
                    temp_b.push({ 'desc': hccmap[dx_dct[dx]['hccs'][i]]['desc'] })
                }
                var c = temp_a.map(function (e, i) {
                    return [e, temp_b[i]];
                });
                var temp_c = {};
                for (let key in c) {
                    if (c.hasOwnProperty(key)) {
                        temp_c[c[key][0]] = c[key][1]
                    }
                }
                dx_dct[dx]['hccs'] = temp_c;
                for (let trumped_hcc in got_trumped) {
                    if (got_trumped.hasOwnProperty(trumped_hcc)) {
                        if (got_trumped[trumped_hcc] in dx_dct[dx]['hccs']) { // If we find trumped HCC, replace with note of its demise
                            dx_dct[dx]['hccs'][got_trumped[trumped_hcc]]['trumped by'] = got_trumped[got_trumped[trumped_hcc]]
                        }
                    }
                }
            }
        }
        return dx_dct;
    }

    get_raf(demo_lst, hcc_lst, ver = '', model = '', verbose = true, baserate = 0.0) {
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

        ver = ver.toLowerCase() || this.default_ver;
        model = (String(model)).toUpperCase() || this.default_model;
        baserate = baserate || this.default_baserate;
        verbose = verbose || this.verbose;

        let hcccoefn = this.hcccoefn[0][ver];
        let demo_detail = {};
        let hcc_detail = {};
        let demo_raf = 0.0;
        let hcc_raf = 0.0;

        for (let demo of demo_lst) {
            if (hcccoefn.hasOwnProperty(demo)) {
                demo_detail[demo] = hcccoefn[demo];
                demo_raf += hcccoefn[demo];
            }
        }

        for (let hcc in hcc_lst) {
            let label = model + "_" + hcc_lst[hcc];
            if (label in hcccoefn) {
                hcc_detail[label] = hcccoefn[label];
                hcc_raf += hcccoefn[label];
            } else if (verbose) {
                hcc_detail[label] = 0.0;
            }
        }

        let score = (demo_raf + hcc_raf).toFixed(4);
        let raf_dct = {
            "score": score,
            "premium": (score * baserate).toFixed(2),
            "demo_score": (demo_raf).toFixed(4),
            "hcc_score": (hcc_raf).toFixed(4),
            "demo_detail": demo_detail,
            "hcc_detail": hcc_detail
        }
        return raf_dct;
    }

    hcc_dct(hcc_list, ver = '', age = 0, sex = '', verbose = false) {
        ver = ver || this.default_ver;
        verbose = verbose || this.verbose;

        let hccmap = this.hccmap[0][ver];
        let unique_hccs = new Set();
        for (let hcc of hcc_list) {
            if (hcc in hccmap) {
                unique_hccs.add(hcc);
            }
        }

        var got_trumped = {};
        for (let hcc of unique_hccs) {
            for (let child of hccmap[hcc]['children']) {
                got_trumped[child] = hcc;
            }
        }
        let hcc_dct = {};

        for (let hcc of unique_hccs) {
            if (hccmap.hasOwnProperty(hcc)) {
                hcc_dct[hcc] = JSON.parse(JSON.stringify(hccmap[hcc]))  // Get details for this hcc Code
                delete hcc_dct[hcc]['parents'];
                delete hcc_dct[hcc]['children'];
            } else if (verbose) {
                hcc_dct[hcc] = { "desc": "", "parents": {} };
            }

        }

        for (let hcc of hcc_dct) {
            for (let trumped_hcc of got_trumped) {
                if (trumped_hcc == hcc) {  // If we find trumped HCC, replace with note of its demise
                    hcc_dct[hcc]['trumped by'] = got_trumped[trumped_hcc];
                }
            }
        }

        return hcc_dct;
    }


}

function agesex(age, sex, orec, model) {
    /*
        Create demographic variables used in regressions, from CMS SAS macro AGESEXV2
        Valid for V22, V23, V24
        :param age: float
                    Age of beneficiary
        :param sex: str
                    Gender of beneficiary
        :param orec: str
                    Original reason for enrollment
        :param model: str
                    Code for CMS model (str)
        :return: list of str
                list of demographic str for looking up demo coefficients
    */
    let age_maps = {
        "STD": ["0_34", "35_44", "45_54", "55_59", "60_64", "65_69", "70_74", "75_79",
            "80_84", "85_89", "90_94", "95_GT"],
        "NE": ["0_34", "35_44", "45_54", "55_59", "60_64", "65", "66", "67", "68", "69", "70_74", "75_79",
            "80_84", "85_89", "90_94", "95_GT"]
    };

    age = Math.trunc(age);  // In case float is passed and someone at upper age bound

    let demo_str;
    let male_sex = ["M", "MALE", "1"];
    if (male_sex.includes(sex.toUpperCase())) {
        demo_str = 'M';
    } else {
        demo_str = "F";
    }

    // Directly from CMS AGESEXV2
    let disabl = (age < 65) && (orec != "0");
    let origds = (orec == "1") && !(disabl);
    let medicaid;
    let medicaid_condition = ["CP", "CF"];
    if (medicaid_condition.includes(model)) {
        medicaid = true;
    } else {
        medicaid = false;
    }
    let new_enrolee = model.endsWith("NE");
    let age_labels = [];
    if (new_enrolee) {
        age_labels = age_maps["NE"];
    } else {
        age_labels = age_maps["STD"];
    }

    // Derive the lower bound & upper bound of each age band from ordered list of age labels
    let age_lower_bounds = [];
    let age_upper_bounds = [];
    for (let i in age_labels) {
        let split = age_labels[i].split("_");
        age_lower_bounds.push(split[0]);
        age_upper_bounds.push(split[1]);
    }

    for (const [i, lower_bound] of age_lower_bounds.entries()) {
        if (i == age_lower_bounds[age_lower_bounds.length] - 1) {
            demo_str += age_labels[i];
            break;
        }
        if ((lower_bound >= age) && (lower_bound < age_lower_bounds[i + 1])) {
            demo_str += age_labels[i];
            break;
        }
    }

    if (model.endsWith("NE")) {
        if (medicaid) {
            let mcaid_flag = "";
        } else {
            mcaid_flag = "N";
        }
        if (origds) {
            let origds_flag = "";
        } else {
            origds_flag = "N";
        }
        demo_str = mcaid_flag + "MCAID_" + origds_flag + "ORIGDIS_NE" + demo_str;
    }

    let demo_lst = [model + "_" + demo_str];
    let model_type = ["CNA", "CFA", "CPA"];
    let ds_str;
    let sex_type;

    if ((model_type.includes(model)) && origds) {
        if (sex === "M") {
            sex_type = "Male";
        } else {
            sex_type = "Female";
        }
        ds_str = model + "_OriginallyDisabled_" + sex_type;
        demo_lst.push(ds_str);
    }
    return demo_lst;
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

    let ed_leukemia = ["C9100", "C9101", "C9102", "C9500", "C9501", "C9502",
        "C7400", "C7401", "C7402", "C7410", "C7411", "C7412",
        "C7490", "C7491", "C7492"];

    let ed_bronchitis = ["J410", "J411", "J418", "J42", "J440", "J441"];

    let ed_vasc_insf = ["K55011", "K55012", "K55019", "K55021", "K55022",
        "K55029", "K55031", "K55032", "K55039", "K55041", "K55042",
        "K55049", "K55051", "K55052", "K55059", "K55061", "K55062",
        "K55069", "K5530", "K5531", "K5532", "K5533"];

    let ed_emphysema = ["J430", "J431", "J432", "J438", "J439", "J449", "J982", "J983"];

    let ed_breastca = ["C50011", "C50012", "C50019", "C50021", "C50022", "C50029",
        "C50111", "C50112", "C50119", "C50121", "C50122", "C50129",
        "C50211", "C50212", "C50219", "C50221", "C50222", "C50229",
        "C50311", "C50312", "C50319", "C50321", "C50322", "C50329",
        "C50411", "C50412", "C50419", "C50421", "C50422", "C50429",
        "C50511", "C50512", "C50519", "C50521", "C50522", "C50529",
        "C50611", "C50612", "C50619", "C50621", "C50622", "C50629",
        "C50811", "C50812", "C50819", "C50821", "C50822", "C50829",
        "C50911", "C50912", "C50919", "C50921", "C50922", "C50929"];

    let ed_low_bw = ["P0500", "P0501", "P0502", "P0503", "P0504", "P0505",
        "P0506", "P0507", "P0508", "P0509", "P0510", "P0511",
        "P0512", "P0513", "P0514", "P0515", "P0516", "P0517",
        "P0518", "P0519", "P052", "P059", "P0700", "P0701",
        "P0702", "P0703", "P0710", "P0714", "P0715", "P0716",
        "P0717", "P0718", "P0720", "P0721", "P0722", "P0723",
        "P0724", "P0725", "P0726", "P0730", "P0731", "P0732",
        "P0733", "P0734", "P0735", "P0736", "P0737", "P0738",
        "P0739", "P080", "P081", "P0821", "P0822"];

    let ed_conjoined = ["Q894"];

    let ed_newbn_substance = ["K551", "K558", "K559",
        "P041", "P0411", "P0412", "P0413", "P0414", "P0415",
        "P0416", "P0417", "P0418", "P0419", "P041A",
        "P042", "P043", "P0440", "P0441", "P0442", "P0449",
        "P045", "P046", "P048", "P0481", "P0489",
        "P049", "P930", "P938", "P961", "P962",
        "Q390", "Q391", "Q392", "Q393", "Q394", "Q6410",
        "Q6411", "Q6412", "Q6419", "Q790", "Q791", "Q792",
        "Q793", "Q794", "Q7951"];

    let ed_chron_resp = ["P270", "P271", "P278", "P279"];

    let ed_disruptive_mood = ["F3481"];

    let ed_hemophilia = ["D66", "D67"];

    // Optimal to have the loop outside of the age checks, but this is easier to read
    for (dx in dx_dct) {

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
