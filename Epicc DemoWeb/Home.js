(function () {
    "use strict";

    var cellToHighlight;
    var messageBanner;

    // The initialize function must be run each time a new page is loaded.
    Office.initialize = function (reason) {
        $(document).ready(function () {
            // Initialize the notification mechanism and hide it
            var element = document.querySelector('.MessageBanner');
            messageBanner = new components.MessageBanner(element);
            messageBanner.hideBanner();

            // If not using Excel 2016, use fallback logic.
            if (!Office.context.requirements.isSetSupported('ExcelApi', '1.1')) {
                $("#template-description").text("This sample will display the value of the cells that you have selected in the spreadsheet.");
                $('#button-text').text("Display!");
                $('#button-desc').text("Display the selection");

                //$('#highlight-button').click(displaySelectedCells);
                //$('#create-table-button').click(createTable);
                return;
            }

            $("#template-description").text("This AddIn builds HCC risk score for a Medicare Advantage member given demographic and disease factors");
            $('#button-create-text').text("Create Table");
            $('#button-create-desc').text("Creates a table with the parameters required for Member Function");
            $('#button-calculate-text').text("Calculate");
            $('#button-calculate-desc').text("Calculates HCC risk score for a Medicare Advantage member given demographic and disease factors");

            // Add a click event handler for the highlight button.
            $('#create-table-button').click(createTable);
            $('#calculate-button').click(selectedData);
        });
    };

    function hightlightHighestValue() {
        // Run a batch operation against the Excel object model
        Excel.run(function (ctx) {
            // Create a proxy object for the selected range and load its properties
            var sourceRange = ctx.workbook.getSelectedRange().load("values, rowCount, columnCount");

            // Run the queued-up command, and return a promise to indicate task completion
            return ctx.sync()
                .then(function () {
                    var highestRow = 0;
                    var highestCol = 0;
                    var highestValue = sourceRange.values[0][0];

                    // Find the cell to highlight
                    for (var i = 0; i < sourceRange.rowCount; i++) {
                        for (var j = 0; j < sourceRange.columnCount; j++) {
                            if (!isNaN(sourceRange.values[i][j]) && sourceRange.values[i][j] > highestValue) {
                                highestRow = i;
                                highestCol = j;
                                highestValue = sourceRange.values[i][j];
                            }
                        }
                    }

                    cellToHighlight = sourceRange.getCell(highestRow, highestCol);
                    sourceRange.worksheet.getUsedRange().format.fill.clear();
                    sourceRange.worksheet.getUsedRange().format.font.bold = false;

                    // Highlight the cell
                    cellToHighlight.format.fill.color = "orange";
                    cellToHighlight.format.font.bold = true;
                })
                .then(ctx.sync);
        })
            .catch(errorHandler);
    }

    function createTable() {
        Excel.run(function (context) {

            // Queue table creation logic here.
            var currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
            var memberTable = currentWorksheet.tables.add("A1:G1", true /*hasHeaders*/);
            memberTable.name = "MemberTable";

            // Queue commands to populate the table with data.
            memberTable.getHeaderRowRange().values =
                [["Condition_List", "Age", "Sex", "Model", "Orec", "Version", "Baserate"]];

            memberTable.rows.add(null /*add at the end*/, [
                ["C7910, NOTADX, D61.810, E1100, E133413", 70, "M", "CNA", 0, "v23", 0],
                ["C7910, NOTADX, D61.810, E1100", 65, "F", "CNA", 0, "v22", 0],
            ]);

            // Queue commands to format the table.
            memberTable.getRange().format.autofitColumns();
            memberTable.getRange().format.autofitRows();

            return context.sync();
        }).catch(errorHandler);
    }

    function selectedData() {
        Excel.run(function (context) {
            var currentWorksheet = context.workbook.worksheets.getActiveWorksheet()
            var sourceRange = context.workbook.getSelectedRange().load("values, rowCount, columnCount");

            return context.sync()
                .then(function () {
                    var member;
                    var condition_list = [];
                    var age, sex, model, orec, version, baserate;


                    for (var i = 0; i < sourceRange.rowCount; i++) {
                        member = "Member" + (i + 1);
                        var temp_str = sourceRange.values[i][0];
                        condition_list = temp_str.split(",").map(item => item.trim());;
                        //condition_list.push(sourceRange.values[i][0]);
                        age = sourceRange.values[i][1];
                        sex = sourceRange.values[i][2];
                        model = sourceRange.values[i][3];
                        orec = sourceRange.values[i][4];
                        version = sourceRange.values[i][5];
                        baserate = sourceRange.values[i][6];

                        const rafCalc = new RAFCalc();
                        var result = rafCalc.member(condition_list, age, sex, model, orec, version, baserate);

                        var myWorkbook = context.workbook;
                        var hccRiskSheet = myWorkbook.worksheets;
                        var riskScoreSheet = hccRiskSheet.add("HCC risk score");
                        riskScoreSheet.position = 1;
                        var riskScoreTable = riskScoreSheet.tables.add("A1:E5", true /*hasHeaders*/);
                        riskScoreTable.name = "RiskScoreTable";
                        riskScoreTable.getHeaderRowRange().values =
                            [["Member", "Demographic Risk Score", "HCC Risk Score", "Total Risk", "Total Premium"]];

                        riskScoreTable.rows.add(null /*add at the end*/, [
                            [member, result.raf.demo_score, result.raf.hcc_score, result.raf.score, result.raf.premium],
                        ]);

                        var temp_dct = result.dx_hccs;
                        var keys = Object.keys(temp_dct);
                        showNotification(keys);
                        var dxCode = keys[0];
                        var dxCodeDesc = temp_dct[dxCode].desc;
                        var dxCodeHcc = temp_dct[dxCode].hccs;
                        var hccsKeys = Object.keys(dxCodeHcc);
                        var hccsKeysDesc = dxCodeHcc[hccsKeys[0]].desc;
                        var trumpedhccs = dxCodeHcc[hccsKeys[0]]["trumped by"];

                        riskScoreTable.columns.add(null /*add columns to the end of the table*/, [
                            ["DX Code"],
                            [dxCode],
                            [dxCode],
                        ]);

                        riskScoreTable.columns.add(null /*add columns to the end of the table*/, [
                            ["DX Description"],
                            [dxCodeDesc],
                            [dxCodeDesc],

                        ]);

                        riskScoreTable.columns.add(null /*add columns to the end of the table*/, [
                            ["HCC"],
                            [hccsKeys[0]],
                            [hccsKeys[0]],

                        ]);
                        riskScoreTable.columns.add(null /*add columns to the end of the table*/, [
                            ["HCC Description"],
                            [hccsKeysDesc],
                            [hccsKeysDesc],
                        ]);
                        riskScoreTable.columns.add(null /*add columns to the end of the table*/, [
                            ["Trumped By"],
                            [trumpedhccs],
                            [trumpedhccs],
                        ]);

                        //var values;
                        //riskScoreSheet.getRange('A3').values = values;
                        //var range = riskScoreSheet.getRange('A2:A3');
                        //range.merge(true);

                        // Queue commands to format the table.
                        riskScoreTable.getRange().format.autofitColumns();
                        riskScoreTable.getRange().format.autofitRows();

                        riskScoreSheet.activate();
                    }

                });
        }).catch(errorHandler);
    }

    function displaySelectedCells() {
        Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
            function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    showNotification('The selected text is:', '"' + result.value + '"');
                } else {
                    showNotification('Error', result.error.message);
                }
            });
    }

    // Helper function for treating errors
    function errorHandler(error) {
        // Always be sure to catch any accumulated errors that bubble up from the Excel.run execution
        showNotification("Error", error);
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    }

    // Helper function for displaying notifications
    function showNotification(header, content) {
        $("#notification-header").text(header);
        $("#notification-body").text(content);
        messageBanner.showBanner();
        messageBanner.toggleExpansion();
    }
})();
