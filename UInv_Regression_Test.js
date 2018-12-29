/*
	global UInv, $, SugarCube
*/

window.Tester = function(TestType) {
	UInv.Initialize(UInv.ERROR_TO_CONSOLE);
	var TestList;
	TestType = TestType.toLowerCase();
	switch(TestType) {
		case "utility":
			TestList = UtilityTestList;
			break;
		case "other":
			TestList = OtherTestList;
			break;
		case "bag":
			TestList = BagTestList;
			break;
		case "item":
			TestList = ItemTestList;
			break;
		case "tag":
			TestList = TagTestList;
			break;
		case "pocket":
			TestList = PocketTestList;
			break;
		// display?  ***
		// all?  ***
		default:
			alert("Error: Unknown test type passed to tester.");
			return false;
	}
	TestType = TestType.toUpperFirst();
	var n = 0, warnings = 0, err, lng = TestList.length, id = setInterval(function () {
		if (n == 0) {
			$("#results").empty();
			$("#passages button").attr("disabled", "true");
		}
		if (n == lng) {
			clearInterval(id);
			$("#results").wiki("\n''Successfully completed all UInv " + TestType.toUpperFirst() + " tests!''\n");
			$("#results").wiki("''Press {{{F12}}} to verify in the console log that no extra errors were logged.''\n");
			if (warnings == 1) {
				$("#count").empty().wiki("''" + TestType + " Test:'' " + lng + " tests = @@.green;100% success@@ + @@.yellow;1 warning@@");
			} else if (warnings > 1) {
				$("#count").empty().wiki("''" + TestType + " Test:'' " + lng + " tests = @@.green;100% success@@ + @@.yellow;" + warnings + " warnings@@");
			} else {
				$("#count").empty().wiki("''" + TestType + " Test:'' " + lng + " tests = @@.green;100% success!@@");
			}
			$("#passages button").removeAttr("disabled");
			n = 0;
		} else {
			try {
				var ActualResult, ExpectedResult = TestList[n].result, VarName;
				if (UInv.isProperty(TestList[n], "error")) {
					console.log("+ Expected error: " + TestList[n].error);
				}
				if (TestList[n].result == "* >") {  // Run code
					$.wiki("<<" + TestList[n].test + ">>");
				} else {  // Test UInv function
					$.wiki("<<set _testResult = UInv." + TestList[n].test + ">>");
					ActualResult = SugarCube.State.temporary.testResult;
				}
				if (UInv.isString(ExpectedResult) && (ExpectedResult.indexOf("< = ") == 0)) {
					VarName = ExpectedResult.substring(5);
					ExpectedResult = SugarCube.State.temporary[VarName];
				}
				if (UInv.isString(ExpectedResult) && (ExpectedResult.indexOf("* = ") == 0)) {
					VarName = ExpectedResult.substring(5);
					SugarCube.State.temporary[VarName] = SugarCube.State.temporary.testResult;
					$("#results").wiki((n+1) + ") @@.blue;''Stored Result'':@@ {{{_" + VarName + "}}} = {{{" + TestList[n].test + "}}}\n");
					$("#results").wiki("{{{_" + VarName + "}}} = <code>" + ActualResult + "</code>\n");
					err = UInv.GetLastError(true);
					if (err) {
						$("#results").wiki("@@.red;''Unexpected Error''@@ = <code>" + err + "</code>\n\n''Error: Testing halted!!''");
						clearInterval(id);
						$("#passages button").removeAttr("disabled");
						n--;
					}
				} else if (ExpectedResult == "* >") {
					$("#results").wiki((n+1) + ") @@.blue;''Ran Code'':@@ {{{" + "<<" + TestList[n].test + ">>" + "}}}\n");
					err = UInv.GetLastError(true);
					if (err) {
						$("#results").wiki("@@.red;''Unexpected Error''@@ = <code>" + err + "</code>\n\n''Error: Testing halted!!''");
						clearInterval(id);
						$("#passages button").removeAttr("disabled");
						n--;
					}
				} else if (UInv.valuesAreEqual(ActualResult, ExpectedResult)) {
					$("#results").wiki((n+1) + ") @@.green;''Pass'':@@ <code>" + TestList[n].test + "</code> = <code>" + ActualResult + "</code>\n");
					err = UInv.GetLastError(true);
					if (err) {
						if (UInv.isProperty(TestList[n], "error")) {
							if (err == TestList[n].error) {
								$("#results").wiki("@@.green;''Correct Error''@@ = <code>" + err + "</code>\n");
							} else {
								$("#results").wiki("@@.yellow;''Mismatched Error''@@ =\n<code>" + err + "</code>\n");
								$("#results").wiki(" - @@.yellow;''Should Be''@@ =\n<code>" + TestList[n].error + "</code>\n");
								warnings++;
							}
						} else {
							$("#results").wiki("@@.red;''Unexpected Error''@@ = <code>" + err + "</code>\n\n''Error: Testing halted!!''");
							clearInterval(id);
							$("#passages button").removeAttr("disabled");
							n--;
						}
					}
				} else {
					$("#results").wiki((n+1) + ") @@.red;''Fail!'':@@ <code>" + TestList[n].test + "</code> =\n<code>" + ActualResult + "</code>\n");
					$("#results").wiki(" - @@.red;''Should Be''@@ =\n<code>" + ExpectedResult + "</code>\n");
					err = UInv.GetLastError(true);
					if (err) {
						$("#results").wiki("@@.red;''Unexpected Error''@@ = <code>" + err + "</code>\n");
					} else if (UInv.isProperty(TestList[n], "error")) {
						$("#results").wiki("@@.red;''Expected Error Missing''@@ = <code>" + TestList[n].error + "</code>\n");
					}
					$("#results").wiki("\n''Error: Testing halted!!''\n");
					clearInterval(id);
					$("#passages button").removeAttr("disabled");
					n--;
				}
				n++;
				if (warnings == 1) {
					$("#count").empty().wiki("''" + TestType + " Test:'' " + n + "/" + lng + " = " + (n/lng*100).toFixed(3) + "% successful + @@.yellow;1 warning@@");
				} else if (warnings > 1) {
					$("#count").empty().wiki("''" + TestType + " Test:'' " + n + "/" + lng + " = " + (n/lng*100).toFixed(3) + "% successful + @@.yellow;" + warnings + " warnings@@");
				} else {
					$("#count").empty().wiki("''" + TestType + " Test:'' " + n + "/" + lng + " = " + (n/lng*100).toFixed(3) + "% successful");
				}
			} catch(e) {
				$("#results").wiki((n+1) + ") @@.purple;''Tester Coding Error or Major Bug:''@@ <code>" + TestList[n].test + "</code>\n");
				$("#results").wiki(" - @@.red;''Error''@@ = <code>" + e + "</code>\n\n''Error: Testing halted!!''");
				clearInterval(id);
				$("#passages button").removeAttr("disabled");
				n--;
			}
		}
	}, 0);
};
/*  RESULT NOTATION:
		result: "* >"           = Run this code without the "set _result = UInv." in the front.
		result: "* = _Variable" = Store the result in the variable.
		result: "< = _Variable" = Test the result to see if it matches the variable and show an error if it doesn't.
*/


/* Add checks to make sure that $UInvCurrentBagName and/or $UInvCurrentItemName are set properly. *** */
/* Add a check to make sure the function name is found in the error messages. *** */


var UtilityTestList = [
	{ test: 'numberToAPString()', result: undefined },
	{ test: 'numberToAPString("X")', result: "X" },
	{ test: 'numberToAPString(1, "X")', result: "one" },
	{ test: 'numberToAPString("1")', result: "1" },
	{ test: 'numberToAPString(1)', result: "one" },
	{ test: 'numberToAPString(1000)', result: "1,000" },
	{ test: 'numberToAPString(999999)', result: "999,999" },
	{ test: 'numberToAPString(1000000)', result: "1 million" },
	{ test: 'numberToAPString(1000000000)', result: "1 billion" },
	{ test: 'numberToAPString(1000000000000)', result: "1 trillion" },
	{ test: 'numberToAPString(1000000000000000)', result: "1 quadrillion" },
	{ test: 'numberToAPString(1.1)', result: "1.1" },
	{ test: 'numberToAPString(1001)', result: "1,001" },
	{ test: 'numberToAPString(1000001)', result: "1 million" },
	{ test: 'numberToAPString(1000000001)', result: "1 billion" },
	{ test: 'numberToAPString(1000000000001)', result: "1 trillion" },
	{ test: 'numberToAPString(1000000000000001)', result: "1 quadrillion" },
	{ test: 'numberToAPString(12345678)', result: "12.35 million" },
	{ test: 'numberToAPString(12300678)', result: "12.3 million" },
	{ test: 'numberToAPString(12000678)', result: "12 million" },
	{ test: 'numberToAPString(12111.3)', result: "12,111.3" },
	{ test: 'numberToAPString(123111.34)', result: "123,111.34" },
	{ test: 'numberToAPString(12111.345)', result: "12,111.35" },
	{ test: 'numberToAPString(1111.3456)', result: "1,111.35" },
];
/*
	UTILITY FUNCTIONS:
	==================
	Fully Tested:  (1 of 51 utility functions tested)
		numberToAPString, ...
	Partially Tested:
		...
	Currently Untested:
		all
	Currently Skipped:
		...
*/

var OtherTestList = [
];
/*
	OTHER UINV FUNCTIONS:
	=====================
	Fully Tested:  (0 of 7 "other" functions tested) + (0 of 2 macros tested)
		...
	Partially Tested:
		...
	Currently Untested:
		GetUserAlerts, SetUserAlerts, ClearErrors, GetLastError, SetMergeItemMethod, Initialize, Version, <<UInvSet>>, <<UInvTry>>
	Currently Skipped:
		...
*/

var BagTestList = [
	{ test: 'GetBagCountByDefaultType()', result: 0 },
	{ test: 'GetCurrentBagName()', result: "" },
	{ test: 'SetCurrentBagName("")', result: true },
	{ test: 'GetBagsArray()', result: [] },
	{ test: 'GetBagCount()', result: 0 },
	{ test: 'BagExists("test")', result: false },
	{ test: 'AddBag()', result: undefined, error: 'Error: BagName passed to AddBag is not a string.' },
	{ test: 'AddBag("borkpack")', result: undefined, error: 'Error: AddBag failed. Unknown bag type "borkpack".' },
	{ test: 'AddBag("backpack")', result: true },
	{ test: 'GetBagsArray()', result: ["backpack"] },
	{ test: 'GetBagCount()', result: 1 },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'AddBag("backpack")', result: undefined, error: 'Error: AddBag cannot create bag "backpack". Bag already exists.' },
	{ test: 'AddBag("rucksack", "x")', result: undefined, error: 'Error: AddBag failed. Unknown bag type "x".' },
	{ test: 'AddBag("rucksack", 3)', result: undefined, error: 'Error: DefaultBagType passed to AddBag is not a string.' },
	{ test: 'AddBag("")', result: undefined, error: 'Error: BagName passed to AddBag cannot be "-" or "".' },
	{ test: 'AddBag("rucksack", "-")', result: undefined, error: 'Error: AddBag failed. Unknown bag type "-".' },
	{ test: 'AddBag("treasure bag")', result: true },
	{ test: 'AddBag("rucksack", "backpack")', result: true },
	{ test: 'GetCurrentBagName()', result: "rucksack" },
	{ test: 'AddBag("clothing")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("clothing"))', result: '{ UInvTouched = false, black belt : { black belt.UInvDefaultItemType = "belt", black belt.UInvQuantity = 2, black belt.description = "A black belt." }, pants : { pants.UInvQuantity = 4 }, shirt : { shirt.UInvQuantity = 3, shirt.description = "An ordinary white shirt.", shirt.image = "icon_cloth_shirt1.png", shirt.place : [ "torso2" ], shirt.plural = "shirts", shirt.singular = "a shirt", shirt.size = 3, shirt.type : [ "clothing" ] }, shoes : { } }' },
	{ test: 'GetBagsArray().sort()', result: ["backpack", "clothing", "rucksack", "treasure bag"].sort() },  // bags have to be sorted because array may not always get filled in the same order
	{ test: 'GetBagCount()', result: 4 },
	{ test: 'BagExists("backpack")', result: true },
	{ test: 'BagExists("treasure bag")', result: true },
	{ test: 'BagExists("rucksack")', result: true },
	{ test: 'BagExists("suitcase")', result: false },
	{ test: 'BagExists()', result: undefined, error: 'Error: Name passed to BagExists is not a string or array of strings.' },
	{ test: 'SetCurrentBagName()', result: undefined, error: 'Error: Name passed to SetCurrentBagName is not a string.' },
	{ test: 'GetCurrentBagName()', result: "rucksack" },
	{ test: 'SetCurrentBagName("Backpack")', result: undefined, error: 'Error: SetCurrentBagName cannot find bag "Backpack".' },
	{ test: 'GetCurrentBagName()', result: "rucksack" },
	{ test: 'SetCurrentBagName("backpack")', result: true },
	{ test: 'GetCurrentBagName()', result: "backpack" },
	{ test: 'CreateBag()', result: undefined, error: 'Error: BagName passed to CreateBag is not a string.' },
	{ test: 'CreateBag("")', result: undefined, error: 'Error: CreateBag failed. Invalid bag name "".' },
	{ test: 'CreateBag("backpack")', result: undefined, error: 'Error: CreateBag cannot create bag "backpack". Bag already exists with that name.' },
	{ test: 'CreateBag("pouch")', result: true },
	{ test: 'BagExists("pouch")', result: true },
	{ test: 'GetItemsArray("backpack").sort()', result: ["belt", "dagger", "pants"].sort() },  // items have to be sorted because array may not always get filled in the same order
	{ test: 'GetItemCount("backpack")', result: 3 },
	{ test: 'EmptyBag("backpack")', result: true },
	{ test: 'GetItemCount("backpack")', result: 0 },
	{ test: 'EmptyBag("backpack")', result: true },
	{ test: 'GetItemCount("backpack")', result: 0 },
	{ test: 'EmptyBag("")', result: true },
	{ test: 'GetItemsArray("rucksack").sort()', result: ["belt", "dagger", "pants"].sort() },  // items have to be sorted because array may not always get filled in the same order
	{ test: 'GetItemCount("rucksack")', result: 3 },
	{ test: 'EmptyBag("")', result: true },
	{ test: 'GetItemCount("rucksack")', result: 0 },
	{ test: 'GetBagsDefaultType()', result: undefined, error: 'Error: BagName passed to GetBagsDefaultType is not a string.' },
	{ test: 'GetBagsDefaultType(9)', result: undefined, error: 'Error: BagName passed to GetBagsDefaultType is not a string.' },
	{ test: 'GetBagsDefaultType("X")', result: undefined, error: 'Error: GetBagsDefaultType failed. Cannot find bag "X".' },
	{ test: 'GetBagsDefaultType("")', result: "backpack" },
	{ test: 'GetBagsDefaultType("backpack")', result: "backpack" },
	{ test: 'GetBagsDefaultType("treasure bag")', result: "treasure bag" },
	{ test: 'GetBagsDefaultType("rucksack")', result: "backpack" },
	{ test: 'GetBagsDefaultType("pouch")', result: "-" },
	{ test: 'GetBagsDefaultType()', result: undefined, error: 'Error: BagName passed to GetBagsDefaultType is not a string.' },
	{ test: 'GetBagsDefaultType("test")', result: undefined, error: 'Error: GetBagsDefaultType failed. Cannot find bag "test".' },
	{ test: 'GetBagCountByDefaultType()', result: 4 },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'DeleteBag("backpack")', result: true },
	{ test: 'GetBagCount()', result: 4 },
	{ test: 'DeleteBag("clothing")', result: true },
	{ test: 'GetBagCount()', result: 3 },
	{ test: 'AddBag("backpack")', result: true },
	{ test: 'GetItemsArray("backpack").sort()', result: ["belt", "dagger", "pants"].sort() },
	{ test: 'CopyBag()', result: undefined, error: 'Error: Name passed to CopyBag is not a string.' },
	{ test: 'CopyBag("backpack", 3)', result: undefined, error: 'Error: Name passed to CopyBag is not a string.' },
	{ test: 'CopyBag("fail", "suitcase")', result: undefined, error: 'Error: CopyBag failed. Cannot find bag "fail".' },
	{ test: 'CopyBag("backpack", "backpack")', result: undefined, error: 'Error: CopyBag failed. Bag "backpack" already exists.' },
	{ test: 'CopyBag("backpack", "suitcase")', result: true },
	{ test: 'GetItemsArray("suitcase").sort()', result: ["belt", "dagger", "pants"].sort() },
	{ test: 'GetBagPropertyArray()', result: undefined, error: 'Error: Name passed to GetBagPropertyArray is not a string.' },
	{ test: 'GetBagPropertyArray(3)', result: undefined, error: 'Error: Name passed to GetBagPropertyArray is not a string.' },
	{ test: 'GetBagPropertyArray("X")', result: undefined, error: 'Error: GetBagPropertyArray cannot find bag "X".' },
	{ test: 'GetBagPropertyArray("")', result: ["maxCarryWeight"] },
	{ test: 'GetBagPropertyArray("backpack")', result: ["maxCarryWeight"] },
	{ test: 'GetBagPropertyArray("pouch")', result: [] },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'DeleteBag()', result: undefined, error: 'Error: Name passed to DeleteBag is not a string.' },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'DeleteBag(3)', result: undefined, error: 'Error: Name passed to DeleteBag is not a string.' },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'DeleteBag("X")', result: undefined, error: 'Error: DeleteBag cannot find bag "X".' },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'DeleteBag("")', result: true },
	{ test: 'GetBagCount()', result: 4 },
	{ test: 'CreateBag("pouch")', result: true },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'DeleteBag("pouch")', result: true },
	{ test: 'GetBagCount()', result: 4 },
	{ test: 'CreateBag("pouch")', result: true },
	{ test: 'CreateBag("testX")', result: true },
	{ test: 'CreateBag("testY")', result: true },
	{ test: 'CreateBag("testZ")', result: true },
	{ test: 'GetBagCount()', result: 8 },
	{ test: 'DeleteBag(["testX", "testY"])', result: true },
	{ test: 'GetBagCount()', result: 6 },
	{ test: 'DeleteBag(["testX", "testZ"])', result: undefined, error: 'Error: Some bags passed to DeleteBag did not exist.' },
	{ test: 'GetBagCount()', result: 6 },
	{ test: 'DeleteBag(["testZ", "testZ"])', result: true },
	{ test: 'GetBagCount()', result: 5 },
	{ test: 'GetBagsArray().sort()', result: ["rucksack", "backpack", "suitcase", "pouch", "treasure bag"].sort() },  // bags have to be sorted because array may not always get filled in the same order
	{ test: 'RenameBag()', result: undefined, error: 'Error: Name passed to RenameBag is not a string.' },
	{ test: 'RenameBag("X")', result: undefined, error: 'Error: Name passed to RenameBag is not a string.' },
	{ test: 'RenameBag("X", "Y")', result: undefined, error: 'Error: RenameBag failed. Cannot find bag "X".' },
	{ test: 'RenameBag("suitcase", "backpack")', result: undefined, error: 'Error: RenameBag failed. Bag "backpack" already exists.' },
	{ test: 'RenameBag("suitcase", "duffle bag")', result: true },
	{ test: 'GetBagsArray().sort()', result: ["rucksack", "backpack", "duffle bag", "pouch", "treasure bag"].sort() },  // bags have to be sorted because array may not always get filled in the same order
	{ test: 'BagHasProperty()', result: undefined, error: 'Error: BagName passed to BagHasProperty is not a string.' },
	{ test: 'BagHasProperty("X")', result: undefined, error: 'Error: BagHasProperty cannot find bag "X".' },
	{ test: 'BagHasProperty("backpack")', result: undefined, error: 'Error: BagPropertyName passed to BagHasProperty is not a string or array of strings.' },
	{ test: 'BagHasProperty("backpack", "maxCarryWeight")', result: true },
	{ test: 'BagHasProperty("backpack", "max")', result: false },
	{ test: 'BagHasProperty("backpack", ["maxCarryWeight"])', result: true },
	{ test: 'BagHasProperty("backpack", ["maxCarryWeight", "maxCarryWeight"])', result: true },
	{ test: 'BagHasProperty("backpack", ["maxCarryWeight", "maxcarryweight"])', result: false },
	{ test: 'BagHasProperty("pouch", "X")', result: false },
	{ test: 'SetBagPropertyValue("backpack", "test", true)', result: true },
	{ test: 'GetBagPropertyArray("backpack").sort()', result: ["maxCarryWeight", "test"].sort() },
	{ test: 'BagHasProperty("backpack", ["test", "maxCarryWeight"])', result: true },
	{ test: 'GetBagPropertyValue()', result: undefined, error: 'Error: Name passed to GetBagPropertyValue is not a string.' },
	{ test: 'GetBagPropertyValue("X")', result: undefined, error: 'Error: Name passed to GetBagPropertyValue is not a string.' },
	{ test: 'GetBagPropertyValue("X", "X")', result: undefined, error: 'Error: GetBagPropertyValue cannot find bag "X".' },
	{ test: 'GetBagPropertyValue("backpack")', result: undefined, error: 'Error: Name passed to GetBagPropertyValue is not a string.' },
	{ test: 'GetBagPropertyValue("backpack", "X")', result: undefined, error: 'Error: GetBagPropertyValue cannot find bag property "X" on bag "backpack".' },
	{ test: 'GetBagPropertyValue("backpack", "maxCarryWeight")', result: 20 },
	{ test: 'GetBagPropertyValue("pouch", "X")', result: undefined, error: 'Error: GetBagPropertyValue cannot find bag property "X" on bag "pouch".' },
	{ test: 'SetBagPropertyValue()', result: undefined, error: 'Error: BagPropertyName passed to SetBagPropertyValue is not a string.' },
	{ test: 'SetBagPropertyValue("X")', result: undefined, error: 'Error: BagPropertyName passed to SetBagPropertyValue is not a string.' },
	{ test: 'SetBagPropertyValue("X", "X")', result: undefined, error: 'Error: SetBagPropertyValue failed. Value parameter is missing.' },
	{ test: 'SetBagPropertyValue("backpack", "X")', result: undefined, error: 'Error: SetBagPropertyValue failed. Value parameter is missing.' },
	{ test: 'SetBagPropertyValue("backpack", "test", true)', result: true },
	{ test: 'GetBagPropertyValue("backpack", "test")', result: true },
	{ test: 'SetBagPropertyValue("backpack", "unk", undefined)', result: true },
	{ test: 'GetBagPropertyValue("backpack", "unk")', result: undefined },
	{ test: 'DeleteBagProperty("backpack", "unk")', result: true },
	{ test: 'GetBagPropertyValue("backpack", "maxCarryWeight")', result: 20 },
	{ test: 'SetBagPropertyValue("backpack", "maxCarryWeight", 30)', result: true },
	{ test: 'GetBagPropertyValue("backpack", "maxCarryWeight")', result: 30 },
	{ test: 'SetBagPropertyValue(["backpack", "rucksack"], "maxCarryWeight", 40)', result: true },
	{ test: 'GetBagPropertyValue("backpack", "maxCarryWeight")', result: 40 },
	{ test: 'GetBagPropertyValue("rucksack", "maxCarryWeight")', result: 40 },
	{ test: 'SetBagPropertyValue(["backpack", "X", "rucksack"], "maxCarryWeight", 50)', result: undefined, error: 'Error: SetBagPropertyValue failed. Invalid bag name in array.' },
	{ test: 'GetBagPropertyValue("backpack", "maxCarryWeight")', result: 40 },
	{ test: 'GetBagPropertyValue("rucksack", "maxCarryWeight")', result: 40 },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.maxCarryWeight = 40, UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'SetBagPropertyValue("backpack", "maxCarryWeight", 20)', result: true },
	{ test: 'GetBagPropertyValue("backpack", "maxCarryWeight")', result: 20 },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'SetBagPropertyValue("backpack", "UInvVariableType", true)', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.UInvVariableType = true, UInvProperties.maxCarryWeight = 20, UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'DeleteBagProperty("backpack", "UInvVariableType")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'DeleteBagProperty("backpack", "test")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'SetBagPropertyValue(3, "test", true)', result: undefined, error: 'Error: BagName passed to SetBagPropertyValue is not a string or an array of strings.' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("rucksack"))', result: '{ UInvDefaultBagType = "backpack", UInvProperties : { UInvProperties.maxCarryWeight = 40 } }' },
	{ test: 'SetBagPropertyValue(["backpack", "rucksack"], "test", true)', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("rucksack"))', result: '{ UInvDefaultBagType = "backpack", UInvProperties : { UInvProperties.maxCarryWeight = 40, UInvProperties.test = true } }' },
	{ test: 'SetBagPropertyValue(["rucksack", "X"], "maxCarryWeight", 20)', result: undefined, error: 'Error: SetBagPropertyValue failed. Invalid bag name in array.' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("rucksack"))', result: '{ UInvDefaultBagType = "backpack", UInvProperties : { UInvProperties.maxCarryWeight = 40, UInvProperties.test = true } }' },
	{ test: 'GetBagsArray().sort()', result: ["rucksack", "backpack", "duffle bag", "pouch", "treasure bag"].sort() },  // bags have to be sorted because array may not always get filled in the same order
	{ test: 'SetBagPropertyValue(["rucksack", "duffle bag"], "maxCarryWeight", 20)', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("rucksack"))', result: '{ UInvDefaultBagType = "backpack", UInvProperties : { UInvProperties.test = true } }' },
	{ test: 'GetBagPropertyValue("rucksack", "maxCarryWeight")', result: 20 },
	{ test: 'GetBagPropertyObject()', result: undefined, error: 'Error: Name passed to GetBagPropertyObject is not a string.' },
	{ test: 'GetBagPropertyObject("X")', result: undefined, error: 'Error: GetBagPropertyObject cannot find bag "X".' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ maxCarryWeight = 20, test = true }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("pouch"))', result: '{ }' },
	{ test: 'SetBagsDefaultType()', result: undefined, error: 'Error: Name passed to SetBagsDefaultType is not a string.' },
	{ test: 'SetBagsDefaultType("X")', result: undefined, error: 'Error: Name passed to SetBagsDefaultType is not a string.' },
	{ test: 'SetBagsDefaultType("X", "X")', result: undefined, error: 'Error: SetBagsDefaultType cannot find bag "X".' },
	{ test: 'SetBagsDefaultType("backpack", "X")', result: undefined, error: 'Error: SetBagsDefaultType failed. "X" is not a valid default bag type.' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'SetBagsDefaultType("backpack", "-")', result: true },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ maxCarryWeight = 20, test = true }' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvDefaultBagType = "-", UInvProperties : { UInvProperties.maxCarryWeight = 20, UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'SetBagsDefaultType("backpack", "backpack")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ maxCarryWeight = 20, test = true }' },
	{ test: 'SetBagsDefaultType("backpack", "treasure bag")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvDefaultBagType = "treasure bag", UInvProperties : { UInvProperties.UInvVariableType = true, UInvProperties.maxCarryWeight = 20, UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ UInvVariableType = true, maxCarryWeight = 20, test = true }' },
	{ test: 'AddBag("treasures")', result: true },
	{ test: 'DeleteItem("treasures", "rainbow potion")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("treasures"))', result: '{ belt : { }, dagger : { }, heavy mace : { }, pants : { }, shortsword : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("treasures"))', result: '{ }' },
	{ test: 'SetBagsDefaultType("treasures", "backpack")', result: false },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("treasures"))', result: '{ belt : { }, dagger : { }, heavy mace : { }, pants : { }, shortsword : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("treasures"))', result: '{ }' },
	{ test: 'AddBag("chest", "treasures")', result: true },
	{ test: 'set _RPotion = UInv.GetItemObject("chest", "rainbow potion")', result: "* >" },  // Result is an object, so no need to use "* = _RPotion" instead of "* >"
	{ test: 'set delete _RPotion.UInvQuantity', result: "* >" },
	{ test: 'getObjectProperties(_RPotion, "rainbow potion")', result: "* = _RPotion" },
	{ test: 'set _RPotion = \'{ UInvDefaultBagType = "treasures", UInvTouched = false, belt : { }, dagger : { }, heavy mace : { }, pants : { }, rainbow potion : \' + _RPotion + \', shortsword : { } }\'', result: "* >" },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("chest"))', result: '< = _RPotion' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("chest"))', result: '{ }' },
	{ test: 'SetBagsDefaultType("backpack", "backpack")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '{ UInvProperties : { UInvProperties.test = true }, UInvTouched = false, belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ maxCarryWeight = 20, test = true }' },
	{ test: 'SetBagsDefaultType("treasures", "treasure bag")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("treasures"))', result: '{ UInvDefaultBagType = "treasure bag", UInvProperties : { UInvProperties.UInvVariableType = true }, belt : { }, dagger : { }, heavy mace : { }, pants : { }, shortsword : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("treasures"))', result: '{ UInvVariableType = true }' },
	{ test: 'SetBagsDefaultType("treasures", "backpack")', result: false },
	{ test: 'SetBagsDefaultType("treasures", "treasures")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("treasures"))', result: '{ belt : { }, dagger : { }, heavy mace : { }, pants : { }, shortsword : { } }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("treasures"))', result: '{ }' },
	{ test: 'BagPropertyCount()', result: undefined, error: 'Error: Name passed to BagPropertyCount is not a string.' },
	{ test: 'BagPropertyCount(3)', result: undefined, error: 'Error: Name passed to BagPropertyCount is not a string.' },
	{ test: 'BagPropertyCount("X")', result: undefined, error: 'Error: BagPropertyCount cannot find bag "X".' },
	{ test: 'GetBagsArray().sort()', result: ["backpack", "chest", "duffle bag", "pouch", "rucksack", "treasure bag", "treasures"].sort() },  // bags have to be sorted because array may not always get filled in the same order
	{ test: 'BagPropertyCount("backpack")', result: 2 },
	{ test: 'BagPropertyCount("chest")', result: 0 },
	{ test: 'BagPropertyCount("duffle bag")', result: 1 },
	{ test: 'BagPropertyCount("pouch")', result: 0 },
	{ test: 'BagPropertyCount("rucksack")', result: 2 },
	{ test: 'BagPropertyCount("treasure bag")', result: 2 },
	{ test: 'BagPropertyCount("treasures")', result: 0 },
	{ test: 'GetBagsArrayByProperty()', result: undefined, error: 'Error: BagPropertyName passed to GetBagsArrayByProperty is not a string.' },
	{ test: 'GetBagsArrayByProperty(3)', result: undefined, error: 'Error: BagPropertyName passed to GetBagsArrayByProperty is not a string.' },
	{ test: 'GetBagsArrayByProperty("test").sort()', result: ["backpack", "rucksack"].sort() },
	{ test: 'GetBagsArrayByProperty("UInvVariableType").sort()', result: ["treasure bag"].sort() },
	{ test: 'GetBagsArrayByProperty("test", "X")', result: undefined, error: 'Error: BagNameArray passed to GetBagsArrayByProperty is not an array of strings.' },
	{ test: 'GetBagsArrayByProperty("test", ["backpack", "chest", "duffle bag", "pouch", "rucksack", "treasure bag", "treasures"]).sort()', result: ["backpack", "rucksack"].sort() },
	{ test: 'GetBagsArrayByProperty("test", ["chest", "duffle bag", "pouch", "rucksack", "treasure bag", "treasures"]).sort()', result: ["rucksack"].sort() },
	{ test: 'GetBagByProperty()', result: undefined, error: 'Error: BagPropertyName passed to GetBagByProperty is not a string.' },
	{ test: 'GetBagByProperty(3)', result: undefined, error: 'Error: BagPropertyName passed to GetBagByProperty is not a string.' },
	{ test: 'GetBagByProperty("X")', result: "" },
	{ test: 'GetBagByProperty("UInvVariableType")', result: "treasure bag" },
	{ test: 'SetBagPropertyValue(["backpack"], "testProp", true)', result: true },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ maxCarryWeight = 20, test = true, testProp = true }' },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("pouch"))', result: '{ }' },
	{ test: 'CopyBagProperty()', result: undefined, error: 'Error: Name passed to CopyBagProperty is not a string.' },
	{ test: 'CopyBagProperty("backpack")', result: undefined, error: 'Error: Name passed to CopyBagProperty is not a string.' },
	{ test: 'CopyBagProperty("X", "pouch", "testProp")', result: undefined, error: 'Error: CopyBagProperty cannot find bag "X".' },
	{ test: 'CopyBagProperty("backpack", "X", "testProp")', result: undefined, error: 'Error: CopyBagProperty cannot find bag "X".' },
	{ test: 'CopyBagProperty("backpack", "pouch")', result: undefined, error: 'Error: CopyBagProperty failed. BagPropertyName is not a string or an array of strings.' },
	{ test: 'CopyBagProperty("backpack", "pouch", "X")', result: undefined, error: 'Error: CopyBagProperty failed. Bag "backpack" does not have property "X".' },
	{ test: 'CopyBagProperty("backpack", "pouch", "testProp")', result: true },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("backpack"))', result: '{ maxCarryWeight = 20, test = true, testProp = true }' },
	{ test: 'GetBagPropertyArray("backpack").sort()', result: ["maxCarryWeight", "test", "testProp"].sort() },
	{ test: 'BagHasAllProperties("backpack", ["testProp", "maxCarryWeight"])', result: true },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("pouch"))', result: '{ testProp = true }' },
	{ test: 'CopyBagProperty("backpack", "pouch", ["testProp", "maxCarryWeight"])', result: true },
	{ test: 'getObjectProperties(UInv.GetBagPropertyObject("pouch"))', result: '{ maxCarryWeight = 20, testProp = true }' },
	{ test: 'CopyBagProperty("backpack", "pouch", [])', result: undefined, error: 'Error: CopyBagProperty failed. BagPropertyName is not a string or an array of strings.' },
	{ test: 'GetBagsArrayWherePropertyEquals()', result: undefined, error: 'Error: BagPropertyName passed to GetBagsArrayWherePropertyEquals is not a string.' },
	{ test: 'GetBagsArrayWherePropertyEquals("x")', result: undefined, error: 'Error: GetBagsArrayWherePropertyEquals failed. Value parameter is missing.' },
	{ test: 'GetBagsArrayWherePropertyEquals("testProp", true)', result: ["backpack", "pouch"] },
	{ test: 'SetBagPropertyValue("pouch", "arrTest", [1, 2, 3])', result: true },
	{ test: 'SetBagPropertyValue(["backpack", "rucksack"], "arrTest", [3, 4, 5])', result: true },
	{ test: 'GetBagsArrayWherePropertyEquals("arrTest", [3, 4, 5]).sort()', result: ["backpack", "rucksack"].sort() },
	{ test: 'DeleteBagProperty("backpack", "arrTest")', result: true },
	{ test: 'SetBagPropertyValue("pouch", "Y", null)', result: true },
	{ test: 'CreateBag("test1")', result: true },
	{ test: 'SetBagPropertyValue("test1", "testVal", 1)', result: true },
	{ test: 'CreateBag("test2")', result: true },
	{ test: 'SetBagPropertyValue("test2", "testVal", 2)', result: true },
	{ test: 'CreateBag("test3")', result: true },
	{ test: 'SetBagPropertyValue("test3", "testVal", 3)', result: true },
	{ test: 'CreateBag("test4")', result: true },
	{ test: 'SetBagPropertyValue("test4", "testVal", 4)', result: true },
	{ test: 'CreateBag("test5")', result: true },
	{ test: 'SetBagPropertyValue("test5", "testVal", 5)', result: true },
	{ test: 'GetBagsArrayWherePropertyEquals("testVal", undefined).sort()', result: [] },
	{ test: 'GetBagsArrayWherePropertyEquals("testVal", 3).sort()', result: ["test3"] },
	{ test: 'GetBagsArrayWherePropertyEquals("testVal", 0).sort()', result: [] },
	{ test: 'GetBagWherePropertyEquals()', result: undefined, error: 'Error: BagPropertyName passed to GetBagWherePropertyEquals is not a string.' },
	{ test: 'GetBagWherePropertyEquals("X")', result: undefined, error: 'Error: GetBagWherePropertyEquals failed. Value parameter is missing.' },
	{ test: 'GetBagWherePropertyEquals("Z", 0)', result: "" },
	{ test: 'GetBagWherePropertyEquals("Z", undefined)', result: "" },
	{ test: 'GetBagWherePropertyEquals("testVal", 3)', result: "test3" },
	{ test: 'GetBagWherePropertyEquals("testVal", 0)', result: "" },
	{ test: 'GetBagsArrayWherePropertyGreaterThan()', result: undefined, error: 'Error: BagPropertyName passed to GetBagsArrayWherePropertyGreaterThan is not a string.' },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("X")', result: undefined, error: 'Error: GetBagsArrayWherePropertyGreaterThan failed. Value parameter is missing.' },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("Z", 0)', result: [] },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("Z", undefined)', result: [] },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("testProp", "X")', result: [] },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("testProp", 0)', result: ["backpack", "pouch"] },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("testProp", 5)', result: [] },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("testVal", 3).sort()', result: ["test4", "test5"] },
	{ test: 'GetBagsArrayWherePropertyGreaterThan("testVal", 9).sort()', result: [] },
	{ test: 'GetBagWherePropertyGreaterThan("testVal", 4)', result: "test5" },    // start sloppy testing
	{ test: 'GetBagWherePropertyGreaterThan("testVal", 9)', result: "" },
	{ test: 'GetBagsArrayWherePropertyLessThan("testVal", 3).sort()', result: ["test1", "test2"] },
	{ test: 'GetBagsArrayWherePropertyLessThan("testVal", 0).sort()', result: [] },
	{ test: 'GetBagWherePropertyLessThan("testVal", 2)', result: "test1" },
	{ test: 'GetBagWherePropertyLessThan("testVal", 0)', result: "" },
	{ test: 'GetBagWithHighestPropertyValue("X")', result: "" },
	{ test: 'GetBagWithHighestPropertyValue("testVal")', result: "test5" },
	{ test: 'GetBagWithLowestPropertyValue("X")', result: "" },
	{ test: 'GetBagWithLowestPropertyValue("testVal")', result: "test1" },  // end sloppy testing
	{ test: 'AddToBagPropertyValue()', result: undefined, error: 'Error: Name passed to AddToBagPropertyValue is not a string.' },
	{ test: 'AddToBagPropertyValue("X")', result: undefined, error: 'Error: Name passed to AddToBagPropertyValue is not a string.' },
	{ test: 'AddToBagPropertyValue("X", "X")', result: undefined, error: 'Error: AddToBagPropertyValue cannot find bag "X".' },
	{ test: 'AddToBagPropertyValue("test5", "X")', result: undefined, error: 'Error: AddToBagPropertyValue failed. Value not defined.' },
	{ test: 'AddToBagPropertyValue("test5", "X", "X")', result: undefined, error: 'Error: AddToBagPropertyValue failed. Amount must be a number.' },
	{ test: 'AddToBagPropertyValue("test5", "X", 5)', result: false },
	{ test: 'GetBagPropertyValue("test5", "X")', result: 5 },
	{ test: 'SetBagPropertyValue("test5", "X", "X")', result: true },
	{ test: 'GetBagPropertyValue("test5", "X")', result: "X" },
	{ test: 'AddToBagPropertyValue("test5", "X", 5)', result: undefined, error: 'Error: AddToBagPropertyValue failed. Item\'s property value must be a number to add to it.' },
	{ test: 'GetBagPropertyValue("test5", "testVal")', result: 5 },
	{ test: 'AddToBagPropertyValue("test5", "testVal", -1)', result: true },
	{ test: 'GetBagPropertyValue("test5", "testVal")', result: 4 },
	{ test: 'DeleteBagProperty()', result: undefined, error: 'Error: Name passed to DeleteBagProperty is not a string.' },
	{ test: 'DeleteBagProperty("X")', result: undefined, error: 'Error: Name passed to DeleteBagProperty is not a string.' },
	{ test: 'DeleteBagProperty("X", "X")', result: undefined, error: 'Error: DeleteBagProperty cannot find bag "X".' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("test5"))', result: '{ UInvProperties : { UInvProperties.X = "X", UInvProperties.testVal = 4 }, UInvTouched = false }' },
	{ test: 'DeleteBagProperty("test5", "X")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("test5"))', result: '{ UInvProperties : { UInvProperties.testVal = 4 }, UInvTouched = false }' },
	{ test: 'DeleteBagProperty("test5", "X")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("test5"))', result: '{ UInvProperties : { UInvProperties.testVal = 4 }, UInvTouched = false }' },
	{ test: 'SetBagPropertyValue("test5", "X", undefined)', result: true },
	{ test: 'GetBagPropertyValue("test5", "X")', result: undefined },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("test5"))', result: '{ UInvProperties : { UInvProperties.X = undefined, UInvProperties.testVal = 4 }, UInvTouched = false }' },
	{ test: 'DeleteBagProperty("test5", "X")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("test5"))', result: '{ UInvProperties : { UInvProperties.testVal = 4 }, UInvTouched = false }' },
	{ test: 'GetItemsArray("treasure bag")', result: "* = _Items" },
	{ test: 'DeleteItem("treasure bag", _Items)', result: true },
	{ test: 'SetBagPropertyValue("treasure bag", "quality", "new")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("treasure bag"))', result: '{ UInvDefaultBagType = "treasure bag", UInvProperties : { UInvProperties.UInvVariableType = true, UInvProperties.quality = "new" } }' },
	{ test: 'DeleteBagProperty("treasure bag", "UInvVariableType")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("treasure bag"))', result: '{ UInvDefaultBagType = "-", UInvProperties : { UInvProperties.quality = "new" } }' },
	{ test: 'SetBagUntouched()', result: undefined, error: 'Error: BagName passed to SetBagUntouched is not a string or array of strings.' },
	{ test: 'SetBagUntouched(3)', result: undefined, error: 'Error: BagName passed to SetBagUntouched is not a string or array of strings.' },
	{ test: 'SetBagUntouched("X")', result: undefined, error: 'Error: SetBagUntouched cannot find bag "X".' },
	{ test: 'SetBagUntouched(["X"])', result: undefined, error: 'Error: SetBagUntouched failed. Invalid bag name in array.' },
	{ test: 'WasTouched("backpack")', result: false },
	{ test: 'AddItem("backpack", "dagger")', result: "dagger" },
	{ test: 'WasTouched("backpack")', result: true },
	{ test: 'SetBagUntouched("backpack")', result: true },
	{ test: 'WasTouched("backpack")', result: false },
	{ test: 'SetBagTouched()', result: undefined, error: 'Error: BagName passed to SetBagTouched is not a string or array of strings.' },
	{ test: 'SetBagTouched(3)', result: undefined, error: 'Error: BagName passed to SetBagTouched is not a string or array of strings.' },
	{ test: 'SetBagTouched("X")', result: undefined, error: 'Error: SetBagTouched cannot find bag "X".' },
	{ test: 'SetBagTouched(["X"])', result: undefined, error: 'Error: SetBagTouched failed. Invalid bag name in array.' },
	{ test: 'SetBagTouched("backpack")', result: true },
	{ test: 'WasTouched("backpack")', result: true },
];
/*
	BAG FUNCTIONS:
	==============
	Fully Tested:  (36 of 49 bag functions tested)
		GetCurrentBagName, GetBagsArray, GetBagCount, BagExists, SetCurrentBagName,
		CreateBag, EmptyBag, GetBagsDefaultType, GetBagCountByDefaultType, GetBagPropertyArray,
		BagHasProperty, GetBagPropertyValue, SetBagPropertyValue, GetBagPropertyObject, SetBagsDefaultType,
		BagPropertyCount, GetBagsArrayByProperty, GetBagByProperty, CopyBagProperty, GetBagsArrayWherePropertyEquals,
		GetBagWherePropertyEquals, GetBagsArrayWherePropertyGreaterThan, GetBagWherePropertyGreaterThan, GetBagsArrayWherePropertyLessThan, GetBagWherePropertyLessThan, 
		GetBagWithHighestPropertyValue, GetBagWithLowestPropertyValue, AddToBagPropertyValue, DeleteBagProperty, SetBagUntouched,
		SetBagTouched, WasTouched, ...
	Partially Tested:  (4 partially tested)
		AddBag (test for default items with pockets), CopyBag (test on a pocket), DeleteBag + RenameBag (test on pockets and bags with pocketed items) ...
	Currently Untested:
		CopyAllItemsToBag, BagHasAllProperties, GetBagsArrayWithAllProperties, MoveAllItemsToBag, MergeBags, GetBagsArrayWithItem, GetBagObject,
		GetUniqueBagName, BagMatchesDefault, GetTotalBagPropertyValue, MoveBagPropertyValueToBag, MoveItemPropertyValueToBag
	Currently Skipped:
		GetDefaultBagObject, ...
*/

var ItemTestList = [
	{ test: 'AddBag("backpack")', result: true },
	{ test: 'GetItemPropertiesArray("backpack", "dagger")', result: ["UInvQuantity", "type", "singular", "plural", "size", "image", "description"] },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("backpack", "dagger"))', result: '{ UInvQuantity = 2 }' },
	{ test: 'AddItem("backpack", "bow")', result: "bow" },
	{ test: 'DeleteItemProperty("backpack", "bow", "arrows")', result: true },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("backpack", "bow"))', result: '{ UInvDefaultItemType = "bow", UInvVariableType = true, description = "A bow.", image = "bow.png", plural = "bows", singular = "a bow", size = 5, type : [ "weapon", "ranged", "piercing", "2-handed" ] }' },
	{ test: 'AddToItemPropertyValue("backpack", "dagger", "size", 1)', result: true },
	{ test: 'AddToItemPropertyValue("backpack", "bow", "size", 1)', result: true },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("backpack", "bow"))', result: '{ UInvDefaultItemType = "bow", UInvVariableType = true, description = "A bow.", image = "bow.png", plural = "bows", singular = "a bow", size = 6, type : [ "weapon", "ranged", "piercing", "2-handed" ] }' },
	{ test: 'GetItemsArray("backpack").sort()', result: ["belt", "dagger", "bow", "pants"].sort() },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("backpack", "dagger"))', result: '{ UInvQuantity = 2, size = 3 }' },
	{ test: 'SetMergeItemMethod(UInv.MERGE_RENAME_SOURCE_ITEMNAME)', result: true },
	{ test: 'AddItem("backpack", "dagger")', result: "* = _ItemName" },
	{ test: 'AddItem("backpack", "dagger")', result: "< = _ItemName" },
	{ test: 'GetItemsDefaultType("backpack", _ItemName)', result: "dagger" },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("backpack",  _ItemName))', result: '{ UInvDefaultItemType = "dagger", UInvQuantity = 2 }' },
	{ test: 'set _INames = ["belt", "dagger", "bow", "pants", _ItemName].sort()', result: "* >" },
	{ test: 'GetItemsArray("backpack").sort()', result: '< = _INames' },
	{ test: 'DeleteItem("backpack", "bow")', result: true },
	{ test: 'DeleteItem("backpack", _ItemName)', result: true },
	{ test: 'SetItemPropertyValue("backpack", "dagger", "UInvVariableType", true)', result: false },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("backpack", "dagger"))', result: '{ UInvQuantity = 2, UInvVariableType = true, size = 3 }' },
	{ test: 'AddItem("backpack", "dagger")', result: "* = _ItemName" },
	{ test: 'GetItemsDefaultType("backpack", _ItemName)', result: "dagger" },
	{ test: 'BagHasItem("backpack", "dagger")', result: 2 },
	{ test: 'AddToItemPropertyValue("backpack", "dagger", "size", -1)', result: true },
	{ test: 'set delete State.variables.UInvBags.backpack.dagger.UInvVariableType', result: "* >" },
	{ test: 'BagHasItem("backpack", "dagger")', result: 2 },
	{ test: 'BagHasItem("backpack", _ItemName)', result: 1 },
	{ test: 'RestackItems("backpack")', result: true },
	{ test: 'BagHasItem("backpack", "dagger")', result: 3 },
	{ test: 'BagHasItem("backpack", _ItemName)', result: 0 },
	{ test: 'DeleteItem("backpack", "dagger", 1)', result: true },
	{ test: 'BagHasItem("backpack", "dagger")', result: 2 },
	{ test: 'CreateBag("pouch")', result: true },
	{ test: 'AddItem("pouch", "rainbow potion")', result: "rainbow potion" },
	{ test: 'CopyItem("pouch", "backpack", "rainbow potion", 1, "test")', result: "test" },
	{ test: 'MoveItem("backpack", "pouch", "test")', result: "rainbow potion" },
	{ test: 'BagHasItem("pouch", "rainbow potion")', result: 2 },
	{ test: 'CreateBag("Test")', result: true },
	{ test: 'AddItem("Test", "belt")', result: "belt" },
	{ test: 'GetItemsArray("Test").sort()', result: ["belt"] },
	{ test: 'AddItem("Test", "belt", 1, "black belt")', result: "black belt" },
	{ test: 'GetItemsArray("Test").sort()', result: ["belt", "black belt"].sort() },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("Test", "belt"))', result: '{ }' },
	{ test: 'getObjectProperties(UInv.GetRawItemObject("Test", "black belt"))', result: '{ UInvDefaultItemType = "belt" }' },
	{ test: 'CreateItem("Test", "-")', result: undefined, error: 'Error: CreateItem failed. ItemName "-" is not an allowed item name.' },
	{ test: 'CreateItem("Test", "UInvProperties")', result: undefined, error: 'Error: CreateItem failed. ItemName "UInvProperties" is not an allowed item name.' },
	{ test: 'CreateItem("Test", "uinvproperties")', result: undefined, error: 'Error: CreateItem failed. ItemName "uinvproperties" is not an allowed item name.' },
	{ test: 'CreateItem("Test", "CapsTest")', result: "capstest" },
];
/*
	ITEM FUNCTIONS:
	===============
	Fully Tested:  (0 of 83 item functions tested)
		...
	Partially Tested:
		...
	Currently Untested:
		GetDefaultItemObject, GetCurrentItemName, SetCurrentItemName, BagHasItem, ItemExists,
		GetUniqueItemName, GetItemsDefaultType, GetItemsArray, GetItemObject, GetItemPropertiesArray,
		ItemHasProperty, GetItemsArrayByProperty, GetItemPropertyValue, GetItemsArrayWherePropertyEquals, BagHasAllItems,
		SetItemsDefaultType, SetItemPropertyValue, SetItemQuantity, DeleteItem, AddToItemPropertyValue,
		ItemsMatch, GetMatchingItemsArray, CopyItem, MoveItem, RenameItem,
		GetDefaultItemPropertyValue, GetItemsAndQuantitiesObject, GetItemCount, GetItemCountFull, GetItemCountByDefaultType,
		GetItemCountFullByDefaultType, GetItemsArrayByType, GetItemCountWherePropertyEquals, GetItemsArrayWherePropertyGreaterThan, GetItemCountWherePropertyGreaterThan,
		GetItemsArrayWherePropertyLessThan, GetItemCountWherePropertyLessThan, GetUniqueItemPropertyValuesArray, BagHasAnyItem,	AddToAllItemsPropertyValue,
		AddItem, AddItems, CreateItem, GetItemPropertyCount, SetItemsPropertyValue,
		SetItemPropertyValues, ItemPropertyHasValue, CopyItemsByProperty, DeleteItemsByProperty, GetItemWithHighestPropertyValue,
		GetItemWithLowestPropertyValue, GetRandomItemPropertyValue, GetTotalItemPropertyValue, DeleteItemProperty, MoveItemsByProperty,
		RenameItemProperty, GetObjectOfItemPropertyValues, GetAllPropertyValues, GetItemByProperty, GetItemByType,
		GetRandomItemValue, GetItemWherePropertyEquals, GetItemWherePropertyGreaterThan, GetItemWherePropertyLessThan, GetRandomItem,
		ResetItemProperties, GetItemsArrayWhereItemNameContains, GetItemsArrayWherePropertyValueContains, GetItemPropertyValueObject, GetItemsArraySortedByProperty,
		GetItemCountByFunction, GetItemsArrayByFunction, GetItemsArraySortedByFunction, ItemHasAllProperties, ItemHasAnyProperties,
		GetItemsArrayWithAllProperties, GetItemsArrayWithoutProperties, SwapItemsProperties, SwapItems, GetBagItemArrayWhereItemPropertyEquals,
		RestackItems, MoveBagPropertyValueToItem, MoveItemPropertyValueToItem, GetRawItemObject (internal-use-only)
	Currently Skipped:
		...
*/

var TagTestList = [
];
/*
	TAG FUNCTIONS:
	==============
	Fully Tested:  (0 of 49 tag functions tested)
		...
	Partially Tested:
		...
	Currently Untested:
		AddBagTag, AddItemTag, DeleteBagTag, DeleteItemTag, BagHasTag,
		ItemHasTag, ItemHasAllTags, ItemHasAnyTag, SetBagTag, SetItemTag,
		GetBagsArrayByBagTag, BagHasAllBagTags, BagHasAnyBagTag, GetItemsArrayByAllItemTags, GetItemsArrayByAnyItemTag,
		GetItemsArrayWithoutAllItemTags, GetItemsArrayWithoutAnyItemTags, GetItemsArrayByItemTag, GetBagsArrayWithItemByBagTag, GetBagsArrayWithBothBagTags,
		GetItemsArrayWithBothItemTags, GetUniqueBagTagsArray, GetUniqueItemTagsArray, GetAllUniqueItemTagsArray, BagHasAllItemTags,
		BagHasAnyItemTag, GetFullItemCountByAllItemTags, GetFullItemCountByAnyItemTag, GetBagTagQuantityObject, GetItemTagQuantityObject,
		BagHasItemByItemTag, BagHasItemWithAllItemTags, BagHasItemWithAnyItemTag, BagHasItemWithoutAllItemTags, BagHasItemWithoutAnyItemTags,
		BagHasItemByBagTag, BagHasAllItemsByBagTag, BagHasAnyItemByBagTag, CopyItemsByItemTag, MoveItemsByItemTag,
		DeleteItemsByItemTag, GetMissingBagTagsArray, GetMissingItemTagsArray, GetRandomBagTagFromRange, GetRandomItemTagFromRange,
		ArrayHasAllItemTags, GetItemsArrayWithAllItemTags, GetItemTagCount, GetItemsArrayWithMostItemTags
	Currently Skipped:
		...
*/

var PocketTestList = [
	{ test: 'AddBag("backpack")', result: true },
	{ test: 'AddItem("backpack", "suit")', result: "suit" },
	{ test: 'ItemHasPocket("backpack", "suit", "pocket")', result: true },
	{ test: 'GetItemPocketBagName("backpack", "suit", "pocket")', result: "* = _SPocket" },
	{ test: 'GetItemPocketBagName(_SPocket, "suit", "pocket")', result: "* = _S2Pocket" },
	{ test: 'set _S1Pocket = \'{ UInvContainer : [ { ContainerBagName = "backpack", ContainerName = "suit", PocketName = "pocket" } ], UInvDefaultBagType = "suit pocket", UInvTouched = false, suit : { suit.UInvPocket : { suit.UInvPocket.pocket = "\' + _S2Pocket + \'" } } }\'', result: "* >" },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pocket"))', result: '< = _S1Pocket' },
	{ test: 'GetItemPocketBagName("backpack", "suit", "pocket")', result: "* = _SPocket" },
	{ test: 'set _Backpack = \'{ belt : { }, dagger : { dagger.UInvQuantity = 2 }, pants : { }, suit : { suit.UInvPocket : { suit.UInvPocket.pocket = "\' + _SPocket + \'" } } }\'', result: "* >" },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("backpack"))', result: '< = _Backpack' },
	{ test: 'MoveItemToPocket("backpack", "suit", "backpack", "suit", "suit pocket")', result: undefined, error: 'Error: MoveItemToPocket failed. Pocket "suit pocket" cannot be found.' },
	{ test: 'MoveItemToPocket("backpack", "suit", "backpack", "suit", "pocket")', result: undefined, error: 'Error: MoveItemToPocket failed. Source item cannot be moved inside of itself.' },
	{ test: 'GetItemPocketBagName("backpack", "suit", "pocket")', result: "* = _SPocket" },
	{ test: 'MoveItem("backpack", _SPocket, "suit")', result: undefined, error: 'Error: MoveItem failed. Item cannot be moved inside of itself.' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pocket"))', result: '< = _S1Pocket' },
	{ test: 'CreateBag("pouch")', result: true },
	{ test: 'MoveItem("backpack", "pouch", "suit")', result: "suit" },
	{ test: 'set _S1Pocket = \'{ UInvContainer : [ { ContainerBagName = "pouch", ContainerName = "suit", PocketName = "pocket" } ], UInvDefaultBagType = "suit pocket", UInvTouched = false, suit : { suit.UInvPocket : { suit.UInvPocket.pocket = "\' + _S2Pocket + \'" } } }\'', result: "* >" },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pocket"))', result: '< = _S1Pocket' },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pouch"))', result: '{ suit : { suit.UInvPocket : { suit.UInvPocket.pocket = "pocket" } } }' },
	{ test: 'RenameItem("pouch", "suit", "tux")', result: "tux" },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pouch"))', result: '{ tux : { tux.UInvDefaultItemType = "suit", tux.UInvPocket : { tux.UInvPocket.pocket = "pocket" } } }' },
	{ test: 'GetItemPocketBagName("pouch", "tux", "pocket")', result: "pocket" },
	{ test: 'set _S1Pocket = \'{ UInvContainer : [ { ContainerBagName = "pouch", ContainerName = "tux", PocketName = "pocket" } ], UInvDefaultBagType = "suit pocket", UInvTouched = false, suit : { suit.UInvPocket : { suit.UInvPocket.pocket = "\' + _S2Pocket + \'" } } }\'', result: "* >" },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pocket"))', result: '< = _S1Pocket' },
	{ test: 'GetItemsArray("pouch")', result: ["tux"] },
	{ test: 'ResetItemProperties("pouch", "tux")', result: true },
	{ test: 'GetItemsArray("pouch")', result: ["tux"] },
	{ test: 'getObjectProperties(UInv.GetRawBagObject("pocket"))', result: '< = _S1Pocket' },
];
/*
	POCKET FUNCTIONS:
	=================
	Fully Tested:  (0 of 24 pocket functions tested)
		...
	Partially Tested:
		...
	Currently Untested:
		GetPocketBagContainerArray, BagIsPocket, ItemHasPocket, GetPocketDepth, GetItemPocketNameArray,
		GetItemPocketObject, GetItemPocketBagArray, BagHasSpecificItem, AddPocket, CreatePocket,
		GetItemPocketBagName, GetPocketBagsPocketName, DeletePocket, GetAllBagPockets, GetAllContainerPockets,
		ContainerHasItem, ContainerHasPocketBag, AddExistingBagAsPocket, GetContainerIndex, UnlinkPocketFromContainer,
		UnlinkPocketBagFromContainer, MovePocket, MoveItemFromPocket, MoveItemToPocket
	Currently Skipped:
		...
*/
