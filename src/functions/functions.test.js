const {demo_raf, dx_desc, dx2cc, dx_raf, clean_dx, clean_cc, dx_increment, 
    dx_increment_raf, dx_gap, dx_gap_raf, cc_desc, cc_info, cc_raf, cc_combine, 
    cc_gap, cc_gap_raf, cc_diff, cc_diff_raf, cc_increment, cc_increment_raf}  = require('./functions');

beforeEach(() => {
// window.location.reload();
jest.clearAllMocks();
jest.resetAllMocks();
// local.getData.mockClear();
}, 3000);

afterEach(() => {
jest.clearAllMocks();
jest.resetAllMocks();
});

// demo_raf Pass Test Cases
test('demo_raf: input: ""C7910,NOTADX,D61.810,E1100,E133413",90,"F","OREC","v22",0.0 output: "0.797"', () => {
 expect(demo_raf("C7910,NOTADX,D61.810,E1100,E133413",90,"F","","","v22",0.0)).toBe('0.797');
});

// demo_raf Fail Test Cases
test('demo_raf: input: ""C7910,NOTADX,D61.810,E1100,E133413",90,"F","OREC","v22",0.0 output: "0.797"', () => {
 expect(demo_raf("C7910,NOTADX,D61.810,E1100,E133413",90,"F","","","v22",0.0)).not.toBe('-0.797');
});

//dx_desc Pass Test Cases
test('dx_desc: input: "e11.9, v23" output: "E119:Type 2 diabetes mellitus without complications"', () => {
 expect(dx_desc("e11.9", "v23")).toBe('E119:Type 2 diabetes mellitus without complications');
});

//dx_desc Fail Test Cases
test('dx_desc: input: "e11.51, v22" output: "E1111:Type 2 diabetes mellitus with ketoacidosis with coma"', () => {
 expect(dx_desc("e11.51", "v22")).not.toBe('E1111:Type 2 diabetes mellitus with ketoacidosis with coma');
});

//dx2cc Pass Test Cases
test('dx2cc: input: "F205, E840", 65, "v23", "INS" output: "HCC57,HCC110,SCHIZOPHRENIA_gCopdCF"', () => {
expect(dx2cc("F205,E840", 65, "v23", "INS")).toBe('HCC57,HCC110,SCHIZOPHRENIA_gCopdCF');
});

//dx2cc Fail Test Cases
test('dx2cc: input: "J9502, I281, E840", 65, "v23", "CPA" output: "HCC110, HCC85, HCC82, gRespDepandArre_gCopdCF, HCC85_gCopdCF"', () => {
expect(dx2cc("J9502, I281, E840", 65, "v23", "CPA")).not.toBe('HCC110, HCC85, HCC82, gRespDepandArre_gCopdCF, HCC85_gCopdCF');
});

//dx_raf Pass Test Cases
test('dx_raf: input: "E119", 65, "v24","CNA","F",True,True,True,900 output: "0.105"', () => {
expect(dx_raf("E119",65, "v24","CNA","F","True","True","True",900)).toBe('0.105');
});

//dx_raf Fail Test Cases
test('dx_raf: input: "E1111",40, "v22","CFA","F","True","True","True",900 output: "0.376"', () => {
expect(dx_raf("E1111",40, "v22","CFA","F","True","True","True",900)).not.toBe('0.376');
});

//clean_dx Pass Test Cases
test('clean_dx: input: "E119, v24" output: "E119"', () => {
expect(clean_dx("E119", "v24")).toBe('E119');
});

//clean_dx Fail Test Cases
test('clean_dx: input: "D330, v22" output: "D3330"', () => {
expect(clean_dx("D330", "v22")).not.toBe('D3330');
});

// clean_cc Pass Test Cases
test('clean_cc: input: "19, v24" output: "HCC19"', () => {
expect(clean_cc("19", "v24")).toBe('HCC19');
});

// clean_cc Fail Test Cases
test('clean_cc: input: "HCC001, v24" output: "HCC3"', () => {
expect(clean_cc("HCC001", "v24")).not.toBe('HCC3');
});

// clean_cc Test Cases
test('clean_cc: input: "19, v24" output: "HCC19"', () => {
expect(clean_cc("19", "v24")).toBe('HCC19');
});
test('clean_cc: input: "HCC001, v24" output: "HCC1"', () => {
expect(clean_cc("HCC001", "v24")).toBe('HCC1');
});
test('clean_cc: input: "hcc18, v24" output: "HCC18"', () => {
expect(clean_cc("hcc18", "v24")).not.toBe('HCC19');
});

//dx_increment Pass Test Cases
test('dx_increment: input: "E119,F1110","E1111,E1042,F1020" output: "E1111,F1020,-E119,-F1110"', () => {
expect(dx_increment("E119,F1110","E1111,E1042,F1020")).toBe('E1111,F1020,-E119,-F1110');
});

//dx_increment Fail Test Cases
test('dx_increment: input: "E119,F1110","E1111,E1042,F1020" output: "E1042,-E119"', () => {
expect(dx_increment("E119,F10250","E1042,F1020")).not.toBe('C770');
});

//dx_increment_raf Pass Test Cases
test('dx_increment_raf: input: "E119,F1110","E1111,E1042,F1020","v23","CPD" output: "0.254"', () => {
expect(dx_increment_raf("E119,F1110","E1111,E1042,F1020","v23","CPD")).toBe('0.254');
});

// dx_increment_raf Fail Test Cases
test('dx_increment_raf: input: "E119,F1110","E1111,E1042,F1020","v23","CPD" output: "0.254"', () => {
expect(dx_increment_raf("E119,F1110,K7111,D599,I213","E1111,F1020,K744,D599,C770")).not.toBe('0.254');
});

// dx_gap Pass Test Cases
test('dx_gap: input: "E119,I281","E1111,E1042,F1020" output: "I281"', () => {
expect(dx_gap("E119,I281","E1111,E1042,F1020")).toBe('I281');
});

// dx_gap Fail Test Cases
test('dx_gap: input: "E1042,F10250,D708,I281","E119,F1020" output: "D708,I281,F10250,E1042"', () => {
expect(dx_gap("E1042,F10250,D708,I281","E119,F1020")).not.toBe('D708,I281,F10250,E1042');
});

// dx_gap_raf Pass Test Cases
test('dx_gap_raf: input: "E119,I281","E1111,E1042,F1020","v23","CPD" output: "-0.376"', () => {
expect(dx_gap_raf("E119,I281","E1111,E1042,F1020","v23","CPD")).toBe('-0.376');
});

// dx_gap_raf Fail Test Cases
test('dx_gap_raf: input: "T8602","C770","v23","CFA" output: "-0.855"', () => {
expect(dx_gap_raf("T8602","C770","v23","CFA")).not.toBe('-0.55');
});

// cc_desc 
test('cc_desc function test, i/p: HCC19, HCC85', () => {
expect(cc_desc("HCC19","v24")).toBe("HCC19:Diabetes without Complication");
});
test('cc_desc function test, i/p: HCC1', () => {
expect(cc_desc("HCC1","v22")).toBe("HCC1:HIV/AIDS");
});
test('cc_desc function test, i/p: 19', () => {
expect(cc_desc("19","v23")).not.toBe("HCC1:HIV/AIDS");
});

// test for CC Info
test('Test for CC_INFO (CASE 1)', () => {
expect(cc_info("HCC85", "v23", "CFA")).toBe("desc: Congestive Heart Failure, children: , parents: , RAF: 0.355");
});
test('Test for CC_INFO (CASE 2)', () => {
expect(cc_info("HCC10", "v22", "CPD")).toBe("desc: Lymphoma and Other Cancers, children: HCC11,HCC12, parents: HCC8,HCC9, RAF: 0.577");
});
test('Test for CC_INFO (CASE 3) {negative}', () => {
expect(cc_info("HCC96", "v23", "INS")).not.toBe("desc: Spinal Cord Disorders/Injuries, children: HCC169, parents: HCC70, HCC71, RAF: 0.519");
});

// test for cc_ raf
test('Test for CC_RAF (case 1)', () => {
expect(cc_raf("HCC19","v24")).toBe('0.105');
});
test('Test for CC_RAF (case 2)', () => {
expect(cc_raf("HCC1","v23")).toBe('0.344');
});
test('Test for CC_RAF (case 8)', () => {
expect(cc_raf("HCC8","v22")).not.toBe('0.344');
});

// Test for CC_Combine
test('Test for CC_COMBINE (CASE 1) ', () => {
expect(cc_combine("HCC56,HCC57", "v24")).toBe("HCC56,HCC57,gSubstanceAbuse_gPsychiatric_V24");
});
test('Test for CC_COMBINE (CASE 2) ', () => {
expect(cc_combine("HCC2,HCC158", "v24","INS")).toBe("HCC2,HCC158,PRESSURE_ULCER,SEPSIS_PRESSURE_ULCER");
});
test('Test for CC_COMBINE (CASE 3) {negative} ', () => {
expect(cc_combine("HCC17,HCC18,HCC8,HCC10","v23")).not.toBe("HCC17,HCC18");
});

// cc gap_RAF
test('Test for CC_GAP_RAF (CASE 1) ', () => {
expect(cc_gap_raf("HCC19,HCC85","HCC17,HCC18,HCC55","v23","CFD")).toBe("-0.441");
});
test('Test for CC_GAP_RAF (CASE 2) ', () => {
expect(cc_gap_raf("HCC47,HCC8","HCC12")).toBe("-3.184");
});
test('Test for CC_GAP_RAF (CASE 2) ', () => {
expect(cc_gap_raf("HCC47,HCC8","HCC12,HCC18")).not.toBe("-1.184");
});

// CC_GAP
test('Test for CC_GAP (CASE 1) ', () => {
expect(cc_gap("HCC19,HCC85","HCC17,HCC18,HCC55","v23")).toBe("HCC85,HCC85_gDiabetesMellit");
});
test('Test for CC_GAP (CASE 2) ', () => {
expect(cc_gap("HCC19,HCC56","HCC85,HCC55")).toBe("HCC19");
});
test('Test for CC_GAP (CASE 3) ', () => {
expect(cc_gap("HCC18,HCC19","HCC85,HCC55")).not.toBe("HCC1");
});

//cc_diff 
test('Test for CC_diff (CASE 1) ', () => {
expect(cc_diff("HCC19,HCC56","HCC17,HCC18,HCC55","v23")).toBe("adds: HCC17,HCC55, upgraded: HCC19,HCC56, downgraded: , downgraded_to: , deletes: ");
});
test('Test for CC_diff (CASE 2) ', () => {
expect(cc_diff("HCC19,HCC56,HCC27,HCC46,HCC86","HCC17,HCC55,HCC28,HCC46,HCC8")).toBe("adds: HCC8,HCC17,HCC55, upgraded: HCC19,HCC56, downgraded: HCC27, downgraded_to: HCC28, deletes: HCC86");
});
test('Test for CC_diff (CASE 3) ', () => {
expect(cc_diff("HCC85","HCC8")).not.toBe("adds: HCC85, upgraded: , downgraded: , downgraded_to: , deletes: HCC8");
});

// cc_diff_raf
test('Test for CC_DIFF_RAF (CASE 1) ', () => {
expect(cc_diff_raf("HCC19,HCC27,HCC46,HCC56,HCC86","HCC17,HCC28,HCC8,HCC46,HCC55","v23","CPD")).toBe("2.103");
});
test('Test for CC_DIFF_RAF (CASE 2) ', () => {
expect(cc_diff_raf("HCC85","HCC8","v23","CFA")).toBe("2.344");
});
test('Test for CC_DIFF_RAF (CASE 3) ', () => {
expect(cc_diff_raf("HCC85","HCC18","v23","CPD")).not.toBe("0.196");
});

// cc_INCREMENT_RAF
test('Test for CC_INCREMENT_RAF (CASE 1) ', () => {
expect(cc_increment_raf("HCC19,HCC56","HCC17,HCC18,HCC55","v23","CPD")).toBe("0.254");
});
test('Test for CC_INCREMENT_RAF (CASE 2) ', () => {
expect(cc_increment_raf("HCC85","HCC8","v23","CFA")).toBe("2.551");
});
test('Test for CC_INCREMENT_RAF (CASE 3) ', () => {
expect(cc_increment_raf("HCC85","HCC8","v23","CFA")).not.toBe("1.654");
});

// cc_INCREMENT
test('Test for CC_INCREMENT (CASE 1) ', () => {
expect(cc_increment("HCC19,HCC56","HCC17,HCC18,HCC55","v23","CPD")).toBe("HCC17,HCC55,-HCC19,-HCC56");
});
test('Test for CC_INCREMENT (CASE 2) ', () => {
expect(cc_increment("HCC85","HCC8")).toBe("HCC8");
});
test('Test for CC_INCREMENT (CASE 3) ', () => {
expect(cc_increment("HCC19,HCC56,HCC27,HCC46,HCC86","HCC17,HCC28,HCC55,HCC8,HCC48")).toBe("HCC8,HCC17,HCC55,-HCC19,-HCC56");
});
test('Test for CC_INCREMENT (CASE 4) ', () => {
expect(cc_increment("HCC19","HCC18")).not.toBe("HCC8");
});
test('Test for CC_INCREMENT (CASE 4) ', () => {
    expect(cc_increment("HCC19","HCC18")).not.toBe("HCC8");
});

// cc_raf
test('Test for CC_RAF (CASE 1) ', () => {
expect(cc_raf("HCC19","v24")).toBe("0.105");
});
test('Test for CC_RAF (CASE 3) ', () => {
expect(cc_raf("HCC1","v23")).toBe("0.344");
});
test('Test for CC_RAF (CASE 3) ', () => {
expect(cc_raf("HCC8","v23")).not.toBe("0.251");
});