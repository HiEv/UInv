/*
	Universal Inventory System (UInv)
	by HiEv                    v0.9.6

	A JavaScript inventory "plugin" for Twine 2 / SugarCube 2.

	Future home: https://github.com/HiEv/UInv

	v0.5.7 - March 29, 2018 - (preview release 1)
		- 62 functions written out of 108 planned functions
	v0.6.9 - April  6, 2018 - (preview release 2)
		- 28 new functions written + 23 new functions planned
		- some functions renamed to conform to consistent naming style
	v0.7.7 - April 18, 2018 - (preview release 3)
		- 32 new functions written + 27 new functions planned
		- some functions renamed to conform to consistent naming style
		- most previously incomplete functions are now complete
		- lots of debugging and additional error checking done
	v0.8.6 - April 24, 2018 - (preview release 4)
		- 25 new functions written + 13 new functions planned
		- some functions renamed to conform to consistent naming style
		- work on help file started (very preliminary)
	v0.9.1 - May 10, 2018 - (preview release 5)
		- 18 new functions written + 11 new functions planned
		- added default bags
		- major rework of engine to allow deletion of default properties
		- some bugs fixed
	v0.9.2 - May 23, 2018 - (preview release 6)
		- 10 new functions written + 8 new functions planned
		- renamed BagCount to GetBagCount for more consistent naming style
		- moved data sections to bottom to make updating UInv easier
		- some bugs fixed
		- Item Builder added to UInv help file
	v0.9.4 - July 8, 2018 - (preview release 7)
		- 22 new functions written + 19 new functions planned
		- some functions renamed to conform to consistent naming style
		- centralized more functions for display utilities
		- saved a bit more memory/history size
		- handled a potential problem with non-static default properties
		- improved compatibility with other browsers
		- moved utility functions inside UInv namespace
	v0.9.5 - July 23, 2018 - (preview release 8)
		- 12 new functions written + 12 new functions planned
		- revamped error handling to add thrown errors
		- added utility functions for engine detection
		- saved a bit more memory/history size
		- major restructuring of item data 
		- added handling of variable items and variable bags
	v0.9.6 - September 25, 2018 - (preview release 9)
		- 31 new functions written + 27 new functions planned
		- major bugfix in SwapItems and many "Tag" functions
		- all utility function names now start lowercase
		- added the ability to cache images for online usage
		- the UInv Safe Save Code has been updated (see help)
		- added option for sending UInv errors to console
		- typing "xyzzy" now toggles console (F12) error log
		- began implementation of display elements
			* table
			* radialMenu
		- began implementation of event handlers
			"general" events:
				* MouseDown
				* MouseUp
			"bag" events:
				* Touched
			"table" events:
				* Accept
				* DragStart
				* Drop
				* DragStop
			"radialMenu" events:
				* Open
				* WedgeClick
				* DisabledWedgeClick
				* Cancel
			"cacheImages" events:
				* Loaded
				* Error
		- added Font Awesome support: https://fontawesome.com/free
		  just add the following line to your stylesheet section:
@import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css');
		  see the "FA_Icons.html" sample for the list of icons
		- jQuery UI is now required to support display elements
		  https://api.jqueryui.com/category/all/
		  just include and load the jquery-ui.css and jquery-ui.js
		  files, along with the "images/ui-*.png" images
*/

/*
	The next comment block is to support JavaScript validators such as:
		https://eslint.org/demo/
		http://JSHint.com/
		https://deepscan.io/demo/
		http://beautifytools.com/javascript-validator.php
*/
/*
	global UInv, $, setup, clone, opr, safari, Config, Browser, State,
	random, passage, window, document, navigator, alert, console, Image,
	setTimeout
*/


// Increase SugarCube maxLoopIterations if needed.
if (Config.macros.maxLoopIterations < 2000) {
	Config.macros.maxLoopIterations = 2000;
}

if (setup.ImagePath === undefined) {  // Do this better later ***
	setup.ImagePath = "";  // "images/";
}

// Enables directing errors to the console by typing "xyzzy"
var UInvDebugTrigger = "";
$(document).on("keypress", function (ev) {
	UInvDebugTrigger += ev.key;
	if (UInvDebugTrigger.length > 5) {
		UInvDebugTrigger = UInvDebugTrigger.slice(-5);
	}
	if (UInvDebugTrigger === "xyzzy") {
		if (UInv.isUndefined(setup.UInvUserAlertsDebug)) {
			setup.UInvUserAlertsBackup = UInv.GetUserAlerts();
			UInv.SetUserAlerts(UInv.ERROR_SHOW_PASSAGE_NAME + UInv.ERROR_TO_CONSOLE);
			setup.UInvUserAlertsDebug = UInv.ERROR_SHOW_PASSAGE_NAME + UInv.ERROR_TO_CONSOLE;
			alert("UInv: Errors will now be shown in the console window.\nHit F12 to open the console window.");
			console.log("UInv: Error logging enabled.\n$UInvLastErrorMessage = " + State.variables.UInvLastErrorMessage);
		} else {
			UInv.SetUserAlerts(setup.UInvUserAlertsBackup);
			delete setup.UInvUserAlertsBackup;
			console.log("UInv: Error logging reverted to default. (" + setup.UInvUserAlertsDebug + ")");
			alert("UInv: Error logging reverted to default. (" + setup.UInvUserAlertsDebug + ")");
			delete setup.UInvUserAlertsDebug;
		}
	}
});

// Automatically link up UInv display elements when passage is rendered.
$(document).on(":passagerender", function (ev) {
	if (!UInv.UpdatesAreLocked()) {
		UInv.UpdateDisplay(ev.content);
	}

	var el = $("#uinv-radial-menu").get(0);
	if (UInv.isUndefined(el)) {
		UInv.InitializeRadialMenu();
	} else {
		if (el.dataset.status == "opened") {  // Cancel radial menu
			ev.cancelType = "NewPassage";
			var Ret = UInv.CallEventHandler("radialMenu", "Cancel", ev);  // radialMenu Cancel event (New passage)
			if (Ret.keepOpen !== true) {
				el.dataset.status = "closed";
				el.style.transform = "scale(0, 0)";
				el.style.opacity = 0;
			}
			UInv.UpdateDisplay();
		}
	}
	
	// Textarea cursor fix for Chrome & Firefox.
	$(ev.content).find("textarea").mousemove(function(e) {
		var myPos = $(this).offset();
		myPos.bottom = $(this).offset().top + $(this).outerHeight();
		myPos.right = $(this).offset().left + $(this).outerWidth();
		if (myPos.right > e.pageX && e.pageX > myPos.right - 16) {
			if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 16) {
				if ($(this).css("cursor") != "ns-resize") {
					$(this).css("cursor", "ns-resize");  // Chrome fix
				}
			} else {
				if ($(this).prop("clientHeight") < $(this).prop("scrollHeight")) {
					if ($(this).css("cursor") != "default") {
						$(this).css("cursor", "default");  // Firefox fix
					}
				} else {
					if ($(this).css("cursor") != "auto") {
						$(this).css("cursor", "auto");
					}
				}
			}
		} else {
			if ($(this).css("cursor") != "auto") {
				$(this).css("cursor", "auto");
			}
		}
	});
	
});


// Universal Inventory System (UInv)
window.UInv = {

	//  UInv Constants:
	//  ===============

	// Values for UInvMergeItemMethod and UInv.SetMergeItemMethod to determine how UInv handles item collision.
	MERGE_USE_ONLY_DESTINATION_PROPERTIES : 1,  // Ignore source properties, just increment destination's quantity. (default)
	MERGE_USE_ONLY_SOURCE_PROPERTIES : 2,       // Delete the destination's properties, replace with the source's properties and values, and increment the quantity.
	MERGE_PREFER_DESTINATION_PROPERTIES : 3,    // Keep the properties and values in the destination, add any properties and values the source had but the destination didn't, and increment the quantity.
	MERGE_PREFER_SOURCE_PROPERTIES : 4,         // Keep the properties and values in the source, add any properties and values the destination had but source the didn't, and increment the quantity.
	MERGE_RENAME_SOURCE_ITEMNAME : 5,           // Rename the source's unique identifier so that it's stored separately in the destination bag.
	MERGE_FAIL_WITH_ERROR : 6,                  // Fail with an error.

	// Values for $UInvShowAlerts, used with SetUserAlerts.  Values can be added together except for ERROR_NONE.
	ERROR_NONE : false,           // Do not display any error messages to users.
	ERROR_SHOW_PASSAGE_NAME : 1,  // Displays the current passage name in any error messages.
	ERROR_SHOW_ALERT : 2,         // Displays a modal dialog box for each error message and pauses execution.
	ERROR_THROW_ERROR : 4,        // Throws traditional Twine/SugarCube error messages, instead of silently returning a value which indicates that a UInv error occurred.
	ERROR_TO_CONSOLE : 8,         // Outputs any error messages to the console window.

	// AP style says that numbers less than 10 should be written as text.  This array converts values zero through nine to text.  (e.g. UInv.NumText[5] === "five")
	NumText : ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],  // Used in Display functions.

	// The default maximum number of images to cache.
	DefaultMaxCache : 100,
	// The default maximum number of images to download at the same time using the image cache code.
	DefaultMaxConcurrent : 5,


	// UInv Utility Functions:
	// =======================

	// isArray: Returns if a value is an array.
	isArray : function (Value) {
		return Array.isArray(Value);
	},

	// isBoolean: Returns if a value is a boolean.
	isBoolean : function (Value) {
		return typeof Value === "boolean";
	},

	// isDate: Returns if value is a date object.
	isDate : function(Value) {
		return Value instanceof Date;
	},

	// isFunction: Returns if a value is a function.
	isFunction : function (Value) {
		return typeof Value === "function";
	},

	// isGenericObject: Returns if a value is a generic object.
	isGenericObject : function (Value) {
		return Value && typeof Value === "object" && Value.constructor === Object;
	},

	// isInteger: Returns if a value is an integer.
	isInteger : function (Value) {
		return Number.isInteger(Value);
	},

	// isNumber: Returns if a value is a number.
	isNumber : function (Value) {
		return typeof Value === "number" && Number.isFinite(Value);
	},

	// isObject: Returns if a value is an object.
	isObject : function (Value) {
		return Value && typeof Value === "object";
	},

	// isProperty: Returns if Prop is a property of the object Obj.
	isProperty : function (Obj, Prop) {
		if (UInv.isObject(Obj)) {
			return Obj ? hasOwnProperty.call(Obj, Prop) : false;
		}
		return false;
	},

	// Returns if a value is a regexp
	isRegExp : function (Value) {
		return Value && typeof Value === "object" && Value.constructor === RegExp;
	},

	// isString: Returns if a value is a string.
	isString : function (Value) {
		return typeof Value === "string" || Value instanceof String;
	},

	// isUndefined: Returns if a value is undefined.
	isUndefined : function (Value) {
		return typeof Value === "undefined";
	},

	// arraysAreEqual: Check two arrays to see if they're identical.
	arraysAreEqual : function (Array1, Array2) {
		if (UInv.isArray(Array1) && UInv.isArray(Array2)) {
			if (Array1.length !== Array2.length) {
				return false;  // Arrays are not the same length.
			}
			if (Array1.length > 0) {
				var i;
				for (i = 0; i < Array1.length; i++) {
					if (typeof Array1[i] === typeof Array2[i]) {
						if (UInv.isArray(Array1[i])) {
							if (!UInv.arraysAreEqual(Array1[i], Array2[i])) {
								return false;  // Sub-arrays do not match.
							}
						} else if (UInv.isObject(Array1[i])) {
							if (!UInv.objectsAreEqual(Array1[i], Array2[i])) {  // *** OOO function call  (OOO = Out Of Order, meaning that function exists in the code below, instead of above.)
								return false;  // Objects do not match.
							}
						} else if (Array1[i] !== Array2[i]) {
							return false;  // Value does not match.
						}
					} else {
						return false;  // Types do not match
					}
				}
			}
			return true;  // All values match.
		}
		return false;  // Both are not arrays.
	},

	// objectsAreEqual: Check two objects to see if they're identical.  IgnoreObjectPairs is for internal use to prevent infinite loops of objects.
	objectsAreEqual : function (Obj1, Obj2, IgnoreObjectPairs) {
		if (UInv.isObject(Obj1) && UInv.isObject(Obj2)) {
			var i = 0;
			if (UInv.isUndefined(IgnoreObjectPairs)) {
				IgnoreObjectPairs = [];
			}
			if (IgnoreObjectPairs.length > 0) {
				for (i = 0; i < IgnoreObjectPairs.length; i++) {
					if (((IgnoreObjectPairs[i][0] === Obj1) && (IgnoreObjectPairs[i][1] === Obj2)) ||
						((IgnoreObjectPairs[i][0] === Obj2) && (IgnoreObjectPairs[i][1] === Obj1))) {
							return true;  // Ignores object pairs that have already been checked
					}
				}
			}
			var Keys1 = Object.keys(Obj1).sort(), Keys2 = Object.keys(Obj2).sort();
			if (!UInv.arraysAreEqual(Keys1, Keys2)) {
				return false;  // Objects have a different number of keys or have different keys.
			}
			if (Keys1.length > 0) {
				var Key;
				for (i = 0; i < Keys1.length; i++) {
					Key = Keys1[i];
					if (typeof Obj1[Key] === typeof Obj2[Key]) {
						if (UInv.isArray(Obj1[Key])) {
							if (!UInv.arraysAreEqual(Obj1[Key], Obj2[Key])) {
								return false;  // Arrays do not match.
							}
						} else if (UInv.isObject(Obj1[Key])) {
							IgnoreObjectPairs.push([Obj1, Obj2]);
							if (!UInv.objectsAreEqual(Obj1[Key], Obj2[Key], IgnoreObjectPairs)) {
								return false;  // Sub-objects do not match.
							}
						} else {
							if (Obj1[Key] !== Obj2[Key]) {
								return false;  // Value does not match.
							}
						}
					} else {
						return false;  // Value types do not match
					}
				}
			}
			return true;  // All values match.
		}
		return false;  // Both are not objects.
	},

	// valuesAreEqual: Check two variables to see if they're identical.  This function does not support comparing symbols, functions, or custom types.
	valuesAreEqual : function (Var1, Var2) {
		if (typeof Var1 === typeof Var2) {
			switch (typeof Var1) {
				case "string":
				case "number":
				case "boolean":
					if (Var1 === Var2) {
						return true;  // Variables have the same value
					} else {
						return false;  // Variables don't have the same value
					}
					break;  // eslint-disable-line no-unreachable
				case "undefined":
					return true;  // Variables are both undefined
				case "object":
					if (UInv.isArray(Var1) && UInv.isArray(Var2)) {
						if (UInv.arraysAreEqual(Var1, Var2)) {
							return true;  // Arrays are the same
						} else {
							return false;  // Arrays are not the same
						}
					} else if (UInv.isObject(Var1) && UInv.isObject(Var2)) {
						if (UInv.objectsAreEqual(Var1, Var2)) {
							return true;  // Objects are the same
						} else {
							return false;  // Objects are not the same
						}
					} else if ((Var1 === null) && (Var2 === null)) {
						return true;  // Variables are both null
					} else {
						return false;  // Variables either don't match or are of an unsupported type
					}
					break;  // eslint-disable-line no-unreachable
				default:
					return false;  // Unsupported type
			}
		} else {
			return false;  // Variables are not of the same type.
		}
	},

	// arrayHasTag: Returns the number of times Tag is found in array, or "null" if there is an error.
	arrayHasTag : function (Arr, Tag) {
		if (!UInv.isUndefined(Tag) && UInv.isArray(Arr)) {
			return Arr.count(Tag);
		} else {
			return null;  // Error
		}
	},

	// arrayHasAllTags: Returns true if Array1 has an equal or greater number of all tags in TagArray, or "null" if there is an error.
	arrayHasAllTags : function (Arr, TagArray) {
		if (UInv.isArray(Arr) && UInv.isArray(TagArray)) {
			if (TagArray.length > 0) {
				if (Arr.length >= TagArray.length) {
					var i = 0;
					for (i = 0; i < TagArray.length; i++) {
						if (Arr.count(TagArray[i]) < TagArray.count(TagArray[i])) {
							return false;
						}
					}
				} else {
					return false;  // Array1 can't have enough tags to satisfy test
				}
				return true;
			} else {
				return false;  // TagArray is empty
			}
		} else {
			return null;  // Error
		}
	},

	// arrayHasAnyTag: Returns true if Array1 has at least one of the tags in TagArray, or "null" if there is an error.
	arrayHasAnyTag : function (Arr, TagArray) {
		if (UInv.isArray(Arr) && UInv.isArray(TagArray)) {
			if (TagArray.length > 0) {
				var i = 0;
				for (i = 0; i < TagArray.length; i++) {
					if (Arr.includes(TagArray[i])) {
						return true;
					}
				}
				return false;
			} else {
				return false;  // TagArray is empty
			}
		} else {
			return null;  // Error
		}
	},

	// isArrayOfArrays: Test an array to see if all the values are arrays.  Returns "null" on error.
	isArrayOfArrays : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isArray(Arr[i])) {
						return false;  // Array is not all arrays
					}
				}
				return true;  // Array is all arrays
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// isArrayOfBooleans: Test an array to see if all the values are booleans.  Returns "null" on error.
	isArrayOfBooleans : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isBoolean(Arr[i])) {
						return false;  // Array is not all booleans
					}
				}
				return true;  // Array is all booleans
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// isArrayOfGenericObjects: Test an array to see if all the values are generic objects.  Returns "null" on error.
	isArrayOfGenericObjects : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isGenericObject(Arr[i])) {
						return false;  // Array is not all generic objects
					}
				}
				return true;  // Array is all generic objects
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// isArrayOfIntegers: Test an array to see if all the values are integers.  Returns "null" on error.
	isArrayOfIntegers : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isInteger(Arr[i])) {
						return false;  // Array is not all integers
					}
				}
				return true;  // Array is all integers
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// isArrayOfNumbers: Test an array to see if all the values are numbers.  Returns "null" on error.
	isArrayOfNumbers : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isNumber(Arr[i])) {
						return false;  // Array is not all numbers
					}
				}
				return true;  // Array is all numbers
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// isArrayOfObjects: Test an array to see if all the values are objects.  Returns "null" on error.
	isArrayOfObjects : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isObject(Arr[i])) {
						return false;  // Array is not all objects
					}
				}
				return true;  // Array is all objects
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// isArrayOfStrings: Test an array to see if all the values are strings.  Returns "null" on error.
	isArrayOfStrings : function (Arr) {
		if (UInv.isArray(Arr)) {
			var i = 0;
			if (Arr.length) {
				for (i = 0; i < Arr.length; i++) {
					if (!UInv.isString(Arr[i])) {
						return false;  // Array is not all strings
					}
				}
				return true;  // Array is all strings
			}
			return false;  // Array is empty
		} else {
			return null;  // Error: Not an array
		}
	},

	// combineGenericObjects: Returns a new object that has the combined properties of Obj1 and Obj2, with Obj2's properties preferred when both objects have matching property names.  Returns "undefined" on error.
	combineGenericObjects : function (Obj1, Obj2) {
		if (UInv.isGenericObject(Obj1) && UInv.isGenericObject(Obj2)) {
			var Result = clone(Obj1), i, Keys = Object.keys(Obj2);
			for (i = 0; i < Keys.length; i++) {
				if (UInv.isObject(Obj2[Keys[i]])) {
					Result[Keys[i]] = clone(Obj2[Keys[i]]);
				} else {
					Result[Keys[i]] = Obj2[Keys[i]];
				}
			}
			return Result;  // Success
		} else {
			UInv.Error('Error: Objects passed to combineGenericObjects are not generic objects.');  // Error
			return undefined;
		}
	},

	// getArraySortedByOtherArray: Returns UnsortedArray sorted based on ArrayToSortBy and subsorted by UnsortedArray value.  This is a case insensitive sort.
	//                             If RemoveDuplicates is true, it also removes any elements where its pair is duplicated in both arrays.
	getArraySortedByOtherArray : function (UnsortedArray, ArrayToSortBy, RemoveDuplicates) {

		function GreaterThan(A, B) {
			if (UInv.isString(A)) {
				A = A.toLowerCase();
			}
			if (UInv.isString(B)) {
				B = B.toLowerCase();
			}
			return A > B;
		}

		if (UInv.isArray(UnsortedArray) && UInv.isArray(ArrayToSortBy)) {
			if (UnsortedArray.length === ArrayToSortBy.length) {
				var UA = clone(UnsortedArray), ATSB = clone(ArrayToSortBy);
				if (UA.length > 1) {
					var i = 0, j = 0, n = 0, temp, length = ATSB.length, done = true;
					for (i = 0; i < length / 2; i++) {  // improved cocktail shaker sort with subsorting by unsorted array
						done = true;
						for (j = i; j < length - i - 1; j++) {
							if (GreaterThan(ATSB[j], ATSB[j + 1]) || ((ATSB[j] === ATSB[j + 1]) && GreaterThan(UA[j], UA[j + 1]))) {
								temp = ATSB[j];
								ATSB[j] = ATSB[j + 1];
								ATSB[j + 1] = temp;
								temp = UA[j];
								UA[j] = UA[j + 1];
								UA[j + 1] = temp;
								done = false;
							}
							n = length - j - 1;
							if (GreaterThan(ATSB[n - 1], ATSB[n]) || ((ATSB[n - 1] === ATSB[n]) && GreaterThan(UA[n - 1], UA[n]))) {
								temp = ATSB[n];
								ATSB[n] = ATSB[n - 1];
								ATSB[n - 1] = temp;
								temp = UA[n];
								UA[n] = UA[n - 1];
								UA[n - 1] = temp;
								done = false;
							}
						}
						if (done) {
							break;
						}
					}
					if (RemoveDuplicates) {
						i = 0;
						while (i < ATSB.length - 1) {
							if ((ATSB[i] === ATSB[i+1]) && (UA[i] === UA[i+1])) {
								ATSB.deleteAt(i);
								UA.deleteAt(i);
							} else {
								++i;
							}
						}
					}
				}
				return UA;
			}
		}
		return null;
	},

	// getArrayReverseSortedByOtherArray: Returns UnsortedArray reverse sorted based on ArrayToSortBy and subsorted by UnsortedArray value.  This is a case insensitive sort.
	//                                    If RemoveDuplicates is true, it also removes any elements where its pair is duplicated in both arrays.
	getArrayReverseSortedByOtherArray : function (UnsortedArray, ArrayToSortBy, RemoveDuplicates) {

		function GreaterThan(A, B) {
			if (UInv.isString(A)) {
				A = A.toLowerCase();
			}
			if (UInv.isString(B)) {
				B = B.toLowerCase();
			}
			return A > B;
		}

		function LessThan(A, B) {
			if (UInv.isString(A)) {
				A = A.toLowerCase();
			}
			if (UInv.isString(B)) {
				B = B.toLowerCase();
			}
			return A < B;
		}

		if (UInv.isArray(UnsortedArray) && UInv.isArray(ArrayToSortBy)) {
			if (UnsortedArray.length === ArrayToSortBy.length) {
				var UA = clone(UnsortedArray), ATSB = clone(ArrayToSortBy);
				if (UA.length > 1) {
					var i = 0, j = 0, n = 0, temp, length = ATSB.length, done = true;
					for (i = 0; i < length / 2; i++) {  // improved cocktail shaker sort with subsorting by unsorted array
						done = true;
						for (j = i; j < length - i - 1; j++) {
							if (LessThan(ATSB[j], ATSB[j + 1]) || ((ATSB[j] === ATSB[j + 1]) && GreaterThan(UA[j], UA[j + 1]))) {
								temp = ATSB[j];
								ATSB[j] = ATSB[j + 1];
								ATSB[j + 1] = temp;
								temp = UA[j];
								UA[j] = UA[j + 1];
								UA[j + 1] = temp;
								done = false;
							}
							n = length - j - 1;
							if (LessThan(ATSB[n - 1], ATSB[n]) || ((ATSB[n - 1] === ATSB[n]) && GreaterThan(UA[n - 1], UA[n]))) {
								temp = ATSB[n];
								ATSB[n] = ATSB[n - 1];
								ATSB[n - 1] = temp;
								temp = UA[n];
								UA[n] = UA[n - 1];
								UA[n - 1] = temp;
								done = false;
							}
						}
						if (done) {
							break;
						}
					}
					if (RemoveDuplicates) {
						i = 0;
						while (i < ATSB.length - 1) {
							if ((ATSB[i] === ATSB[i+1]) && (UA[i] === UA[i+1])) {
								ATSB.deleteAt(i);
								UA.deleteAt(i);
							} else {
								++i;
							}
						}
					}
				}
				return UA;
			}
		}
		return null;
	},

	// numberToAPString: Converts a number to a string that conforms to basic AP writing style guidelines.
	//                   For exceptions see: https://writingexplained.org/ap-style/ap-style-numbers
	numberToAPString : function (Value) {
		if (UInv.isNumber(Value)) {
			if (Number.isInteger(Value) && (Value < 10) && (Value >= 0)) {
				return UInv.NumText[Value];  // convert number to number name
			} else {  // *** write out multiples of 1,000? e.g. 12 million? ***
				return Value.toLocaleString();  // add commas or local variant
			}
		}
		return Value;  // Does not change non-numbers
	},

	// capitalizeFirstLetter: Converts the first letter of a string to upper case.
	capitalizeFirstLetter : function (Str) {
		if (UInv.isString(Str)) {
			return Str.charAt(0).toUpperCase() + Str.slice(1);
		}
		return Str;
	},

	// getRandomHexString: Returns a random hexidecimal string of 6 characters.
	getRandomHexString : function () {
		var r = random(0, 255).toString(16), g = random(0, 255).toString(16), b = random(0, 255).toString(16);
		if (r.length === 1) {
			r = "0" + r;
		}
		if (g.length === 1) {
			g = "0" + g;
		}
		if (b.length === 1) {
			b = "0" + b;
		}
		return r + g + b;
	},

	// getObjectProperties: Returns all of the properties and values of an object as a string.  Non-objects get returned unchanged.
	getObjectProperties : function (Obj, Ext) {
		if (Ext === undefined) {
			Ext = "";
		} else {
			Ext += ".";
		}
		var Txt, i;
		if (UInv.isArray(Obj)) {
			Txt = "[ ";
			for (i = 0; i < Obj.length; i++) {
				if (UInv.isObject(Obj[i])) {
					Txt += UInv.getObjectProperties(Obj[i]);
				} else {
					if (UInv.isString(Obj[i])) {
						Txt += '"' + Obj[i] + '"';
					} else {
						Txt += Obj[i];
					}
					if (i < Obj.length - 1) {
						Txt += ", ";
					}
				}
			}
			Txt += " ]";
			return Txt;
		} else if (UInv.isObject(Obj)) {
			var Keys = Object.keys(Obj);
			Txt = "{ ";
			for (i = 0; i < Keys.length; i++) {
				if (UInv.isObject(Obj[Keys[i]])) {
					Txt += Ext + Keys[i] + " : " + UInv.getObjectProperties(Obj[Keys[i]], Ext + Keys[i]);
				} else {
					if (UInv.isString(Obj[Keys[i]])) {
						Txt += Ext + Keys[i] + ' = "' + Obj[Keys[i]] + '"';
					} else {
						Txt += Ext + Keys[i] + ' = ' + Obj[Keys[i]];
					}
				}
				if (i < Keys.length - 1) {
					Txt += ", ";
				}
			}
			Txt += " }";
			return Txt;
		} else {
			return Obj;
		}
	},

	// deepFreeze: Freeze everything in an object's property tree.
	deepFreeze : function (Obj) {
		var value, name, i, propNames = Object.getOwnPropertyNames(Obj);
		// Freeze object's child properties before freezing object.
		for (i = 0; i < propNames.length; i++) {
			name = propNames[i];
			value = Obj[name];
			Obj[name] = value && typeof value === "object" ? UInv.deepFreeze(value) : value;  // Recursively handle sub-properties, if any exist.
		}
		return Object.freeze(Obj);
	},

	// docHasCSSElement: If document has CSS element "CSSElement", returns the element's CSSStyleDeclaration object, otherwise returns "false".
	docHasCSSElement : function (CSSElement) {
		var rules, i, j;
		for (i = 0; i < document.styleSheets.length; i++) {
			try {
				rules = document.styleSheets[i].rules;  // This can throw an error sometimes.
			} catch(e) {
				rules = undefined;  // Error thrown
			}
			if (rules === undefined) {  // If .rules doesn't exist, try .cssRules
				try {
					rules = document.styleSheets[i].cssRules;  // This can throw an error sometimes.
					if (rules === undefined) {
						rules = [];  // Neither worked, so no rules.
					}
				} catch(e) {
					rules = [];  // Error thrown, so no rules.
				}
			}
			for (j = 0; j < rules.length; j++) {
				if (rules[j].selectorText !== undefined) {
					if (typeof rules[j].selectorText == "string") {
						if (rules[j].selectorText == CSSElement) {  // See if CSS selector matches CSSElement string.
							return rules[j].style;  // Success - found matching CSS selector.
						}
					}
				}
			}
		}
		return false;  // Success - no matching CSS selector found.
	},

	// initializeImageCache: Sets up setup.UInvImageCache for image caching.
	initializeImageCache : function () {
		// Set up image cache.
		if (UInv.isUndefined(setup.UInvImageCache)) {
			setup.UInvImageCache = { loading: 0, complete: 0, loaded: 0, errors: 0, waiting: 0, total: 0, maxConcurrent: 5, maxCache: 100, images: [] };
		} else {
			if (UInv.isUndefined(setup.UInvImageCache.loading)) { setup.UInvImageCache.loading = 0; }
			if (UInv.isUndefined(setup.UInvImageCache.complete)) { setup.UInvImageCache.complete = 0; }
			if (UInv.isUndefined(setup.UInvImageCache.loaded)) { setup.UInvImageCache.loaded = 0; }
			if (UInv.isUndefined(setup.UInvImageCache.errors)) { setup.UInvImageCache.errors = 0; }
			if (UInv.isUndefined(setup.UInvImageCache.waiting)) { setup.UInvImageCache.waiting = 0; }
			if (UInv.isUndefined(setup.UInvImageCache.total)) { setup.UInvImageCache.total = 0; }
			if (UInv.isUndefined(setup.UInvImageCache.maxConcurrent)) { setup.UInvImageCache.maxConcurrent = 5; }
			if (UInv.isUndefined(setup.UInvImageCache.maxCache)) { setup.UInvImageCache.maxCache = 100; }
			if (UInv.isUndefined(setup.UInvImageCache.images)) { setup.UInvImageCache.images = []; }
		}
	},

	// continueLoadingCache: Starts loading any waiting images if maxConcurrent images aren't already loading.
	continueLoadingCache : function () {
		UInv.initializeImageCache();
		// Retry loading errors?  Only when everything else is already loaded?  ***
		if (setup.UInvImageCache.waiting > 0) {
			var Waiting = [], j;
			for (j = 0; j < setup.UInvImageCache.images.length; j++) {
				if (setup.UInvImageCache.images[j].status == "Waiting...") {
					Waiting.push(j);
				}
			}
			while (setup.UInvImageCache.loading < setup.UInvImageCache.maxConcurrent) {
				j = Waiting.shift();  // Grab the index of the oldest waiting image
				setup.UInvImageCache.loading++;
				setup.UInvImageCache.waiting--;
				setup.UInvImageCache.images[j].tries++;
				setup.UInvImageCache.images[j].status = "Loading...";
				setup.UInvImageCache.images[j].src = setup.UInvImageCache.images[j].URL;
			}
		}
	},

	// flushCachedImages: Allows you to manually unload previously cached images.
	flushCachedImages : function (Path, ImageName) {
		UInv.initializeImageCache();
		if (UInv.isString(Path)) {
			if (UInv.isString(ImageName)) {
				ImageName = [ImageName];
			}
			if (UInv.isArrayOfStrings(ImageName)) {
				if (UInv.isUndefined(setup.UInvImageCache)) {
					return true;  // Success - No image cache existed
				}
				var i, ndx;
				for (i = 0; i < ImageName.length; i++) {
					ndx = setup.UInvImageCache.map( function (obj) { return obj.URL; } ).indexOf(Path + ImageName[i]);
					if (ndx >=0) {
						setup.UInvImageCache.total--;
						$(setup.UInvImageCache.images[ndx]).off("load loadstart onprogress progress loadend error abort");  // remove event handlers
						setup.UInvImageCache.images[ndx].IgnoreEvents = true;  // this should be redundant due to the .off() above
						if (setup.UInvImageCache.images[ndx].status == "Waiting...") {
							setup.UInvImageCache.waiting--;
						} else if (setup.UInvImageCache[ndx].status == "Loading...") {
							setup.UInvImageCache.loading--;
							setup.UInvImageCache.images[ndx].src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=;";  // transparent GIF to stop image loading
						} else if (setup.UInvImageCache[ndx].status == "Loaded") {
							setup.UInvImageCache.complete--;
							setup.UInvImageCache.loaded--;
						} else if (setup.UInvImageCache[ndx].status == "Error") {
							setup.UInvImageCache.complete--;
							setup.UInvImageCache.errors--;
						}
						setup.UInvImageCache.deleteAt(ndx);
					}
				}
				UInv.continueLoadingCache();  // trigger loading any waiting images up to maxConcurrent
				return true;  // Success
			} else {
				UInv.Error('Error: ImageName passed to flushCachedImages is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Path passed to flushCachedImages is not a string.');  // Error
			return false;
		}
	},

	// flushAllCachedImages: Clears out all cached images.  Also lets you set the maximum number of images to cache (defaults to 100) and the
	//                       maximum number of images do download concurrently (defaults to 5).  Returns true on success and false on error.
	flushAllCachedImages : function (MaxConcurrent, MaxCache) {
		UInv.initializeImageCache();
		if (UInv.isUndefined(MaxCache)) { MaxCache = UInv.DefaultMaxCache; }
		if (UInv.isUndefined(MaxConcurrent)) { MaxConcurrent = UInv.DefaultMaxConcurrent; }
		if (UInv.isString(MaxCache)) { MaxCache = parseInt(MaxCache); }
		if (UInv.isString(MaxConcurrent)) { MaxConcurrent = parseInt(MaxConcurrent); }
		if (UInv.isInteger(MaxCache)) {
			if (UInv.isInteger(MaxConcurrent)) {
				if (MaxCache < 10) { MaxCache = 10; }
				if (MaxConcurrent < 3) { MaxConcurrent = 3; }
				if (setup.UInvImageCache.images.length > 0) {
					var URLs = [], i;
					for (i = 0; i < setup.UInvImageCache.images.length; i++) {
						URLs.push(setup.UInvImageCache.images[i].URL);
					}
					UInv.flushCachedImages("", URLs);
				}
				setup.UInvImageCache = { loading: 0, complete: 0, loaded: 0, errors: 0, waiting: 0, total: 0, maxConcurrent: MaxConcurrent, maxCache: MaxCache, images: [] };
				return true;  // Success
			} else {
				UInv.Error('Error: MaxConcurrent passed to flushAllCachedImages is not an integer.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: MaxCache passed to flushAllCachedImages is not an integer.');  // Error
			return false;
		}
	},

	// getCachedImageObject: Returns a copy of the cached image object.  This way you can access properties like .naturalWidth and .naturalHeight on it.  Returns "null" if image not in cache or on error.
	getCachedImageObject : function (Path, ImageName) {
		UInv.initializeImageCache();
		if (UInv.isString(Path)) {
			if (UInv.isString(ImageName)) {
				var ndx = setup.UInvImageCache.images.map( function (obj) { return obj.URL; } ).indexOf(Path + ImageName);
				if (ndx >= 0) {
					return setup.UInvImageCache.images[ndx];  // Success
				} else {
					return null;  // Success - Image not found in cache
				}
			} else {
				UInv.Error('Error: ImageName passed to getCachedImageObject is not a string.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Path passed to getCachedImageObject is not a string.');  // Error
			return false;
		}
	},

	// cacheImages: Allows you to preload images.  You can use the handler to receive notifications about load or error events.
	//             NOTE: The cache gets flushed whenever the game is reloaded or restarted.  Do NOT depend on files to exist in the cache.
	cacheImages : function (Path, ImageName, Handler) {

		function Loaded(event) {  // eslint-disable-line
			if (!this.IgnoreEvents) {
				this.status = "Loaded";
				setup.UInvImageCache.loading--;
				setup.UInvImageCache.complete++;
				setup.UInvImageCache.loaded++;
				event.URL = this.URL;
				event.path = this.path;
				event.filename = this.filename;
				event.tries = this.tries;
				event.src = this.src;
				if (UInv.isProperty(this, "imageGroup")) {
					event.imageGroup = this.imageGroup;
				}
				UInv.CallEventHandler("cacheImages", "Loaded", this);  // cacheImages Loaded event
				UInv.continueLoadingCache();  // trigger loading any waiting images up to maxConcurrent
			}
		}
		function Failure(event) {  // eslint-disable-line
			if (!this.IgnoreEvents) {
				this.status = "Error";
				setup.UInvImageCache.loading--;
				setup.UInvImageCache.complete++;
				setup.UInvImageCache.errors++;
				event.URL = this.URL;
				event.path = this.path;
				event.filename = this.filename;
				event.tries = this.tries;
				event.src = this.src;
				if (UInv.isProperty(this, "imageGroup")) {
					event.imageGroup = this.imageGroup;
				}
				var Ret = UInv.CallEventHandler("cacheImages", "Error", this);  // cacheImages Error event
				if (Ret.retryLoad !== true) {
					// Error images are moved towards the start of the image cache so they get flushed first.
					var x = setup.UInvImageCache.images.map( function (obj) { return obj.URL; } ).indexOf(this.URL);
					var img = setup.UInvImageCache.images.deleteAt(x)[0], n = 0;
					while ((n < setup.UInvImageCache.images.length) && (setup.UInvImageCache.images[n].status != "Error")) {
						n++;
					}
					setup.UInvImageCache.images.splice(setup.UInvImageCache.errors - 1, 0, img);
				} else {  // Retry loading this image
					setup.UInvImageCache.loading++;
					setup.UInvImageCache.complete--;
					setup.UInvImageCache.errors--;
					this.status = "Waiting...";
				}
				UInv.continueLoadingCache();  // trigger loading any waiting images up to maxConcurrent
			}
		}

		UInv.initializeImageCache();
		if (UInv.isString(Path)) {
			if (UInv.isString(ImageName)) {
				ImageName = [ImageName];
			}
			if (UInv.isArrayOfStrings(ImageName)) {
				if (UInv.isUndefined(setup.UInvImageCache)) {
					setup.UInvImageCache = { loading: 0, complete: 0, loaded: 0, errors: 0, waiting: 0, total: 0, maxConcurrent: UInv.DefaultMaxConcurrent, maxCache: UInv.DefaultMaxCache, images: [] };
				}
				var i = 0, j, done = false, image, ndx, uniqueID = "", HandlerIDs;
				if (UInv.isString(Handler) && (ImageName.length > 0)) {  // create imageGroup for event handlers
					uniqueID = "iGrp" + (++i);
					while (!done) {  // look for existing matching handlers
						HandlerIDs = UInv.GetMatchingEventHandlersArray("cacheImages", "Loaded", { imageGroup: uniqueID });
						if (HandlerIDs.length > 0) {
							for (j = 0; j < HandlerIDs.length; ++j) {
								//if (any HandlerIDs have a handler that == Handler) then use current uniqueID, otherwise uniqueID = "iGrp" + ++i; and try again
								if (UInv.GetEventHandlerByID("cacheImages", "Loaded", HandlerIDs[j]).handler == Handler) {
									done = true;
									break;  // Break out of for loop
								}
							}
							if (!done) {  // try again
								uniqueID = "iGrp" + (++i);
							}
						} else {  // uniqueID is unique currently, so keep it
							done = true;
						}
					}
					UInv.AddEventHandler("cacheImages", "Loaded", Handler, { imageGroup: uniqueID });
					UInv.AddEventHandler("cacheImages", "Error", Handler, { imageGroup: uniqueID });
				}
				for (i = 0; i < ImageName.length; i++) {
					ndx = setup.UInvImageCache.images.map( function (obj) { return obj.URL; } ).indexOf(Path + ImageName[i]);
					if (ndx >= 0) {
						if (["Loaded", "Error"].includes(setup.UInvImageCache.images[ndx].status)) {
							// shift image at ndx to the front of the "loaded" line (if there is one) so it doesn't get flushed for being old
							image = setup.UInvImageCache.images.deleteAt(ndx)[0];
							setup.UInvImageCache.images.splice(setup.UInvImageCache.total - setup.UInvImageCache.complete, 0, image);
							if (setup.UInvImageCache.images[ndx].status == "Error") {
								// retry loading failed image
								setup.UInvImageCache.images[ndx].status = "Loading...";
								setup.UInvImageCache.errors--;
								setup.UInvImageCache.complete--;
								setup.UInvImageCache.loading++;
								setup.UInvImageCache.images[ndx].IgnoreEvents = true;
								if (uniqueID !== "") {
									setup.UInvImageCache.images[ndx].imageGroup = uniqueID;
								}
								setup.UInvImageCache.images[ndx].src = "";
								delete setup.UInvImageCache.images[ndx].IgnoreEvents;
								setup.UInvImageCache.images[ndx].src = setup.UInvImageCache.URL;
							}
						}  // don't move "Waiting..." or "Loading..." images, they should already be at the "young" end of the line.
					} else {
						image = new Image();
						image.path = Path;
						image.filename = ImageName[i];
						image.URL = Path + ImageName[i];
						image.tries = 0;
						if (uniqueID !== "") {
							image.imageGroup = uniqueID;
						}
						setup.UInvImageCache.total++;
						$(image)
							.on("load loadstart onprogress progress loadend", Loaded)  // only "load" does something
							.on("error abort", Failure);
						if (setup.UInvImageCache.maxConcurrent > setup.UInvImageCache.loading) {  // load image
							setup.UInvImageCache.loading++;
							image.status = "Loading...";
							image.src = Path + ImageName[i];
							setup.UInvImageCache.images.push(image);
						} else {  // add image to queue
							setup.UInvImageCache.waiting++;
							image.status = "Waiting...";
							setup.UInvImageCache.images.push(image);
						}
					}
				}
				if (setup.UInvImageCache.images.length > setup.UInvImageCache.maxCache) {  // Flush oldest images if cache is "full"
					var OldURLs = setup.UInvImageCache.images.slice(0, setup.UInvImageCache.images.length - setup.UInvImageCache.maxCache).map( function (obj) { return obj.URL; } );
					UInv.flushCachedImages("", OldURLs);
				}
				return true;  // Success
			} else {
				UInv.Error('Error: ImageName passed to cacheImages is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Path passed to cacheImages is not a string.');  // Error
			return false;
		}
	},

	// Engine detection code:
	// Opera 8.0+
	isOpera : function () { return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0; },
	// Firefox 1.0+
	isFirefox : function () { return  typeof InstallTrigger !== "undefined"; },
	// Safari 3.0+ "[object HTMLElementConstructor]" 
	isSafari : function () { return  /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || (typeof safari !== "undefined" && safari.pushNotification)); },
	// Internet Explorer 6-11
	isIE : function () { return  /*@cc_on!@*/false || !!document.documentMode; },
	// Edge 20+
	isEdge : function () { return  !UInv.isIE() && !!window.StyleMedia; },
	// Chrome 1+
	isChrome : function () { return  !!window.chrome && !!window.chrome.webstore; },
	// Blink engine detection
	isBlink : function () { return  (UInv.isChrome() || UInv.isOpera()) && !!window.CSS; },
	// Android engine detection
	isAndroid : function () { return  Browser.isMobile.Android; },
	// iOS engine detection
	isiOS : function () { return  Browser.isMobile.iOS; },
	// BlackBerry engine detection
	isBlackBerry : function () { return  Browser.isMobile.BlackBerry; },
	// Mobile engine detection
	isMobile : function () { return  ( UInv.isAndroid() || UInv.isiOS() || UInv.isBlackBerry() || Browser.isMobile.Windows ); },
	// Twine engine detection
	isTwine : function () { return  window.hasOwnProperty("storyFormat"); },


	// UInv Bag Functions:
	// ===================

	// GetDefaultBagObject: Returns the Bag object that matches BagType.  If PropertiesOnly is true, then returns default bag properties only.
	// Returns "undefined" for unknown bag types, or "null" on error.  Both "undefined" and "null" have "falsey" values.
	GetDefaultBagObject : function (BagType, PropertiesOnly) {
		if (UInv.isString(BagType)) {
			if ((BagType === "") || (BagType === "-")) {
				// Do not throw an error here.  This case is used to trigger an "undefined" return if the BagType === "" or "-".
				return undefined;  // Silent failure
			}
			var BName = BagType.toLowerCase(), BagProperties = UInv.BagData(BName, true);
			if (PropertiesOnly) {
				return BagProperties;  // Success
			}
			var BagItems = UInv.BagData(BName, false), Bag = {}, Item = {}, Key = "", i = 0;
			if (UInv.isUndefined(BagProperties) || UInv.isUndefined(BagItems)) {
				return undefined;  // Silent failure
			}
			if (Object.keys(BagProperties).length > 0) {
				Bag = { UInvProperties : BagProperties };
			}
			if (BagItems.length > 0) {
				for (i = 0; i < BagItems.length; i++) {
					if (UInv.isGenericObject(BagItems[i])) {
						Key = Object.keys(BagItems[i])[0];
						Item = UInv.GetDefaultItemObject(Key);  // *** OOO function call
						if (Item) {
							if (BagItems[i][Key] > 1) {
								Item.UInvQuantity = BagItems[i][Key];
							}
							Bag[Key] = clone(Item);
						} else {
							UInv.Error('Error: GetDefaultBagObject failed.  Unknown item "' + Key + '".');  // Error
							return null;
						}
					} else {
						Item = UInv.GetDefaultItemObject(BagItems[i]);  // *** OOO function call
						if (Item) {
							Bag[BagItems[i]] = clone(Item);
						} else {
							UInv.Error('Error: GetDefaultBagObject failed.  Unknown item "' + BagItems[i] + '".');  // Error
							return null;
						}
					}
				}
			}
			return Bag;  // Success
		} else {
			UInv.Error('Error: BagType passed to GetDefaultBagObject is not a string.');  // Error
			return null;
		}
	},

	// GetCurrentBagName: Gets the current bag name if there is one, otherwise returns "".
	GetCurrentBagName : function () {
		if (UInv.isProperty(State.variables, "UInvCurrentBagName")) {
			return State.variables.UInvCurrentBagName;
		} else {
			return "";
		}
	},

	// FixBagName: Returns $UInvCurrentBagName if BagName === "", false if BagName was not a string, otherwise returns BagName.
	FixBagName : function (BagName) {
		if (UInv.isString(BagName)) {
			if ((BagName === "") && UInv.isString(UInv.GetCurrentBagName())) {
				return UInv.GetCurrentBagName();
			}
			return BagName;  // Success
		} else {
			UInv.Error('Error: Name passed to FixBagName is not a string.');  // Error
			return false;
		}
	},

	// GetBagsArray: Returns an array of all bag names.
	GetBagsArray : function () {
		return Object.keys(State.variables.UInvBags);  // Success
	},

	// GetBagCount: Returns the number of bags.
	GetBagCount : function () {
		return UInv.GetBagsArray().length;  // Success
	},

	// SetCurrentBagName: Sets the UInvCurrentBagName to BagName for use as the default BagName parameter in UInv functions.  Returns true on success or false on error.
	SetCurrentBagName : function (BagName) {
		if (UInv.isString(BagName)) {
			if (BagName === "") {
				if (UInv.isProperty(State.variables, "UInvCurrentBagName")) {
					delete State.variables.UInvCurrentBagName;
				}
			} else {
				State.variables.UInvCurrentBagName = BagName;
			}
			return true;  // Success
		} else {
			UInv.Error('Error: Name passed to SetCurrentBag is not a string.');  // Error
			return false;
		}
	},
	
	// BagExists: Returns true if bag exists/all bags in array exist, otherwise returns false.
	BagExists : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.GetBagsArray().includes(BagName)) {
				UInv.SetCurrentBagName(BagName);
				return true;  // Success
			} else {
				return false;  // Success
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			var i = 0;
			for (i = 0; i < BagName.length; i++) {
				if (!UInv.BagExists(BagName[i])) {
					return false;  // Success - bag missing
				}
			}
			return true;  // Success - found all bags
		} else {
			UInv.Error('Error: Name passed to BagExists is not a string or array of strings.');  // Error
			return false;
		}
	},

	// CreateBag: Creates a bag named BagName if that bag doesn't exist already.  Returns true if it succeeded.
	CreateBag : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.Error('Error: CreateBag cannot create bag "' + BagName + '".  Bag already exists with that name.');  // Error
				return false;
			} else {
				State.variables.UInvBags[BagName] = {};
				if (UInv.GetDefaultBagObject(BagName)) {
					State.variables.UInvBags[BagName].UInvDefaultBagType = "-";
				}
				UInv.SetBagUntouched(BagName);  // *** OOO function call
				UInv.SetCurrentBagName(BagName);
				return true;  // Success
			}
		} else {
			UInv.Error('Error: BagName passed to CreateBag is not a string.');  // Error
			return false;
		}
	},

	// EmptyBag: Remove all items from bag.  Return true if successful.
	EmptyBag : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);  // *** OOO function call
				if (Items.length > 0) {
					var i = 0;
					UInv.IncrementUpdateLock();  // Prevent unnecessary updates.
					for (i = 0; i < Items.length; i++) {
						UInv.DeleteItem(BagName, Items[i]);  // *** OOO function call
					}
					UInv.DecrementUpdateLock();
					UInv.SetBagTouched(BagName);  // *** OOO function call
				}
				UInv.SetCurrentBagName(BagName);
				return true;  // Success
			} else {
				UInv.Error('Error: EmptyBag cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to EmptyBag is not a string.');  // Error
			return false;
		}
	},

	// AddBag: Creates a bag named BagName if that bag doesn't exist already.  Returns true if it succeeded.
	AddBag : function (BagName, DefaultBagType) {
		if (UInv.isString(BagName)) {
			if (UInv.isUndefined(DefaultBagType) || UInv.isString(DefaultBagType)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.Error('Error: AddBag cannot create bag "' + BagName + '".  Bag already exists with that name.');  // Error
					return false;
				} else {
					var Bag = {};
					if (UInv.isString(DefaultBagType)) {
						Bag = UInv.GetDefaultBagObject(DefaultBagType);
						if (!Bag) {
							UInv.Error('Error: AddBag failed.  Unknown bag type "' + DefaultBagType + '".');  // Error
							return false;
						}
						Bag.UInvDefaultBagType = DefaultBagType;
					} else {
						Bag = UInv.GetDefaultBagObject(BagName);
						if (!Bag) {
							UInv.Error('Error: AddBag failed.  Unknown bag type "' + BagName + '".');  // Error
							return false;
						}
						DefaultBagType = BagName;
					}
					if (UInv.isProperty(Bag, "UInvVariableType")) {
						Bag.UInvDefaultBagType = DefaultBagType;  // bag is of a variable type, so its properties have to be kept as-is
					} else {
						if (UInv.isProperty(Bag, "UInvProperties")) {
							delete Bag.UInvProperties;  // clear default properties
						}
					}
					State.variables.UInvBags[BagName] = Bag;
					var Items = UInv.GetItemsArray(BagName), Quantities = UInv.GetItemsAndQuantitiesObject(BagName), Types = [], i = 0;  // *** OOO function calls
					for (i = 0; i < Items.length; i++) {
						Types.push(UInv.GetItemsDefaultType(BagName, Items[i]));  // *** OOO function call
					}
					UInv.EmptyBag(BagName);  // add items properly
					for (i = 0; i < Items.length; i++) {
						UInv.AddItem(BagName, Types[i], Quantities[Items[i]], Items[i]);  // *** OOO function call
					}
					UInv.SetBagUntouched(BagName);  // *** OOO function call
					UInv.SetCurrentBagName(BagName);
					return true;  // Success
				}
			} else {
				UInv.Error('Error: DefaultBagType passed to AddBag is not a string.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagName passed to AddBag is not a string.');  // Error
			return false;
		}
	},

	// GetBagsDefaultType: Returns bag's default bag type if it has one, "-" if it doesn't, or "null" on error.
	GetBagsDefaultType : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvDefaultBagType")) {
					return State.variables.UInvBags[BagName].UInvDefaultBagType;
				} else {
					if (UInv.GetDefaultBagObject(BagName, true)) {
						return BagName;
					} else {
						return "-";
					}
				}
			} else {
				UInv.Error('Error: GetBagsDefaultType failed.  Cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetBagsDefaultType is not a string.');  // Error
			return null;
		}
	},

	// GetBagCountByDefaultType: Returns the number of unique bag types, bags with no default bag type count as unique bag types.
	GetBagCountByDefaultType : function () {
		var Tot = 0, Typ, TypLst = [], i;
		var Bags = UInv.GetBagsArray();
		if (Bags.length > 0) {
			for (i = 0; i < Bags.length; i++) {
				Typ = UInv.GetBagsDefaultType(Bags[i]);
				if (Typ === "-") {
					++Tot;
				} else if (TypLst.indexOf(Typ) < 0) {
					TypLst.push(Typ);
					++Tot;
				}
			}
		}
		return Tot;
	},

	// CopyBag: Creates a new bag named NewBagName if that bag doesn't exist already, and copies ExistingBagName into it.  Returns true if it succeeded.
	CopyBag : function (ExistingBagName, NewBagName) {
		if (UInv.isString(ExistingBagName) && UInv.isString(NewBagName)) {
			ExistingBagName = UInv.FixBagName(ExistingBagName);
			NewBagName = UInv.FixBagName(NewBagName);
			if (UInv.BagExists(ExistingBagName)) {
				if (!UInv.BagExists(NewBagName)) {
					State.variables.UInvBags[NewBagName] = clone(State.variables.UInvBags[ExistingBagName]);
					var Type = UInv.GetBagsDefaultType(ExistingBagName);
					if (Type !== NewBagName) {
						State.variables.UInvBags[NewBagName].UInvDefaultBagType = Type;
					} else {
						delete State.variables.UInvBags[NewBagName].UInvDefaultBagType;
					}
					UInv.SetBagUntouched(NewBagName);  // *** OOO function call
					return true;  // Success
				} else {
					UInv.Error('Error: CopyBag failed.  Bag "' + NewBagName + '" already exists.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: CopyBag failed.  Cannot find bag "' + ExistingBagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to CopyBag is not a string.');  // Error
			return false;
		}
	},

	// GetBagPropertyArray: Return an array of all bag's property names.  Returns "null" on error.
	GetBagPropertyArray : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Type = UInv.GetBagsDefaultType(BagName);
				if (Type === "-") {
					UInv.SetCurrentBagName(BagName);
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
						return Object.keys(State.variables.UInvBags[BagName].UInvProperties);  // Success
					} else {
						return [];
					}
				}
				var Props = UInv.GetDefaultBagObject(Type, true);
				if (Props && (!UInv.isProperty(State.variables.UInvBags[BagName], "UInvVariableType"))) {
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
						return Object.keys(State.variables.UInvBags[BagName].UInvProperties).concatUnique(Object.keys(Props));  // Success
					} else {
						return Object.keys(Props);  // Success
					}
				} else {
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
						return Object.keys(State.variables.UInvBags[BagName].UInvProperties);  // Success
					} else {
						return [];
					}
				}
			} else {
				UInv.Error('Error: GetBagPropertyArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetBagPropertyArray is not a string.');  // Error
			return null;
		}
	},

	// DeleteBag: Deletes bag entirely.  Return true if successful.
	DeleteBag : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.EmptyBag(BagName);
				if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
					var Props = Object.keys(State.variables.UInvBags[BagName].UInvProperties);
					if (Props.length > 0) {
						var i = 0;
						for (i = 0; i < Props.length; i++) {
							delete State.variables.UInvBags[BagName].UInvProperties[Props[i]];
						}
					}
					delete State.variables.UInvBags[BagName].UInvProperties;
				}
				if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvTouched")) {
					delete State.variables.UInvBags[BagName].UInvTouched;
				}
				if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvDefaultBagType")) {
					delete State.variables.UInvBags[BagName].UInvDefaultBagType;
				}
				delete State.variables.UInvBags[BagName];
				return true;  // Success
			} else {
				UInv.Error('Error: DeleteBag cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to DeleteBag is not a string.');  // Error
			return false;
		}
	},

	// RenameBag: Renames CurrentBagName to NewBagName if that bag doesn't exist already.  Returns true if it succeeded.
	RenameBag : function (CurrentBagName, NewBagName) {
		if (UInv.isString(CurrentBagName) && UInv.isString(NewBagName)) {
			CurrentBagName = UInv.FixBagName(CurrentBagName);
			NewBagName = UInv.FixBagName(NewBagName);
			if (UInv.BagExists(CurrentBagName)) {
				if (!UInv.BagExists(NewBagName)) {
					State.variables.UInvBags[NewBagName] = clone(State.variables.UInvBags[CurrentBagName]);
					var Type = UInv.GetBagsDefaultType(CurrentBagName);
					if (Type !== NewBagName) {
						State.variables.UInvBags[NewBagName].UInvDefaultBagType = Type;
					} else {
						delete State.variables.UInvBags[NewBagName].UInvDefaultBagType;
					}
					UInv.DeleteBag(CurrentBagName);
					return true;  // Success
				} else {
					UInv.Error('Error: RenameBag failed.  Bag "' + NewBagName + '" already exists.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: RenameBag failed.  Cannot find bag "' + CurrentBagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to RenameBag is not a string.');  // Error
			return false;
		}
	},

	// BagHasProperty: Returns true if bag's property exists, otherwise returns false.
	BagHasProperty : function (BagName, BagPropertyName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isString(BagPropertyName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.GetBagPropertyArray(BagName).includes(BagPropertyName)) {
						return true;  // Success
					} else {
						return false;  // Success
					}
				} else if (UInv.isArrayOfStrings(BagPropertyName)) {
					var i = 0, Props = UInv.GetBagPropertyArray(BagName);
					for (i = 0; i < BagPropertyName.length; i++) {
						if (!Props.includes(BagPropertyName[i])) {
							return false;  // Success
						}
					}
					return true;  // Success
				} else {
					UInv.Error('Error: BagPropertyName passed to BagHasProperty is not a string or array of strings.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagHasProperty cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to BagHasProperty is not a string.');  // Error
			return null;
		}
	},

	// GetBagPropertyValue: Return a bag's property value.  Returns "null" on error.
	GetBagPropertyValue : function (BagName, BagPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
						if (UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, BagPropertyName)) {
							return State.variables.UInvBags[BagName].UInvProperties[BagPropertyName];  // Success
						}
					}
					return UInv.GetDefaultBagObject(UInv.GetBagsDefaultType(BagName), true)[BagPropertyName];  // Success
				} else {
					UInv.Error('Error: GetBagPropertyValue cannot find bag property "' + BagPropertyName + '" on bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetBagPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetBagPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// SetBagPropertyValue: Add or change a bag property and set it to Value.  Returns true if it succeeds.
	SetBagPropertyValue : function (BagName, BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isUndefined(Value)) {
						var BagType = UInv.GetBagsDefaultType(BagName), Props = [];
						if (BagPropertyName === "UInvVariableType") {
							if (!UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
								State.variables.UInvBags[BagName].UInvProperties = {};
							}
							if (UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, "UInvVariableType") || (BagType === "-")) {
								State.variables.UInvBags[BagName].UInvProperties[BagPropertyName] = Value;
							} else {  // set bag's default properties
								State.variables.UInvBags[BagName].UInvProperties = Object.assign({}, UInv.GetDefaultBagObject(BagType, true), State.variables.UInvBags[BagName].UInvProperties);
								State.variables.UInvBags[BagName].UInvDefaultBagType = BagType;
								State.variables.UInvBags[BagName].UInvProperties.UInvVariableType = Value;
							}
						} else {
							if (!UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
								State.variables.UInvBags[BagName].UInvProperties = {};
							}
							State.variables.UInvBags[BagName].UInvProperties[BagPropertyName] = Value;
							if (BagType !== "-") {
								Props = UInv.GetDefaultBagObject(BagType, true);
								if (UInv.isProperty(Props, BagPropertyName) && !UInv.isProperty(Props, "UInvVariableType")) {
									if (Props[BagPropertyName] === State.variables.UInvBags[BagName].UInvProperties[BagPropertyName]) {
										delete State.variables.UInvBags[BagName].UInvProperties[BagPropertyName];
										if (Object.keys(State.variables.UInvBags[BagName].UInvProperties).length === 0) {
											delete State.variables.UInvBags[BagName].UInvProperties;
										}
									}
								}
							}
						}
						return true;  // Success
					} else {
						UInv.Error('Error: SetBagPropertyValue failed.  Value not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SetBagPropertyValue cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i = 0, Result = true;
					for (i = 0; i < BagName.length; i++) {
						Result = UInv.SetBagPropertyValue(BagName[i], BagPropertyName, Value);
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: SetBagPropertyValue failed.  Invalid bag name in array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to SetBagPropertyValue is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to SetBagPropertyValue is not a string.');  // Error
			return false;
		}
	},

	// GetBagPropertyObject: Returns object of all properties/values a bag has or "null" on error.
	GetBagPropertyObject : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Props = UInv.GetBagPropertyArray(BagName), Result = {}, i = 0;
				for (i = 0; i < Props.length; i++) {
					Result[Props[i]] = UInv.GetBagPropertyValue(BagName, Props[i]);
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetBagPropertyObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetBagPropertyObject is not a string.');  // Error
			return null;
		}
	},

	// SetBagsDefaultType: Changes bag's default type.  Returns true on success, false on error.
	SetBagsDefaultType : function (BagName, DefaultBagType) {
		if (UInv.isString(BagName) && UInv.isString(DefaultBagType)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if ((!UInv.GetDefaultBagObject(DefaultBagType)) || (DefaultBagType === "-")) {
					UInv.SetCurrentBagName(BagName);
					var Props = UInv.GetBagPropertyObject(BagName), DefProps = {};
					if (DefaultBagType !== "-") {
						var Keys = Object.keys(DefProps), i = 0;
						DefProps = UInv.GetDefaultBagObject(DefaultBagType, true);
						if (!UInv.isProperty(DefProps, "UInvVariableType")) {
							for (i = 0; i < Keys.length; i++) {
								if (UInv.isProperty(Props, Keys[i])) {
									if (Props[Keys[i]] === DefProps[Keys[i]]) {
										delete Props[Keys[i]];  // delete default properties
									}
								}
							}
						}
					}
					if ((BagName !== DefaultBagType) || (UInv.isProperty(DefProps, "UInvVariableType"))) {
						State.variables.UInvBags[BagName].UInvDefaultBagType = DefaultBagType;
					}
					if ((BagName === DefaultBagType) && (UInv.isProperty(State.variables.UInvBags[BagName], "UInvDefaultBagType")) && (!UInv.isProperty(DefProps, "UInvVariableType"))) {
						delete State.variables.UInvBags[BagName].UInvDefaultBagType;
					}
					delete State.variables.UInvBags[BagName].UInvProperties;
					State.variables.UInvBags[BagName].UInvProperties = Props;
					if (UInv.isProperty(DefProps, "UInvVariableType")) {
						State.variables.UInvBags[BagName].UInvProperties.UInvVariableType = DefProps.UInvVariableType;
					}
					if (Object.keys(State.variables.UInvBags[BagName].UInvProperties).length === 0) {
						delete State.variables.UInvBags[BagName].UInvProperties;
					}
					return true;  // Success
				} else {
					UInv.Error('Error: SetBagsDefaultType failed.  "' + DefaultBagType + '" is not a valid default bag type.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: SetBagsDefaultType cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to SetBagsDefaultType is not a string.');  // Error
			return false;
		}
	},

	// BagPropertyCount: Returns the number of BagName's properties, or "null" if there was an error.
	BagPropertyCount : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				return UInv.GetBagPropertyArray(BagName).length;  // Success
			} else {
				UInv.Error('Error: BagPropertyCount cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagPropertyCount is not a string.');  // Error
			return null;
		}
	},

	// GetBagsArrayByProperty: Returns an array of BagNames that have property BagPropertyName.
	GetBagsArrayByProperty : function (BagPropertyName, BagNameArray) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isUndefined(BagNameArray)) {
				BagNameArray = UInv.GetBagsArray();
			}
			if (UInv.isArrayOfStrings(BagNameArray)) {
				if (UInv.BagExists(BagNameArray)) {
					var i = 0, Result = [];
					for (i = 0; i < BagNameArray.length; i++) {
						if (UInv.BagHasProperty(BagNameArray[i], BagPropertyName)) {
							Result.push(BagNameArray[i]);
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: GetBagsArrayByProperty failed.  Invalid bag name within BagNameArray.');  // Error
					return null;
				}
			} else if (BagNameArray.length === 0) {
				return [];  // Success
			} else {
				UInv.Error('Error: BagNameArray passed to GetBagsArrayByProperty is not an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagsArrayByProperty is not a string.');  // Error
			return null;
		}
	},

	// GetBagByProperty: Returns a random BagName that has property BagPropertyName.
	GetBagByProperty : function (BagPropertyName) {
		if (UInv.isString(BagPropertyName)) {
				var Bags = UInv.GetBagsArrayByProperty(BagPropertyName);
				if (Bags.length > 0) {
					var Rnd = random(Bags.length - 1);
					UInv.SetCurrentBagName(Bags[Rnd]);
					return Bags[Rnd];  // Success
				} else {
					return "";  // Success
				}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagByProperty is not a string.');  // Error
			return null;
		}
	},

	// CopyBagProperty: Copies a bag property from one bag to another, overwriting the destination if that property is already there.
	CopyBagProperty : function (SourceBagName, DestinationBagName, BagPropertyName) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			SourceBagName = UInv.FixBagName(SourceBagName);
			if (UInv.BagExists(SourceBagName)) {
				if (UInv.BagExists(DestinationBagName)) {
					if (UInv.isString(BagPropertyName)) {
						if (UInv.BagHasProperty(SourceBagName, BagPropertyName)) {
							return UInv.SetBagPropertyValue(DestinationBagName, BagPropertyName, UInv.GetBagPropertyValue(SourceBagName, BagPropertyName));
						} else {
							UInv.Error('Error: CopyBagProperty failed. Bag "' + SourceBagName + '" does not have property "' + BagPropertyName + '".');  // Error
							return false;
						}
					} else if (UInv.isArrayOfStrings(BagPropertyName)) {
						var Result = true, i = 0;
						for (i = 0; i < BagPropertyName.length; i++) {
							if (!UInv.CopyBagProperty(SourceBagName, DestinationBagName, BagPropertyName[i])) {
								Result = false;  // Error
							}
						}
						return Result;  // Success or Error
					} else {
						UInv.Error('Error: CopyBagProperty failed.  BagPropertyName is not a string or an array of strings.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: CopyBagProperty cannot find bag "' + DestinationBagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: CopyBagProperty cannot find bag "' + SourceBagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to CopyBagProperty is not a string.');  // Error
			return false;
		}
	},

	// GetBagsArrayWherePropertyEquals: Returns an array of all BagNames where BagPropertyName's value === Value, returns [] if none found, or "null" on error.
	GetBagsArrayWherePropertyEquals : function (BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				var Bags = UInv.GetBagsArrayByProperty(BagPropertyName), i = 0, Result = [];
				for (i = 0; i < Bags.length; i++) {
					if (UInv.valuesAreEqual(UInv.GetBagPropertyValue(Bags[i], BagPropertyName), Value)) {
						Result.push(Bags[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetBagsArrayWherePropertyEquals failed.  Value parameter was undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagsArrayWherePropertyEquals is not a string.');  // Error
			return null;
		}
	},

	// GetBagWherePropertyEquals: Returns a random BagName where BagPropertyName === Value, returns "" if not found, or "null" on error.  Sets that bag as the current bag.
	GetBagWherePropertyEquals : function (BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				var Bags = UInv.GetBagsArrayWherePropertyEquals(BagPropertyName, Value);
				if (Bags.length > 0) {
					var Rnd = random(Bags.length - 1);
					UInv.SetCurrentBagName(Bags[Rnd]);
					return Bags[Rnd];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetBagWherePropertyEquals failed.  Value parameter was undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagWherePropertyEquals is not a string.');  // Error
			return null;
		}
	},

	// GetBagsArrayWherePropertyGreaterThan: Returns an array of all BagNames where BagPropertyName > Value, returns [] if none found, or "null" on error.
	GetBagsArrayWherePropertyGreaterThan : function (BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				var Bags = UInv.GetBagsArrayByProperty(BagPropertyName), i = 0, Result = [];
				for (i = 0; i < Bags.length; i++) {
					if (UInv.GetBagPropertyValue(Bags[i], BagPropertyName) > Value) {
						Result.push(Bags[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetBagsArrayWherePropertyGreaterThan failed.  Value parameter was undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagsArrayWherePropertyGreaterThan is not a string.');  // Error
			return null;
		}
	},

	// GetBagWherePropertyGreaterThan: Returns a random BagName where BagPropertyName > Value, returns "" if not found, or "null" on error.  Sets that bag as the current bag.
	GetBagWherePropertyGreaterThan : function (BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				var Bags = UInv.GetBagsArrayWherePropertyGreaterThan(BagPropertyName, Value);
				if (Bags.length > 0) {
					var Rnd = random(Bags.length - 1);
					UInv.SetCurrentBagName(Bags[Rnd]);
					return Bags[Rnd];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetBagWherePropertyGreaterThan failed.  Value parameter was undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagWherePropertyGreaterThan is not a string.');  // Error
			return null;
		}
	},

	// GetBagsArrayWherePropertyLessThan: Returns an array of all BagNames where BagPropertyName < Value, returns [] if none found, or "null" on error.
	GetBagsArrayWherePropertyLessThan : function (BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				var Bags = UInv.GetBagsArrayByProperty(BagPropertyName), i = 0, Result = [];
				for (i = 0; i < Bags.length; i++) {
					if (UInv.GetBagPropertyValue(Bags[i], BagPropertyName) < Value) {
						Result.push(Bags[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetBagsArrayWherePropertyLessThan failed.  Value parameter was undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagsArrayWherePropertyLessThan is not a string.');  // Error
			return null;
		}
	},

	// GetBagWherePropertyLessThan: Returns a random BagName where BagPropertyName < Value, returns "" if not found, or "null" on error.  Sets that bag as the current bag.
	GetBagWherePropertyLessThan : function (BagPropertyName, Value) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				var Bags = UInv.GetBagsArrayWherePropertyLessThan(BagPropertyName, Value);
				if (Bags.length > 0) {
					var Rnd = random(Bags.length - 1);
					UInv.SetCurrentBagName(Bags[Rnd]);
					return Bags[Rnd];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetBagWherePropertyLessThan failed.  Value parameter was undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagWherePropertyLessThan is not a string.');  // Error
			return null;
		}
	},

	// GetHighestBagPropertyValue: Returns the BagName with the highest value on BagPropertyName (bags without BagPropertyName are ignored),
	//                             randomly picks one of the highest if multiple bags are tied for highest, "" if none found, or "null" on error.
	GetHighestBagPropertyValue : function (BagPropertyName, BagNameArray) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isUndefined(BagNameArray)) {
				BagNameArray = UInv.GetBagsArray();
			}
			if (UInv.isArrayOfStrings(BagNameArray)) {
				var Bags = UInv.GetBagsArrayByProperty(BagPropertyName, BagNameArray);
				// var HiVal = Bags.map(o => o[BagPropertyName]).reduce((a, b) => Math.max(a, b));
				// return Bags.filter(o => o[BagPropertyName] === HiVal).random();
				if (Bags.length > 0) {
					var HiBags = [ Bags[0] ], HiVal = UInv.GetBagPropertyValue(Bags[0]);
					if (Bags.length > 1) {
						var i, Value = 0;
						for (i = 1; i < Bags.length; i++) {
							Value = UInv.GetBagPropertyValue(Bags[i]);
							if (Value > HiVal) {
								HiVal = Value;
								HiBags = [ Bags[i] ];
							} else if (Value === HiVal) {
								HiBags.push(Bags[i]);
							}
						}
					}
					return HiBags[random(HiBags.length - 1)];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetHighestBagPropertyValue failed.  BagNameArray is not an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetHighestBagPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// GetLowestBagPropertyValue: Returns the BagName with the lowest value on BagPropertyName (bags without BagPropertyName are ignored),
	//                            randomly picks one of the lowest if multiple bags are tied for lowest, "" if none found, or "null" on error.
	GetLowestBagPropertyValue : function (BagPropertyName, BagNameArray) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isUndefined(BagNameArray)) {
				BagNameArray = UInv.GetBagsArray();
			}
			if (UInv.isArrayOfStrings(BagNameArray)) {
				var Bags = UInv.GetBagsArrayByProperty(BagPropertyName, BagNameArray);
				if (Bags.length > 0) {
					var LoBags = [ Bags[0] ], LoVal = UInv.GetBagPropertyValue(Bags[0]);
					if (Bags.length > 1) {
						var i, Value = 0;
						for (i = 1; i < Bags.length; i++) {
							Value = UInv.GetBagPropertyValue(Bags[i]);
							if (Value < LoVal) {
								LoVal = Value;
								LoBags = [ Bags[i] ];
							} else if (Value === LoVal) {
								LoBags.push(Bags[i]);
							}
						}
					}
					return LoBags[random(LoBags.length - 1)];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetLowestBagPropertyValue failed.  Invalid type passed as BagNameArray property.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetLowestBagPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// AddToBagPropertyValue: Add an amount to a property's value (returns true), create that property if it doesn't exist (returns false), or return "null" if there was an error.
	AddToBagPropertyValue : function (BagName, BagPropertyName, Amount) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (!UInv.isUndefined(Amount)) {
					if (UInv.isString(Amount)) {
						if (UInv.isNumber(parseInt(Amount))) {
							Amount = parseInt(Amount);
						}
					}
					if (UInv.isNumber(Amount)) {
						if (UInv.BagHasProperty(BagName, BagPropertyName)) {
							if (UInv.isNumber(UInv.GetBagPropertyValue(BagName, BagPropertyName))) {
								UInv.SetBagPropertyValue(BagName, BagPropertyName, UInv.GetBagPropertyValue(BagName, BagPropertyName) + Amount);
								return true;  // Success
							} else {
								UInv.Error('Error: AddToBagPropertyValue failed.  Property must be a number.');  // Error
								return null;
							}
						} else {
							UInv.SetBagPropertyValue(BagName, BagPropertyName, Amount);
							return false;  // Success
						}
					} else {
						UInv.Error('Error: AddToBagPropertyValue failed.  Amount must be a number.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: AddToBagPropertyValue failed.  Value not defined.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: AddToBagPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to AddToBagPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// DeleteBagProperty: Deletes bag property BagPropertyName.  Returns true if successful, otherwise false.
	DeleteBagProperty : function (BagName, BagPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					var Type = UInv.GetBagsDefaultType(BagName);
					if (Type !== "-") {
						var Props = UInv.GetDefaultBagObject(Type, true);
						if (UInv.isProperty(Props, BagPropertyName) && (!UInv.isProperty(Props, "UInvVariableType"))) {  // if the property to be deleted is a default property, change default type and load other properties
							var i = 0, Keys = Object.keys(Props);
							State.variables.UInvBags[BagName].UInvDefaultBagType = "-";
							for (i = 0; i < Keys.length; i++) {
								if (!UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, Keys[i])) {
									State.variables.UInvBags[BagName].UInvProperties[Keys[i]] = Props[Keys[i]];
								}
							}
						}
					}
					delete State.variables.UInvBags[BagName].UInvProperties[BagPropertyName];
					if (Object.keys(State.variables.UInvBags[BagName].UInvProperties).length === 0) {
						delete State.variables.UInvBags[BagName].UInvProperties;
					}
				}
				return true;  // Success
			} else {
				UInv.Error('Error: DeleteBagProperty cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to DeleteBagProperty is not a string.');  // Error
			return false;
		}
	},

	// CopyAllItemsToBag: Copies all items from source to destination.
	CopyAllItemsToBag : function (SourceBagName, DestinationBagName) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (SourceBagName !== DestinationBagName) {
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						var i = 0, Ret, Result = [];
						var Items = UInv.GetItemsArray(SourceBagName);  // *** OOO function call
						UInv.SetCurrentBagName(DestinationBagName);
						if (Items.length > 0) {
							for (i = 0; i < Items.length; i++) {
								Ret = UInv.CopyItem(SourceBagName, DestinationBagName, Items[i]);  // *** OOO function call
								if (Ret === false) {
									Result = false;
								} else if (!UInv.isBoolean(Result)) {
									Result.push(Ret);
								}
							}
							UInv.SetBagTouched(DestinationBagName); // *** OOO function call
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: CopyAllItemsToBag cannot find bag "' + DestinationBagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: CopyAllItemsToBag cannot find bag "' + SourceBagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: CopyAllItemsToBag failed.  SourceBagName and DestinationBagName cannot be the same.  Value = "' + SourceBagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to CopyAllItemsToBag is not a string.');  // Error
			return false;
		}
	},

	// MoveAllItemsToBag: Moves all items from source to destination.
	MoveAllItemsToBag : function (SourceBagName, DestinationBagName) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (SourceBagName !== DestinationBagName) {
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						var Result = true;
						Result = UInv.CopyAllItemsToBag(SourceBagName, DestinationBagName);
						if (Result) {
							UInv.EmptyBag(SourceBagName);
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: MoveAllItemsToBag cannot find bag "' + DestinationBagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: MoveAllItemsToBag cannot find bag "' + SourceBagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: MoveAllItemsToBag failed.  SourceBagName and DestinationBagName cannot be the same.  Value = "' + SourceBagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to MoveAllItemsToBag is not a string.');  // Error
			return false;
		}
	},

	// MergeBags: Moves all items from source to destination and deletes source.
	MergeBags : function (SourceBagName, DestinationBagName) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (SourceBagName !== DestinationBagName) {
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						var Result = true;
						Result = UInv.MoveAllItemsToBag(SourceBagName, DestinationBagName);
						if (Result) {
							UInv.DeleteBag(SourceBagName);
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: MergeBags cannot find bag "' + DestinationBagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: MergeBags cannot find bag "' + SourceBagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: MergeBags failed.  SourceBagName and DestinationBagName cannot be the same.  Value = "' + SourceBagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to MergeBags is not a string.');  // Error
			return false;
		}
	},

	// BagHasItem: Returns the number of ItemName items in BagName, or "null" if there is an error.
	BagHasItem : function (BagName, ItemName) {
		if (UInv.isString(ItemName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				ItemName = UInv.FixItemName(ItemName);  // *** OOO function call
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.isProperty(State.variables.UInvBags[BagName], ItemName)) {
						UInv.SetCurrentItemName(ItemName);  // *** OOO function call
						if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvQuantity")) {
							return State.variables.UInvBags[BagName][ItemName].UInvQuantity;  // Success
						} else {
							return 1;  // Success - Default value of UInvQuantity = 1
						}
					} else {
						return 0;  // Not found
					}
				} else {
					UInv.Error('Error: BagHasItem cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i = 0, Result = true;
					for (i = 0; i < BagName.length; i++) {
						Result = UInv.BagHasItem(BagName[i], ItemName);
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: BagHasItem failed.  Invalid bag name in BagName array.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagName passed to BagHasItem is not a string or an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: ItemName passed to BagHasItem is not a string.');  // Error
			return null;
		}
	},

	// GetBagsArrayWithItem: Returns an array of BagNames that have item (limited to items in BagArray bags if BagArray is passed to function), or "null" if there is an error.
	GetBagsArrayWithItem : function (ItemName, BagArray) {
		if (UInv.isString(ItemName)) {
			if (UInv.isUndefined(BagArray)) {
				BagArray = UInv.GetBagsArray();
			} else if (UInv.isArrayOfStrings(BagArray)) {
				if (!UInv.BagExists(BagArray)) {
					UInv.Error('Error: GetBagsArrayWithItem failed.  Invalid bag name in BagArray.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagArray passed to GetBagsArrayWithItem is not an array of strings.');  // Error
				return null;
			}
			var Result = [], i = 0;
			if (BagArray.length > 0) {
				for (i = 0; i < BagArray.length; i++) {
					if (UInv.BagHasItem(BagArray[i], ItemName)) {  // *** OOO function call
						Result.push(BagArray[i]);
					}
				}
			}
			return Result;  // Success
		} else {
			UInv.Error('Error: ItemName passed to GetBagsArrayWithItem is not a string.');  // Error
			return null;
		}
	},

	// GetBagObject: Returns the full bag object (including UInvDefaultBagType) or "null" on error.
	GetBagObject : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Result = {}, i = 0, Props = UInv.GetBagPropertyArray(BagName);
				UInv.SetCurrentBagName(BagName);
				Result = clone(State.variables.UInvBags[BagName]);
				Result.UInvDefaultBagType = UInv.GetBagsDefaultType(BagName);
				if (Props.length > 0) {
					if (!UInv.isProperty(Result, "UInvProperties")) {
						Result.UInvProperties = {};
					}
					for (i = 0; i < Props.length; i++) {
						Result.UInvProperties[Props[i]] = UInv.GetBagPropertyValue(BagName, Props[i]);
					}
				}
				Props = UInv.GetItemsArray(BagName);
				if (Props.length > 0) {
					for (i = 0; i < Props.length; i++) {
						Result[Props[i]] = UInv.GetItemObject(BagName, Props[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetBagObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetBagObject is not a string.');  // Error
			return null;
		}
	},

	// BagMatchesDefault: Returns whether bag exactly matches its default version, or "null" on error.  Returns false if the bag does not have a default object.
	BagMatchesDefault : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Typ = UInv.GetBagsDefaultType(BagName);
				if ((Typ === "-") || (Typ === null)) {
					return false;  // Success
				}
				var BagOb = UInv.GetBagObject(BagName);
				var TmpBag = UInv.GetUniqueBagName();
				UInv.AddBag(TmpBag, Typ);
				if (UInv.WasTouched(BagName)) {  // *** OOO function call
					UInv.SetBagTouched(TmpBag); // *** OOO function call
				}
				var TmpBagOb = UInv.GetBagObject(TmpBag);
				var Result = UInv.objectsAreEqual(BagOb, TmpBagOb);
				UInv.DeleteBag(TmpBag);
				return Result;  // Success
			} else {
				UInv.Error('Error: BagMatchesDefault cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to BagMatchesDefault is not a string.');  // Error
			return null;
		}
	},

	// ArrayHasAllBagProperties: Reurns whether all of the bag's properties are listed in BagPropertyNameArray, false if the bag has no properties, or null on error.
	ArrayHasAllBagProperties : function (BagName, BagPropertyNameArray) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isArrayOfStrings(BagPropertyNameArray)) {
					UInv.SetCurrentBagName(BagName);
					var Props = UInv.GetBagPropertyArray(BagName);
					if (Props.length > 0) {
						var i;
						for (i = 0; i < Props.length; i++) {
							if (!BagPropertyNameArray.includes(Props[i])) {
								return false;  // Success
							}
						}
						return true;  // Success
					}
					return false;  // Success
				} else {
					UInv.Error('Error: ArrayHasAllBagProperties failed.  BagPropertyNameArray is not an array of strings.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ArrayHasAllBagProperties cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to ArrayHasAllBagProperties is not a string.');  // Error
			return null;
		}
	},

	//GetBagArrayWithAllProperties: Returns an array of all bags which have all of the properties in BagPropertyNameArray
	//                              (per the [[ArrayHasAllBagProperties]] function), not including bags with no properties, on error return null.
	GetBagArrayWithAllProperties : function (BagPropertyNameArray) {
		if (UInv.isArrayOfStrings(BagPropertyNameArray)) {
			var Bags = UInv.GetBagsArray(), Return = [], i;
			for (i = 0; i < Bags.length; i++) {
				if (UInv.ArrayHasAllBagProperties(Bags[i], BagPropertyNameArray)) {
					Return.push(Bags[i]);
				}
			}
			return Return;  // Success
		} else {
			UInv.Error('Error: ArrayHasAllBagProperties failed.  BagPropertyNameArray is not an array of strings.');  // Error
			return null;
		}
	},

	// WasTouched: Returns whether the number of items in the bag have changed since creation or since Untouched was last set, or "null" if there is an error.
	WasTouched : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvTouched")) {
					return State.variables.UInvBags[BagName].UInvTouched;  // Success
				} else {
					return false;  // Success
				}
			} else {
				UInv.Error('Error: WasTouched cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to WasTouched is not a string.');  // Error
			return null;
		}
	},

	// SetBagTouched: Sets bag(s) to touched and returns true, or false if there is an error.
	SetBagTouched : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var ev = {};
				ev.bagName = BagName;
				ev.lockCount = State.variables.UInvUpdatesAreLocked;
				var Ret = UInv.CallEventHandler("bag", "Touched", ev);  // bag Touched event (MouseDown)
				if (Ret.ignoreTouch !== true) {
					State.variables.UInvBags[BagName].UInvTouched = true;
				}
				if (!UInv.UpdatesAreLocked()) {
					UInv.UpdateDisplay();
				}
				return true;  // Success
			} else {
				UInv.Error('Error: SetBagTouched cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var i;
				UInv.IncrementUpdateLock();
				for (i = 0; i < BagName.length; i++) {
					UInv.SetBagTouched(BagName[i]);
				}
				UInv.DecrementUpdateLock();
				if (!UInv.UpdatesAreLocked()) {
					UInv.UpdateDisplay();
				}
				return true;  // Success
			} else {
				UInv.Error('Error: SetBagTouched failed.  Invalid bag name in array.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagName passed to SetBagTouched is not a string or array of strings.');  // Error
			return false;
		}
	},

	// SetBagUntouched: Sets bag(s) to untouched and returns true, or false if there is an error.
	SetBagUntouched : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvTouched")) {
					delete State.variables.UInvBags[BagName].UInvTouched;
				}
				return true;  // Success
			} else {
				UInv.Error('Error: SetBagUntouched cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var i;
				for (i = 0; i < BagName.length; i++) {
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvTouched")) {
						delete State.variables.UInvBags[BagName].UInvTouched;
					}
				}
				return true;  // Success
			} else {
				UInv.Error('Error: SetBagUntouched failed.  Invalid bag name in array.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagName passed to SetBagUntouched is not a string or array of strings.');  // Error
			return false;
		}
	},

	// GetUniqueBagName: Generates and returns an unused bag name ("bagXXHEXX").
	GetUniqueBagName : function () {
		var BagName = "bag" + UInv.getRandomHexString();
		while (UInv.BagExists(BagName)) {
			BagName = "bag" + UInv.getRandomHexString();
		}
		UInv.SetCurrentBagName(BagName);
		return BagName;
	},


	// UInv Item Functions:
	// ====================

	// GetDefaultItemObject: Returns an Item object that matches ItemType.
	// Returns "undefined" for unknown bag types, or "null" on error.  Both "undefined" and "null" have "falsey" values.
	GetDefaultItemObject : function (ItemType) {
		if (UInv.isString(ItemType)) {
			if ((ItemType === "") || (ItemType === "-")) {
				// Do not throw an error here.  This case is used to trigger a "null" return if the ItemType === "" or "-".
				return undefined;  // Silent failure
			}
			var IName = ItemType.toLowerCase();
			if (!["uinvtouched", "uinvproperties", "uinvdefaultbagtype"].includes(IName)) {
				var Item = UInv.ItemData(IName);
				if (UInv.isUndefined(Item)) {
					return undefined;  // Silent failure
				}
				if (UInv.isProperty(Item, "UInvQuantity")) {  // Item should not have a UInvQuantity property.
					delete Item.UInvQuantity;
				}
				if (UInv.isProperty(Item, "UInvDefaultItemType")) {  // Item should not have a UInvDefaultItemType property.
					delete Item.UInvDefaultItemType;
				}
				return Item;  // Success
			} else {
				UInv.Error('Error: GetDefaultItemObject failed.  ItemType cannot be "' + ItemType + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: ItemType passed to GetDefaultItemObject is not a string.');  // Error
			return null;
		}
	},

	// GetCurrentItemName: Gets the current item name if there is one, otherwise returns "".
	GetCurrentItemName : function () {
		if (UInv.isProperty(State.variables, "UInvCurrentItemName")) {
			return State.variables.UInvCurrentItemName;
		} else {
			return "";
		}
	},

	// FixItemName: Returns $UInvCurrentItemName if ItemName === "", null if there was an error, otherwise returns ItemName.
	FixItemName : function (ItemName) {
		if (UInv.isString(ItemName)) {
			if ((ItemName === "") && UInv.isString(UInv.GetCurrentItemName())) {
				return UInv.GetCurrentItemName();
			}
			return ItemName;  // Success
		} else {
			UInv.Error('Error: ItemName passed to FixItemName is not a string.');  // Error
			return null;
		}
	},

	// RemoveItemObjectsDefaultProperties: Removes all default properties from Obj.  Returns true on success or false on error.
	// !!!IMPORTANT!!! - The object passed to this function is directly modified by this function.  Do not pass objects that shouldn't be modified!!!
	RemoveItemObjectsDefaultProperties : function (Obj, DefaultItemName) {
		if (UInv.isGenericObject(Obj)) {
			if (UInv.isString(DefaultItemName)) {
				var DefItem = UInv.GetDefaultItemObject(DefaultItemName);
				if (DefItem) {  // delete all properties that are equal to GetDefaultItemObject properties of NewItemName
					var DefKeys = Object.keys(DefItem), i = 0;
					if ((DefKeys.length > 0) && (!DefKeys.includes("UInvVariableType"))) {
						for (i = 0; i < DefKeys.length; i++) {
							if (UInv.isProperty(Obj, DefKeys[i])) {
								if (UInv.valuesAreEqual(Obj[DefKeys[i]], DefItem[DefKeys[i]])) {
									delete Obj[DefKeys[i]];  // Matches default value of GetDefaultItemObject version
								}
							}
						}
					}
				}
				return true;  // Success
			} else {
				UInv.Error('Error: DefaultItemName passed to RemoveItemObjectsDefaultProperties is not a string.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: RemoveItemObjectsDefaultProperties failed.  Obj is not a generic object.');  // Error
			return false;
		}
	},

	// SetCurrentItemName: Sets the UInvCurrentItemName to ItemName for use as the default ItemName parameter in UInv functions.  Returns true on success or false on error.
	SetCurrentItemName : function (ItemName) {
		if (UInv.isString(ItemName)) {
			if (ItemName === "") {
				if (UInv.isProperty(State.variables, "UInvCurrentItemName")) {
					delete State.variables.UInvCurrentItemName;
				}
			} else {
				State.variables.UInvCurrentItemName = ItemName;
			}
			return true;  // Success
		} else {
			UInv.Error('Error: Name passed to SetCurrentItemName is not a string.');  // Error
			return false;
		}
	},
	
	// GetDefaultItemPropertyValue: Returns the default value for item's property, undefined if property or item isn't found, or "null" if there is an error.
	GetDefaultItemPropertyValue : function (DefaultItemName, ItemPropertyName) {
		if (UInv.isString(DefaultItemName) && UInv.isString(ItemPropertyName)) {
			var Item = UInv.GetDefaultItemObject(DefaultItemName);
			if (Item) {
				return Item[ItemPropertyName];  // Success
			} else {
				return undefined;  // Success - item not found
			}
		} else {
			UInv.Error('Error: Name passed to GetDefaultItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArray: Returns an array of item names in BagName (not including UInvTouched, UInvProperties, and UInvDefaultBagType), or "null" if there was an error.
	GetItemsArray : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = Object.keys(State.variables.UInvBags[BagName]);
				Items.delete("UInvTouched", "UInvProperties", "UInvDefaultBagType");
				UInv.SetCurrentBagName(BagName);
				return Items;  // Success
			} else {
				UInv.Error('Error: GetItemsArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemsArray is not a string.');  // Error
			return null;
		}
	},

	// GetItemsAndQuantitiesObject: Returns an object of items and quantities in a bag in the format { item1: quantity1, item2: quantity2, etc... }, or "null" on error.
	GetItemsAndQuantitiesObject : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName), Result = {}, i = 0;
				for (i = 0; i < Items.length; i++) {
					Result[Items[i]] = UInv.BagHasItem(BagName, Items[i]);
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsAndQuantitiesObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemsAndQuantitiesObject is not a string.');  // Error
			return null;
		}
	},

	// GetItemCount: Returns the number of unique items in a bag (not including UInvTouched, UInvProperties, and UInvDefaultBagType).
	GetItemCount : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				return UInv.GetItemsArray(BagName).length;  // Success
			} else {
				UInv.Error('Error: GetItemCount cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var i = 0, Items = [];
				for (i = 0; i < BagName.length; i++) {
					Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
				}
				return Items.length;  // Success
			} else {
				UInv.Error('Error: GetItemCount failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCount is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetItemCountFull: Returns the total number of items in a bag, adding up the UInvQuantity value of each item (not including UInvTouched, UInvProperties, and UInvDefaultBagType).
	GetItemCountFull : function (BagName) {
		var Tot = 0, i = 0;
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName);
				if (Items.length > 0) {
					for (i = 0; i < Items.length; i++) {
						Tot += UInv.BagHasItem(BagName, Items[i]);
					}
				}
				return Tot;  // Success
			} else {
				UInv.Error('Error: GetItemCountFull cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				for (i = 0; i < BagName.length; i++) {
					Tot += UInv.GetItemCountFull(BagName[i]);
				}
				return Tot;  // Success
			} else {
				UInv.Error('Error: GetItemCountFull failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCountFull is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetItemsDefaultType: Returns item's default item type if it has one, "-" if it doesn't, or "null" on error.
	GetItemsDefaultType : function (BagName, ItemName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					var ItemType = ItemName;
					if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvDefaultItemType")) {
						ItemType = State.variables.UInvBags[BagName][ItemName].UInvDefaultItemType;
					} else if (!UInv.GetDefaultItemObject(ItemType)) {
						ItemType = "-";
					}
					return ItemType;
				} else {
					UInv.Error('Error: GetItemsDefaultType cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsDefaultType cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsDefaultType is not a string.');  // Error
			return null;
		}
	},

	// GetItemCountByDefaultType: Returns the number of unique item types in each bag (ignores Quantity), items with a default item type of "-" are each counted as separate unique item types.
	//                            Returns "null" on error.
	GetItemCountByDefaultType : function (BagName, IgnoreTypes) {
		var Tot = 0, i = 0;
		if (UInv.isString(BagName)) {
			if (UInv.isUndefined(IgnoreTypes)) {
				IgnoreTypes = [];
			}
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), Typ;
				if (Items.length > 0) {
					if (!UInv.isArray(IgnoreTypes)) {
						IgnoreTypes = [];
					}
					for (i = 0; i < Items.length; i++) {
						Typ = UInv.GetItemsDefaultType(BagName, Items[i]);
						if (Typ === "-") {
							++Tot;
						} else if (IgnoreTypes.indexOf(Typ) < 0) {
							IgnoreTypes.push(Typ);
							++Tot;
						}
					}
				}
				return Tot;  // Success
			} else {
				UInv.Error('Error: GetItemCountByDefaultType cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var Ign = [];
				for (i = 0; i < BagName.length; i++) {
					Tot += UInv.GetItemCountByDefaultType(BagName[i], Ign);
				}
				return Tot;  // Success
			} else {
				UInv.Error('Error: GetItemCountByDefaultType failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCountByDefaultType is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetItemCountFullByDefaultType: Returns the total number of items in bag(s) (Quantity included) of that DefaultItemType.  Returns "null" on error.
	GetItemCountFullByDefaultType : function (BagName, DefaultItemType) {
		if (UInv.isString(DefaultItemType)) {
			var Tot = 0, i = 0;
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName);
					if (Items.length > 0) {
						for (i = 0; i < Items.length; i++) {
							if (UInv.GetItemsDefaultType(BagName, Items[i]) === DefaultItemType) {
								Tot += UInv.BagHasItem(BagName, Items[i]);
							}
						}
					}
					return Tot;  // Success
				} else {
					UInv.Error('Error: GetItemCountFullByDefaultType cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					for (i = 0; i < BagName.length; i++) {
						Tot += UInv.GetItemCountFullByDefaultType(BagName[i], DefaultItemType);
					}
					return Tot;  // Success
				} else {
					UInv.Error('Error: GetItemCountFullByDefaultType failed.  Invalid bag name in array.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagName passed to GetItemCountFullByDefaultType is not a string or an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: DefaultItemType passed to GetItemCountFullByDefaultType is not a string.');  // Error
			return null;
		}
	},

	// GetItemObject: Returns an item object from BagName that matches ItemName, or "null" if there was an error.  UInvQuantity will try to be the first property on the object.
	GetItemObject : function (BagName, ItemName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					var ItemObj = UInv.GetDefaultItemObject(UInv.GetItemsDefaultType(BagName, ItemName));
					if (ItemObj && (!UInv.isProperty(ItemObj, "UInvVariableType"))) {
						var TempObj = clone(State.variables.UInvBags[BagName][ItemName]);
						if (UInv.isProperty(TempObj, "UInvQuantity")) {
							delete TempObj.UInvQuantity;
						}
						ItemObj = Object.assign({ "UInvQuantity" : UInv.BagHasItem(BagName, ItemName) }, ItemObj, TempObj);
					} else {
						ItemObj = clone(State.variables.UInvBags[BagName][ItemName]);
						if (UInv.isProperty(ItemObj, "UInvQuantity")) {
							delete ItemObj.UInvQuantity;
						}
						ItemObj = Object.assign({ "UInvQuantity" : UInv.BagHasItem(BagName, ItemName) }, ItemObj);
					}
					UInv.SetCurrentBagName(BagName);
					UInv.SetCurrentItemName(ItemName);
					return ItemObj;  // Success
				} else {
					UInv.Error('Error: GetItemObject cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemObject is not a string.');  // Error
			return null;
		}
	},

	// GetItemPropertiesArray: Returns an array of ItemName's item property names from BagName, or "null" if there was an error.  UInvQuantity will be item 0 in array.
	GetItemPropertiesArray : function (BagName, ItemName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					var ItemList = UInv.GetItemObject(BagName, ItemName), Result = [];
					UInv.SetCurrentItemName(ItemName);
					UInv.SetCurrentBagName(BagName);
					if (ItemList === null) {
						return null;  // Error
					} else {
						Result.push("UInvQuantity");
						delete ItemList.UInvQuantity;
						Result = Result.concat(Object.keys(ItemList));
						return Result;  // Success
					}
				} else {
					UInv.Error('Error: GetItemPropertiesArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemPropertiesArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemPropertiesArray is not a string.');  // Error
			return null;
		}
	},

	// ItemHasProperty: Returns whether ItemName in BagName has ItemPropertyName, or "null" if there was an error.
	ItemHasProperty : function (BagName, ItemName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					UInv.SetCurrentItemName(ItemName);
					UInv.SetCurrentBagName(BagName);
					return UInv.GetItemPropertiesArray(BagName, ItemName).includes(ItemPropertyName);  // Success
					// You can't check State.variables.UInvBags[BagName][ItemName][ItemPropertyName] because that will not be defined for items using a DefaultItem's default property value.
				} else {
					UInv.Error('Error: ItemHasProperty cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ItemHasProperty cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to ItemHasProperty is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayByProperty: Returns an array of all ItemNames in a bag that have property ItemPropertyName.
	GetItemsArrayByProperty : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName), Result = [], i;
				UInv.SetCurrentBagName(BagName);
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayByProperty cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayByProperty is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayByType: Returns an array of all ItemNames in a bag that are of type ItemType.
	GetItemsArrayByType : function (BagName, ItemType) {
		if (UInv.isString(BagName) && UInv.isString(ItemType)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName), Result = [], i;
				UInv.SetCurrentBagName(BagName);
				for (i = 0; i < Items.length; i++) {
					if (UInv.GetItemPropertyValue(BagName, Items[i], "UInvDefaultItemType") == ItemType) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayByType cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayByType is not a string.');  // Error
			return null;
		}
	},

	// GetItemPropertyValue: Returns the value of ItemPropertyName if it exists, otherwise return "null" on error.
	GetItemPropertyValue : function (BagName, ItemName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					UInv.SetCurrentItemName(ItemName);
					UInv.SetCurrentBagName(BagName);
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						return UInv.GetItemObject(BagName, ItemName)[ItemPropertyName];  // Success
					} else {
						UInv.Error('Error: GetItemPropertyValue cannot find property "' + ItemPropertyName + '" in item "' + ItemName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWherePropertyEquals: Returns an array of all items in a bag where ItemPropertyName === Value.
	GetItemsArrayWherePropertyEquals : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), Result = [], i = 0;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.valuesAreEqual(UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName), Value)) {
							Result.push(Items[i]);
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: GetItemsArrayWherePropertyEquals cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsArrayWherePropertyEquals failed.  Value parameter is undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWherePropertyEquals is not a string.');  // Error
			return null;
		}
	},

	// GetItemCountWherePropertyEquals: Gets the numer of items in a bag which have a particular property value.
	GetItemCountWherePropertyEquals : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				return UInv.GetItemsArrayWherePropertyEquals(BagName, ItemPropertyName, Value).length;  // Success
			} else {
				UInv.Error('Error: GetItemCountWherePropertyEquals cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var i = 0, Items = [];
				for (i = 0; i < BagName.length; i++) {
					Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
				}
				return Items.length;  // Success
			} else {
				UInv.Error('Error: GetItemCountWherePropertyEquals failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCountWherePropertyEquals is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetItemsArrayWherePropertyGreaterThan: Returns an array of all items in a bag where ItemPropertyName > Value.
	GetItemsArrayWherePropertyGreaterThan : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), Result = [], i = 0;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName) > Value) {
							Result.push(Items[i]);
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: GetItemsArrayWherePropertyGreaterThan cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsArrayWherePropertyGreaterThan failed.  Value parameter is undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWherePropertyGreaterThan is not a string.');  // Error
			return null;
		}
	},

	// GetItemCountWherePropertyGreaterThan: Gets the numer of items in a bag which have a particular property value greater than Value.
	GetItemCountWherePropertyGreaterThan : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				return UInv.GetItemsArrayWherePropertyGreaterThan(BagName, ItemPropertyName, Value).length;  // Success
			} else {
				UInv.Error('Error: GetItemCountWherePropertyGreaterThan cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var i = 0, Items = [];
				for (i = 0; i < BagName.length; i++) {
					Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
				}
				return Items.length;  // Success
			} else {
				UInv.Error('Error: GetItemCountWherePropertyGreaterThan failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCountWherePropertyGreaterThan is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetItemsArrayWherePropertyLessThan: Returns an array of all items in a bag where ItemPropertyName > Value.
	GetItemsArrayWherePropertyLessThan : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), Result = [], i = 0;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName) < Value) {
							Result.push(Items[i]);
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: GetItemsArrayWherePropertyLessThan cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsArrayWherePropertyLessThan failed.  Value parameter is undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWherePropertyLessThan is not a string.');  // Error
			return null;
		}
	},

	// GetItemCountWherePropertyLessThan: Gets the numer of items in a bag which have a particular property value less than Value.
	GetItemCountWherePropertyLessThan : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				return UInv.GetItemsArrayWherePropertyLessThan(BagName, ItemPropertyName, Value).length;  // Success
			} else {
				UInv.Error('Error: GetItemCountWherePropertyLessThan cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var i = 0, Items = [];
				for (i = 0; i < BagName.length; i++) {
					Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
				}
				return Items.length;  // Success
			} else {
				UInv.Error('Error: GetItemCountWherePropertyLessThan failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCountWherePropertyLessThan is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetUniqueItemPropertyValuesArray: Returns an array of unique (string, number, and boolean) values for all items with ItemPropertyName in all bags in BagName/Array, or "null" on error.
	//                                   (use GetUniqueItemTagsArray instead for properties which have array values)
	GetUniqueItemPropertyValuesArray : function (BagName, ItemPropertyName) {
		var i = 0, Items = [];
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Result = [], Value;
				Items = UInv.GetItemsArray(BagName);
				if (Items.length > 0) {
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							Value = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
							if (UInv.isString(Value) || UInv.isNumber(Value) || UInv.isBoolean(Value)) {
								Result.push(Value);
							}
						}
					}
				}
				return [].concatUnique(Result);  // Success
			} else {
				UInv.Error('Error: GetUniqueItemPropertyValuesArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				for (i = 0; i < BagName.length; i++) {
					Items = Items.concatUnique(UInv.GetUniqueItemPropertyValuesArray(BagName[i], ItemPropertyName));
				}
				return Items;  // Success
			} else {
				UInv.Error('Error: GetUniqueItemPropertyValuesArray failed.  Invalid bag name in array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetUniqueItemPropertyValuesArray is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// BagHasAllItems: Returns t/f based on whether the bag has all of the items in the bag, or "null" if there is an error.
	BagHasAllItems : function (BagName, ItemArray) {
		var i = 0;
		if (UInv.isString(BagName)) {
			if (UInv.isArrayOfStrings(ItemArray)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < ItemArray.length; i++) {
						if (!UInv.BagHasItem(BagName, ItemArray[0])) {
							return false;  // Success - could not find an item
						}
					}
					return true;  //Success - all items found
				} else {
					UInv.Error('Error: BagHasAllItems cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ItemArray passed to BagHasAllItems is not an array of strings.');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var Result = true;
				for (i = 0; i < BagName.length; i++) {
					Result = UInv.BagHasAllItems(BagName[i], ItemArray);
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: BagHasAllItems failed.  Invalid bag name in BagName array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to BagHasAllItems is not a string or array of strings.');  // Error
			return null;
		}
	},

	// BagHasAnyItem: Returns t/f based on whether the bag has any of the items in the bag, or "null" if there is an error.
	BagHasAnyItem : function (BagName, ItemArray) {
		var i = 0;
		if (UInv.isString(BagName)) {
			if (UInv.isArrayOfStrings(ItemArray)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < ItemArray.length; i++) {
						if (UInv.BagHasItem(BagName, ItemArray[0])) {
							return true;  // Success - found an item in the bag
						}
					}
					return false;  //Success - no items found
				} else {
					UInv.Error('Error: BagHasAnyItem cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ItemArray passed to BagHasAnyItem is not an array of strings.');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.BagExists(BagName)) {
				var Result = true;
				for (i = 0; i < BagName.length; i++) {
					Result = UInv.BagHasAnyItem(BagName[i], ItemArray);
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: BagHasAnyItem failed.  Invalid bag name in BagName array.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to BagHasAnyItem is not a string or array of strings.');  // Error
			return null;
		}
	},

	// ItemExists: Returns true if ItemName is in GetDefaultItem or any bags, otherwise returns false, or "null" on error.
	ItemExists : function (ItemName) {
		if (UInv.isString(ItemName)) {
			if (UInv.GetDefaultItemObject(ItemName)) {
				return true;  // Success
			}
			var Bags = UInv.GetBagsArray(), i = 0;
			if (Bags.length > 0) {
				for (i = 0; i < Bags.length; i++) {
					if (UInv.BagHasItem(Bags[i], ItemName)) {
						return true;  // Success
					}
				}
			}
			return false;  // Success - not found
		} else {
			UInv.Error('Error: ItemName passed to ItemExists is not a string.');  // Error
			return null;
		}
	},

	// GetUniqueItemName: Generates and returns an unused item name ("itemXXHEXX").
	GetUniqueItemName : function () {
		var ItemName = "item" + UInv.getRandomHexString();
		while (UInv.ItemExists(ItemName)) {
			ItemName = "item" + UInv.getRandomHexString();
		}
		return ItemName;
	},

	// DeleteItem: Deletes Quantity items from bag, returns true if successful.  Quantity is an integer, defaults to deleting all items, has a floor of 0, and a max of the item's UInvQuantity.
	//             Does not throw an error if ItemName doesn't exist, since that item is basically already deleted.
	DeleteItem : function (BagName, ItemName, Quantity) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isString(ItemName)) {
					ItemName = UInv.FixItemName(ItemName);
					if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
						if (UInv.BagHasItem(BagName, ItemName)) {
							UInv.SetCurrentBagName(BagName);
							var Amt = UInv.BagHasItem(BagName, ItemName);
							if (Amt > 0) {
								if (UInv.isString(Quantity)) {
									if (UInv.isNumber(parseInt(Quantity))) {
										Quantity = parseInt(Quantity);
									}
								}
								if (UInv.isNumber(Quantity)) {
									Quantity = Math.round(Quantity);
									if (Quantity < 0) {
										Quantity = 0;
									}
									if (Quantity > Amt) {
										Quantity = Amt;
									}
								} else {
									Quantity = Amt;
								}
								if (Quantity > 0) {
									if (Quantity === Amt) {
										/*  Decided not to have variable items rename themselves on deletion
										var ItemType = UInv.GetItemsDefaultType(BagName, ItemName);
										if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvVariableType") && (ItemType === ItemName)) {
											delete State.variables.UInvBags[BagName][ItemName];  // delete item
											var ItemList = UInv.GetItemsArrayWherePropertyEquals(BagName, "UInvDefaultItemType", ItemType);
											if (ItemList.length > 0) {
												State.variables.UInvBags[BagName][ItemName] = clone(State.variables.UInvBags[BagName][ItemList[0]]);
												delete State.variables.UInvBags[BagName][ItemList[0]];
												UInv.SetBagTouched(BagName);
												return ItemName;  // Success - returns the item name in cases where a variable item gets renamed to be the new "root" item
											}
										} else {
										*/
											delete State.variables.UInvBags[BagName][ItemName];  // delete item
										// }
										UInv.SetBagTouched(BagName);
									} else {
										UInv.SetItemQuantity(BagName, ItemName, UInv.BagHasItem(BagName, ItemName) - Quantity);
										UInv.SetBagTouched(BagName);
										UInv.SetCurrentItemName(ItemName);
									}
								} else {
									UInv.SetCurrentItemName(ItemName);
								}
								return true;  // Success
							} else {
								return true;  // Success - item already didn't exist
							}
						} else {
							UInv.Error('Error: Item "' + ItemName + '" passed to DeleteItem do not exist in bag "' + BagName + '".');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: DeleteItem failed.  ItemName cannot be "' + ItemName + '".');  // Error
						return false;
					}
				} else if (UInv.isArrayOfStrings(ItemName)) {
					if (UInv.BagHasAllItems(BagName, ItemName)) {
						var Result = true, i = 0;
						if (ItemName.length > 0) {
							for (i = 0; i < ItemName.length; i++) {
								if (!UInv.DeleteItem(BagName, ItemName[i], Quantity)) {
									Result = false;
								}
							}
						}
						return Result;  // Success or Error
					} else {
						UInv.Error('Error: Some items names passed to DeleteItem do not exist in bag "' + BagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: DeleteItem failed.  ItemName is not a string or an array of strings.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: DeleteItem cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagName passed to DeleteItem is not a string.');  // Error
			return false;
		}
	},

	// SetItemsDefaultType: Changes an item's default item type.  Returns true on success.
	SetItemsDefaultType : function (BagName, ItemName, DefaultItemType) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(DefaultItemType)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					var DefObj = UInv.GetDefaultItemObject(DefaultItemType);
					if (DefObj || (DefaultItemType === "-")) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						var Item = UInv.GetItemObject(BagName, ItemName);
						if (DefaultItemType !== "-") {
							UInv.RemoveItemObjectsDefaultProperties(Item, DefaultItemType);
						}
						var VarType = UInv.isProperty(DefObj, "UInvVariableType");
						if (VarType) {
							Item.UInvVariableType = DefObj.UInvVariableType;
						}
						if ((ItemName !== DefaultItemType) || VarType) {
							Item.UInvDefaultItemType = DefaultItemType;
						}
						if ((ItemName === DefaultItemType) && (UInv.isProperty(Item, "UInvDefaultItemType")) && !VarType) {
							delete Item.UInvDefaultItemType;
						}
						delete State.variables.UInvBags[BagName][ItemName];
						State.variables.UInvBags[BagName][ItemName] = Item;
						return true;  // Success
					} else {
						UInv.Error('Error: SetItemsDefaultType failed.  "' + DefaultItemType + '" is not a valid default item type.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SetItemsDefaultType cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: SetItemsDefaultType cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to SetItemsDefaultType is not a string.');  // Error
			return false;
		}
	},

	// SetItemPropertyValue: Set the value of a property on an object (returns true), add that property if it doesn't exist (returns false), or return "null" if there was an error.
	//                       Removes property if the value matches the value of the GetDefaultItemObject version of this item.  Does not touch bag unless UInvQuantity changed.
	SetItemPropertyValue : function (BagName, ItemName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						if (!UInv.isUndefined(Value)) {
							if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
								var ItemType = UInv.GetItemsDefaultType(BagName, ItemName);
								if (ItemPropertyName === "UInvQuantity") {
									if (UInv.isNumber(Value)) {
										if ((Value > 0) && (Value === Math.round(Value))) {
											if (UInv.BagHasItem(BagName, ItemName) !== Value) {
												if (Value === 1) {
													delete State.variables.UInvBags[BagName][ItemName].UInvQuantity;  // Defaults to 1
												} else {
													State.variables.UInvBags[BagName][ItemName].UInvQuantity = Value;
												}
												UInv.SetBagTouched(BagName);
											}
											return true;  // Success
										} else {
											UInv.Error('Error: SetItemPropertyValue failed.  UInvQuantity must be a positive integer.');  // Error
											return null;
										}
									} else {
										UInv.Error('Error: SetItemPropertyValue failed.  UInvQuantity must be a positive integer.');  // Error
										return null;
									}
								} else if (ItemPropertyName === "UInvDefaultItemType") {
									if ((!UInv.GetDefaultItemObject(Value)) && (Value !== "-")) {
										UInv.Error('Error: SetItemPropertyValue failed.  When setting the UInvDefaultItemType property, the Value parameter must be a valid default item type.');  // Error
										return null;
									} else {
										return UInv.SetItemsDefaultType(BagName, ItemName, Value);
									}
								} else if (ItemPropertyName === "UInvVariableType") {
									if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvVariableType") || (ItemType === "-")) {
										State.variables.UInvBags[BagName][ItemName].UInvVariableType = Value;
									} else {  // set item's default properties
										State.variables.UInvBags[BagName][ItemName] = Object.assign({}, UInv.GetDefaultItemObject(ItemType, true), State.variables.UInvBags[BagName][ItemName]);
										State.variables.UInvBags[BagName].UInvDefaultItemType = ItemType;
										State.variables.UInvBags[BagName][ItemName].UInvVariableType = Value;
									}
									return true;  // Success
								} else {
									var Item = UInv.GetDefaultItemObject(ItemType);
									if (Item) {
										if ((UInv.isProperty(Item, ItemPropertyName)) && (!UInv.isProperty(Item, "UInvVariableType"))) {
											if (UInv.valuesAreEqual(Value, Item[ItemPropertyName])) {  // Matches default value of GetDefaultItemObject version
												if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], ItemPropertyName)) {
													delete State.variables.UInvBags[BagName][ItemName][ItemPropertyName];
												}
												return true;  // Success
											}
										}
									}
									State.variables.UInvBags[BagName][ItemName][ItemPropertyName] = Value;
									return true;  // Success
								}
							} else {
								State.variables.UInvBags[BagName][ItemName][ItemPropertyName] = Value;
								return false;  // Success
							}
						} else {
							UInv.Error('Error: SetItemPropertyValue failed.  Value not defined.');  // Error
							return null;
						}
					} else {
						UInv.Error('Error: SetItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: SetItemPropertyValue cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: SetItemPropertyValue failed.  ItemName cannot be "' + ItemName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to SetItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// SetItemQuantity: Sets an item's quantity, returns true if successful.  Quantity must be a positive integer.
	SetItemQuantity : function (BagName, ItemName, Quantity) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.isString(Quantity)) {
						if (UInv.isNumber(parseInt(Quantity))) {
							Quantity = parseInt(Quantity);
						}
					}
					if (UInv.isNumber(Quantity)) {
						if ((Quantity === Math.round(Quantity)) && (Quantity > 0)) {
							if (UInv.BagHasItem(BagName, ItemName) !== Quantity) {
								UInv.SetItemPropertyValue(BagName, ItemName, "UInvQuantity", Quantity);
								UInv.SetBagTouched(BagName);
							}
							return true;  // Success
						} else {
							UInv.Error('Error: Quantity passed to SetItemQuantity must be a positive integer.');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: Quantity passed to SetItemQuantity is not a number.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SetItemQuantity cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: SetItemQuantity cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to SetItemQuantity is not a string.');  // Error
			return false;
		}
	},

	// AddToItemPropertyValue: Add an amount to a property's value (returns true), create that property if it doesn't exist (returns false), or return "null" if there was an error.
	//                         Does not touch bag unless UInvQuantity changed.  Deletes item if UInvQuantity would become <= 0.
	AddToItemPropertyValue : function (BagName, ItemName, ItemPropertyName, Amount) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						if (!UInv.isUndefined(Amount)) {
							if (UInv.isString(Amount)) {
								if (UInv.isNumber(parseInt(Amount))) {
									Amount = parseInt(Amount);
								}
							}
							if (UInv.isNumber(Amount)) {
								if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
									if (UInv.isNumber(UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName))) {
										if (ItemPropertyName === "UInvQuantity") {
											if (Amount === Math.round(Amount)) {
												var Value = UInv.BagHasItem(BagName, ItemName);
												if (Value + Amount > 0) {
													UInv.SetItemQuantity(BagName, ItemName, Value + Amount);
												} else {
													UInv.DeleteItem(BagName, ItemName);
												}
												return true;  // Success
											} else {
												UInv.Error('Error: AddToItemPropertyValue failed.  Value added to UInvQuantity must be an integer.');  // Error
												return null;
											}
										} else if (ItemPropertyName === "UInvDefaultItemType") {
											UInv.Error('Error: AddToItemPropertyValue cannot be used to modify the value of UInvDefaultItemType.  Use SetItemsDefaultType instead.');  // Error
											return null;
										} else {
											UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName) + Amount);
											return true;
										}
									} else {
										UInv.Error('Error: AddToItemPropertyValue failed.  ItemPropertyName "' + ItemPropertyName + '" is not a number.');  // Error
										return null;
									}
								} else {
									UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Amount);
									return false;  // Success
								}
							} else {
								UInv.Error('Error: AddToItemPropertyValue failed.  Amount is not a number.');  // Error
								return null;
							}
						} else {
							UInv.Error('Error: AddToItemPropertyValue failed.  Amount not defined.');  // Error
							return null;
						}
					} else {
						UInv.Error('Error: AddToItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: AddToItemPropertyValue cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: AddToItemPropertyValue failed.  ItemName cannot be "' + ItemName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to AddToItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// CopyItem: Copy item from source to destination, changing the UInvQuantity if that parameter is used.  Use UInvMergeItemMethod to determine what happens on item collision.
	CopyItem : function (SourceBagName, DestinationBagName, ItemName, Quantity, NewItemName) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			ItemName = UInv.FixItemName(ItemName);
			if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (UInv.BagHasItem(SourceBagName, ItemName)) {
							if ((!UInv.isUndefined(NewItemName)) || (SourceBagName !== DestinationBagName)) {
								if (UInv.isUndefined(NewItemName)) {
									NewItemName = ItemName;
								}
								if (UInv.isString(NewItemName)) {
									if (UInv.isString(Quantity)) {
										if (UInv.isNumber(parseInt(Quantity))) {
											Quantity = parseInt(Quantity);
										}
									}
									if (UInv.isNumber(Quantity)) {
										Quantity = Math.round(Quantity);
										if (Quantity < 1) {
											Quantity = 1;
										}
									} else {
										Quantity = UInv.BagHasItem(SourceBagName, ItemName);
									}
									var Item = UInv.GetItemObject(SourceBagName, ItemName), ItemType = UInv.GetItemsDefaultType(SourceBagName, ItemName);
									Item.UInvQuantity = Quantity;
									if (UInv.BagHasItem(DestinationBagName, NewItemName)) {
										var Result = NewItemName, SrcKeys = {}, i = 0, TempItem = UInv.GetItemObject(DestinationBagName, NewItemName);
										TempItem.UInvQuantity = Item.UInvQuantity;
										if (UInv.isProperty(Item, "UInvCell")) {  // Handle items in tables
											TempItem.UInvCell = Item.UInvCell;
										}
										if ((UInv.isProperty(TempItem, "UInvCell")) && (!UInv.isProperty(Item, "UInvCell"))) {  // Handle items in tables
											delete TempItem.UInvCell;
										}
										if (UInv.objectsAreEqual(Item, TempItem)) {  // Allow merge if objects match (not including UInvQuantity and UInvCell).
											UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Quantity);
											UInv.SetCurrentItemName(NewItemName);
											UInv.SetCurrentBagName(DestinationBagName);
											UInv.SetBagTouched(DestinationBagName);
											return Result;  // Success
										}
										var MergeMethod = State.variables.UInvMergeItemMethod;
										if (UInv.isProperty(Item, "UInvVariableType")) {
											// Search items in DestinationBagName that are of the same type to see if any are equal, and if any are, then just increment the first one's quantity.
											var ItemList = UInv.GetItemsArrayWherePropertyEquals(DestinationBagName, "UInvDefaultItemType", ItemType);
											if (ItemList.length > 0) {
												for (i = 0; i < ItemList.length; i++) {
													TempItem = UInv.GetItemObject(DestinationBagName, ItemList[i]);
													TempItem.UInvQuantity = Item.UInvQuantity;
													if (UInv.isProperty(Item, "UInvCell")) {  // Handle items in tables
														TempItem.UInvCell = Item.UInvCell;
													}
													if ((UInv.isProperty(TempItem, "UInvCell")) && (!UInv.isProperty(Item, "UInvCell"))) {  // Handle items in tables
														delete TempItem.UInvCell;
													}
													if (UInv.objectsAreEqual(Item, TempItem)) {  // Allow merge if objects match (not including UInvQuantity and UInvCell).
														UInv.AddToItemPropertyValue(DestinationBagName, ItemList[i], "UInvQuantity", Quantity);
														UInv.SetCurrentItemName(ItemList[i]);
														UInv.SetCurrentBagName(DestinationBagName);
														UInv.SetBagTouched(DestinationBagName);
														return ItemList[i];  // Success
													}
												}
											}
											// Variable items use UInv.MERGE_RENAME_SOURCE_ITEMNAME instead of the current merge method.
											MergeMethod = UInv.MERGE_RENAME_SOURCE_ITEMNAME;
										}
										switch (MergeMethod) {
											case UInv.MERGE_USE_ONLY_SOURCE_PROPERTIES:  // Delete the destination's properties, replace with the source's properties and values, and increment the quantity.
												Item.UInvQuantity += UInv.BagHasItem(DestinationBagName, NewItemName);
												if (!UInv.isProperty(Item, "UInvVariableType")) {
													if (ItemType !== NewItemName) {
														if ((ItemType === "-") && (!UInv.GetDefaultItemObject(NewItemName))) {
															if (UInv.isProperty(Item, "UInvDefaultItemType")) {
																delete Item.UInvDefaultItemType;
															}
														} else {
															Item.UInvDefaultItemType = ItemType;
														}
													} else if (UInv.isProperty(Item, "UInvDefaultItemType")) {
														delete Item.UInvDefaultItemType;
													}
												}
												UInv.DeleteItem(DestinationBagName, NewItemName);  // remove destination item
												UInv.RemoveItemObjectsDefaultProperties(Item, ItemType);
												State.variables.UInvBags[DestinationBagName][NewItemName] = Item;  // overwrite destination item
												UInv.SetCurrentItemName(NewItemName);
												UInv.SetCurrentBagName(DestinationBagName);
												UInv.SetBagTouched(DestinationBagName);
												break;  // Success
											case UInv.MERGE_PREFER_DESTINATION_PROPERTIES:  // Keep the properties, values, and type in the destination, add any properties and values the source had but the destination didn't, and increment the quantity.
												UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Quantity);
												if (UInv.isProperty(Item, "UInvDefaultItemType")) {
													delete Item.UInvDefaultItemType;
												}
												SrcKeys = Object.keys(Item);
												if (SrcKeys.length > 0) {
													for (i = 0; i < SrcKeys.length; i++) {
														if (UInv.ItemHasProperty(DestinationBagName, NewItemName, SrcKeys[i])) {
															delete Item[SrcKeys[i]];  // Delete properties from source item that are already on destination item.
														}
													}
												}
												if (Object.keys(Item).length > 0) {  // Add remaining keys to destination item
													Object.assign(State.variables.UInvBags[DestinationBagName][NewItemName], Item);
												}
												UInv.SetCurrentItemName(NewItemName);
												UInv.SetCurrentBagName(DestinationBagName);
												UInv.SetBagTouched(DestinationBagName);
												break;  // Success
											case UInv.MERGE_PREFER_SOURCE_PROPERTIES:  // Keep the properties and values in the source, add any properties and values the destination had but source the didn't, and increment the quantity.
												Item.UInvQuantity += UInv.BagHasItem(DestinationBagName, NewItemName);
												if (!UInv.isProperty(Item, "UInvVariableType")) {
													if (ItemType !== NewItemName) {
														if ((ItemType === "-") && (!UInv.GetDefaultItemObject(NewItemName))) {
															if (UInv.isProperty(Item, "UInvDefaultItemType")) {
																delete Item.UInvDefaultItemType;
															}
														} else {
															Item.UInvDefaultItemType = ItemType;
														}
													} else if (UInv.isProperty(Item, "UInvDefaultItemType")) {
														delete Item.UInvDefaultItemType;
													}
												}
												// Delete properties from destination item that are already on source item.  This needs to be done due to default properties.
												SrcKeys = Object.keys(Item);
												for (i = 0; i < SrcKeys.length; i++) {
													if (UInv.ItemHasProperty(DestinationBagName, NewItemName, SrcKeys[i])) {
														if (UInv.isProperty(State.variables.UInvBags[DestinationBagName][NewItemName], SrcKeys[i])) {
															delete State.variables.UInvBags[DestinationBagName][NewItemName][SrcKeys[i]];
														}
													}
												}
												UInv.RemoveItemObjectsDefaultProperties(Item, ItemType);
												if (Object.keys(Item).length > 0) {
													Object.assign(State.variables.UInvBags[DestinationBagName][NewItemName], Item);  // Add keys to destination item, overwriting existing properties
												}
												UInv.SetCurrentItemName(NewItemName);
												UInv.SetCurrentBagName(DestinationBagName);
												UInv.SetBagTouched(DestinationBagName);
												break;  // Success
											case UInv.MERGE_RENAME_SOURCE_ITEMNAME:  // Rename the source's unique identifier so that it's stored separately in the destination bag.
												NewItemName = UInv.GetUniqueItemName();
												Item.UInvDefaultItemType = ItemType;
												UInv.RemoveItemObjectsDefaultProperties(Item, ItemType);
												if (Item.UInvQuantity === 1) {
													delete Item.UInvQuantity;
												}
												State.variables.UInvBags[DestinationBagName][NewItemName] = Item;  // copy item 
												UInv.SetCurrentItemName(NewItemName);
												UInv.SetCurrentBagName(DestinationBagName);
												UInv.SetBagTouched(DestinationBagName);
												Result = NewItemName;
												break;  // Success
											case UInv.MERGE_FAIL_WITH_ERROR:  // Fail with an error.
												UInv.Error('Error: CopyItem failed.  Item "' + NewItemName + '" already exists in destination bag "' + DestinationBagName + '".');  // Error
												Result = false;
												break;
											default:  //UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES - Ignore source properties, just increment destination quantity. (default)
												UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Quantity);
												UInv.SetCurrentItemName(NewItemName);
												UInv.SetCurrentBagName(DestinationBagName);
												UInv.SetBagTouched(DestinationBagName);
												// Success
										}
										return Result;  // Success or Error
									} else {  // Destination slot is empty, so copy item there.
										if (ItemType !== "-") {
											UInv.RemoveItemObjectsDefaultProperties(Item, ItemType);
										}
										if (!UInv.isProperty(Item, "UInvVariableType")) {
											if (NewItemName !== ItemType) {
												if ((ItemType === "-") && (!UInv.GetDefaultItemObject(NewItemName))) {
													if (UInv.isProperty(Item, "UInvDefaultItemType")) {
														delete Item.UInvDefaultItemType;
													}
												} else {
													Item.UInvDefaultItemType = ItemType;
												}
											}
											if ((NewItemName === ItemType) && (UInv.isProperty(Item, "UInvDefaultItemType"))) {
												delete Item.UInvDefaultItemType;
											}
										}
										if (Item.UInvQuantity === 1) {
											delete Item.UInvQuantity;
										}
										State.variables.UInvBags[DestinationBagName][NewItemName] = Item;
										UInv.SetCurrentItemName(NewItemName);
										UInv.SetCurrentBagName(DestinationBagName);
										UInv.SetBagTouched(DestinationBagName);
										return NewItemName;  // Success
									}
								} else {
									UInv.Error('Error: NewItemName passed to CopyItem is not a string.');  // Error
									return false;
								}
							} else {
								UInv.Error('Error: CopyItem failed.  SourceBagName cannot equal DestinationBagName if NewItemName is not set.');  // Error
								return false;
							}
						} else {
							UInv.Error('Error: CopyItem cannot find item "' + ItemName + '" in bag "' + SourceBagName + '".');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: CopyItem cannot find destination bag "' + DestinationBagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: CopyItem cannot find source bag "' + SourceBagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: CopyItem failed.  ItemName cannot be "' + ItemName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to CopyItem is not a string.');  // Error
			return false;
		}
	},

	// AddItem: Adds item to bag, returns true if successful.  Quantity defaults to 1.  Use UInvMergeItemMethod to determine what happens on item collision.
	AddItem : function (BagName, ItemType, Quantity, NewItemName) {
		if (UInv.isString(BagName) && UInv.isString(ItemType)) {
			BagName = UInv.FixBagName(BagName);
			ItemType = UInv.FixItemName(ItemType);
			if (UInv.isUndefined(Quantity)) {
				Quantity = 1;
			} else {
				if (UInv.isString(Quantity)) {
					if (UInv.isNumber(parseInt(Quantity))) {
						Quantity = parseInt(Quantity);
					}
				}
				if (!UInv.isNumber(Quantity)) {
					UInv.Error('Error: Quantity passed to AddItem is not a number.');  // Error
					return false;
				}
			}
			if ((Quantity !== Math.round(Quantity)) || (Quantity <= 0)) {
				UInv.Error('Error: Quantity passed to AddItem must be a positive integer.');  // Error
				return false;
			}
			if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemType)) {
				if (UInv.BagExists(BagName)) {
					var Item = UInv.GetDefaultItemObject(ItemType), TempBag = "", Result;
					if (ItemType === "-") {
						Item = {};
						Item.UInvDefaultItemType = "-";
					}
					if (Item) {
						Item.UInvQuantity = Quantity;
						if (UInv.isProperty(Item, "UInvVariableType")) {
							Item.UInvDefaultItemType = ItemType;
							NewItemName = ItemType;
						}
						if (!UInv.isUndefined(NewItemName)) {
							if (UInv.isString(NewItemName)) {
								if (!["", "-", "UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(NewItemName)) {
									TempBag = UInv.GetUniqueBagName();
									UInv.CreateBag(TempBag);
									if (Item.UInvQuantity === 1) {
										delete Item.UInvQuantity;
									}
									State.variables.UInvBags[TempBag][ItemType] = Item;
									UInv.IncrementUpdateLock();  // Prevent unnecessary updates.
									Result = UInv.CopyItem(TempBag, BagName, ItemType, Quantity, NewItemName);  // deals with possible item collisions
									UInv.DecrementUpdateLock();
									UInv.DeleteBag(TempBag);
									UInv.SetCurrentBagName(BagName);
									UInv.SetCurrentItemName(NewItemName);
									return Result;  // Success
								} else {
									UInv.Error('Error: AddItem failed.  NewItemName cannot be "' + NewItemName + '".');  // Error
									return false;
								}
							} else {
								UInv.Error('Error: AddItem failed.  NewItemName is not a string.');  // Error
								return false;
							}
						} else {
							if (ItemType !== "-") {
								if (UInv.BagHasItem(BagName, ItemType)) {
									TempBag = UInv.GetUniqueBagName();
									UInv.CreateBag(TempBag);
									State.variables.UInvBags[TempBag][ItemType] = {};
									if (Quantity > 1) {
										State.variables.UInvBags[TempBag][ItemType].UInvQuantity = Quantity;
									}
									UInv.IncrementUpdateLock();  // Prevent unnecessary updates.
									Result = UInv.CopyItem(TempBag, BagName, ItemType);  // deals with possible item collisions
									UInv.DeleteItem(TempBag, ItemType);
									UInv.DecrementUpdateLock();
									UInv.DeleteBag(TempBag);
									UInv.SetCurrentBagName(BagName);
									UInv.SetCurrentItemName(ItemType);
									return Result;  // Success
								} else {
									State.variables.UInvBags[BagName][ItemType] = {};
									if (Quantity > 1) {
										State.variables.UInvBags[BagName][ItemType].UInvQuantity = Quantity;
									}
									UInv.SetBagTouched(BagName);
									return ItemType;  // Success
								}
							} else {
								UInv.Error('Error: AddItem failed.  New item cannot be named "-".');  // Error
								return false;
							}
						}
					} else {
						UInv.Error('Error: AddItem failed.  ItemType "' + ItemType + '" is not a default item.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: AddItem cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: AddItem failed.  ItemType cannot be "' + ItemType + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to AddItem is not a string.');  // Error
			return false;
		}
	},

	// AddItems: Adds an array of items to bag (Quantity = 1 for each), returns true if all items are successfully added.
	AddItems : function (BagName, ItemArray) {
		if (UInv.isString(BagName)) {
			if (UInv.isArrayOfStrings(ItemArray)) {
				var Result = [], Ret, i;
				BagName = UInv.FixBagName(BagName);
				if (ItemArray.length > 0) {
					for (i = 0; i < ItemArray.length; i++) {
						Ret = UInv.AddItem(BagName, ItemArray[i]);
						if (Ret === false) {
							Result = false;
						} else if (!UInv.isBoolean(Result)) {
							Result.push(Ret);
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: ItemArray passed to AddItems is empty.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ItemArray passed to AddItems is not an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to AddItems is not a string.');  // Error
			return null;
		}
	},

	// CreateItem: Creates an item without linking to a DefaultItemObject.  Quantity defaults to 1.
	CreateItem : function (BagName, ItemName, Quantity) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (!["", "-", "UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.Error('Error: CreateItem failed.  Item "' + ItemName + '" already exists in bag "' + BagName + '".');  // Error
						return false;
					} else {
						if (UInv.isUndefined(Quantity)) {
							Quantity = 1;
						} else {
							if (UInv.isString(Quantity)) {
								if (UInv.isNumber(parseInt(Quantity))) {
									Quantity = parseInt(Quantity);
								}
							}
							if (!UInv.isNumber(Quantity)) {
								UInv.Error('Error: Quantity passed to CreateItem is not a number.');  // Error
								return false;
							}
						}
						if ((Quantity === Math.round(Quantity)) && (Quantity > 0)) {
							State.variables.UInvBags[BagName][ItemName] = {};
							if (Quantity > 1) {
								State.variables.UInvBags[BagName][ItemName].UInvQuantity = Quantity;
							}
							if (UInv.GetDefaultItemObject(ItemName)) {
								State.variables.UInvBags[BagName][ItemName].UInvDefaultItemType = "-";
							}
							UInv.SetBagTouched(BagName);
							UInv.SetCurrentBagName(BagName);
							UInv.SetCurrentItemName(ItemName);
							return true;  // Success
						} else {
							UInv.Error('Error: Quantity passed to CreateItem must be a positive integer.');  // Error
							return false;
						}
					}
				} else {
					UInv.Error('Error: CreateItem failed. Item name cannot be "' + ItemName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: CreateItem cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to CreateItem is not a string.');  // Error
			return false;
		}
	},

	// GetItemPropertyCount: Returns the number of ItemName's item properties from BagName (including UInvQuantity and UInvDefaultItemType), or "null" if there was an error.
	GetItemPropertyCount : function (BagName, ItemName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					UInv.SetCurrentItemName(ItemName);
					UInv.SetCurrentBagName(BagName);
					return Object.keys(UInv.GetItemObject(BagName, ItemName)).length;  // Success
				} else {
					UInv.Error('Error: GetItemPropertyCount cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemPropertyCount cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemPropertyCount is not a string.');  // Error
			return null;
		}
	},

	// SetItemsPropertyValues: Set the value of ItemPropertyName to Value for all items in BagName.
	SetItemsPropertyValues : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				if (Items.length > 0) {
					var i = 0;
					for (i = 0; i < Items.length; i++) {
						UInv.SetItemPropertyValue(BagName, Items[i], ItemPropertyName, Value);
					}
				}
				return true;  // Success
			} else {
				UInv.Error('Error: BagName "' + BagName + '" passed to SetItemsPropertyValues does not exist.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to SetItemsPropertyValues is not a string.');  // Error
			return null;
		}
	},

	// UpdateItemProperties: Updates and/or adds values to multiple properties on an item.
	UpdateItemProperties : function (BagName, ItemName, GenericObject) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.isGenericObject(GenericObject)) {
						var Props = Object.keys(GenericObject), ret = true;
						if (Props.length > 0) {
							var i = 0;
							for (i = 0; i < Props.length; i++) {
								if (UInv.SetItemPropertyValue(BagName, ItemName, Props[i], GenericObject[Props[i]]) === null) {
									ret = false;
								}
							}
						}
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						return ret;  // Success
					} else {
						UInv.Error('Error: GenericObject passed to UpdateItemProperties is not a generic object.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: UpdateItemProperties cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagName "' + BagName + '" passed to UpdateItemProperties does not exist.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to UpdateItemProperties is not a string.');  // Error
			return null;
		}
	},

	// ItemPropertyHasValue: Returns true if item's property ===/contains Value, false if it doesn't, otherwise return "null" on error.
	ItemPropertyHasValue : function (BagName, ItemName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					UInv.SetCurrentItemName(ItemName);
					UInv.SetCurrentBagName(BagName);
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						var Val = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
						if (typeof(Val) === typeof(Value)) {
							return UInv.valuesAreEqual(Val, Value);  // Success
						} else {
							if (UInv.isArray(Val)) {
								return Val.includes(Value);  // Success
							} else {
								return false;  // Success
							}
						}
					} else {
						UInv.Error('Error: ItemPropertyHasValue cannot find property "' + ItemPropertyName + '" in item "' + ItemName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: ItemPropertyHasValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ItemPropertyHasValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to ItemPropertyHasValue is not a string.');  // Error
			return null;
		}
	},

	// CopyItemsByProperty: Copy all items from SourceBagName to DestinationBagName that have the ItemPropertyName, or ItemPropertyName === Value if Value is passed.
	CopyItemsByProperty : function (SourceBagName, DestinationBagName, ItemPropertyName, Value) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (UInv.BagExists(SourceBagName)) {
				if (UInv.BagExists(DestinationBagName)) {
					if (SourceBagName !== DestinationBagName) {
						var Items = [], Result = [];
						if (UInv.isUndefined(Value)) {
							Items = UInv.GetItemsArrayByProperty(SourceBagName, ItemPropertyName);
						} else {
							Items = UInv.GetItemsArrayWherePropertyEquals(SourceBagName, ItemPropertyName, Value);
						}
						if (Items.length > 0) {
							var i = 0, Ret = "";
							for (i = 0; i < Items.length; i++) {
								Ret = UInv.CopyItem(SourceBagName, DestinationBagName, Items[i]);
								if (Ret === false) {
									Result = false;
								} else if (!UInv.isBoolean(Result)) {
									Result.push(Ret);
								}
							}
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: CopyItemsByProperty failed.  Source and destination bags cannot be the same.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: CopyItemsByProperty cannot find bag "' + DestinationBagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: CopyItemsByProperty cannot find bag "' + SourceBagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to CopyItemsByProperty is not a string.');  // Error
			return null;
		}
	},

	// MoveItemsByProperty: Move all items from SourceBagName to DestinationBagName that have the ItemPropertyName, or ItemPropertyName === Value if Value is passed.
	MoveItemsByProperty : function (SourceBagName, DestinationBagName, ItemPropertyName, Value) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (UInv.BagExists(SourceBagName)) {
				if (UInv.BagExists(DestinationBagName)) {
					if (SourceBagName !== DestinationBagName) {
						var Items = [], Result = true;
						if (UInv.isUndefined(Value)) {
							Items = UInv.GetItemsArrayByProperty(SourceBagName, ItemPropertyName);
						} else {
							Items = UInv.GetItemsArrayWherePropertyEquals(SourceBagName, ItemPropertyName, Value);
						}
						if (Items.length > 0) {
							var i = 0, Ret = "";
							for (i = 0; i < Items.length; i++) {
								Ret = UInv.MoveItem(SourceBagName, DestinationBagName, Items[i]);
								if (UInv.isBoolean(Ret)) {
									if (!Ret) {
										Result = false;
									}
								} else {
									if (UInv.isBoolean(Result)) {
										Result = [ Ret ];
									} else {
										Result.push(Ret);
									}
								}
							}
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: MoveItemsByProperty failed.  Source and destination bags cannot be the same.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: MoveItemsByProperty cannot find bag "' + DestinationBagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: MoveItemsByProperty cannot find bag "' + SourceBagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to MoveItemsByProperty is not a string.');  // Error
			return null;
		}
	},

	// DeleteItemsByProperty: Delete all items from BagName that have the ItemProperty, or ItemProperty === Value if Value is passed.
	DeleteItemsByProperty : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = [];
				if (UInv.isUndefined(Value)) {
					Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
				} else {
					Items = UInv.GetItemsArrayWherePropertyEquals(BagName, ItemPropertyName, Value);
				}
				return UInv.DeleteItem(BagName, Items);  // Success
			} else {
				UInv.Error('Error: DeleteItemsByProperty cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to DeleteItemsByProperty is not a string.');  // Error
			return null;
		}
	},

	// GetHighestItemPropertyValue: Returns the ItemName with the highest value of ItemPropertyName in BagName (items without ItemPropertyName are ignored),
	//                              randomly picks one of the highest if multiple items are tied for highest, "" if none found, or "null" on error.
	GetHighestItemPropertyValue : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
				if (Items.length > 0) {
					var HiItems = [ Items[0] ], HiVal = UInv.GetItemPropertyValue(BagName, Items[0], ItemPropertyName);
					if (Items.length > 1) {
						var i, Value = 0;
						for (i = 1; i < Items.length; i++) {
							Value = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
							if (Value > HiVal) {
								HiVal = Value;
								HiItems = [ Items[i] ];
							} else if (Value === HiVal) {
								HiItems.push(Items[i]);
							}
						}
					}
					UInv.SetCurrentBagName(BagName);
					return HiItems[random(HiItems.length - 1)];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetHighestItemPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetHighestItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// GetLowestItemPropertyValue: Returns the ItemName with the lowest value of ItemPropertyName in BagName (items without ItemPropertyName are ignored),
	//                             randomly picks one of the lowest if multiple items are tied for lowest, "" if none found, or "null" on error.
	GetLowestItemPropertyValue : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
				if (Items.length > 0) {
					var LoItems = [ Items[0] ], LoVal = UInv.GetItemPropertyValue(BagName, Items[0], ItemPropertyName);
					if (Items.length > 1) {
						var i, Value = 0;
						for (i = 1; i < Items.length; i++) {
							Value = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
							if (Value < LoVal) {
								LoVal = Value;
								LoItems = [ Items[i] ];
							} else if (Value === LoVal) {
								LoItems.push(Items[i]);
							}
						}
					}
					UInv.SetCurrentBagName(BagName);
					return LoItems[random(LoItems.length - 1)];  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetLowestItemPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetLowestItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// GetRandomItemPropertyValue: Returns the value of ItemPropertyName for a random item in BagName (items without ItemPropertyName are ignored), "" if none found, or "null" on error.
	GetRandomItemPropertyValue : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
				if (Items.length > 0) {
					return UInv.GetItemPropertyValue(BagName, Items[random(Items.length - 1)], ItemPropertyName);  // Success
				} else {
					return "";  // Success - Not found
				}
			} else {
				UInv.Error('Error: GetRandomItemPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetRandomItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// GetTotalItemPropertyValue: Returns the total of all items' ItemPropertyName values (multiplied by UInvQuantity) added together
	//                            (all values must be numbers; items without ItemPropertyName are treated as having a value of zero)
	GetTotalItemPropertyValue : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), i = 0, Value = 0, Result = 0;
				if (Items.length > 0) {
					for (i = 1; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							Value = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
							if (UInv.isNumber(Value)) {
								Result += (Value * UInv.BagHasItem(BagName, Items[i]));
							} else {
								UInv.Error('Error: GetTotalItemPropertyValue failed.  All values of ItemPropertyName must be numbers. ("' + Items[i] + '.' + ItemPropertyName + '" is type ' + (typeof Value)  + ')');  // Error
								return null;
							}
						}
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetTotalItemPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetTotalItemPropertyValue is not a string.');  // Error
			return null;
		}
	},

	// ItemsMatch: Returns whether all properties exist and match, except UInvQuantity and UInvDefaultItemType.  Or returns "null" on error.
	ItemsMatch : function (BagName1, ItemName1, BagName2, ItemName2) {
		if (UInv.isString(BagName1) && UInv.isString(ItemName1) && UInv.isString(BagName2) && UInv.isString(ItemName2)) {
			BagName2 = UInv.FixBagName(BagName2);
			ItemName2 = UInv.FixItemName(ItemName2);
			BagName1 = UInv.FixBagName(BagName1);
			ItemName1 = UInv.FixItemName(ItemName1);
			if (UInv.BagExists(BagName1)) {
				if (UInv.BagExists(BagName2)) {
					if (UInv.BagHasItem(BagName1, ItemName1)) {
						if (UInv.BagHasItem(BagName2, ItemName2)) {
							var Props1 = [], Props2 = [], i = 0, Value1, Value2;
							UInv.SetCurrentItemName(ItemName1);
							UInv.SetCurrentBagName(BagName1);
							Props1 = UInv.GetItemPropertiesArray(BagName1, ItemName1).sort();
							Props2 = UInv.GetItemPropertiesArray(BagName2, ItemName2).sort();
							if (UInv.arraysAreEqual(Props1, Props2)) {
								var IgnoredProperties = ["UInvQuantity", "UInvDefaultItemType", "UInvCell"];
								for (i = 0; i < Props1.length; i++) {
									Value1 = UInv.GetItemPropertyValue(BagName1, ItemName1, Props1[i]);
									Value2 = UInv.GetItemPropertyValue(BagName2, ItemName2, Props1[i]);
									if (!IgnoredProperties.includes(Props1[i])) {
										if (!UInv.valuesAreEqual(Value1, Value2)) {
											return false;  // Success
										}
									}
								}
								return true;  // Success - all items match
							} else {
								return false;  // Success
							}
						} else {
							UInv.Error('Error: GetItemPropertyValue cannot find item "' + ItemName2 + '" in bag "' + BagName2 + '".');  // Error
							return null;
						}
					} else {
						UInv.Error('Error: GetItemPropertyValue cannot find item "' + ItemName1 + '" in bag "' + BagName1 + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetItemPropertyValue cannot find bag "' + BagName2 + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemPropertyValue cannot find bag "' + BagName1 + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to ItemsMatch is not a string.');  // Error
			return null;
		}
	},

	// GetMatchingItemsArray: Returns an array of all items in SearchBag that match ItemName (per the ItemsMatch function), or null on error.
	GetMatchingItemsArray : function (BagName, ItemName, SearchBag) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.BagExists(SearchBag)) {
						var Items = UInv.GetItemsArray(SearchBag), Result = [], i;
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						for (i = 0; i < Items.length; i++) {
							if (UInv.ItemsMatch(BagName, ItemName, SearchBag, Items[i])) {
								Result.push(Items[i]);
							}
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: GetItemPropertyValue cannot find bag "' + SearchBag + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemPropertyValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to ItemsMatch is not a string.');  // Error
			return null;
		}
	},

	// DeleteItemProperty: Deletes item property ItemPropertyName.  If ItemPropertyName is not passed, then delete all properties on ItemName, except UInvQuantity, and set UInvDefaultItemType to "-".
	//                     Cannot delete UInvQuantity or UInvDefaultItemType.  Returns true if successful, otherwise false.
	DeleteItemProperty : function (BagName, ItemName, ItemPropertyName) {
		if (UInv.isString(ItemName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				ItemName = UInv.FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					var Quantity = UInv.BagHasItem(BagName, ItemName);
					if (Quantity) {
						if (UInv.isString(ItemPropertyName)) {
							UInv.SetCurrentItemName(ItemName);
							UInv.SetCurrentBagName(BagName);
							if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
								if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], ItemPropertyName)) {
									if (!["UInvQuantity", "UInvDefaultItemType"].includes(ItemPropertyName)) {
										delete State.variables.UInvBags[BagName][ItemName][ItemPropertyName];
										return true;  // Success
									} else {
										UInv.Error('Error: DeleteItemProperty cannot delete property "' + ItemPropertyName + '".  This is a protected property.');  // Error
										return false;
									}
								} else {  // change item type to "-" so it can remove default properties
									var Item = UInv.GetItemObject(BagName, ItemName);
									Item.UInvDefaultItemType = "-";
									delete Item[ItemPropertyName];
									UInv.DeleteItem(BagName, ItemName);
									State.variables.UInvBags[BagName][ItemName] = Item;
									return true;
								}
							} else {
								return true;  // Success - property already doesn't exist
							}
						} else if (UInv.isUndefined(ItemPropertyName)) {
							// Delete all properties except UInvQuantity (unless it === 1) and set UInvDefaultItemType to "-" if necessary.
							delete State.variables.UInvBags[BagName][ItemName];
							if (Quantity > 1) {
								State.variables.UInvBags[BagName][ItemName] = { "UInvQuantity" : Quantity };
							} else {
								State.variables.UInvBags[BagName][ItemName] = {};
							}
							if (UInv.GetDefaultItemObject(ItemName)) {
								State.variables.UInvBags[BagName][ItemName].UInvDefaultItemType = "-";
							}
							return true;  // Success
						} else {
							UInv.Error('Error: ItemPropertyName passed to DeleteItemProperty is not a string.');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: DeleteItemProperty cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: DeleteItemProperty cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i = 0, Result = true;
					for (i = 0; i < BagName.length; i++) {
						Result = UInv.DeleteItemProperty(BagName[i], ItemName, ItemPropertyName);  // handle errors here better?  ***
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: DeleteItemProperty failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: DeleteItemProperty cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: ItemName passed to DeleteItemProperty is not a string.');  // Error
			return false;
		}
	},

	// MoveItem: Move item from source to destination, changing UInvQuantity if that parameter is used.  Use UInvMergeItemMethod to determine what happens on item collision.
	MoveItem : function (SourceBagName, DestinationBagName, ItemName, Quantity) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			ItemName = UInv.FixItemName(ItemName);
			if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (UInv.BagHasItem(SourceBagName, ItemName)) {
							if (SourceBagName !== DestinationBagName) {
								UInv.SetCurrentItemName(ItemName);
								UInv.SetCurrentBagName(DestinationBagName);
								if (UInv.isString(Quantity)) {
									if (UInv.isNumber(parseInt(Quantity))) {
										Quantity = parseInt(Quantity);
									}
								}
								if (UInv.isNumber(Quantity)) {
									Quantity = Math.round(Quantity);
									if (Quantity < 1) {
										Quantity = 1;
									}
								} else {
									Quantity = UInv.BagHasItem(SourceBagName, ItemName);
								}
								UInv.IncrementUpdateLock();
								var Result = UInv.CopyItem(SourceBagName, DestinationBagName, ItemName, Quantity);
								if (Quantity >= UInv.BagHasItem(SourceBagName, ItemName)) {
									UInv.DeleteItem(SourceBagName, ItemName);
								} else {
									UInv.AddToItemPropertyValue(SourceBagName, ItemName, "UInvQuantity", -Quantity);
								}
								UInv.DecrementUpdateLock();
								if (!UInv.UpdatesAreLocked()) {
									UInv.UpdateDisplay();
								}
								return Result;  // Success
							} else {
								UInv.Error('Error: MoveItem failed.  SourceBagName cannot equal DestinationBagName.');  // Error
								return null;
							}
						} else {
							UInv.Error('Error: MoveItem cannot find item "' + ItemName + '" in bag "' + SourceBagName + '".');  // Error
							return null;
						}
					} else {
						UInv.Error('Error: MoveItem cannot find destination bag "' + DestinationBagName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: MoveItem cannot find source bag "' + SourceBagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: MoveItem failed.  ItemName cannot be "' + ItemName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to MoveItem is not a string.');  // Error
			return null;
		}
	},

	// RenameItem: Renames an item.  Optional Quantity parameter if you want to rename partial stacks, defaults to all items.
	RenameItem : function (BagName, CurrentItemName, NewItemName, Quantity) {
		if (UInv.isString(BagName) && UInv.isString(CurrentItemName) && UInv.isString(NewItemName)) {
			BagName = UInv.FixBagName(BagName);
			CurrentItemName = UInv.FixItemName(CurrentItemName);
			NewItemName = UInv.FixItemName(NewItemName);
			if ((!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(CurrentItemName)) && (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(NewItemName))) {
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, CurrentItemName)) {
						if (CurrentItemName === NewItemName) {
							UInv.Error('Error: RenameItem failed.  CurrentItemName cannot be the same as NewItemName.');  // Error
							return false;
						} else if (UInv.BagHasItem(BagName, NewItemName) && (State.variables.UInvMergeItemMethod === UInv.MERGE_FAIL_WITH_ERROR)) {
							UInv.Error('Error: RenameItem failed.  Item name "' + NewItemName + '" already exists in bag "' + BagName + '".');  // Error
							return false;
						} else {
							if (UInv.isString(Quantity)) {
								if (UInv.isNumber(parseInt(Quantity))) {
									Quantity = parseInt(Quantity);
								}
							}
							if (UInv.isNumber(Quantity)) {
								Quantity = Math.round(Quantity);
								if (Quantity < 1) {
									Quantity = 1;
								}
								if (Quantity > UInv.BagHasItem(BagName, CurrentItemName)) {
									Quantity = UInv.BagHasItem(BagName, CurrentItemName);
								}
							} else {
								Quantity = UInv.BagHasItem(BagName, CurrentItemName);
							}
							var Result = UInv.CopyItem(BagName, BagName, CurrentItemName, Quantity, NewItemName);
							if (Result) {
								UInv.AddToItemPropertyValue(BagName, CurrentItemName, "UInvQuantity", -Quantity);
								UInv.SetCurrentItemName(NewItemName);
								UInv.SetCurrentBagName(BagName);
							}
							return Result;  // Success
						}
					} else {
						UInv.Error('Error: RenameItem cannot find item "' + CurrentItemName + '" in bag "' + BagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: RenameItem cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: RenameItem failed.  Item names cannot be "UInvTouched", "UInvProperties", or "UInvDefaultBagType".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to RenameItem is not a string.');  // Error
			return false;
		}
	},
	
	// RenameItemProperty: Renames item property.  Returns true if it succeeds.  Bag is not touched.
	RenameItemProperty : function (BagName, ItemName, CurrentItemPropertyName, NewItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(CurrentItemPropertyName) && UInv.isString(NewItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (!["UInvTouched", "UInvProperties", "UInvDefaultBagType"].includes(ItemName)) {
				if ((CurrentItemPropertyName !== "UInvQuantity") && (NewItemPropertyName !== "UInvQuantity")) {
					if (UInv.BagExists(BagName)) {
						if (UInv.BagHasItem(BagName, ItemName)) {
							if (UInv.ItemHasProperty(BagName, ItemName, CurrentItemPropertyName)) {
								if (UInv.ItemHasProperty(BagName, ItemName, NewItemPropertyName)) {
									UInv.Error('Error: RenameItemProperty failed.  Property "' + NewItemPropertyName + '" already exists on item "' + ItemName + '".');  // Error
									return false;
								} else if (CurrentItemPropertyName === NewItemPropertyName) {
									UInv.Error('Error: RenameItemProperty failed.  CurrentItemPropertyName cannot be the same as NewItemPropertyName.');  // Error
									return false;
								} else {
									UInv.SetCurrentItemName(ItemName);
									UInv.SetCurrentBagName(BagName);
									Object.defineProperty(State.variables.UInvBags[BagName][ItemName], NewItemPropertyName, Object.getOwnPropertyDescriptor(State.variables.UInvBags[BagName][ItemName], CurrentItemPropertyName));
									delete State.variables.UInvBags[BagName][ItemName][CurrentItemPropertyName];
									return true;  // Success
								}
							} else {
								UInv.Error('Error: RenameItemProperty cannot find property "' + CurrentItemPropertyName + '" in item "' + ItemName + '".');  // Error
								return false;
							}
						} else {
							UInv.Error('Error: RenameItemProperty cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: RenameItemProperty cannot find bag "' + BagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: RenameItemProperty failed.  ItemPropertyName cannot be "UInvQuantity".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: RenameItemProperty failed.  ItemName cannot be "' + ItemName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to RenameItemProperty is not a string.');  // Error
			return false;
		}
	},

	// GetObjectOfItemPropertyValues: Returns an object in the format { ItemName : Value, ... } for each item in bag that has a property of ItemPropertyName.
	GetObjectOfItemPropertyValues : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName), ItemValues = {}, i = 0;
				UInv.SetCurrentBagName(BagName);
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
						ItemValues[Items[i]] = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
					}
				}
				return ItemValues;  // Success
			} else {
				UInv.Error('Error: GetObjectOfItemPropertyValues cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetObjectOfItemPropertyValues is not a string.');  // Error
			return null;
		}
	},

	// GetAllPropertyValues: Returns an array of all unique values of the items' ItemPropertyName in a bag.
	GetAllPropertyValues : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName), Values = [], i = 0;
				UInv.SetCurrentBagName(BagName);
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
						if (!Values.includes(UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName))) {
							Values.push(UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName));
						}
					}
				}
				return Values;  // Success
			} else {
				UInv.Error('Error: GetAllPropertyValues cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetAllPropertyValues is not a string.');  // Error
			return null;
		}
	},

	// GetItemByProperty: Returns a random item from a bag that has property ItemPropertyName.  Sets that item as the current item.
	GetItemByProperty : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					var Rnd = random(Items.length - 1);
					UInv.SetCurrentItemName(Items[Rnd]);
					return Items[Rnd];  // Success
				} else {
					return "";  // Success
				}
			} else {
				UInv.Error('Error: GetItemByProperty cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemByProperty is not a string.');  // Error
			return null;
		}
	},

	// GetItemByType: Returns a random ItemName from a bag that is of type ItemType.  Sets that item as the current item.
	GetItemByType : function (BagName, ItemType) {
		if (UInv.isString(BagName) && UInv.isString(ItemType)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArrayByType(BagName, ItemType);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					var Rnd = random(Items.length - 1);
					UInv.SetCurrentItemName(Items[Rnd]);
					return Items[Rnd];  // Success
				} else {
					return "";  // Success
				}
			} else {
				UInv.Error('Error: GetItemByType cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemByType is not a string.');  // Error
			return null;
		}
	},

	// GetRandomItemValue: Returns a random value of an item's ItemPropertyName in a bag if it has that property.  Sets that item as the current item.
	GetRandomItemValue : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Item = UInv.GetItemByProperty(BagName, ItemPropertyName);
				UInv.SetCurrentBagName(BagName);
				if (Item) {
					UInv.SetCurrentItemName(Item);
					return UInv.GetItemPropertyValue(BagName, Item, ItemPropertyName);  // Success
				} else {
					return "";  // Success
				}
			} else {
				UInv.Error('Error: GetRandomItemValue cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetRandomItemValue is not a string.');  // Error
			return null;
		}
	},

	// GetItemWherePropertyEquals: Returns a random ItemName from a bag where ItemPropertyName === Value.  Sets that item as the current item.
	GetItemWherePropertyEquals : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayWherePropertyEquals(BagName, ItemPropertyName, Value);
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						var Rnd = random(Items.length - 1);
						UInv.SetCurrentItemName(Items[Rnd]);
						return Items[Rnd];  // Success
					} else {
						return "";  // Success
					}
				} else {
					UInv.Error('Error: GetItemWherePropertyEquals cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemWherePropertyEquals failed.  Value parameter is undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemWherePropertyEquals is not a string.');  // Error
			return null;
		}
	},

	// GetItemWherePropertyGreaterThan: Returns a random ItemName from a bag where ItemPropertyName === Value.  Sets that item as the current item.
	GetItemWherePropertyGreaterThan : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayWherePropertyGreaterThan(BagName, ItemPropertyName, Value);
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						var Rnd = random(Items.length - 1);
						UInv.SetCurrentItemName(Items[Rnd]);
						return Items[Rnd];  // Success
					} else {
						return "";  // Success
					}
				} else {
					UInv.Error('Error: GetItemWherePropertyGreaterThan cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemWherePropertyGreaterThan failed.  Value parameter is undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemWherePropertyGreaterThan is not a string.');  // Error
			return null;
		}
	},

	// GetItemWherePropertyLessThan: Returns a random ItemName from a bag where ItemPropertyName === Value.  Sets that item as the current item.
	GetItemWherePropertyLessThan : function (BagName, ItemPropertyName, Value) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			if (!UInv.isUndefined(Value)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayWherePropertyLessThan(BagName, ItemPropertyName, Value);
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						var Rnd = random(Items.length - 1);
						UInv.SetCurrentItemName(Items[Rnd]);
						return Items[Rnd];  // Success
					} else {
						return "";  // Success
					}
				} else {
					UInv.Error('Error: GetItemWherePropertyLessThan cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemWherePropertyLessThan failed.  Value parameter is undefined.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemWherePropertyLessThan is not a string.');  // Error
			return null;
		}
	},

	// GetRandomItem: Returns a random ItemName from the bag.  Sets that item as the current item.
	GetRandomItem : function (BagName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					var Rnd = random(Items.length - 1);
					UInv.SetCurrentItemName(Items[Rnd]);
					return Items[Rnd];  // Success
				} else {
					return "";  // Success
				}
			} else {
				UInv.Error('Error: GetRandomItem cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetRandomItem is not a string.');  // Error
			return null;
		}
	},

	// ResetItemProperties: Removes all properties from an item (except UInvQuantity and UInvDefaultItemType if it exists).  If DefaultItemType is passed then it loads the default properties of that item.
	ResetItemProperties : function (BagName, ItemName, DefaultItemType) {
		if (UInv.isString(ItemName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				ItemName = UInv.FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					var Quantity = UInv.BagHasItem(BagName, ItemName);
					if (Quantity) {
						if (UInv.isUndefined(DefaultItemType)) {
							DefaultItemType = UInv.GetItemsDefaultType(BagName, ItemName);
							UInv.DeleteItem(BagName, ItemName);
							UInv.SetCurrentBagName(BagName);
							UInv.SetCurrentItemName(ItemName);
							if (DefaultItemType === ItemName) {
								return UInv.AddItem(BagName, DefaultItemType, Quantity);  // Success
							} else {
								return UInv.AddItem(BagName, DefaultItemType, Quantity, ItemName);  // Success
							}
						} else if (UInv.isString(DefaultItemType)) {
							if (UInv.GetDefaultItemObject(DefaultItemType) || (DefaultItemType == "-")) {
								UInv.DeleteItem(BagName, ItemName);
								return UInv.AddItem(BagName, DefaultItemType, Quantity, ItemName);  // Success
							} else {
								UInv.Error('Error: DefaultItemType "' + DefaultItemType + '" is not a default item.');  // Error
								return false;
							}
						} else {
							UInv.Error('Error: DefaultItemType passed to ResetItemProperties is not a string.');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: ResetItemProperties cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: ResetItemProperties cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i = 0, Result = true;
					for (i = 0; i < BagName.length; i++) {
						Result = UInv.ResetItemProperties(BagName[i], ItemName, DefaultItemType);
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: ResetItemProperties failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to ResetItemProperties is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: ItemName passed to ResetItemProperties is not a string.');  // Error
			return false;
		}
	},

	// GetItemsArrayWhereItemNameContains: Returns an array of ItemNames where item's name contains the substring    *** use RegExp matching? ***
	GetItemsArrayWhereItemNameContains : function (BagName, SubString) {
		if (UInv.isString(BagName) && UInv.isString(SubString)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					var Result = [], i = 0;
					for (i = 0; i < Items.length; i++) {
						if (Items[i].includes(SubString.toLowerCase())) {
							Result.push(Items[i]);
						}
					}
					return Result;  // Success
				} else {
					return [];  // Success
				}
			} else {
				UInv.Error('Error: GetItemsArrayWhereItemNameContains cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Parameter passed to GetItemsArrayWhereItemNameContains is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWherePropertyValueContains: Returns an array of ItemNames where item's ItemPropertyName contains the substring    *** use RegExp matching? ***
	GetItemsArrayWherePropertyValueContains : function (BagName, ItemPropertyName, SubString, CaseSensitive) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName) && UInv.isString(SubString)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					var Result = [], i = 0;
					if (UInv.isUndefined(CaseSensitive)) {
						CaseSensitive = false;
					}
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, ItemPropertyName)) {
							if (CaseSensitive) {
								if (UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName).includes(SubString)) {
									Result.push(Items[i]);
								}
							} else {
								if (UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName).toLowerCase().includes(SubString.toLowerCase())) {
									Result.push(Items[i]);
								}
							}
						}
					}
					return Result;  // Success
				} else {
					return [];  // Success
				}
			} else {
				UInv.Error('Error: GetItemsArrayWherePropertyValueContains cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Parameter passed to GetItemsArrayWherePropertyValueContains is not a string.');  // Error
			return null;
		}
	},

	// GetItemPropertyValueObject: Returns an object in the format { ItemName : ItemPropertyName's value, ... } for each item in BagName that has the property ItemPropertyName.
	//                             Items that don't have ItemPropertyName are ignored.  Returns "null" on error.
	GetItemPropertyValueObject : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					var Result = {}, i = 0;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							Result[Items[i]] = ItemPropertyName;
						}
					}
					return Result;  // Success
				} else {
					return {};  // Success
				}
			} else {
				UInv.Error('Error: GetItemPropertyValueObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Parameter passed to GetItemPropertyValueObject is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArraySortedByProperty: Returns an array of item names in BagName, sorted by the value in ItemPropertyName (subsorted by ItemName), or by ItemName if ItemPropertyName isn't set.
	//         The array is sorted by number or boolean if all item property values are of that type, otherwise it converts non-strings to strings and does a lowercase comparison.
	//         Items that don't have ItemPropertyName are ignored.  Returns "null" on error.
	GetItemsArraySortedByProperty : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				UInv.SetCurrentBagName(BagName);
				if (Items.length > 0) {
					if (!UInv.isUndefined(ItemPropertyName)) {
						var Result = [], Key = [], i = 0, temp = [], ChangeType = true;
						temp = UInv.GetAllPropertyValues(BagName, ItemPropertyName);
						if (UInv.isArrayOfNumbers(temp) || UInv.isArrayOfBooleans(temp)) {
							ChangeType = false;
						}
						for (i = 0; i < Items.length; i++) {
							if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
								Result[i] = Items[i];
								temp = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
								if (ChangeType && !UInv.isString(temp)) {
									temp = temp.toString();
								}
								if (UInv.isString(temp)) {
									temp = temp.toLowerCase();
								}
								Key[i] = temp;
							}
						}
						return UInv.getArraySortedByOtherArray(Result, Key);  // Success
					} else {
						return Items.sort( function compare(a, b) {  // String sort function; a & b are item names, so they will always be strings
							if (a.toLowerCase() < b.toLowerCase()) {
								return -1;
							}
							if (a.toLowerCase() > b.toLowerCase()) {
								return 1;
							}
							return 0;  // a === b
						});  // Success
					}
				} else {
					return [];  // Success
				}
			} else {
				UInv.Error('Error: GetItemsArraySortedByProperty cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemsArraySortedByProperty is not a string.');  // Error
			return null;
		}
	},

	// GetItemCountByFunction: Returns the sum of the values returned by function (function is passed BagName) or "null" on error.
	GetItemCountByFunction : function (BagName, CountFunction) {
		var tmp;
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isFunction(CountFunction)) {
					UInv.SetCurrentBagName(BagName);
					tmp = CountFunction(BagName);
					if (UInv.isUndefined(tmp)) {
						UInv.Error("Error: GetItemCountByFunction failed.  CountFunction's return value is undefined.");  // Error
						return null;
					}
					return tmp;  // Success
				} else {
					UInv.Error('Error: CountFunction passed to GetItemCountByFunction is not a function.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemCountByFunction cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else if (UInv.isArrayOfStrings(BagName)) {
			if (UInv.isFunction(CountFunction)) {
				var i = 0, Result = 0;
				if (BagName.length > 0) {
					for (i = 0; i < BagName.length; i++) {
						if (UInv.BagExists(BagName[i])) {
							tmp = CountFunction(BagName);
							if (UInv.isUndefined(tmp)) {
								UInv.Error("Error: GetItemCountByFunction failed.  CountFunction's return value is undefined.");  // Error
								return null;
							}
							Result += tmp;
						} else {
							UInv.Error('Error: GetItemCountByFunction cannot find bag "' + BagName + '".');  // Error
							return null;
						}
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: CountFunction passed to GetItemCountByFunction is not a function.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemCountByFunction is not a string or an array of strings.');  // Error
			return null;
		}
	},

	// GetItemsArrayByFunction: Returns an array of items where function is true (function is passed BagName and ItemName strings) or "null" on error.
	GetItemsArrayByFunction : function (BagName, SelectionFunction) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isFunction(SelectionFunction)) {
					var Items = UInv.GetItemsArray(BagName), i = 0, tmp, Result = [];
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						for (i = 0; i < Items.length; i++) {
							tmp = SelectionFunction(BagName, Items[i]);
							if (UInv.isUndefined(tmp)) {
								UInv.Error("Error: GetItemsArrayByFunction failed.  SelectionFunction's return value is undefined.");  // Error
								return null;
							}
							if (tmp) {
								Result.push([Items[i]]);
							}
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: SelectionFunction passed to GetItemsArrayByFunction is not a function.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsArrayByFunction cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemsArrayByFunction is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArraySortedByFunction: Returns an array of ItemNames sorted by the SortFunction function, or "null" on error.
	//                                The SortFunction will be passed the parameters (BagName, ItemName1, ItemName2), and
	//                                if the function returns a "truthy" value, then those two items will be swapped in the array.
	GetItemsArraySortedByFunction : function (BagName, SortFunction) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isFunction(SortFunction)) {
					var Items = UInv.GetItemsArray(BagName), tmp, i = 0, n = 0, Continue = true;
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						while ((n <= Items.length) && Continue) {
							Continue = false;
							for (i = 0; i < Items.length - 1; i++) {
								tmp = SortFunction(BagName, Items[i], Items[i + 1]);
								if (UInv.isUndefined(tmp)) {
									UInv.Error("Error: GetItemsArraySortedByFunction failed.  SortFunction's return value is undefined.");  // Error
									return null;
								}
								if (tmp) {
									Continue = true;
									tmp = Items[i];
									Items[i] = Items[i + 1];
									Items[i + 1] = tmp;
								}
							}
							n++;
						}
					}
					if (n > Items.length) {
						UInv.Error('Error: GetItemsArraySortedByFunction failed.  SortFunction is not returning consistent results.');  // Error
						return null;
					} else {
						return Items;  // Success
					}
				} else {
					UInv.Error('Error: SortFunction passed to GetItemsArraySortedByFunction is not a function.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsArraySortedByFunction cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagName passed to GetItemsArraySortedByFunction is not a string.');  // Error
			return null;
		}
	},

	// ArrayHasAllItemProperties: Returns whether all of the item's properties are listed in ItemPropertyNameArray, false if the item has no properties, or null on error.
	ArrayHasAllItemProperties : function (BagName, ItemName, ItemPropertyNameArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.isArrayOfStrings(ItemPropertyNameArray)) {
						var Props = UInv.GetItemPropertiesArray(BagName, ItemName);
						if (!UInv.isArray(ItemPropertyNameArray)) {
							ItemPropertyNameArray = [ ItemPropertyNameArray ];
						}
						if ((Props.length > 0) && (ItemPropertyNameArray.length > 0)) {
							var i;
							for (i = 0; i < Props.length; i++) {
								if (!ItemPropertyNameArray.includes(Props[i])) {
									return false;
								}
							}
							return true;
						}
						return false;
					} else {
						UInv.Error('Error: ArrayHasAllItemProperties failed.  ItemPropertyNameArray is not an array of strings.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: ArrayHasAllItemProperties cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ArrayHasAllItemProperties cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to ArrayHasAllItemProperties is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWithAllProperties: Returns an array of all items which have all of the properties in ItemPropertyNameArray (per the ArrayHasAllItemProperties function), or null on error.
	//                                 Items which have no properties will not be included.
	GetItemsArrayWithAllProperties : function (BagName, ItemPropertyNameArray) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.isArrayOfStrings(ItemPropertyNameArray)) {
					var Items = UInv.GetItemsArray(BagName), Result = [], i;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ArrayHasAllItemProperties(BagName, Items[i], ItemPropertyNameArray)) {
							Result.push(Items[i]);
						}
					}
					return Result;
				} else {
					UInv.Error('Error: GetItemsArrayWithAllProperties failed.  ItemPropertyNameArray is not an array of strings.');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemsArrayWithAllProperties cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWithAllProperties is not a string.');  // Error
			return null;
		}
	},

	// SwapItemsProperties: Swaps the given properties of two items.  Returns true on success, false on error.
	SwapItemsProperties : function (BagName1, ItemName1, BagName2, ItemName2, ItemPropertyName) {
		if (UInv.isString(BagName1) && UInv.isString(ItemName1) && UInv.isString(BagName2) && UInv.isString(ItemName2)) {
			BagName1 = UInv.FixBagName(BagName1);
			ItemName1 = UInv.FixItemName(ItemName1);
			BagName2 = UInv.FixBagName(BagName2);
			ItemName2 = UInv.FixItemName(ItemName2);
			if (UInv.BagExists(BagName1)) {
				if (UInv.BagExists(BagName2)) {
					if (UInv.BagHasItem(BagName1, ItemName1)) {
						if (UInv.BagHasItem(BagName2, ItemName2)) {
							if (UInv.isString(ItemPropertyName)) {
								ItemPropertyName = [ ItemPropertyName ];
							}
							if (UInv.isArrayOfStrings(ItemPropertyName)) {
								var i = 0, Val;
								if (ItemPropertyName.length > 0) {
									for (i = 0; i < ItemPropertyName.length; i++) {
										if (UInv.ItemHasProperty(BagName1, ItemName1, ItemPropertyName[i])) {
											if (UInv.ItemHasProperty(BagName2, ItemName2, ItemPropertyName[i])) {
												// swap item property values
												Val = UInv.GetItemValue(BagName1, ItemName1, ItemPropertyName[i]);
												UInv.SetItemValue(BagName1, ItemName1, ItemPropertyName[i], UInv.GetItemValue(BagName2, ItemName2, ItemPropertyName[i]));
												UInv.SetItemValue(BagName2, ItemName2, ItemPropertyName[i], Val);
											} else {
												// move item property
												UInv.SetItemValue(BagName2, ItemName2, ItemPropertyName[i], UInv.GetItemValue(BagName1, ItemName1, ItemPropertyName[i]));
												UInv.DeleteItemProperty(BagName1, ItemName1, ItemPropertyName[i]);
											}
										} else {
											if (UInv.ItemHasProperty(BagName2, ItemName2, ItemPropertyName[i])) {
												// move item property
												UInv.SetItemValue(BagName1, ItemName1, ItemPropertyName[i], UInv.GetItemValue(BagName2, ItemName2, ItemPropertyName[i]));
												UInv.DeleteItemProperty(BagName2, ItemName2, ItemPropertyName[i]);
											}
										}
									}
								}
								return true;  // Success
							} else {
								UInv.Error('Error: SwapItemsProperties failed.  ExceptItemPropertyName is not a string or array of strings.');  // Error
								return false;
							}
						} else {
							UInv.Error('Error: SwapItemsProperties cannot find item "' + ItemName2 + '" in bag "' + BagName2 + '".');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: SwapItemsProperties cannot find item "' + ItemName1 + '" in bag "' + BagName1 + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SwapItemsProperties cannot find bag "' + BagName2 + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: SwapItemsProperties cannot find bag "' + BagName1 + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to SwapItemsProperties is not a string.');  // Error
			return false;
		}
	},

	// SwapItems: Swaps two items, optionally keeps certain item properties un-swapped.  Returns true on success, false on error.
	SwapItems : function (BagName1, ItemName1, BagName2, ItemName2, ExceptItemPropertyName) {
		if (UInv.isString(BagName1) && UInv.isString(ItemName1) && UInv.isString(BagName2) && UInv.isString(ItemName2)) {
			BagName1 = UInv.FixBagName(BagName1);
			ItemName1 = UInv.FixItemName(ItemName1);
			BagName2 = UInv.FixBagName(BagName2);
			ItemName2 = UInv.FixItemName(ItemName2);
			if (UInv.BagExists(BagName1)) {
				if (UInv.BagExists(BagName2)) {
					if (UInv.BagHasItem(BagName1, ItemName1)) {
						if (UInv.BagHasItem(BagName2, ItemName2)) {
							if (UInv.isString(ExceptItemPropertyName)) {
								ExceptItemPropertyName = [ ExceptItemPropertyName ];
							}
							if (BagName1 === BagName2) {
								if (UInv.isUndefined(ExceptItemPropertyName)) {
									return true;  // Success - items already in same bag
								} else {  // Just swap excepted properties
									UInv.SwapItemsProperties(BagName1, ItemName1, BagName2, ItemName2, ExceptItemPropertyName);
									return true;  // Success
								}
							} else {
								var TempBag1, TempBag2;
								if (UInv.isUndefined(ExceptItemPropertyName)) {  // safe item swap
									TempBag1 = UInv.GetUniqueBagName();
									TempBag2 = UInv.GetUniqueBagName();
									UInv.IncrementUpdateLock();  // Prevent unnecessary updates.
									UInv.CreateBag(TempBag1);
									UInv.CreateBag(TempBag2);
									UInv.CopyItem(BagName1, TempBag1, ItemName1);  // *** what if CopyItems fails?
									UInv.CopyItem(BagName2, TempBag2, ItemName2);
									UInv.DeleteItem(BagName1, ItemName1);
									UInv.DeleteItem(BagName2, ItemName2);
									UInv.MoveItem(TempBag1, BagName2, ItemName1);
									UInv.DecrementUpdateLock();
									UInv.MoveItem(TempBag2, BagName1, ItemName2);
									UInv.DeleteBag(TempBag1);
									UInv.DeleteBag(TempBag2);
									UInv.SetCurrentBagName(BagName1);
									UInv.SetCurrentItemName(ItemName1);
									return true;  // Success
								} else if (UInv.isArrayOfStrings(ExceptItemPropertyName)) {  // swap items except particular item properties
									TempBag1 = UInv.GetUniqueBagName();
									TempBag2 = UInv.GetUniqueBagName();
									UInv.IncrementUpdateLock();  // Prevent unnecessary updates.
									UInv.SwapItemsProperties(BagName1, ItemName1, BagName2, ItemName2, ExceptItemPropertyName);
									UInv.CreateBag(TempBag1);
									UInv.CreateBag(TempBag2);
									UInv.CopyItem(BagName1, TempBag1, ItemName1);  // *** what if CopyItems fails?
									UInv.CopyItem(BagName2, TempBag2, ItemName2);
									UInv.DeleteItem(BagName1, ItemName1);
									UInv.DeleteItem(BagName2, ItemName2);
									UInv.MoveItem(TempBag1, BagName2, ItemName1);
									UInv.DecrementUpdateLock();
									UInv.MoveItem(TempBag2, BagName1, ItemName2);
									UInv.DeleteBag(TempBag1);
									UInv.DeleteBag(TempBag2);
									UInv.SetCurrentBagName(BagName1);
									UInv.SetCurrentItemName(ItemName1);
									return true;  // Success
								} else {
									UInv.Error('Error: SwapItems failed.  ExceptItemPropertyName is not a string or array of strings.');  // Error
									return false;
								}
							}
						} else {
							UInv.Error('Error: SwapItems cannot find item "' + ItemName2 + '" in bag "' + BagName2 + '".');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: SwapItems cannot find item "' + ItemName1 + '" in bag "' + BagName1 + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SwapItems cannot find bag "' + BagName2 + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: SwapItems cannot find bag "' + BagName1 + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to SwapItems is not a string.');  // Error
			return false;
		}
	},


	// UInv Tag Functions:
	// ===================

	// AddBagTag: Add or change a bag property to include BagTag.  If property exists, then the value gets put in an array if it isn't already.  Returns true if it succeeds.
	AddBagTag : function (BagName, BagPropertyName, BagTag) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isUndefined(BagTag)) {
						if (UInv.isArray(BagTag)) {
							var i = 0, AResult = true;
							if (BagTag.length > 0) {
								for (i = 0; i < BagTag.length; i++) {
									if (!UInv.AddBagTag(BagName, BagPropertyName, BagTag[i])) {
										AResult = false;
									}
								}
							}
							return AResult;  // Success
						} else {
							var Value = [];
							if (UInv.BagHasProperty(BagName, BagPropertyName)) {
								Value = UInv.GetBagPropertyValue(BagName, BagPropertyName);
								if (UInv.isArray(Value)) {
									Value.push(BagTag);
								} else {
									Value = [ Value, BagTag ];
								}
							} else {
								Value = [ BagTag ];
							}
							UInv.SetBagPropertyValue(BagName, BagPropertyName, Value);
							return true;  // Success
						}
					} else {
						UInv.Error('Error: AddBagTag failed.  BagTag not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: AddBagTag cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var j = 0, BResult = true;
					for (j = 0; j < BagName.length; j++) {
						if (!UInv.AddBagTag(BagName[j], BagPropertyName, BagTag)) {
							BResult = false;
						}
					}
					return BResult;  // Success
				} else {
					UInv.Error('Error: AddBagTag failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to AddBagTag is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to AddBagTag is not a string.');  // Error
			return false;
		}
	},

	// AddItemTag: Add or change a item property to include ItemTag.  If property exists, then the value gets put in an array if it isn't already.  Returns true if it succeeds.
	AddItemTag : function (BagName, ItemName, ItemPropertyName, ItemTag) {
		if (UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				ItemName = UInv.FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						if (!UInv.isUndefined(ItemTag)) {
							if (UInv.isArray(ItemTag)) {
								var i = 0, AResult = true;
								if (ItemTag.length > 0) {
									for (i = 0; i < ItemTag.length; i++) {
										if (!UInv.AddItemTag(BagName, ItemName, ItemPropertyName, ItemTag[i])) {
											AResult = false;
										}
									}
								}
								return AResult;  // Success
							} else {
								var Value = [];
								if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
									Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);  // Handle default item properties
									if (UInv.isArray(Value)) {
										Value.push(ItemTag);
										UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
										return true;  // Success
									} else {
										Value = [ Value, ItemTag ];
										UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
										return true;  // Success
									}
								} else {
									Value = [ ItemTag ];
									UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
									return true;  // Success
								}
							}
						} else {
							UInv.Error('Error: AddItemTag failed.  ItemTag not defined.');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: AddItemTag cannot find item "' + ItemName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: AddItemTag cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var j = 0, BResult = true;
					for (j = 0; j < BagName.length; j++) {
						if (!UInv.AddItemTag(BagName[j], ItemName, ItemPropertyName, ItemTag)) {
							BResult = false;
						}
					}
					return BResult;  // Success
				} else {
					UInv.Error('Error: AddItemTag failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to AddItemTag is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to AddItemTag is not a string.');  // Error
			return false;
		}
	},

	// DeleteBagTag: Delete one instance of BagTag from bag property.  Returns true if it succeeds.
	DeleteBagTag : function (BagName, BagPropertyName, BagTag) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isUndefined(BagTag)) {
						if (UInv.BagHasProperty(BagName, BagPropertyName)) {
							if (UInv.isArray(BagTag)) {
								var i = 0, AResult = true;
								if (BagTag.length > 0) {
									for (i = 0; i < BagTag.length; i++) {
										if (!UInv.DeleteBagTag(BagName, BagPropertyName, BagTag[i])) {
											AResult = false;
										}
									}
								}
								return AResult;  // Success
							} else {
								var Value = UInv.GetBagPropertyValue(BagName, BagPropertyName);
								if (UInv.isArray(Value)) {
									if (UInv.arrayHasTag(Value, BagTag)) {
										Value.deleteAt(Value.indexOf(BagTag));
										UInv.SetBagPropertyValue(BagName, BagPropertyName, Value);
									}
								} else if (Value === BagTag) {
									UInv.DeleteBagProperty(BagName, BagPropertyName);
								}
								return true;  // Success
							}
						} else {
							return true;  // Success - bag property not found
						}
					} else {
						UInv.Error('Error: DeleteBagTag failed.  BagTag not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: DeleteBagTag cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var j = 0, BResult = true;
					for (j = 0; j < BagName.length; j++) {
						if (!UInv.DeleteBagTag(BagName[j], BagPropertyName, BagTag)) {
							BResult = false;
						}
					}
					return BResult;  // Success
				} else {
					UInv.Error('Error: DeleteBagTag failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to DeleteBagTag is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to DeleteBagTag is not a string.');  // Error
			return false;
		}
	},

	// DeleteItemTag: Delete one instance of ItemTag from item property.  Returns true if it succeeds.
	DeleteItemTag : function (BagName, ItemName, ItemPropertyName, ItemTag) {
		if (UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				ItemName = UInv.FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					UInv.SetCurrentItemName(ItemName);
					if (!UInv.isUndefined(ItemTag)) {
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							if (UInv.isArray(ItemTag)) {
								var i = 0, AResult = true;
								if (ItemTag.length > 0) {
									for (i = 0; i < ItemTag.length; i++) {
										if (!UInv.DeleteItemTag(BagName, ItemName, ItemPropertyName, ItemTag[i])) {
											AResult = false;
										}
									}
								}
								return AResult;  // Success
							} else {
								var Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);  // Handle default item properties
								if (UInv.isArray(Value)) {
									if (UInv.arrayHasTag(Value, ItemTag)) {
										Value.deleteAt(Value.indexOf(ItemTag));
										UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
									}
									return true;  // Success
								} else {
									if (UInv.valuesAreEqual(Value, ItemTag)) {
										UInv.DeleteItemProperty(BagName, ItemName, ItemPropertyName);
									}
									return true;  // Success
								}
							}
						} else {
							return true;  // Success - ItemPropertyName doesn't exist, so it's already "deleted"
						}
					} else {
						UInv.Error('Error: DeleteItemTag failed.  ItemTag not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: DeleteItemTag cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var j = 0, BResult = true;
					for (j = 0; j < BagName.length; j++) {
						if (!UInv.DeleteItemTag(BagName[j], ItemName, ItemPropertyName, ItemTag)) {
							BResult = false;
						}
					}
					return BResult;  // Success
				} else {
					UInv.Error('Error: DeleteItemTag failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to DeleteItemTag is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to DeleteItemTag is not a string.');  // Error
			return false;
		}
	},

	// BagHasTag: Returns true if bag's property contains the tag.
	BagHasTag : function (BagName, BagPropertyName, BagTag) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (!UInv.isUndefined(BagTag)) {
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						var Value = UInv.GetBagPropertyValue(BagName, BagPropertyName);
						if (UInv.isArray(Value)) {
							return UInv.arrayHasTag(Value, BagTag);  // Success
						} else {
							return UInv.valuesAreEqual(Value, BagTag);  // Success
						}
					} else {
						return false;  // Success - tag not on bag
					}
				} else {
					UInv.Error('Error: BagHasTag failed.  BagTag not defined.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagHasTag cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasTag is not a string.');  // Error
			return false;
		}
	},

	// ItemHasTag: Returns true if item's property contains the tag.
	ItemHasTag : function (BagName, ItemName, ItemPropertyName, ItemTag) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					UInv.SetCurrentBagName(BagName);
					UInv.SetCurrentItemName(ItemName);
					if (!UInv.isUndefined(ItemTag)) {
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							var Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
							if (UInv.isArray(Value)) {
								return UInv.arrayHasTag(Value, ItemTag);  // Success
							} else {
								return UInv.valuesAreEqual(Value, ItemTag);  // Success
							}
						} else {
							return false;  // Success - tag not on item
						}
					} else {
						UInv.Error('Error: ItemHasTag failed.  ItemTag not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: ItemHasTag cannot find item "' + ItemName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: ItemHasTag cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to ItemHasTag is not a string.');  // Error
			return false;
		}
	},

	// ItemHasAllTags: Returns true if item's property contains the tag.
	ItemHasAllTags : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (!UInv.isUndefined(ItemTagArray)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							if (UInv.isArray(ItemTagArray)) {
								var i;
								for (i = 0; i < ItemTagArray.length; i++) {
									if (!UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTagArray[i])) {
										return false;  // Success
									}
								}
								return true;  // Success
							} else {
								return UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTagArray);  // Success
							}
						} else {
							return false;  // Success - ItemPropertyName not on item
						}
					} else {
						UInv.Error('Error: ItemHasAllTags failed.  ItemTagArray not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: ItemHasAllTags cannot find item "' + ItemName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: ItemHasAllTags cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to ItemHasAllTags is not a string.');  // Error
			return false;
		}
	},

	// ItemHasAnyTag: Returns true if item's property contains the tag.
	ItemHasAnyTag : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (!UInv.isUndefined(ItemTagArray)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							if (UInv.isArray(ItemTagArray)) {
								var i;
								for (i = 0; i < ItemTagArray.length; i++) {
									if (UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTagArray[i])) {
										return true;  // Success
									}
								}
								return false;  // Success
							} else {
								return UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTagArray);  // Success
							}
						} else {
							return false;  // Success - ItemPropertyName not on item
						}
					} else {
						UInv.Error('Error: ItemHasAnyTag failed.  ItemTagArray not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: ItemHasAnyTag cannot find item "' + ItemName + '".');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: ItemHasAnyTag cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to ItemHasAnyTag is not a string.');  // Error
			return false;
		}
	},

	// SetBagTag: Makes sure it has one of or removes all of tag BagTag based on whether Enabled is true or false, respectively.  Returns true on success.
	SetBagTag : function (BagName, BagPropertyName, BagTag, Enabled) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isUndefined(BagTag)) {
						if (UInv.isBoolean(Enabled)) {
							if (UInv.isArray(BagTag)) {
								var i = 0, AResult = true;
								if (BagTag.length > 0) {
									for (i = 0; i < BagTag.length; i++) {
										if (!UInv.SetBagTag(BagName, BagPropertyName, BagTag[i], Enabled)) {
											AResult = false;
										}
									}
								}
								return AResult;  // Success
							} else if (Enabled) {
								if (UInv.BagHasProperty(BagName, BagPropertyName)) {  // Make sure it has at least one tag of BagTag
									if (!UInv.BagHasTag(BagName, BagPropertyName, BagTag)) {
										UInv.AddBagTag(BagName, BagPropertyName, BagTag);
									}
								} else {
									UInv.AddBagTag(BagName, BagPropertyName, BagTag);
								}
								return true;  // Success
							} else {
								if (UInv.BagHasProperty(BagName, BagPropertyName)) {  // Make sure it has no tags of BagTag
									while (UInv.BagHasTag(BagName, BagPropertyName, BagTag)) {
										UInv.DeleteBagTag(BagName, BagPropertyName, BagTag);
									}
								}
								return true;  // Success
							}
						} else {
							UInv.Error('Error: SetBagTag failed.  Enabled is not a boolean.');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: SetBagTag failed.  BagTag not defined.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SetBagTag cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var j = 0, BResult = true;
					for (j = 0; j < BagName.length; j++) {
						if (!UInv.SetBagTag(BagName[j], BagPropertyName, BagTag, Enabled)) {
							BResult = false;
						}
					}
					return BResult;  // Success
				} else {
					UInv.Error('Error: SetBagTag failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to SetBagTag is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to SetBagTag is not a string.');  // Error
			return false;
		}
	},

	// SetItemTag: Makes sure it has one of or removes all of tag ItemTag based on whether Enabled is true or false, respectively.  Returns true on success.
	SetItemTag : function (BagName, ItemName, ItemPropertyName, ItemTag, Enabled) {
		if (UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				ItemName = UInv.FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						if (!UInv.isUndefined(ItemTag)) {
							if (UInv.isArray(ItemTag)) {
								var i = 0, AResult = true;
								if (ItemTag.length > 0) {
									for (i = 0; i < ItemTag.length; i++) {
										if (!UInv.SetItemTag(BagName, ItemName, ItemPropertyName, ItemTag[i], Enabled)) {
											AResult = false;
										}
									}
								}
								return AResult;  // Success
							} else if (Enabled) {
								if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {  // Make sure it has at least one tag of ItemTag
									if (!UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTag)) {
										UInv.AddItemTag(BagName, ItemName, ItemPropertyName, ItemTag);
									}
								} else {
									UInv.AddItemTag(BagName, ItemName, ItemPropertyName, ItemTag);
								}
								return true;  // Success
							} else {
								if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {  // Make sure it has no tags of ItemTag
									while (UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTag)) {
										UInv.DeleteItemTag(BagName, ItemName, ItemPropertyName, ItemTag);
									}
								}
								return true;  // Success
							}
						} else {
							UInv.Error('Error: SetItemTag failed.  ItemTag not defined.');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: SetItemTag cannot find item "' + ItemName + '".');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: SetItemTag cannot find bag "' + BagName + '".');  // Error
					return false;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var j = 0, BResult = true;
					for (j = 0; j < BagName.length; j++) {
						if (!UInv.SetItemTag(BagName[j], ItemName, ItemPropertyName, ItemTag, Enabled)) {
							BResult = false;
						}
					}
					return BResult;  // Success
				} else {
					UInv.Error('Error: SetItemTag failed.  Invalid bag name in BagName array.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: BagName passed to SetItemTag is not a string or an array of strings.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Name passed to SetItemTag is not a string.');  // Error
			return false;
		}
	},

	// GetBagsArrayByBagTag: Returns an array of bag names for all bags that have BagTag in their BagPropertyName property.
	GetBagsArrayByBagTag : function (BagPropertyName, BagTag) {
		if (UInv.isString(BagPropertyName)) {
			if (!UInv.isUndefined(BagTag)) {
				var Bags = [], BagList = UInv.GetBagsArray(), i = 0;
				if (BagList.length > 0) {
					for (i = 0; i < BagList.length; i++) {
						if (UInv.BagHasTag(BagList[i], BagPropertyName, BagTag)) {
							Bags.push(BagList[i]);
						}
					}
				}
				return Bags;  // Success
			} else {
				UInv.Error('Error: GetBagsArrayByBagTag failed.  BagTag parameter is missing.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetBagsArrayByBagTag is not a string.');  // Error
			return null;
		}
	},

	// BagHasAllBagTags: Returns true if the bag's property's value (which must be an array) has an equal or greater number of all tags in BagTagArray.  (true if BagTagArray is empty)
	BagHasAllBagTags : function (BagName, BagPropertyName, BagTagArray) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					if (UInv.isArray(UInv.GetBagPropertyValue(BagPropertyName)) && UInv.isArray(BagTagArray)) {
						return UInv.arrayHasAllTags(UInv.GetBagPropertyValue(BagPropertyName), BagTagArray);
					} else {
						UInv.Error("Error: BagHasAllBagTags failed.  Both BagPropertyName's value and BagTagArray parameter must be arrays.");  // Error
						return null;
					}
				} else {
					UInv.Error('Error: BagHasAllBagTags cannot find bag property "' + BagPropertyName + '" on bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagHasAllBagTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasAllBagTags is not a string.');  // Error
			return null;
		}
	},

	// BagHasAnyBagTag: Returns true if the bag's property's value (which must be an array) has any of the tags in BagTagArray.  (false if BagTagArray is empty)
	BagHasAnyBagTag : function (BagName, BagPropertyName, BagTagArray) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					if (UInv.isArray(UInv.GetBagPropertyValue(BagPropertyName)) && UInv.isArray(BagTagArray)) {
						return UInv.arrayHasAnyTag(UInv.GetBagPropertyValue(BagPropertyName), BagTagArray);
					} else {
						UInv.Error("Error: BagHasAnyBagTag failed.  Both BagPropertyName's value and BagTagArray parameter must be arrays.");  // Error
						return null;
					}
				} else {
					UInv.Error('Error: BagHasAnyBagTag cannot find bag property "' + BagPropertyName + '" on bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: BagHasAnyBagTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasAnyBagTag is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayByAllItemTags: Returns array of item names in bag with all tags.
	GetItemsArrayByAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayByAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayByAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayByAnyItemTag: Returns array of item names in bag with any tags.
	GetItemsArrayByAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayByAnyItemTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayByAnyItemTag is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWithoutAllItemTags: Returns array of item names in bag without any of the tags.
	GetItemsArrayWithoutAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
				for (i = 0; i < Items.length; i++) {
					if (!UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayWithoutAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWithoutAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWithoutAnyItemTags: Returns array of item names in bag without any of the tags.
	GetItemsArrayWithoutAnyItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
				for (i = 0; i < Items.length; i++) {
					if (!UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayWithoutAnyItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWithoutAnyItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayByItemTag: Returns array of item names in bag which have that tag.
	GetItemsArrayByItemTag : function (BagName, ItemPropertyName, ItemTag) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasTag(BagName, Items[i], ItemPropertyName, ItemTag)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayByItemTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayByItemTag is not a string.');  // Error
			return null;
		}
	},

	// GetBagsArrayWithItemByBagTag: Returns array of bag names from bags with bag tag and item.
	GetBagsArrayWithItemByBagTag : function (BagPropertyName, BagTag, ItemName) {
		if (UInv.isString(BagPropertyName) && UInv.isString(ItemName)) {
			var Bags = UInv.GetBagsArray(), i = 0, Result = [];
			if (Bags.length > 0) {
				for (i = 0; i < Bags.length; i++) {
					if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasItem(Bags[i], ItemName)) {
						Result.push(Bags[i]);
					}
				}
			}
			return Result;  // Success
		} else {
			UInv.Error('Error: Name passed to GetBagsArrayWithItemByBagTag is not a string.');  // Error
			return null;
		}
	},

	// GetBagsArrayWithBothBagTags: Returns array of bag names with both tags on their respective bag properties.
	GetBagsArrayWithBothBagTags : function (BagPropertyName1, BagTag1, BagPropertyName2, BagTag2) {
		if (UInv.isString(BagPropertyName1) && UInv.isString(BagPropertyName2)) {
			var Bags = UInv.GetBagsArray(), i = 0, Result = [];
			if (Bags.length > 0) {
				for (i = 0; i < Bags.length; i++) {
					if (UInv.BagHasTag(Bags[i], BagPropertyName1, BagTag1) && UInv.BagHasTag(Bags[i], BagPropertyName2, BagTag2)) {
						Result.push(Bags[i]);
					}
				}
			}
			return Result;  // Success
		} else {
			UInv.Error('Error: Name passed to GetBagsArrayWithBothBagTags is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWithBothItemTags: Returns array of item names with both tags on their respective item properties in a bag.
	GetItemsArrayWithBothItemTags : function (BagName, ItemPropertyName1, ItemTag1, ItemPropertyName2, ItemTag2) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName1) && UInv.isString(ItemPropertyName2)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasTag(BagName, Items[i], ItemPropertyName1, ItemTag1) && UInv.ItemHasTag(BagName, Items[i], ItemPropertyName2, ItemTag2)) {
						Result.push(Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetItemsArrayWithBothItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWithBothItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetUniqueBagTagsArray: Returns an array unique bag tags (no duplicates) for this bag property.  Uses all bags if BagName is undefined.
	GetUniqueBagTagsArray : function (BagPropertyName, BagName) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isUndefined(BagName)) {
				BagName = UInv.GetBagsArray();
			}
			var Result = [], i = 0;
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						var Tags = UInv.GetBagPropertyValue(BagName, BagPropertyName);
						if (UInv.isArray(Tags)) {
							if (Tags.length > 0) {
								for (i = 0; i < Tags.length; i++) {
									Result.push(Tags[i]);
								}
							}
							return [].concatUnique(Result);  // Success
						} else {
							return [ Tags ];  // Success
						}
					} else {
						return [];  // Success
					}
				} else {
					UInv.Error('Error: GetUniqueBagTagsArray cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				var Tmp;
				if (BagName.length > 0) {
					for (i = 0; i < BagName.length; i++) {
						Tmp = UInv.GetUniqueBagTagsArray(BagPropertyName, BagName[i]);
						if (Tmp === null) {
							Result = null;
							break;
						} else {
							Result = Result.concatUnique(Tmp);
						}
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: BagName passed to GetUniqueBagTagsArray is not a string or an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to GetUniqueBagTagsArray is not a string.');  // Error
			return null;
		}
	},

	// GetUniqueItemTagsArray: Returns an array unique item tags (no duplicates) for this item property.  Uses all bags if BagName is undefined.
	GetUniqueItemTagsArray : function (ItemPropertyName, BagName) {
		if (UInv.isString(ItemPropertyName)) {
			if (UInv.isUndefined(BagName)) {
				BagName = UInv.GetBagsArray();
			}
			var Result = [], i = 0;
			if (UInv.isString(BagName)) {
				BagName = UInv.FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.GetItemCount(BagName) > 0) {
						var Items = UInv.GetItemsArray(BagName);
						for (i = 0; i < Items.length; i++) {
							if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
								var Tags = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
								if (UInv.isArray(Tags)) {
									Result = Result.concatUnique(Tags);
								} else {
									Result = Result.concatUnique([ Tags ]);
								}
							}
						}
					}
					return Result;  // Success
				} else {
					UInv.Error('Error: GetUniqueItemTagsArray cannot find bag "' + BagName + '".');  // Error
					return null;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				var Tmp;
				if (BagName.length > 0) {
					for (i = 0; i < BagName.length; i++) {
						Tmp = UInv.GetUniqueItemTagsArray(ItemPropertyName, BagName[i]);
						if (Tmp === null) {
							Result = null;
							break;
						} else {
							Result = Result.concatUnique(Tmp);
						}
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: BagName passed to GetUniqueItemTagsArray is not a string or an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: ItemPropertyName passed to GetUniqueItemTagsArray is not a string.');  // Error
			return null;
		}
	},

	// GetAllUniqueItemTagsArray: Returns an array of all unique item tags in the ItemPropertName property for all items in bag.
	GetAllUniqueItemTagsArray : function (BagName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = [], Tags = [];
				if (Items.length > 0) {
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							Tags = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
							if (UInv.isArray(Tags)) {							
								Result = Result.concatUnique(Tags);
							} else {
								Result = Result.concatUnique([ Tags ]);  // Success
							}
						}
					}
				}
				return Result;
			} else {
				UInv.Error('Error: GetAllUniqueItemTagsArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetAllUniqueItemTagsArray is not a string.');  // Error
			return null;
		}
	},

	// BagHasAllItemTags: Returns whether bag's items have all ItemTagArray tags in the ItemPropertyName property among its items.
	BagHasAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (!UInv.isArray(ItemTagArray)) {
					ItemTagArray = [ ItemTagArray ];
				}
				var Tags = UInv.GetAllUniqueItemTagsArray(BagName, ItemPropertyName), i = 0, Result = 0;
				for (i = 0; i < ItemTagArray.length; i++) {
					if (Tags.includes(ItemTagArray[i])) {
						Result += 1;
					}
				}
				return Result === ItemTagArray.length;  // Success
			} else {
				UInv.Error('Error: BagHasAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// BagHasAnyItemTag: Returns whether any of bag's items have ItemTagArray tag in their ItemPropertyName property.
	BagHasAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (!UInv.isArray(ItemTagArray)) {
					ItemTagArray = [ ItemTagArray ];
				}
				var Tags = UInv.GetAllUniqueItemTagsArray(BagName, ItemPropertyName), i = 0;
				for (i = 0; i < ItemTagArray.length; i++) {
					if (Tags.includes(ItemTagArray[i])) {
						return true;  // Success
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: BagHasAnyItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasAnyItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetFullItemCountByAllItemTags: Returns full number of items with all item property tags.
	GetFullItemCountByAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = 0;
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						Result += UInv.BagHasItem(BagName, Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetFullItemCountByAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetFullItemCountByAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetFullItemCountByAnyItemTag: Returns full number of items with any item property tags.
	GetFullItemCountByAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0, Result = 0;
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						Result += UInv.BagHasItem(BagName, Items[i]);
					}
				}
				return Result;  // Success
			} else {
				UInv.Error('Error: GetFullItemCountByAnyItemTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetFullItemCountByAnyItemTag is not a string.');  // Error
			return null;
		}
	},

	// GetBagTagQuantityObject: Returns an object with TagName : TagQuantity pairs.  { "UniqueBagTag1" : QuantityOfBagTag1, ... }
	GetBagTagQuantityObject : function (BagName, BagPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					var Tags = UInv.GetBagPropertyValue(BagName, BagPropertyName);
					UInv.SetCurrentBagName(BagName);
					if (UInv.isArray(Tags)) {
						var UniqueTags = [].concatUnique(Tags), i = 0, Result = {};
						for (i = 0; i < UniqueTags.length; i++) {
							Result[UniqueTags[i]] = Tags.count(UniqueTags[i]);
						}
						return Result;  // Success
					} else {
						var Tmp = {};
						Tmp[Tags] = 1;
						return Tmp;  // Success
					}
				} else {
					UInv.Error('Error: GetBagTagQuantityObject failed.  Bag "' + BagName + '" does not have property "' + BagPropertyName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetBagTagQuantityObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetBagTagQuantityObject is not a string.');  // Error
			return null;
		}
	},

	// GetItemTagQuantityObject: Returns an object with TagName : TagQuantity pairs.  { "UniqueItemTag1" : QuantityOfItemTag1, ... }
	GetItemTagQuantityObject : function (BagName, ItemName, ItemPropertyName) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						var Tags = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						if (UInv.isArray(Tags)) {
							var UniqueTags = [].concatUnique(Tags), i = 0, Result = {};
							for (i = 0; i < UniqueTags.length; i++) {
								Result[UniqueTags[i]] = Tags.count(UniqueTags[i]);
							}
							return Result;  // Success
						} else {
							var Tmp = {};
							Tmp[Tags] = 1;
							return Tmp;  // Success
						}
					} else {
						UInv.Error('Error: GetItemTagQuantityObject failed.  Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetItemTagQuantityObject cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemTagQuantityObject cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemTagQuantityObject is not a string.');  // Error
			return null;
		}
	},

	// BagHasItemByItemTag: Returns true if any item in bag has tag ItemTag, false if none do, or "null" on error.
	BagHasItemByItemTag : function (BagName, ItemPropertyName, ItemTag) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0;
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasTag(BagName, Items[i], ItemPropertyName, ItemTag)) {
						return true;  // Success
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: BagHasItemByItemTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasItemByItemTag is not a string.');  // Error
			return null;
		}
	},

	// BagHasItemWithAllItemTags: Returns true if any items in bag have all tags in ItemTagArray, false if none do, or "null" on error.
	BagHasItemWithAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0;
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						return true;  // Success
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: BagHasItemWithAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasItemWithAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// BagHasItemWithAnyItemTag: Returns true if any items in bag have any tags in ItemTagArray, false if none do, or "null" on error.
	BagHasItemWithAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0;
				for (i = 0; i < Items.length; i++) {
					if (UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						return true;  // Success
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: BagHasItemWithAnyItemTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasItemWithAnyItemTag is not a string.');  // Error
			return null;
		}
	},

	// BagHasItemWithoutAllItemTags: Returns true if any items in bag do not have all tags in ItemTagArray, false if none do, or "null" on error.
	BagHasItemWithoutAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0;
				for (i = 0; i < Items.length; i++) {
					if (!UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						return true;  // Success
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: BagHasItemWithoutAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasItemWithoutAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// BagHasItemWithoutAnyItemTags: Returns true if any items in bag do not have any tags in ItemTagArray, false if none do, or "null" on error.
	BagHasItemWithoutAnyItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				var Items = UInv.GetItemsArray(BagName), i = 0;
				for (i = 0; i < Items.length; i++) {
					if (!UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
						return true;  // Success
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: BagHasItemWithoutAnyItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to BagHasItemWithoutAnyItemTags is not a string.');  // Error
			return null;
		}
	},

	// BagHasItemByBagTag: Returns true if any bags with BagPropertyName/BagTag have item, false if none do, or "null" on error.
	BagHasItemByBagTag : function (BagPropertyName, BagTag, ItemName) {
		if (UInv.isString(BagPropertyName) && UInv.isString(ItemName)) {
			var Bags = UInv.GetBagsArray(), i = 0;
			if (Bags.length > 0) {
				for (i = 0; i < Bags.length; i++) {
					if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasItem(Bags[i], ItemName)) {
						return true;  // Success
					}
				}
			}
			return false;  // Success
		} else {
			UInv.Error('Error: Name passed to BagHasItemByBagTag is not a string.');  // Error
			return null;
		}
	},

	// BagHasAllItemsByBagTag: Returns true if any bag with BagPropertyName/BagTag has all of the items in ItemNameArray, false if none do, or "null" on error.
	BagHasAllItemsByBagTag : function (BagPropertyName, BagTag, ItemNameArray) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isArrayOfStrings(ItemNameArray)) {
				var Bags = UInv.GetBagsArray(), i = 0;
				if (Bags.length > 0) {
					for (i = 0; i < Bags.length; i++) {
						if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasAllItems(Bags[i], ItemNameArray)) {
							return true;  // Success
						}
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: ItemNameArray passed to BagHasAllItemsByBagTag is not an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to BagHasAllItemsByBagTag is not a string.');  // Error
			return null;
		}
	},

	// BagHasAnyItemByBagTag: Returns true if any bag with BagPropertyName/BagTag has any of the items in ItemName/Array, false if none do, or "null" on error.
	BagHasAnyItemByBagTag : function (BagPropertyName, BagTag, ItemNameArray) {
		if (UInv.isString(BagPropertyName)) {
			if (UInv.isArrayOfStrings(ItemNameArray)) {
				var Bags = UInv.GetBagsArray(), i = 0;
				if (Bags.length > 0) {
					for (i = 0; i < Bags.length; i++) {
						if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasAnyItems(Bags[i], ItemNameArray)) {
							return true;  // Success
						}
					}
				}
				return false;  // Success
			} else {
				UInv.Error('Error: ItemNameArray passed to BagHasAnyItemByBagTag is not an array of strings.');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: BagPropertyName passed to BagHasAnyItemByBagTag is not a string.');  // Error
			return null;
		}
	},

	// CopyItemsByItemTag: Copy all items from SourceBagName to DestinationBagName which have ItemTag in the items' ItemPropertyName.
	CopyItemsByItemTag : function (SourceBagName, DestinationBagName, ItemPropertyName, ItemTag) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (UInv.BagExists(SourceBagName)) {
				if (UInv.BagExists(DestinationBagName)) {
					if (SourceBagName !== DestinationBagName) {
						var Items = UInv.GetItemsArrayByItemTag(SourceBagName, ItemPropertyName, ItemTag), Result = [];
						if (Items.length > 0) {
							var i = 0, Ret;
							for (i = 0; i < Items.length; i++) {
								Ret = UInv.CopyItem(SourceBagName, DestinationBagName, Items[i]);
								if (Ret === false) {
									Result = false;
								} else if (!UInv.isBoolean(Result)) {
									Result.push(Ret);
								}
							}
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: CopyItemsByItemTag failed.  Source and destination bags cannot be the same.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: CopyItemsByItemTag cannot find bag "' + DestinationBagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: CopyItemsByItemTag cannot find bag "' + SourceBagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to CopyItemsByItemTag is not a string.');  // Error
			return null;
		}
	},

	// MoveItemsByItemTag: Move all items from SourceBagName to DestinationBagName which have ItemTag in the items' ItemPropertyName.
	MoveItemsByItemTag : function (SourceBagName, DestinationBagName, ItemPropertyName, ItemTag) {
		if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
			SourceBagName = UInv.FixBagName(SourceBagName);
			DestinationBagName = UInv.FixBagName(DestinationBagName);
			if (UInv.BagExists(SourceBagName)) {
				if (UInv.BagExists(DestinationBagName)) {
					if (SourceBagName !== DestinationBagName) {
						var Items = UInv.GetItemsArrayByItemTag(SourceBagName, ItemPropertyName, ItemTag), Result = true;
						if (Items.length > 0) {
							var i = 0, Ret = "";
							for (i = 0; i < Items.length; i++) {
								Ret = UInv.MoveItem(SourceBagName, DestinationBagName, Items[i]);
								if (UInv.isBoolean(Ret)) {
									if (!Ret) {
										Result = false;
									}
								} else {
									if (UInv.isBoolean(Result)) {
										Result = [ Ret ];
									} else {
										Result.push(Ret);
									}
								}
							}
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: MoveItemsByItemTag failed.  Source and destination bags cannot be the same.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: MoveItemsByItemTag cannot find bag "' + DestinationBagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: MoveItemsByItemTag cannot find bag "' + SourceBagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to MoveItemsByItemTag is not a string.');  // Error
			return null;
		}
	},

	// DeleteItemsByItemTag: Delete all items from BagName which have ItemTag in the items' ItemPropertyName.
	DeleteItemsByItemTag : function (BagName, ItemPropertyName, ItemTag) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				return UInv.DeleteItem(BagName, UInv.GetItemsArrayByItemTag(BagName, ItemPropertyName, ItemTag));  // Success
			} else {
				UInv.Error('Error: DeleteItemsByItemTag cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to DeleteItemsByItemTag is not a string.');  // Error
			return null;
		}
	},

	// GetMissingBagTagsArray: Returns an array of all tags in BagTagArray which were not found on the BagPropertyName for that bag, or "null" on error.
	GetMissingBagTagsArray : function (BagName, BagPropertyName, BagTagArray) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					UInv.SetCurrentBagName(BagName);
					var Tags = UInv.GetBagPropertyValue(BagName, BagPropertyName);
					if (!UInv.isArray(Tags)) {
						Tags = [ Tags ];
					}
					if (!UInv.isArray(BagTagArray)) {
						BagTagArray = [ BagTagArray ];
					}
					if (BagTagArray.length > 0) {
						var i = 0, Result = [];
						for (i = 0; i < BagTagArray.length; i++) {
							if (!Tags.includes(BagTagArray[i])) {
								Result.push(BagTagArray[i]);
							}
						}
						return Result;  // Success
					} else {
						return [];  // Success
					}
				} else {
					UInv.Error('Error: GetMissingBagTagsArray failed.  Bag "' + BagName + '" does not have property "' + BagPropertyName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetMissingBagTagsArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetMissingBagTagsArray is not a string.');  // Error
			return null;
		}
	},

	// GetMissingItemTagsArray: Returns an array of all tags in ItemTagArray which were not found on the items' ItemPropertyName in that bag, or "null" on error.
	GetMissingItemTagsArray : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						var Tags = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
						if (!UInv.isArray(Tags)) {
							Tags = [ Tags ];
						}
						if (!UInv.isArray(ItemTagArray)) {
							ItemTagArray = [ ItemTagArray ];
						}
						if (ItemTagArray.length > 0) {
							var i = 0, Result = [];
							for (i = 0; i < ItemTagArray.length; i++) {
								if (!Tags.includes(ItemTagArray[i])) {
									Result.push(ItemTagArray[i]);
								}
							}
							return Result;  // Success
						} else {
							return [];  // Success
						}
					} else {
						UInv.Error('Error: GetMissingItemTagsArray failed.  Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetMissingItemTagsArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetMissingItemTagsArray cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetMissingItemTagsArray is not a string.');  // Error
			return null;
		}
	},

	// GetRandomBagTagFromRange: Returns a random tag from LowIndex to HighIndex (inclusive), returns "null" on error.
	GetRandomBagTagFromRange : function (BagName, BagPropertyName, HighIndex, LowIndex) {
		if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
			if (UInv.isUndefined(LowIndex)) {
				LowIndex = 0;
			}
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasProperty(BagName, BagPropertyName)) {
					var Tags = UInv.GetBagPropertyValue(BagName, BagPropertyName);
					if (UInv.isArray(Tags)) {
						if (UInv.isString(HighIndex)) {
							if (UInv.isNumber(parseInt(HighIndex))) {
								HighIndex = parseInt(HighIndex);
							}
						}
						if (UInv.isString(LowIndex)) {
							if (UInv.isNumber(parseInt(LowIndex))) {
								LowIndex = parseInt(LowIndex);
							}
						}
						if (UInv.isInteger(LowIndex)) {
							if (UInv.isInteger(HighIndex)) {
								if ((LowIndex >= 0) && (LowIndex <= HighIndex)) {
									if ((HighIndex >= LowIndex) && (HighIndex < Tags.length)) {
										UInv.SetCurrentBagName(BagName);
										return Tags[random(LowIndex, HighIndex)];  // Success
									} else {
										UInv.Error("Error: GetRandomBagTagFromRange failed.  HighIndex must be >= LowIndex and =< the highest array index for that property's array.");  // Error
										return null;
									}
								} else {
									UInv.Error('Error: GetRandomBagTagFromRange failed.  LowIndex must be >= 0 and < HighIndex.');  // Error
									return null;
								}
							} else {
								UInv.Error('Error: GetRandomBagTagFromRange failed.  HighIndex must be an integer.');  // Error
								return null;
							}
						} else {
							UInv.Error('Error: GetRandomBagTagFromRange failed.  LowIndex must be an integer.');  // Error
							return null;
						}
					} else {
						UInv.Error('Error: GetRandomBagTagFromRange failed.  Bag property "' + BagPropertyName + '" on bag "' + BagName + '" is not an array.');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetRandomBagTagFromRange cannot find property "' + BagPropertyName + '" on bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetRandomBagTagFromRange cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetRandomBagTagFromRange is not a string.');  // Error
			return null;
		}
	},

	// GetRandomItemTagFromRange: Returns a random tag from LowIndex to HighIndex (inclusive), returns "null" on error.
	GetRandomItemTagFromRange : function (BagName, ItemName, ItemPropertyName, HighIndex, LowIndex) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			if (UInv.isUndefined(LowIndex)) {
				LowIndex = 0;
			}
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						var Tags = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
						if (UInv.isArray(Tags)) {
							if (UInv.isString(HighIndex)) {
								if (UInv.isNumber(parseInt(HighIndex))) {
									HighIndex = parseInt(HighIndex);
								}
							}
							if (UInv.isString(LowIndex)) {
								if (UInv.isNumber(parseInt(LowIndex))) {
									LowIndex = parseInt(LowIndex);
								}
							}
							if (UInv.isInteger(LowIndex)) {
								if (UInv.isInteger(HighIndex)) {
									if ((LowIndex >= 0) && (LowIndex <= HighIndex)) {
										if ((HighIndex >= LowIndex) && (HighIndex < Tags.length)) {
											UInv.SetCurrentBagName(BagName);
											UInv.SetCurrentItemName(ItemName);
											return Tags[random(LowIndex, HighIndex)];  // Success
										} else {
											UInv.Error("Error: GetRandomItemTagFromRange failed.  HighIndex must be >= LowIndex and =< the highest array index for that property's array.");  // Error
											return null;
										}
									} else {
										UInv.Error('Error: GetRandomItemTagFromRange failed.  LowIndex must be >= 0 and < HighIndex.');  // Error
										return null;
									}
								} else {
									UInv.Error('Error: GetRandomItemTagFromRange failed.  HighIndex must be an integer.');  // Error
									return null;
								}
							} else {
								UInv.Error('Error: GetRandomItemTagFromRange failed.  LowIndex must be an integer.');  // Error
								return null;
							}
						} else {
							UInv.Error('Error: GetRandomItemTagFromRange failed.  Item property "' + ItemPropertyName + '" on item "' + ItemName + '" is not an array.');  // Error
							return null;
						}
					} else {
						UInv.Error('Error: GetRandomItemTagFromRange cannot find property "' + ItemPropertyName + '" on item "' + ItemName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetRandomItemTagFromRange cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetRandomItemTagFromRange cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetRandomItemTagFromRange is not a string.');  // Error
			return null;
		}
	},

	// ArrayHasAllItemTags: Returns whether all of the item's tags exist in ItemTagArray, or null on error.
	ArrayHasAllItemTags : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						var Tags = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
						if (!UInv.isArray(Tags)) {
							Tags = [ Tags ];
						}
						if (!UInv.isArray(ItemTagArray)) {
							ItemTagArray = [ ItemTagArray ];
						}
						if ((Tags.length > 0) && (ItemTagArray.length > 0)) {
							var i;
							for (i = 0; i < Tags.length; i++) {
								if (!ItemTagArray.includes(Tags[i])) {
									return false;
								}
							}
							return true;  // Success
						} else {
							return false;  // Success
						}
					} else {
						UInv.Error('Error: ArrayHasAllItemTags failed.  Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: ArrayHasAllItemTags cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: ArrayHasAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to ArrayHasAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWithAllItemTags: Returns an array of all items which have all of their tags in ItemTagArray (per the ArrayHasAllItemTags function), [] if ItemTagArray or the bag is empty, or null on error.
	GetItemsArrayWithAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (!UInv.isArray(ItemTagArray)) {
					ItemTagArray = [ ItemTagArray ];
				}
				var Items = UInv.GetItemsArray(BagName), Result = [];
				if (Items.length > 0) {
					var i;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							if (UInv.ArrayHasAllItemTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
								Result.push(Items[i]);
							}
						}
					}
					return Result;  // Success
				} else {
					return [];  // Success
				}
			} else {
				UInv.Error('Error: GetItemsArrayWithAllItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWithAllItemTags is not a string.');  // Error
			return null;
		}
	},

	// GetItemTagCount: Returns the number of times an exact match for Tag is found in an item's tag array, or "null" on error.
	GetItemTagCount : function (BagName, ItemName, ItemPropertyName, Tag) {
		if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			ItemName = UInv.FixItemName(ItemName);
			if (UInv.BagExists(BagName)) {
				if (UInv.BagHasItem(BagName, ItemName)) {
					if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						var Tags = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName), Result = 0;
						if (!UInv.isArray(Tags)) {
							Tags = [ Tags ];
						}
						if (Tags.length > 0) {
							var i;
							for (i = 0; i < Tags.length; i++) {
								if (Tags[i] === Tag) {
									Result++;
								}
							}
						}
						return Result;  // Success
					} else {
						UInv.Error('Error: GetItemTagCount failed.  Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  // Error
						return null;
					}
				} else {
					UInv.Error('Error: GetItemTagCount cannot find item "' + ItemName + '" in bag "' + BagName + '".');  // Error
					return null;
				}
			} else {
				UInv.Error('Error: GetItemTagCount cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemTagCount is not a string.');  // Error
			return null;
		}
	},

	// GetItemsArrayWithMostItemTags: Returns an array of all items in BagName that are tied for the most tags from ItemTagArray in ItemPropertyName.
	GetItemsArrayWithMostItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				UInv.SetCurrentBagName(BagName);
				if (!UInv.isArray(ItemTagArray)) {
					ItemTagArray = [ ItemTagArray ];
				}
				var Items = UInv.GetItemsArray(BagName);
				if ((Items.length > 0) && (ItemTagArray.length > 0)) {
					var Result = [], Max = 0, i, j, n;
					for (i = 0; i < Items.length; i++) {
						n = 0;
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							for (j = 0; j < ItemTagArray.length; j++) {
								n += UInv.GetItemTagCount(BagName, Items[i], ItemPropertyName, ItemTagArray[j]);
							}
						}
						if (n === Max) {
							Result.push(Items[i]);  // Add item to list
						} else if (n > Max) {
							Result = [ Items[i] ];  // New winner for most tags
							Max = n;
						}
					}
					return Result;  // Success
				} else {
					return [];  // Success
				}
			} else {
				UInv.Error('Error: GetItemsArrayWithMostItemTags cannot find bag "' + BagName + '".');  // Error
				return null;
			}
		} else {
			UInv.Error('Error: Name passed to GetItemsArrayWithMostItemTags is not a string.');  // Error
			return null;
		}
	},


	// UInv Display Functions:
	// =======================

	// UpdatesAreLocked: Returns whether automatic display updates are locked or not.
	UpdatesAreLocked : function () {
		if (UInv.isProperty(State.variables, "UInvUpdatesAreLocked")) {
			return !!State.variables.UInvUpdatesAreLocked;  // Success
		}
		return false;  // Success
	},

	// LockUpdates: Use this to turn on (Bool = false) or off (Bool = true) automatic display updates on Touched events.  Does not prevent manual updates via. UInv.UpdateDisplay().
	LockUpdates : function (Bool) {
		var TF = !!Bool;
		if (TF) {
			State.variables.UInvUpdatesAreLocked = 1;
		} else {
			if (UInv.isProperty(State.variables, "UInvUpdatesAreLocked")) {
				$.wiki("<<forget $UInvUpdatesAreLocked>>");
			}
		}
		return TF;  // Success
	},

	// IncrementUpdateLock: Increments the update lock count.
	IncrementUpdateLock : function () {
		if (UInv.isProperty(State.variables, "UInvUpdatesAreLocked")) {
			++State.variables.UInvUpdatesAreLocked;
		} else {
			State.variables.UInvUpdatesAreLocked = 1;
		}
		return State.variables.UInvUpdatesAreLocked;  // Success
	},

	// DecrementUpdateLock: Increments the update lock count.
	DecrementUpdateLock : function () {
		if (UInv.isProperty(State.variables, "UInvUpdatesAreLocked")) {
			--State.variables.UInvUpdatesAreLocked;
			if (State.variables.UInvUpdatesAreLocked === 0) {
				$.wiki("<<forget $UInvUpdatesAreLocked>>");
				return 0;  // Success
			}
			return State.variables.UInvUpdatesAreLocked;  // Success
		}
		return 0;  // Success
	},

	// GetMatchingEventHandlersArray: Returns an array of the handler ID of all handlers that match the parameters passed in (Handler and/or Options are optional).
	GetMatchingEventHandlersArray : function (Group, Evnt, Options, Handler) {
		if (UInv.isString(Group)) {
			if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
				if (UInv.isString(Evnt)) {
					if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
						var Matches = [], HandlerIDs, Opts, i, j, n;
						if (UInv.isUndefined(Handler)) {
							if (UInv.isUndefined(Options)) {  // Get all items that match group and event names.
								return Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);  // Success
							} else if (Options === false) {  // Find all matching items that don't have options.
								HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
								for (i = 0; i < HandlerIDs.length; i++) {
									if (!UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]], "options")) {
										Matches.push(HandlerIDs[i]);
									}
								}
								return Matches;  // Success
							} else {  // Find items that also match all options.
								HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
								for (i = 0; i < HandlerIDs.length; i++) {
									n = 0;
									Opts = Object.keys(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].options);
									for (j = 0; j < Opts.length; j++) {
										if (UInv.isProperty(Options, Opts[j])) {
											if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].options[Opts[j]] == Options[Opts[j]]) {
												n++;
											} else {
												break;
											}
										} else {
											break;
										}
									}
									if (n == Opts.length) {
										Matches.push(HandlerIDs[i]);
									}
								}
								return Matches;  // Success
							}
						} else if (UInv.isString(Handler)) {
							if (UInv.isUndefined(Options)) {  // Find items that match handler name.
								HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
								for (i = 0; i < HandlerIDs.length; i++) {
									if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].handler == Handler) {
										Matches.push(HandlerIDs[i]);
									}
								}
							} else if (Options === false) {  // Find all matching items that don't have options.
								HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
								for (i = 0; i < HandlerIDs.length; i++) {
									if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].handler == Handler) {
										if (!UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]], "options")) {
											Matches.push(HandlerIDs[i]);
										}
									}
								}
								return Matches;  // Success
							} else {  // Find items that match handler name and all options.
								HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
								Opts = Object.keys(Options);
								for (i = 0; i < HandlerIDs.length; i++) {
									if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].handler == Handler) {
										n = 0;
										for (j = 0; j < Opts.length; j++) {
											if (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]], Opts[j])) {
												if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]][Opts[j]] == Options[Opts[j]]) {
													n++;
												} else {
													break;
												}
											} else {
												break;
											}
										}
										if (n == Opts.length) {
											Matches.push(HandlerIDs[i]);
										}
									}
								}
							}
							return Matches;  // Success
						} else {
							UInv.Error('Error: Handler passed to GetMatchingEventHandlersArray must be undefined or a string.');  // Error
							return false;
						}
					} else {
						return [];  // Success - Event doesn't have any handlers
					}
				} else {
					UInv.Error('Error: Event passed to GetMatchingEventHandlersArray must be a string.');  // Error
					return false;
				}
			} else {
				return [];  // Success - Group doesn't have any handlers
			}
		} else {
			UInv.Error('Error: Group passed to GetMatchingEventHandlersArray must be a string.');  // Error
			return false;
		}
	},

	// AddEventHandler: Adds an event handler to UInv that will call the setup function or widget when that UInv event is triggered.
	//					Returns the random handle ID on success, or false on error.
	AddEventHandler : function (Group, Evnt, Handler, Options) {
		if (UInv.isString(Group)) {
			if (UInv.isString(Evnt)) {
				if (UInv.isString(Handler)) {
					var UInvEvents = {
						general : ["MouseDown", "MouseUp"],
						bag : ["Touched"],
						table : ["Accept", "DragStart", "DragStop", "Drop"],
						radialMenu : ["Open", "WedgeClick", "DisabledWedgeClick", "Cancel"],
						cacheImages : ["Loaded", "Error"]
					};
					if (UInv.isProperty(UInvEvents, Group)) {
						if (UInvEvents[Group].includes(Evnt)) {
							if (!UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
								State.variables.UInvEventHandlers[Group] = {};
							}
							if (!UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
								State.variables.UInvEventHandlers[Group][Evnt] = {};
							}
							// Generate unique random handle name
							var HandleID = "handle" + UInv.getRandomHexString();
							while (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt], HandleID)) {
								HandleID = "handle" + UInv.getRandomHexString();
							}
							if (UInv.isUndefined(Options)) {
								if (UInv.GetMatchingEventHandlersArray(Group, Evnt, undefined, Handler).length === 0) {  // Add handler
									if (UInv.isFunction(setup[Handler])) {
										State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "function" };
									} else {
										State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "widget" };
									}
								} else {
									return UInv.GetMatchingEventHandlersArray(Group, Evnt, undefined, Handler)[0];  // Success - handler already exists
								}
							} else {  // Add handler and options
								if (UInv.isObject(Options)) {
									if (UInv.GetMatchingEventHandlersArray(Group, Evnt, Options, Handler).length === 0) {  // Add handler
										if (UInv.isFunction(setup[Handler])) {
											State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "function", options: clone(Options) };
										} else {
											State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "widget", options: clone(Options) };
										}
									} else {
										return UInv.GetMatchingEventHandlersArray(Group, Evnt, Options, Handler)[0];  // Success - handler already exists
									}
								} else {
									UInv.Error('Error: Options passed to AddEventHandler must be undefined or an object.');  // Error
									return false;
								}
							}
							return HandleID;  // Success
						} else {
							UInv.Error('Error: Event "' + Evnt + '" passed to AddEventHandler is not a valid event for group "' + Group + '".');  // Error
							return false;
						}
					} else {
						UInv.Error('Error: Group "' + Group + '" passed to AddEventHandler is not a valid group.');  // Error
						return false;
					}
				} else {
					UInv.Error('Error: Handler passed to AddEventHandler must be a string.');  // Error
					return false;
				}
			} else {
				UInv.Error('Error: Event passed to AddEventHandler must be a string.');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: Group passed to AddEventHandler must be a string.');  // Error
			return false;
		}
	},

	// GetEventHandlerByID: Returns a UInv handler object if a matching one is found, or null if one doesn't exist, or false on error.
	GetEventHandlerByID : function (Group, Evnt, HandlerID) {
		if (UInv.isString(Group)) {
			if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
				if (UInv.isString(Evnt)) {
					if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
						if (UInv.isString(HandlerID)) {
							if (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt], HandlerID)) {
								return clone(State.variables.UInvEventHandlers[Group][Evnt][HandlerID]);
							} else {
								return null;  // Success - HandlerID not found
							}
						} else {
							UInv.Error('Error: HandlerID passed to GetEventHandlerByID must be a string.');  // Error
							return false;
						}
					} else {
						return null;  // Success - Event doesn't have any handlers
					}
				} else {
					UInv.Error('Error: Event passed to GetEventHandlerByID must be a string.');  // Error
					return false;
				}
			} else {
				return null;  // Success - Group doesn't have any handlers
			}
		} else {
			UInv.Error('Error: Group passed to GetEventHandlerByID must be a string.');  // Error
			return false;
		}
	},

	// CallEventHandlerEx: Triggers any matching event handlers and passes the Values object to them.
	//					   Returns an array of returned objects from all triggered handlers, or false on error.
	CallEventHandlerEx : function (Group, Evnt, Values) {
		if (UInv.isString(Group)) {
			if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
				if (UInv.isString(Evnt)) {
					if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
						var Result = [], Ret, Handler, i, HandlerIDs = UInv.GetMatchingEventHandlersArray(Group, Evnt, Values);  // Get specific matching event handlers
						if (HandlerIDs.length === 0) {  // Get general matching event handlers
							HandlerIDs = UInv.GetMatchingEventHandlersArray(Group, Evnt, false);
						}
						for (i = 0; i < HandlerIDs.length; i++) {
							Handler = UInv.GetEventHandlerByID(Group, Evnt, HandlerIDs[i]);
							Values.eventGroup = Group;
							Values.eventType = Evnt;
							Values.handlerID = HandlerIDs[i];
							if (Handler.type == "function") {
								Ret = setup[Handler.handler](Values);
								if (UInv.isGenericObject(Ret)) {
									Result.push(Ret);
								} else {
									Result.push(undefined);
								}
							} else if (Handler.type == "widget") {
								State.temporary.UInvEvent = Values;
								$.wiki("<<" + Handler.handler + " _UInvEvent>>");
								if (UInv.isProperty(State.temporary, "UInvReturn")) {
									if (UInv.isGenericObject(State.temporary.return)) {
										Result.push(State.temporary.return);
									} else {
										Result.push(undefined);
									}
									$.wiki("<<forget _UInvReturn>>");
								}
								$.wiki("<<forget _UInvEvent>>");
							}
						}
						return Result;
					} else {
						return [];  // Success - Event doesn't have any handlers
					}
				} else {
					UInv.Error('Error: Event passed to CallEventHandlerEx must be a string.');  // Error
					return false;
				}
			} else {
				return [];  // Success - Group doesn't have any handlers
			}
		} else {
			UInv.Error('Error: Group passed to CallEventHandlerEx must be a string.');  // Error
			return false;
		}
	},

	// CallEventHandler: Triggers any matching event handlers and passes the Values object to them.
	//					 Returns a generic object from all of the combined returned objects from all triggered handlers, or false on error.
	CallEventHandler : function (Group, Evnt, Values) {
		if (UInv.isString(Group)) {
			if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
				if (UInv.isString(Evnt)) {
					if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
						var Result = {}, Ret = UInv.CallEventHandlerEx(Group, Evnt, Values);
						if (Ret.length > 0) {
							var i, j, Props;
							for (i = 0; i < Ret.length; i++) {
								if (UInv.isGenericObject(Ret[i])) {
									Props = Object.keys(Ret[i]);
									for (j = 0; j < Props.length; j++) {
										if (UInv.isProperty(Result, Props[j])) {
											switch(Props[j]) {
												case "stopPropagation":
													if (Result.stopPropagation || Ret[i].stopPropagation) {
														Result.stopPropagation = true;  // Prefer to override default
													} else {
														Result.stopPropagation = Ret[i].stopPropagation;
													}
													break;
												case "acceptVal":
													if (!Result.acceptVal || !Ret[i].acceptVal) {
														Result.acceptVal = false;  // Prefer to override default
													} else {
														Result.acceptVal = Ret[i].acceptVal;
													}
													break;
												case "overrideDefaultAction":
													if (Result.overrideDefaultAction || Ret[i].overrideDefaultAction) {
														Result.overrideDefaultAction = true;  // Prefer to override default
													} else {
														Result.overrideDefaultAction = Ret[i].overrideDefaultAction;
													}
													break;
												case "openRadialMenu":
													if (Result.openRadialMenu || Ret[i].openRadialMenu) {
														Result.openRadialMenu = true;  // Prefer to override default
													} else {
														Result.openRadialMenu = Ret[i].openRadialMenu;
													}
													break;
												case "radialMenuWedgeItems":
													Result = UInv.combineGenericObjects(Result, Ret[i]);
													break;
												case "radialMenuHandler":  // modify AddEventHandler to accept an array of handlers, then pass the array created here? ***
													Result.radialMenuHandler = Ret[i].radialMenuHandler;
													/*
													if (UInv.isArrayOfStrings(Result.radialMenuHandler)) {
														Result.radialMenuHandler.push(Ret[i].radialMenuHandler);
													} else {
														Result.radialMenuHandler = [Result.radialMenuHandler, Ret[i].radialMenuHandler];
													}
													*/
													break;
												case "radialMenuOptions":
													Result = UInv.combineGenericObjects(Result, Ret[i]);
													break;
												case "keepOpen":
													if (Result.keepOpen || Ret[i].keepOpen) {
														Result.keepOpen = true;  // Prefer to override default
													} else {
														Result.keepOpen = Ret[i].keepOpen;
													}
													break;
												case "retryLoad":
													if (Result.retryLoad || Ret[i].retryLoad) {
														Result.retryLoad = true;  // Prefer to override default
													} else {
														Result.retryLoad = Ret[i].retryLoad;
													}
													break;
												default:
													Result[Props[j]] = Ret[i][Props[j]];
											}
										} else {
											Result[Props[j]] = Ret[i][Props[j]];
										}
									}
								}
							}
						}
						return Result;
					} else {
						return {};  // Success - Event doesn't have any handlers
					}
				} else {
					UInv.Error('Error: Event passed to CallEventHandler must be a string.');  // Error
					return false;
				}
			} else {
				return {};  // Success - Group doesn't have any handlers
			}
		} else {
			UInv.Error('Error: Group passed to CallEventHandler must be a string.');  // Error
			return false;
		}
	},

	// DeleteEventHandler: Deletes any matching event handlers.  Returns the number of deleted handlers, or false on error.
	DeleteEventHandler : function (Group, Evnt, Handler, Options) {
		if (UInv.isString(Group)) {
			if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
				if (UInv.isString(Evnt)) {
					if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
						if (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt], Handler)) {
							delete State.variables.UInvEventHandlers[Group][Evnt][Handler];
							return 1;  // Success - Deleted by HandlerID
						} else {
							var i, HandlerIDs = UInv.GetMatchingEventHandlersArray(Group, Evnt, Options, Handler);
							for (i = 0; i < HandlerIDs.length; i++) {
								delete State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]];
							}
							return HandlerIDs.length;  // Success
						}
					} else {
						return 0;  // Success - Event doesn't have any handlers
					}
				} else {
					UInv.Error('Error: Event passed to DeleteEventHandler must be a string.');  // Error
					return false;
				}
			} else {
				return 0;  // Success - Group doesn't have any handlers
			}
		} else {
			UInv.Error('Error: Group passed to DeleteEventHandler must be a string.');  // Error
			return false;
		}
	},

	// FixTableCells: Makes sure each item is assigned a unique cell.  Tries to make sure items will display in table UInvTable if that parameter is used, assuming there is enough room.
	FixTableCells : function (BagName, UInvTable) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				var Items = UInv.GetItemsArray(BagName);
				if (Items.length > 0) {
					var i, j, Val, Dups, Cell = 0, MaxCell = Infinity;
					if (!UInv.isUndefined(UInvTable)) {
						if (UInvTable.data("uinv") === "table") {
							if (UInvTable.attr("id") == BagName) {
								i = UInvTable.data("cellrows");
								j = UInvTable.data("cellcolumns");
								if (UInv.isInteger(i) && (i > 0) && UInv.isInteger(j) && (j > 0)) {
									MaxCell = (i * j) - 1;  // move items if they won't display in current table
								}
							} else {
								UInv.Error('Error: UInvTable passed to FixTableCells does not match BagName of "' + BagName + '".');  // Error
								return false;
							}
						} else {
							UInv.Error('Error: UInvTable passed to FixTableCells is not a UInv table element.');  // Error
							return false;
						}
					}
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], "UInvCell")) {
							// Make sure there are no duplicates
							Val = UInv.GetItemPropertyValue(BagName, Items[i], "UInvCell");
							if (Val > MaxCell) {
								// Move item if it won't display in current table
								while (UInv.GetItemCountWherePropertyEquals(BagName, "UInvCell", Cell) > 0) {
									++Cell;
								}
								UInv.SetItemPropertyValue(BagName, Items[i], "UInvCell", Cell++);
							} else {
								if (UInv.GetItemCountWherePropertyEquals(BagName, "UInvCell", Val) > 1) {
									// Unmark duplicates
									Dups = UInv.GetItemsArrayWherePropertyEquals(BagName, "UInvCell", Val);
									Dups.delete(Items[i]);  // Current item stays put
									for (j = 0; j < Dups.length; j++) {
										UInv.DeleteItemProperty(BagName, Dups[j], "UInvCell");
									}
								}
							}
						} else {
							// Give item a cell
							while (UInv.GetItemCountWherePropertyEquals(BagName, "UInvCell", Cell) > 0) {
								++Cell;
							}
							UInv.SetItemPropertyValue(BagName, Items[i], "UInvCell", Cell++);
						}
					}
				}
				return true;  // Success
			} else {
				UInv.Error('Error: FixTableCells cannot find bag "' + BagName + '".');  // Error
				return false;
			}
		} else {
			UInv.Error('Error: BagName passed to FixTableCells is not a string.');  // Error
			return false;
		}
	},

	// InitializeRadialMenu: Create radial menu div element.
	InitializeRadialMenu : function () {
		var el = document.createElement("div");
		el.id = "uinv-radial-menu";
		el.style.position = "absolute";
		el.style.transition = "transform 200ms ease-in, opacity 200ms ease-in";
		el.style["pointer-events"] = "none";
		el.dataset.status = "closed";
		el.style.transform = "scale(0, 0)";
		el.style.opacity = 0;
		el.style.zIndex = 9999;
		document.body.appendChild(el);
	},

	// DisplayRadialMenu: Gets radial menu prepared for use.
	DisplayRadialMenu : function (WedgeItems, Pos, Handler, Options) {
		function getPoint (theta, r, posOffset, negOffset) {
			if (typeof posOffset == "undefined") {
				posOffset = { x: 0, y: 0 };
			}
			if (typeof negOffset == "undefined") {
				negOffset = { x: 0, y: 0 };
			}
			return { x: (r*Math.cos(theta)) + posOffset.x - negOffset.x, y: (r*Math.sin(theta)) + posOffset.y - negOffset.y };
		}
		function wedgePath (i, clr, ctr, r1, a1, b1, r2, a2, b2) {
			var start1 = getPoint(a1, r1, ctr), end1 = getPoint(b1, r1, ctr, start1);
			var start2 = getPoint(b2, r2, ctr), end2 = getPoint(a2, r2, ctr, start2);
			var path = '<path d="M' + start1.x + ',' + start1.y + ' a' + r1 + ',' + r1 + ' 0 0,1 ' + end1.x + ',' + end1.y;
			path += ' L' + start2.x + ',' + start2.y + ' a' + r2 + ',' + r2 + ' 0 0,0 ' + end2.x + ',' + end2.y + ' z" fill="';
			if (clr == "mask") {  // wedge mask
				path += 'white" />';
			} else if (WedgeItems[i+1].disabled !== true) {  // clickable wedge
				path += clr + '" class="uinv-wedge" data-id="' + (i+1) + '" data-data="' + WedgeItems[i+1].data;
				path += '" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '" pointer-events="auto">';
					if (showTooltips) {  // deepscan-disable-line
					path += '<title> ' + WedgeItems[i+1].hint + '</title>';
				}
				path += '<desc>' + WedgeItems[i+1].hint + '</desc></path>';  // for blind users
			} else {  // disabled wedge
				path += disabledColor + '" class="uinv-disabled-wedge" data-id="' + (i+1) + '" data-data="' + WedgeItems[i+1].data;
				path += '" stroke="' + disabledStrokeColor + '" stroke-width="' + disabledStrokeWidth + '" pointer-events="auto">';
					if (showTooltips) {  // deepscan-disable-line
					path += '<title> ' + WedgeItems[i+1].hint + ' (disabled)</title>';
				}
				path += '<desc>' + WedgeItems[i+1].hint + ' (disabled)</desc></path>';  // for blind users
			}
			return path;
		}
		function wedges (ctr, n, r1, r2, gap, clr) {
			var tGap1 = gap/r1, tGap2 = gap/r2;
			var dTheta = (2*Math.PI)/n, paths = [];
			var theta = (-0.5*Math.PI) - (0.5*dTheta), i;
			for (i = 0; i < n; i++) {
				if (WedgeItems[i+1] !== undefined) {
					paths.push( wedgePath(i, clr, ctr,
						r1, theta + tGap1, (theta + dTheta) - tGap1,
						r2, theta + tGap2, (theta + dTheta) - tGap2
					) );
				}
				theta += dTheta;
			}
			return paths.join("\n");
		}
		function wedgeClickHandler (ev) {

			function WedgeUpdate (Arr, DataName, Opts) {
				var i, DatNo = -1;
				for (i = 0; i < Arr.length; i++) {
					if (Arr[i].data == DataName) {
						DatNo = i;
						break;
					}
				}
				if (DatNo >=0) {
					var Keys = Object.keys(Opts);
					for (i = 0; i < Keys.length; i++) {
						Arr[DatNo][Keys[i]] = Opts[Keys[i]];
					}
				} else {
					if (UInv.GetUserAlerts() & UInv.ERROR_TO_CONSOLE) {
						console.log('Warning: Nonexistent DataName "' + DataName + '" passed to WedgeUpate.');  // Throw a proper error here? ***
					}
				}
				return Arr;
			}

			if (ev.button == 0) {
				var Ret, el, RM = setup.UInvRadialMenuData;
				var Quant = UInv.BagHasItem(RM.srcBag, RM.draggedItem);
				var data = $(this).data("data");
				ev.stopPropagation();
				ev.wedgeID = $(this).data("id");
				ev.wedgeData = data;
				ev.srcBag = RM.srcBag;
				ev.draggedItem = RM.draggedItem;
				ev.oldCellNo = RM.oldCellNo;
				ev.destBag = RM.destBag;
				ev.droppedOnItem = RM.droppedOnItem;
				ev.newCellNo = RM.newCellNo;
				ev.radialMenuWedgeItems = clone(RM.radialMenuWedgeItems);
				ev.pos = clone(RM.pos);
				ev.radialMenuHandler = RM.radialMenuHandler;
				ev.radialMenuOptions = clone(RM.radialMenuOptions);
				if ($(this).hasClass("uinv-wedge")) {
					ev.wedgeDisabled = false;
					Ret = UInv.CallEventHandler("radialMenu", "WedgeClick", ev);  // radialMenu WedgeClick event
					if (UInv.isUndefined(Ret.radialMenuWedgeItems)) {
						Ret.radialMenuWedgeItems = clone(RM.radialMenuWedgeItems);
					}
					if (UInv.isUndefined(Ret.radialMenuHandler)) {
						Ret.radialMenuHandler = RM.radialMenuHandler;
					}
					if (UInv.isUndefined(Ret.radialMenuOptions)) {
						Ret.radialMenuOptions = clone(RM.radialMenuOptions);
					}
					if (Ret.overrideDefaultAction !== true) {
						switch(data) {
							case "DropAll":
								UInv.SetItemPropertyValue(RM.srcBag, RM.draggedItem, "UInvCell", RM.newCellNo);
								if (RM.destBag != RM.srcBag) {  // Move to new bag
									UInv.MoveItem(RM.srcBag, RM.destBag, RM.draggedItem);
								}
								break;
							case "Drop1":
							case "DropHalf":
							case "DropQuarter":
								UInv.IncrementUpdateLock();
								var TempBag = UInv.GetUniqueBagName(), Amt = 1;
								if (data == "DropHalf") {
									Amt = Math.trunc(Quant * 0.5);
								} else if (data == "DropQuarter") {
									Amt = Math.trunc(Quant * 0.25);
								}
								UInv.CreateBag(TempBag);
								UInv.MoveItem(RM.srcBag, TempBag, RM.draggedItem, Amt);
								UInv.SetItemPropertyValue(TempBag, RM.draggedItem, "UInvCell", RM.newCellNo);
								UInv.MoveItem(TempBag, RM.destBag, RM.draggedItem);
								UInv.DeleteBag(TempBag);
								Ret.keepOpen = true;
								UInv.DecrementUpdateLock();
								UInv.UpdateDisplay();
								break;
							case "Take1":
								UInv.IncrementUpdateLock();
								UInv.MoveItem(RM.destBag, RM.srcBag, RM.draggedItem, 1);
								Ret.keepOpen = true;
								UInv.DecrementUpdateLock();
								UInv.UpdateDisplay();
								break;
						}
						Quant = UInv.BagHasItem(RM.srcBag, RM.draggedItem);
						/* Default:
							{ icon: "fa-plus-square", hint: "Drop all (" + Quant + " items)", data: "DropAll" }
							{ icon: "plus-one_white.svg", hint: "Drop one", data: "Drop1" }
							{ icon: "plus-half_white.svg", hint: "Drop half", data: "DropHalf" }
							{ icon: "minus-one_white.svg", hint: "Take one", data: "Take1" }
							{ icon: "plus-quarter_white.svg", hint: "Drop 1/4th", data: "DropQuarter" }
							fa-sync-alt = swap items
							fa-times-circle = cancel radial menu
						*/
						WedgeUpdate(Ret.radialMenuWedgeItems, "DropAll", { hint: "Drop all (" + Quant + " items)" });
						if (Quant == 1) {
							WedgeUpdate(Ret.radialMenuWedgeItems, "Drop1", { disabled: true, hint: "Drop one" });
						} else {
							WedgeUpdate(Ret.radialMenuWedgeItems, "Drop1", { disabled: false, hint: "Drop one (of " + Quant + " items)" });
						}
						if (Quant < 4) {
							WedgeUpdate(Ret.radialMenuWedgeItems, "DropHalf", { disabled: true, hint: "Drop half" });
						} else {
							WedgeUpdate(Ret.radialMenuWedgeItems, "DropHalf", { disabled: false, hint: "Drop half (" + Math.trunc(Quant * 0.5) + " of " + Quant + " items)" });
						}
						if (!UInv.ItemsMatch(RM.srcBag, RM.draggedItem, RM.destBag, RM.droppedOnItem)) {  // Don't allow picking up items when they're not the same type
							WedgeUpdate(Ret.radialMenuWedgeItems, "Take1", { disabled: true, hint: "Pick up one" });
						} else {
							WedgeUpdate(Ret.radialMenuWedgeItems, "Take1", { disabled: false, hint: "Pick up one (of " + UInv.BagHasItem(RM.destBag, RM.droppedOnItem) + " items)" });
						}
						if (Quant < 8) {
							WedgeUpdate(Ret.radialMenuWedgeItems, "DropQuarter", { disabled: true, hint: "Drop 1/4th" });
						} else {
							WedgeUpdate(Ret.radialMenuWedgeItems, "DropQuarter", { disabled: false, hint: "Drop 1/4th (" + Math.trunc(Quant * 0.25) + " of " + Quant + " items)" });
						}
						RM.radialMenuWedgeItems = clone(Ret.radialMenuWedgeItems);
						RM.radialMenuHandler = Ret.radialMenuHandler;
						RM.radialMenuOptions = clone(Ret.radialMenuOptions);
						UInv.DisplayRadialMenu(Ret.radialMenuWedgeItems, Pos, Ret.radialMenuHandler, Ret.radialMenuOptions);
					}
					if (Ret.keepOpen !== true) {
						el = $("#uinv-radial-menu").get(0);
						el.dataset.status = "closed";
						el.style.transform = "scale(0, 0)";
						el.style.opacity = 0;
					}
				} else {
					ev.wedgeDisabled = true;
					Ret = UInv.CallEventHandler("radialMenu", "DisabledWedgeClick", ev);  // radialMenu DisabledWedgeClick event
					if (Ret.keepOpen === false) {
						el = $("#uinv-radial-menu").get(0);
						el.dataset.status = "closed";
						el.style.transform = "scale(0, 0)";
						el.style.opacity = 0;
					}
				}
			}
		}

		/*
		var WedgeItems = [{ icon: "menu-burger_white.svg", hint: "Show menu", data: "menu", disabled: true },  // any double-quotes in WedgeItems[#].data need to be escaped ***
					{ icon: "fa-image", hint: "Show image", data: "image" },
					{ icon: "fa-headphones", hint: "Show audio", data: "audio", disabled: true },
					{ icon: "fa-home", hint: "Return to main page", data: "home" },
					,  // handle undefined wedges as blank spaces
					{ icon: "fa-video", hint: "Show video", data: "video" },
					{ icon: "fa-envelope", hint: "Show email", data: "email" }];
		Default Options:
				{
					iconSize: 32, radius: 100, gap: 1, pad: 2, iconColor: "white", showTooltips: true,
					innerGradientColor: "rgb(4,111,191)", innerGradientOpacity: 1, innerGradientOffset: 0,
					outerGradientColor: "rgb(4,111,191)", outerGradientOpacity: 0, outerGradientOffset: 100,
					hoverColor: "rgba(0,144,226,0.3)", strokeColor: "#0090e2", strokeWidth: 0, 
					disabledColor: "rgba(128,128,128,0.5)", disabledOpacity: "0.4", disabledStrokeColor: "#0090e2", disabledStrokeWidth: 0
				}
		*/
		// Radial menu init
		var div = $("#uinv-radial-menu").get(0);
		if (UInv.isUndefined(div)) {
			UInv.InitializeRadialMenu();
			div = $("#uinv-radial-menu").get(0);
		}
		if (!UInv.isArrayOfObjects(WedgeItems)) {
			UInv.Error('Error: DisplayRadialMenu failed.  WedgeItems parameter is not an array of objects.');  // Error
			return false;
		}
		if (WedgeItems.length === 0) {
			return true;  // Success
		}
		if (UInv.isUndefined(Options) || !UInv.isGenericObject(Options)) {
			Options = {};
		}
		div.radialMenuWedgeItems = WedgeItems;
		div.radialMenuHandler = Handler;
		div.radialMenuOptions = Options;
		var Ret = UInv.CallEventHandler("radialMenu", "Open", div);  // radialMenu Open event
		if (UInv.isProperty(Ret, "radialMenuWedgeItems")) {
			WedgeItems = Ret.radialMenuWedgeItems;
		}
		if (UInv.isProperty(Ret, "radialMenuHandler")) {
			Handler = Ret.radialMenuHandler;
		}
		if (UInv.isProperty(Ret, "radialMenuOptions")) {
			Options = Ret.radialMenuOptions;
		}
		if (!UInv.isUndefined(Handler) && UInv.isString(Handler)) {
			UInv.AddEventHandler("radialMenu", "Open", Handler);
			UInv.AddEventHandler("radialMenu", "WedgeClick", Handler);
			UInv.AddEventHandler("radialMenu", "DisabledWedgeClick", Handler);
			UInv.AddEventHandler("radialMenu", "Cancel", Handler);
		}
		var num = WedgeItems.length - 1;  // num = number of outer ring options
		var r1M = Options.iconSize ? Options.iconSize : 32;  // r1M = icon height/width in pixels
		var r2M = Options.radius ? Options.radius : 100;  // r2M = radial menu radius in pixels
		var gapM = Options.gap ? Options.gap : 1;  // gapM = circle and wedge gap size???
		var pad = Options.pad ? Options.pad : 2;  // pad = circle and wedge margin???
		var iconColor = Options.iconColor ? Options.iconColor : "white";
		var showTooltips = Options.showTooltips ? Options.showTooltips : true;
		var innerGradientColor = Options.innerGradientColor ? Options.innerGradientColor : "rgb(4,111,191)";
		var innerGradientOpacity = Options.innerGradientOpacity ? Options.innerGradientOpacity : 1;
		var innerGradientOffset = Options.innerGradientOffset ? Options.innerGradientOffset : 0;
		var outerGradientColor = Options.outerGradientColor ? Options.outerGradientColor : "rgb(4,111,191)";
		var outerGradientOpacity = Options.outerGradientOpacity ? Options.outerGradientOpacity : 0;
		var outerGradientOffset = Options.outerGradientOffset ? Options.outerGradientOffset : 100;
		var hoverColor = Options.hoverColor ? Options.hoverColor : "rgba(0,144,226,0.3)";
		var strokeColor = Options.strokeColor ? Options.strokeColor : "#0090e2";
		var strokeWidth = Options.strokeWidth ? Options.strokeWidth : 0;
		var disabledColor = Options.disabledColor ? Options.disabledColor : "rgba(128,128,128,0.5)";
		var disabledOpacity = Options.disabledOpacity ? Options.disabledOpacity : "0.4";
		var disabledStrokeColor = Options.disabledStrokeColor ? Options.disabledStrokeColor : "#0090e2";
		var disabledStrokeWidth = Options.disabledStrokeWidth ? Options.disabledStrokeWidth : 0;
		var center = { x: r2M + pad, y: r2M + pad };
		var w = (2*r2M) + (2*pad), h = (2*r2M) + (2*pad);
		div.dataset.r = r2M;
		$(div).find(".uinv-wedge").off("mouseup");
		$(div).find(".uinv-disabled-wedge").off("mouseup");
		// Add wedge hover styling
		if (!UInv.docHasCSSElement(".uinv-wedge:hover")) {
			var styleEl = document.createElement("style");
			styleEl.title = "uinv-hover";
			document.head.appendChild(styleEl);
			var styleSheet = styleEl.sheet;
			styleSheet.insertRule(".uinv-wedge:hover { fill: " + hoverColor + "; }", 0);
		}
		// Create the radial menu as an SVG element
		var svg = '<svg id="uinv-radial-menu-svg" style="display: block; width: ' + w + 'px; height: ' + h + 'px;">';
		// Centered gradient background
		svg += '<defs><radialGradient id="Gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">';
		svg += '<stop offset="' + innerGradientOffset + '%" style="stop-color:' + innerGradientColor + '; stop-opacity:' + innerGradientOpacity + '" />';
		svg += '<stop offset="' + outerGradientOffset + '%" style="stop-color:' + outerGradientColor + '; stop-opacity:' + outerGradientOpacity + '" />';
		svg += '</radialGradient>';
		// Radial menu mask so Gradient background is visible
		svg += '<mask id="Mask">';
		if (WedgeItems[0] !== undefined) {
			svg += '<circle cx="' + center.x + '" cy="' + center.y + '" r="' + (r1M - (2*gapM)) + '" fill="white" />';
		}
		svg += wedges(center, num, r1M, r2M, gapM, "mask") + '</mask></defs>';
		// Background circle
		svg += '<circle id="uinv-radial-menu-bkg" cx="' + center.x + '" cy="' + center.y + '" r="' + r2M + '" fill="url(#Gradient)" mask="url(#Mask)" pointer-events="none" />';
		// Main circle
		if (WedgeItems[0] !== undefined) {
			svg += '<circle data-id="0" data-data="' + WedgeItems[0].data + '" cx="' + center.x + '" cy="' + center.y + '" r="' + (r1M - (2*gapM)) + '"';
			if (WedgeItems[0].disabled !== true) {
				svg += ' class="uinv-wedge" fill="transparent" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '" pointer-events="auto">';
				if (showTooltips) {  // deepscan-disable-line
					svg += '<title> ' + WedgeItems[0].hint + '</title>';
				}
				svg += '<desc>' + WedgeItems[0].hint + '</desc></circle>';  // for blind users
			} else {
				svg += ' class="uinv-disabled-wedge" fill="' + disabledColor + '" stroke="' + disabledStrokeColor + '" stroke-width="' + disabledStrokeWidth + '" pointer-events="auto">';
				if (showTooltips) {  // deepscan-disable-line
					svg += '<title> ' + WedgeItems[0].hint + ' (disabled)</title>';
				}
				svg += '<desc>' + WedgeItems[0].hint + ' (disabled)</desc></circle>';  // for blind users
			}
		}
		// Main wedges
		svg += wedges(center, num, r1M, r2M, gapM, "transparent") + '</svg>';
		div.style.width = w + "px";
		div.style.height = h + "px";
		// Starting size and opacity
		div.style.transform = "scale(0, 0)";
		div.style.opacity = 0;
		$(div).html(svg);
		// Add center icon/image
		var thetaM = -0.5*Math.PI, el, elCenter, pic, isImg, i;
		for (i = 0; i < WedgeItems.length; i++) {
			isImg = false;
			if (WedgeItems[i] !== undefined) {  // Add wedge icons/images
				pic = WedgeItems[i].icon;
				if ((/^fa-*/).test(pic) && !(/\./).test(pic)) {  // if icon starts with "fa-" and does not contain ".", then assume it's a Font Awesome glyph
					el = document.createElement("div");
					el.className = "fa " + pic;
				} else {
					isImg = true;
					el = document.createElement("img");
				}
				if (i === 0) {
					elCenter = getPoint(thetaM, 0, center);
				} else {
					elCenter = getPoint(thetaM, (r1M + r2M)/2, center);
				}
				el.style.position = "absolute";
				el.style.color = iconColor;
				el.style.width = r1M + "px";
				el.style.height = r1M + "px";
				el.style.top = Math.round(elCenter.y - (r1M/2)) + "px";
				el.style.left = Math.round(elCenter.x - (r1M/2)) + "px";
				el.style["line-height"] = r1M + "px";
				el.style["font-size"] = r1M + "px";
				el.style["text-align"] = "center";
				el.style["pointer-events"] = "none";
				// prevent text and images from being highlighted/selected
				el.style["-webkit-touch-callout"] = "none";  // iOS Safari
				el.style["-webkit-user-select"] = "none";  // Safari
				el.style["-khtml-user-select"] = "none";  // Konqueror HTML
				el.style["-moz-user-select"] = "none";  // Firefox
				el.style["-ms-user-select"] = "none";  // Internet Explorer/Edge
				el.style["user-select"] = "none";  // Non-prefixed version, currently supported by Chrome and Opera
				if (WedgeItems[i].disabled === true) {
					el.style.opacity = disabledOpacity;
				}
				if (isImg) {
					el.src = setup.ImagePath + pic;
				}
				div.appendChild(el);
			}
			if (i !== 0) {
				thetaM += (2*Math.PI)/(WedgeItems.length - 1);
			}
		}
		$(div).find(".uinv-wedge").on("mouseup", wedgeClickHandler);
		$(div).find(".uinv-disabled-wedge").on("mouseup", wedgeClickHandler);
		$(div).css({
			left: Math.round(Pos.x - r2M + window.scrollX) + "px",
			top: Math.round((Pos.y - (2*r2M)) + r2M + window.scrollY) + "px",
			transform: "scale(1, 1)",
			opacity: 1
		});
		div.dataset.status = "opened";
		return true;  // Success
	},

	// DisplayItemList: Displays all items in a bag in a single string.
	DisplayItemList : function (BagName, PluralItemPropertyName, EmptyString, SeparatorString, ConjunctionString, SingleItemPropertyName) {
		if (UInv.isString(BagName)) {
			BagName = UInv.FixBagName(BagName);
			if (UInv.BagExists(BagName)) {
				if (!UInv.isString(PluralItemPropertyName)) {
					PluralItemPropertyName = "";
				}
				if (!UInv.isString(EmptyString)) {
					EmptyString = "nothing";
				}
				if (!UInv.isString(SeparatorString)) {
					SeparatorString = ",";
				}
				if (!UInv.isString(ConjunctionString)) {
					ConjunctionString = "and";
				}
				if (!UInv.isString(SingleItemPropertyName)) {
					SingleItemPropertyName = "";
				}
				var Items = UInv.GetItemsArray(BagName);
				if (Items.length > 0) {
					var Result = "", i = 0, Amt = 0;
					UInv.ClearErrors();
					for (i = 0; i < Items.length; i++) {
						if ((i === Items.length - 1) && (i !== 0) && (ConjunctionString !== "")) {
							Result += ConjunctionString + " ";
						}
						Amt = UInv.BagHasItem(BagName, Items[i]);
						if (Amt === 1) {
							if (SingleItemPropertyName === "") {
								Result += Items[i];
							} else {
								Result += UInv.GetItemPropertyValue(BagName, Items[i], SingleItemPropertyName);
								if (UInv.GetLastError() !== "") {
									Result += UInv.GetLastError();
									UInv.ClearErrors();
								}
							}
							if (i < Items.length - 1) {
								if (Items.length > 2) {
									Result += SeparatorString + " ";
								} else {
									Result += " ";
								}
							}
						} else {
							Amt = UInv.numberToAPString(Amt);
							if (PluralItemPropertyName === "") {
								Result += Amt + " " + Items[i];
							} else {
								Result += Amt + " " + UInv.GetItemPropertyValue(BagName, Items[i], PluralItemPropertyName);
								if (UInv.GetLastError() !== "") {
									Result += UInv.GetLastError();
									UInv.ClearErrors();
								}
							}
							if (i < Items.length - 1) {
								if (Items.length > 2) {
									Result += SeparatorString + " ";
								} else {
									Result += " ";
								}
							}
						}
					}
					return Result;  // Success
				}
				return EmptyString;  // Success
			} else {
				UInv.Error('Error: DisplayItemList cannot find bag "' + BagName + '".');  // Error
				return UInv.GetLastError();
			}
		} else {
			UInv.Error('Error: BagName passed to DisplayItemList is not a string.');  // Error
			return UInv.GetLastError();
		}
	},

	// UpdateDisplay: Updates the display of any data-uinv="X" HTML elements.
	UpdateDisplay : function (Container) {

		function DropHandler(event, ui) {
			ui.draggable.position( { of: $(this), my: "center", at: "center" } );
			var SrcBag = ui.draggable.data("bagname");
			var DraggedItem = ui.draggable.data("itemname");
			var OldCellNo = UInv.GetItemPropertyValue(SrcBag, DraggedItem, "UInvCell");
			var DestBag = $(this).data("bagname");
			var NewCellNo = $(this).data("cellno");
			var DroppedOnItem = UInv.GetItemWherePropertyEquals(DestBag, "UInvCell", NewCellNo);
			var Quant = UInv.BagHasItem(SrcBag, DraggedItem);
			var Pos = { x: event.clientX, y: event.clientY };
			var radialMenuWedgeItems = [
				{ icon: "fa-plus-square", hint: "Drop all (" + Quant + " items)", data: "DropAll" },
				{ icon: "plus-one_white.svg", hint: "Drop one", data: "Drop1" },
				{ icon: "plus-half_white.svg", hint: "Drop half", data: "DropHalf" },
				{ icon: "minus-one_white.svg", hint: "Pick up one", data: "Take1" },
				{ icon: "plus-quarter_white.svg", hint: "Drop 1/4th", data: "DropQuarter" }];
			if (Quant == 1) {
				radialMenuWedgeItems[1].disabled = true;
			} else {
				radialMenuWedgeItems[1].hint = "Drop one (of " + Quant + " items)";
			}
			if (Quant < 4) {
				radialMenuWedgeItems[2].disabled = true;
			} else {
				radialMenuWedgeItems[2].hint = "Drop half (" + Math.trunc(Quant * 0.5) + " of " + Quant + " items)";
			}
			if (DroppedOnItem !== "") {
				if (!UInv.ItemsMatch(SrcBag, DraggedItem, DestBag, DroppedOnItem)) {  // Don't allow merge of items since they're not the same type
					radialMenuWedgeItems[3].disabled = true;
				} else {
					radialMenuWedgeItems[3].hint = "Pick up one (of " + UInv.BagHasItem(DestBag, DroppedOnItem) + " items)";
				}
			} else {
				radialMenuWedgeItems[3].disabled = true;
			}
			if (Quant < 8) {
				radialMenuWedgeItems[4].disabled = true;
			} else {
				radialMenuWedgeItems[4].hint = "Drop 1/4th (" + Math.trunc(Quant * 0.25) + " of " + Quant + " items)";
			}
			event.srcBag = SrcBag;
			event.draggedItem = DraggedItem;
			event.oldCellNo = OldCellNo;
			event.destBag = DestBag;
			event.droppedOnItem = DroppedOnItem;
			event.newCellNo = NewCellNo;
			event.pos = clone(Pos);
			event.ui = ui;
			event.radialMenuWedgeItems = clone(radialMenuWedgeItems);
			var Ret = UInv.CallEventHandler("table", "Drop", event);  // table Drop event
			if (Ret.openRadialMenu === true) {
				if (!UInv.isUndefined(Ret.radialMenuWedgeItems)) {
					if (!UInv.isProperty(Ret, "radialMenuOptions")) {
						Ret.radialMenuOptions = undefined;
					}
					if (!UInv.isProperty(Ret, "radialMenuHandler")) {
						Ret.radialMenuHandler = undefined;
					}
					UInv.DisplayRadialMenu(Ret.radialMenuWedgeItems, Pos, Ret.radialMenuHandler, Ret.radialMenuOptions);
					Ret.overrideDefaultAction = true;
				} else {
					Ret.radialMenuWedgeItems = clone(radialMenuWedgeItems);
				}
			} else {  // If return values not set, set with defaults.
				if (UInv.isUndefined(Ret.radialMenuWedgeItems)) {
					Ret.radialMenuWedgeItems = clone(radialMenuWedgeItems);
				}
				if (!UInv.isProperty(Ret, "radialMenuOptions")) {
					Ret.radialMenuOptions = undefined;
				}
				if (!UInv.isProperty(Ret, "radialMenuHandler")) {
					Ret.radialMenuHandler = undefined;
				}
			}
			if (UInv.isProperty(setup, "UInvRadialMenuData")) {
				delete setup.UInvRadialMenuData;
			}
			setup.UInvRadialMenuData = {  // Store data for radial menu events
				srcBag: SrcBag,
				draggedItem: DraggedItem,
				oldCellNo: OldCellNo,
				destBag: DestBag,
				droppedOnItem: DroppedOnItem,
				newCellNo: NewCellNo,
				radialMenuWedgeItems: clone(Ret.radialMenuWedgeItems),
				pos: clone(Pos),
				radialMenuHandler: Ret.radialMenuHandler,
				radialMenuOptions: clone(Ret.radialMenuOptions)
			};
			if (Ret.overrideDefaultAction !== true) {
				if (DroppedOnItem !== "") {
					if ((SrcBag != DestBag) || (OldCellNo != NewCellNo)) {  // Make sure item wasn't dropped back at original location
						if (UInv.ItemsMatch(SrcBag, DraggedItem, DestBag, DroppedOnItem)) {  // Merge items since they're the same type
							if (Quant > 1) {
								UInv.DisplayRadialMenu(radialMenuWedgeItems, Pos);
							} else {
								UInv.SetItemPropertyValue(SrcBag, DraggedItem, "UInvCell", NewCellNo);
								if (DestBag != SrcBag) {  // Move to new bag
									UInv.MoveItem(SrcBag, DestBag, DraggedItem);
								}
								UInv.UpdateDisplay();
							}
						} else {  // Swap items
							UInv.SwapItems(SrcBag, DraggedItem, DestBag, DroppedOnItem, "UInvCell");
							UInv.UpdateDisplay();
						}
					}
				} else {  // Change UInvCell to new cell
					if ((Quant > 1) && (SrcBag != DestBag)) {
						UInv.DisplayRadialMenu(radialMenuWedgeItems, Pos);
					} else {
						UInv.SetItemPropertyValue(SrcBag, DraggedItem, "UInvCell", NewCellNo);
						if (DestBag != SrcBag) {  // Move to new bag
							UInv.MoveItem(SrcBag, DestBag, DraggedItem);
						}
						UInv.UpdateDisplay();
					}
				}
			}
		}

		if (UInv.isUndefined(Container)) {
			Container = document;
		}
		var Matches = $(Container).find("[data-uinv]");
		if (Matches.length > 0) {
			var i, Table, BagName, CellMargin, BorderMargin, CellRows, x, CellCols, y, Row, RowClass, CellClass, ItemClass, IconClass, TextClass, PadTxt, Count, Item, Txt;
			for (i = 0; i < Matches.length; i++) {
				Count = 0;
				if ($(Matches[i]).data("uinv") === "table") {  // Update tables
					Table = $(Matches[i]);
					BagName = Table.attr("id");
					UInv.FixTableCells(BagName, Table);
					CellMargin = Table.data("cellmargin");
					BorderMargin = Table.data("bordermargin");
					CellRows = Table.data("cellrows");
					CellCols = Table.data("cellcolumns");
					RowClass = Table.data("rowclass");
					CellClass = Table.data("cellclass");
					ItemClass = Table.data("itemclass");
					IconClass = Table.data("iconclass");
					TextClass = Table.data("textclass");
					Table.empty();
					for (x = 0; x < CellRows; x++) {
						Table.append('<div class="' + RowClass + '" id="' + BagName + '-row' + x + '" data-uinv="table-row"></div>');
						Row = $(Container).find("#" + BagName + "-row" + x);
						for (y = 0; y < CellCols; y++) {
							PadTxt = "";
							if (x === 0) {
								PadTxt = ' margin-top: ' + (BorderMargin + CellMargin) + 'px;';
							}
							if (x === CellRows - 1) {
								PadTxt += ' margin-bottom: ' + (BorderMargin + CellMargin) + 'px;';
							}
							if (y === 0) {
								PadTxt += ' margin-left: ' + (BorderMargin + CellMargin) + 'px;';
							}
							if (y === CellCols - 1) {
								PadTxt += ' margin-right: ' + (BorderMargin + CellMargin) + 'px;';
							}
							Item = UInv.GetItemWherePropertyEquals(BagName, "UInvCell", Count);
							if (Item !== "") {
								Txt = '<span data-uinv="table-cell" class="' + CellClass + '" id="' + BagName + '-cell' + Count + '" data-bagname="' + BagName + '" data-cellno=' + Count++ + ' style="margin: ' + CellMargin + 'px;' + PadTxt + '">';
								Txt += '<div data-uinv="item" class="' + ItemClass + '" id="' + BagName + '-item-' + Item + '" data-bagname="' + BagName + '" data-itemname="' + Item + '">';
								Txt += '<img src="' + setup.ImagePath + UInv.GetItemPropertyValue(BagName, Item, "image") + '" class="' + IconClass + '" id="' + BagName + '-icon-' + Item + '" unselectable="on" onselectstart="return false;">';
								if (UInv.BagHasItem(BagName, Item) > 1) {
									Txt += '<span class="' + TextClass + '" id="' + BagName + '-text' + Count + '" unselectable="on" onselectstart="return false;">' + UInv.BagHasItem(BagName, Item) + '</span>';
								}
								Txt += '</div></span>';
								Row.append(Txt);
							} else {
								Row.append('<span data-uinv="table-cell" class="' + CellClass + '" id="' + BagName + '-cell' + Count + '" data-bagname="' + BagName + '" data-cellno=' + Count++ + ' style="margin: ' + CellMargin + 'px;' + PadTxt + '"></span>');
							}
						}
					}
				}
				// Add update code for future display objects here.
			}
			if (UInv.isFunction($(Container).find("[data-uinv='table-cell']").droppable)) {
				$(Container).find("[data-uinv='table-cell']")
					.droppable({  // see: http://api.jqueryui.com/droppable/ & https://jqueryui.com/droppable/
						scope: "first",
						revert: "invalid",
						accept: function(el) {
							// This gets called once for each droppable element on DragStart
							var SrcBag = $(el).data("bagname");
							var DraggedItem = $(el).data("itemname");
							var DestBag = $(this).data("bagname");
							var NewCellNo = $(this).data("cellno");
							var DroppedOnItem = UInv.GetItemWherePropertyEquals(DestBag, "UInvCell", NewCellNo);
							el.srcBag = SrcBag;
							el.draggedItem = DraggedItem;
							el.destBag = DestBag;
							el.droppedOnItem = DroppedOnItem;
							el.newCellNo = NewCellNo;
							el.acceptVal = $(el).hasClass("dragging");  // drag indicator
							var Ret = UInv.CallEventHandler("table", "Accept", el);  // table Accept event
							if (UInv.isProperty(Ret, "acceptVal")) {
								return Ret.acceptVal;
							} else {
								return $(el).hasClass("dragging");  // drag indicator
							}
						},
						drop: DropHandler
					});
				$(Container).find("[data-uinv='item']")
					.on("mousedown touchstart", function(ev) {  // event handler here?  ***
						if (ev.button == 0) {
							$(this).addClass("grabbing");
						} })
					.on("mouseup touchend", function(ev) {  // event handler here?  ***
						if (ev.button == 0) {
							$(this).removeClass("grabbing");
						} })
					.draggable({  // see: https://api.jqueryui.com/draggable/ & https://jqueryui.com/draggable/
						revert: "invalid",
						containment: "document",
						scope: "first",
						cursor: "grabbing",
						snap: false,
						start: function(event, ui) {
							if (event.button == 0) {
								$(this).addClass("grabbing");
								$(this).addClass("dragging");  // drag indicator
								if (!UInv.isUndefined(event.target.setCapture)) {
									event.target.setCapture(); 
								}
								var SrcBag = $(this).data("bagname");
								var DraggedItem = $(this).data("itemname");
								event.srcBag = SrcBag;
								event.draggedItem = DraggedItem;
								event.ui = ui;
								UInv.CallEventHandler("table", "DragStart", event);  // table DragStart event
								/*
								var Ret = UInv.CallEventHandler("table", "DragStart", event);  // table DragStart event
								if (Ret.someValue != true) {
								}
								*/
							} else {
								event.preventDefault();
							}
						},
						stop: function(event, ui) {
							$(this).removeClass("grabbing");
							$(this).removeClass("dragging");  // drag indicator
							var SrcBag = $(this).data("bagname");
							var DraggedItem = $(this).data("itemname");
							event.srcBag = SrcBag;
							event.draggedItem = DraggedItem;
							event.ui = ui;
							UInv.CallEventHandler("table", "DragStop", event);  // table DragStart event
							/*
							var Ret = UInv.CallEventHandler("table", "DragStart", event);  // table DragStart event
							if (Ret.someValue != true) {
							}
							*/
						}
					});
			} else {
				// Page reload from browser (such as CTRL+F5) caused drag-drop to not get set up properly, so retry.
				setTimeout(UInv.UpdateDisplay, 100);
			}
		}
		return true;
	},


	// UInv Other Functions:
	// =====================

	// GetUserAlerts: Returns the $UInvShowAlerts value (or false if it doesn't exist).
	GetUserAlerts : function () {
		if (!UInv.isUndefined(setup.UInvUserAlertsDebug)) {  // Handle "xyzzy" debug override on reload of save file.
			if (UInv.isUndefined(State.variables.UInvShowAlerts) || State.variables.UInvShowAlerts !== setup.UInvUserAlertsDebug) {
				setup.UInvUserAlertsBackup = State.variables.UInvShowAlerts;
				UInv.SetUserAlerts(setup.UInvUserAlertsDebug);
				console.log('UInv: Game restarted with console logging enabled through debug override.  Type "xyzzy" while on game window to cancel.');
			}
		}
		if (UInv.isProperty(State.variables, "UInvShowAlerts")) {
			return State.variables.UInvShowAlerts;
		}
		return false;
	},

	// Error: Handle setting $UInvLastErrorMessage to the error string and possibly displaying UInv errors based on the value of $UInvShowAlerts.
	//        This can be used for debugging and/or letting users know how to report this error.
	Error : function (ErrStr) {
		var AlertMsg = ErrStr, Txt, GUA = UInv.GetUserAlerts();
		State.variables.UInvLastErrorMessage = ErrStr;
		if (GUA) {
			if (GUA & UInv.ERROR_SHOW_PASSAGE_NAME) { // jshint ignore:line
				Txt = 'Passage="' + passage() + '"';
				State.variables.UInvLastErrorMessage += " - " + Txt;
				AlertMsg += "\n" + Txt;
			}
			if (UInv.isProperty(State.variables, "UInvErrorStringAddendum")) {
				Txt = State.variables.UInvErrorStringAddendum;
				State.variables.UInvLastErrorMessage += " - " + Txt;
				AlertMsg += "\n\n" + Txt;
			}
			if (GUA & UInv.ERROR_SHOW_ALERT) { // jshint ignore:line
				alert(AlertMsg);
			}
			if (GUA & UInv.ERROR_TO_CONSOLE) { // jshint ignore:line
				console.log(AlertMsg);
			}
			if (GUA & UInv.ERROR_THROW_ERROR) { // jshint ignore:line
				throw new Error("UInv " + State.variables.UInvLastErrorMessage);
			}
		}
		return GUA;
	},

	// SetUserAlerts: Allows the type of error messages returned by UInv to be controlled.  Returns the current value of $UInvShowAlerts.
	SetUserAlerts : function (ErrorSetting, ErrorStringAddendum) {
		if (!UInv.isUndefined(ErrorSetting)) {
			if (UInv.isInteger(ErrorSetting)) {
				State.variables.UInvShowAlerts = ErrorSetting;
			} else if (ErrorSetting) {
				State.variables.UInvShowAlerts = UInv.ERROR_THROW_ERROR + UInv.ERROR_SHOW_PASSAGE_NAME;  // Default
			} else {
				if (UInv.isProperty(State.variables, "UInvShowAlerts")) {
					delete State.variables.UInvShowAlerts;
				}
			}
		}
		if (!UInv.isUndefined(ErrorStringAddendum)) {
			if (UInv.isString(ErrorStringAddendum) || UInv.isNumber(ErrorStringAddendum) || UInv.isObject(ErrorStringAddendum) || UInv.isBoolean(ErrorStringAddendum)) {
				if (ErrorStringAddendum === "") {
					if (UInv.isProperty(State.variables, "UInvErrorStringAddendum")) {
						delete State.variables.UInvErrorStringAddendum;
					}
				} else {
					State.variables.UInvErrorStringAddendum = ErrorStringAddendum;
				}
			}
		}
		return UInv.GetUserAlerts();
	},

	// ClearErrors: Sets the error string to "".
	ClearErrors : function () {
		State.variables.UInvLastErrorMessage = "";
		return true;  // Success
	},

	// GetLastError: Returns the last error string.  Also clears error messages if Clear is set to true.
	GetLastError : function (Clear) {
		var Err = "";
		if (UInv.isUndefined(Clear)) {
			Clear = false;
		}
		if (UInv.isProperty(State.variables, "UInvLastErrorMessage")) {		
			Err = State.variables.UInvLastErrorMessage;
		}
		if (Clear) {
			UInv.ClearErrors();
		}
		return Err;  // Success
	},

	// SetMergeItemMethod: Sets the $UInvMergeItemMethod variable which controls how UInv handles cases where functions attempt to merge two non-equal items.
	SetMergeItemMethod : function (Method) {
		if (!UInv.isUndefined(Method)) {
			if ((Method >=1) && (Method <= 6)) {
				State.variables.UInvMergeItemMethod = Method;
				return true;  // Sets merge method
			} else {
				if (!UInv.isProperty(State.variables, "UInvMergeItemMethod")) {
					State.variables.UInvMergeItemMethod = UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES;  // default
				}
				return false;  // Value not valid
			}
		} else {
			if (!UInv.isProperty(State.variables, "UInvMergeItemMethod")) {
				State.variables.UInvMergeItemMethod = UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES;  // default
			}
			return false;  // Value not valid
		}
	},

	// Initialize: Set up variables.  Returns "false" if any were already set, otherwise it returns "true".
	Initialize : function (DisplayErrors) {

		var ignoredElements = [];  // ["a", "button"];  // Add element names to prevent clicks from triggering events when clicking on those elements.
		function handleMouseDown (ev) {
			var Ret = UInv.CallEventHandler("general", "MouseDown", ev);  // general MouseDown event
			if (Ret.stopPropagation === true) {
				ev.stopPropagation();
			}
			if (ev.button == 0) {
				if ((($(ev.target).parents("#story").length > 0) || ($(ev.target).parents().length <= 2))  // Make sure that the click is in the story area or the background, not on the UI bar
					&& (ev.clientX < document.documentElement.offsetWidth) && (ev.clientY < document.documentElement.offsetHeight)  // Ignore clicks on the scrollbar
					&& !ignoredElements.includes(ev.target.localName))  // Ignore clicks on certain elements
				{
					var el = $("#uinv-radial-menu").get(0);
					if (UInv.isUndefined(el)) {
						UInv.InitializeRadialMenu();
					} else {
						if (el.dataset.status == "opened") {  // Cancel radial menu
							ev.cancelType = "MouseDown";
							Ret = UInv.CallEventHandler("radialMenu", "Cancel", ev);  // radialMenu Cancel event (MouseDown)
							if (Ret.keepOpen !== true) {
								el.dataset.status = "closed md";
								el.style.transform = "scale(0, 0)";
								el.style.opacity = 0;
							}
							UInv.UpdateDisplay();
						}
					}
				}
			}
		}
		function handleMouseUp (ev) {
			if (ev.button == 0) {
				if ((($(ev.target).parents("#story").length > 0) || ($(ev.target).parents().length <= 2))  // Make sure that the click is in the story area or the background, not on the UI bar
					&& (ev.clientX < document.documentElement.offsetWidth) && (ev.clientY < document.documentElement.offsetHeight)  // Ignore clicks on the scrollbar
					&& !ignoredElements.includes(ev.target.localName))  // Ignore clicks on certain elements
				{
					var el = $("#uinv-radial-menu").get(0);
					if (UInv.isUndefined(el)) {
						UInv.InitializeRadialMenu();
					} else {
						if (el.dataset.status == "opened") {  // Cancel radial menu
							ev.cancelType = "MouseUp";
							var Ret = UInv.CallEventHandler("radialMenu", "Cancel", ev);  // radialMenu Cancel event (MouseUp)
							if (Ret.keepOpen !== true) {
								el.dataset.status = "closed";
								el.style.transform = "scale(0, 0)";
								el.style.opacity = 0;
							}
							UInv.UpdateDisplay();
						} else {
							if (el.dataset.status == "closed md") {
								el.dataset.status = "closed";
							/*
							} else {  // Open radial menu at new location
								$("#event").empty().wiki("Opened");  // pass this to a handler function??? check to see if radial menu should be opened, and get icons and options? ***
								el.dataset.status = "opened";
								var r = parseInt(el.dataset.r);
								el.style.left = Math.round(ev.clientX - r + window.scrollX) + "px";
								el.style.top = Math.round((ev.clientY - (2*r)) + r + window.scrollY) + "px";
								el.style.transform = "scale(1, 1)";
								el.style.opacity = 1;
							*/
							}
						}
					}
				}
			}
		}

		var Result = true;
		if (UInv.isProperty(State.variables, "UInvBags")) {
			delete State.variables.UInvBags;
			State.variables.UInvBags = {};
			Result = false;
		} else {
			State.variables.UInvBags = {};
		}
		if (UInv.isProperty(State.variables, "UInvCurrentBagName")) {
			delete State.variables.UInvCurrentBagName;
			Result = false;
		}
		if (UInv.isProperty(State.variables, "UInvCurrentItemName")) {
			delete State.variables.UInvCurrentItemName;
			Result = false;
		}
		if (UInv.isProperty(State.variables, "UInvErrorStringAddendum")) {
			delete State.variables.UInvErrorStringAddendum;
			Result = false;
		}
		if (UInv.isUndefined(setup.UInvUserAlertsDebug)) {
			if (UInv.isProperty(State.variables, "UInvShowAlerts")) {
				if (UInv.isUndefined(DisplayErrors)) {
					UInv.SetUserAlerts(false);
				} else {
					UInv.SetUserAlerts(DisplayErrors);
				}
				Result = false;
			} else {
				if (DisplayErrors) {
					UInv.SetUserAlerts(DisplayErrors);
				}
			}
		} else {
			UInv.SetUserAlerts(setup.UInvUserAlertsDebug);  // "xyzzy" debug override
			if (UInv.isUndefined(DisplayErrors)) {
				setup.UInvUserAlertsBackup = false;
			} else {
				setup.UInvUserAlertsBackup = DisplayErrors;
			}
			console.log('UInv: Game reinitialized with console logging enabled through debug override.  Type "xyzzy" while on game window to cancel.');
		}
		if (UInv.isProperty(State.variables, "UInvLastErrorMessage")) {
			Result = false;
		}
		UInv.ClearErrors();
		if (UInv.isProperty(State.variables, "UInvMergeItemMethod")) {
			Result = false;
		}
		UInv.SetMergeItemMethod(UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES);  // default
		if (UInv.isProperty(State.variables, "UInvEventHandlers")) {
			delete State.variables.UInvEventHandlers;
			State.variables.UInvEventHandlers = {};
			Result = false;
		} else {
			State.variables.UInvEventHandlers = {};
		}
		// Prepare radial menu
		var div = $("#uinv-radial-menu").get(0);
		if (UInv.isUndefined(div)) {
			UInv.InitializeRadialMenu();
		}
		// Set up mouse down and up event handlers
		$(document).on("mousedown", handleMouseDown);
		$(document).on("mouseup", handleMouseUp);
		$("html").css("height", "100%");  // Make sure the whole window is covered so horizontal scrollbars can be properly detected.
		return Result;
	},

	// Version: Return a string showing the version of UInv.
	Version : function () {
		return "Universal Inventory System (<a href='https://github.com/HiEv/UInv'>UInv</a>) v0.9.6 by HiEv";  // Success
	},


	/* ****************************************************** */
	/*  END OF COPY-AND-PASTE SECTION FOR UPDATING UInv CODE  */
	/* ****************************************************** */


	// UInv Aliases:
	// =============

	// Add your own function aliases here.  Make sure they are not named the same as any of the existing functions.

	AddToBagValue : function (BagName, BagPropertyName, Amount) {
		return UInv.AddToBagPropertyValue(BagName, BagPropertyName, Amount);
	},

	AddToItemValue : function (BagName, ItemName, ItemPropertyName, Amount) {
		return UInv.AddToItemPropertyValue(BagName, ItemName, ItemPropertyName, Amount);
	},

	BagArray : function () {
		return UInv.GetBagsArray();
	},

	BagCount : function () {
		return UInv.GetBagCount();
	},

	BagsExist : function (BagNameArray) {
		return UInv.BagExists(BagNameArray);
	},

	BagHasAnyBagTags : function (BagName, BagPropertyName, BagTagArray) {
		return UInv.BagHasAnyBagTag(BagName, BagPropertyName, BagTagArray);
	},

	BagHasAnyItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
		return UInv.BagHasAnyItemTag(BagName, ItemPropertyName, ItemTagArray);
	},

	BagHasProperties : function (BagName, BagPropertyNameArray) {
		return UInv.BagHasProperty(BagName, BagPropertyNameArray);
	},

	CopyBagProperties : function (SourceBagName, DestinationBagName, BagPropertyNameArray) {
		return UInv.CopyBagProperty(SourceBagName, DestinationBagName, BagPropertyNameArray);
	},

	GetBagValue : function (BagName, BagPropertyName) {
		return UInv.GetBagPropertyValue(BagName, BagPropertyName);
	},

	GetCellsItemName : function (BagName, Cell) {
		return UInv.GetItemWherePropertyEquals(BagName, "UInvCell", Cell);
	},

	GetHighestBagValue : function (BagPropertyName, BagNameArray) {
		return UInv.GetHighestBagPropertyValue(BagPropertyName, BagNameArray);
	},

	GetLowestBagValue : function (BagPropertyName, BagNameArray) {
		return UInv.GetLowestBagPropertyValue(BagPropertyName, BagNameArray);
	},

	GetItemQuantity : function (BagName, ItemName) {
		return UInv.BagHasItem(BagName, ItemName);
	},

	HasItem : function (BagName, ItemName) {
		return UInv.BagHasItem(BagName, ItemName);
	},

	ItemHasAnyTags : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
		return UInv.ItemHasAnyTag(BagName, ItemName, ItemPropertyName, ItemTagArray);
	},

	ItemQuantity : function (BagName, ItemName) {
		return UInv.BagHasItem(BagName, ItemName);
	},

	GetItemValue : function (BagName, ItemName, ItemPropertyName) {
		return UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
	},

	SetBagsPropertyValue : function (BagNameArray, BagPropertyName, Value) {
		return UInv.SetBagPropertyValue(BagNameArray, BagPropertyName, Value);
	},

	SetBagValue : function (BagName, BagPropertyName, Value) {
		return UInv.SetBagPropertyValue(BagName, BagPropertyName, Value);
	},

	SetBagsTouched : function (BagNameArray) {
		return UInv.SetBagTouched(BagNameArray);
	},

	SetBagsUntouched : function (BagNameArray) {
		return UInv.SetBagUntouched(BagNameArray);
	},

	SetItemValue : function (BagName, ItemName, ItemPropertyName, Value) {
		return UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
	},


	// UInv Developer Data Functions:
	// ==============================

	// BagData: This is where you set the default properties and/or items for the default bags.
	BagData : function (DefaultBagType, PropertiesOnly) {
		var BagProperties = {}, BagItems = [];
		switch(DefaultBagType) {

	/*  IMPORTANT!:
		Bag types must be unique strings in all lowercase.
		Bag types cannot be "-" (the minus sign) or "" (an empty string).
		Property names can be upper and/or lowercase strings.
		Property names with spaces in them must be inside quotes.
		Property names are case sensitive, so a property named "XYZ"
		is different from properties named "Xyz" or "xyz".
		Bag and property names cannot start with a number.
		An bag cannot have more than one property with the same name.
		Property values can be strings, numbers, booleans, or arrays.
		Objects and functions are unsupported property value types.
		Multiple successive case lines with no "break;" between them
		will be treated as different bags with the same properties.
		Quote marks inside strings need to have a backslash before
		them.  (e.g. "Bob said, \"Hello.\"")
		Backslashes will also need a backslash before them.

		New bags should be added in the following format:

		case "unique-lowercase-bag-name-string":
			BagProperties = {
					unique-property-name1-string : property-value1,
					unique-property-name2-string : property-value2,
					...
					};
			BagItems = [
					"item-name-string1",
					{ item-name-string2 : quantity },
					...
					];
					// Use the string method for single items,
					// the object method for multiple items.
					// All items should be passed as a single array of items.
			break;

		The BagProperties and BagItems lines are optional.  You can
		leave either of them out if you don't need to set the bag's
		properties or items, respectively.

		For a bag's items, you can either put an item name in the BagItems
		array as a string (if you only want one of that item), or you can
		put an object in the "{ item-name : quantity }" format (for
		multiple items).

		NOTE: If any of a bag's _properties_ are variable, then in
		BagProperties the property "UInvVariableType" has to be set to
		something (it doesn't matter what).  However, you do *NOT* need
		to add the "UInvVariableType" property if any of the _items_ that
		may be in the bag can vary.

		It's recommended that you list your bags alphabetically both
		to help avoid duplicating names and to make them easier to find
		if you need to modify them later.

		Example bags below can be removed.

	NEW BAGS GO BELOW THIS LINE.  */

	// Start of example bags.

			case "backpack":
				BagProperties = { wearable : true, worn : true, maxCarryWeight : 20 };
				BagItems = [ "pants", "belt", { dagger : 2 } ];  // adds 1 pants, 1 belt, and 2 dagger items to the backpack
				break;

			case "treasure bag":
				BagProperties = { UInvVariableType : true, quality : ["new", "average", "worn"].random() };  // Picks a random bag quality level.
				// If a bag's properties are variable, then the UInvVariableType has to be set to something (it doesn't matter what).
				BagItems = [ { "gold coin" : random(2, 20) }, UInv.BagData("treasures").random() ];  // Each bag randomly has 2 to 20 coins and a random item from the treasures bag item list.
				break;

			case "treasures":
				BagItems = [ "pants", "belt", "dagger", "shortsword", "heavy mace", "rainbow potion" ];
				break;

	// End of example bags.

	// DO NOT DELETE OR CHANGE THE DEFAULT CASE BELOW!!!
	//     Doing so will likely break the code.

			default:
	// Do not throw an error here.  This case is used to determine if the bag type passed to this function is a default bag type or not.
				return undefined;
		}
		if (PropertiesOnly) {
			return BagProperties;
		} else {
			return BagItems;
		}
	},


	// ItemData: This is where you set the default properties for the default items.
	ItemData : (function() {
		var Items = {};

	/*  IMPORTANT!:       --Static Items Information--
		Items with consistent default property values are "static items".
		Items with property values that may vary are "variable items".
		Item names must be unique strings in all lowercase.
		Item names cannot be "uinvtouched", "uinvproperties",
		"uinvdefaultbagtype", "-" (the minus sign), or "" (an empty
		string), they're reserved for use by UInv.
		Property names can be upper and/or lowercase strings.
		Property names with spaces in them must be inside quotes.
		Property names are case sensitive, so a property named "XYZ"
		is different from properties named "Xyz" or "xyz".
		Item and property names cannot start with a number.
		An item cannot have more than one property with the same name.
		An item cannot have a property named "UInvQuantity" or
		"UInvDefaultItemType", they're reserved for use by UInv.
		Property values can be strings, numbers, booleans, or arrays.
		Objects and functions are unsupported property value types.
		Quote marks inside strings need to have a backslash before
		them.  (e.g. "Bob said, \"Hello.\"")
		Backslashes will also need a backslash before them.

		Static items should be added in the following format:

		Items.itemname = { property-name-string1 : property-value1,
		                   property-name-string2 : property-value2, 
		                   ... };

		"itemname" must be a unique, lowercase, string that cannot start
		with a number.  If it contains a space then it needs to be in
		this format:

		Items['item name'] = { property-name-string1 : property-value1,
		                       property-name-string2 : property-value2, 
		                       ... };

		If an item's properties are variable, then they should be set in
		the "variable items" section instead (see below).

		It's recommended that you list your items alphabetically both
		to help avoid duplicating names and to make them easier to find
		if you need to modify them later.

		Example items below can be removed.

	NEW -STATIC ITEMS- GO BELOW THIS LINE.  */

		// Start of example static items.

		Items.belt = { type : ["clothing"], singular : "a belt", plural : "belts", place : "hips1", size : 2, image : "icon_belt1.png", description : "A basic leather belt" };

		Items.dagger = { type : ["weapon", "stabbing", "1-handed"], singular : "a dagger", plural : "daggers", size : 2, image : "icon_dagger3.png", description : "A small dagger." };

		Items["gold coin"] = { type : ["money"], singular : "a gold coin", plural : "gold coins", size : 0, image : "coin.png", description : "Gold coins are the standard currency." };

		Items["heavy mace"] = { type : ["weapon", "blunt", "2-handed"], singular : "a heavy mace", plural : "heavy maces", size : 6, image : "Heavy_Mace.png", description : "A heavy mace with pointy flanges on it." };

		Items.pants = { type : ["clothing"], singular : "a pair of pants", plural : "pairs of pants", place : "hips1", size : 4, image : "icon_cloth_pants1.png", description : "A pair of pants." };

		Items.shortsword = { type : ["weapon", "slashing", "1-handed"], singular : "a short sword", plural : "short swords", size : 4, image : "icon_sword_short1.png", description : "A shortsword." };

		// End of example items.

		return function (DefaultItemType) {
			if (!UInv.isString(DefaultItemType)) {
				UInv.Error('Error: ItemData failed.  DefaultItemType is not a string.');  // Error
				return undefined;
			}
			var Item = {};
			switch(DefaultItemType) {

		/*  IMPORTANT!:       --Variable Items Information--
			Items with consistent default property values are "static items".
			Items with property values that may vary are "variable items".
			Item names, property names, and property values for variable
			items must follow the same rules as the static items above.

			If an item's property values are variable, then the property
			"UInvVariableType" has to be set to something (it doesn't
			matter what).

			Variable items should be added in the following format:

			case "itemname":
				// Other code may go here.
				Item = { property-name-string1 : property-value1,
				         property-name-string2 : property-value2, 
				         ... };
				break;

			Example items below can be removed.

		NEW -VARIABLE ITEMS- GO BELOW THIS LINE.  */

			// Start of example variable items.

				case "rainbow potion":
					var color = ["red", "orange", "yellow", "green", "blue", "purple"].random();  // Randomly picks a color.
					var article = color === "orange" ? "an " : "a ";
					// Because this item's property values can vary, the "UInvVariableType" property has to be set to something.
					Item = { UInvVariableType : color, type : ["potion"], singular : article + color + " potion", plural : color + " potions", size : 1, image : "potion" + UInv.capitalizeFirstLetter(color) + ".png", description : "A " + color + " potion." };
					break;

			// End of example variable items.

		// DO NOT DELETE OR CHANGE THE DEFAULT CASE BELOW!!!
		//     Doing so will likely break the code.

				default:
		// Do not throw an error here.  This case is used to determine if the item type passed to this function is a default item type or not.
					Item = undefined;
			}
			if (UInv.isUndefined(Item)) {
				if (UInv.isProperty(Items, DefaultItemType)) {
					return clone(Items[DefaultItemType]);  // Static item
				} else {
					return undefined;  // Unable to find item
				}
			} else {
				if (!UInv.isProperty(Item, "UInvVariableType")) {
					// Add UInvVariableType property if it's missing.
					Item.UInvVariableType = true;
				}
				return Item;  // Variable item
			}
		};
	})(),

	// OPTIONAL: You can list the names of your default bags here so you can find them using "UInv.BagList[index]".
	BagList: ["backpack", "treasure bag", "treasures"],

	// OPTIONAL: You can list the names of your default items here so you can find them using "UInv.ItemList[index]".
	ItemList: ["gold coin", "belt", "pants", "dagger", "shortsword", "heavy mace", "rainbow potion"]

};

/*
	!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	!!                                                             !!
	!!  REMINDER: If you're updating UInv you should only replace  !!
	!!  the code up to the "END OF COPY-AND-PASTE" marker above!   !!
	!!                                                             !!
	!!  DO NOT ACCIDENTALLY OVERWRITE YOUR DEFAULT BAGS & ITEMS!   !!
	!!                                                             !!
	!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

UInv.deepFreeze(UInv);  // Locks existing property values to prevent accidental changes.

// NOTE: It's recommended that you pass "UInv.Initialize" the value
//       "UInv.ERROR_THROW_ERROR" or "UInv.ERROR_TO_CONSOLE", instead
//       of "UInv.ERROR_NONE", when testing your code.
//
UInv.Initialize(UInv.ERROR_NONE);
UInv.SetMergeItemMethod(UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES);  // Change this if you prefer a different way of dealing with item collisions.