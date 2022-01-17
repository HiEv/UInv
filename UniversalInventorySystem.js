/*
	Universal Inventory System (UInv)
	by HiEv                    v0.9.7.3

	A JavaScript inventory "plugin" for Twine 2 / SugarCube 2.

	Home Page: https://github.com/HiEv/UInv

	v0.5.7 - March 29, 2018 - (preview release 1)
		- 62 functions written out of 108 planned functions
	v0.6.9 - April 6, 2018 - (preview release 2)
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
	v0.9.7 - December 29, 2018 - (preview release 10)
		- 40 new functions written (including 2 macros) + 38 new functions planned
		- added Pocket/Container functions; items can now contain other items
		- updated existing functions to work with pockets properly
		- updated more functions to support bag name arrays
		- added a <<UInvSet>> macro to shorten calls to multiple UInv functions
		- added a <<UInvTry>> macro to simplify error handling in TwineScript
		- added more ways to add default items to default bags
		- default return value on error was standardized to "undefined"
		- enforced stricter verification of values for item names (must be lowercase, etc...)
		- removed LockUpdates function; use IncrementUpdateLock and DecrementUpdateLock instead
		- removed capitalizeFirstLetter function; use SugarCube's .toUpperFirst() instead
		- discovered a function I wrote and apparently forgot to document anywhere (LOL)
		- renamed the following functions to conform to consistent naming style (aliases added):
			* ArrayHasAllBagProperties to BagHasAllProperties
			* ArrayHasAllItemProperties to ItemHasAllProperties
			* GetBagArrayWithAllProperties to GetBagsArrayWithAllProperties (added an "s")
			* GetHighestBagPropertyValue to GetBagWithHighestPropertyValue
			* GetHighestItemPropertyValue to GetItemWithHighestPropertyValue
			* GetLowestBagPropertyValue to GetBagWithLowestPropertyValue
			* GetLowestItemPropertyValue to GetItemWithLowestPropertyValue
			* SetItemsPropertyValues to SetItemsPropertyValue (removed an "s")
			* UpdateItemProperties to SetItemPropertyValues
		- fixes/improvements to valuesAreEqual, arraysAreEqual, and objectsAreEqual
		- corrected two minor inefficiencies in memory/history usage
		- fixed a few incorrect function names in error messages
		- fixed a problem with items changed to variable type still using default properties
		- fixed a problem where variable type items might not merge when they should
		- fixed GetBagWithHighestPropertyValue and GetBagWithLowestPropertyValue functions
		- fixed a bug in BagHasAllProperties
		- preliminary work on unit/regression testing tool (37 functions fully tested)
		- property values may now be set to "undefined"
		- new/updated general help file sections:
			* Changelog
			* Function Cheat Sheet
			* Basic UInv Functions (incomplete)
			* Error Handling (incomplete)
			* Efficient UInv Coding
			* Arrays vs Generic Objects (major improvements; incomplete)
			* The UInv Data Structure
		- worked on how help file entries should look for UInv functions (see "AddBag")
		- modified UInv structure to support internal-use-only functions and variables
			* this means you'll need to insert your bag, item, and alias definitions this update
		- Over 10,000 non-blank lines of code and comments!  Yay for arbitrary milestones!
	v0.9.7.1 (bugfix) - September 7, 2019 - (preview release 11)
		- 7 new functions written + 5 new functions planned
		- added support for Set and Map objects; UInv now supports all of SugarCube's supported types
		- added an "Idle" event to the "cacheImages" events.
		- fixed a problem the image cache had with some browsers
		- fixed a couple of bugs in the event handler code
			* note: this required some minor changes to the CSS generated for tables
			* Table Builder updated to accommodate CSS changes
		- added another bit of sample code to the UInv_Sample_Code.html file
		- another update to the "UInv Safe Save Code" in the UInv help file
		- numerous help file updates and fixes
	v0.9.7.2 (minor update) - September 9, 2019 - (preview release 12)
		- 4 new functions written
		- added some missing JavaScript Date, Map, and Set object support
		- added missing documentation for new utility functions to help file
	v0.9.7.3 (bugfix) - January 16, 2022 - (preview release 13)
		- bugfix: the BagHasAllItems() and BagHasAnyItem() functions were only checking the first item in the array of items
		- bugfix: fixed a problem with UInv elements in the UI bar not working properly
		- bugfix: fixed GetAllBagPockets() incorrectly returning duplicate pocket names
*/

/*
	The next few comments blocks are to support JavaScript validators such as:
		https://eslint.org/demo/
		http://JSHint.com/
		https://deepscan.io/demo/
		http://beautifytools.com/javascript-validator.php
*/
/* jshint -W014 */
/* eslint-disable no-unused-vars */
/*
	global UInv, $, setup, clone, opr, safari, Config, Browser, State, random, passage, Macro, Scripting, version
*/

/* jshint ignore:start */  /* Disable this line to test with JSHint.  It's too slow to leave enabled. */

/* Increase SugarCube maxLoopIterations if needed. */
if (Config.macros.maxLoopIterations < 2000) {
	Config.macros.maxLoopIterations = 2000;
}

if (setup.ImagePath === undefined) {  /* Do this better later *** */
	setup.ImagePath = "";
}

/* -- Universal Inventory System (UInv) -- */

/* UInvObject: UInv constructor and initialization object. */
function UInvObject () {

	if ((typeof version == "undefined") || (typeof version.title == "undefined") || (version.title != "SugarCube")
		|| (typeof version.major == "undefined") || (version.major < 2)
		|| (typeof version.minor == "undefined") || (version.minor < 8)) {
		throw new Error("UInv requires SugarCube v2.8.0 or greater.  Please upgrade to the latest version of the SugarCube v2 story format.");
	}

	/* deepFreeze: Freeze everything in an object's property tree. */
	function deepFreeze (Obj) {
		var value, name, i, propNames = Object.getOwnPropertyNames(Obj);
		/* Freeze the object's child properties before freezing the object. */
		for (i = 0; i < propNames.length; i++) {
			name = propNames[i];
			value = Obj[name];
			Obj[name] = value && typeof value === "object" ? deepFreeze(value) : value;  /* Recursively handle sub-properties, if any exist. */
		}
		return Object.freeze(Obj);
	}

	/* parseUInvLine: Returns a string with "UInv." added in front of any UInv function names in the Txt string, provided that:
			* they're a valid UInv function name (including aliases)
			* they're preceded by a " ", tab, ",", "+", "-", "/", "*", "%", "=", "<", ">", "!", "&", "|", "?", "(", "[", "{", or ":"
			* they're immediately followed by a "(" (the left parenthesis)
			* they're not within a string (within a pair of single or double-quotes)
	*/
	function parseUInvLine (TxtIn) {
		var Prec = [" ", "	", ",", "+", "-", "/", "*", "%", "=", "<", ">", "!", "&", "|", "?", "(", "[", "{", ":"];
		var Group = ["'", '"'];
		TxtIn = TxtIn.trim();
		var TxtOut = "", Word = "", Prv = "+", n = 0, g = -1;
		while (n < TxtIn.length) {
			if (g < 0) {
				if (TxtIn[n] == "(") {
					if (Prec.includes(Prv) && (UInv.isFunction(UInv[Word]) || UInv.isProperty(UInv, Word))) {
						TxtOut += "UInv." + Word;
					} else {
						TxtOut += Word;
					}
					Word = "";
				}
				if (Prec.includes(TxtIn[n])) {
					TxtOut += Word + TxtIn[n];
					Prv = TxtIn[n];
					Word = "";
				} else if (Group.includes(TxtIn[n])) {
					g = Group.indexOf(TxtIn[n]);
					TxtOut += Word;
					Word = TxtIn[n];
				} else {
					Word += TxtIn[n];
				}
			} else {
				Word += TxtIn[n];
				if (TxtIn[n] == Group[g]) {
					Prv = Group[g];
					g = -1;
					TxtOut += Word;
					Word = "";
				}
			}
			n++;
		}
		TxtOut += Word;
		return TxtOut;
	}

	/* Lock the existing property values to prevent accidental changes. */
	deepFreeze(this);

	/* Debugging Feature: Enables directing errors to the console by typing "xyzzy". */
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

	/* Automatically link up UInv display elements when passage is rendered. */
	$(document).on(":passageend", function (ev) {
		if (!UInv.UpdatesAreLocked()) {
			UInv.UpdateDisplay();
		}

		var el = $("#uinv-radial-menu").get(0);
		if (UInv.isUndefined(el)) {
			UInv.InitializeRadialMenu();
		} else {
			if (el.dataset.status == "opened") {  /* Cancel radial menu */
				ev.cancelType = "NewPassage";
				var Ret = UInv.CallEventHandler("radialMenu", "Cancel", ev);  /* radialMenu Cancel event (New passage) */
				if (Ret.keepOpen !== true) {
					el.dataset.status = "closed";
					el.style.transform = "scale(0, 0)";
					el.style.opacity = 0;
				}
				UInv.UpdateDisplay();
			}
		}

		/* Textarea cursor fix for Chrome & Firefox. */
		$("textarea").mousemove(function (e) {
			var myPos = $(this).offset();
			myPos.bottom = $(this).offset().top + $(this).outerHeight();
			myPos.right = $(this).offset().left + $(this).outerWidth();
			if (myPos.right > e.pageX && e.pageX > myPos.right - 16) {
				if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 16) {
					if ($(this).css("cursor") != "ns-resize") {
						$(this).css("cursor", "ns-resize");  /* Chrome fix */
					}
				} else {
					if ($(this).prop("clientHeight") < $(this).prop("scrollHeight")) {
						if ($(this).css("cursor") != "default") {
							$(this).css("cursor", "default");  /* Firefox fix */
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

	/* <<UInvSet>> macro: This macro wraps each line in <<set (line)>>, adds "UInv." in front of any UInv function calls (including custom aliases), and executes it. */
	/* Usage:
			<<UInvSet>>
				AddBag("backpack")
				AddItem("", "pants")
				SetItemQuantity("", "", 5 + BagHasItem("", ""))
				_Items = GetType(_itemType)
			<</UInvSet>>
	*/
	Macro.add('UInvSet', {
		skipArgs : true,
		tags     : null,
		handler  : function () {
			var Lines = this.payload[0].contents.split("\n"), i, output = "";
			for (i = 0; i < Lines.length; i++) {
				Lines[i] = parseUInvLine(Lines[i]);
				if (Lines[i] != "") {
					output += "<<set " + Lines[i].trim() + ">>";
				}
			}
			$(this.output).wiki(output);
		}
	});

	/* <<UInvTry>> macro: This macro tries to execute a <<set>> macro, adding "UInv." in front of any UInv functions.  Failure is determined by whether or not UInv (or any other code) throws an error. */
	/*                    If it succeeds, the chunk of code between <<UInvTry>> and <<Failure>> will execute normally, and the code between <<Failure>> and <</UInvTry>> will *not* execute. */
	/*                    If there is an error, the chunk of code between <<Failure>> and <</UInvTry>> will execute normally, and the code between <<UInvTry>> and <<Failure>> will *not* execute. */
	/* Usage:
			<<UInvTry "AddBag('backpack')">>\
				Success!
			<<Fail>>\
				Failure: $UInvLastErrorMessage
			<</UInvTry>>\
	*/
	Macro.add('UInvTry', {
		skipArgs : false,
		tags     : ["Fail"],
		handler  : function () {
			if ((this.args.length < 1) || (!UInv.isString(this.args[0]))) {
				throw new Error("<<UInvTry>> macro needs a string of code as an argument to test.");
			}
			if (this.payload.length != 2) {
				throw new Error('<<UInvTry>> macro needs to be set up using the <<UInvTry "(code to try here)">>(success code here)<<Fail>>(failure code here)<</UInvTry>> format.');
			}
			var Action = "_UInvResult = " + parseUInvLine(this.args[0]);
			try {
				var TmpErr = UInv.GetLastError(true);
				Scripting.evalTwineScript(Action);
				if (UInv.GetLastError() === "") {
					if (TmpErr) {
						State.variables.UInvLastErrorMessage = TmpErr;
					}
					/* Success */
					$(this.output).wiki(this.payload[0].contents);
				} else {
					/* Failure */
					$(this.output).wiki(this.payload[1].contents);
				}
			} catch(error) {
				/* Failure */
				State.variables.UInvLastErrorMessage = "SugarCube Error: " + error.message;
				$(this.output).wiki(this.payload[1].contents);
			}
		}
	});
}
UInvObject.prototype = (function () {

	/* UInv Private Functions:  (internal use only)
	   =======================

	   Error: Handle setting $UInvLastErrorMessage to the error string and possibly displaying UInv errors based on the value of $UInvShowAlerts.
	          This can be used for debugging and/or letting users know how to report this error.
	*/
	function UInvError (ErrStr) {
		var AlertMsg = "Error: " + ErrStr, Txt, GUA = UInv.GetUserAlerts();
		if (GUA) {
			if (GUA & UInv.ERROR_SHOW_PASSAGE_NAME) {  /* jshint ignore:line */
				Txt = 'Passage = "' + passage() + '"';
				AlertMsg += "\n" + Txt;
			}
			if (UInv.isProperty(State.variables, "UInvErrorStringAddendum")) {
				Txt = State.variables.UInvErrorStringAddendum;
				AlertMsg += "\n" + Txt;
			}
		}
		State.variables.UInvLastErrorMessage = AlertMsg;
		if (GUA & UInv.ERROR_SHOW_ALERT) {  /* jshint ignore:line */
			alert(AlertMsg);
		}
		if (GUA & UInv.ERROR_TO_CONSOLE) {  /* jshint ignore:line */
			console.log(AlertMsg);
		}
		if (GUA & UInv.ERROR_THROW_ERROR) {  /* jshint ignore:line */
			throw new Error("\nUInv " + State.variables.UInvLastErrorMessage);   /* This must be last because it exits the function here. */
		}
		return GUA;  /* Success */
	}

	/* FixBagName: Returns $UInvCurrentBagName if BagName === "", else returns BagName, or undefined on error. */
	function FixBagName (BagName) {
		if (UInv.isString(BagName)) {
			if ((BagName === "") && UInv.isString(UInv.GetCurrentBagName())) {
				return UInv.GetCurrentBagName();
			}
			return BagName;  /* Success */
		} else {
			UInvError('BagName passed to FixBagName is not a string.');  /* Error */
			return undefined;
		}
	}

	/* ValidateItemName: Returns validated ItemName or undefined on failure. */
	function ValidateItemName (ItemName) {
		if (UInv.isString(ItemName)) {
			var NewItemName = ItemName.toLowerCase();
			if (!UInv.ReservedBagProperties_LC.includes(NewItemName)) {
				return NewItemName;  /* Success */
			} else {
				return undefined;  /* Failure */
			}
		} else {
			return undefined;  /* Failure */
		}
	}

	/* FixItemName: Returns $UInvCurrentItemName if ItemName === "", else returns ItemName, or undefined on error. */
	function FixItemName (ItemName) {
		if (UInv.isString(ItemName)) {
			var NewItemName = ItemName.toLowerCase();  /* fix case since all item names are lowercase */
			if (!UInv.ReservedBagProperties_LC.includes(NewItemName)) {
				if ((NewItemName === "") && UInv.isString(UInv.GetCurrentItemName())) {  /* OOO function call */
					NewItemName = ValidateItemName(UInv.GetCurrentItemName());  /* OOO function call */
					if (NewItemName) {
						return NewItemName;  /* Success */
					} else {
						delete State.variables.UInvCurrentItemName;  /* delete invalid value */
						return "";  /* Success */
					}
				}
				return NewItemName;  /* Success */
			} else {
				UInvError('FixItemName failed.  Illegal item name "' + ItemName + '" used.');  /* Error */
				return undefined;
			}
		} else {
			UInvError('ItemName passed to FixItemName is not a string.');  /* Error */
			return undefined;
		}
	}

	function FixContainerReferences (OldBagName, OldItemName, NewBagName, NewItemName) {
		var PocketNames = UInv.GetItemPocketNameArray(NewBagName, NewItemName);
		if (PocketNames.length > 0) {
			var PocketBag, Containers, i, j;
			for (i = 0; i < PocketNames.length; i++) {  /* Update pockets' references to match the container's new bag and/or item name(s) */
				PocketBag = UInv.GetItemPocketBagName(NewBagName, NewItemName, PocketNames[i]);
				Containers = UInv.GetPocketBagContainerArray(PocketBag);
				for (j = 0; j < Containers.length; j++) {
					if ((Containers[j].ContainerBagName == OldBagName) && (Containers[j].ContainerName == OldItemName) && (Containers[j].PocketName == PocketNames[i])) {
						State.variables.UInvBags[PocketBag].UInvContainer[j].ContainerBagName = NewBagName;
						State.variables.UInvBags[PocketBag].UInvContainer[j].ContainerName = NewItemName;
					}
				}
			}
		}
		return true;  /* Success */
	}

	/* tryIntParse: Attempts to parse strings to integers if Value is a string, returns either a number or undefined if Value isn't a number. */
	/* !!NOTE!! - The return value from this function will not necessarily be an integer.  Values which are already numbers will be returned as-is. */
	function tryIntParse (Value) {
		if (UInv.isString(Value)) {
			if (UInv.isNumber(parseInt(Value, 10))) {
				Value = parseInt(Value, 10);
			}
		}
		if (UInv.isNumber(Value)) {
			return Value;  /* Success */
		}
		return undefined;  /* Unable to parse */
	}

	/* RemoveItemObjectsDefaultProperties: Removes all default properties from Obj.  Returns true on success or undefined on error. */
	/* !!!IMPORTANT!!! - The object passed to this function is directly modified by this function.  Do not pass objects that shouldn't be modified!!! */
	function RemoveItemObjectsDefaultProperties (Obj, DefaultItemType) {
		if (UInv.isGenericObject(Obj)) {
			if (UInv.isString(DefaultItemType)) {
				var DefItem = UInv.GetDefaultItemObject(DefaultItemType);
				if (DefItem) {  /* Delete all properties that are equal to GetDefaultItemObject properties of DefaultItemType. */
					var DefKeys = Object.keys(DefItem), i;
					if ((DefKeys.length > 0) && (!DefKeys.includes("UInvVariableType"))) {
						for (i = 0; i < DefKeys.length; i++) {
							if (!["UInvPocket", "UInvQuantity"].includes(DefKeys[i])) {
								if (UInv.isProperty(Obj, DefKeys[i])) {
									if (UInv.valuesAreEqual(Obj[DefKeys[i]], DefItem[DefKeys[i]])) {  /* OOO function call. (OOO = Out Of Order, meaning that function exists in the code below, instead of above.) */
										delete Obj[DefKeys[i]];  /* Matches default value of GetDefaultItemObject version. */
									}
								}
							}
						}
					}
				}
				return true;  /* Success */
			} else {
				UInvError('DefaultItemType passed to RemoveItemObjectsDefaultProperties is not a string.');  /* Error */
				return undefined;
			}
		} else {
			UInvError('RemoveItemObjectsDefaultProperties failed. Obj is not a generic object.');  /* Error */
			return undefined;
		}
	}

	return {

	/* UInv Public Functions: */
	/* ====================== */

		/* UInv Constructor: */
		/* ================= */

		constructor : UInvObject,

		/* UInv Constants: */
		/* =============== */

		/* Values for UInvMergeItemMethod and UInv.SetMergeItemMethod to determine how UInv handles item collision. */
		MERGE_USE_ONLY_DESTINATION_PROPERTIES : 1,  /* Ignore source properties, just increment destination's quantity. (default) */
		MERGE_USE_ONLY_SOURCE_PROPERTIES : 2,       /* Delete the destination's properties, replace with the source's properties and values, and increment the quantity. */
		MERGE_PREFER_DESTINATION_PROPERTIES : 3,    /* Keep the properties and values in the destination, add any properties and values the source had but the destination didn't, and increment the quantity. */
		MERGE_PREFER_SOURCE_PROPERTIES : 4,         /* Keep the properties and values in the source, add any properties and values the destination had but source the didn't, and increment the quantity. */
		MERGE_RENAME_SOURCE_ITEMNAME : 5,           /* Rename the source's unique identifier so that it's stored separately in the destination bag. */
		MERGE_FAIL_WITH_ERROR : 6,                  /* Fail with an error. */

		/* Values for $UInvShowAlerts, used with SetUserAlerts.  Values can be added together except for ERROR_NONE. */
		ERROR_NONE : false,           /* Do not display any error messages to users. */
		ERROR_SHOW_PASSAGE_NAME : 1,  /* Displays the current passage name in any error messages. */
		ERROR_SHOW_ALERT : 2,         /* Displays a modal dialog box for each error message and pauses execution. */
		ERROR_THROW_ERROR : 4,        /* Throws traditional Twine/SugarCube error messages, instead of silently returning a value which indicates that a UInv error occurred. */
		ERROR_TO_CONSOLE : 8,         /* Outputs any error messages to the console window. */

		/* AP style says that positive integers less than 10 should be written as text.  This array converts values zero through nine a text.  (e.g. UInv.NumText[5] === "five") */
		NumText : ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],  /* Used in Display functions. */
		/* AP style says that ordinals from one through nine should be written as text.  This array converts values one through nine to text.  (e.g. UInv.OrdinalText[5] === "fifth") */
		OrdinalText : ["0th", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth"],  /* do not use 0 */
		OrdinalSuffix : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"],

		/* The default maximum number of images to cache. */
		DefaultMaxCache : 100,
		/* The default maximum number of images to download at the same time using the image cache code. */
		DefaultMaxConcurrent : 5,

		/* Reserved property names within bags. */
		ReservedBagProperties : ["", "-", "UInvTouched", "UInvProperties", "UInvDefaultBagType", "UInvContainer"],
		ReservedBagProperties_LC : ["", "-", "uinvtouched", "uinvproperties", "uinvdefaultbagtype", "uinvcontainer"],  /* lowercase version */
		/* Reserved property names within items. */
		ReservedItemProperties : ["UInvQuantity", "UInvDefaultItemType", "UInvVariableType", "UInvPocket", "UInvCell"],

		/* This is the maximum pocket depth allowed on default items or bags to prevent accidental infinite recursion or exponential explosions. */
		MaximumPocketDepth : 3,


		/* UInv Utility Functions: */
		/* ======================= */

		/* isArray: Returns if a value is an array. */
		isArray : function (Value) {
			return Array.isArray(Value);
		},

		/* isBoolean: Returns if a value is a boolean. */
		isBoolean : function (Value) {
			return typeof Value === "boolean";
		},

		/* isDate: Returns if value is a date object. */
		isDate : function (Value) {
			return UInv.isObject(Value) && Value instanceof Date;
		},

		/* isFunction: Returns if a value is a function. */
		isFunction : function (Value) {
			return typeof Value === "function";
		},

		/* isGenericObject: Returns if a value is a generic object. */
		isGenericObject : function (Value) {
			return UInv.isObject(Value) && Value.constructor === Object;
		},

		/* isInteger: Returns if a value is an integer. */
		isInteger : function (Value) {
			return Number.isInteger(Value);
		},

		/* isMap: Returns if a value is a map. */
		isMap : function (Value) {
			return UInv.isObject(Value) && Value instanceof Map;
		},

		/* isNumber: Returns if a value is a number. */
		isNumber : function (Value) {
			return typeof Value === "number" && Number.isFinite(Value);
		},

		/* isObject: Returns if a value is an object. */
		isObject : function (Value) {
			return !!Value && typeof Value === "object";
		},

		/* isProperty: Returns if Prop is a property of the object Obj. */
		isProperty : function (Obj, Prop) {
			if (UInv.isObject(Obj)) {
				return Obj ? hasOwnProperty.call(Obj, Prop) : false;
			}
			return false;
		},

		/* Returns if a value is a regexp. */
		isRegExp : function (Value) {
			return UInv.isObject(Value) && Value.constructor === RegExp;
		},

		/* isSet: Returns if a value is a set. */
		isSet : function (Value) {
			return UInv.isObject(Value) && Value instanceof Set;
		},

		/* isString: Returns if a value is a string. */
		isString : function (Value) {
			return typeof Value === "string" || Value instanceof String;
		},

		/* isUndefined: Returns if a value is undefined. */
		isUndefined : function (Value) {
			return typeof Value === "undefined";
		},

		/* spread: Returns a Map, Set, or String converted to an array.  If the second parameter is an Array, Map, Set, or String, then the two objects are spread and returned as a single array.
				   If a function is passed as the second parameter, this calls the function with the spread array as parameters and returns that function's value. */
		spread : function (Value, Funct) {
			var arr = [];
			if (UInv.isArray(Value)) {
				arr = clone(Value);
			} else if (UInv.isMap(Value)) {
				/* eslint-disable-next-line no-unused-vars */
				Value.forEach(function(val, key, map) {
					arr.push([key, val]);
				});
			} else if (UInv.isSet(Value)) {
				/* eslint-disable-next-line no-unused-vars */
				Value.forEach(function(val, key, set) {
					arr.push(val);
				});
			} else if (UInv.isString(Value)) {
				arr = Value.split('');
			}
			if (UInv.isFunction(Funct)) {
				return Funct.apply(null, arr);
			} else if (UInv.isObject(Funct)) {
				arr = arr.concat(UInv.spread(Funct));
			}
			return arr;
		},

		/* arraysAreEqual: Check two arrays to see if they're identical.  IgnoreObjectPairs is for internal use to prevent infinite loops of objects. */
		arraysAreEqual : function (Array1, Array2, IgnoreObjectPairs) {
			if (UInv.isArray(Array1) && UInv.isArray(Array2)) {
				var i = 0;
				if (UInv.isUndefined(IgnoreObjectPairs)) {
					IgnoreObjectPairs = [];
				}
				if (IgnoreObjectPairs.length > 0) {
					for (i = 0; i < IgnoreObjectPairs.length; i++) {
						if (((IgnoreObjectPairs[i][0] === Array1) && (IgnoreObjectPairs[i][1] === Array2)) ||
							((IgnoreObjectPairs[i][0] === Array2) && (IgnoreObjectPairs[i][1] === Array1))) {
								return true;  /* Ignores object pairs that have already been checked to prevent infinite loops. */
						}
					}
				}
				IgnoreObjectPairs.push([Array1, Array2]);
				if (Array1.length !== Array2.length) {
					return false;  /* Arrays are not the same length. */
				}
				if (Array1.length > 0) {
					for (i = 0; i < Array1.length; i++) {
						if (!UInv.valuesAreEqual(Array1[i], Array2[i], IgnoreObjectPairs)) {  /* OOO function call. */
							return false;  /* Values or types do not match. */
						}
					}
				}
				return true;  /* All values match. */
			}
			return false;  /* Both are not arrays. */
		},

		/* mapsAreEqual: Returns if two maps contain the same values in the same order.  IgnoreObjectPairs is for internal use to prevent infinite loops of objects. */
		mapsAreEqual : function (Map1, Map2, IgnoreObjectPairs) {
			if (UInv.isMap(Map1) && UInv.isMap(Map2)) {
				if (Map1.size === Map2.size) {
					if (UInv.isUndefined(IgnoreObjectPairs)) {
						IgnoreObjectPairs = [];
					}
					if (IgnoreObjectPairs.length > 0) {
						for (var i = 0; i < IgnoreObjectPairs.length; i++) {
							if (((IgnoreObjectPairs[i][0] === Map1) && (IgnoreObjectPairs[i][1] === Map2)) ||
								((IgnoreObjectPairs[i][0] === Map2) && (IgnoreObjectPairs[i][1] === Map1))) {
									return true;  /* Ignores object pairs that have already been checked to prevent infinite loops. */
							}
						}
					}
					IgnoreObjectPairs.push([Map1, Map2]);
					var a = UInv.spread(Map1), b = UInv.spread(Map2);
					return UInv.arraysAreEqual(a, b, IgnoreObjectPairs);  /* Compares maps. */
				}
			}
			return false;  /* Both are either not maps or are maps of different sizes. */
		},

		/* objectsAreEqual: Check two objects to see if they're identical.  IgnoreObjectPairs is for internal use to prevent infinite loops of objects. */
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
								return true;  /* Ignores object pairs that have already been checked to prevent infinite loops. */
						}
					}
				}
				IgnoreObjectPairs.push([Obj1, Obj2]);
				if (UInv.isGenericObject(Obj1) && UInv.isGenericObject(Obj2)) {
					var Keys1 = Object.keys(Obj1).sort(), Keys2 = Object.keys(Obj2).sort();
					if (!UInv.arraysAreEqual(Keys1, Keys2)) {
						return false;  /* Objects have a different number of keys or have different keys. */
					}
					if (Keys1.length > 0) {
						var Key;
						for (i = 0; i < Keys1.length; i++) {
							Key = Keys1[i];
							if (!UInv.valuesAreEqual(Obj1[Key], Obj2[Key], IgnoreObjectPairs)) {  /* OOO function call. */
								return false;  /* Values do not match. */
							}
						}
					}
					return true;  /* All values match. */
				} else {
					return UInv.valuesAreEqual(Obj1, Obj2, IgnoreObjectPairs);  /* Return whether objects match. OOO function call. */
				}
			}
			return false;  /* Both are not objects. */
		},

		/* setsAreEqual: Returns if two sets contain the same values in the same order.  IgnoreObjectPairs is for internal use to prevent infinite loops of objects. */
		setsAreEqual : function (Set1, Set2, IgnoreObjectPairs) {
			if (UInv.isSet(Set1) && UInv.isSet(Set2)) {
				if (Set1.size === Set2.size) {
					if (UInv.isUndefined(IgnoreObjectPairs)) {
						IgnoreObjectPairs = [];
					}
					if (IgnoreObjectPairs.length > 0) {
						for (var i = 0; i < IgnoreObjectPairs.length; i++) {
							if (((IgnoreObjectPairs[i][0] === Set1) && (IgnoreObjectPairs[i][1] === Set2)) ||
								((IgnoreObjectPairs[i][0] === Set2) && (IgnoreObjectPairs[i][1] === Set1))) {
									return true;  /* Ignores object pairs that have already been checked to prevent infinite loops. */
							}
						}
					}
					IgnoreObjectPairs.push([Set1, Set2]);
					var a = UInv.spread(Set1), b = UInv.spread(Set2);
					return UInv.arraysAreEqual(a, b, IgnoreObjectPairs);  /* Compares sets. */
				}
			}
			return false;  /* Both are either not sets or are sets of different sizes. */
		},

		/* setsMatch: Returns if two sets contain matches for all values in any order. */
		setsMatch : function (Set1, Set2) {
			if (UInv.isSet(Set1) && UInv.isSet(Set2)) {
				if (Set1.size === Set2.size) {
					if (Set1.size > 0) {  /* Compare sets. */
						var setIterator = Set1.values();
						var result = setIterator.next();
						while (!result.done) {
							if (!Set2.has(result.value)) return false;  /* Sets do not match. */
							result = setIterator.next();
						}
					}
					return true;  /* Sets match. */
				}
			}
		},

		/* valuesAreEqual: Check two variables to see if they're identical.  This function does not support comparing symbols, functions, or custom types. */
		/*                 IgnoreObjectPairs is for internal use to prevent infinite loops of objects. */
		valuesAreEqual : function (Var1, Var2, IgnoreObjectPairs) {
			if (typeof Var1 === typeof Var2) {
				switch (typeof Var1) {
					/* String */
					case "string":
					/* Number */
					case "number":
					/* Boolean */
					case "boolean":
						return Var1 === Var2;  /* Returns whether variables are equal or not. */
					/* Undefined */
					case "undefined":
						return true;  /* Variables are both undefined. */
					/* Object */
					case "object":
						/* Array Object */
						if (UInv.isArray(Var1) && UInv.isArray(Var2)) {
							return UInv.arraysAreEqual(Var1, Var2, IgnoreObjectPairs);  /* Return whether arrays are equal. */
						/* Generic Object */
						} else if (UInv.isGenericObject(Var1) && UInv.isGenericObject(Var2)) {
							return UInv.objectsAreEqual(Var1, Var2, IgnoreObjectPairs);  /* Return whether generic objects are equal. */
						/* Date Object */
						} else if (UInv.isDate(Var1) && UInv.isDate(Var2)) {
							return (Var1 - Var2) == 0;  /* Returns whether dates are equal. */
						/* Map Object */
						} else if (UInv.isMap(Var1) && UInv.isMap(Var2)) {
							return UInv.mapsAreEqual(Var1, Var2, IgnoreObjectPairs);  /* Return whether maps are equal. */
						/* Set Object */
						} else if (UInv.isSet(Var1) && UInv.isSet(Var2)) {
							return UInv.setsAreEqual(Var1, Var2, IgnoreObjectPairs);  /* Return whether sets are equal. */
						/* Null Object */
						} else if ((Var1 === null) && (Var2 === null)) {
							return true;  /* Objects are both null. */
						}
						return false;  /* Objects either don't match or are of an unsupported type. */
					default:
						return false;  /* Unsupported type. */
				}
			} else {
				return false;  /* Variables are not of the same type. */
			}
		},

		/* arrayHasTag: Returns the number of times Tag is found in array, or undefined if there is an error. */
		arrayHasTag : function (Arr, Tag) {
			if (!UInv.isUndefined(Tag) && UInv.isArray(Arr)) {
				return Arr.count(Tag);
			} else {
				return undefined;  /* Error */
			}
		},

		/* arrayHasAllTags: Returns true if Array1 has an equal or greater number of all tags in TagArray, or undefined if there is an error. */
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
						return false;  /* Array1 can't have enough tags to satisfy test. */
					}
					return true;
				} else {
					return false;  /* TagArray is empty. */
				}
			} else {
				return undefined;  /* Error */
			}
		},

		/* arrayHasAnyTag: Returns true if Array1 has at least one of the tags in TagArray, or undefined if there is an error. */
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
					return false;  /* TagArray is empty */
				}
			} else {
				return undefined;  /* Error */
			}
		},

		/* isArrayOfType: Test an array to see if all the values in the array are of one type. */
		isArrayOfType : function (Arr, Type) {
			if (UInv.isArray(Arr)) {
				var i = 0;
				if (Arr.length) {
					var funct;
					Type = Type.toLowerCase();
					switch (Type) {
						case "array":
							funct = UInv.isArray;
							break;
						case "boolean":
							funct = UInv.isBoolean;
							break;
						case "date":
							funct = UInv.isBoolean;
							break;
						case "generic object":
							funct = UInv.isGenericObject;
							break;
						case "integer":
							funct = UInv.isInteger;
							break;
						case "map":
							funct = UInv.isMap;
							break;
						case "number":
							funct = UInv.isNumber;
							break;
						case "object":
							funct = UInv.isObject;
							break;
						case "set":
							funct = UInv.isSet;
							break;
						case "string":
							funct = UInv.isString;
							break;
						default:
							return undefined;  /* Error: Unknown type */
					}
					for (i = 0; i < Arr.length; i++) {
						if (!funct(Arr[i])) {
							return false;  /* Array is not all of that type */
						}
					}
					return true;  /* Array is all of that type */
				}
				return false;  /* Array is empty */
			} else {
				return undefined;  /* Error: Not an array */
			}
		},

		/* isArrayOfArrays: Test an array to see if all the values are arrays. */
		isArrayOfArrays : function (Arr) {
			return UInv.isArrayOfType(Arr, "array");
		},

		/* isArrayOfBooleans: Test an array to see if all the values are booleans. */
		isArrayOfBooleans : function (Arr) {
			return UInv.isArrayOfType(Arr, "boolean");
		},

		/* isArrayOfDates: Test an array to see if all the values are dates. */
		isArrayOfDates : function (Arr) {
			return UInv.isArrayOfType(Arr, "date");
		},

		/* isArrayOfGenericObjects: Test an array to see if all the values are generic objects. */
		isArrayOfGenericObjects : function (Arr) {
			return UInv.isArrayOfType(Arr, "generic object");
		},

		/* isArrayOfIntegers: Test an array to see if all the values are integers. */
		isArrayOfIntegers : function (Arr) {
			return UInv.isArrayOfType(Arr, "integer");
		},

		/* isArrayOfMaps: Test an array to see if all the values are maps. */
		isArrayOfMaps : function (Arr) {
			return UInv.isArrayOfType(Arr, "map");
		},

		/* isArrayOfNumbers: Test an array to see if all the values are numbers. */
		isArrayOfNumbers : function (Arr) {
			return UInv.isArrayOfType(Arr, "number");
		},

		/* isArrayOfObjects: Test an array to see if all the values are objects. */
		isArrayOfObjects : function (Arr) {
			return UInv.isArrayOfType(Arr, "object");
		},

		/* isArrayOfSets: Test an array to see if all the values are sets. */
		isArrayOfSets : function (Arr) {
			return UInv.isArrayOfType(Arr, "set");
		},

		/* isArrayOfStrings: Test an array to see if all the values are strings. */
		isArrayOfStrings : function (Arr) {
			return UInv.isArrayOfType(Arr, "string");
		},

		/* combineGenericObjects: Returns a new object that has the combined properties of Obj1 and Obj2, with Obj2's properties preferred when both objects have matching property names. */
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
				return Result;  /* Success */
			} else {
				return undefined;  /* Error: Not generic objects */
			}
		},

		/* getUniqueArray: Returns an array so that all elements of the original array are now unique, or undefined on error. */
		getUniqueArray : function (Arr) {
			if (UInv.isArray(Arr)) {
				var hash = {};
				Arr.forEach( function (value) { hash[value + '::' + typeof value] = value; } );
				return Object.keys(hash).map( function (value) { return hash[value]; } );
			} else {
				return undefined;  /* Error: Not an array */
			}
		},

		/* getArraySortedByOtherArray: Returns UnsortedArray sorted based on ArrayToSortBy and subsorted by UnsortedArray value.  This is a case insensitive sort. */
		/*                             If RemoveDuplicates is true, it also removes any elements where its pair is duplicated in both arrays. */
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
						for (i = 0; i < length / 2; i++) {  /* improved cocktail shaker sort with subsorting by unsorted array */
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
					return UA;  /* Success */
				}
			}
			return undefined;  /* Error - one or both of the first two parameters were not arrays */
		},

		/* getArrayReverseSortedByOtherArray: Returns UnsortedArray reverse sorted based on ArrayToSortBy and subsorted by UnsortedArray value.  This is a case insensitive sort. */
		/*                                    If RemoveDuplicates is true, it also removes any elements where its pair is duplicated in both arrays. */
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
						for (i = 0; i < length / 2; i++) {  /* improved cocktail shaker sort with subsorting by unsorted array */
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
					return UA;  /* Success */
				}
			}
			return undefined;  /* Error - one or both of the first two parameters were not arrays */
		},

		/* arrayObjectIncludes: Searches an array for generic objects with a property of ObjProperty that == Value. */
		/*                      Returns true if it finds any matches, false when unable to find any matches, and undefined on error. */
		arrayObjectIncludes : function (Arr, ObjProperty, Value) {
			if (UInv.isArray(Arr)) {
				if (Arr.length == 0) {
					return false;  /* Success - empty array */
				}
				if (UInv.isString(ObjProperty)) {
					if (arguments.length >= 3) {
						var i;
						for (i = 0; i < Arr.length; i++) {
							if (UInv.isGenericObject(Arr[i])) {
								if (UInv.isProperty(Arr[i], ObjProperty)) {
									if (Arr[i][ObjProperty] == Value) {
										return true;  /* Success - found match */
									}
								}
							}
						}
					} else {
						return undefined;  /* Error */
					}
				} else {
					return undefined;  /* Error */
				}
			} else {
				return undefined;  /* Error */
			}
			return false;  /* Success - value not found */
		},

		/* integerToOrdinal: Converts an integer to an ordinal string (e.g. "first", "20th", etc...). */
		/*                   Options = "NoOrdinalText", "UseSuperscript", and/or "Capitalize" */
		integerToOrdinal : function (Value, Options) {
			if (UInv.isInteger(Value)) {
				if (UInv.isString(Options)) {  /* turn string into an array of strings */
					Options = [ Options ];
				}
				if (!UInv.isArrayOfStrings(Options)) {  /* turn invalid Options parameter values into an empty array */
					Options = [];
				}
				var i;
				for (i = 0; i < Options.length; i++) {  /* convert any options to lowercase */
					Options[i] = Options[i].toLowerCase();
				}
				if ((!Options.includes("noordinaltext")) && (Value < 10) && (Value > 0)) {
					Value = UInv.OrdinalText[Value];  /* convert number to ordinal text, (e.g. 2 -> second) */
					if (Options.includes("capitalize")) {
						Value = Value.toUpperFirst();
					}
					return Value;
				} else {
					Value = Value.toLocaleString();  /* add commas or local variant */
					var Ending = Value.substring(Value.length - 2), Suffix;
					if (["11", "12", "13"].includes(Ending)) {  /* handle exceptions */
						Suffix = "th";
					} else {
						if (Ending.length > 1) {
							Ending = Ending.substring(1);
							Suffix = UInv.OrdinalSuffix[parseInt(Ending, 10)];  /* get correct suffix */
						}
					}
					if (Options.includes("usesuperscript")) {
						Suffix = "<sup>" + Suffix + "</sup>";  /* make suffix superscripted */
					}
					return Value + Suffix;  /* Success */
				}
			}
			return Value;  /* Does not change non-integers */
		},

		/* numberToAPString: Converts a number to a string that conforms to basic AP writing style guidelines. */
		/*                   For exceptions see: https://writingexplained.org/ap-style/ap-style-numbers */
		numberToAPString : function (Value) {
			function TrimEnd(Val) {
				if (Val.slice(-3) == ".00") {
					Val = Val.slice(0, -3);
				} else if (Val.slice(-1) == "0") {
					Val = Val.slice(0, -1);
				}
				return Val;
			}

			if (UInv.isNumber(Value)) {
				if (Number.isInteger(Value) && (Value < 10) && (Value >= 0)) {
					return UInv.NumText[Value];  /* convert number to number name */
				} else {  /* add "just over", "just under", "about", or "approximately"?  *** */
					if (Value >= Math.pow(10, 15)) {  /* 1 quadrillion */
						return TrimEnd((Value / Math.pow(10, 15)).toFixed(2)) + " quadrillion";
					} else if (Value >= Math.pow(10, 12)) {  /* 1 trillion */
						return TrimEnd((Value / Math.pow(10, 12)).toFixed(2)) + " trillion";
					} else if (Value >= Math.pow(10, 9)) {  /* 1 trillion */
						return TrimEnd((Value / Math.pow(10, 9)).toFixed(2)) + " billion";
					} else if (Value >= Math.pow(10, 6)) {  /* 1 trillion */
						return TrimEnd((Value / Math.pow(10, 6)).toFixed(2)) + " million";
					} else {
						/* return Value.toLocaleString( undefined, { maximumFractionDigits : 2 } );  /* add commas or local variant */
						Value = (Math.round(Value * 100) / 100);  /* Android workaround for not supporting toLocaleString's options parameter */
						return Value.toLocaleString();  /* add commas or local variant */
					}
				}
			}
			return Value;  /* Does not change non-numbers */
		},

		/* addArticle: Returns "a " or "an " followed by the string passed in, based on the first word passed to it.
			If "Caps" isn't set then it will "steal" any capitalization from the first word (e.g. "Hour" returns "An hour").
			If "Caps" is set to "true" then "a"/"an" will be capitalized and "WordIn" will be unchanged (e.g. "Tuesday" returns "A Tuesday").
			If "Caps" is set to "false" then "a"/"an" will be lowercase and "WordIn" will be unchanged (e.g. "Friday" returns "a Friday").
			You should use the "Caps" parameter when the word is a proper noun.
			If the first word starts with more than one capital letter it will be treated as an initialism (e.g. "FBI agent" returns "an FBI agent").
			If the word is an acronym instead of an initialism you should set "Acronym" to "true" to get the correct result (e.g. "FUBAR situation" returns "a FUBAR situation").
		*/
		addArticle : function (WordIn, Caps, Acronym) {
			function CapsFix(start, wrd) {
				if (initialism) {
					if (Caps === true) {
						return start.toUpperFirst() + " " + wrd;
					} else {
						return start + " " + wrd;
					}
				} else {
					if (Caps === true) {
						return start.toUpperFirst() + " " + wrd;
					} else if (Caps === false) {
						return start.toLowerCase() + " " + wrd;
					} else {
						if (ucase) {
							return start.toUpperFirst() + " " + wrd.charAt(0).toLowerCase() + wrd.substring(1, wrd.length);
						} else {
							return start.toLowerCase() + " " + wrd;
						}
					}
				}
			}

			if (!UInv.isString(WordIn)) {
				UInvError('addArticle failed. WordIn parameter is ' + UInv.addArticle(typeof WordIn) +', instead of a string.');  /* Error */
				return undefined;
			}
			if (!UInv.isUndefined(Caps)) {
				Caps = !!Caps;
			}
			if (UInv.isUndefined(Acronym)) {
				Acronym = false;
			} else {
				Acronym = !!Acronym;
			}
			/* Add to this list if it's missing a word which starts with both a consonant sound and a vowel.  Words should be in all lowercase. */
			var acon = ["ewe", "ewer", "once", "one", "onesie", "ouabain", "ouija", "u", "u-boat", "ubiquity", "ufo", "ufologist", "ufology", "uganda", "ugandan", "ukelele", "ukraine", "ukrainian", "ulysses", "unanimity", "unary", "upsilon", "uranium", "uranus", "urea", "ureter", "urethra", "urinal", "urinalysis", "urine", "urology", "us-ian", "usability", "usage", "usanian", "use", "user", "using", "usual", "usurer", "usuress", "usurp", "usurper", "usurping", "usury", "utahn", "ute", "utensil", "uterus", "utile", "utilitarian", "utility", "utilities", "utopia", "uvula", "uvular"];
			/* Add to this list if it's missing a word which starts with both a vowel sound and a consonant.  Words should be in all lowercase. */
			var anvwl = ["8", "f", "h", "heir", "heired", "heiress", "heiring", "heirloom", "herb", "herbal", "herbicide", "herbicidal", "herbivore", "herbivorous", "honest", "honestly", "honesty", "honor", "honorable", "honorary", "honored", "honoree", "honorific", "honoring", "honour", "honourary", "honourable", "honoured", "honouree", "honourific", "honouring", "hour", "hourly", "hourglass", "l", "m", "m", "r", "s", "x"];
			/* Add to this list any words where, if it's the first word, no article need be added.  Words should be in all lowercase.  Typically those words will be possessive nouns (e.g. "joan's" or "james'"). */
			var aanskip = ["a", "an", "her", "his", "it", "its", "my", "our", "that", "the", "their", "this", "your"];
			var initialism = false, i;
			/* Find the first word or number. */
			var word = WordIn.trim();  /* Trim spaces. */
			i = word.search(/[a-z0-9]/i);
			if (i > 0) {
				word = word.substring(i);  /* Trim non-alphanumeric characters off the front. */
			}
			if (word == "") {  /* Nothing left to check, so just return WordIn. */
				return WordIn;
			}
			i = word.search(/[^a-z]/i);
			if (i != 0) {  /* Word starts with a letter. */
				i = word.search(/[A-Z]/);
				if (i == 0) {  /* First character is a capital letter. */
					i = word.substring(1).search(/[A-Z]/);
					if (word.length == 1) {  /* The only letter is capitalized, so assume it's an initial. */
						initialism = true;
					} else if (i == 0) {  /* The first two or more letters are capitalized, so assume it's an initialism or acronym. */
						initialism = true;
						if (Acronym) {
							i = word.search(/[^A-Z]/);
							if (i > 0) {
								word = word.substring(0, i);  /* Trim out all non-capital letters for acronyms. */
							}
						} else {
							word = word.substring(0, 1);  /* Just grab the first letter for initialisms. */
						}
					} else {  /* Mixed case word */
						i = word.substring(1).search(/[^a-z]/i);
						if (i >= 0) {
							word = word.substring(0, i + 1);  /* Trim out everything after the first non-letter. */
						}
						if (word.length == 1) {  /* The only letter is capitalized, so assume it's an initial. */
							initialism = true;
						}
					}
				} else {  /* First character is a lowercase letter. */
					i = word.substring(1).search(/[^a-z]/i);
					if (i >= 0) {
						word = word.substring(0, i + 1);  /* Trim out everything after the first non-letter. */
					}
				}
			} else {  /* Word starts with a number. */
				word = word.substring(0, 1);  /* Just grab the first number. */
			}
			if (word == "") {  /* Nothing left to check, so just return WordIn. */
				return WordIn;
			}
			if (aanskip.includes(word.toLowerCase())) {  /* Check to see if the starting word is already an article or a possessive pronoun. */
				return WordIn;
			}
			var ucase = /^[A-Z]/.test(word);  /* See if the article needs to be capitalized. */
			word = word.toLowerCase();  /* Convert word to lowercase. */
			/* Figure out if the word starts with a vowel or consonant sound. */
			if ((word.indexOf("uni") == 0) || (word.indexOf("eu") == 0)) {  /* Words that start with "eu" and "uni" should have "a" in front. */
				return CapsFix("a", WordIn);
			}
			if (/^[aeiou].*/i.test(word)) {  /* Word starts with a vowel. */
				for (i = 0; i < acon.length; ++i) {
					if (word.length <= 2) {  /* No pluralization tests for short words. */
						if (word == acon[i]) {
							return CapsFix("a", WordIn);  /* Word starts with a consonant sound. */
						}
					} else if ((word == acon[i]) || (word == acon[i] + "s") || (word == acon[i] + "es")) {  /* Word starts with a consonant sound (also checks against plural versions). */
						return CapsFix("a", WordIn);  /* Word starts with a consonant sound. */
					}
				}
				return CapsFix("an", WordIn);  /* Word starts with a vowel sound. */
			} else {  /* Word starts with a consonant. */
				for (i = 0; i < anvwl.length; ++i) {
					if (word.length <= 2) {  /* No pluralization tests for short words. */
						if (word == anvwl[i]) {
							return CapsFix("an", WordIn);  /* Word starts with a vowel sound. */
						}
					} else if ((word == anvwl[i]) || (word == anvwl[i] + "s") || (word == anvwl[i] + "es")) {  /* Word starts with a vowel sound (also checks against plural versions). */
						return CapsFix("an", WordIn);  /* Word starts with a vowel sound. */
					}
				}
			}
			return CapsFix("a", WordIn);  /* Word starts with a consonant sound. */
		},

		/* getRandomHexString: Returns a random hexidecimal string of 6 characters. */
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

		/* getObjectProperties: Returns all of the properties and values of an object as a string.  Non-objects get returned unchanged. */
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
				if (Obj.length > 0) {
					Txt += " ]";
				} else {
					Txt += "]";
				}
				return Txt;
			} else if (UInv.isObject(Obj)) {
				var Keys = Object.keys(Obj).sort();  /* Sorted to make the output more consistent across browsers */
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
				if (Keys.length > 0) {
					Txt += " }";
				} else {
					Txt += "}";
				}
				return Txt;
			} else {
				return Obj;
			}
		},

		/* docHasCSSElement: If document has CSS element "CSSElement", returns the element's CSSStyleDeclaration object, otherwise returns "false". */
		docHasCSSElement : function (CSSElement) {
			var rules, i, j;
			for (i = 0; i < document.styleSheets.length; i++) {
				try {
					rules = document.styleSheets[i].rules;  /* This can throw an error sometimes. */
				} catch(e) {
					rules = undefined;  /* Error thrown */
				}
				if (rules === undefined) {  /* If .rules doesn't exist, try .cssRules */
					try {
						rules = document.styleSheets[i].cssRules;  /* This can throw an error sometimes. */
						if (rules === undefined) {
							rules = [];  /* Neither worked, so no rules. */
						}
					} catch(e) {
						rules = [];  /* Error thrown, so no rules. */
					}
				}
				for (j = 0; j < rules.length; j++) {
					if (rules[j].selectorText !== undefined) {
						if (typeof rules[j].selectorText == "string") {
							if (rules[j].selectorText == CSSElement) {  /* See if CSS selector matches CSSElement string. */
								return rules[j].style;  /* Success - found matching CSS selector. */
							}
						}
					}
				}
			}
			return false;  /* Success - no matching CSS selector found. */
		},

		/* initializeImageCache: Sets up setup.UInvImageCache for image caching. */
		initializeImageCache : function () {
			/* Set up image cache. */
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

		/* continueLoadingCache: Starts loading any waiting images if maxConcurrent images aren't already loading. */
		continueLoadingCache : function () {
			UInv.initializeImageCache();
			/* Retry loading errors?  Only when everything else is already loaded?  *** */
			if (setup.UInvImageCache.waiting > 0) {
				var Waiting = [], j;
				for (j = 0; j < setup.UInvImageCache.images.length; j++) {
					if (setup.UInvImageCache.images[j].status == "Waiting...") {
						Waiting.push(j);
					}
				}
				while (setup.UInvImageCache.loading < setup.UInvImageCache.maxConcurrent) {
					j = Waiting.shift();  /* Grab the index of the oldest waiting image */
					setup.UInvImageCache.loading++;
					setup.UInvImageCache.waiting--;
					setup.UInvImageCache.images[j].tries++;
					setup.UInvImageCache.images[j].status = "Loading...";
					setup.UInvImageCache.images[j].src = setup.UInvImageCache.images[j].URL;
				}
			}
			if (setup.UInvImageCache.loading == 0) {
				var ev = {};
				ev.complete = setup.UInvImageCache.complete;
				ev.loaded = setup.UInvImageCache.loaded;
				ev.errors = setup.UInvImageCache.errors;
				UInv.CallEventHandler("cacheImages", "Idle", ev);  /* cacheImages Idle event */
			}
		},

		/* flushCachedImages: Allows you to manually unload previously cached images. */
		flushCachedImages : function (Path, ImageName) {
			UInv.initializeImageCache();
			if (UInv.isString(Path)) {
				if (UInv.isString(ImageName)) {
					ImageName = [ImageName];
				}
				if (UInv.isArrayOfStrings(ImageName)) {
					if (UInv.isUndefined(setup.UInvImageCache)) {
						return true;  /* Success - No image cache existed */
					}
					var i, ndx;
					for (i = 0; i < ImageName.length; i++) {
						ndx = setup.UInvImageCache.map( function (obj) { return obj.URL; } ).indexOf(Path + ImageName[i]);
						if (ndx >=0) {
							setup.UInvImageCache.total--;
							$(setup.UInvImageCache.images[ndx]).off();  /* remove event handlers */
							setup.UInvImageCache.images[ndx].IgnoreEvents = true;  /* this should be redundant due to the .off() above */
							if (setup.UInvImageCache.images[ndx].status == "Waiting...") {
								setup.UInvImageCache.waiting--;
							} else if (setup.UInvImageCache[ndx].status == "Loading...") {
								setup.UInvImageCache.loading--;
								setup.UInvImageCache.images[ndx].src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAI=;";  /* transparent GIF to stop image loading */
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
					UInv.continueLoadingCache();  /* trigger loading any waiting images up to maxConcurrent */
					return true;  /* Success */
				} else {
					UInvError('ImageName passed to flushCachedImages is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Path passed to flushCachedImages is not a string.');  /* Error */
				return undefined;
			}
		},

		/* flushAllCachedImages: Clears out all cached images.  Also lets you set the maximum number of images to cache (defaults to 100) and the */
		/*                       maximum number of images do download concurrently (defaults to 5).  Returns true on success and undefined on error. */
		flushAllCachedImages : function (MaxConcurrent, MaxCache) {
			UInv.initializeImageCache();
			if (UInv.isUndefined(MaxCache)) { MaxCache = UInv.DefaultMaxCache; }
			if (UInv.isUndefined(MaxConcurrent)) { MaxConcurrent = UInv.DefaultMaxConcurrent; }
			if (UInv.isString(MaxCache)) { MaxCache = parseInt(MaxCache, 10); }
			if (UInv.isString(MaxConcurrent)) { MaxConcurrent = parseInt(MaxConcurrent, 10); }
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
					var ev = {};
					ev.complete = setup.UInvImageCache.complete;
					ev.loaded = setup.UInvImageCache.loaded;
					ev.errors = setup.UInvImageCache.errors;
					UInv.CallEventHandler("cacheImages", "Idle", ev);  /* cacheImages Idle event */
					return true;  /* Success */
				} else {
					UInvError('MaxConcurrent passed to flushAllCachedImages is not an integer.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('MaxCache passed to flushAllCachedImages is not an integer.');  /* Error */
				return undefined;
			}
		},

		/* getCachedImageObject: Returns a copy of the cached image object.  This way you can access properties like .naturalWidth and .naturalHeight on it. */
		/*                       Returns "null" if image not in cache, or undefined on error. */
		getCachedImageObject : function (Path, ImageName) {
			UInv.initializeImageCache();
			if (UInv.isString(Path)) {
				if (UInv.isString(ImageName)) {
					var ndx = setup.UInvImageCache.images.map( function (obj) { return obj.URL; } ).indexOf(Path + ImageName);
					if (ndx >= 0) {
						return setup.UInvImageCache.images[ndx];  /* Success */
					} else {
						return null;  /* Success - Image not found in cache */
					}
				} else {
					UInvError('ImageName passed to getCachedImageObject is not a string.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Path passed to getCachedImageObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* cacheImages: Allows you to preload images.  You can use the handler to receive notifications about load or error events. */
		/*             NOTE: The cache gets flushed whenever the game is reloaded or restarted.  Do NOT depend on files to exist in the cache. */
		cacheImages : function (Path, ImageName, Handler) {

			function Loaded(event) {  /* eslint-disable-line */
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
					UInv.CallEventHandler("cacheImages", "Loaded", this);  /* cacheImages Loaded event */
					UInv.continueLoadingCache();  /* trigger loading any waiting images up to maxConcurrent */
				}
			}
			function Failure(event) {  /* eslint-disable-line */
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
					var Ret = UInv.CallEventHandler("cacheImages", "Error", this);  /* cacheImages Error event */
					if (Ret.retryLoad !== true) {
						/* Error images are moved towards the start of the image cache so they get flushed first. */
						var x = setup.UInvImageCache.images.map( function (obj) { return obj.URL; } ).indexOf(this.URL);
						var img = setup.UInvImageCache.images.deleteAt(x)[0], n = 0;
						while ((n < setup.UInvImageCache.images.length) && (setup.UInvImageCache.images[n].status != "Error")) {
							n++;
						}
						setup.UInvImageCache.images.splice(setup.UInvImageCache.errors - 1, 0, img);
					} else {  /* Retry loading this image */
						setup.UInvImageCache.loading++;
						setup.UInvImageCache.complete--;
						setup.UInvImageCache.errors--;
						this.status = "Waiting...";
					}
					UInv.continueLoadingCache();  /* trigger loading any waiting images up to maxConcurrent */
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
					if (UInv.isString(Handler) && (ImageName.length > 0)) {  /* create imageGroup for event handlers */
						uniqueID = "iGrp" + (++i);
						while (!done) {  /* look for existing matching handlers */
							HandlerIDs = UInv.GetMatchingEventHandlersArray("cacheImages", "Loaded", { imageGroup: uniqueID });  /* OOO function call */
							if (HandlerIDs.length > 0) {
								for (j = 0; j < HandlerIDs.length; ++j) {
									/* if (any HandlerIDs have a handler that == Handler) then use current uniqueID, otherwise uniqueID = "iGrp" + (++i); and try again */
									if (UInv.GetEventHandlerByID("cacheImages", "Loaded", HandlerIDs[j]).handler == Handler) {
										done = true;
										break;  /* Break out of for loop */
									}
								}
								if (!done) {  /* try again */
									uniqueID = "iGrp" + (++i);
								}
							} else {  /* uniqueID is unique currently, so keep it */
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
								/* shift image at ndx to the front of the "loaded" line (if there is one) so it doesn't get flushed for being old */
								image = setup.UInvImageCache.images.deleteAt(ndx)[0];
								setup.UInvImageCache.images.splice(setup.UInvImageCache.total - setup.UInvImageCache.complete, 0, image);
								if (setup.UInvImageCache.images[ndx].status == "Error") {
									/* retry loading failed image */
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
							}  /* don't move "Waiting..." or "Loading..." images, they should already be at the "young" end of the line. */
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
								.on("load", Loaded)  /* other events: loadstart onprogress progress loadend */
								.on("error abort", Failure);
							if (setup.UInvImageCache.maxConcurrent > setup.UInvImageCache.loading) {  /* load image */
								setup.UInvImageCache.loading++;
								image.status = "Loading...";
								image.src = Path + ImageName[i];
								setup.UInvImageCache.images.push(image);
							} else {  /* add image to queue */
								setup.UInvImageCache.waiting++;
								image.status = "Waiting...";
								setup.UInvImageCache.images.push(image);
							}
						}
					}
					if (setup.UInvImageCache.images.length > setup.UInvImageCache.maxCache) {  /* Flush oldest images if cache is "full" */
						var OldURLs = setup.UInvImageCache.images.slice(0, setup.UInvImageCache.images.length - setup.UInvImageCache.maxCache).map( function (obj) { return obj.URL; } );
						UInv.flushCachedImages("", OldURLs);
					}
					return true;  /* Success */
				} else {
					UInvError('ImageName passed to cacheImages is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Path passed to cacheImages is not a string.');  /* Error */
				return undefined;
			}
		},

		/* Engine detection code: */
		/* Opera v8.0+ */
		isOpera : function () { return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0; },
		/* Firefox v1.0+ */
		isFirefox : function () { return typeof InstallTrigger !== "undefined"; },
		/* Safari v3.0+ "[object HTMLElementConstructor]" */
		isSafari : function () { return /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window.safari || (typeof safari !== "undefined" && safari.pushNotification)); },
		/* Internet Explorer v6-11 */
		isIE : function () { return /*@cc_on!@*/false || !!document.documentMode; },
		/* Edge v20+ */
		isEdge : function () { return !UInv.isIE() && !!window.StyleMedia; },
		/* Chrome v1+ */
		isChrome : function () { return !!window.chrome && !!window.chrome.webstore; },
		/* Blink engine detection */
		isBlink : function () { return (UInv.isChrome() || UInv.isOpera()) && !!window.CSS; },
		/* Android engine detection */
		isAndroid : function () { return Browser.isMobile.Android; },
		/* iOS engine detection */
		isiOS : function () { return Browser.isMobile.iOS; },
		/* BlackBerry engine detection */
		isBlackBerry : function () { return Browser.isMobile.BlackBerry; },
		/* Mobile engine detection */
		isMobile : function () { return ( UInv.isAndroid() || UInv.isiOS() || UInv.isBlackBerry() || Browser.isMobile.Windows ); },
		/* Twine engine detection */
		isTwine : function () { return window.hasOwnProperty("storyFormat"); },


		/* UInv Bag Functions: */
		/* =================== */

		/* GetDefaultBagObject: Returns the Bag object that matches BagType.  If PropertiesOnly is true, then returns default bag properties only. */
		/*                      Returns "null" for unknown bag types, or undefined on error.  Both "undefined" and "null" have "falsey" values. */
		GetDefaultBagObject : function (BagType, PropertiesOnly) {
			if (UInv.isString(BagType)) {
				if ((BagType === "") || (BagType === "-")) {
					/* Do not throw an error here.  This case is used to trigger an "undefined" return if the BagType === "" or "-". */
					return null;  /* Silent failure */
				}
				var BName = BagType.toLowerCase(), BagProperties = UInv.BagData(BName, true);
				if (PropertiesOnly) {
					return BagProperties;  /* Success */
				}
				var BagItems = UInv.BagData(BName, false), Bag = {}, Item = {}, Key = "", i = 0;
				if (UInv.isUndefined(BagProperties) || UInv.isUndefined(BagItems)) {
					return null;  /* Silent failure */
				}
				if (Object.keys(BagProperties).length > 0) {
					Bag = { UInvProperties : BagProperties };
				}
				if (BagItems.length > 0) {
					var ItemName;
					for (i = 0; i < BagItems.length; i++) {
						if (UInv.isString(BagItems[i])) {  /* Handle "String Method" */
							ItemName = ValidateItemName(BagItems[i]);  /* Make sure that the item name on the default bag object is valid */
							if (!UInv.isUndefined(ItemName)) {
								Item = UInv.GetDefaultItemObject(ItemName);  /* OOO function call */
								if (Item) {
									Bag[ItemName] = Item;
								} else {
									UInvError('GetDefaultBagObject failed. Unknown item "' + ItemName + '" on bag of type "' + BagType + '".');  /* Error */
									return undefined;
								}
							} else {
								UInvError('GetDefaultBagObject failed. Invalid item name "' + BagItems[i] + '" on bag of type "' + BagType + '".');  /* Error */
								return undefined;
							}
						} else if (UInv.isGenericObject(BagItems[i])) {  /* Handle "Quantity Method", "Type Method", and "Creation Method" */
							Key = Object.keys(BagItems[i])[0];
							ItemName = ValidateItemName(Key);  /* Make sure that the item name on the default bag object is valid */
							if (!UInv.isUndefined(ItemName)) {
								Item = UInv.GetDefaultItemObject(ItemName);  /* OOO function call */
								if (!Item && !UInv.isGenericObject(BagItems[i][ItemName])) {
									UInvError('GetDefaultBagObject failed. Unknown item type "' + ItemName + '" on bag type "' + BagType + '"..');  /* Error */
									return undefined;
								}
								if (Item && UInv.isInteger(BagItems[i][ItemName])) {  /* Handle "Quantity Method" */
									if (BagItems[i][ItemName] > 1) {
										Item.UInvQuantity = BagItems[i][ItemName];
									}
									Bag[ItemName] = Item;
								} else if (UInv.isGenericObject(BagItems[i][ItemName])) {  /* Handle "Type Method" and "Creation Method" */
									var ItemType = ItemName;
									if (UInv.isProperty(BagItems[i][ItemName], "UInvDefaultItemType")) {
										ItemType = BagItems[i][ItemName].UInvDefaultItemType;
									} else if (!Item) {
										ItemType = "-";
									}
									if (ItemType == "-") {  /* Handle "Creation Method" */
										Bag[ItemName] = BagItems[i][ItemName];
									} else {  /* Handle "Type Method" and "Type+Creation Method" */
										Bag[ItemName] = UInv.combineGenericObjects(UInv.GetDefaultItemObject(ItemType), BagItems[i][ItemName]);
									}
								} else {
									UInvError('GetDefaultBagObject failed. Value of item name "' + Key + '" on bag type "' + BagType + '" must be a "string" or "generic object".');  /* Error */
									return undefined;
								}
							} else {
								UInvError('GetDefaultBagObject failed. Invalid item name "' + Key + '" on bag of type "' + BagType + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('GetDefaultBagObject failed. Unexpected type "' + (typeof BagItems[i]) + '" for item on bag type "' + BagType + '".  Should be "string" or "generic object".');  /* Error */
							return undefined;
						}
					}
				}
				return Bag;  /* Success */
			} else {
				UInvError('BagType passed to GetDefaultBagObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetCurrentBagName: Gets the current bag name if there is one, otherwise returns "". */
		GetCurrentBagName : function () {
			if (UInv.isProperty(State.variables, "UInvCurrentBagName")) {
				return State.variables.UInvCurrentBagName;
			} else {
				return "";
			}
		},

		/* GetBagsArray: Returns an array of all bag names. */
		GetBagsArray : function () {
			return Object.keys(State.variables.UInvBags);  /* Success */
		},

		/* GetBagCount: Returns the number of bags. */
		GetBagCount : function () {
			return UInv.GetBagsArray().length;  /* Success */
		},

		/* BagExists: Returns true if bag exists/all bags in array exist, otherwise returns false, or undefined on error. */
		BagExists : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.isProperty(State.variables.UInvBags, BagName)) {
					State.variables.UInvCurrentBagName = BagName;  /* set $UInvCurrentBagName */
					return true;  /* Success */
				} else {
					return false;  /* Success */
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				var i = 0;
				for (i = 0; i < BagName.length; i++) {
					if (!UInv.BagExists(BagName[i])) {
						return false;  /* Success - bag missing */
					}
				}
				return true;  /* Success - found all bags */
			} else {
				UInvError('Name passed to BagExists is not a string or array of strings.');  /* Error */
				return undefined;
			}
		},

		/* SetCurrentBagName: Sets the UInvCurrentBagName to BagName for use as the default BagName parameter in UInv functions.  Returns true on success or undefined on error. */
		SetCurrentBagName : function (BagName) {
			if (UInv.isString(BagName)) {
				if (BagName === "") {
					if (UInv.isProperty(State.variables, "UInvCurrentBagName")) {
						delete State.variables.UInvCurrentBagName;
					}
				} else {
					if (!UInv.BagExists(BagName)) {  /* $UInvCurrentBagName gets set here */
						UInvError('SetCurrentBagName cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				}
				return true;  /* Success */
			} else {
				UInvError('Name passed to SetCurrentBagName is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetBagUntouched: Sets bag(s) to untouched and returns true, or false if there is an error. */
		SetBagUntouched : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					State.variables.UInvBags[BagName].UInvTouched = false;
					return true;  /* Success */
				} else {
					UInvError('SetBagUntouched cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i;
					for (i = 0; i < BagName.length; i++) {
						State.variables.UInvBags[BagName].UInvTouched = false;
					}
					return true;  /* Success */
				} else {
					UInvError('SetBagUntouched failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to SetBagUntouched is not a string or array of strings.');  /* Error */
				return undefined;
			}
		},

		/* CreateBag: Creates a bag named BagName if that bag doesn't exist already.  Returns true if it succeeded. */
		CreateBag : function (BagName) {
			if (UInv.isString(BagName)) {
				if (["", "-"].includes(BagName)) {
					UInvError('CreateBag failed. Invalid bag name "' + BagName + '".');  /* Error */
					return undefined;
				}
				if (UInv.BagExists(BagName)) {
					UInvError('CreateBag cannot create bag "' + BagName + '". Bag already exists with that name.');  /* Error */
					return undefined;
				} else {
					State.variables.UInvBags[BagName] = {};
					if (UInv.GetDefaultBagObject(BagName, true)) {
						State.variables.UInvBags[BagName].UInvDefaultBagType = "-";
					}
					UInv.SetBagUntouched(BagName);
					UInv.SetCurrentBagName(BagName);
					return true;  /* Success */
				}
			} else {
				UInvError('BagName passed to CreateBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetBagTouched: Sets bag(s) to touched and returns true, or false if there is an error. */
		SetBagTouched : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var ev = {};
					ev.bagName = BagName;
					ev.lockCount = UInv.GetUpdateLocks();
					var Ret = UInv.CallEventHandler("bag", "Touched", ev);  /* bag Touched event */
					if (Ret.ignoreTouch !== true) {
						if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvTouched")) {
							delete State.variables.UInvBags[BagName].UInvTouched;
						}
					}
					if (!UInv.UpdatesAreLocked()) {
						UInv.UpdateDisplay();
					}
					return true;  /* Success */
				} else {
					UInvError('SetBagTouched cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i;
					UInv.IncrementUpdateLock();
					for (i = 0; i < BagName.length; i++) {
						UInv.SetBagTouched(BagName[i]);
					}
					UInv.DecrementUpdateLock();
					return true;  /* Success */
				} else {
					UInvError('SetBagTouched failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to SetBagTouched is not a string or array of strings.');  /* Error */
				return undefined;
			}
		},

		/* EmptyBag: Deletes all items from bag.  Returns true if successful or undefined on error. */
		EmptyBag : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName);  /* OOO function call */
					if (Items.length > 0) {
						var i = 0;
						UInv.IncrementUpdateLock();  /* Prevent unnecessary updates. */
						for (i = 0; i < Items.length; i++) {
							UInv.DeleteItem(BagName, Items[i]);  /* OOO function call */
						}
						UInv.SetBagTouched(BagName);
						UInv.DecrementUpdateLock();
					}
					UInv.SetCurrentBagName(BagName);
					return true;  /* Success */
				} else {
					UInvError('EmptyBag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to EmptyBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddBag: Creates a bag named BagName if that bag doesn't exist already.  Returns true if it succeeded. */
		/*         Items will not be added if the current pocket depth >= the starting pocket depth + UInv.MaximumPocketDepth. */
		AddBag : function (BagName, DefaultBagType, StartDepth, CurrentDepth) {
			if (UInv.isString(BagName)) {
				if ((BagName != "") && (BagName != "-")) {
					if (UInv.isUndefined(DefaultBagType) || UInv.isString(DefaultBagType)) {
						if (UInv.BagExists(BagName)) {
							UInvError('AddBag cannot create bag "' + BagName + '". Bag already exists.');  /* Error */
							return undefined;
						} else {
							var Bag = {}, Tmp, TooDeep = false;
							if (UInv.isUndefined(StartDepth)) {
								StartDepth = 0;
								CurrentDepth = 0;
							} else if (CurrentDepth - StartDepth >= UInv.MaximumPocketDepth) {
								TooDeep = true;  /* This causes GetDefaultBagObject to only return the bag's properties, and not any items in it, to prevent infinite loops and exponential explosions */
							}
							if (UInv.isUndefined(DefaultBagType)) {
								DefaultBagType = BagName;
							}
							Tmp = UInv.GetDefaultBagObject(DefaultBagType, TooDeep);
							if (!Tmp) {
								UInvError('AddBag failed. Unknown bag type "' + DefaultBagType + '".');  /* Error */
								return undefined;
							}
							if (TooDeep) {
								Bag.UInvProperties = Tmp;  /* Don't add items because the pocket is too many levels deep; prevents infinite loops */
							} else {
								Bag = Tmp;
							}
							if (DefaultBagType != BagName) {
								Bag.UInvDefaultBagType = DefaultBagType;
							}
							if (UInv.isProperty(Bag, "UInvProperties")) {
								if (UInv.isProperty(Bag.UInvProperties, "UInvVariableType")) {
									Bag.UInvDefaultBagType = DefaultBagType;  /* bag is of a variable type, so its properties have to be kept as-is */
								} else {
									delete Bag.UInvProperties;  /* clear default properties */
								}
							}
							State.variables.UInvBags[BagName] = Bag;
							var Items = UInv.GetItemsArray(BagName);  /* OOO function call */
							UInv.IncrementUpdateLock();
							if (Items.length > 0) {
								var Quantities = UInv.GetItemsAndQuantitiesObject(BagName), i, ItemType, ItemProperties;  /* OOO function call */
								for (i = 0; i < Items.length; i++) {
									ItemType = UInv.GetItemsDefaultType(BagName, Items[i]);  /* OOO function call */
									if (ItemType !== "-") {  /* add item properly */
										ItemProperties = clone(State.variables.UInvBags[BagName][Items[i]]);
										if (UInv.isProperty(ItemProperties, "UInvPocket")) {
											delete ItemProperties.UInvPocket;
										}
										RemoveItemObjectsDefaultProperties(ItemProperties, ItemType);  /* store non-default properties */
										delete State.variables.UInvBags[BagName][Items[i]];
										UInv.AddItem(BagName, ItemType, Quantities[Items[i]], Items[i], StartDepth, CurrentDepth);  /* OOO function call */
										UInv.SetItemPropertyValues(BagName, Items[i], ItemProperties);  /* restore non-default properties */ /* OOO function call */
									}
								}
							}
							UInv.SetBagUntouched(BagName);
							UInv.SetCurrentBagName(BagName);
							UInv.DecrementUpdateLock();
							return true;  /* Success */
						}
					} else {
						UInvError('DefaultBagType passed to AddBag is not a string.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to AddBag cannot be "-" or "".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to AddBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsDefaultType: Returns bag's default bag type if it has one, "-" if it doesn't, or undefined on error. */
		GetBagsDefaultType : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
					UInvError('GetBagsDefaultType failed. Cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetBagsDefaultType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagCountByDefaultType: Returns the number of unique bag types, bags with no default bag type count as unique bag types. */
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

		/* CopyAllItemsToBag: Copies all items from source to destination. */
		CopyAllItemsToBag : function (SourceBagName, DestinationBagName) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (SourceBagName !== DestinationBagName) {
					if (UInv.BagExists(SourceBagName)) {
						if (UInv.BagExists(DestinationBagName)) {
							var i = 0, Ret, Result = [];
							var Items = UInv.GetItemsArray(SourceBagName);  /* OOO function call */
							if (Items.length > 0) {
								for (i = 0; i < Items.length; i++) {
									Ret = UInv.CopyItem(SourceBagName, DestinationBagName, Items[i]);  /* OOO function call */
									if (Ret === undefined) {
										Result = undefined;
									} else if (!UInv.isBoolean(Result)) {
										Result.push(Ret);
									}
								}
								UInv.SetBagTouched(DestinationBagName);
							}
							UInv.SetCurrentBagName(DestinationBagName);
							return Result;  /* Success or Error  *** */
						} else {
							UInvError('CopyAllItemsToBag cannot find bag "' + DestinationBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('CopyAllItemsToBag cannot find bag "' + SourceBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CopyAllItemsToBag failed. SourceBagName and DestinationBagName cannot be the same. Value = "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CopyAllItemsToBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* CopyBag: Creates a new bag named NewBagName if that bag doesn't exist already, and copies ExistingBagName into it. */
		/*          If the existing bag is a pocket, the copy won't be.  Returns true if it succeeded, or undefined on error. */
		CopyBag : function (ExistingBagName, NewBagName) {
			if (UInv.isString(ExistingBagName) && UInv.isString(NewBagName)) {
				ExistingBagName = FixBagName(ExistingBagName);
				NewBagName = FixBagName(NewBagName);
				if (UInv.BagExists(ExistingBagName)) {
					if (!UInv.BagExists(NewBagName)) {
						State.variables.UInvBags[NewBagName] = clone(State.variables.UInvBags[ExistingBagName]);
						if (UInv.isProperty(State.variables.UInvBags[NewBagName], "UInvContainer")) {  /* Bag copies should not be pockets. */
							delete State.variables.UInvBags[NewBagName].UInvContainer;
						}
						var Type = UInv.GetBagsDefaultType(ExistingBagName);
						if (Type !== NewBagName) {
							State.variables.UInvBags[NewBagName].UInvDefaultBagType = Type;
						} else {
							delete State.variables.UInvBags[NewBagName].UInvDefaultBagType;
						}
						var Items = UInv.GetItemsArray(NewBagName);  /* OOO function call */
						if (Items.length > 0) {
							var i = 0;
							UInv.IncrementUpdateLock();  /* Prevent unnecessary updates. */
							for (i = 0; i < Items.length; i++) {
								delete State.variables.UInvBags[NewBagName][Items[i]];
							}
							UInv.CopyAllItemsToBag(ExistingBagName, NewBagName);
							UInv.DecrementUpdateLock();
						}
						UInv.SetBagUntouched(NewBagName);
						return true;  /* Success */
					} else {
						UInvError('CopyBag failed. Bag "' + NewBagName + '" already exists.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CopyBag failed. Cannot find bag "' + ExistingBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CopyBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagPropertyArray: Return an array of all bag's property names. */
		GetBagPropertyArray : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Type = UInv.GetBagsDefaultType(BagName);
					var Props = UInv.GetDefaultBagObject(Type, true);
					UInv.SetCurrentBagName(BagName);
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
						if ((Type === "-") || UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, "UInvVariableType")) {
							return Object.keys(State.variables.UInvBags[BagName].UInvProperties);  /* Success */
						} else {
							return Object.keys(State.variables.UInvBags[BagName].UInvProperties).concatUnique(Object.keys(Props));  /* Success */
						}
					} else if (Type === "-") {
						return [];  /* Success */
					} else {
						return Object.keys(Props);  /* Success */
					}
				} else {
					UInvError('GetBagPropertyArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetBagPropertyArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteBag: Deletes bag entirely.  Return true if successful. */
		DeleteBag : function (BagName) {
			var i;
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.EmptyBag(BagName);
					if (UInv.BagIsPocket(BagName)) {  /* OOO function call */
						var ContainerBagName, ContainerName, PocketName;
						while (UInv.BagIsPocket(BagName)) {  /* Remove pocket from container(s) */
							ContainerBagName = State.variables.UInvBags[BagName].UInvContainer[0].ContainerBagName;
							ContainerName = State.variables.UInvBags[BagName].UInvContainer[0].ContainerName;
							PocketName = State.variables.UInvBags[BagName].UInvContainer[0].PocketName;
							UInv.UnlinkPocketFromContainer(ContainerBagName, ContainerName, PocketName);  /* OOO function */
						}
					}
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
						var Props = Object.keys(State.variables.UInvBags[BagName].UInvProperties);
						if (Props.length > 0) {
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
					return true;  /* Success */
				} else {
					UInvError('DeleteBag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				BagName = UInv.getUniqueArray(BagName);
				if (UInv.BagExists(BagName)) {
					for (i = 0; i < BagName.length; i++) {
						UInv.DeleteBag(BagName[i]);
					}
					return true;  /* Success */
				} else {
					UInvError('Some bags passed to DeleteBag did not exist.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeleteBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* RenameBag: Renames CurrentBagName to NewBagName if that bag doesn't exist already.  Returns true if it succeeded. */
		RenameBag : function (CurrentBagName, NewBagName) {
			if (UInv.isString(CurrentBagName) && UInv.isString(NewBagName)) {
				CurrentBagName = FixBagName(CurrentBagName);
				NewBagName = FixBagName(NewBagName);
				if (UInv.BagExists(CurrentBagName)) {
					if (!UInv.BagExists(NewBagName)) {
						var i;
						if (UInv.BagIsPocket(CurrentBagName)) {  /* Rename pocket in container(s) too */ /* OOO function call */
							var ContainerBagName, ContainerName, PocketName;
							for (i = 0; i < State.variables.UInvBags[CurrentBagName].UInvContainer.length; i++) {
								ContainerBagName = State.variables.UInvBags[CurrentBagName].UInvContainer[i].ContainerBagName;
								ContainerName = State.variables.UInvBags[CurrentBagName].UInvContainer[i].ContainerName;
								PocketName = State.variables.UInvBags[CurrentBagName].UInvContainer[i].PocketName;
								State.variables.UInvBags[ContainerBagName][ContainerName].UInvPocket[PocketName] = NewBagName;
							}
						}
						State.variables.UInvBags[NewBagName] = State.variables.UInvBags[CurrentBagName];
						var Items = UInv.GetItemsArray(NewBagName), Pockets, j;  /* OOO function call */
						if (Items.length > 0) {
							for (i = 0; i < Items.length; i++) {  /* Update pocket references on any containers */
								if (UInv.ItemHasPocket(NewBagName, Items[i])) {  /* OOO function call */
									Pockets = UInv.GetItemPocketNameArray(CurrentBagName, Items[i]);  /* OOO function call */
									for (j = 0; j < Pockets.length; j++) {
										UInv.MovePocket(CurrentBagName, Items[i], Pockets[j], NewBagName, Items[i]);  /* OOO function call */
									}
								}
							}
						}
						var Type = UInv.GetBagsDefaultType(CurrentBagName);
						if (Type !== NewBagName) {
							State.variables.UInvBags[NewBagName].UInvDefaultBagType = Type;
						} else {
							delete State.variables.UInvBags[NewBagName].UInvDefaultBagType;
						}
						delete State.variables.UInvBags[CurrentBagName];
						return true;  /* Success */
					} else {
						UInvError('RenameBag failed. Bag "' + NewBagName + '" already exists.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('RenameBag failed. Cannot find bag "' + CurrentBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to RenameBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasProperty: Returns true if bag's property exists, otherwise returns false. */
		BagHasProperty : function (BagName, BagPropertyName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.isString(BagPropertyName)) {
						UInv.SetCurrentBagName(BagName);
						if (UInv.GetBagPropertyArray(BagName).includes(BagPropertyName)) {
							return true;  /* Success */
						} else {
							return false;  /* Success */
						}
					} else if (UInv.isArrayOfStrings(BagPropertyName)) {
						var i = 0, Props = UInv.GetBagPropertyArray(BagName);
						for (i = 0; i < BagPropertyName.length; i++) {
							if (!Props.includes(BagPropertyName[i])) {
								return false;  /* Success */
							}
						}
						return true;  /* Success */
					} else {
						UInvError('BagPropertyName passed to BagHasProperty is not a string or array of strings.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagHasProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to BagHasProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagPropertyValue: Return a bag's property value. */
		GetBagPropertyValue : function (BagName, BagPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						UInv.SetCurrentBagName(BagName);
						if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
							if (UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, BagPropertyName)) {
								return State.variables.UInvBags[BagName].UInvProperties[BagPropertyName];  /* Success */
							}
						}
						return UInv.GetDefaultBagObject(UInv.GetBagsDefaultType(BagName), true)[BagPropertyName];  /* Success */
					} else {
						UInvError('GetBagPropertyValue cannot find bag property "' + BagPropertyName + '" on bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetBagPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetBagPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetBagPropertyValue: Add or change a bag property and set it to Value.  Returns true if it succeeds, or undefined on error. */
		SetBagPropertyValue : function (BagName, BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 3) {
					if (UInv.isString(BagName)) {
						BagName = FixBagName(BagName);
						if (UInv.BagExists(BagName)) {
							var BagType = UInv.GetBagsDefaultType(BagName), Props = [];
							if (BagPropertyName === "UInvVariableType") {
								if (!UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
									State.variables.UInvBags[BagName].UInvProperties = {};
								}
								if (UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, "UInvVariableType") || (BagType === "-")) {
									State.variables.UInvBags[BagName].UInvProperties.UInvVariableType = Value;
								} else {  /* set bag's default properties */
									State.variables.UInvBags[BagName].UInvProperties = Object.assign({}, UInv.GetDefaultBagObject(BagType, true), State.variables.UInvBags[BagName].UInvProperties);
									State.variables.UInvBags[BagName].UInvProperties.UInvVariableType = Value;
									if (BagType != BagName) {
										State.variables.UInvBags[BagName].UInvDefaultBagType = BagType;
									}
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
							UInv.SetCurrentBagName(BagName);
							return true;  /* Success */
						} else {
							UInvError('SetBagPropertyValue cannot find bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else if (UInv.isArrayOfStrings(BagName)) {
						if ((BagPropertyName !== "UInvVariableType") || UInv.isString(Value)) {
							if (UInv.BagExists(BagName)) {
								var i = 0, Result = true;
								for (i = 0; i < BagName.length; i++) {
									if (!UInv.SetBagPropertyValue(BagName[i], BagPropertyName, Value)) {
										Result = undefined;
									}
								}
								return Result;  /* Success (or Error, shouldn't happen) */
							} else {
								UInvError('SetBagPropertyValue failed. Invalid bag name in array.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('SetBagPropertyValue failed. The UInvVariableType property can only be set to a string.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('BagName passed to SetBagPropertyValue is not a string or an array of strings.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SetBagPropertyValue failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to SetBagPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagPropertyObject: Returns object of all properties/values a bag has or undefined on error. */
		GetBagPropertyObject : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Props = UInv.GetBagPropertyArray(BagName), Result = {}, i = 0;
					for (i = 0; i < Props.length; i++) {
						Result[Props[i]] = UInv.GetBagPropertyValue(BagName, Props[i]);
					}
					return Result;  /* Success */
				} else {
					UInvError('GetBagPropertyObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetBagPropertyObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetBagsDefaultType: Changes bag's default type as long as no new properties would be added by doing so.  Returns true on success, false on failure, and undefined on error. */
		SetBagsDefaultType : function (BagName, DefaultBagType) {
			if (UInv.isString(BagName) && UInv.isString(DefaultBagType)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if ((UInv.GetDefaultBagObject(DefaultBagType, true)) || (DefaultBagType === "-")) {
						UInv.SetCurrentBagName(BagName);
						var Props = UInv.GetBagPropertyObject(BagName), DefProps = {};
						if (DefaultBagType !== "-") {
							DefProps = UInv.GetDefaultBagObject(DefaultBagType, true);
							var Keys = Object.keys(DefProps), i = 0;
							if (!UInv.isProperty(DefProps, "UInvVariableType")) {
								for (i = 0; i < Keys.length; i++) {
									if (UInv.isProperty(Props, Keys[i])) {
										if (Props[Keys[i]] === DefProps[Keys[i]]) {
											delete Props[Keys[i]];  /* delete default properties */
										}
									} else {
										if (Keys[i] != "UInvVariableType") {
											return false;  /* Success - Could not change default bag type because default property of that type does not exist on BagBame */
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
						if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvProperties")) {
							delete State.variables.UInvBags[BagName].UInvProperties;
						}
						State.variables.UInvBags[BagName].UInvProperties = Props;
						if (UInv.isProperty(DefProps, "UInvVariableType")) {
							State.variables.UInvBags[BagName].UInvProperties.UInvVariableType = DefProps.UInvVariableType;
						} else if (UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, "UInvVariableType")) {
							delete State.variables.UInvBags[BagName].UInvProperties.UInvVariableType;
						}
						if (Object.keys(State.variables.UInvBags[BagName].UInvProperties).length === 0) {
							delete State.variables.UInvBags[BagName].UInvProperties;
						}
						return true;  /* Success */
					} else {
						UInvError('SetBagsDefaultType failed. "' + DefaultBagType + '" is not a valid default bag type.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SetBagsDefaultType cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetBagsDefaultType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagPropertyCount: Returns the number of BagName's properties, or undefined if there is an error. */
		BagPropertyCount : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					return UInv.GetBagPropertyArray(BagName).length;  /* Success */
				} else {
					UInvError('BagPropertyCount cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagPropertyCount is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayByProperty: Returns an array of BagNames that have property BagPropertyName. */
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
						return Result;  /* Success */
					} else {
						UInvError('GetBagsArrayByProperty failed. Invalid bag name within BagNameArray.');  /* Error */
						return undefined;
					}
				} else if ((UInv.isArray(BagNameArray)) && (BagNameArray.length === 0)) {
					return [];  /* Success */
				} else {
					UInvError('BagNameArray passed to GetBagsArrayByProperty is not an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagsArrayByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagByProperty: Returns a random BagName that has property BagPropertyName. */
		GetBagByProperty : function (BagPropertyName) {
			if (UInv.isString(BagPropertyName)) {
					var Bags = UInv.GetBagsArrayByProperty(BagPropertyName);
					if (Bags.length > 0) {
						var Rnd = random(Bags.length - 1);
						UInv.SetCurrentBagName(Bags[Rnd]);
						return Bags[Rnd];  /* Success */
					} else {
						return "";  /* Success */
					}
			} else {
				UInvError('BagPropertyName passed to GetBagByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAllProperties: Reurns whether all of the bag's properties are listed in BagPropertyNameArray, false if the bag has no properties, or undefined on error. */
		BagHasAllProperties : function (BagName, BagPropertyNameArray) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.isArrayOfStrings(BagPropertyNameArray)) {
						UInv.SetCurrentBagName(BagName);
						var Props = UInv.GetBagPropertyArray(BagName);
						if (Props.length > 0) {
							var i;
							for (i = 0; i < BagPropertyNameArray.length; i++) {
								if (!Props.includes(BagPropertyNameArray[i])) {
									return false;  /* Success */
								}
							}
							return true;  /* Success */
						}
						return false;  /* Success */
					} else {
						UInvError('BagHasAllProperties failed. BagPropertyNameArray is not an array of strings.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagHasAllProperties cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to BagHasAllProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWithAllProperties: Returns an array of all bags which have all of the properties in BagPropertyNameArray */
		/*                                (per the BagHasAllProperties function), not including bags with no properties, or return undefined on error. */
		GetBagsArrayWithAllProperties : function (BagPropertyNameArray) {
			if (UInv.isArrayOfStrings(BagPropertyNameArray)) {
				var Bags = UInv.GetBagsArray(), Return = [], i;
				for (i = 0; i < Bags.length; i++) {
					if (UInv.BagHasAllProperties(Bags[i], BagPropertyNameArray)) {
						Return.pushUnique(Bags[i]);
					}
				}
				return Return;  /* Success */
			} else {
				UInvError('GetBagsArrayWithAllProperties failed. BagPropertyNameArray is not an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* CopyBagProperty: Copies a bag property from one bag to another, overwriting the destination if that property is already there. */
		CopyBagProperty : function (SourceBagName, DestinationBagName, BagPropertyName) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
				DestinationBagName = FixBagName(DestinationBagName);
				SourceBagName = FixBagName(SourceBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (UInv.isString(BagPropertyName)) {
							if (UInv.BagHasProperty(SourceBagName, BagPropertyName)) {
								return UInv.SetBagPropertyValue(DestinationBagName, BagPropertyName, UInv.GetBagPropertyValue(SourceBagName, BagPropertyName));
							} else {
								UInvError('CopyBagProperty failed. Bag "' + SourceBagName + '" does not have property "' + BagPropertyName + '".');  /* Error */
								return undefined;
							}
						} else if (UInv.isArrayOfStrings(BagPropertyName)) {
							if (UInv.BagHasAllProperties(SourceBagName, BagPropertyName)) {
								var Result = true, i = 0;
								for (i = 0; i < BagPropertyName.length; i++) {
									if (!UInv.CopyBagProperty(SourceBagName, DestinationBagName, BagPropertyName[i])) {
										Result = undefined;  /* Error */
									}
								}
								return Result;  /* Success (or Error, though this shouldn't fail) */
							} else {
								UInvError('CopyBagProperty failed. Bag "' + SourceBagName + '" does not have all properties in BagPropertyName parameter.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('CopyBagProperty failed. BagPropertyName is not a string or an array of strings.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('CopyBagProperty cannot find bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CopyBagProperty cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CopyBagProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWherePropertyEquals: Returns an array of all BagNames where BagPropertyName's value === Value, returns [] if none found, or undefined on error. */
		GetBagsArrayWherePropertyEquals : function (BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 2) {
					var Bags = UInv.GetBagsArrayByProperty(BagPropertyName), i = 0, Result = [];
					for (i = 0; i < Bags.length; i++) {
						if (UInv.valuesAreEqual(UInv.GetBagPropertyValue(Bags[i], BagPropertyName), Value)) {
							Result.push(Bags[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetBagsArrayWherePropertyEquals failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagsArrayWherePropertyEquals is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagWherePropertyEquals: Returns a random BagName where BagPropertyName === Value, returns "" if not found, or undefined on error.  Sets that bag as the current bag. */
		GetBagWherePropertyEquals : function (BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 2) {
					var Bags = UInv.GetBagsArrayWherePropertyEquals(BagPropertyName, Value);
					if (Bags.length > 0) {
						var Rnd = random(Bags.length - 1);
						UInv.SetCurrentBagName(Bags[Rnd]);
						return Bags[Rnd];  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetBagWherePropertyEquals failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagWherePropertyEquals is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWherePropertyGreaterThan: Returns an array of all BagNames where BagPropertyName > Value, returns [] if none found, or undefined on error. */
		GetBagsArrayWherePropertyGreaterThan : function (BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 2) {
					var Bags = UInv.GetBagsArrayByProperty(BagPropertyName), i = 0, Result = [];
					for (i = 0; i < Bags.length; i++) {
						if (UInv.GetBagPropertyValue(Bags[i], BagPropertyName) > Value) {
							Result.push(Bags[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetBagsArrayWherePropertyGreaterThan failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagsArrayWherePropertyGreaterThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagWherePropertyGreaterThan: Returns a random BagName where BagPropertyName > Value, returns "" if not found, or undefined on error.  Sets that bag as the current bag. */
		GetBagWherePropertyGreaterThan : function (BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 2) {
					var Bags = UInv.GetBagsArrayWherePropertyGreaterThan(BagPropertyName, Value);
					if (Bags.length > 0) {
						var Rnd = random(Bags.length - 1);
						UInv.SetCurrentBagName(Bags[Rnd]);
						return Bags[Rnd];  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetBagWherePropertyGreaterThan failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagWherePropertyGreaterThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWherePropertyLessThan: Returns an array of all BagNames where BagPropertyName < Value, returns [] if none found, or undefined on error. */
		GetBagsArrayWherePropertyLessThan : function (BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 2) {
					var Bags = UInv.GetBagsArrayByProperty(BagPropertyName), i = 0, Result = [];
					for (i = 0; i < Bags.length; i++) {
						if (UInv.GetBagPropertyValue(Bags[i], BagPropertyName) < Value) {
							Result.push(Bags[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetBagsArrayWherePropertyLessThan failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagsArrayWherePropertyLessThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagWherePropertyLessThan: Returns a random BagName where BagPropertyName < Value, returns "" if not found, or undefined on error.  Sets that bag as the current bag. */
		GetBagWherePropertyLessThan : function (BagPropertyName, Value) {
			if (UInv.isString(BagPropertyName)) {
				if (arguments.length >= 2) {
					var Bags = UInv.GetBagsArrayWherePropertyLessThan(BagPropertyName, Value);
					if (Bags.length > 0) {
						var Rnd = random(Bags.length - 1);
						UInv.SetCurrentBagName(Bags[Rnd]);
						return Bags[Rnd];  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetBagWherePropertyLessThan failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagWherePropertyLessThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagWithHighestPropertyValue: Returns the BagName with the highest value on BagPropertyName (bags without BagPropertyName are ignored), */
		/*                                 randomly picks one of the highest if multiple bags are tied for highest, "" if none found, or undefined on error. */
		GetBagWithHighestPropertyValue : function (BagPropertyName, BagNameArray) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isUndefined(BagNameArray)) {
					BagNameArray = UInv.GetBagsArray();
				}
				if (UInv.isArrayOfStrings(BagNameArray)) {
					var Bags = UInv.GetBagsArrayByProperty(BagPropertyName, BagNameArray);
					/* var HiVal = Bags.map(o => o[BagPropertyName]).reduce((a, b) => Math.max(a, b)); */
					/* return Bags.filter(o => o[BagPropertyName] === HiVal).random(); */
					if (Bags.length > 0) {
						var HiBags = [ Bags[0] ], HiVal = UInv.GetBagPropertyValue(Bags[0], BagPropertyName);
						if (Bags.length > 1) {
							var i, Value = 0;
							for (i = 1; i < Bags.length; i++) {
								Value = UInv.GetBagPropertyValue(Bags[i], BagPropertyName);
								if (Value > HiVal) {
									HiVal = Value;
									HiBags = [ Bags[i] ];
								} else if (Value === HiVal) {
									HiBags.push(Bags[i]);
								}
							}
						}
						return HiBags[random(HiBags.length - 1)];  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetBagWithHighestPropertyValue failed. BagNameArray is not an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagWithHighestPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagWithLowestPropertyValue: Returns the BagName with the lowest value on BagPropertyName (bags without BagPropertyName are ignored), */
		/*                                randomly picks one of the lowest if multiple bags are tied for lowest, "" if none found, or undefined on error. */
		GetBagWithLowestPropertyValue : function (BagPropertyName, BagNameArray) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isUndefined(BagNameArray)) {
					BagNameArray = UInv.GetBagsArray();
				}
				if (UInv.isArrayOfStrings(BagNameArray)) {
					var Bags = UInv.GetBagsArrayByProperty(BagPropertyName, BagNameArray);
					if (Bags.length > 0) {
						var LoBags = [ Bags[0] ], LoVal = UInv.GetBagPropertyValue(Bags[0], BagPropertyName);
						if (Bags.length > 1) {
							var i, Value = 0;
							for (i = 1; i < Bags.length; i++) {
								Value = UInv.GetBagPropertyValue(Bags[i], BagPropertyName);
								if (Value < LoVal) {
									LoVal = Value;
									LoBags = [ Bags[i] ];
								} else if (Value === LoVal) {
									LoBags.push(Bags[i]);
								}
							}
						}
						return LoBags[random(LoBags.length - 1)];  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetBagWithLowestPropertyValue failed. Invalid type passed as BagNameArray property.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagWithLowestPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddToBagPropertyValue: Add an amount to a property's value (returns true), create that property if it doesn't exist (returns false), or return undefined if there is an error. */
		AddToBagPropertyValue : function (BagName, BagPropertyName, Amount) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isUndefined(Amount)) {
						Amount = tryIntParse(Amount);
						if (UInv.isNumber(Amount)) {
							if (UInv.BagHasProperty(BagName, BagPropertyName)) {
								if (UInv.isNumber(UInv.GetBagPropertyValue(BagName, BagPropertyName))) {
									UInv.SetBagPropertyValue(BagName, BagPropertyName, UInv.GetBagPropertyValue(BagName, BagPropertyName) + Amount);
									return true;  /* Success */
								} else {
									UInvError('AddToBagPropertyValue failed. Item\'s property value must be a number to add to it.');  /* Error */
									return undefined;
								}
							} else {
								UInv.SetBagPropertyValue(BagName, BagPropertyName, Amount);
								return false;  /* Success */
							}
						} else {
							UInvError('AddToBagPropertyValue failed. Amount must be a number.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddToBagPropertyValue failed. Value not defined.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('AddToBagPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddToBagPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteBagProperty: Deletes bag property BagPropertyName.  Returns true if successful, otherwise false. */
		DeleteBagProperty : function (BagName, BagPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						var Type = UInv.GetBagsDefaultType(BagName);
						if (Type !== "-") {
							var Props = UInv.GetDefaultBagObject(Type, true), Keys = Object.keys(Props), i;
							if ((UInv.isProperty(Props, BagPropertyName) && (!UInv.isProperty(Props, "UInvVariableType")))
								/* if the property to be deleted is a default property, change default type and load other properties */
								|| ((BagPropertyName === "UInvVariableType") && (UInv.isProperty(Props, "UInvVariableType")))) {
								/* -or- if it was a variable type bag, change the default type to prevent pulling variable default properties */
								UInv.SetBagsDefaultType(BagName, "-");
							} else if ((BagPropertyName === "UInvVariableType") && (!UInv.isProperty(Props, "UInvVariableType"))) {  /* restore bag as a non-variable type bag */
								for (i = 0; i < Keys.length; i++) {
									if (UInv.isProperty(State.variables.UInvBags[BagName].UInvProperties, Keys[i])) {
										if (UInv.valuesAreEqual(State.variables.UInvBags[BagName].UInvProperties[Keys[i]], Props[Keys[i]])) {
											delete State.variables.UInvBags[BagName].UInvProperties[Keys[i]];
										}
									}
								}
								if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvDefaultBagType") && (State.variables.UInvBags[BagName].UInvDefaultBagType === BagName)) {
									delete State.variables.UInvBags[BagName].UInvDefaultBagType;  /* no longer needed */
								}
							}
						}
						delete State.variables.UInvBags[BagName].UInvProperties[BagPropertyName];
						if (Object.keys(State.variables.UInvBags[BagName].UInvProperties).length === 0) {
							delete State.variables.UInvBags[BagName].UInvProperties;
						}
					}
					return true;  /* Success */
				} else {
					UInvError('DeleteBagProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeleteBagProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveAllItemsToBag: Moves all items from source to destination. */
		MoveAllItemsToBag : function (SourceBagName, DestinationBagName) {
			if (UInv.isString(DestinationBagName)) {
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.isString(SourceBagName)) {
					SourceBagName = [ FixBagName(SourceBagName) ];
				}
				if (UInv.BagExists(DestinationBagName)) {
					if (UInv.BagExists(SourceBagName)) {
						var i, j, SrcItems;
						UInv.IncrementUpdateLock();
						for (i = 0; i < SourceBagName.length; i++) {
							if (SourceBagName[i] !== DestinationBagName) {
								SrcItems = UInv.GetItemsArray(SourceBagName[i]);
								for (j = 0; j < SrcItems.length; j++) {
									UInv.MoveItem(SourceBagName[i], DestinationBagName, SrcItems[j]);  /* handle move failure due to pocket protection *** */
								}
							}
						}
						UInv.DecrementUpdateLock();
						return true;  /* Success */
					} else {
						UInvError('MoveAllItemsToBag failed. Invalid bag name SourceBagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveAllItemsToBag cannot find destination bag "' + DestinationBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('DestinationBagName passed to MoveAllItemsToBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MergeBags: Moves all items from source to destination and deletes source. */
		MergeBags : function (SourceBagName, DestinationBagName) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (SourceBagName !== DestinationBagName) {
					if (UInv.BagExists(SourceBagName)) {
						if (UInv.BagExists(DestinationBagName)) {
							var Result = true;
							Result = UInv.MoveAllItemsToBag(SourceBagName, DestinationBagName);
							if (Result) {
								UInv.DeleteBag(SourceBagName);
							}
							return Result;  /* Success */
						} else {
							UInvError('MergeBags cannot find bag "' + DestinationBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MergeBags cannot find bag "' + SourceBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MergeBags failed. SourceBagName and DestinationBagName cannot be the same. Value = "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MergeBags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWithItem: Returns an array of BagNames that have item (limited to items in BagArray bags if BagArray is passed to function), or undefined if there is an error. */
		GetBagsArrayWithItem : function (ItemName, BagArray) {
			if (UInv.isString(ItemName)) {
				if (UInv.isUndefined(BagArray)) {
					BagArray = UInv.GetBagsArray();
				} else if (UInv.isArrayOfStrings(BagArray)) {
					if (!UInv.BagExists(BagArray)) {
						UInvError('GetBagsArrayWithItem failed. Invalid bag name in BagArray.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagArray passed to GetBagsArrayWithItem is not an array of strings.');  /* Error */
					return undefined;
				}
				var Result = [], i = 0;
				if (BagArray.length > 0) {
					for (i = 0; i < BagArray.length; i++) {
						if (UInv.BagHasItem(BagArray[i], ItemName)) {  /* OOO function call */
							Result.pushUnique(BagArray[i]);
						}
					}
				}
				return Result;  /* Success */
			} else {
				UInvError('ItemName passed to GetBagsArrayWithItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagObject: Returns the full bag object (including UInvDefaultBagType) or undefined on error. */
		GetBagObject : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
					Props = UInv.GetItemsArray(BagName);  /* OOO function call */
					if (Props.length > 0) {
						for (i = 0; i < Props.length; i++) {
							Result[Props[i]] = UInv.GetItemObject(BagName, Props[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetBagObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetBagObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* WasTouched: Returns whether the number of items in the bag have changed since creation or since Untouched was last set, or undefined if there is an error. */
		WasTouched : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.isProperty(State.variables.UInvBags[BagName], "UInvTouched")) {
						return State.variables.UInvBags[BagName].UInvTouched;  /* Success */
					} else {
						return true;  /* Success */
					}
				} else {
					UInvError('WasTouched cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to WasTouched is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetUniqueBagName: Generates and returns an unused bag name ("bagXXHEXX"). */
		GetUniqueBagName : function () {
			var BagName = "bag" + UInv.getRandomHexString();
			while (UInv.BagExists(BagName)) {
				BagName = "bag" + UInv.getRandomHexString();
			}
			return BagName;
		},

		/* BagMatchesDefault: Returns whether bag exactly matches its default version, or undefined on error.  Returns false if the bag does not have a default object. */
		BagMatchesDefault : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Typ = UInv.GetBagsDefaultType(BagName);
					if ((Typ === "-") || UInv.isUndefined(Typ)) {
						return false;  /* Success */
					}
					var BagOb = UInv.GetBagObject(BagName);
					var TmpBag = UInv.GetUniqueBagName();
					UInv.AddBag(TmpBag, Typ);
					if (UInv.WasTouched(BagName)) {
						UInv.SetBagTouched(TmpBag);
					}
					var TmpBagOb = UInv.GetBagObject(TmpBag);
					var Result = UInv.objectsAreEqual(BagOb, TmpBagOb);
					UInv.DeleteBag(TmpBag);
					return Result;  /* Success */
				} else {
					UInvError('BagMatchesDefault cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to BagMatchesDefault is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetTotalBagPropertyValue: Returns the total value of BagPropertyName across all bags, or across all bags in BagNameArray, or undefined on error. */
		GetTotalBagPropertyValue : function (BagPropertyName, BagNameArray) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isUndefined(BagNameArray)) {
					BagNameArray = UInv.GetBagsArray();
				}
				if (UInv.isString(BagNameArray)) {
					BagNameArray = [ BagNameArray ];
				}
				if (UInv.isArrayOfStrings(BagNameArray)) {
					if (UInv.BagExists(BagNameArray)) {
						var Total = 0, Val, i;
						if (BagNameArray.length > 0) {
							for (i = 0; i < BagNameArray.length; i++) {
								if (UInv.BagHasProperty(BagNameArray[i], BagPropertyName)) {
									Val = UInv.GetBagPropertyValue(BagNameArray[i], BagPropertyName);
									if (UInv.isNumber(Val)) {
										Total += Val;
									} else {
										UInvError('GetTotalBagPropertyValue failed.  Property "' + BagPropertyName + '" on bag "' + BagNameArray[i] + '" is not a number.');  /* Error */
										return undefined;
									}
								}
							}
						}
						return Total;  /* Success */
					} else {
						UInvError('GetTotalBagPropertyValue failed.  Bag in BagNameArray does not exist.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetTotalBagPropertyValue failed.  If included, BagNameArray must be a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetTotalBagPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveBagPropertyValueToBag: Moves an amount of a number from one bag's property to another bag's property, limited by the minimum and maximum values. */
		/*                            Deletes the bag or property (depending on DeletionType) if the property's value gets set to DeletionValue.  Returns the destination value or undefined on error. */
		MoveBagPropertyValueToBag : function (SourceBagName, SourceBagPropertyName, DestinationBagName, DestinationBagPropertyName, Amount, MinimumValue, MaximumValue, DeletionValue, DeletionType) {
			if (UInv.isString(SourceBagName) && UInv.isString(SourceBagPropertyName) && UInv.isString(DestinationBagName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (UInv.BagHasProperty(SourceBagName, SourceBagPropertyName)) {
							if (UInv.isUndefined(DestinationBagPropertyName)) {
								DestinationBagPropertyName = SourceBagPropertyName;
							}
							if (!UInv.isUndefined(Amount)) {
								Amount = tryIntParse(Amount);
								if (UInv.isNumber(Amount)) {
									var SrcVal = UInv.GetBagPropertyValue(SourceBagName, SourceBagPropertyName);
									SrcVal = tryIntParse(SrcVal);
									if (UInv.isNumber(SrcVal)) {
										var DstVal = 0;
										if (UInv.BagHasProperty(DestinationBagName, DestinationBagPropertyName)) {
											DstVal = UInv.GetBagPropertyValue(DestinationBagName, DestinationBagPropertyName);
											DstVal = tryIntParse(DstVal);
										}
										if (UInv.isNumber(DstVal)) {
											var TmpAmt = Amount;
											if (!UInv.isUndefined(MinimumValue)) {
												MinimumValue = tryIntParse(MinimumValue);
												if (UInv.isUndefined(MinimumValue)) {
													UInvError('MoveBagPropertyValueToBag failed. If used, MinimumValue must be a number.');  /* Error */
													return undefined;
												}
												if (SrcVal - Amount < MinimumValue) {  /* Can't reduce source below minimum */
													Amount = SrcVal - MinimumValue;
												}
												if (DstVal + Amount < MinimumValue) {  /* Can't reduce destination below minimum (for when Amount is negative) */
													Amount = MinimumValue - DstVal;
												}
											}
											if (!UInv.isUndefined(MaximumValue)) {
												MaximumValue = tryIntParse(MaximumValue);
												if (UInv.isUndefined(MaximumValue)) {
													UInvError('MoveBagPropertyValueToBag failed. If used, MaximumValue must be a number.');  /* Error */
													return undefined;
												}
												if ((!UInv.isUndefined(MinimumValue)) && (MinimumValue > MaximumValue)) {
													UInvError('MoveBagPropertyValueToBag failed. When both are used, MaximumValue must be greater than MinimumValue.');  /* Error */
													return undefined;
												}
												if (SrcVal - Amount > MaximumValue) {  /* Can't increase source above maximum (for when Amount is negative) */
													Amount = SrcVal - MaximumValue;
												}
												if (DstVal + Amount > MaximumValue) {  /* Can't increase destination above maximum */
													Amount = MaximumValue - DstVal;
												}
											}
											if (((TmpAmt >= 0) && (Amount > TmpAmt)) || ((TmpAmt < 0) && (Amount < TmpAmt))) {
												UInvError('MoveBagPropertyValueToBag failed. Source (' + SrcVal + ') and/or Destination (' + DstVal + ') values are too far out of MinimumValue (' + MinimumValue + ') and/or MaximumValue (' + MaximumValue + ') range.');  /* Error */
												return undefined;
											}
											if (!UInv.isUndefined(DeletionValue)) {
												DeletionValue = tryIntParse(DeletionValue);
												if (UInv.isUndefined(DeletionValue)) {
													UInvError('MoveBagPropertyValueToBag failed. If used, DeletionValue must be a number.');  /* Error */
													return undefined;
												}
												if (SrcVal - Amount == DeletionValue) {
													if (UInv.isString(DeletionType)) {
														DeletionType = DeletionType.toLowerCase();
													} else {
														DeletionType = "property";
													}
													switch (DeletionType) {
														case "bag":  /* delete bag */
														case "object":  /* delete bag or item */
															UInv.DeleteBag(SourceBagName);
															break;
														case "item":  /* delete item (do nothing in this case) */
															UInv.SetBagPropertyValue(SourceBagName, SourceBagPropertyName, SrcVal - Amount);
															break;
														default:  /* delete property */
															UInv.DeleteBagProperty(SourceBagName, SourceBagPropertyName);
													}
												} else {
													UInv.SetBagPropertyValue(SourceBagName, SourceBagPropertyName, SrcVal - Amount);
												}
												if (DstVal + Amount == DeletionValue) {
													if (UInv.isString(DeletionType)) {
														DeletionType = DeletionType.toLowerCase();
													} else {
														DeletionType = "property";
													}
													switch (DeletionType) {
														case "bag":  /* delete bag */
														case "object":  /* delete bag or item */
															UInv.DeleteBag(DestinationBagName);
															break;
														case "item":  /* delete item (do nothing in this case) */
															UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, DstVal + Amount);
															break;
														default:  /* delete property */
															UInv.DeleteBagProperty(DestinationBagName, DestinationBagPropertyName);
													}
												} else {
													UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, DstVal + Amount);
												}
												UInv.SetCurrentBagName(DestinationBagName);
												return DstVal + Amount;  /* Success */
											}
											UInv.SetBagPropertyValue(SourceBagName, SourceBagPropertyName, SrcVal - Amount);
											UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, DstVal + Amount);
											UInv.SetCurrentBagName(DestinationBagName);
											return DstVal + Amount;  /* Success */
										} else {
											UInvError("MoveBagPropertyValueToBag failed. Destination bag's property value must be a number to add to or subtract from it.");  /* Error */
											return undefined;
										}
									} else {
										UInvError("MoveBagPropertyValueToBag failed. Source bag's property value must be a number to move an Amount of it.");  /* Error */
										return undefined;
									}
								} else {
									UInvError('MoveBagPropertyValueToBag failed. If used, Amount must be a number.');  /* Error */
									return undefined;
								}
							} else {
								var Val = UInv.GetBagPropertyValue(SourceBagName, SourceBagPropertyName);
								UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, Val);
								UInv.DeleteBagProperty(SourceBagName, SourceBagPropertyName);
								UInv.SetCurrentBagName(DestinationBagName);
								return Val;  /* Success */
							}
						} else {
							UInvError('MoveBagPropertyValueToBag failed. Source bag "' + SourceBagName + '" does not have property "' + SourceBagPropertyName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveBagPropertyValueToBag cannot find destination bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveBagPropertyValueToBag cannot find source bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveBagPropertyValueToBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItemPropertyValueToBag: Moves an amount of a number from an item's property to a bag's property, limited by the minimum and maximum values. */
		/*                             Deletes the bag, item, or property (depending on DeletionType) if the property's value gets set to DeletionValue.  Returns the destination value or undefined on error. */
		MoveItemPropertyValueToBag : function (SourceBagName, SourceItemName, SourceItemPropertyName, DestinationBagName, DestinationBagPropertyName, Amount, MinimumValue, MaximumValue, DeletionValue, DeletionType) {
			if (UInv.isString(SourceBagName) && UInv.isString(SourceItemName) && UInv.isString(SourceItemPropertyName) && UInv.isString(DestinationBagName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						SourceItemName = FixItemName(SourceItemName);
						if (UInv.BagHasItem(SourceBagName, SourceItemName)) {  /* OOO function call */
							if (UInv.isUndefined(DestinationBagPropertyName)) {
								DestinationBagPropertyName = SourceItemPropertyName;
							}
							if (UInv.ItemHasProperty(SourceBagName, SourceItemName, SourceItemPropertyName)) {  /* OOO function call */
								if (["UInvDefaultItemType", "UInvPocket"].includes(SourceItemPropertyName)) {
									UInvError('MoveItemPropertyValueToBag failed. SourceItemPropertyName cannot be "' + SourceItemPropertyName + '".');  /* Error */
									return undefined;
								}
								if (SourceItemPropertyName === "UInvQuantity") {
									if ((!UInv.isUndefined(Amount)) && (!UInv.isInteger(Amount))) {
										UInvError("MoveItemPropertyValueToBag failed. Amount must be an integer to move it from an item's UInvQuantity.");  /* Error */
										return undefined;
									}
									MinimumValue = 0;
									DeletionValue = 0;
									if (UInv.isString(DeletionType) && (DeletionType !== "object")) {
										DeletionType = "item";
									}
								}
								if (!UInv.isUndefined(Amount)) {
									Amount = tryIntParse(Amount);
									if (UInv.isNumber(Amount)) {
										var SrcVal = UInv.GetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName);  /* OOO function call */
										SrcVal = tryIntParse(SrcVal);
										if (UInv.isNumber(SrcVal)) {
											var DstVal = 0;
											if (UInv.BagHasProperty(DestinationBagName, DestinationBagPropertyName)) {
												DstVal = UInv.GetBagPropertyValue(DestinationBagName, DestinationBagPropertyName);
												DstVal = tryIntParse(DstVal);
											}
											if (UInv.isNumber(DstVal)) {
												var TmpAmt = Amount;
												if (!UInv.isUndefined(MinimumValue)) {
													MinimumValue = tryIntParse(MinimumValue);
													if (UInv.isUndefined(MinimumValue)) {
														UInvError('MoveItemPropertyValueToBag failed. If used, MinimumValue must be a number.');  /* Error */
														return undefined;
													}
													if (SrcVal - Amount < MinimumValue) {  /* Can't reduce source below minimum */
														Amount = SrcVal - MinimumValue;
													}
													if (DstVal + Amount < MinimumValue) {  /* Can't reduce destination below minimum (for when Amount is negative) */
														Amount = MinimumValue - DstVal;
													}
												}
												if (!UInv.isUndefined(MaximumValue)) {
													MaximumValue = tryIntParse(MaximumValue);
													if (UInv.isUndefined(MaximumValue)) {
														UInvError('MoveItemPropertyValueToBag failed. If used, MaximumValue must be a number.');  /* Error */
														return undefined;
													}
													if ((!UInv.isUndefined(MinimumValue)) && (MinimumValue > MaximumValue)) {
														UInvError('MoveItemPropertyValueToBag failed. When both are used, MaximumValue must be greater than MinimumValue.');  /* Error */
														return undefined;
													}
													if (SrcVal - Amount > MaximumValue) {  /* Can't increase source above maximum (for when Amount is negative) */
														Amount = SrcVal - MaximumValue;
													}
													if (DstVal + Amount > MaximumValue) {  /* Can't increase destination above maximum */
														Amount = MaximumValue - DstVal;
													}
												}
												if (((TmpAmt >= 0) && (Amount > TmpAmt)) || ((TmpAmt < 0) && (Amount < TmpAmt))) {
													UInvError('MoveItemPropertyValueToBag failed. Source (' + SrcVal + ') and/or Destination (' + DstVal + ') values are too far out of MinimumValue (' + MinimumValue + ') and/or MaximumValue (' + MaximumValue + ') range.');  /* Error */
													return undefined;
												}
												if (!UInv.isUndefined(DeletionValue)) {
													DeletionValue = tryIntParse(DeletionValue);
													if (UInv.isUndefined(DeletionValue)) {
														UInvError('MoveItemPropertyValueToBag failed. If used, DeletionValue must be a number.');  /* Error */
														return undefined;
													}
													if (SrcVal - Amount == DeletionValue) {
														if (UInv.isString(DeletionType)) {
															DeletionType = DeletionType.toLowerCase();
														} else {
															DeletionType = "property";
														}
														switch (DeletionType) {
															case "item":  /* delete item */
															case "object":  /* delete bag or item */
																UInv.DeleteItem(SourceBagName, SourceItemName);  /* OOO function call */
																break;
															case "bag":  /* delete bag (do nothing in this case) */
																UInv.SetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName, SrcVal - Amount);  /* OOO function call */
																break;
															default:  /* delete property */
																UInv.DeleteItemProperty(SourceBagName, SourceItemName, SourceItemPropertyName);  /* OOO function call */
														}
													} else {
														UInv.SetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName, SrcVal - Amount);  /* OOO function call */
													}
													if (DstVal + Amount == DeletionValue) {
														if (UInv.isString(DeletionType)) {
															DeletionType = DeletionType.toLowerCase();
														} else {
															DeletionType = "property";
														}
														switch (DeletionType) {
															case "bag":  /* delete bag */
															case "object":  /* delete bag or item */
																UInv.DeleteBag(DestinationBagName);
																break;
															case "item":  /* delete item (do nothing in this case) */
																UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, DstVal + Amount);
																break;
															default:  /* delete property */
																UInv.DeleteBagProperty(DestinationBagName, DestinationBagPropertyName);
														}
													} else {
														UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, DstVal + Amount);
													}
													UInv.SetCurrentBagName(DestinationBagName);
													return DstVal + Amount;  /* Success */
												}
												UInv.SetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName, SrcVal - Amount);  /* OOO function call */
												UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, DstVal + Amount);
												UInv.SetCurrentBagName(DestinationBagName);
												return DstVal + Amount;  /* Success */
											} else {
												UInvError("MoveItemPropertyValueToBag failed. Destination bag's property value must be a number to add to or subtract from it.");  /* Error */
												return undefined;
											}
										} else {
											UInvError("MoveItemPropertyValueToBag failed. Source item's property value must be a number to move an Amount of it.");  /* Error */
											return undefined;
										}
									} else {
										UInvError('MoveItemPropertyValueToBag failed. If used, Amount must be a number.');  /* Error */
										return undefined;
									}
								} else {
									if (["UInvDefaultItemType", "UInvPocket"].includes(SourceItemPropertyName)) {
										UInvError('MoveItemPropertyValueToBag failed. SourceItemPropertyName cannot be "' + SourceItemPropertyName + '".');  /* Error */
										return undefined;
									}
									if (SourceItemPropertyName === "UInvQuantity") {
										UInvError('MoveItemPropertyValueToBag failed. SourceItemPropertyName cannot be "UInvQuantity" unless Amount is set to an Integer.');  /* Error */
										return undefined;
									}
									var Val = UInv.GetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName);  /* OOO function call */
									UInv.SetBagPropertyValue(DestinationBagName, DestinationBagPropertyName, Val);
									UInv.DeleteItemProperty(SourceBagName, SourceItemName, SourceItemPropertyName);  /* OOO function call */
									UInv.SetCurrentBagName(DestinationBagName);
									return Val;  /* Success */
								}
							} else {
								UInvError('MoveItemPropertyValueToBag failed. Item "' + SourceItemName + '" in bag "' + SourceBagName + '" does not have property "' + SourceItemPropertyName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveItemPropertyValueToBag failed. Source bag "' + SourceBagName + '" does not contain item "' + SourceItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItemPropertyValueToBag cannot find destination bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItemPropertyValueToBag cannot find source bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItemPropertyValueToBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRawBagObject: Returns the raw bag object.  FOR INTERNAL/TESTING USE ONLY. */
		GetRawBagObject : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					return State.variables.UInvBags[BagName];  /* Success */
				} else {
					UInvError('GetRawBagObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetRawBagObject is not a string.');  /* Error */
				return undefined;
			}
		},


		/* UInv Pocket/Container Functions: */
		/* ================================ */

		/* GetPocketBagContainerArray: Returns the array of all items that directly contain this pocket, or [] if none do, or undefined on error. */
		/*                             The array will be in the format of: [ { ContainerBagName : "name", ContainerName : "name", PocketName : "name" }, ... ] */
		GetPocketBagContainerArray : function (PocketBagName) {
			if (UInv.isString(PocketBagName)) {
				PocketBagName = FixBagName(PocketBagName);
				if (UInv.BagExists(PocketBagName)) {
					UInv.SetCurrentBagName(PocketBagName);
					if (UInv.isProperty(State.variables.UInvBags[PocketBagName], "UInvContainer")) {
						var Val = State.variables.UInvBags[PocketBagName].UInvContainer;
						if (UInv.isArrayOfGenericObjects(Val)) {
							if (Val.length > 0) {
								return Val;  /* Success */
							} else {
								return [];  /* Success */
							}
						} else {
							return [];  /* Success */
						}
					} else {
						return [];  /* Success */
					}
				} else {
					UInvError('GetPocketBagContainerArray cannot find bag "' + PocketBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetPocketBagContainerArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagIsPocket: Returns how many items the bag is a pocket for, or 0 if none, or undefined on error. */
		BagIsPocket : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					return UInv.GetPocketBagContainerArray(BagName).length;
				} else {
					UInvError('BagIsPocket cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagIsPocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasPocket: Returns how many pockets the item has, or 0 if none, or undefined on error.  If PocketName is passed, returns whether the item has a pocket with that name. */
		ItemHasPocket : function (BagName, ItemName, PocketName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);  /* OOO function call */
						if (UInv.ItemHasProperty(BagName, ItemName, "UInvPocket")) {  /* OOO function call */
							var Val = UInv.GetItemPropertyValue(BagName, ItemName, "UInvPocket");  /* OOO function call */
							var Keys = Object.keys(Val);
							if (UInv.isUndefined(PocketName)) {
								return Keys.length;  /* Success */
							} else {
								return Keys.includes(PocketName);  /* Success */
							}
						} else {
							if (UInv.isUndefined(PocketName)) {
								return 0;  /* Success - no pockets */
							} else {
								return false;  /* Success - no pockets */
							}
						}
					} else {
						UInvError('ItemHasPocket cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasPocket cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasPocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetPocketDepth: Returns 0 if it's a bag, 1 if it's a pocket, 2 if it's a pocket within a pocket, etc... or undefined on error. */
		GetPocketDepth : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.BagIsPocket(BagName)) {
						var Bags = UInv.GetPocketBagContainerArray(BagName), BagDepth = 0, i, n;
						for (i = 0; i < Bags.length; i++) {
							n = UInv.GetPocketDepth(Bags[i].ContainerBagName);
							if (UInv.isUndefined(n)) {
								UInvError('Corrupt data. GetPocketDepth cannot find bag "' + Bags[i].ContainerBagName + '", which is listed as the ContainerBagName for the bag "' + BagName + '".');  /* Error */
								return undefined;  /* NOTE: This error should NOT be able to happen if all UInv functions are working properly and the $UInvBags data isn't being changed by the user directly. */
							} else if (n > BagDepth) {
								BagDepth = n;
							}
						}
						return ++BagDepth;  /* Success */
					} else {
						return 0;  /* Success - bag is not a pocket */
					}
				} else {
					UInvError('GetPocketDepth cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetPocketDepth is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPocketNameArray: Gets an array of pocket names which the item has as pockets, returns [] if it has none, or undefined on error. */
		GetItemPocketNameArray : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);  /* OOO function call */
						if (UInv.ItemHasPocket(BagName, ItemName)) {
							var Val = UInv.GetItemPropertyValue(BagName, ItemName, "UInvPocket");  /* OOO function call */
							var Keys = Object.keys(Val);
							if (Keys.length > 0) {
								return Keys;  /* Success */
							} else {
								delete State.variables.UInvBags[BagName][ItemName].UInvPocket;  /* delete empty pocket object */
								return [];  /* Success */
							}
						} else {
							return [];  /* Success */
						}
					} else {
						UInvError('GetItemPocketNameArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPocketNameArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPocketNameArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPocketObject: Gets an object containing the PocketName-PocketBagName key-value pairs on the item, returns {} if it has none, or undefined on error. */
		GetItemPocketObject : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);  /* OOO function call */
						if (UInv.ItemHasPocket(BagName, ItemName)) {
							var Val = UInv.GetItemPropertyValue(BagName, ItemName, "UInvPocket");  /* OOO function call */
							var Keys = Object.keys(Val);
							if (Keys.length > 0) {
								return clone(Val);  /* Success */
							} else {
								delete State.variables.UInvBags[BagName][ItemName].UInvPocket;  /* delete empty pocket object */
								return {};  /* Success */
							}
						} else {
							return {};  /* Success */
						}
					} else {
						UInvError('GetItemPocketObject cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPocketObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPocketObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPocketBagArray: Gets an array of bag names which the item has as pockets, returns [] if it has none, or undefined on error. */
		GetItemPocketBagArray : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);  /* OOO function call */
						if (UInv.ItemHasProperty(BagName, ItemName, "UInvPocket")) {  /* OOO function call */
							var Val = UInv.GetItemPropertyValue(BagName, ItemName, "UInvPocket");  /* OOO function call */
							var Keys = Object.keys(Val);
							if (Keys.length > 0) {
								var Bags = [], i;
								for (i = 0; i < Keys.length; i++) {
									Bags.push(Val[Keys[i]]);
								}
								return Bags;  /* Success */
							} else {
								delete State.variables.UInvBags[BagName][ItemName].UInvPocket;  /* delete empty pocket object */
								return [];  /* Success */
							}
						} else {
							return [];  /* Success */
						}
					} else {
						UInvError('GetItemPocketBagArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPocketBagArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPocketBagArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasSpecificItem: Returns whether MainBagName (or any pockets on items within MainBagName) contain ItemBagName+ItemName, or undefined on error. */
		BagHasSpecificItem : function (MainBagName, ItemBagName, ItemName) {
			if (UInv.isString(MainBagName) && UInv.isString(ItemBagName) && UInv.isString(ItemName)) {
				ItemBagName = FixBagName(ItemBagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(MainBagName)) {
					if (UInv.BagExists(ItemBagName)) {
						if (UInv.BagHasItem(ItemBagName, ItemName)) {  /* OOO function call */
							UInv.SetCurrentBagName(ItemBagName);
							UInv.SetCurrentItemName(ItemName);  /* OOO function call */
							if ((MainBagName == ItemBagName) && (UInv.BagHasItem(ItemBagName, ItemName))) {  /* OOO function call */
								return true;  /* Success - found item */
							} else {
								var Items = UInv.GetItemsArray(MainBagName);  /* OOO function call */
								var PocketBags, i, j;
								for (i = 0; i < Items.length; i++) {
									PocketBags = UInv.GetItemPocketBagArray(MainBagName, Items[i]);
									if (PocketBags.length > 0) {
										for (j = 0; j < PocketBags.length; j++) {
											if (UInv.BagHasSpecificItem(PocketBags[j], ItemBagName, ItemName)) {
												return true;  /* Success - found item */
											}
										}
									}
								}
								return false;  /* Success - item not found */
							}
						} else {
							UInvError('BagHasSpecificItem cannot find item "' + ItemName + '" in bag "' + ItemBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('BagHasSpecificItem cannot find bag "' + ItemBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagHasSpecificItem cannot find bag "' + MainBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasSpecificItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddPocket: Adds a pocket to an existing item.  If the items are stacked, one of the items will get renamed and have a pocket added.  Returns the item's name on success, or undefined on error. */
		AddPocket : function (BagName, ItemName, PocketName, DefaultBagType, StartDepth, CurrentDepth) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(PocketName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						if (!UInv.ItemHasPocket(BagName, ItemName, PocketName)) {
							if (UInv.isUndefined(StartDepth)) {
								StartDepth = UInv.GetPocketDepth(BagName);
							}
							if (UInv.isUndefined(CurrentDepth)) {
								CurrentDepth = StartDepth;
							}
							if (UInv.isString(DefaultBagType)) {
								if (!UInv.GetDefaultBagObject(DefaultBagType, true)) {
									UInvError('AddPocket failed. Unknown bag type "' + DefaultBagType + '".');  /* Error */
									return undefined;
								}
							} else {
								if (!UInv.GetDefaultBagObject(PocketName, true)) {
									UInvError('AddPocket failed. Unknown bag type "' + PocketName + '".');  /* Error */
									return undefined;
								}
								DefaultBagType = PocketName;
							}
							UInv.IncrementUpdateLock();
							if (UInv.BagHasItem(BagName, ItemName) > 1) {  /* If there's more than one, pull an item out of the stack to add a pocket to it */ /* OOO function call */
								var NewItemName = UInv.GetUniqueItemName();  /* OOO function call */
								UInv.RenameItem(BagName, ItemName, NewItemName, 1);  /* OOO function call */
								UInv.SetBagTouched(BagName);
								ItemName = NewItemName;
							}
							var PocketBagName = PocketName;
							if (UInv.BagExists(PocketBagName)) {
								PocketBagName = UInv.GetUniqueBagName();
							}
							UInv.AddBag(PocketBagName, DefaultBagType, StartDepth, CurrentDepth + 1);
							/* Connect pocket to item and vice versa */
							State.variables.UInvBags[PocketBagName].UInvContainer = [ { ContainerBagName : BagName, ContainerName : ItemName, PocketName : PocketName } ];
							if (!UInv.ItemHasPocket(BagName, ItemName)) {
								State.variables.UInvBags[BagName][ItemName].UInvPocket = {};
							}
							State.variables.UInvBags[BagName][ItemName].UInvPocket[PocketName] = PocketBagName;
							UInv.DecrementUpdateLock();
							UInv.SetCurrentBagName(PocketBagName);
							return PocketBagName;
						} else {
							UInvError('AddPocket failed. Pocket "' + PocketName + '" already exists on item.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddPocket cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('AddPocket cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddPocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* CreatePocket: Creates a generic pocket on an existing item.  If the items are stacked, one of the items will get renamed and have a pocket added. */
		/*               Returns the item's name on success, or undefined on error. */
		CreatePocket : function (BagName, ItemName, PocketName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(PocketName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (!UInv.ItemHasPocket(BagName, ItemName, PocketName)) {
						if (UInv.BagHasItem(BagName, ItemName) > 1) {  /* Pull an item out of the stack to add a pocket to it */ /* OOO function call */
							UInv.IncrementUpdateLock();
							var NewItemName = UInv.GetUniqueItemName();  /* OOO function call */
							UInv.RenameItem(BagName, ItemName, NewItemName, 1);  /* OOO function call */
							UInv.SetBagTouched(BagName);
							ItemName = NewItemName;
						}
						if (UInv.BagHasItem(BagName, ItemName) == 1) {  /* OOO function call */
							var PocketBagName = PocketName;
							if (UInv.BagExists(PocketName)) {
								PocketBagName = UInv.GetUniqueBagName();
							}
							UInv.CreateBag(PocketBagName);  /* Create new bag as a pocket */
							/* Connect pocket to item and vice versa */
							State.variables.UInvBags[PocketBagName].UInvContainer = [ { ContainerBagName : BagName, ContainerName : ItemName, PocketName : PocketName } ];
							if (!UInv.ItemHasPocket(BagName, ItemName)) {
								State.variables.UInvBags[BagName][ItemName].UInvPocket = {};
							}
							State.variables.UInvBags[BagName][ItemName].UInvPocket[PocketName] = PocketBagName;
							UInv.DecrementUpdateLock();
							UInv.SetCurrentBagName(PocketBagName);
							return PocketBagName;
						} else {
							UInvError('CreatePocket cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('CreatePocket failed. Pocket "' + PocketName + '" already exists on item.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CreatePocket cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CreatePocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPocketBagName: Returns the bag name which matches the item's pocket name, or a random pocket bag name if PocketName isn't passed.  Returns false if pocket not found or undefined on error. */
		GetItemPocketBagName : function (BagName, ItemName, PocketName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);  /* OOO function call */
						if (UInv.ItemHasPocket(BagName, ItemName)) {
							if (UInv.isString(PocketName)) {
								if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName].UInvPocket, PocketName)) {
									return State.variables.UInvBags[BagName][ItemName].UInvPocket[PocketName];  /* Success - Return requested pocket bag name */
								} else {
									return false;  /* Success - Pocket not found */
								}
							} else {
								var PocketBagName = UInv.GetItemPocketBagArray(BagName, ItemName);
								return PocketBagName.random();  /* Success - Return random pocket bag name */
							}
						} else {
							return false;  /* Success - No pockets on item */
						}
					} else {
						UInvError('GetItemPocketBagName cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPocketBagName cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPocketBagName is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetPocketBagsPocketName: Returns the first PocketName which matches a pocket/bag (PocketBagName) on a particular item, or false if no match is found, or undefined on error. */
		GetPocketBagsPocketName : function (BagName, ItemName, PocketBagName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);  /* OOO function call */
						if (UInv.ItemHasPocket(BagName, ItemName)) {
							var PocketNames = UInv.GetItemPocketNameArray(BagName, ItemName), i;
							for (i = 0; i < PocketNames.length; i++) {
								if (State.variables.UInvBags[BagName][ItemName].UInvPocket[PocketNames[i]] == PocketBagName) {
									return PocketNames[i];  /* Success */
								}
							}
							return false;  /* Success - Pocket not found */
						} else {
							return false;  /* Success - No pockets on item */
						}
					} else {
						UInvError('GetPocketBagsPocketName cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetPocketBagsPocketName cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetPocketBagsPocketName is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeletePocket: Deletes the bag associated with the item's pocket name.  Returns true on success and undefined on error. */
		DeletePocket : function (BagName, ItemName, PocketName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(PocketName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						var PocketBagName = UInv.GetItemPocketBagName(BagName, ItemName, PocketName);
						if (PocketBagName) {
							UInv.SetCurrentBagName(BagName);
							UInv.SetCurrentItemName(ItemName);  /* OOO function call */
							return UInv.DeleteBag(PocketBagName);  /* Success */
						} else {
							UInvError('DeletePocket failed. PocketName "' + PocketName + '" does not exist on container.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('DeletePocket cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('DeletePocket cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeletePocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetAllBagPockets: Returns an array of all pockets' and sub-pockets' BagNames, plus BagName (unless NoSourceBag == true), or undefined on error.
							 All BagNames returned in the array will be unique within that array. */
		GetAllBagPockets: function (BagName, NoSourceBag) {
			var Bags = [ BagName ], Pockets, i, j;
			if ((!UInv.isUndefined(NoSourceBag)) && (NoSourceBag == true)) {
				Bags = [];
			}
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName);  /* Get a list of all items in bag */ /* OOO function call */
					for (i = 0; i < Items.length; i++) {
						Pockets = UInv.GetItemPocketBagArray(BagName, Items[i]);  /* Get all pockets on each item */
						if (Pockets.length > 0) {
							Pockets = UInv.GetAllBagPockets(Pockets, true);  /* Get all pockets within those pockets */
							for (j = 0; j < Pockets.length; j++) {
								Bags.pushUnique(Pockets[j]);  /* Add them all to the list if they aren't already there */
							}
						}
					}
					UInv.SetCurrentBagName(BagName);
					return Bags;  /* Success */
				} else {
					UInvError('GetAllBagPockets cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {  /* Check array of all bags */
					for (i = 0; i < BagName.length; i++) {
						Pockets = UInv.GetAllBagPockets(BagName[i]);  /* Get all pockets within those pockets */
						for (j = 0; j < Pockets.length; j++) {
							Bags.pushUnique(Pockets[j]);  /* Add them all to the list if they aren't already there */
						}
					}
					UInv.SetCurrentBagName(BagName[0]);
					return Bags;  /* Success */
				} else {
					UInvError('GetAllBagPockets failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				if (UInv.isArray(BagName) && (BagName.length === 0)) {
					return [];  /* Empty array; Success */
				}
				UInvError('Name passed to GetAllBagPockets is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetAllContainerPockets: Returns an array of all pockets' and sub-pockets's BagNames, or undefined on error.  (All BagNames returned in the array will be unique within that array.) */
		GetAllContainerPockets : function (ContainerBagName, ContainerName) {
			if (UInv.isString(ContainerBagName) && UInv.isString(ContainerName)) {
				ContainerBagName = FixBagName(ContainerBagName);
				ContainerName = FixItemName(ContainerName);
				if (UInv.BagExists(ContainerBagName)) {
					if (UInv.BagHasItem(ContainerBagName, ContainerName)) {  /* OOO function call */
						if (UInv.ItemHasPocket(ContainerBagName, ContainerName)) {
							var PocketBags = UInv.GetItemPocketBagArray(ContainerBagName, ContainerName), CurPockets, AllPockets = [], i, j;
							for (i = 0; i < PocketBags.length; i++) {
								CurPockets = UInv.GetAllBagPockets(PocketBags[i]);
								for (j = 0; j < CurPockets.length; j++) {
									AllPockets.pushUnique(CurPockets[j]);
								}
							}
							return AllPockets;  /* Success */
						} else {
							return [];  /* Success - no pockets */
						}
					} else {
						UInvError('GetAllContainerPockets cannot find item "' + ContainerName + '" in bag "' + ContainerBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetAllContainerPockets cannot find bag "' + ContainerBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetAllContainerPockets is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ContainerHasItem: Returns the total number of items named ItemName in all of container's pockets (does not include the container itself in that count), or undefined on error. */
		ContainerHasItem : function (ContainerBagName, ContainerName, ItemName) {
			if (UInv.isString(ContainerBagName) && UInv.isString(ContainerName)) {
				ContainerBagName = FixBagName(ContainerBagName);
				ContainerName = FixItemName(ContainerName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(ContainerBagName)) {
					if (UInv.BagHasItem(ContainerBagName, ContainerName)) {  /* OOO function call */
						if (UInv.ItemHasPocket(ContainerBagName, ContainerName)) {
							var PocketBags = UInv.GetAllContainerPockets(ContainerBagName, ContainerName), i, n = 0;
							for (i = 0; i < PocketBags.length; i++) {
								n += UInv.BagHasItem(PocketBags[i], ItemName);  /* OOO function call */
							}
							return n;  /* Success */
						} else {
							return 0;  /* Success - no pockets */
						}
					} else {
						UInvError('ContainerHasItem cannot find item "' + ContainerName + '" in bag "' + ContainerBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ContainerHasItem cannot find bag "' + ContainerBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ContainerHasItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ContainerHasPocketBag: Returns whether BagName exists anywhere within the container, or undefined on error. */
		ContainerHasPocketBag : function (ContainerBagName, ContainerName, BagName) {
			if (UInv.isString(ContainerBagName) && UInv.isString(ContainerName)) {
				ContainerBagName = FixBagName(ContainerBagName);
				ContainerName = FixItemName(ContainerName);
				BagName = FixBagName(BagName);
				if (UInv.BagExists(ContainerBagName)) {
					if (UInv.BagHasItem(ContainerBagName, ContainerName)) {  /* OOO function call */
						if (UInv.ItemHasPocket(ContainerBagName, ContainerName)) {
							if (UInv.BagExists(BagName)) {
								var PocketBags = UInv.GetItemPocketBagArray(ContainerBagName, ContainerName), CurPockets, i;
								if (PocketBags.includes(BagName)) {
									return true;  /* Success */
								}
								for (i = 0; i < PocketBags.length; i++) {
									CurPockets = UInv.GetAllBagPockets(PocketBags[i]);
									if (CurPockets.includes(BagName)) {
										return true;  /* Success */
									}
								}
								return false;  /* Success - bag not found in or on container */
							} else {
								return false;  /* Success - bag doesn't exist */
							}
						} else {
							return false;  /* Success - no pockets */
						}
					} else {
						UInvError('ContainerHasPocketBag cannot find item "' + ContainerName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ContainerHasPocketBag cannot find bag "' + ContainerBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ContainerHasPocketBag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddExistingBagAsPocket: Adds an existing bag as pocket to an existing item.  If the items are stacked, one of the items will get renamed and has a pocket added. */
		/*                         Returns the item's name on success (in case it had to be changed when unstacking occurred), or undefined on error. */
		AddExistingBagAsPocket : function (BagName, ItemName, PocketName, PocketBagName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(PocketName) && UInv.isString(PocketBagName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				PocketBagName = FixBagName(PocketBagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {  /* OOO function call */
						if (UInv.BagExists(PocketBagName)) {
							if (!UInv.BagHasSpecificItem(PocketBagName, BagName, ItemName)) {
								if (!UInv.ItemHasPocket(BagName, ItemName, PocketName)) {
									UInv.IncrementUpdateLock();
									if (UInv.BagHasItem(BagName, ItemName) > 1) {  /* Pull an item out of the stack to add a pocket to it */ /* OOO function call */
										var NewItemName = UInv.GetUniqueItemName();  /* OOO function call */
										UInv.RenameItem(BagName, ItemName, NewItemName, 1);  /* OOO function call */
										UInv.SetBagTouched(BagName);
										ItemName = NewItemName;
									}
									/* Connect pocket to item and vice versa */
									State.variables.UInvBags[PocketBagName].UInvContainer = [ { ContainerBagName : BagName, ContainerName : ItemName, PocketName : PocketName } ];
									if (!UInv.ItemHasPocket(BagName, ItemName)) {
										State.variables.UInvBags[BagName][ItemName].UInvPocket = {};
									}
									State.variables.UInvBags[BagName][ItemName].UInvPocket[PocketName] = PocketBagName;
									UInv.DecrementUpdateLock();
									UInv.SetCurrentBagName(PocketBagName);
									return ItemName;
								} else {
									UInvError('AddExistingBagAsPocket failed. Pocket "' + PocketName + '" already exists on item.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('AddExistingBagAsPocket failed. Container cannot contain itself.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('AddExistingBagAsPocket cannot find bag "' + PocketBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddExistingBagAsPocket cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('AddExistingBagAsPocket cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddExistingBagAsPocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetContainerIndex: Returns index of container in a bag's UInvContainer array which has the pocket name of PocketName, -1 if not found, or undefined on error. */
		GetContainerIndex : function (BagName, PocketName) {
			if (UInv.isString(BagName) && UInv.isString(PocketName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Containers = UInv.GetPocketBagContainerArray(BagName);
					if (Containers.length > 0) {
						var i;
						for (i = 0; i < Containers.length; i++) {
							if (Containers[i].PocketName == PocketName) {
								return i;  /* Success */
							}
						}
					}
					return -1;  /* Success - PocketName not found */
				} else {
					UInvError('GetContainerIndex cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetContainerIndex is not a string.');  /* Error */
				return undefined;
			}
		},

		/* UnlinkPocketFromContainer: Unlinks a pocket from its container item (and vice versa).  Returns true on success, or undefined on error. */
		UnlinkPocketFromContainer : function (ContainerBagName, ContainerName, PocketName) {
			if (UInv.isString(ContainerBagName) && UInv.isString(ContainerName)) {
				ContainerBagName = FixBagName(ContainerBagName);
				ContainerName = FixItemName(ContainerName);
				if (UInv.BagExists(ContainerBagName)) {
					if (UInv.BagHasItem(ContainerBagName, ContainerName)) {  /* OOO function call */
						if (UInv.isString(PocketName)) {  /* Unlink specific pocket from container */
							var PocketBagName = UInv.GetItemPocketBagName(ContainerBagName, ContainerName, PocketName);
							if (PocketBagName) {
								delete State.variables.UInvBags[ContainerBagName][ContainerName].UInvPocket[PocketName];  /* Unlink pocket from container */
								if (Object.keys(State.variables.UInvBags[ContainerBagName][ContainerName].UInvPocket).length == 0) {
									delete State.variables.UInvBags[ContainerBagName][ContainerName].UInvPocket;
								}
								var PocketIndex = UInv.GetContainerIndex(PocketBagName, PocketName);
								if (PocketIndex >= 0) {  /* Unlink container from pocket */
									State.variables.UInvBags[PocketBagName].UInvContainer.deleteAt(PocketIndex);
									if (State.variables.UInvBags[PocketBagName].UInvContainer.length == 0) {
										delete State.variables.UInvBags[PocketBagName].UInvContainer;
									}
								}
								UInv.SetCurrentBagName(ContainerBagName);
								UInv.SetCurrentItemName(ContainerName);  /* OOO function call */
								return true;  /* Success */
							} else {
								UInvError('UnlinkPocketFromContainer failed. PocketName "' + PocketName + '" does not exist on container.');  /* Error */
								return undefined;
							}
						} else {  /* Unlink ALL pockets from container */
							var Pockets = UInv.GetItemPocketBagArray(ContainerBagName, ContainerName);
							if (Pockets.length > 0) {
								var i;
								for (i = 0; i < Pockets.length; i++) {
									UInv.UnlinkPocketFromContainer(ContainerBagName, ContainerName, Pockets[i]);
								}
							}
							return true;  /* Success */
						}
					} else {
						UInvError('UnlinkPocketFromContainer cannot find item "' + ContainerName + '" in bag "' + ContainerBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('UnlinkPocketFromContainer cannot find bag "' + ContainerBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to UnlinkPocketFromContainer is not a string.');  /* Error */
				return undefined;
			}
		},

		/* UnlinkPocketBagFromContainer: Unlinks a pocket from its container item (and vice versa).  Returns true on success, or undefined on error. */
		UnlinkPocketBagFromContainer : function (ContainerBagName, ContainerName, PocketBagName) {
			if (UInv.isString(ContainerBagName) && UInv.isString(ContainerName) && UInv.isString(PocketBagName)) {
				ContainerBagName = FixBagName(ContainerBagName);
				ContainerName = FixItemName(ContainerName);
				if (UInv.BagExists(ContainerBagName)) {
					if (UInv.BagHasItem(ContainerBagName, ContainerName)) {  /* OOO function call */
						if (UInv.BagExists(PocketBagName)) {
							var PocketName = UInv.GetPocketBagsPocketName(ContainerBagName, ContainerName, PocketBagName);
							if (UInv.isString(PocketName)) {
								return UInv.UnlinkPocketFromContainer(ContainerBagName, ContainerName, PocketName);  /* Success */
							} else {
								UInvError('UnlinkPocketBagFromContainer failed. "' + PocketBagName + '" is not a pocket of "' + ContainerName + '" in bag "' + ContainerBagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('UnlinkPocketBagFromContainer cannot find bag "' + PocketBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('UnlinkPocketBagFromContainer cannot find item "' + ContainerName + '" in bag "' + ContainerBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('UnlinkPocketBagFromContainer cannot find bag "' + ContainerBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to UnlinkPocketBagFromContainer is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MovePocket: Move a pocket from one container to another.  If the destination item is stacked, one of the items will get renamed and have a pocket added. */
		/*             Returns the item's name on success (in case it had to be changed when unstacking occurred), or undefined on error. */
		MovePocket : function (SourceBagName, SourceItemName, SourcePocketName, DestinationBagName, DestinationItemName, DestinationPocketName) {
			if (UInv.isString(SourceBagName) && UInv.isString(SourceItemName) && UInv.isString(SourcePocketName) && UInv.isString(DestinationBagName)) {
				SourceBagName = FixBagName(SourceBagName);
				SourceItemName = FixItemName(SourceItemName);
				DestinationBagName = FixBagName(DestinationBagName);
				DestinationItemName = FixItemName(DestinationItemName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagHasItem(SourceBagName, SourceItemName)) {  /* OOO function call */
						if (UInv.BagExists(DestinationBagName)) {
							if (UInv.BagHasItem(DestinationBagName, DestinationItemName)) {  /* OOO function call */
								if (UInv.ItemHasPocket(SourceBagName, SourceItemName, SourcePocketName)) {
									if (!UInv.isString(DestinationPocketName)) {
										DestinationPocketName = SourcePocketName;
									}
									if (!UInv.ItemHasPocket(DestinationBagName, DestinationItemName, DestinationPocketName)
										|| (State.variables.UInvBags[SourceBagName] === State.variables.UInvBags[DestinationBagName])) {
										/* Allow exception for RenameBag() where both will reference the same object */
										var PocketBagName = UInv.GetItemPocketBagName(SourceBagName, SourceItemName, SourcePocketName);
										if (UInv.BagHasSpecificItem(PocketBagName, DestinationBagName, DestinationItemName)) {
											UInvError('MovePocket failed. Source pocket cannot contain destination item.');  /* Error */
											return undefined;
										}
										if (UInv.UnlinkPocketFromContainer(SourceBagName, SourceItemName, SourcePocketName)) {
											return UInv.AddExistingBagAsPocket(DestinationBagName, DestinationItemName, DestinationPocketName, PocketBagName);  /* Success */
										}
										UInvError('MovePocket failed. Unable to unlink pocket "' + SourcePocketName + '" from item "' + SourceItemName + '" in bag "' + SourceBagName + '".');  /* Error */
										return undefined;  /* Error - This shouldn't happen */
									} else {
										UInvError('MovePocket failed. Pocket "' + DestinationPocketName + '" already exists on destination item.');  /* Error */
										return undefined;
									}
								} else {
									UInvError('MovePocket failed. Pocket "' + SourceItemName + '" cannot be found.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('MovePocket cannot find item "' + DestinationItemName + '" in bag "' + DestinationBagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MovePocket cannot find bag "' + DestinationBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MovePocket cannot find item "' + SourceItemName + '" in bag "' + SourceBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MovePocket cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MovePocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItemFromPocket: Move an item into a pocket.  If the Quantity parameter isn't set, then move all of that item. */
		MoveItemFromPocket : function (ContainerBagName, ContainerItemName, PocketName, ItemName, DestinationBagName, Quantity) {
			if (UInv.isString(ContainerBagName) && UInv.isString(ContainerItemName) && UInv.isString(PocketName) && UInv.isString(ItemName) && UInv.isString(DestinationBagName)) {
				ContainerBagName = FixBagName(ContainerBagName);
				ContainerItemName = FixItemName(ContainerItemName);
				ItemName = FixItemName(ItemName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(ContainerBagName)) {
					if (UInv.BagHasItem(ContainerBagName, ContainerItemName)) {  /* OOO function call */
						if (UInv.ItemHasPocket(ContainerBagName, ContainerItemName, PocketName)) {
							var PocketBagName = UInv.GetItemPocketBagName(ContainerBagName, ContainerItemName, PocketName);
							var Count = UInv.BagHasItem(PocketBagName, ItemName);  /* OOO function call */
							if (Count) {
								if (UInv.BagExists(DestinationBagName)) {
									if (UInv.ContainerHasPocketBag(PocketBagName, ItemName, DestinationBagName)) {
										UInvError('MoveItemFromPocket failed. Source item cannot be moved inside of itself.');  /* Error */
										return undefined;
									}
									Quantity = tryIntParse(Quantity);
									if (UInv.isNumber(Quantity)) {
										Quantity = Math.round(Quantity);
										if (Quantity < 1) {
											Quantity = 1;
										}
										if (Quantity > Count) {
											Quantity = Count;
										}
									} else {
										Quantity = Count;
									}
									return UInv.MoveItem(PocketBagName, DestinationBagName, ItemName, Quantity);
								} else {
									UInvError('MoveItemFromPocket cannot find bag "' + DestinationBagName + '".');  /* Error */
									return undefined;
								}
							} else {
								UInvError('MoveItemFromPocket cannot find item "' + ItemName + '" in pocket "' + PocketName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveItemFromPocket failed. Pocket "' + PocketName + '" cannot be found.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItemFromPocket cannot find item "' + ContainerItemName + '" in bag "' + ContainerBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItemFromPocket cannot find bag "' + ContainerBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItemFromPocket is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItemToPocket: Move an item into a pocket.  If the Quantity parameter isn't set, then move all of that item. */
		MoveItemToPocket : function (SourceBagName, SourceItemName, DestinationBagName, DestinationItemName, DestinationPocketName, Quantity) {
			if (UInv.isString(SourceBagName) && UInv.isString(SourceItemName) && UInv.isString(DestinationBagName) && UInv.isString(DestinationItemName) && UInv.isString(DestinationPocketName)) {
				SourceBagName = FixBagName(SourceBagName);
				SourceItemName = FixItemName(SourceItemName);
				DestinationBagName = FixBagName(DestinationBagName);
				DestinationItemName = FixItemName(DestinationItemName);
				if (UInv.BagExists(SourceBagName)) {
					var Count = UInv.BagHasItem(SourceBagName, SourceItemName);  /* OOO function call */
					if (Count) {
						if (UInv.BagExists(DestinationBagName)) {
							if (UInv.BagHasItem(DestinationBagName, DestinationItemName)) {  /* OOO function call */
								if (UInv.ItemHasPocket(DestinationBagName, DestinationItemName, DestinationPocketName)) {
									var DestinationPocketBagName = UInv.GetItemPocketBagName(DestinationBagName, DestinationItemName, DestinationPocketName);
									if (UInv.ContainerHasPocketBag(SourceBagName, SourceItemName, DestinationPocketBagName)) {
										UInvError('MoveItemToPocket failed. Source item cannot be moved inside of itself.');  /* Error */
										return undefined;
									}
									Quantity = tryIntParse(Quantity);
									if (UInv.isNumber(Quantity)) {
										Quantity = Math.round(Quantity);
										if (Quantity < 1) {
											Quantity = 1;
										}
										if (Quantity > Count) {
											Quantity = Count;
										}
									} else {
										Quantity = Count;
									}
									var DestinationPocketBag = UInv.GetItemPocketBagName(DestinationBagName, DestinationItemName, DestinationPocketName);
									return UInv.MoveItem(SourceBagName, DestinationPocketBag, SourceItemName, Quantity);
								} else {
									UInvError('MoveItemToPocket failed. Pocket "' + DestinationPocketName + '" cannot be found.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('MoveItemToPocket cannot find item "' + DestinationItemName + '" in bag "' + DestinationBagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveItemToPocket cannot find bag "' + DestinationBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItemToPocket cannot find item "' + SourceItemName + '" in bag "' + SourceBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItemToPocket cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItemToPocket is not a string.');  /* Error */
				return undefined;
			}
		},


		/* UInv Item Functions: */
		/* ==================== */

		/* GetDefaultItemObject: Returns an Item object that matches ItemType. */
		/* Returns "null" for unknown bag types, or undefined on error.  Both "undefined" and "null" have "falsey" values. */
		GetDefaultItemObject : function (ItemType) {
			if (UInv.isString(ItemType)) {
				if ((ItemType === "") || (ItemType === "-")) {
					/* Do not throw an error here.  This case is used to trigger a "null" return if the ItemType === "" or "-". */
					return null;  /* Silent failure */
				}
				var IName = ItemType.toLowerCase();
				if (!["", "-", "uinvtouched", "uinvproperties", "uinvdefaultbagtype", "uinvcontainer"].includes(IName)) {
					var Item = UInv.ItemData(IName);
					if (UInv.isUndefined(Item)) {
						return null;  /* Silent failure */
					}
					if (UInv.isProperty(Item, "UInvQuantity")) {  /* Item should not have a UInvQuantity property. */
						delete Item.UInvQuantity;
					}
					if (UInv.isProperty(Item, "UInvDefaultItemType")) {  /* Item should not have a UInvDefaultItemType property. */
						delete Item.UInvDefaultItemType;
					}
					return Item;  /* Success */
				} else {
					UInvError('GetDefaultItemObject failed. ItemType cannot be "' + ItemType + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('ItemType passed to GetDefaultItemObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetCurrentItemName: Gets the current item name if there is a valid one, otherwise returns "". */
		GetCurrentItemName : function () {
			if (UInv.isProperty(State.variables, "UInvCurrentItemName")) {
				var Value = State.variables.UInvCurrentItemName;
				if (UInv.isString(Value) && !UInv.ReservedBagProperties_LC.includes(Value.toLowerCase())) {
					return Value;  /* Success */
				}
				delete State.variables.UInvCurrentItemName;  /* delete invalid value */
			}
			return "";  /* Success */
		},

		/* SetCurrentItemName: Sets the UInvCurrentItemName to ItemName for use as the default ItemName parameter in UInv functions.  Returns true on success or undefined on error. */
		SetCurrentItemName : function (ItemName) {
			if (UInv.isString(ItemName)) {
				if (ItemName === "") {
					if (UInv.isProperty(State.variables, "UInvCurrentItemName")) {
						delete State.variables.UInvCurrentItemName;
					}
				} else {
					if (!UInv.ReservedBagProperties_LC.includes(ItemName.toLowerCase())) {
						State.variables.UInvCurrentItemName = ItemName;
					} else {
						UInvError('SetCurrentItemName failed.  "' + ItemName + '" is a reserved name which cannot be used as an item name.');  /* Error */
						return undefined;
					}
				}
				return true;  /* Success */
			} else {
				UInvError('ItemName passed to SetCurrentItemName is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItem: Returns the number of ItemName items in BagName, or undefined if there is an error. */
		BagHasItem : function (BagName, ItemName) {
			if (UInv.isString(ItemName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					ItemName = FixItemName(ItemName);
					if (UInv.BagExists(BagName)) {
						UInv.SetCurrentBagName(BagName);
						if (UInv.isProperty(State.variables.UInvBags[BagName], ItemName)) {
							UInv.SetCurrentItemName(ItemName);
							if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvQuantity")) {
								return State.variables.UInvBags[BagName][ItemName].UInvQuantity;  /* Success */
							} else {
								return 1;  /* Success - Default value of UInvQuantity = 1 */
							}
						} else {
							return 0;  /* Not found */
						}
					} else {
						UInvError('BagHasItem cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var i = 0, Result = true;
						for (i = 0; i < BagName.length; i++) {
							Result = UInv.BagHasItem(BagName[i], ItemName);
						}
						return Result;  /* Success */
					} else {
						UInvError('BagHasItem failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to BagHasItem is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('ItemName passed to BagHasItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemExists: Returns true if ItemName is in GetDefaultItem or any bags, otherwise returns false, or undefined on error. */
		ItemExists : function (ItemName) {
			if (UInv.isString(ItemName)) {
				if (UInv.GetDefaultItemObject(ItemName)) {
					return true;  /* Success */
				}
				var Bags = UInv.GetBagsArray(), i = 0;
				if (Bags.length > 0) {
					for (i = 0; i < Bags.length; i++) {
						if (UInv.BagHasItem(Bags[i], ItemName)) {
							return true;  /* Success */
						}
					}
				}
				return false;  /* Success - not found */
			} else {
				UInvError('ItemName passed to ItemExists is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetUniqueItemName: Generates and returns an unused item name ("itemXXHEXX"). */
		GetUniqueItemName : function () {
			var ItemName = "item" + UInv.getRandomHexString();
			while (UInv.ItemExists(ItemName)) {
				ItemName = "item" + UInv.getRandomHexString();
			}
			return ItemName;
		},

		/* GetItemsDefaultType: Returns item's default item type if it has one, "-" if it doesn't, or undefined on error. */
		GetItemsDefaultType : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
						UInvError('GetItemsDefaultType cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsDefaultType cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsDefaultType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArray: Returns an array of item names in BagName (not including UInvTouched, UInvProperties, UInvDefaultBagType, or UInvContainer), or undefined if there is an error. */
		GetItemsArray : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = Object.keys(State.variables.UInvBags[BagName]), i;
					for (i = 0; i < UInv.ReservedBagProperties.length; i++) {
						Items.delete(UInv.ReservedBagProperties[i]);
					}
					UInv.SetCurrentBagName(BagName);
					return Items;  /* Success */
				} else {
					UInvError('GetItemsArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemObject: Returns an item object from BagName that matches ItemName, or undefined if there is an error.  UInvQuantity will try to be the first property on the object. */
		GetItemObject : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						var ItemObj = UInv.GetDefaultItemObject(UInv.GetItemsDefaultType(BagName, ItemName));
						if (ItemObj && (!UInv.isProperty(ItemObj, "UInvVariableType")) && (!UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvVariableType"))) {
							if (UInv.isProperty(ItemObj, "UInvPocket")) {  /* Don't include default pockets */
								delete ItemObj.UInvPocket;
							}
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
						return ItemObj;  /* Success */
					} else {
						UInvError('GetItemObject cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPropertiesArray: Returns an array of ItemName's item property names from BagName, or undefined if there is an error.  UInvQuantity will be item 0 in array. */
		GetItemPropertiesArray : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						var ItemList = UInv.GetItemObject(BagName, ItemName), Result = [];
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						if (ItemList === undefined) {
							return undefined;  /* Error */
						} else {
							Result.push("UInvQuantity");
							if (UInv.isProperty(ItemList, "UInvQuantity")) {
								delete ItemList.UInvQuantity;
							}
							Result = Result.concat(Object.keys(ItemList));
							return Result;  /* Success */
						}
					} else {
						UInvError('GetItemPropertiesArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPropertiesArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPropertiesArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasProperty: Returns whether ItemName in BagName has ItemPropertyName, or undefined if there is an error. */
		ItemHasProperty : function (BagName, ItemName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						return UInv.GetItemPropertiesArray(BagName, ItemName).includes(ItemPropertyName);  /* Success */
						/* You can't check State.variables.UInvBags[BagName][ItemName][ItemPropertyName] because that will not be defined for items using a DefaultItem's default property value. */
					} else {
						UInvError('ItemHasProperty cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayByProperty: Returns an array of all ItemNames in a bag that have property ItemPropertyName. */
		GetItemsArrayByProperty : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName), Result = [], i;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayByProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPropertyValue: Returns the value of ItemPropertyName if it exists, otherwise return undefined on error. */
		GetItemPropertyValue : function (BagName, ItemName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							return UInv.GetItemObject(BagName, ItemName)[ItemPropertyName];  /* Success */
						} else {
							UInvError('GetItemPropertyValue cannot find property "' + ItemPropertyName + '" in item "' + ItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWherePropertyEquals: Returns an array of all items in a bag where ItemPropertyName === Value. */
		GetItemsArrayWherePropertyEquals : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (arguments.length >= 3) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), Result = [], i = 0;
						UInv.SetCurrentBagName(BagName);
						for (i = 0; i < Items.length; i++) {
							if (UInv.valuesAreEqual(UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName), Value)) {
								Result.push(Items[i]);
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('GetItemsArrayWherePropertyEquals cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArrayWherePropertyEquals failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWherePropertyEquals is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAllItems: Returns t/f based on whether the bag has all of the items in the bag, or undefined if there is an error. */
		BagHasAllItems: function (BagName, ItemArray) {
			var i = 0;
			if (UInv.isString(BagName)) {
				if (UInv.isArrayOfStrings(ItemArray)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						UInv.SetCurrentBagName(BagName);
						for (i = 0; i < ItemArray.length; i++) {
							if (!UInv.BagHasItem(BagName, ItemArray[i])) {
								return false;  /* Success - could not find an item */
							}
						}
						return true;  /* Success - all items found */
					} else {
						UInvError('BagHasAllItems cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					if (UInv.isArray(ItemArray) && (ItemArray.length === 0)) {
						return true;  /* Empty array; Success */
					}
					UInvError('ItemArray passed to BagHasAllItems is not an array of strings.');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var Result = true;
					for (i = 0; i < BagName.length; i++) {
						Result = UInv.BagHasAllItems(BagName[i], ItemArray);
					}
					return Result;  /* Success */
				} else {
					UInvError('BagHasAllItems failed. Invalid bag name in BagName array.');  /* Error */
					return undefined;
				}
			} else {
				if (UInv.isArray(BagName) && (BagName.length === 0)) {
					return true;  /* Empty array; Success */
				}
				UInvError('BagName passed to BagHasAllItems is not a string or array of strings.');  /* Error */
				return undefined;
			}
		},

		/* SetItemsDefaultType: Changes an item's default item type.  Returns true on success. */
		SetItemsDefaultType : function (BagName, ItemName, DefaultItemType) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(DefaultItemType)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						var DefObj = UInv.GetDefaultItemObject(DefaultItemType);
						if (DefObj || (DefaultItemType === "-")) {
							UInv.SetCurrentItemName(ItemName);
							UInv.SetCurrentBagName(BagName);
							var Item = UInv.GetItemObject(BagName, ItemName);
							if (DefaultItemType !== "-") {
								RemoveItemObjectsDefaultProperties(Item, DefaultItemType);
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
							return true;  /* Success */
						} else {
							UInvError('SetItemsDefaultType failed. "' + DefaultItemType + '" is not a valid default item type.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SetItemsDefaultType cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SetItemsDefaultType cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetItemsDefaultType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetItemPropertyValue: Set the value of a property on an object (returns true), add that property if it doesn't exist (returns false), or return undefined if there is an error. */
		/*                       Removes property if the value matches the value of the GetDefaultItemObject version of this item.  Does not touch bag unless UInvQuantity changed. */
		SetItemPropertyValue : function (BagName, ItemName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						if (arguments.length >= 4) {
							if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
								var ItemType = UInv.GetItemsDefaultType(BagName, ItemName);
								switch (ItemPropertyName) {
								case "UInvQuantity":
									if (UInv.isNumber(Value)) {
										if ((Value > 0) && (Value === Math.round(Value))) {
											if (UInv.BagHasItem(BagName, ItemName) !== Value) {
												if (Value === 1) {
													delete State.variables.UInvBags[BagName][ItemName].UInvQuantity;  /* Defaults to 1 */
												} else {
													if (UInv.ItemHasPocket(BagName, ItemName)) {
														UInvError('SetItemPropertyValue failed on item item "' + ItemName + '" in bag "' + BagName + '". UInvQuantity cannot be above one for items with pockets.');  /* Error */
														return undefined;
													} else {
														State.variables.UInvBags[BagName][ItemName].UInvQuantity = Value;
													}
												}
												UInv.SetBagTouched(BagName);
											}
											return true;  /* Success */
										} else {
											UInvError('SetItemPropertyValue failed. UInvQuantity must be a positive integer.');  /* Error */
											return undefined;
										}
									} else {
										UInvError('SetItemPropertyValue failed. UInvQuantity must be a positive integer.');  /* Error */
									}
									return undefined;
								case "UInvDefaultItemType":
									if ((!UInv.GetDefaultItemObject(Value)) && (Value !== "-")) {
										UInvError('SetItemPropertyValue failed. When setting the UInvDefaultItemType property, the Value parameter must be a valid default item type.');  /* Error */
										return undefined;
									}
									return UInv.SetItemsDefaultType(BagName, ItemName, Value);
								case "UInvVariableType":
									if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvVariableType") || (ItemType === "-")) {
										State.variables.UInvBags[BagName][ItemName].UInvVariableType = Value;
									} else {  /* set item's default properties */
										State.variables.UInvBags[BagName][ItemName] = Object.assign({}, UInv.GetDefaultItemObject(ItemType), State.variables.UInvBags[BagName][ItemName]);
										State.variables.UInvBags[BagName].UInvDefaultItemType = ItemType;
										State.variables.UInvBags[BagName][ItemName].UInvVariableType = Value;
									}
									return true;  /* Success */
								case "UInvPocket":
									UInvError('SetItemPropertyValue failed. Pockets should not be manipulated directly. Use Pocket/Container functions instead.');  /* Error */
									return undefined;
								default:
									var Item = UInv.GetDefaultItemObject(ItemType);
									if (Item) {
										if ((UInv.isProperty(Item, ItemPropertyName)) && (!UInv.isProperty(Item, "UInvVariableType"))) {
											if (UInv.valuesAreEqual(Value, Item[ItemPropertyName])) {  /* Matches default value of GetDefaultItemObject version */
												if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], ItemPropertyName)) {
													delete State.variables.UInvBags[BagName][ItemName][ItemPropertyName];
												}
												return true;  /* Success */
											}
										}
									}
									State.variables.UInvBags[BagName][ItemName][ItemPropertyName] = Value;
									return true;  /* Success */
								}
							} else {
								State.variables.UInvBags[BagName][ItemName][ItemPropertyName] = Value;
								return false;  /* Success */
							}
						} else {
							UInvError('SetItemPropertyValue failed. Value parameter is missing.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SetItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SetItemPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetItemPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetItemQuantity: Sets an item's quantity, returns true if successful.  Quantity must be a positive integer. */
		SetItemQuantity : function (BagName, ItemName, Quantity) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						Quantity = tryIntParse(Quantity);
						if (UInv.isNumber(Quantity)) {
							if ((Quantity === Math.round(Quantity)) && (Quantity > 0)) {
								if (UInv.BagHasItem(BagName, ItemName) !== Quantity) {
									if ((UInv.ItemHasPocket(BagName, ItemName)) && (Quantity > 1)) {
										UInvError('SetItemQuantity failed on item item "' + ItemName + '" in bag "' + BagName + '". Quantity cannot be above one for items with pockets.');  /* Error */
										return undefined;
									}
									UInv.SetItemPropertyValue(BagName, ItemName, "UInvQuantity", Quantity);
									UInv.SetBagTouched(BagName);
								}
								return true;  /* Success */
							} else {
								UInvError('Quantity passed to SetItemQuantity must be a positive integer.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('Quantity passed to SetItemQuantity is not a number.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SetItemQuantity cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SetItemQuantity cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetItemQuantity is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteItem: Deletes Quantity items from bag, returns true if successful.  Quantity is an integer, defaults to deleting all items, has a floor of 0, and a max of the item's UInvQuantity. */
		/*             Does not throw an error if ItemName doesn't exist, since that item is basically already deleted. */
		DeleteItem : function (BagName, ItemName, Quantity) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var i = 0;
					if (UInv.isString(ItemName)) {
						ItemName = FixItemName(ItemName);
						if (!UInv.ReservedBagProperties.includes(ItemName)) {
							if (UInv.BagHasItem(BagName, ItemName)) {
								UInv.SetCurrentBagName(BagName);
								var Amt = UInv.BagHasItem(BagName, ItemName);
								if (Amt > 0) {
									Quantity = tryIntParse(Quantity);
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
											var PocketNames = UInv.GetItemPocketNameArray(BagName, ItemName), PocketBag;
											if (PocketNames.length > 0) {  /* Unlink all pockets. */
												for (i = 0; i < PocketNames.length; i++) {
													PocketBag = UInv.GetItemPocketBagName(BagName, ItemName, PocketNames[i]);
													UInv.UnlinkPocketFromContainer(BagName, ItemName, PocketNames[i]);
													if (!UInv.BagIsPocket(PocketBag)) {  /* If the pocket bag isn't a pocket anymore, delete it and all of the items inside it. */
														UInv.DeleteBag(PocketBag);
													}
												}
											}
											delete State.variables.UInvBags[BagName][ItemName];  /* Delete item. */
											UInv.SetBagTouched(BagName);
										} else {
											UInv.SetItemQuantity(BagName, ItemName, UInv.BagHasItem(BagName, ItemName) - Quantity);
											UInv.SetBagTouched(BagName);
											UInv.SetCurrentItemName(ItemName);
										}
									} else {
										UInv.SetCurrentItemName(ItemName);
									}
									return true;  /* Success */
								} else {
									return true;  /* Success - item already didn't exist */
								}
							} else {
								UInvError('Item "' + ItemName + '" passed to DeleteItem do not exist in bag "' + BagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('DeleteItem failed. ItemName cannot be "' + ItemName + '".');  /* Error */
							return undefined;
						}
					} else if (UInv.isArrayOfStrings(ItemName)) {
						if (UInv.BagHasAllItems(BagName, ItemName)) {
							var Result = true;
							if (ItemName.length > 0) {
								for (i = 0; i < ItemName.length; i++) {
									if (!UInv.DeleteItem(BagName, ItemName[i], Quantity)) {
										Result = undefined;
									}
								}
							}
							return Result;  /* Success (or Error, shouldn't happen) */
						} else {
							UInvError('Some items names passed to DeleteItem do not exist in bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('DeleteItem failed. ItemName is not a string or an array of strings.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('DeleteItem cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to DeleteItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddToItemPropertyValue: Add an amount to a property's value (returns true), create that property if it doesn't exist (returns false), or return undefined if there is an error. */
		/*                         Does not touch bag unless UInvQuantity changed.  Deletes item if UInvQuantity would become <= 0. */
		AddToItemPropertyValue : function (BagName, ItemName, ItemPropertyName, Amount) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (!UInv.ReservedBagProperties.includes(ItemName)) {
					if (UInv.BagExists(BagName)) {
						if (UInv.BagHasItem(BagName, ItemName)) {
							if (ItemPropertyName === "UInvDefaultItemType") {
								UInvError('AddToItemPropertyValue cannot be used to modify the value of UInvDefaultItemType. Use SetItemsDefaultType instead.');  /* Error */
								return undefined;
							}
							if (!UInv.isUndefined(Amount)) {
								Amount = tryIntParse(Amount);
								if (UInv.isNumber(Amount)) {
									if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
										var Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
										Value = tryIntParse(Value);
										if (UInv.isNumber(Value)) {
											if (ItemPropertyName === "UInvQuantity") {
												if (Amount === Math.round(Amount)) {
													if (Value + Amount > 0) {
														if ((UInv.ItemHasPocket(BagName, ItemName)) && (Value + Amount > 1)) {
															UInvError('AddToItemPropertyValue failed on item item "' + ItemName + '" in bag "' + BagName + '". Quantity cannot be set above one for items with pockets.');  /* Error */
															return undefined;
														}
														UInv.SetItemQuantity(BagName, ItemName, Value + Amount);
													} else {
														UInv.DeleteItem(BagName, ItemName);
													}
													UInv.SetCurrentItemName(ItemName);
													UInv.SetCurrentBagName(BagName);
													UInv.SetBagTouched(BagName);
													return true;  /* Success */
												} else {
													UInvError('AddToItemPropertyValue failed. Value added to UInvQuantity must be an integer.');  /* Error */
													return undefined;
												}
											} else {
												UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value + Amount);
												UInv.SetCurrentItemName(ItemName);
												UInv.SetCurrentBagName(BagName);
												return true;  /* Success */
											}
										} else {
											UInvError('AddToItemPropertyValue failed. ItemPropertyName "' + ItemPropertyName + '" is not a number.');  /* Error */
											return undefined;
										}
									} else {
										UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Amount);
										UInv.SetCurrentItemName(ItemName);
										UInv.SetCurrentBagName(BagName);
										return false;  /* Success */
									}
								} else {
									UInvError('AddToItemPropertyValue failed. Amount is not a number.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('AddToItemPropertyValue failed. Amount not defined.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('AddToItemPropertyValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddToItemPropertyValue cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('AddToItemPropertyValue failed. ItemName cannot be "' + ItemName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddToItemPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemsMatch: Returns whether all properties exist and match, except UInvQuantity, UInvDefaultItemType, and UInvCell.  Or returns undefined on error. */
		ItemsMatch : function (BagName1, ItemName1, BagName2, ItemName2, PropertyExceptionArray) {
			if (UInv.isString(BagName1) && UInv.isString(ItemName1) && UInv.isString(BagName2) && UInv.isString(ItemName2)) {
				BagName2 = FixBagName(BagName2);
				ItemName2 = FixItemName(ItemName2);
				BagName1 = FixBagName(BagName1);
				ItemName1 = FixItemName(ItemName1);
				if (UInv.BagExists(BagName1)) {
					if (UInv.BagExists(BagName2)) {
						if (UInv.BagHasItem(BagName1, ItemName1)) {
							if (UInv.BagHasItem(BagName2, ItemName2)) {
								var Props1 = [], Props2 = [], i, Value1, Value2;
								UInv.SetCurrentItemName(ItemName1);
								UInv.SetCurrentBagName(BagName1);
								Props1 = UInv.GetItemPropertiesArray(BagName1, ItemName1);
								Props2 = UInv.GetItemPropertiesArray(BagName2, ItemName2);
								Props1.delete("UInvQuantity", "UInvDefaultItemType", "UInvCell");
								Props2.delete("UInvQuantity", "UInvDefaultItemType", "UInvCell");
								if (UInv.isString(PropertyExceptionArray)) {
									PropertyExceptionArray = [ PropertyExceptionArray ];
								}
								if (!UInv.isUndefined(PropertyExceptionArray)) {
									if (UInv.isArrayOfStrings(PropertyExceptionArray)) {
										for (i = 0; i < PropertyExceptionArray.length; i++) {
											Props1.delete(PropertyExceptionArray[i]);
											Props2.delete(PropertyExceptionArray[i]);
										}
									} else {
										UInvError('ItemsMatch failed.  When included, the PropertyExceptionArray must be a string or an array of strings.');  /* Error */
										return undefined;
									}
								}
								Props1 = Props1.sort();
								Props2 = Props2.sort();
								if (UInv.arraysAreEqual(Props1, Props2)) {
									for (i = 0; i < Props1.length; i++) {
										Value1 = UInv.GetItemPropertyValue(BagName1, ItemName1, Props1[i]);
										Value2 = UInv.GetItemPropertyValue(BagName2, ItemName2, Props1[i]);
										if (!UInv.valuesAreEqual(Value1, Value2)) {
											return false;  /* Success */
										}
									}
									return true;  /* Success - all items match */
								} else {
									return false;  /* Success */
								}
							} else {
								UInvError('ItemsMatch cannot find item "' + ItemName2 + '" in bag "' + BagName2 + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('ItemsMatch cannot find item "' + ItemName1 + '" in bag "' + BagName1 + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemsMatch cannot find bag "' + BagName2 + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemsMatch cannot find bag "' + BagName1 + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemsMatch is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetMatchingItemsArray: Returns an array of all items in SearchBag that match ItemName (per the ItemsMatch function), not including excluded property names, or undefined on error. */
		GetMatchingItemsArray : function (BagName, ItemName, SearchBag, PropertyExceptionArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						if (UInv.BagExists(SearchBag)) {
							if (UInv.isString(PropertyExceptionArray)) {
								PropertyExceptionArray = [ PropertyExceptionArray ];
							}
							if (!UInv.isUndefined(PropertyExceptionArray)) {
								if (!UInv.isArrayOfStrings(PropertyExceptionArray)) {
									UInvError('GetMatchingItemsArray failed.  When included, the PropertyExceptionArray must be a string or an array of strings.');  /* Error */
									return undefined;
								}
							}
							var Items = UInv.GetItemsArray(SearchBag), Result = [], i;
							UInv.SetCurrentItemName(ItemName);
							UInv.SetCurrentBagName(BagName);
							for (i = 0; i < Items.length; i++) {
								if (UInv.isUndefined(PropertyExceptionArray)) {
									if (UInv.ItemsMatch(BagName, ItemName, SearchBag, Items[i])) {
										Result.push(Items[i]);
									}
								} else {
									if (UInv.ItemsMatch(BagName, ItemName, SearchBag, Items[i], PropertyExceptionArray)) {
										Result.push(Items[i]);
									}
								}
							}
							return Result;  /* Success */
						} else {
							UInvError('GetMatchingItemsArray cannot find bag "' + SearchBag + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetMatchingItemsArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetMatchingItemsArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetMatchingItemsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* CopyItem: Copy item from source to destination, changing the UInvQuantity if that parameter is used.  Uses UInvMergeItemMethod to determine what happens on item collision. */
		CopyItem : function (SourceBagName, DestinationBagName, ItemName, Quantity, NewItemName) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				ItemName = FixItemName(ItemName);
				if (!UInv.ReservedBagProperties.includes(ItemName)) {
					if (UInv.BagExists(SourceBagName)) {
						if (UInv.BagExists(DestinationBagName)) {
							if (UInv.BagHasItem(SourceBagName, ItemName)) {
								if ((!UInv.isUndefined(NewItemName)) || (SourceBagName !== DestinationBagName)) {
									if (UInv.isUndefined(NewItemName)) {
										NewItemName = ItemName;
									}
									if (UInv.isString(NewItemName)) {
										Quantity = tryIntParse(Quantity);
										if (UInv.isNumber(Quantity)) {
											Quantity = Math.round(Quantity);
											if (Quantity < 1) {
												Quantity = 1;
											}
										} else {
											Quantity = UInv.BagHasItem(SourceBagName, ItemName);
										}
										var Item = UInv.GetItemObject(SourceBagName, ItemName), ItemType = UInv.GetItemsDefaultType(SourceBagName, ItemName), i;
										Item.UInvQuantity = Quantity;
										if (UInv.isProperty(Item, "UInvCell")) {  /* Don't copy UInvCell property */
											delete Item.UInvCell;
										}
										if (UInv.ItemHasPocket(SourceBagName, ItemName)) {
											var PocketBagName, Keys = Object.keys(Item.UInvPocket);
											for (i = 0; i < Keys.length; i++) {  /* Copy pockets */
												PocketBagName = UInv.GetUniqueBagName();
												UInv.CopyBag(Item.UInvPocket[Keys[i]], PocketBagName);
												Item.UInvPocket[Keys[i]] = PocketBagName;
												/* Bag PocketBagName will be pointing to a container that doesn't exist yet.  ContainerName is updated in "case UInv.MERGE_RENAME_SOURCE_ITEMNAME:" if needed. */
												State.variables.UInvBags[PocketBagName].UInvContainer = [ { ContainerBagName : DestinationBagName, ContainerName : NewItemName, PocketName : Keys[i] } ];
											}
											Item.UInvQuantity = 1;  /* Items with pockets don't stack  ***  Make more? */
										}
										if (UInv.isProperty(Item, "UInvVariableType")) {
											/* Search items in DestinationBagName that are of the same type to see if any are equal, and if any are, then just increment the first one's quantity. */
											var ItemList = UInv.GetItemsArrayWherePropertyEquals(DestinationBagName, "UInvDefaultItemType", ItemType);
											if (ItemList.length > 0) {
												for (i = 0; i < ItemList.length; i++) {
													if (UInv.ItemsMatch(SourceBagName, ItemName, DestinationBagName, ItemList[i])) {  /* Allow merge if objects match (not including UInvQuantity and UInvCell). */
														UInv.AddToItemPropertyValue(DestinationBagName, ItemList[i], "UInvQuantity", Quantity);
														UInv.SetCurrentItemName(ItemList[i]);
														UInv.SetCurrentBagName(DestinationBagName);
														UInv.SetBagTouched(DestinationBagName);
														return ItemList[i];  /* Success */
													}
												}
											}
										}
										if (UInv.BagHasItem(DestinationBagName, NewItemName)) {
											var Result = NewItemName, SrcKeys = {}, MergeMethod = State.variables.UInvMergeItemMethod;
											if (UInv.ItemHasPocket(SourceBagName, ItemName)) {
												MergeMethod = UInv.MERGE_RENAME_SOURCE_ITEMNAME;
											} else {
												if (UInv.ItemsMatch(SourceBagName, ItemName, DestinationBagName, NewItemName)) {  /* Allow merge if objects match (not including UInvQuantity and UInvCell). */
													UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Quantity);
													UInv.SetCurrentItemName(NewItemName);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetBagTouched(DestinationBagName);
													return Result;  /* Success */
												}
											}
											if (UInv.isProperty(Item, "UInvVariableType")) {
												/* Variable items use UInv.MERGE_RENAME_SOURCE_ITEMNAME instead of the current merge method. */
												MergeMethod = UInv.MERGE_RENAME_SOURCE_ITEMNAME;
											}
											switch (MergeMethod) {
												case UInv.MERGE_USE_ONLY_SOURCE_PROPERTIES:
													/* Delete the destination's properties, replace with the source's properties and values, and increment the quantity. */
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
													UInv.DeleteItem(DestinationBagName, NewItemName);  /* remove destination item */
													RemoveItemObjectsDefaultProperties(Item, ItemType);
													State.variables.UInvBags[DestinationBagName][NewItemName] = Item;  /* overwrite destination item */
													UInv.SetCurrentItemName(NewItemName);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetBagTouched(DestinationBagName);
													break;  /* Success */
												case UInv.MERGE_PREFER_DESTINATION_PROPERTIES:
													/* Keep the properties, values, and type in the destination, add any properties and values the source had but the destination didn't, and increment the quantity. */
													UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Quantity);
													if (UInv.isProperty(Item, "UInvDefaultItemType")) {
														delete Item.UInvDefaultItemType;
													}
													SrcKeys = Object.keys(Item);
													if (SrcKeys.length > 0) {
														for (i = 0; i < SrcKeys.length; i++) {
															if (UInv.ItemHasProperty(DestinationBagName, NewItemName, SrcKeys[i])) {
																delete Item[SrcKeys[i]];  /* Delete properties from source item that are already on destination item. */
															}
														}
													}
													if (Object.keys(Item).length > 0) {  /* Add remaining keys to destination item */
														Object.assign(State.variables.UInvBags[DestinationBagName][NewItemName], Item);
													}
													UInv.SetCurrentItemName(NewItemName);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetBagTouched(DestinationBagName);
													break;  /* Success */
												case UInv.MERGE_PREFER_SOURCE_PROPERTIES:
													/* Keep the properties and values in the source, add any properties and values the destination had but source the didn't, and increment the quantity. */
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
													/* Delete properties from destination item that are already on source item.  This needs to be done due to default properties. */
													SrcKeys = Object.keys(Item);
													for (i = 0; i < SrcKeys.length; i++) {
														if (UInv.ItemHasProperty(DestinationBagName, NewItemName, SrcKeys[i])) {
															if (UInv.isProperty(State.variables.UInvBags[DestinationBagName][NewItemName], SrcKeys[i])) {
																delete State.variables.UInvBags[DestinationBagName][NewItemName][SrcKeys[i]];
															}
														}
													}
													RemoveItemObjectsDefaultProperties(Item, ItemType);
													if (Object.keys(Item).length > 0) {
														Object.assign(State.variables.UInvBags[DestinationBagName][NewItemName], Item);  /* Add keys to destination item, overwriting existing properties */
													}
													UInv.SetCurrentItemName(NewItemName);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetBagTouched(DestinationBagName);
													break;  /* Success */
												case UInv.MERGE_RENAME_SOURCE_ITEMNAME:
													/* Rename the source's unique identifier so that it's stored separately in the destination bag. */
													if (UInv.isProperty(Item, "UInvPocket")) {
														NewItemName = [];  /* Don't look for matches of items that have pockets. */
													} else {
														NewItemName = UInv.GetMatchingItemsArray(SourceBagName, ItemName, DestinationBagName);  /* Look for matches in destination bag */
														while ((NewItemName.length > 0) && (UInv.ItemHasPocket(DestinationBagName, NewItemName[0]))) {  /* Make sure matches don't have pockets. */
															NewItemName.shift();
														}
													}
													if (NewItemName.length == 0) {  /* If there are no matches, rename item */
														NewItemName = UInv.GetUniqueItemName();
														Item.UInvDefaultItemType = ItemType;
														RemoveItemObjectsDefaultProperties(Item, ItemType);
														if (Item.UInvQuantity === 1) {
															delete Item.UInvQuantity;
														}
														State.variables.UInvBags[DestinationBagName][NewItemName] = Item;  /* Copy item SourceBagName/ItemName as DestinationBagName/NewItemName */
													} else {  /* Increase quantity of matching item */
														NewItemName = NewItemName[0];
														UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Item.UInvQuantity);  /* Increase quantity of existing matching items */
													}
													FixContainerReferences(SourceBagName, ItemName, DestinationBagName, NewItemName);  /* Update pockets' references to match the container's new item name */
													UInv.SetCurrentItemName(NewItemName);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetBagTouched(DestinationBagName);
													Result = NewItemName;
													break;  /* Success */
												case UInv.MERGE_FAIL_WITH_ERROR:  /* Fail with an error. */
													UInvError('CopyItem failed. Item "' + NewItemName + '" already exists in destination bag "' + DestinationBagName + '".');  /* Error */
													Result = undefined;
													break;
												default:  /* UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES - Ignore source properties, just increment destination quantity. (default) */
													UInv.AddToItemPropertyValue(DestinationBagName, NewItemName, "UInvQuantity", Quantity);
													UInv.SetCurrentItemName(NewItemName);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetBagTouched(DestinationBagName);
													/* Success */
											}
											return Result;  /* Success or Error */
										} else {  /* Destination slot is empty, so copy item there. */
											if (ItemType !== "-") {
												RemoveItemObjectsDefaultProperties(Item, ItemType);
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
											return NewItemName;  /* Success */
										}
									} else {
										UInvError('NewItemName passed to CopyItem is not a string.');  /* Error */
										return undefined;
									}
								} else {
									UInvError('CopyItem failed. SourceBagName cannot equal DestinationBagName if NewItemName is not set.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('CopyItem cannot find item "' + ItemName + '" in bag "' + SourceBagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('CopyItem cannot find destination bag "' + DestinationBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('CopyItem cannot find source bag "' + SourceBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CopyItem failed. ItemName cannot be "' + ItemName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CopyItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItem: Move item from source to destination, changing UInvQuantity if that parameter is used.  Use UInvMergeItemMethod to determine what happens on item collision. */
		MoveItem : function (SourceBagName, DestinationBagName, ItemName, Quantity, NewItemName) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				ItemName = FixItemName(ItemName);
				if (!UInv.ReservedBagProperties.includes(ItemName)) {
					if (UInv.BagExists(SourceBagName)) {
						if (UInv.BagExists(DestinationBagName)) {
							if (UInv.BagHasItem(SourceBagName, ItemName)) {
								if (SourceBagName !== DestinationBagName) {
									if (UInv.ItemHasPocket(SourceBagName, ItemName)) {
										if (UInv.ContainerHasPocketBag(SourceBagName, ItemName, DestinationBagName)) {
											UInvError('MoveItem failed. Item cannot be moved inside of itself.');  /* Error */
											return undefined;
										}
									}
									var Count = UInv.BagHasItem(SourceBagName, ItemName);
									Quantity = tryIntParse(Quantity);
									if (UInv.isNumber(Quantity)) {
										Quantity = Math.round(Quantity);
										if (Quantity < 1) {
											Quantity = 1;
										}
										if (Quantity > Count) {
											Quantity = Count;
										}
									} else {
										Quantity = Count;
									}
									if (UInv.isUndefined(NewItemName)) {
										NewItemName = ItemName;
									} else if (UInv.isString(NewItemName)) {
										if (UInv.ReservedBagProperties.includes(NewItemName)) {
											UInvError('MoveItem failed. NewItemName cannot be "' + NewItemName + '".');  /* Error */
											return undefined;
										}
									} else {
										UInvError('NewItemName passed to MoveItem is not a string.');  /* Error */
										return undefined;
									}
									UInv.IncrementUpdateLock();
									var Result;
									if (UInv.ItemHasPocket(SourceBagName, ItemName)) {  /* Move pocketed item */
										if (UInv.BagHasItem(DestinationBagName, NewItemName)) {  /* Rename the item if there's already an item of that name in the destination bag */
											NewItemName = UInv.GetUniqueItemName();
										}
										Result = NewItemName;
										var DefaultType = UInv.GetItemsDefaultType(SourceBagName, ItemName);
										State.variables.UInvBags[DestinationBagName][NewItemName] = State.variables.UInvBags[SourceBagName][ItemName];
										delete State.variables.UInvBags[SourceBagName][ItemName];
										if (NewItemName == DefaultType) {  /* Make sure UInvDefaultItemType is set appropriately */
											if (UInv.isProperty(State.variables.UInvBags[DestinationBagName][NewItemName], "UInvDefaultItemType")) {
												delete State.variables.UInvBags[DestinationBagName][NewItemName].UInvDefaultItemType;
											}
										} else if (DefaultType != "-") {
											State.variables.UInvBags[DestinationBagName][NewItemName].UInvDefaultItemType = DefaultType;
										} else if (UInv.GetDefaultItemObject(DefaultType)) {
											State.variables.UInvBags[DestinationBagName][NewItemName].UInvDefaultItemType = DefaultType;
										} else if (UInv.isProperty(State.variables.UInvBags[DestinationBagName][NewItemName], "UInvDefaultItemType")) {
											delete State.variables.UInvBags[DestinationBagName][NewItemName].UInvDefaultItemType;
										}
										var Pockets = Object.keys(State.variables.UInvBags[DestinationBagName][NewItemName].UInvPocket), PocketBag, Container, i, j;
										for (i = 0; i < Pockets.length; i++) {  /* Update all pockets to refer to the new container location and name */
											PocketBag = State.variables.UInvBags[DestinationBagName][NewItemName].UInvPocket[Pockets[i]];
											Container = State.variables.UInvBags[PocketBag].UInvContainer;
											for (j = 0; j < Container.length; j++) {
												if ((Container[j].ContainerBagName == SourceBagName) && (Container[j].ContainerName == ItemName) && (Container[j].PocketName == Pockets[i])) {
													Container[j].ContainerBagName = DestinationBagName;
													Container[j].ContainerName = NewItemName;
												}
											}
										}
										UInv.SetBagTouched(DestinationBagName);
									} else {
										Result = UInv.CopyItem(SourceBagName, DestinationBagName, ItemName, Quantity, NewItemName);  /* Deals with possible item collisions */
										if (Quantity >= UInv.BagHasItem(SourceBagName, ItemName)) {
											UInv.DeleteItem(SourceBagName, ItemName);
										} else {
											UInv.AddToItemPropertyValue(SourceBagName, ItemName, "UInvQuantity", -Quantity);
										}
									}
									UInv.DecrementUpdateLock();
									UInv.SetCurrentItemName(NewItemName);
									UInv.SetCurrentBagName(DestinationBagName);
									return Result;  /* Success or Error  *** */
								} else {
									UInvError('MoveItem failed. SourceBagName cannot equal DestinationBagName.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('MoveItem cannot find item "' + ItemName + '" in bag "' + SourceBagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveItem cannot find destination bag "' + DestinationBagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItem cannot find source bag "' + SourceBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItem failed. ItemName cannot be "' + ItemName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* RenameItem: Renames an item.  Optional Quantity parameter if you want to rename partial stacks, defaults to all items. */
		RenameItem : function (BagName, CurrentItemName, NewItemName, Quantity) {
			if (UInv.isString(BagName) && UInv.isString(CurrentItemName) && UInv.isString(NewItemName)) {
				BagName = FixBagName(BagName);
				CurrentItemName = FixItemName(CurrentItemName);
				NewItemName = FixItemName(NewItemName);
				if ((!UInv.ReservedBagProperties.includes(CurrentItemName)) && (!UInv.ReservedBagProperties.includes(NewItemName))) {
					if (UInv.BagExists(BagName)) {
						if (UInv.BagHasItem(BagName, CurrentItemName)) {
							if (CurrentItemName === NewItemName) {
								return true;  /* Success - item already has that name */
							} else if (UInv.BagHasItem(BagName, NewItemName) && (State.variables.UInvMergeItemMethod === UInv.MERGE_FAIL_WITH_ERROR)) {
								UInvError('RenameItem failed. Item name "' + NewItemName + '" already exists in bag "' + BagName + '".');  /* Error */
								return undefined;
							} else {
								Quantity = tryIntParse(Quantity);
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
								var Result;
								if (UInv.ItemHasPocket(BagName, CurrentItemName)) {  /* Rename pocketed item */
									var DefaultType = UInv.GetItemsDefaultType(BagName, CurrentItemName);
									State.variables.UInvBags[BagName][NewItemName] = State.variables.UInvBags[BagName][CurrentItemName];
									delete State.variables.UInvBags[BagName][CurrentItemName];
									if (NewItemName == DefaultType) {  /* Make sure UInvDefaultItemType is set appropriately */
										if (UInv.isProperty(State.variables.UInvBags[BagName][NewItemName], "UInvDefaultItemType")) {
											delete State.variables.UInvBags[BagName][NewItemName].UInvDefaultItemType;
										}
									} else if (DefaultType != "-") {
										State.variables.UInvBags[BagName][NewItemName].UInvDefaultItemType = DefaultType;
									} else if (UInv.GetDefaultItemObject(DefaultType)) {
										State.variables.UInvBags[BagName][NewItemName].UInvDefaultItemType = DefaultType;
									} else if (UInv.isProperty(State.variables.UInvBags[BagName][NewItemName], "UInvDefaultItemType")) {
										delete State.variables.UInvBags[BagName][NewItemName].UInvDefaultItemType;
									}
									var Pockets = Object.keys(State.variables.UInvBags[BagName][NewItemName].UInvPocket), PocketBag, Container, i, j;
									for (i = 0; i < Pockets.length; i++) {  /* Update all pockets to refer to the new container name */
										PocketBag = State.variables.UInvBags[BagName][NewItemName].UInvPocket[Pockets[i]];
										Container = State.variables.UInvBags[PocketBag].UInvContainer;
										for (j = 0; j < Container.length; j++) {
											if ((Container[j].ContainerBagName == BagName) && (Container[j].ContainerName == CurrentItemName) && (Container[j].PocketName == Pockets[i])) {
												Container[j].ContainerName = NewItemName;
											}
										}
									}
									Result = NewItemName;
								} else {
									Result = UInv.CopyItem(BagName, BagName, CurrentItemName, Quantity, NewItemName);
									if (Result) {
										UInv.AddToItemPropertyValue(BagName, CurrentItemName, "UInvQuantity", -Quantity);
										UInv.SetCurrentItemName(Result);
										UInv.SetCurrentBagName(BagName);
									}
								}
								return Result;  /* Success */
							}
						} else {
							UInvError('RenameItem cannot find item "' + CurrentItemName + '" in bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('RenameItem cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('RenameItem failed. Item names cannot be "UInvTouched", "UInvProperties", "UInvDefaultBagType", or "UInvContainer".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to RenameItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetDefaultItemPropertyValue: Returns the default value for item's property, null if property or item isn't found, or undefined if there is an error. */
		GetDefaultItemPropertyValue : function (DefaultItemName, ItemPropertyName) {
			if (UInv.isString(DefaultItemName) && UInv.isString(ItemPropertyName)) {
				var DefItem = UInv.GetDefaultItemObject(DefaultItemName);
				if (DefItem) {
					if (UInv.isProperty(DefItem, ItemPropertyName)) {
						return DefItem[ItemPropertyName];  /* Success */
					} else {
						return null;  /* Success - item not found */
					}
				} else {
					return null;  /* Success - item not found */
				}
			} else {
				UInvError('Name passed to GetDefaultItemPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsAndQuantitiesObject: Returns an object of items and quantities in a bag in the format { item1: quantity1, item2: quantity2, etc... }, or undefined on error. */
		GetItemsAndQuantitiesObject : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName), Result = {}, i = 0;
					for (i = 0; i < Items.length; i++) {
						Result[Items[i]] = UInv.BagHasItem(BagName, Items[i]);
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsAndQuantitiesObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemsAndQuantitiesObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCount: Returns the number of unique items in a bag (not including UInvTouched, UInvProperties, UInvDefaultBagType, or UInvContainer). */
		GetItemCount : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					return UInv.GetItemsArray(BagName).length;  /* Success */
				} else {
					UInvError('GetItemCount cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var i = 0, Items = [];
					for (i = 0; i < BagName.length; i++) {
						Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
					}
					return Items.length;  /* Success */
				} else {
					UInvError('GetItemCount failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCount is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountFull: Returns the total number of items in a bag, adding up the UInvQuantity value of each item (not including UInvTouched, UInvProperties, and UInvDefaultBagType). */
		GetItemCountFull : function (BagName) {
			var Tot = 0, i = 0;
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName);
					if (Items.length > 0) {
						for (i = 0; i < Items.length; i++) {
							Tot += UInv.BagHasItem(BagName, Items[i]);
						}
					}
					return Tot;  /* Success */
				} else {
					UInvError('GetItemCountFull cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					for (i = 0; i < BagName.length; i++) {
						Tot += UInv.GetItemCountFull(BagName[i]);
					}
					return Tot;  /* Success */
				} else {
					UInvError('GetItemCountFull failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCountFull is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountByDefaultType: Returns the number of unique item types in each bag (ignores Quantity), items with a default item type of "-" are each counted as separate unique item types. */
		GetItemCountByDefaultType : function (BagName, IgnoreTypes) {
			var Tot = 0, i = 0;
			if (UInv.isString(BagName)) {
				if (UInv.isUndefined(IgnoreTypes)) {
					IgnoreTypes = [];
				}
				BagName = FixBagName(BagName);
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
					return Tot;  /* Success */
				} else {
					UInvError('GetItemCountByDefaultType cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					var Ign = [];
					for (i = 0; i < BagName.length; i++) {
						Tot += UInv.GetItemCountByDefaultType(BagName[i], Ign);
					}
					return Tot;  /* Success */
				} else {
					UInvError('GetItemCountByDefaultType failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCountByDefaultType is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountFullByDefaultType: Returns the total number of items in bag(s) (Quantity included) of that DefaultItemType. */
		GetItemCountFullByDefaultType : function (BagName, DefaultItemType) {
			if (UInv.isString(DefaultItemType)) {
				var Tot = 0, i = 0;
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
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
						return Tot;  /* Success */
					} else {
						UInvError('GetItemCountFullByDefaultType cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						for (i = 0; i < BagName.length; i++) {
							Tot += UInv.GetItemCountFullByDefaultType(BagName[i], DefaultItemType);
						}
						return Tot;  /* Success */
					} else {
						UInvError('GetItemCountFullByDefaultType failed. Invalid bag name in array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to GetItemCountFullByDefaultType is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('DefaultItemType passed to GetItemCountFullByDefaultType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayByType: Returns an array of all ItemNames in a bag that are of type ItemType. */
		GetItemsArrayByType : function (BagName, ItemType) {
			if (UInv.isString(BagName) && UInv.isString(ItemType)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName), Result = [], i;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.GetItemPropertyValue(BagName, Items[i], "UInvDefaultItemType") == ItemType) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayByType cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayByType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountWherePropertyEquals: Gets the numer of items in a bag which have a particular property value. */
		GetItemCountWherePropertyEquals : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						UInv.SetCurrentBagName(BagName);
						return UInv.GetItemsArrayWherePropertyEquals(BagName, ItemPropertyName, Value).length;  /* Success */
					} else {
						UInvError('GetItemCountWherePropertyEquals failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountWherePropertyEquals cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						var i = 0, Items = [];
						for (i = 0; i < BagName.length; i++) {
							Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
						}
						return Items.length;  /* Success */
					} else {
						UInvError('GetItemCountWherePropertyEquals failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountWherePropertyEquals failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCountWherePropertyEquals is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWherePropertyGreaterThan: Returns an array of all items in a bag where ItemPropertyName > Value. */
		GetItemsArrayWherePropertyGreaterThan : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (arguments.length >= 3) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), Result = [], i = 0;
						UInv.SetCurrentBagName(BagName);
						for (i = 0; i < Items.length; i++) {
							if (UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName) > Value) {
								Result.push(Items[i]);
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('GetItemsArrayWherePropertyGreaterThan cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArrayWherePropertyGreaterThan failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWherePropertyGreaterThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountWherePropertyGreaterThan: Gets the numer of items in a bag which have a particular property value greater than Value. */
		GetItemCountWherePropertyGreaterThan : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						UInv.SetCurrentBagName(BagName);
						return UInv.GetItemsArrayWherePropertyGreaterThan(BagName, ItemPropertyName, Value).length;  /* Success */
					} else {
						UInvError('GetItemCountWherePropertyGreaterThan failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountWherePropertyGreaterThan cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						var i = 0, Items = [];
						for (i = 0; i < BagName.length; i++) {
							Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
						}
						return Items.length;  /* Success */
					} else {
						UInvError('GetItemCountWherePropertyGreaterThan failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountWherePropertyGreaterThan failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCountWherePropertyGreaterThan is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWherePropertyLessThan: Returns an array of all items in a bag where ItemPropertyName > Value. */
		GetItemsArrayWherePropertyLessThan : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (arguments.length >= 3) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), Result = [], i = 0;
						UInv.SetCurrentBagName(BagName);
						for (i = 0; i < Items.length; i++) {
							if (UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName) < Value) {
								Result.push(Items[i]);
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('GetItemsArrayWherePropertyLessThan cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArrayWherePropertyLessThan failed. Value parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWherePropertyLessThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountWherePropertyLessThan: Gets the numer of items in a bag which have a particular property value less than Value. */
		GetItemCountWherePropertyLessThan : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						UInv.SetCurrentBagName(BagName);
						return UInv.GetItemsArrayWherePropertyLessThan(BagName, ItemPropertyName, Value).length;  /* Success */
					} else {
						UInvError('GetItemCountWherePropertyLessThan failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountWherePropertyLessThan cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						var i = 0, Items = [];
						for (i = 0; i < BagName.length; i++) {
							Items = Items.concatUnique(UInv.GetItemsArray(BagName[i]));
						}
						return Items.length;  /* Success */
					} else {
						UInvError('GetItemCountWherePropertyLessThan failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountWherePropertyLessThan failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCountWherePropertyLessThan is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetUniqueItemPropertyValuesArray: Returns an array of unique (string, number, and boolean) values for all items with ItemPropertyName in all bags in BagName/Array, or undefined on error. */
		/*                                   (use GetUniqueItemTagsArray instead for properties which have array values) */
		GetUniqueItemPropertyValuesArray : function (BagName, ItemPropertyName) {
			var i = 0, Items = [];
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
					return [].concatUnique(Result);  /* Success */
				} else {
					UInvError('GetUniqueItemPropertyValuesArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					for (i = 0; i < BagName.length; i++) {
						Items = Items.concatUnique(UInv.GetUniqueItemPropertyValuesArray(BagName[i], ItemPropertyName));
					}
					return Items;  /* Success */
				} else {
					UInvError('GetUniqueItemPropertyValuesArray failed. Invalid bag name in array.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetUniqueItemPropertyValuesArray is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAnyItem: Returns t/f based on whether the bag has any of the items in the bag, or undefined if there is an error. */
		BagHasAnyItem: function (BagName, ItemArray) {
			var i = 0;
			if (UInv.isString(BagName)) {
				if (UInv.isArrayOfStrings(ItemArray)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						UInv.SetCurrentBagName(BagName);
						for (i = 0; i < ItemArray.length; i++) {
							if (UInv.BagHasItem(BagName, ItemArray[i])) {
								return true;  /* Success - found an item in the bag */
							}
						}
						return false;  /* Success - no items found */
					} else {
						UInvError('BagHasAnyItem cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					if (UInv.isArray(ItemArray) && (ItemArray.length === 0)) {
						return false;  /* Empty array; Success */
					}
					UInvError('ItemArray passed to BagHasAnyItem is not an array of strings.');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.BagExists(BagName)) {
					for (i = 0; i < BagName.length; i++) {
						if (UInv.BagHasAnyItem(BagName[i], ItemArray)) {
							return true;  /* Success - found an item in one of the bags */
						}
					}
					return false;  /* Success - no items found */
				} else {
					UInvError('BagHasAnyItem failed. Invalid bag name in BagName array.');  /* Error */
					return undefined;
				}
			} else {
				if (UInv.isArray(BagName) && (BagName.length === 0)) {
					return false;  /* Empty array; Success */
				}
				UInvError('BagName passed to BagHasAnyItem is not a string or array of strings.');  /* Error */
				return undefined;
			}
		},

		/* AddToAllItemsPropertyValue: Adds an amount to a property's value for all of a bag's items which have the property (returns true), or undefined on error. */
		/*                             Does not touch bag unless UInvQuantity changed.  Deletes item if UInvQuantity would become <= 0. */
		AddToAllItemsPropertyValue : function (BagName, ItemPropertyName, Amount) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (ItemPropertyName === "UInvDefaultItemType") {
						UInvError('AddToAllItemsPropertyValue cannot be used to modify the value of UInvDefaultItemType. Use SetItemsDefaultType instead.');  /* Error */
						return undefined;
					}
					if (!UInv.isUndefined(Amount)) {
						Amount = tryIntParse(Amount);
						if (UInv.isNumber(Amount)) {
							if ((ItemPropertyName === "UInvQuantity") && (Amount !== Math.round(Amount))) {
								UInvError('AddToAllItemsPropertyValue failed. Value added to UInvQuantity must be an integer.');  /* Error */
								return undefined;
							} else {
								Amount = Math.round(Amount);
							}
							var Items = UInv.GetItemsArray(BagName), i;
							if ((ItemPropertyName === "UInvQuantity") && (UInv.GetAllBagPockets().length > 1)) {
								UInvError('AddToAllItemsPropertyValue failed. Items with pockets cannot have their quantity increased.');  /* Error */
								return undefined;
							}
							/* pre-error check here *** */
							for (i = 0; i < Items.length; i++) {
								UInv.AddToItemPropertyValue(BagName, Items[i], ItemPropertyName, Amount);
							}
							UInv.SetCurrentBagName(BagName);
							return true;  /* Success */
						} else {
							UInvError('AddToAllItemsPropertyValue failed. Amount is not a number.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddToAllItemsPropertyValue failed. Amount not defined.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('AddToAllItemsPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddToAllItemsPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddItem: Adds item to bag, returns true if successful.  Quantity defaults to 1.  Use UInvMergeItemMethod to determine what happens on item collision. */
		AddItem : function (BagName, ItemType, Quantity, NewItemName, StartDepth, CurrentDepth) {
			if (UInv.isString(BagName) && UInv.isString(ItemType)) {
				BagName = FixBagName(BagName);
				if (!UInv.isUndefined(ValidateItemName(ItemType))) {
					ItemType = FixItemName(ItemType);
					if (UInv.isUndefined(Quantity)) {
						Quantity = 1;
					} else {
						Quantity = tryIntParse(Quantity);
						if (!UInv.isNumber(Quantity)) {
							UInvError('Quantity passed to AddItem is not a number.');  /* Error */
							return undefined;
						}
					}
					if ((Quantity !== Math.round(Quantity)) || (Quantity <= 0)) {
						UInvError('Quantity passed to AddItem must be a positive integer.');  /* Error */
						return undefined;
					}
					if (UInv.BagExists(BagName)) {
						if (UInv.isUndefined(StartDepth)) {
							StartDepth = UInv.GetPocketDepth(BagName);
						}
						if (UInv.isUndefined(CurrentDepth)) {
							CurrentDepth = StartDepth;
						}
						var Item = UInv.GetDefaultItemObject(ItemType), TempBag = "", Result;
						if (Item) {
							if (UInv.isProperty(Item, "UInvPocket")) {
								Quantity = 1;  /* Items with pockets don't stack  ***  Make more? */
							}
							Item.UInvQuantity = Quantity;
							if (UInv.isProperty(Item, "UInvVariableType")) {
								Item.UInvDefaultItemType = ItemType;
							}
							if (UInv.isUndefined(NewItemName)) {
								NewItemName = ItemType;
							} else if (UInv.isString(NewItemName)) {
								NewItemName = FixItemName(NewItemName);
								if (UInv.isUndefined(NewItemName)) {
									return undefined;  /* Error */
								}
							} else {
								UInvError('AddItem failed. NewItemName is not a string.');  /* Error */
								return undefined;
							}
							UInv.IncrementUpdateLock();  /* Prevent unnecessary updates */
							TempBag = UInv.GetUniqueBagName();
							UInv.CreateBag(TempBag);
							if (Item.UInvQuantity === 1) {
								delete Item.UInvQuantity;
							}
							State.variables.UInvBags[TempBag][ItemType] = Item;
							if (UInv.isProperty(Item, "UInvPocket")) {  /* Create actual pockets on item */
								var Pockets = Item.UInvPocket, Keys = Object.keys(Pockets), i;
								var NotVarType = !UInv.isProperty(State.variables.UInvBags[TempBag][ItemType], "UInvVariableType");
								if (NotVarType) {
									State.variables.UInvBags[TempBag][ItemType].UInvVariableType = "x";  /* Temporarily make it a variable type so default pockets don't show for GetItemObject */
								}
								delete State.variables.UInvBags[TempBag][ItemType].UInvPocket;
								for (i = 0; i < Keys.length; i++) {
									if (["-", ""].includes(Pockets[Keys[i]])) {
										UInv.CreatePocket(TempBag, ItemType, Keys[i]);
									} else if (!UInv.AddPocket(TempBag, ItemType, Keys[i], Pockets[Keys[i]], StartDepth, CurrentDepth)) {
										if (UInv.isProperty(State.variables.UInvBags[TempBag][ItemType], "UInvPocket")) {
											delete State.variables.UInvBags[TempBag][ItemType].UInvPocket;
										}
										UInv.DeleteBag(TempBag);
										UInv.DecrementUpdateLock();
										UInvError('AddItem failed. ItemType "' + ItemType + '" has an invalid bag/pocket type of "' + Pockets[Keys[i]] + '".');  /* Error */
										return undefined;
									}
								}
								if (NotVarType) {
									delete State.variables.UInvBags[TempBag][ItemType].UInvVariableType;  /* Make it not a variable type, the way it should be */
								}
							}
							Result = UInv.MoveItem(TempBag, BagName, ItemType, Quantity, NewItemName);  /* Deals with possible item collisions */
							UInv.DeleteBag(TempBag);
							RemoveItemObjectsDefaultProperties(State.variables.UInvBags[BagName][Result], ItemType);
							UInv.SetCurrentBagName(BagName);
							UInv.SetCurrentItemName(ItemType);
							UInv.DecrementUpdateLock();
							return Result;  /* Success */
						} else {
							UInvError('AddItem failed. ItemType "' + ItemType + '" is not a default item.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddItem cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('AddItem failed. ItemType cannot be "' + ItemType + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddItems: Adds an array of items to bag (Quantity = 1 for each), returns true if all items are successfully added. */
		AddItems : function (BagName, ItemArray) {
			if (UInv.isString(BagName)) {
				if (UInv.isArrayOfStrings(ItemArray)) {
					var Result = [], Ret, i;
					BagName = FixBagName(BagName);
					if (ItemArray.length > 0) {
						for (i = 0; i < ItemArray.length; i++) {
							Ret = UInv.AddItem(BagName, ItemArray[i]);
							if (Ret === undefined) {
								Result = undefined;
							} else if (!UInv.isBoolean(Result)) {
								Result.push(Ret);
							}
						}
						return Result;  /* Success or Error  *** */
					} else {
						UInvError('ItemArray passed to AddItems is empty.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemArray passed to AddItems is not an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to AddItems is not a string.');  /* Error */
				return undefined;
			}
		},

		/* CreateItem: Creates an item without linking to a DefaultItemObject.  Quantity defaults to 1. */
		CreateItem : function (BagName, ItemName, Quantity) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				if (!UInv.isUndefined(ValidateItemName(ItemName))) {
					ItemName = FixItemName(ItemName);
					if (UInv.BagExists(BagName)) {
						if (UInv.BagHasItem(BagName, ItemName)) {
							UInvError('CreateItem failed. Item "' + ItemName + '" already exists in bag "' + BagName + '".');  /* Error */
							return undefined;
						} else {
							if (UInv.isUndefined(Quantity)) {
								Quantity = 1;
							} else {
								Quantity = tryIntParse(Quantity);
								if (!UInv.isNumber(Quantity)) {
									UInvError('Quantity passed to CreateItem is not a number.');  /* Error */
									return undefined;
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
								return ItemName;  /* Success */
							} else {
								UInvError('Quantity passed to CreateItem must be a positive integer.');  /* Error */
								return undefined;
							}
						}
					} else {
						UInvError('CreateItem cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CreateItem failed. ItemName "' + ItemName + '" is not an allowed item name.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CreateItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPropertyCount: Returns the number of ItemName's item properties from BagName (including UInvQuantity and UInvDefaultItemType), or undefined if there is an error. */
		GetItemPropertyCount : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						return Object.keys(UInv.GetItemObject(BagName, ItemName)).length;  /* Success */
					} else {
						UInvError('GetItemPropertyCount cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemPropertyCount cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemPropertyCount is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetItemsPropertyValue: Set the value of ItemPropertyName to Value for all items in BagName. */
		SetItemsPropertyValue : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (UInv.BagExists(BagName)) {
					if (arguments.length >= 3) {
						var Items = UInv.GetItemsArray(BagName);
						if (Items.length > 0) {
							var i = 0;
							for (i = 0; i < Items.length; i++) {
								UInv.SetItemPropertyValue(BagName, Items[i], ItemPropertyName, Value);
							}
						}
						return true;  /* Success */
					} else {
						UInvError('SetItemsPropertyValue failed. Value parameter is missing.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName "' + BagName + '" passed to SetItemsPropertyValue does not exist.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetItemsPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetItemPropertyValues: Sets multiple property values on an item, creating those properties if they don't already exist. */
		SetItemPropertyValues : function (BagName, ItemName, ValuesObject) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						if (UInv.isGenericObject(ValuesObject)) {
							var Props = Object.keys(ValuesObject), Result = true;
							if (Props.length > 0) {
								var i = 0;
								for (i = 0; i < Props.length; i++) {
									/* Do some checking to make sure values are valid first  *** */
									if (UInv.SetItemPropertyValue(BagName, ItemName, Props[i], ValuesObject[Props[i]]) === undefined) {
										Result = undefined;
									}
								}
							}
							UInv.SetCurrentItemName(ItemName);
							UInv.SetCurrentBagName(BagName);
							return Result;  /* Success or Error  *** */
						} else {
							UInvError('ValuesObject passed to SetItemPropertyValues is not a generic object.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SetItemPropertyValues cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName "' + BagName + '" passed to SetItemPropertyValues does not exist.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetItemPropertyValues is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemPropertyHasValue: Returns true if item's property ===/contains Value, false if it doesn't, otherwise return undefined on error. */
		ItemPropertyHasValue : function (BagName, ItemName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentItemName(ItemName);
						UInv.SetCurrentBagName(BagName);
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							if (arguments.length >= 4) {
								var Val = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
								if (typeof(Val) === typeof(Value)) {
									return UInv.valuesAreEqual(Val, Value);  /* Success */
								} else if (UInv.isArray(Val)) {
									return Val.includes(Value);  /* Success */
								} else {
									return false;  /* Success */
								}
							} else {
								UInvError('ItemPropertyHasValue failed. Value parameter is missing.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('ItemPropertyHasValue cannot find property "' + ItemPropertyName + '" in item "' + ItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemPropertyHasValue cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemPropertyHasValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemPropertyHasValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* CopyItemsByProperty: Copy all items from SourceBagName to DestinationBagName that have the ItemPropertyName, or ItemPropertyName === Value if Value is passed. */
		CopyItemsByProperty : function (SourceBagName, DestinationBagName, ItemPropertyName, Value) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (SourceBagName !== DestinationBagName) {
							if (arguments.length >= 4) {
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
										if (Ret === undefined) {
											Result = undefined;
										} else if (!UInv.isBoolean(Result)) {
											Result.push(Ret);
										}
									}
								}
								return Result;  /* Success or Error  *** */
							} else {
								UInvError('CopyItemsByProperty failed. Value parameter is missing.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('CopyItemsByProperty failed. Source and destination bags cannot be the same.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('CopyItemsByProperty cannot find bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CopyItemsByProperty cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CopyItemsByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteItemsByProperty: Delete all items from BagName that have the ItemProperty, or ItemProperty === Value if Value is passed. */
		DeleteItemsByProperty : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = [];
					if (arguments.length >= 3) {
						Items = UInv.GetItemsArrayWherePropertyEquals(BagName, ItemPropertyName, Value);
					} else {
						Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
					}
					return UInv.DeleteItem(BagName, Items);  /* Success */
				} else {
					UInvError('DeleteItemsByProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeleteItemsByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemWithHighestPropertyValue: Returns the ItemName with the highest value of ItemPropertyName in BagName (items without ItemPropertyName are ignored), */
		/*                                  randomly picks one of the highest if multiple items are tied for highest, "" if none found, or undefined on error. */
		GetItemWithHighestPropertyValue : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
						return HiItems.random();  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetItemWithHighestPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemWithHighestPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemWithLowestPropertyValue: Returns the ItemName with the lowest value of ItemPropertyName in BagName (items without ItemPropertyName are ignored), */
		/*                                 randomly picks one of the lowest if multiple items are tied for lowest, "" if none found, or undefined on error. */
		GetItemWithLowestPropertyValue : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
						return LoItems.random();  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetItemWithLowestPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemWithLowestPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRandomItemPropertyValue: Returns the value of ItemPropertyName for a random item in BagName (items without ItemPropertyName are ignored), "" if none found, or undefined on error. */
		GetRandomItemPropertyValue : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
					if (Items.length > 0) {
						return UInv.GetItemPropertyValue(BagName, Items.random(), ItemPropertyName);  /* Success */
					} else {
						return "";  /* Success - Not found */
					}
				} else {
					UInvError('GetRandomItemPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetRandomItemPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetTotalItemPropertyValue: Returns the total of all items' ItemPropertyName values (multiplied by UInvQuantity) added together */
		/*                            (all values must be numbers; items without ItemPropertyName are treated as having a value of zero) */
		GetTotalItemPropertyValue : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName), i = 0, Value = 0, Result = 0;
					if (Items.length > 0) {
						for (i = 1; i < Items.length; i++) {
							if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
								Value = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
								if (UInv.isNumber(Value)) {
									Result += (Value * UInv.BagHasItem(BagName, Items[i]));
								} else {
									UInvError('GetTotalItemPropertyValue failed. All values of ItemPropertyName must be numbers. ("' + Items[i] + '.' + ItemPropertyName + '" is type ' + (typeof Value)  + ')');  /* Error */
									return undefined;
								}
							}
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetTotalItemPropertyValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetTotalItemPropertyValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteItemProperty: Deletes item property ItemPropertyName.  If ItemPropertyName is not passed, then delete all properties on ItemName, except UInvQuantity, and set UInvDefaultItemType to "-". */
		/*                     Cannot delete UInvQuantity, UInvDefaultItemType, or UInvPocket.  Returns true if successful, otherwise false. */
		DeleteItemProperty : function (BagName, ItemName, ItemPropertyName) {
			if (UInv.isString(ItemName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					ItemName = FixItemName(ItemName);
					if (UInv.BagExists(BagName)) {
						var Quantity = UInv.BagHasItem(BagName, ItemName), Item;
						if (Quantity) {
							if (UInv.isString(ItemPropertyName)) {
								UInv.SetCurrentItemName(ItemName);
								UInv.SetCurrentBagName(BagName);
								if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
									if (UInv.ReservedItemProperties.includes(ItemPropertyName)) {
										UInvError('DeleteItemProperty cannot delete property "' + ItemPropertyName + '". This is a protected property.');  /* Error */
										return undefined;
									}
									if (!UInv.isProperty(State.variables.UInvBags[BagName][ItemName], ItemPropertyName)) {  /* Change item type to "-" so it can remove default properties */
										UInv.SetItemsDefaultType(BagName, ItemName, "-");
									}
									delete State.variables.UInvBags[BagName][ItemName][ItemPropertyName];
									return true;  /* Success */
								} else {
									return true;  /* Success - property already doesn't exist */
								}
							} else if (UInv.isUndefined(ItemPropertyName)) {
								/* Delete all properties except ReservedItemProperties */
								Item = {};
								if (Quantity > 1) {
									Item.UInvQuantity = Quantity;
								}
								if (UInv.GetDefaultItemObject(ItemName)) {
									Item.UInvDefaultItemType = "-";
								}
								if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvPocket")) {
									Item.UInvPocket = State.variables.UInvBags[BagName][ItemName].UInvPocket;
								}
								if (UInv.isProperty(State.variables.UInvBags[BagName][ItemName], "UInvCell")) {
									Item.UInvCell = State.variables.UInvBags[BagName][ItemName].UInvCell;
								}
								State.variables.UInvBags[BagName][ItemName] = Item;
								return true;  /* Success */
							} else {
								UInvError('ItemPropertyName passed to DeleteItemProperty is not a string.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('DeleteItemProperty cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('DeleteItemProperty cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var i = 0, Result = true;
						for (i = 0; i < BagName.length; i++) {
							if (!UInv.DeleteItemProperty(BagName[i], ItemName, ItemPropertyName)) {  /* handle errors here better?  *** */
								Result = undefined;
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('DeleteItemProperty failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('DeleteItemProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('ItemName passed to DeleteItemProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItemsByProperty: Move all items from SourceBagName to DestinationBagName that have the ItemPropertyName, or ItemPropertyName === Value if Value is passed. */
		MoveItemsByProperty : function (SourceBagName, DestinationBagName, ItemPropertyName, Value) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (SourceBagName !== DestinationBagName) {
							if (arguments.length >= 4) {
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
										if (UInv.isUndefined(Ret) || UInv.isUndefined(Result)) {
											Result = undefined;
										} else {
											if (UInv.isBoolean(Result)) {
												Result = [ Ret ];
											} else {
												Result.push(Ret);
											}
										}
									}
								}
								return Result;  /* Success or Error  *** */
							} else {
								UInvError('MoveItemsByProperty failed. Value parameter is missing.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveItemsByProperty failed. Source and destination bags cannot be the same.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItemsByProperty cannot find bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItemsByProperty cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItemsByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* RenameItemProperty: Renames item property.  Returns true if it succeeds.  Bag is not touched. */
		RenameItemProperty : function (BagName, ItemName, CurrentItemPropertyName, NewItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(CurrentItemPropertyName) && UInv.isString(NewItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (!UInv.ReservedBagProperties.includes(ItemName)) {
					if ((CurrentItemPropertyName !== "UInvQuantity") && (NewItemPropertyName !== "UInvQuantity")) {
						if (UInv.BagExists(BagName)) {
							if (UInv.BagHasItem(BagName, ItemName)) {
								if (UInv.ItemHasProperty(BagName, ItemName, CurrentItemPropertyName)) {
									if (UInv.ItemHasProperty(BagName, ItemName, NewItemPropertyName)) {
										UInvError('RenameItemProperty failed. Property "' + NewItemPropertyName + '" already exists on item "' + ItemName + '".');  /* Error */
										return undefined;
									} else if (CurrentItemPropertyName === NewItemPropertyName) {
										UInvError('RenameItemProperty failed. CurrentItemPropertyName cannot be the same as NewItemPropertyName.');  /* Error */
										return undefined;
									} else {
										UInv.SetCurrentItemName(ItemName);
										UInv.SetCurrentBagName(BagName);
										Object.defineProperty(State.variables.UInvBags[BagName][ItemName], NewItemPropertyName, Object.getOwnPropertyDescriptor(State.variables.UInvBags[BagName][ItemName], CurrentItemPropertyName));
										delete State.variables.UInvBags[BagName][ItemName][CurrentItemPropertyName];
										return true;  /* Success */
									}
								} else {
									UInvError('RenameItemProperty cannot find property "' + CurrentItemPropertyName + '" in item "' + ItemName + '".');  /* Error */
									return undefined;
								}
							} else {
								UInvError('RenameItemProperty cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('RenameItemProperty cannot find bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('RenameItemProperty failed. ItemPropertyName cannot be "UInvQuantity".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('RenameItemProperty failed. ItemName cannot be "' + ItemName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to RenameItemProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetObjectOfItemPropertyValues: Returns an object in the format { ItemName : Value, ... } for each item in bag that has a property of ItemPropertyName. */
		GetObjectOfItemPropertyValues : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName), ItemValues = {}, i = 0;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							ItemValues[Items[i]] = UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName);
						}
					}
					return ItemValues;  /* Success */
				} else {
					UInvError('GetObjectOfItemPropertyValues cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetObjectOfItemPropertyValues is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetAllPropertyValues: Returns an array of all unique values of the items' ItemPropertyName in a bag. */
		GetAllPropertyValues : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName), Values = [], i = 0;
					UInv.SetCurrentBagName(BagName);
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasProperty(BagName, Items[i], ItemPropertyName)) {
							Values.pushUnique(UInv.GetItemPropertyValue(BagName, Items[i], ItemPropertyName));
						}
					}
					return Values;  /* Success */
				} else {
					UInvError('GetAllPropertyValues cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetAllPropertyValues is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemByProperty: Returns a random item from a bag that has property ItemPropertyName.  Sets that item as the current item. */
		GetItemByProperty : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayByProperty(BagName, ItemPropertyName);
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						var Rnd = random(Items.length - 1);
						UInv.SetCurrentItemName(Items[Rnd]);
						return Items[Rnd];  /* Success */
					} else {
						return "";  /* Success */
					}
				} else {
					UInvError('GetItemByProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemByType: Returns a random ItemName from a bag that is of type ItemType.  Sets that item as the current item. */
		GetItemByType : function (BagName, ItemType) {
			if (UInv.isString(BagName) && UInv.isString(ItemType)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArrayByType(BagName, ItemType);
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						var Rnd = random(Items.length - 1);
						UInv.SetCurrentItemName(Items[Rnd]);
						return Items[Rnd];  /* Success */
					} else {
						return "";  /* Success */
					}
				} else {
					UInvError('GetItemByType cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemByType is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRandomItemValue: Returns a random value of an item's ItemPropertyName in a bag if it has that property.  Sets that item as the current item. */
		GetRandomItemValue : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Item = UInv.GetItemByProperty(BagName, ItemPropertyName);
					UInv.SetCurrentBagName(BagName);
					if (Item) {
						UInv.SetCurrentItemName(Item);
						return UInv.GetItemPropertyValue(BagName, Item, ItemPropertyName);  /* Success */
					} else {
						return "";  /* Success */
					}
				} else {
					UInvError('GetRandomItemValue cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetRandomItemValue is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemWherePropertyEquals: Returns a random ItemName from a bag where ItemPropertyName === Value.  Sets that item as the current item. */
		GetItemWherePropertyEquals : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (!UInv.isUndefined(Value)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						if (arguments.length >= 3) {
							var Items = UInv.GetItemsArrayWherePropertyEquals(BagName, ItemPropertyName, Value);
							UInv.SetCurrentBagName(BagName);
							if (Items.length > 0) {
								var Rnd = random(Items.length - 1);
								UInv.SetCurrentItemName(Items[Rnd]);
								return Items[Rnd];  /* Success */
							} else {
								return "";  /* Success */
							}
						} else {
							UInvError('GetItemWherePropertyEquals failed. Value parameter is missing.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetItemWherePropertyEquals cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemWherePropertyEquals failed. Value parameter is undefined.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemWherePropertyEquals is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemWherePropertyGreaterThan: Returns a random ItemName from a bag where ItemPropertyName === Value.  Sets that item as the current item. */
		GetItemWherePropertyGreaterThan : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (!UInv.isUndefined(Value)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						var Items = UInv.GetItemsArrayWherePropertyGreaterThan(BagName, ItemPropertyName, Value);
						UInv.SetCurrentBagName(BagName);
						if (Items.length > 0) {
							var Rnd = random(Items.length - 1);
							UInv.SetCurrentItemName(Items[Rnd]);
							return Items[Rnd];  /* Success */
						} else {
							return "";  /* Success */
						}
					} else {
						UInvError('GetItemWherePropertyGreaterThan cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemWherePropertyGreaterThan failed. Value parameter is undefined.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemWherePropertyGreaterThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemWherePropertyLessThan: Returns a random ItemName from a bag where ItemPropertyName === Value.  Sets that item as the current item. */
		GetItemWherePropertyLessThan : function (BagName, ItemPropertyName, Value) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				if (!UInv.isUndefined(Value)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						var Items = UInv.GetItemsArrayWherePropertyLessThan(BagName, ItemPropertyName, Value);
						UInv.SetCurrentBagName(BagName);
						if (Items.length > 0) {
							var Rnd = random(Items.length - 1);
							UInv.SetCurrentItemName(Items[Rnd]);
							return Items[Rnd];  /* Success */
						} else {
							return "";  /* Success */
						}
					} else {
						UInvError('GetItemWherePropertyLessThan cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemWherePropertyLessThan failed. Value parameter is undefined.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemWherePropertyLessThan is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRandomItem: Returns a random ItemName from the bag.  Sets that item as the current item. */
		GetRandomItem : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Items = UInv.GetItemsArray(BagName);
					UInv.SetCurrentBagName(BagName);
					if (Items.length > 0) {
						var Rnd = random(Items.length - 1);
						UInv.SetCurrentItemName(Items[Rnd]);
						return Items[Rnd];  /* Success */
					} else {
						return "";  /* Success */
					}
				} else {
					UInvError('GetRandomItem cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetRandomItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ResetItemProperties: Removes all properties from an item (except UInvQuantity and UInvPocket if it exists).  If DefaultItemType is passed then it loads the default properties of that item. */
		ResetItemProperties : function (BagName, ItemName, DefaultItemType) {
			if (UInv.isString(ItemName)) {
				var i;
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					ItemName = FixItemName(ItemName);
					if (UInv.BagExists(BagName)) {
						var Quantity = UInv.BagHasItem(BagName, ItemName);
						if (Quantity) {
							var hasPockets = false, Pockets, NewPockets, NewItemName;
							if (UInv.isUndefined(DefaultItemType)) {
								DefaultItemType = UInv.GetItemsDefaultType(BagName, ItemName);
								if (DefaultItemType) {
									if (UInv.ItemHasPocket(BagName, ItemName)) {  /* Keep current pockets */
										hasPockets = true;
										Quantity = 1;
										Pockets = UInv.GetItemPocketObject(BagName, ItemName);
										UInv.UnlinkPocketFromContainer(BagName, ItemName);
									}
									UInv.DeleteItem(BagName, ItemName);
									UInv.SetCurrentBagName(BagName);
									UInv.SetCurrentItemName(ItemName);
									NewItemName = UInv.AddItem(BagName, DefaultItemType, Quantity, ItemName);  /* Success */
									if (hasPockets) {  /* Restore pockets */
										if (UInv.ItemHasPocket(BagName, NewItemName)) {  /* Delete new pockets */
											NewPockets = UInv.GetItemPocketNameArray(BagName, NewItemName);
											for (i = 0; i < NewPockets.length; i++) {
												UInv.DeletePocket(BagName, NewItemName, NewPockets[i]);
											}
										}
										NewPockets = Object.keys(Pockets);
										for (i = 0; i < NewPockets.length; i++) {  /* Restore old pockets */
											UInv.AddExistingBagAsPocket(BagName, NewItemName, NewPockets[i], Pockets[NewPockets[i]]);
										}
									}
									return true;  /* Success */
								} else {
									UInvError('ResetItemProperties failed. Item does not have a default type.');  /* Error */
									return undefined;
								}
							} else if (UInv.isString(DefaultItemType)) {
								if (UInv.GetDefaultItemObject(DefaultItemType)) {
									if (UInv.ItemHasPocket(BagName, ItemName)) {  /* Keep current pockets */
										hasPockets = true;
										Quantity = 1;
										Pockets = UInv.GetItemPocketObject(BagName, ItemName);
										UInv.UnlinkPocketFromContainer(BagName, ItemName);
									}
									UInv.DeleteItem(BagName, ItemName);
									NewItemName = UInv.AddItem(BagName, DefaultItemType, Quantity, ItemName);
									if (hasPockets) {  /* Restore pockets */
										if (UInv.ItemHasPocket(BagName, NewItemName)) {  /* Delete new pockets */
											NewPockets = UInv.GetItemPocketNameArray(BagName, NewItemName);
											for (i = 0; i < NewPockets.length; i++) {
												UInv.DeletePocket(BagName, NewItemName, NewPockets[i]);
											}
										}
										NewPockets = Object.keys(Pockets);
										for (i = 0; i < NewPockets.length; i++) {  /* Restore old pockets */
											UInv.AddExistingBagAsPocket(BagName, NewItemName, NewPockets[i], Pockets[NewPockets[i]]);
										}
									}
									return true;  /* Success */
								} else {
									UInvError('ResetItemProperties failed. DefaultItemType "' + DefaultItemType + '" is not a default item.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('DefaultItemType passed to ResetItemProperties is not a string.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('ResetItemProperties cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ResetItemProperties cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var Result = true;
						for (i = 0; i < BagName.length; i++) {
							Result = UInv.ResetItemProperties(BagName[i], ItemName, DefaultItemType);
						}
						return Result;  /* Success */
					} else {
						UInvError('ResetItemProperties failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to ResetItemProperties is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('ItemName passed to ResetItemProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWhereItemNameContains: Returns an array of ItemNames where item's name contains the substring    *** use RegExp matching? */
		GetItemsArrayWhereItemNameContains : function (BagName, SubString) {
			if (UInv.isString(BagName) && UInv.isString(SubString)) {
				BagName = FixBagName(BagName);
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
						return Result;  /* Success */
					} else {
						return [];  /* Success */
					}
				} else {
					UInvError('GetItemsArrayWhereItemNameContains cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Parameter passed to GetItemsArrayWhereItemNameContains is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWherePropertyValueContains: Returns an array of ItemNames where item's ItemPropertyName contains the substring    *** use RegExp matching? */
		GetItemsArrayWherePropertyValueContains : function (BagName, ItemPropertyName, SubString, CaseSensitive) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName) && UInv.isString(SubString)) {
				BagName = FixBagName(BagName);
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
						return Result;  /* Success */
					} else {
						return [];  /* Success */
					}
				} else {
					UInvError('GetItemsArrayWherePropertyValueContains cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Parameter passed to GetItemsArrayWherePropertyValueContains is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemPropertyValueObject: Returns an object in the format { ItemName : ItemPropertyName's value, ... } for each item in BagName that has the property ItemPropertyName. */
		/*                             Items that don't have ItemPropertyName are ignored. */
		GetItemPropertyValueObject : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
						return Result;  /* Success */
					} else {
						return {};  /* Success */
					}
				} else {
					UInvError('GetItemPropertyValueObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Parameter passed to GetItemPropertyValueObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArraySortedByProperty: Returns an array of item names in BagName, sorted by the value in ItemPropertyName (subsorted by ItemName), or by ItemName if ItemPropertyName isn't set. */
		/*         The array is sorted by number or boolean if all item property values are of that type, otherwise it converts non-strings to strings and does a lowercase comparison. */
		/*         Items that don't have ItemPropertyName are ignored. */
		GetItemsArraySortedByProperty : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
							return UInv.getArraySortedByOtherArray(Result, Key);  /* Success */
						} else {
							return Items.sort( function compare(a, b) {  /* String sort function; a & b are item names, so they will always be strings */
								if (a.toLowerCase() < b.toLowerCase()) {
									return -1;
								}
								if (a.toLowerCase() > b.toLowerCase()) {
									return 1;
								}
								return 0;  /* a === b */
							});  /* Success */
						}
					} else {
						return [];  /* Success */
					}
				} else {
					UInvError('GetItemsArraySortedByProperty cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemsArraySortedByProperty is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemCountByFunction: Returns the sum of the values returned by function (function is passed BagName) or undefined on error. */
		GetItemCountByFunction : function (BagName, CountFunction) {
			var tmp;
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.isFunction(CountFunction)) {
						UInv.SetCurrentBagName(BagName);
						tmp = CountFunction(BagName);
						if (UInv.isUndefined(tmp)) {
							UInv.Error("Error: GetItemCountByFunction failed. CountFunction's return value is undefined.");  /* Error */
							return undefined;
						}
						return tmp;  /* Success */
					} else {
						UInvError('CountFunction passed to GetItemCountByFunction is not a function.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemCountByFunction cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else if (UInv.isArrayOfStrings(BagName)) {
				if (UInv.isFunction(CountFunction)) {
					var i = 0, Result = 0;
					if (BagName.length > 0) {
						for (i = 0; i < BagName.length; i++) {
							if (UInv.BagExists(BagName[i])) {
								tmp = CountFunction(BagName);
								if (UInv.isUndefined(tmp)) {
									UInv.Error("Error: GetItemCountByFunction failed. CountFunction's return value is undefined.");  /* Error */
									return undefined;
								}
								Result += tmp;
							} else {
								UInvError('GetItemCountByFunction cannot find bag "' + BagName + '".');  /* Error */
								return undefined;
							}
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('CountFunction passed to GetItemCountByFunction is not a function.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemCountByFunction is not a string or an array of strings.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayByFunction: Returns an array of items where function is true (function is passed BagName and ItemName strings) or undefined on error. */
		GetItemsArrayByFunction : function (BagName, SelectionFunction) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.isFunction(SelectionFunction)) {
						var Items = UInv.GetItemsArray(BagName), i = 0, tmp, Result = [];
						UInv.SetCurrentBagName(BagName);
						if (Items.length > 0) {
							for (i = 0; i < Items.length; i++) {
								tmp = SelectionFunction(BagName, Items[i]);
								if (UInv.isUndefined(tmp)) {
									UInv.Error("Error: GetItemsArrayByFunction failed. SelectionFunction's return value is undefined.");  /* Error */
									return undefined;
								}
								if (tmp) {
									Result.push([Items[i]]);
								}
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('SelectionFunction passed to GetItemsArrayByFunction is not a function.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArrayByFunction cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemsArrayByFunction is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArraySortedByFunction: Returns an array of ItemNames sorted by the SortFunction function, or undefined on error. */
		/*                                The SortFunction will be passed the parameters (BagName, ItemName1, ItemName2), and */
		/*                                if the function returns a "truthy" value, then those two items will be swapped in the array. */
		GetItemsArraySortedByFunction : function (BagName, SortFunction) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
										UInv.Error("Error: GetItemsArraySortedByFunction failed. SortFunction's return value is undefined.");  /* Error */
										return undefined;
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
							UInvError('GetItemsArraySortedByFunction failed. SortFunction is not returning consistent results.');  /* Error */
							return undefined;
						} else {
							return Items;  /* Success */
						}
					} else {
						UInvError('SortFunction passed to GetItemsArraySortedByFunction is not a function.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArraySortedByFunction cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to GetItemsArraySortedByFunction is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasAllProperties: Returns whether all of the item's properties are listed in ItemPropertyNameArray, false if the item has no properties, or undefined on error. */
		ItemHasAllProperties : function (BagName, ItemName, ItemPropertyNameArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
										return false;  /* Success */
									}
								}
								return true;  /* Success */
							}
							return false;  /* Success */
						} else {
							UInvError('ItemHasAllProperties failed. ItemPropertyNameArray is not an array of strings.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemHasAllProperties cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasAllProperties cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasAllProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasAnyProperties: Returns whether any of the item's properties are listed in ItemPropertyNameArray, false if the item has no properties, or undefined on error. */
		ItemHasAnyProperties : function (BagName, ItemName, ItemPropertyNameArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
									if (ItemPropertyNameArray.includes(Props[i])) {
										return true;  /* Success */
									}
								}
							}
							return false;  /* Success */
						} else {
							UInvError('ItemHasAnyProperties failed. ItemPropertyNameArray is not an array of strings.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemHasAnyProperties cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasAnyProperties cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasAnyProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithAllProperties: Returns an array of all items which have all of the properties in ItemPropertyNameArray (per the ItemHasAllProperties function), or undefined on error. */
		/*                                 Items which have no properties will not be included. */
		GetItemsArrayWithAllProperties : function (BagName, ItemPropertyNameArray) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.isString(ItemPropertyNameArray)) {
						ItemPropertyNameArray = [ ItemPropertyNameArray ];
					}
					if (UInv.isArrayOfStrings(ItemPropertyNameArray)) {
						var Items = UInv.GetItemsArray(BagName), Result = [], i;
						for (i = 0; i < Items.length; i++) {
							if (UInv.ItemHasAllProperties(BagName, Items[i], ItemPropertyNameArray)) {
								Result.push(Items[i]);
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('GetItemsArrayWithAllProperties failed. ItemPropertyNameArray is not an array of strings.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArrayWithAllProperties cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithAllProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithoutProperties: Returns an array of ItemNames in BagName that do not have any ItemPropertyName/Array as any of their properties, or undefined on error. */
		GetItemsArrayWithoutProperties : function (BagName, ItemPropertyNameArray) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.isString(ItemPropertyNameArray)) {
						ItemPropertyNameArray = [ ItemPropertyNameArray ];
					}
					if (UInv.isArrayOfStrings(ItemPropertyNameArray)) {
						var Items = UInv.GetItemsArray(BagName), Result = [], i;
						for (i = 0; i < Items.length; i++) {
							if (!UInv.ItemHasAnyProperties(BagName, Items[i], ItemPropertyNameArray)) {
								Result.push(Items[i]);
							}
						}
						return Result;  /* Success */
					} else {
						UInvError('GetItemsArrayWithoutProperties failed. ItemPropertyNameArray is not an array of strings.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemsArrayWithoutProperties cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithoutProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SwapItemsProperties: Swaps the given properties of two items (except UInvDefaultItemType and UInvVariableType, plus UInvQuantity for items with pockets).  Returns true on success. */
		SwapItemsProperties : function (BagName1, ItemName1, BagName2, ItemName2, ItemPropertyName) {
			if (UInv.isString(BagName1) && UInv.isString(ItemName1) && UInv.isString(BagName2) && UInv.isString(ItemName2)) {
				BagName1 = FixBagName(BagName1);
				ItemName1 = FixItemName(ItemName1);
				BagName2 = FixBagName(BagName2);
				ItemName2 = FixItemName(ItemName2);
				if (UInv.BagExists(BagName1)) {
					if (UInv.BagExists(BagName2)) {
						if (UInv.BagHasItem(BagName1, ItemName1)) {
							if (UInv.BagHasItem(BagName2, ItemName2)) {
								if (UInv.isString(ItemPropertyName)) {
									ItemPropertyName = [ ItemPropertyName ];
								}
								if (UInv.isArrayOfStrings(ItemPropertyName)) {
									ItemPropertyName = UInv.getUniqueArray(ItemPropertyName);  /* Remove duplicates */
									if (!ItemPropertyName.includesAny("UInvDefaultItemType", "UInvVariableType")) {
										if (!(ItemPropertyName.includes("UInvQuantity") && (UInv.ItemHasPocket(BagName1, ItemName1) || UInv.ItemHasPocket(BagName2, ItemName2)))) {
											var i = 0, Val;
											if (ItemPropertyName.length > 0) {
												for (i = 0; i < ItemPropertyName.length; i++) {
													if (UInv.ItemHasProperty(BagName1, ItemName1, ItemPropertyName[i])) {
														if (UInv.ItemHasProperty(BagName2, ItemName2, ItemPropertyName[i])) {
															/* swap item property values */
															Val = UInv.GetItemValue(BagName1, ItemName1, ItemPropertyName[i]);
															UInv.SetItemPropertyValue(BagName1, ItemName1, ItemPropertyName[i], UInv.GetItemValue(BagName2, ItemName2, ItemPropertyName[i]));
															UInv.SetItemPropertyValue(BagName2, ItemName2, ItemPropertyName[i], Val);
															if (ItemPropertyName[i] == "UInvPocket") {  /* Update pockets on both items */
																FixContainerReferences(BagName1, ItemName1, BagName2, ItemName2);
																FixContainerReferences(BagName2, ItemName2, BagName1, ItemName1);
															}
														} else {
															/* move item property */
															UInv.SetItemPropertyValue(BagName2, ItemName2, ItemPropertyName[i], UInv.GetItemValue(BagName1, ItemName1, ItemPropertyName[i]));
															if (ItemPropertyName[i] == "UInvPocket") {  /* Update pockets on item 2 */
																FixContainerReferences(BagName1, ItemName1, BagName2, ItemName2);
															}
															if (["UInvPocket", "UInvCell"].includes(ItemPropertyName[i])) {  /* Delete swapped away property */
																delete State.variables.UInvBags[BagName1][ItemName1][ItemPropertyName[i]];
															} else {
																UInv.DeleteItemProperty(BagName1, ItemName1, ItemPropertyName[i]);
															}
														}
													} else {
														if (UInv.ItemHasProperty(BagName2, ItemName2, ItemPropertyName[i])) {
															/* move item property */
															UInv.SetItemPropertyValue(BagName1, ItemName1, ItemPropertyName[i], UInv.GetItemValue(BagName2, ItemName2, ItemPropertyName[i]));
															if (ItemPropertyName[i] == "UInvPocket") {  /* Update pockets on item 1 */
																FixContainerReferences(BagName2, ItemName2, BagName1, ItemName1);
															}
															if (["UInvPocket", "UInvCell"].includes(ItemPropertyName[i])) {  /* Delete swapped away property */
																delete State.variables.UInvBags[BagName2][ItemName2][ItemPropertyName[i]];
															} else {
																UInv.DeleteItemProperty(BagName2, ItemName2, ItemPropertyName[i]);
															}
														}
													}
												}
											}
											return true;  /* Success */
										} else {
											UInvError('SwapItemsProperties failed. ItemPropertyName cannot be UInvQuantity if either item has pockets.');  /* Error */
											return undefined;
										}
									} else {
										UInvError('SwapItemsProperties failed. ItemPropertyName cannot be UInvDefaultItemType or UInvVariableType.');  /* Error */
										return undefined;
									}
								} else {
									UInvError('SwapItemsProperties failed. ItemPropertyName is not a string or array of strings.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('SwapItemsProperties cannot find item "' + ItemName2 + '" in bag "' + BagName2 + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('SwapItemsProperties cannot find item "' + ItemName1 + '" in bag "' + BagName1 + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SwapItemsProperties cannot find bag "' + BagName2 + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SwapItemsProperties cannot find bag "' + BagName1 + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SwapItemsProperties is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SwapItems: Swaps two items, optionally keeps certain item properties un-swapped.  Returns true on success, undefined on error. */
		SwapItems : function (BagName1, ItemName1, BagName2, ItemName2, ExceptItemPropertyName) {
			if (UInv.isString(BagName1) && UInv.isString(ItemName1) && UInv.isString(BagName2) && UInv.isString(ItemName2)) {
				BagName1 = FixBagName(BagName1);
				ItemName1 = FixItemName(ItemName1);
				BagName2 = FixBagName(BagName2);
				ItemName2 = FixItemName(ItemName2);
				if (UInv.BagExists(BagName1)) {
					if (UInv.BagExists(BagName2)) {
						if (UInv.BagHasItem(BagName1, ItemName1)) {
							if (UInv.BagHasItem(BagName2, ItemName2)) {
								if (UInv.isString(ExceptItemPropertyName)) {
									ExceptItemPropertyName = [ ExceptItemPropertyName ];
								}
								if (BagName1 === BagName2) {
									if (UInv.isUndefined(ExceptItemPropertyName)) {
										return true;  /* Success - items already in same bag */
									} else if (UInv.isArrayOfStrings(ExceptItemPropertyName)) {  /* Just swap excepted properties */
										UInv.SwapItemsProperties(BagName1, ItemName1, BagName2, ItemName2, ExceptItemPropertyName);
										return true;  /* Success */
									} else {
										UInvError('SwapItems failed. ExceptItemPropertyName is not a string or array of strings.');  /* Error */
										return undefined;
									}
								} else {
									if (UInv.isUndefined(ExceptItemPropertyName) || UInv.isArrayOfStrings(ExceptItemPropertyName)) {  /* Swap items */
										var TempBag = UInv.GetUniqueBagName(), Item1Obj = {}, Item2Obj = {}, i;
										UInv.IncrementUpdateLock();  /* Prevent unnecessary updates */
										if (UInv.isArrayOfStrings(ExceptItemPropertyName)) {  /* Store excepted properties */
											for (i = 0; i < ExceptItemPropertyName.length; i++) {
												if (UInv.ItemHasProperty(BagName1, ItemName1, ExceptItemPropertyName[i])) {
													Item1Obj[ExceptItemPropertyName[i]] = UInv.GetItemPropertyValue(BagName1, ItemName1, ExceptItemPropertyName[i]);
												}
												if (UInv.ItemHasProperty(BagName2, ItemName2, ExceptItemPropertyName[i])) {
													Item2Obj[ExceptItemPropertyName[i]] = UInv.GetItemPropertyValue(BagName2, ItemName2, ExceptItemPropertyName[i]);
												}
											}
										}
										UInv.CreateBag(TempBag);
										UInv.MoveItem(BagName1, TempBag, ItemName1);
										UInv.MoveItem(BagName2, BagName1, ItemName2);
										UInv.MoveItem(TempBag, BagName2, ItemName1);
										UInv.DeleteBag(TempBag);
										if (UInv.isArrayOfStrings(ExceptItemPropertyName)) {  /* Swap excepted properties */
											for (i = 0; i < ExceptItemPropertyName.length; i++) {
												if (UInv.isProperty(Item2Obj, ExceptItemPropertyName[i])) {
													UInv.SetItemPropertyValue(BagName2, ItemName1, ExceptItemPropertyName[i], Item2Obj[ExceptItemPropertyName[i]]);
												} else if (UInv.ItemHasProperty(BagName2, ItemName1, ExceptItemPropertyName[i])) {
													UInv.DeleteItemProperty(BagName2, ItemName1, ExceptItemPropertyName[i]);
												}
												if (UInv.isProperty(Item1Obj, ExceptItemPropertyName[i])) {
													UInv.SetItemPropertyValue(BagName1, ItemName2, ExceptItemPropertyName[i], Item1Obj[ExceptItemPropertyName[i]]);
												} else if (UInv.ItemHasProperty(BagName1, ItemName2, ExceptItemPropertyName[i])) {
													UInv.DeleteItemProperty(BagName1, ItemName2, ExceptItemPropertyName[i]);
												}
											}
										}
										UInv.DecrementUpdateLock();
										UInv.SetCurrentBagName(BagName1);
										UInv.SetCurrentItemName(ItemName1);
										return true;  /* Success */
									} else {
										UInvError('SwapItems failed. ExceptItemPropertyName is not a string or array of strings.');  /* Error */
										return undefined;
									}
								}
							} else {
								UInvError('SwapItems cannot find item "' + ItemName2 + '" in bag "' + BagName2 + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('SwapItems cannot find item "' + ItemName1 + '" in bag "' + BagName1 + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SwapItems cannot find bag "' + BagName2 + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('SwapItems cannot find bag "' + BagName1 + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SwapItems is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagItemArrayWhereItemPropertyEquals: Returns an array of [[BagName, ItemName], ...] where the item's ItemPropertyName property == Value (all entries are unique), or undefined on error. */
		GetBagItemArrayWhereItemPropertyEquals : function (BagNameArray, ItemPropertyName, Value) {
			if (UInv.isString(ItemPropertyName)) {
				if (UInv.isString(BagNameArray)) {
					BagNameArray = [ BagNameArray ];
				}
				if (UInv.isArrayOfStrings(BagNameArray)) {
					if (UInv.BagExists(BagNameArray)) {
						if (arguments.length >= 3) {
							var Result = [], Items, Match = {}, i, j;
							for (i = 0; i < BagNameArray.length; i++) {
								Items = UInv.GetItemsArrayWherePropertyEquals(BagNameArray[i], ItemPropertyName, Value);
								for (j = 0; j < Items.length; j++) {
									if (!UInv.isProperty(Match, BagNameArray[i]+Items[j])) {  /* Make sure the item isn't already in the Results array */
										Match[BagNameArray[i]+Items[j]] = true;
										Result.push([BagNameArray[i], Items[j]]);
									}
								}
							}
							return Result;  /* Success */
						} else {
							UInvError('GetBagItemArrayWhereItemPropertyEquals failed.  Value parameter is missing.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetBagItemArrayWhereItemPropertyEquals failed.  Unknown bag in BagNameArray.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagNameArray passed to GetBagItemArrayWhereItemPropertyEquals is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('ItemPropertyName passed to GetBagItemArrayWhereItemPropertyEquals is not a string.');  /* Error */
				return undefined;
			}
		},

		/* RestackItems: Attempts to restack any items which may be stacked incorrectly.  Returns true if any were restacked, false for no changes, and undefined on error. */
		RestackItems : function (BagName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					var Result = false, Test = true, Start = 0, Items, i, j;
					UInv.IncrementUpdateLock();
					while (Test) {
						Test = false;
						Items = UInv.GetItemsArray(BagName).sort();
						if (Items.length > 1) {
							for (i = Start; i < Items.length - 1; i++) {
								Start = i;  /* So the loop can pick up where it left off */
								for (j = i + 1; j < Items.length; j++) {
									if (UInv.ItemsMatch(BagName, Items[i], BagName, Items[j])) {  /* Merge stacks */
										if ((Items[i].indexOf("item") == 0) && (Items[j].indexOf("item") != 0)) {  /* Prefer item names that do NOT start with "item" */
											UInv.SetItemQuantity(BagName, Items[j], UInv.BagHasItem(BagName, Items[j]) + UInv.BagHasItem(BagName, Items[i]));
											UInv.DeleteItem(BagName, Items[i]);
										} else {  /* default to first item */
											UInv.SetItemQuantity(BagName, Items[i], UInv.BagHasItem(BagName, Items[i]) + UInv.BagHasItem(BagName, Items[j]));
											UInv.DeleteItem(BagName, Items[j]);
										}
										Result = true;
										Test = true;
										break;
									}
								}
								if (Test) {
									break;
								}
							}
						}
					}
					UInv.DecrementUpdateLock();
					UInv.SetCurrentBagName(BagName);
					return Result;
				} else {
					UInvError('RestackItems cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to RestackItems is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveBagPropertyValueToItem: Moves an amount of a number from a bag's property to an item's property, limited by the minimum and maximum values. */
		/*                             Deletes the bag, item, or property (depending on DeletionType) if the property's value gets set to DeletionValue.  Returns the destination value or undefined on error. */
		MoveBagPropertyValueToItem : function (SourceBagName, SourceBagPropertyName, DestinationBagName, DestinationItemName, DestinationItemPropertyName, Amount, MinimumValue, MaximumValue, DeletionValue, DeletionType) {
			if (UInv.isString(SourceBagName) && UInv.isString(SourceBagPropertyName) && UInv.isString(DestinationBagName) && UInv.isString(DestinationItemName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						DestinationItemName = FixItemName(DestinationItemName);
						if (UInv.BagHasItem(DestinationBagName, DestinationItemName)) {
							if (UInv.BagHasProperty(SourceBagName, SourceBagPropertyName)) {
								if (UInv.isUndefined(DestinationItemPropertyName)) {
									DestinationItemPropertyName = SourceBagPropertyName;
								}
								if (["UInvDefaultItemType", "UInvPocket"].includes(DestinationItemPropertyName)) {
									UInvError('MoveBagPropertyValueToItem failed. DestinationItemPropertyName cannot be "' + DestinationItemPropertyName + '".');  /* Error */
									return undefined;
								}
								if (DestinationItemPropertyName === "UInvQuantity") {
									if (!UInv.isInteger(UInv.GetBagPropertyValue(SourceBagName, SourceBagPropertyName))) {
										UInvError("MoveBagPropertyValueToItem failed. Source bag property must be an integer to move it to an item's UInvQuantity.");  /* Error */
										return undefined;
									}
									if ((!UInv.isUndefined(Amount)) && (!UInv.isInteger(Amount))) {
										UInvError("MoveBagPropertyValueToItem failed. Amount must be an integer to move it to an item's UInvQuantity.");  /* Error */
										return undefined;
									}
									MinimumValue = 0;
									DeletionValue = 0;
									if (UInv.isString(DeletionType) && (DeletionType !== "object")) {
										DeletionType = "item";
									}
								}
								if (!UInv.isUndefined(Amount)) {
									Amount = tryIntParse(Amount);
									if (UInv.isNumber(Amount)) {
										var SrcVal = UInv.GetBagPropertyValue(SourceBagName, SourceBagPropertyName);
										SrcVal = tryIntParse(SrcVal);
										if (UInv.isNumber(SrcVal)) {
											var DstVal = 0;
											if (UInv.ItemHasProperty(DestinationBagName, DestinationItemName, DestinationItemPropertyName)) {
												DstVal = UInv.GetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName);
												DstVal = tryIntParse(DstVal);
											}
											if (UInv.isNumber(DstVal)) {
												var TmpAmt = Amount;
												if (!UInv.isUndefined(MinimumValue)) {
													MinimumValue = tryIntParse(MinimumValue);
													if (UInv.isUndefined(MinimumValue)) {
														UInvError('MoveBagPropertyValueToItem failed. If used, MinimumValue must be a number.');  /* Error */
														return undefined;
													}
													if (SrcVal - Amount < MinimumValue) {  /* Can't reduce source below minimum */
														Amount = SrcVal - MinimumValue;
													}
													if (DstVal + Amount < MinimumValue) {  /* Can't reduce destination below minimum (for when Amount is negative) */
														Amount = MinimumValue - DstVal;
													}
												}
												if (!UInv.isUndefined(MaximumValue)) {
													MaximumValue = tryIntParse(MaximumValue);
													if (UInv.isUndefined(MaximumValue)) {
														UInvError('MoveBagPropertyValueToItem failed. If used, MaximumValue must be a number.');  /* Error */
														return undefined;
													}
													if ((!UInv.isUndefined(MinimumValue)) && (MinimumValue > MaximumValue)) {
														UInvError('MoveBagPropertyValueToItem failed. When both are used, MaximumValue must be greater than MinimumValue.');  /* Error */
														return undefined;
													}
													if (SrcVal - Amount > MaximumValue) {  /* Can't increase source above maximum (for when Amount is negative) */
														Amount = SrcVal - MaximumValue;
													}
													if (DstVal + Amount > MaximumValue) {  /* Can't increase destination above maximum */
														Amount = MaximumValue - DstVal;
													}
												}
												if (((TmpAmt >= 0) && (Amount > TmpAmt)) || ((TmpAmt < 0) && (Amount < TmpAmt))) {
													UInvError('MoveBagPropertyValueToItem failed. Source (' + SrcVal + ') and/or Destination (' + DstVal + ') values are too far out of MinimumValue (' + MinimumValue + ') and/or MaximumValue (' + MaximumValue + ') range.');  /* Error */
													return undefined;
												}
												if (!UInv.isUndefined(DeletionValue)) {
													DeletionValue = tryIntParse(DeletionValue);
													if (UInv.isUndefined(DeletionValue)) {
														UInvError('MoveBagPropertyValueToItem failed. If used, DeletionValue must be a number.');  /* Error */
														return undefined;
													}
													if (SrcVal - Amount == DeletionValue) {
														if (UInv.isString(DeletionType)) {
															DeletionType = DeletionType.toLowerCase();
														} else {
															DeletionType = "property";
														}
														switch (DeletionType) {
															case "bag":  /* delete bag */
															case "object":  /* delete bag or item */
																UInv.DeleteBag(SourceBagName);
																break;
															case "item":  /* delete item (do nothing in this case) */
																UInv.SetBagPropertyValue(SourceBagName, SourceBagPropertyName, SrcVal - Amount);
																break;
															default:  /* delete property */
																UInv.DeleteBagProperty(SourceBagName, SourceBagPropertyName);
														}
													} else {
														UInv.SetBagPropertyValue(SourceBagName, SourceBagPropertyName, SrcVal - Amount);
													}
													if (DstVal + Amount == DeletionValue) {
														if (UInv.isString(DeletionType)) {
															DeletionType = DeletionType.toLowerCase();
														} else {
															DeletionType = "property";
														}
														switch (DeletionType) {
															case "item":  /* delete item */
															case "object":  /* delete bag or item */
																UInv.DeleteItem(DestinationBagName, DestinationItemName);
																break;
															case "bag":  /* delete bag (do nothing in this case) */
																UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, DstVal + Amount);
																break;
															default:  /* delete property */
																UInv.DeleteItemProperty(DestinationBagName, DestinationItemName, DestinationItemPropertyName);
														}
													} else {
														UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, DstVal + Amount);
													}
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetCurrentItemName(DestinationItemName);
													return DstVal + Amount;  /* Success */
												}
												UInv.SetBagPropertyValue(SourceBagName, SourceBagPropertyName, SrcVal - Amount);
												UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, DstVal + Amount);
												UInv.SetCurrentBagName(DestinationBagName);
												UInv.SetCurrentItemName(DestinationItemName);
												return DstVal + Amount;  /* Success */
											} else {
												UInvError("MoveBagPropertyValueToItem failed. Destination item's property value must be a number to add to or subtract from it.");  /* Error */
												return undefined;
											}
										} else {
											UInvError("MoveBagPropertyValueToItem failed. Source bag's property value must be a number to move an Amount of it.");  /* Error */
											return undefined;
										}
									} else {
										UInvError('MoveBagPropertyValueToItem failed. If used, Amount must be a number.');  /* Error */
										return undefined;
									}
								} else {
									var Val = UInv.GetBagPropertyValue(SourceBagName, SourceBagPropertyName);
									UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, Val);
									UInv.DeleteBagProperty(SourceBagName, SourceBagPropertyName);
									UInv.SetCurrentBagName(DestinationBagName);
									UInv.SetCurrentItemName(DestinationItemName);
									return Val;  /* Success */
								}
							} else {
								UInvError('MoveBagPropertyValueToItem failed. Source bag "' + SourceBagName + '" does not have property "' + SourceBagPropertyName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveBagPropertyValueToItem failed. Destination bag "' + DestinationBagName + '" does not contain item "' + DestinationItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveBagPropertyValueToItem cannot find destination bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveBagPropertyValueToItem cannot find source bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveBagPropertyValueToItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItemPropertyValueToItem: Moves an amount of a number from one item's property to another item's property, limited by the minimum and maximum values. */
		/*                              Deletes the bag, item, or property (depending on DeletionType) if the property's value gets set to DeletionValue.  Returns the destination value or undefined on error. */
		MoveItemPropertyValueToItem : function (SourceBagName, SourceItemName, SourceItemPropertyName, DestinationBagName, DestinationItemName, DestinationItemPropertyName, Amount, MinimumValue, MaximumValue, DeletionValue, DeletionType) {
			if (UInv.isString(SourceBagName) && UInv.isString(SourceItemName) && UInv.isString(SourceItemPropertyName) && UInv.isString(DestinationBagName) && UInv.isString(DestinationItemName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						SourceItemName = FixItemName(SourceItemName);
						if (UInv.BagHasItem(SourceBagName, SourceItemName)) {
							DestinationItemName = FixItemName(DestinationItemName);
							if (UInv.BagHasItem(DestinationBagName, DestinationItemName)) {
								if (UInv.ItemHasProperty(SourceBagName, SourceItemName, SourceItemPropertyName)) {
									if (UInv.isUndefined(DestinationItemPropertyName)) {
										DestinationItemPropertyName = SourceItemPropertyName;
									}
									if (["UInvDefaultItemType", "UInvPocket"].includes(SourceItemPropertyName)) {
										UInvError('MoveItemPropertyValueToItem failed. SourceItemPropertyName cannot be "' + SourceItemPropertyName + '".');  /* Error */
										return undefined;
									}
									if (["UInvDefaultItemType", "UInvPocket"].includes(DestinationItemPropertyName)) {
										UInvError('MoveItemPropertyValueToItem failed. DestinationItemPropertyName cannot be "' + DestinationItemPropertyName + '".');  /* Error */
										return undefined;
									}
									if (DestinationItemPropertyName === "UInvQuantity") {
										if ((!UInv.isUndefined(Amount)) && (!UInv.isInteger(Amount))) {
											UInvError("MoveItemPropertyValueToItem failed. Amount must be an integer to move it to an item's UInvQuantity.");  /* Error */
											return undefined;
										}
										MinimumValue = 0;
										DeletionValue = 0;
										if (UInv.isString(DeletionType) && (DeletionType !== "object")) {
											DeletionType = "item";
										}
									}
									if (!UInv.isUndefined(Amount)) {
										Amount = tryIntParse(Amount);
										if (UInv.isNumber(Amount)) {
											var SrcVal = UInv.GetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName);
											SrcVal = tryIntParse(SrcVal);
											if (UInv.isNumber(SrcVal)) {
												var DstVal = 0;
												if (UInv.ItemHasProperty(DestinationBagName, DestinationItemName, DestinationItemPropertyName)) {
													DstVal = UInv.GetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName);
													DstVal = tryIntParse(DstVal);
												}
												if (UInv.isNumber(DstVal)) {
													var TmpAmt = Amount;
													if (!UInv.isUndefined(MinimumValue)) {
														MinimumValue = tryIntParse(MinimumValue);
														if (UInv.isUndefined(MinimumValue)) {
															UInvError('MoveItemPropertyValueToItem failed. If used, MinimumValue must be a number.');  /* Error */
															return undefined;
														}
														if (SrcVal - Amount < MinimumValue) {  /* Can't reduce source below minimum */
															Amount = SrcVal - MinimumValue;
														}
														if (DstVal + Amount < MinimumValue) {  /* Can't reduce destination below minimum (for when Amount is negative) */
															Amount = MinimumValue - DstVal;
														}
													}
													if (!UInv.isUndefined(MaximumValue)) {
														MaximumValue = tryIntParse(MaximumValue);
														if (UInv.isUndefined(MaximumValue)) {
															UInvError('MoveItemPropertyValueToItem failed. If used, MaximumValue must be a number.');  /* Error */
															return undefined;
														}
														if ((!UInv.isUndefined(MinimumValue)) && (MinimumValue > MaximumValue)) {
															UInvError('MoveItemPropertyValueToItem failed. When both are used, MaximumValue must be greater than MinimumValue.');  /* Error */
															return undefined;
														}
														if (SrcVal - Amount > MaximumValue) {  /* Can't increase source above maximum (for when Amount is negative) */
															Amount = SrcVal - MaximumValue;
														}
														if (DstVal + Amount > MaximumValue) {  /* Can't increase destination above maximum */
															Amount = MaximumValue - DstVal;
														}
													}
													if (((TmpAmt >= 0) && (Amount > TmpAmt)) || ((TmpAmt < 0) && (Amount < TmpAmt))) {
														UInvError('MoveItemPropertyValueToItem failed. Source (' + SrcVal + ') and/or Destination (' + DstVal + ') values are too far out of MinimumValue (' + MinimumValue + ') and/or MaximumValue (' + MaximumValue + ') range.');  /* Error */
														return undefined;
													}
													if (!UInv.isUndefined(DeletionValue)) {
														DeletionValue = tryIntParse(DeletionValue);
														if (UInv.isUndefined(DeletionValue)) {
															UInvError('MoveItemPropertyValueToItem failed. If used, DeletionValue must be a number.');  /* Error */
															return undefined;
														}
														if (SrcVal - Amount == DeletionValue) {
															if (UInv.isString(DeletionType)) {
																DeletionType = DeletionType.toLowerCase();
															} else {
																DeletionType = "property";
															}
															switch (DeletionType) {
																case "item":  /* delete item */
																case "object":  /* delete bag or item */
																	UInv.DeleteItem(SourceBagName);
																	break;
																case "bag":  /* delete bag (do nothing in this case) */
																	UInv.SetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName, SrcVal - Amount);
																	break;
																default:  /* delete property */
																	UInv.DeleteItemProperty(SourceBagName, SourceItemName, SourceItemPropertyName);
															}
														} else {
															UInv.SetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName, SrcVal - Amount);
														}
														if (DstVal + Amount == DeletionValue) {
															if (UInv.isString(DeletionType)) {
																DeletionType = DeletionType.toLowerCase();
															} else {
																DeletionType = "property";
															}
															switch (DeletionType) {
																case "item":  /* delete item */
																case "object":  /* delete bag or item */
																	UInv.DeleteItem(DestinationBagName, DestinationItemName);
																	break;
																case "bag":  /* delete bag (do nothing in this case) */
																	UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, DstVal + Amount);
																	break;
																default:  /* delete property */
																	UInv.DeleteItemProperty(DestinationBagName, DestinationItemName, DestinationItemPropertyName);
															}
														} else {
															UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, DstVal + Amount);
														}
														UInv.SetCurrentBagName(DestinationBagName);
														UInv.SetCurrentItemName(DestinationItemName);
														return DstVal + Amount;  /* Success */
													}
													UInv.SetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName, SrcVal - Amount);
													UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, DstVal + Amount);
													UInv.SetCurrentBagName(DestinationBagName);
													UInv.SetCurrentItemName(DestinationItemName);
													return DstVal + Amount;  /* Success */
												} else {
													UInvError("MoveItemPropertyValueToItem failed. Destination item's property value must be a number to add to or subtract from it.");  /* Error */
													return undefined;
												}
											} else {
												UInvError("MoveItemPropertyValueToItem failed. Source item's property value must be a number to move an Amount of it.");  /* Error */
												return undefined;
											}
										} else {
											UInvError('MoveItemPropertyValueToItem failed. If used, Amount must be a number.');  /* Error */
											return undefined;
										}
									} else {
										var Val = UInv.GetItemPropertyValue(SourceBagName, SourceItemName, SourceItemPropertyName);
										UInv.SetItemPropertyValue(DestinationBagName, DestinationItemName, DestinationItemPropertyName, Val);
										UInv.DeleteItemProperty(SourceBagName, SourceItemName, SourceItemPropertyName);
										UInv.SetCurrentBagName(DestinationBagName);
										UInv.SetCurrentItemName(DestinationItemName);
										return Val;  /* Success */
									}
								} else {
									UInvError('MoveItemPropertyValueToItem failed. Item "' + SourceItemName + '" in bag "' + SourceBagName + '" does not have property "' + SourceItemPropertyName + '".');  /* Error */
									return undefined;
								}
							} else {
								UInvError('MoveItemPropertyValueToItem failed. Destination bag "' + DestinationBagName + '" does not contain item "' + DestinationItemName + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('MoveItemPropertyValueToItem failed. Source bag "' + SourceBagName + '" does not contain item "' + SourceItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItemPropertyValueToItem cannot find destination bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItemPropertyValueToItem cannot find source bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItemPropertyValueToItem is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRawItemObject: Returns the raw item object.  FOR INTERNAL/TESTING USE ONLY. */
		GetRawItemObject : function (BagName, ItemName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						return State.variables.UInvBags[BagName][ItemName];  /* Success */
					} else {
						UInvError('GetRawItemObject cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetRawItemObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetRawItemObject is not a string.');  /* Error */
				return undefined;
			}
		},


		/* UInv Tag Functions: */
		/* =================== */

		/* AddBagTag: Add or change a bag property to include BagTag.  If property exists, then the value gets put in an array if it isn't already.  Returns true if it succeeds. */
		AddBagTag : function (BagName, BagPropertyName, BagTag) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						UInv.SetCurrentBagName(BagName);
						if (!UInv.isUndefined(BagTag)) {
							if (UInv.isArray(BagTag)) {
								var i = 0, AResult = true;
								if (BagTag.length > 0) {
									for (i = 0; i < BagTag.length; i++) {
										if (!UInv.AddBagTag(BagName, BagPropertyName, BagTag[i])) {
											AResult = undefined;
										}
									}
								}
								return AResult;  /* Success (or Error) */
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
								return true;  /* Success */
							}
						} else {
							UInvError('AddBagTag failed. BagTag not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddBagTag cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var j = 0, BResult = true;
						for (j = 0; j < BagName.length; j++) {
							if (!UInv.AddBagTag(BagName[j], BagPropertyName, BagTag)) {
								BResult = undefined;
							}
						}
						return BResult;  /* Success (or Error) */
					} else {
						UInvError('AddBagTag failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to AddBagTag is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to AddBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* AddItemTag: Add or change a item property to include ItemTag.  If property exists, then the value gets put in an array if it isn't already.  Returns true if it succeeds. */
		AddItemTag : function (BagName, ItemName, ItemPropertyName, ItemTag) {
			if (UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					ItemName = FixItemName(ItemName);
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
												AResult = undefined;
											}
										}
									}
									return AResult;  /* Success (or Error) */
								} else {
									var Value = [];
									if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
										Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);  /* Handle default item properties */
										if (UInv.isArray(Value)) {
											Value.push(ItemTag);
											UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
											return true;  /* Success */
										} else {
											Value = [ Value, ItemTag ];
											UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
											return true;  /* Success */
										}
									} else {
										Value = [ ItemTag ];
										UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
										return true;  /* Success */
									}
								}
							} else {
								UInvError('AddItemTag failed. ItemTag not defined.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('AddItemTag cannot find item "' + ItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('AddItemTag cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var j = 0, BResult = true;
						for (j = 0; j < BagName.length; j++) {
							if (!UInv.AddItemTag(BagName[j], ItemName, ItemPropertyName, ItemTag)) {
								BResult = undefined;
							}
						}
						return BResult;  /* Success (or Error) */
					} else {
						UInvError('AddItemTag failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to AddItemTag is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to AddItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteBagTag: Delete one instance of BagTag from bag property.  Returns true if it succeeds. */
		DeleteBagTag : function (BagName, BagPropertyName, BagTag) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						UInv.SetCurrentBagName(BagName);
						if (!UInv.isUndefined(BagTag)) {
							if (UInv.BagHasProperty(BagName, BagPropertyName)) {
								if (UInv.isArray(BagTag)) {
									var i = 0, AResult = true;
									if (BagTag.length > 0) {
										for (i = 0; i < BagTag.length; i++) {
											if (!UInv.DeleteBagTag(BagName, BagPropertyName, BagTag[i])) {
												AResult = undefined;
											}
										}
									}
									return AResult;  /* Success (or Error) */
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
									return true;  /* Success */
								}
							} else {
								return true;  /* Success - bag property not found */
							}
						} else {
							UInvError('DeleteBagTag failed. BagTag not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('DeleteBagTag cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var j = 0, BResult = true;
						for (j = 0; j < BagName.length; j++) {
							if (!UInv.DeleteBagTag(BagName[j], BagPropertyName, BagTag)) {
								BResult = undefined;
							}
						}
						return BResult;  /* Success (or Error) */
					} else {
						UInvError('DeleteBagTag failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to DeleteBagTag is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeleteBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteItemTag: Delete one instance of ItemTag from item property.  Returns true if it succeeds. */
		DeleteItemTag : function (BagName, ItemName, ItemPropertyName, ItemTag) {
			if (UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					ItemName = FixItemName(ItemName);
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
												AResult = undefined;
											}
										}
									}
									return AResult;  /* Success (or Error) */
								} else {
									var Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);  /* Handle default item properties */
									if (UInv.isArray(Value)) {
										if (UInv.arrayHasTag(Value, ItemTag)) {
											Value.deleteAt(Value.indexOf(ItemTag));
											UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
										}
										return true;  /* Success */
									} else {
										if (UInv.valuesAreEqual(Value, ItemTag)) {
											UInv.DeleteItemProperty(BagName, ItemName, ItemPropertyName);
										}
										return true;  /* Success */
									}
								}
							} else {
								return true;  /* Success - ItemPropertyName doesn't exist, so it's already "deleted" */
							}
						} else {
							UInvError('DeleteItemTag failed. ItemTag not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('DeleteItemTag cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var j = 0, BResult = true;
						for (j = 0; j < BagName.length; j++) {
							if (!UInv.DeleteItemTag(BagName[j], ItemName, ItemPropertyName, ItemTag)) {
								BResult = undefined;
							}
						}
						return BResult;  /* Success (or Error) */
					} else {
						UInvError('DeleteItemTag failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to DeleteItemTag is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeleteItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasTag: Returns true if bag's property contains the tag. */
		BagHasTag : function (BagName, BagPropertyName, BagTag) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isUndefined(BagTag)) {
						if (UInv.BagHasProperty(BagName, BagPropertyName)) {
							var Value = UInv.GetBagPropertyValue(BagName, BagPropertyName);
							if (UInv.isArray(Value)) {
								return UInv.arrayHasTag(Value, BagTag);  /* Success */
							} else {
								return UInv.valuesAreEqual(Value, BagTag);  /* Success */
							}
						} else {
							return false;  /* Success - tag not on bag */
						}
					} else {
						UInvError('BagHasTag failed. BagTag not defined.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagHasTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasTag: Returns true if item's property contains the tag. */
		ItemHasTag : function (BagName, ItemName, ItemPropertyName, ItemTag) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						UInv.SetCurrentBagName(BagName);
						UInv.SetCurrentItemName(ItemName);
						if (!UInv.isUndefined(ItemTag)) {
							if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
								var Value = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
								if (UInv.isArray(Value)) {
									return UInv.arrayHasTag(Value, ItemTag);  /* Success */
								} else {
									return UInv.valuesAreEqual(Value, ItemTag);  /* Success */
								}
							} else {
								return false;  /* Success - tag not on item */
							}
						} else {
							UInvError('ItemHasTag failed. ItemTag not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemHasTag cannot find item "' + ItemName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasAllTags: Returns true if item's property contains the tag. */
		ItemHasAllTags : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
											return false;  /* Success */
										}
									}
									return true;  /* Success */
								} else {
									return UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTagArray);  /* Success */
								}
							} else {
								return false;  /* Success - ItemPropertyName not on item */
							}
						} else {
							UInvError('ItemHasAllTags failed. ItemTagArray not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemHasAllTags cannot find item "' + ItemName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasAllTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasAllTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ItemHasAnyTag: Returns true if item's property contains the tag. */
		ItemHasAnyTag : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
											return true;  /* Success */
										}
									}
									return false;  /* Success */
								} else {
									return UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTagArray);  /* Success */
								}
							} else {
								return false;  /* Success - ItemPropertyName not on item */
							}
						} else {
							UInvError('ItemHasAnyTag failed. ItemTagArray not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ItemHasAnyTag cannot find item "' + ItemName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ItemHasAnyTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ItemHasAnyTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetBagTag: Makes sure it has one of or removes all of tag BagTag based on whether Enabled is true or false, respectively.  Returns true on success. */
		SetBagTag : function (BagName, BagPropertyName, BagTag, Enabled) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					if (UInv.BagExists(BagName)) {
						UInv.SetCurrentBagName(BagName);
						if (!UInv.isUndefined(BagTag)) {
							if (UInv.isBoolean(Enabled)) {
								if (UInv.isArray(BagTag)) {
									var i = 0, AResult = true;
									if (BagTag.length > 0) {
										for (i = 0; i < BagTag.length; i++) {
											if (!UInv.SetBagTag(BagName, BagPropertyName, BagTag[i], Enabled)) {
												AResult = undefined;
											}
										}
									}
									return AResult;  /* Success (or Error) */
								} else if (Enabled) {
									if (UInv.BagHasProperty(BagName, BagPropertyName)) {  /* Make sure it has at least one tag of BagTag */
										if (!UInv.BagHasTag(BagName, BagPropertyName, BagTag)) {
											UInv.AddBagTag(BagName, BagPropertyName, BagTag);
										}
									} else {
										UInv.AddBagTag(BagName, BagPropertyName, BagTag);
									}
									return true;  /* Success */
								} else {
									if (UInv.BagHasProperty(BagName, BagPropertyName)) {  /* Make sure it has no tags of BagTag */
										while (UInv.BagHasTag(BagName, BagPropertyName, BagTag)) {
											UInv.DeleteBagTag(BagName, BagPropertyName, BagTag);
										}
									}
									return true;  /* Success */
								}
							} else {
								UInvError('SetBagTag failed. Enabled is not a boolean.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('SetBagTag failed. BagTag not defined.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SetBagTag cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var j = 0, BResult = true;
						for (j = 0; j < BagName.length; j++) {
							if (!UInv.SetBagTag(BagName[j], BagPropertyName, BagTag, Enabled)) {
								BResult = undefined;
							}
						}
						return BResult;  /* Success (or Error) */
					} else {
						UInvError('SetBagTag failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to SetBagTag is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to SetBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* SetItemTag: Makes sure it has one of or removes all of tag ItemTag based on whether Enabled is true or false, respectively.  Returns true on success. */
		SetItemTag : function (BagName, ItemName, ItemPropertyName, ItemTag, Enabled) {
			if (UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
					ItemName = FixItemName(ItemName);
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
												AResult = undefined;
											}
										}
									}
									return AResult;  /* Success (or Error) */
								} else if (Enabled) {
									if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {  /* Make sure it has at least one tag of ItemTag */
										if (!UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTag)) {
											UInv.AddItemTag(BagName, ItemName, ItemPropertyName, ItemTag);
										}
									} else {
										UInv.AddItemTag(BagName, ItemName, ItemPropertyName, ItemTag);
									}
									return true;  /* Success */
								} else {
									if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {  /* Make sure it has no tags of ItemTag */
										while (UInv.ItemHasTag(BagName, ItemName, ItemPropertyName, ItemTag)) {
											UInv.DeleteItemTag(BagName, ItemName, ItemPropertyName, ItemTag);
										}
									}
									return true;  /* Success */
								}
							} else {
								UInvError('SetItemTag failed. ItemTag not defined.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('SetItemTag cannot find item "' + ItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('SetItemTag cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var j = 0, BResult = true;
						for (j = 0; j < BagName.length; j++) {
							if (!UInv.SetItemTag(BagName[j], ItemName, ItemPropertyName, ItemTag, Enabled)) {
								BResult = undefined;
							}
						}
						return BResult;  /* Success (or Error) */
					} else {
						UInvError('SetItemTag failed. Invalid bag name in BagName array.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to SetItemTag is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to SetItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayByBagTag: Returns an array of bag names for all bags that have BagTag in their BagPropertyName property. */
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
					return Bags;  /* Success */
				} else {
					UInvError('GetBagsArrayByBagTag failed. BagTag parameter is missing.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetBagsArrayByBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAllBagTags: Returns true if the bag's property's value (which must be an array) has an equal or greater number of all tags in BagTagArray.  (true if BagTagArray is empty) */
		BagHasAllBagTags : function (BagName, BagPropertyName, BagTagArray) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						if (UInv.isArray(UInv.GetBagPropertyValue(BagPropertyName)) && UInv.isArray(BagTagArray)) {
							return UInv.arrayHasAllTags(UInv.GetBagPropertyValue(BagPropertyName), BagTagArray);
						} else {
							UInv.Error("Error: BagHasAllBagTags failed. Both BagPropertyName's value and BagTagArray parameter must be arrays.");  /* Error */
							return undefined;
						}
					} else {
						UInvError('BagHasAllBagTags cannot find bag property "' + BagPropertyName + '" on bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagHasAllBagTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasAllBagTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAnyBagTag: Returns true if the bag's property's value (which must be an array) has any of the tags in BagTagArray.  (false if BagTagArray is empty) */
		BagHasAnyBagTag : function (BagName, BagPropertyName, BagTagArray) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						if (UInv.isArray(UInv.GetBagPropertyValue(BagPropertyName)) && UInv.isArray(BagTagArray)) {
							return UInv.arrayHasAnyTag(UInv.GetBagPropertyValue(BagPropertyName), BagTagArray);
						} else {
							UInv.Error("Error: BagHasAnyBagTag failed. Both BagPropertyName's value and BagTagArray parameter must be arrays.");  /* Error */
							return undefined;
						}
					} else {
						UInvError('BagHasAnyBagTag cannot find bag property "' + BagPropertyName + '" on bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagHasAnyBagTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasAnyBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayByAllItemTags: Returns array of item names in bag with all tags. */
		GetItemsArrayByAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayByAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayByAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayByAnyItemTag: Returns array of item names in bag with any tags. */
		GetItemsArrayByAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayByAnyItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayByAnyItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithoutAllItemTags: Returns array of item names in bag without any of the tags. */
		GetItemsArrayWithoutAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
					for (i = 0; i < Items.length; i++) {
						if (!UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayWithoutAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithoutAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithoutAnyItemTags: Returns array of item names in bag without any of the tags. */
		GetItemsArrayWithoutAnyItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
					for (i = 0; i < Items.length; i++) {
						if (!UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayWithoutAnyItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithoutAnyItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayByItemTag: Returns array of item names in bag which have that tag. */
		GetItemsArrayByItemTag : function (BagName, ItemPropertyName, ItemTag) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasTag(BagName, Items[i], ItemPropertyName, ItemTag)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayByItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayByItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWithItemByBagTag: Returns array of bag names from bags with bag tag and item. */
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
				return Result;  /* Success */
			} else {
				UInvError('Name passed to GetBagsArrayWithItemByBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagsArrayWithBothBagTags: Returns array of bag names with both tags on their respective bag properties. */
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
				return Result;  /* Success */
			} else {
				UInvError('Name passed to GetBagsArrayWithBothBagTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithBothItemTags: Returns array of item names with both tags on their respective item properties in a bag. */
		GetItemsArrayWithBothItemTags : function (BagName, ItemPropertyName1, ItemTag1, ItemPropertyName2, ItemTag2) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName1) && UInv.isString(ItemPropertyName2)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = [];
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasTag(BagName, Items[i], ItemPropertyName1, ItemTag1) && UInv.ItemHasTag(BagName, Items[i], ItemPropertyName2, ItemTag2)) {
							Result.push(Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetItemsArrayWithBothItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithBothItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetUniqueBagTagsArray: Returns an array of unique bag tags (no duplicates) for this bag property.  Checks all bags if BagName is undefined. */
		GetUniqueBagTagsArray : function (BagPropertyName, BagName) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isUndefined(BagName)) {
					BagName = UInv.GetBagsArray();
				}
				var Result = [], i = 0;
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
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
								return [].concatUnique(Result);  /* Success */
							} else {
								return [ Tags ];  /* Success */
							}
						} else {
							return [];  /* Success */
						}
					} else {
						UInvError('GetUniqueBagTagsArray cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var Tmp;
						if (BagName.length > 0) {
							for (i = 0; i < BagName.length; i++) {
								Tmp = UInv.GetUniqueBagTagsArray(BagPropertyName, BagName[i]);
								if (UInv.isUndefined(Tmp) || UInv.isUndefined(Result)) {
									Result = undefined;
									break;
								} else {
									Result = Result.concatUnique(Tmp);
								}
							}
						}
						return Result;  /* Success (or Error, shouldn't happen) */
					} else {
						UInvError('BagName array passed to GetUniqueBagTagsArray contains an invalid bag name.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to GetUniqueBagTagsArray is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to GetUniqueBagTagsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetUniqueItemTagsArray: Returns an array unique item tags (no duplicates) for this item property.  Uses all bags if BagName is undefined. */
		GetUniqueItemTagsArray : function (ItemPropertyName, BagName) {
			if (UInv.isString(ItemPropertyName)) {
				if (UInv.isUndefined(BagName)) {
					BagName = UInv.GetBagsArray();
				}
				var Result = [], i = 0;
				if (UInv.isString(BagName)) {
					BagName = FixBagName(BagName);
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
						return Result;  /* Success */
					} else {
						UInvError('GetUniqueItemTagsArray cannot find bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else if (UInv.isArrayOfStrings(BagName)) {
					if (UInv.BagExists(BagName)) {
						var Tmp;
						if (BagName.length > 0) {
							for (i = 0; i < BagName.length; i++) {
								Tmp = UInv.GetUniqueItemTagsArray(ItemPropertyName, BagName[i]);
								if (UInv.isUndefined(Tmp) || UInv.isUndefined(Result)) {
									Result = undefined;
									break;
								} else {
									Result = Result.concatUnique(Tmp);
								}
							}
						}
						return Result;  /* Success (or Error, shouldn't happen) */
					} else {
						UInvError('BagName array passed to GetUniqueItemTagsArray contains an invalid bag name.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('BagName passed to GetUniqueItemTagsArray is not a string or an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('ItemPropertyName passed to GetUniqueItemTagsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetAllUniqueItemTagsArray: Returns an array of all unique item tags in the ItemPropertName property for all items in bag. */
		GetAllUniqueItemTagsArray : function (BagName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
									Result = Result.concatUnique([ Tags ]);  /* Success */
								}
							}
						}
					}
					return Result;
				} else {
					UInvError('GetAllUniqueItemTagsArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetAllUniqueItemTagsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAllItemTags: Returns whether bag's items have all ItemTagArray tags in the ItemPropertyName property among its items. */
		BagHasAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
					return Result === ItemTagArray.length;  /* Success */
				} else {
					UInvError('BagHasAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAnyItemTag: Returns whether any of bag's items have ItemTagArray tag in their ItemPropertyName property. */
		BagHasAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					if (!UInv.isArray(ItemTagArray)) {
						ItemTagArray = [ ItemTagArray ];
					}
					var Tags = UInv.GetAllUniqueItemTagsArray(BagName, ItemPropertyName), i = 0;
					for (i = 0; i < ItemTagArray.length; i++) {
						if (Tags.includes(ItemTagArray[i])) {
							return true;  /* Success */
						}
					}
					return false;  /* Success */
				} else {
					UInvError('BagHasAnyItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasAnyItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetFullItemCountByAllItemTags: Returns full number of items with all item property tags. */
		GetFullItemCountByAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = 0;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							Result += UInv.BagHasItem(BagName, Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetFullItemCountByAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetFullItemCountByAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetFullItemCountByAnyItemTag: Returns full number of items with any item property tags. */
		GetFullItemCountByAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0, Result = 0;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							Result += UInv.BagHasItem(BagName, Items[i]);
						}
					}
					return Result;  /* Success */
				} else {
					UInvError('GetFullItemCountByAnyItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetFullItemCountByAnyItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetBagTagQuantityObject: Returns an object with TagName : TagQuantity pairs.  { "UniqueBagTag1" : QuantityOfBagTag1, ... } */
		GetBagTagQuantityObject : function (BagName, BagPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						var Tags = UInv.GetBagPropertyValue(BagName, BagPropertyName);
						UInv.SetCurrentBagName(BagName);
						if (UInv.isArray(Tags)) {
							var UniqueTags = [].concatUnique(Tags), i = 0, Result = {};
							for (i = 0; i < UniqueTags.length; i++) {
								Result[UniqueTags[i]] = Tags.count(UniqueTags[i]);
							}
							return Result;  /* Success */
						} else {
							var Tmp = {};
							Tmp[Tags] = 1;
							return Tmp;  /* Success */
						}
					} else {
						UInvError('GetBagTagQuantityObject failed. Bag "' + BagName + '" does not have property "' + BagPropertyName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetBagTagQuantityObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetBagTagQuantityObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemTagQuantityObject: Returns an object with TagName : TagQuantity pairs.  { "UniqueItemTag1" : QuantityOfItemTag1, ... } */
		GetItemTagQuantityObject : function (BagName, ItemName, ItemPropertyName) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
								return Result;  /* Success */
							} else {
								var Tmp = {};
								Tmp[Tags] = 1;
								return Tmp;  /* Success */
							}
						} else {
							UInvError('GetItemTagQuantityObject failed. Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetItemTagQuantityObject cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemTagQuantityObject cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemTagQuantityObject is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItemByItemTag: Returns true if any item in bag has tag ItemTag, false if none do, or undefined on error. */
		BagHasItemByItemTag : function (BagName, ItemPropertyName, ItemTag) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasTag(BagName, Items[i], ItemPropertyName, ItemTag)) {
							return true;  /* Success */
						}
					}
					return false;  /* Success */
				} else {
					UInvError('BagHasItemByItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasItemByItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItemWithAllItemTags: Returns true if any items in bag have all tags in ItemTagArray, false if none do, or undefined on error. */
		BagHasItemWithAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							return true;  /* Success */
						}
					}
					return false;  /* Success */
				} else {
					UInvError('BagHasItemWithAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasItemWithAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItemWithAnyItemTag: Returns true if any items in bag have any tags in ItemTagArray, false if none do, or undefined on error. */
		BagHasItemWithAnyItemTag : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0;
					for (i = 0; i < Items.length; i++) {
						if (UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							return true;  /* Success */
						}
					}
					return false;  /* Success */
				} else {
					UInvError('BagHasItemWithAnyItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasItemWithAnyItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItemWithoutAllItemTags: Returns true if any items in bag do not have all tags in ItemTagArray, false if none do, or undefined on error. */
		BagHasItemWithoutAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0;
					for (i = 0; i < Items.length; i++) {
						if (!UInv.ItemHasAllTags(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							return true;  /* Success */
						}
					}
					return false;  /* Success */
				} else {
					UInvError('BagHasItemWithoutAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasItemWithoutAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItemWithoutAnyItemTags: Returns true if any items in bag do not have any tags in ItemTagArray, false if none do, or undefined on error. */
		BagHasItemWithoutAnyItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					UInv.SetCurrentBagName(BagName);
					var Items = UInv.GetItemsArray(BagName), i = 0;
					for (i = 0; i < Items.length; i++) {
						if (!UInv.ItemHasAnyTag(BagName, Items[i], ItemPropertyName, ItemTagArray)) {
							return true;  /* Success */
						}
					}
					return false;  /* Success */
				} else {
					UInvError('BagHasItemWithoutAnyItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to BagHasItemWithoutAnyItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasItemByBagTag: Returns true if any bags with BagPropertyName/BagTag have item, false if none do, or undefined on error. */
		BagHasItemByBagTag : function (BagPropertyName, BagTag, ItemName) {
			if (UInv.isString(BagPropertyName) && UInv.isString(ItemName)) {
				var Bags = UInv.GetBagsArray(), i = 0;
				if (Bags.length > 0) {
					for (i = 0; i < Bags.length; i++) {
						if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasItem(Bags[i], ItemName)) {
							return true;  /* Success */
						}
					}
				}
				return false;  /* Success */
			} else {
				UInvError('Name passed to BagHasItemByBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAllItemsByBagTag: Returns true if any bag with BagPropertyName/BagTag has all of the items in ItemNameArray, false if none do, or undefined on error. */
		BagHasAllItemsByBagTag : function (BagPropertyName, BagTag, ItemNameArray) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isArrayOfStrings(ItemNameArray)) {
					var Bags = UInv.GetBagsArray(), i = 0;
					if (Bags.length > 0) {
						for (i = 0; i < Bags.length; i++) {
							if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasAllItems(Bags[i], ItemNameArray)) {
								return true;  /* Success */
							}
						}
					}
					return false;  /* Success */
				} else {
					UInvError('ItemNameArray passed to BagHasAllItemsByBagTag is not an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to BagHasAllItemsByBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* BagHasAnyItemByBagTag: Returns true if any bag with BagPropertyName/BagTag has any of the items in ItemName/Array, false if none do, or undefined on error. */
		BagHasAnyItemByBagTag : function (BagPropertyName, BagTag, ItemNameArray) {
			if (UInv.isString(BagPropertyName)) {
				if (UInv.isArrayOfStrings(ItemNameArray)) {
					var Bags = UInv.GetBagsArray(), i = 0;
					if (Bags.length > 0) {
						for (i = 0; i < Bags.length; i++) {
							if (UInv.BagHasTag(Bags[i], BagPropertyName, BagTag) && UInv.BagHasAnyItems(Bags[i], ItemNameArray)) {
								return true;  /* Success */
							}
						}
					}
					return false;  /* Success */
				} else {
					UInvError('ItemNameArray passed to BagHasAnyItemByBagTag is not an array of strings.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagPropertyName passed to BagHasAnyItemByBagTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* CopyItemsByItemTag: Copy all items from SourceBagName to DestinationBagName which have ItemTag in the items' ItemPropertyName. */
		CopyItemsByItemTag : function (SourceBagName, DestinationBagName, ItemPropertyName, ItemTag) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (SourceBagName !== DestinationBagName) {
							var Items = UInv.GetItemsArrayByItemTag(SourceBagName, ItemPropertyName, ItemTag), Result = [];
							if (Items.length > 0) {
								var i = 0, Ret;
								for (i = 0; i < Items.length; i++) {
									Ret = UInv.CopyItem(SourceBagName, DestinationBagName, Items[i]);
									if (Ret === undefined) {
										Result = undefined;
									} else if (!UInv.isBoolean(Result)) {
										Result.push(Ret);
									}
								}
							}
							return Result;  /* Success or Error  *** */
						} else {
							UInvError('CopyItemsByItemTag failed. Source and destination bags cannot be the same.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('CopyItemsByItemTag cannot find bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('CopyItemsByItemTag cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to CopyItemsByItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* MoveItemsByItemTag: Move all items from SourceBagName to DestinationBagName which have ItemTag in the items' ItemPropertyName. */
		MoveItemsByItemTag : function (SourceBagName, DestinationBagName, ItemPropertyName, ItemTag) {
			if (UInv.isString(SourceBagName) && UInv.isString(DestinationBagName) && UInv.isString(ItemPropertyName)) {
				SourceBagName = FixBagName(SourceBagName);
				DestinationBagName = FixBagName(DestinationBagName);
				if (UInv.BagExists(SourceBagName)) {
					if (UInv.BagExists(DestinationBagName)) {
						if (SourceBagName !== DestinationBagName) {
							var Items = UInv.GetItemsArrayByItemTag(SourceBagName, ItemPropertyName, ItemTag), Result = true;
							if (Items.length > 0) {
								var i = 0, Ret = "";
								for (i = 0; i < Items.length; i++) {
									Ret = UInv.MoveItem(SourceBagName, DestinationBagName, Items[i]);
									if (UInv.isUndefined(Ret) || UInv.isUndefined(Result)) {
										Result = undefined;
									} else {
										if (UInv.isBoolean(Result)) {
											Result = [ Ret ];
										} else {
											Result.push(Ret);
										}
									}
								}
							}
							return Result;  /* Success */
						} else {
							UInvError('MoveItemsByItemTag failed. Source and destination bags cannot be the same.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('MoveItemsByItemTag cannot find bag "' + DestinationBagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('MoveItemsByItemTag cannot find bag "' + SourceBagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to MoveItemsByItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteItemsByItemTag: Delete all items from BagName which have ItemTag in the items' ItemPropertyName. */
		DeleteItemsByItemTag : function (BagName, ItemPropertyName, ItemTag) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					return UInv.DeleteItem(BagName, UInv.GetItemsArrayByItemTag(BagName, ItemPropertyName, ItemTag));  /* Success */
				} else {
					UInvError('DeleteItemsByItemTag cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to DeleteItemsByItemTag is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetMissingBagTagsArray: Returns an array of all tags in BagTagArray which were not found on the BagPropertyName for that bag, or undefined on error. */
		GetMissingBagTagsArray : function (BagName, BagPropertyName, BagTagArray) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				BagName = FixBagName(BagName);
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
							return Result;  /* Success */
						} else {
							return [];  /* Success */
						}
					} else {
						UInvError('GetMissingBagTagsArray failed. Bag "' + BagName + '" does not have property "' + BagPropertyName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetMissingBagTagsArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetMissingBagTagsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetMissingItemTagsArray: Returns an array of all tags in ItemTagArray which were not found on the items' ItemPropertyName in that bag, or undefined on error. */
		GetMissingItemTagsArray : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
								return Result;  /* Success */
							} else {
								return [];  /* Success */
							}
						} else {
							UInvError('GetMissingItemTagsArray failed. Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetMissingItemTagsArray cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetMissingItemTagsArray cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetMissingItemTagsArray is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRandomBagTagFromRange: Returns a random tag from LowIndex to HighIndex (inclusive), returns undefined on error. */
		GetRandomBagTagFromRange : function (BagName, BagPropertyName, HighIndex, LowIndex) {
			if (UInv.isString(BagName) && UInv.isString(BagPropertyName)) {
				if (UInv.isUndefined(LowIndex)) {
					LowIndex = 0;
				}
				BagName = FixBagName(BagName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasProperty(BagName, BagPropertyName)) {
						var Tags = UInv.GetBagPropertyValue(BagName, BagPropertyName);
						if (UInv.isArray(Tags)) {
							HighIndex = tryIntParse(HighIndex);
							LowIndex = tryIntParse(LowIndex);
							if (UInv.isInteger(HighIndex)) {
								if (UInv.isInteger(LowIndex)) {
									if ((LowIndex >= 0) && (LowIndex <= HighIndex)) {
										if ((HighIndex >= LowIndex) && (HighIndex < Tags.length)) {
											UInv.SetCurrentBagName(BagName);
											return Tags[random(LowIndex, HighIndex)];  /* Success */
										} else {
											UInv.Error("Error: GetRandomBagTagFromRange failed. HighIndex must be >= LowIndex and =< the highest array index for that property's array.");  /* Error */
											return undefined;
										}
									} else {
										UInvError('GetRandomBagTagFromRange failed. LowIndex must be >= 0 and < HighIndex.');  /* Error */
										return undefined;
									}
								} else {
									UInvError('GetRandomBagTagFromRange failed. LowIndex must be an integer.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('GetRandomBagTagFromRange failed. HighIndex must be an integer.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('GetRandomBagTagFromRange failed. Bag property "' + BagPropertyName + '" on bag "' + BagName + '" is not an array.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetRandomBagTagFromRange cannot find property "' + BagPropertyName + '" on bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetRandomBagTagFromRange cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetRandomBagTagFromRange is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetRandomItemTagFromRange: Returns a random tag from LowIndex to HighIndex (inclusive), returns undefined on error. */
		GetRandomItemTagFromRange : function (BagName, ItemName, ItemPropertyName, HighIndex, LowIndex) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				if (UInv.isUndefined(LowIndex)) {
					LowIndex = 0;
				}
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
				if (UInv.BagExists(BagName)) {
					if (UInv.BagHasItem(BagName, ItemName)) {
						if (UInv.ItemHasProperty(BagName, ItemName, ItemPropertyName)) {
							var Tags = UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
							if (UInv.isArray(Tags)) {
								HighIndex = tryIntParse(HighIndex);
								LowIndex = tryIntParse(LowIndex);
								if (UInv.isInteger(HighIndex)) {
									if (UInv.isInteger(LowIndex)) {
										if ((LowIndex >= 0) && (LowIndex <= HighIndex)) {
											if ((HighIndex >= LowIndex) && (HighIndex < Tags.length)) {
												UInv.SetCurrentBagName(BagName);
												UInv.SetCurrentItemName(ItemName);
												return Tags[random(LowIndex, HighIndex)];  /* Success */
											} else {
												UInv.Error("Error: GetRandomItemTagFromRange failed. HighIndex must be >= LowIndex and =< the highest array index for that property's array.");  /* Error */
												return undefined;
											}
										} else {
											UInvError('GetRandomItemTagFromRange failed. LowIndex must be >= 0 and < HighIndex.');  /* Error */
											return undefined;
										}
									} else {
										UInvError('GetRandomItemTagFromRange failed. LowIndex must be an integer.');  /* Error */
										return undefined;
									}
								} else {
									UInvError('GetRandomItemTagFromRange failed. HighIndex must be an integer.');  /* Error */
									return undefined;
								}
							} else {
								UInvError('GetRandomItemTagFromRange failed. Item property "' + ItemPropertyName + '" on item "' + ItemName + '" is not an array.');  /* Error */
								return undefined;
							}
						} else {
							UInvError('GetRandomItemTagFromRange cannot find property "' + ItemPropertyName + '" on item "' + ItemName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetRandomItemTagFromRange cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetRandomItemTagFromRange cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetRandomItemTagFromRange is not a string.');  /* Error */
				return undefined;
			}
		},

		/* ArrayHasAllItemTags: Returns whether all of the item's tags exist in ItemTagArray, or undefined on error. */
		ArrayHasAllItemTags : function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
								return true;  /* Success */
							} else {
								return false;  /* Success */
							}
						} else {
							UInvError('ArrayHasAllItemTags failed. Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('ArrayHasAllItemTags cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('ArrayHasAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to ArrayHasAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithAllItemTags: Returns an array of all items which have all of their tags in ItemTagArray (per the ArrayHasAllItemTags function), [] if ItemTagArray or the bag is empty, or undefined on error. */
		GetItemsArrayWithAllItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
						return Result;  /* Success */
					} else {
						return [];  /* Success */
					}
				} else {
					UInvError('GetItemsArrayWithAllItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithAllItemTags is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemTagCount: Returns the number of times an exact match for Tag is found in an item's tag array, or undefined on error. */
		GetItemTagCount : function (BagName, ItemName, ItemPropertyName, Tag) {
			if (UInv.isString(BagName) && UInv.isString(ItemName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
				ItemName = FixItemName(ItemName);
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
							return Result;  /* Success */
						} else {
							UInvError('GetItemTagCount failed. Item "' + ItemName + '" does not have property "' + ItemPropertyName + '".');  /* Error */
							return undefined;
						}
					} else {
						UInvError('GetItemTagCount cannot find item "' + ItemName + '" in bag "' + BagName + '".');  /* Error */
						return undefined;
					}
				} else {
					UInvError('GetItemTagCount cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemTagCount is not a string.');  /* Error */
				return undefined;
			}
		},

		/* GetItemsArrayWithMostItemTags: Returns an array of all items in BagName that are tied for the most tags from ItemTagArray in ItemPropertyName. */
		GetItemsArrayWithMostItemTags : function (BagName, ItemPropertyName, ItemTagArray) {
			if (UInv.isString(BagName) && UInv.isString(ItemPropertyName)) {
				BagName = FixBagName(BagName);
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
								Result.push(Items[i]);  /* Add item to list */
							} else if (n > Max) {
								Result = [ Items[i] ];  /* New winner for most tags */
								Max = n;
							}
						}
						return Result;  /* Success */
					} else {
						return [];  /* Success */
					}
				} else {
					UInvError('GetItemsArrayWithMostItemTags cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Name passed to GetItemsArrayWithMostItemTags is not a string.');  /* Error */
				return undefined;
			}
		},


		/* UInv Display Functions: */
		/* ======================= */

		/* GetUpdateLocks: Returns the number of locks on updates. */
		GetUpdateLocks : function () {
			if (UInv.isProperty(State.variables, "UInvUpdatesAreLocked")) {
				return State.variables.UInvUpdatesAreLocked;  /* Success */
			}
			return 0;  /* Success */
		},

		/* UpdatesAreLocked: Returns whether automatic display updates are locked or not. */
		UpdatesAreLocked : function () {
			return !!UInv.GetUpdateLocks();  /* Success */
		},

		/* IncrementUpdateLock: Increments the update lock count. */
		IncrementUpdateLock : function () {
			State.variables.UInvUpdatesAreLocked = UInv.GetUpdateLocks() + 1;
			return State.variables.UInvUpdatesAreLocked;  /* Success */
		},

		/* DecrementUpdateLock: Increments the update lock count. */
		DecrementUpdateLock : function () {
			if (UInv.GetUpdateLocks()) {
				if (--State.variables.UInvUpdatesAreLocked === 0) {
					$.wiki("<<unset $UInvUpdatesAreLocked>>");
					UInv.UpdateDisplay();
					return 0;  /* Success */
				} else {
					return State.variables.UInvUpdatesAreLocked;  /* Success */
				}
			}
			UInv.UpdateDisplay();
			return 0;  /* Success */
		},

		/* GetMatchingEventHandlersArray: Returns an array of the handler ID of all handlers that match the parameters passed in (Handler and/or Options are optional). */
		GetMatchingEventHandlersArray : function (Group, Evnt, Options, Handler) {
			if (UInv.isString(Group)) {
				if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
					if (UInv.isString(Evnt)) {
						if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
							var Matches = [], HandlerIDs, Opts, i, j, n;
							if (UInv.isUndefined(Handler)) {
								if (UInv.isUndefined(Options)) {  /* Get all items that match group and event names. */
									return Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);  /* Success */
								} else if (Options === false) {  /* Find all matching items that don't have options. */
									HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
									for (i = 0; i < HandlerIDs.length; i++) {
										if (!UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]], "options")) {
											Matches.push(HandlerIDs[i]);
										}
									}
									return Matches;  /* Success */
								} else {  /* Find items that also match all options. */
									HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
									for (i = 0; i < HandlerIDs.length; i++) {
										n = 0;
										if (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]], "options")) {
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
									}
									return Matches;  /* Success */
								}
							} else if (UInv.isString(Handler)) {
								if (UInv.isUndefined(Options)) {  /* Find items that match handler name. */
									HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
									for (i = 0; i < HandlerIDs.length; i++) {
										if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].handler == Handler) {
											Matches.push(HandlerIDs[i]);
										}
									}
								} else if (Options === false) {  /* Find all matching items that don't have options. */
									HandlerIDs = Object.keys(State.variables.UInvEventHandlers[Group][Evnt]);
									for (i = 0; i < HandlerIDs.length; i++) {
										if (State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]].handler == Handler) {
											if (!UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]], "options")) {
												Matches.push(HandlerIDs[i]);
											}
										}
									}
									return Matches;  /* Success */
								} else {  /* Find items that match handler name and all options. */
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
								return Matches;  /* Success */
							} else {
								UInvError('Handler passed to GetMatchingEventHandlersArray must be undefined or a string.');  /* Error */
								return undefined;
							}
						} else {
							return [];  /* Success - Event doesn't have any handlers */
						}
					} else {
						UInvError('Event passed to GetMatchingEventHandlersArray must be a string.');  /* Error */
						return undefined;
					}
				} else {
					return [];  /* Success - Group doesn't have any handlers */
				}
			} else {
				UInvError('Group passed to GetMatchingEventHandlersArray must be a string.');  /* Error */
				return undefined;
			}
		},

		/* AddEventHandler: Adds an event handler to UInv that will call the setup function or widget when that UInv event is triggered.
							Returns the random handle ID on success, or undefined on error. */
		AddEventHandler : function (Group, Evnt, Handler, Options) {
			if (UInv.isString(Group)) {
				if (UInv.isString(Evnt)) {
					if (UInv.isString(Handler)) {
						var UInvEvents = {
							general : ["MouseDown", "MouseUp"],
							bag : ["Touched"],
							table : ["Accept", "DragStart", "DragStop", "Drop"],
							radialMenu : ["Open", "WedgeClick", "DisabledWedgeClick", "Cancel"],
							cacheImages : ["Loaded", "Error", "Idle"]
						};
						if (UInv.isProperty(UInvEvents, Group)) {
							if (UInvEvents[Group].includes(Evnt)) {
								if (!UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
									State.variables.UInvEventHandlers[Group] = {};
								}
								if (!UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
									State.variables.UInvEventHandlers[Group][Evnt] = {};
								}
								/* Generate unique random handle name */
								var HandleID = "h" + UInv.getRandomHexString();
								while (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt], HandleID)) {
									HandleID = "h" + UInv.getRandomHexString();
								}
								if (UInv.isUndefined(Options)) {
									if (UInv.GetMatchingEventHandlersArray(Group, Evnt, undefined, Handler).length === 0) {  /* Add handler */
										if (UInv.isProperty(setup, Handler) && UInv.isFunction(setup[Handler])) {
											State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "function" };
										} else {
											State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "widget" };
										}
									} else {
										return UInv.GetMatchingEventHandlersArray(Group, Evnt, undefined, Handler)[0];  /* Success - handler already exists */
									}
								} else {  /* Add handler and options */
									if (UInv.isObject(Options)) {
										if (UInv.GetMatchingEventHandlersArray(Group, Evnt, Options, Handler).length === 0) {  /* Add handler */
											if (UInv.isProperty(setup, Handler) && UInv.isFunction(setup[Handler])) {
												State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "function", options: clone(Options) };
											} else {
												State.variables.UInvEventHandlers[Group][Evnt][HandleID] = { handler: Handler, type: "widget", options: clone(Options) };
											}
										} else {
											return UInv.GetMatchingEventHandlersArray(Group, Evnt, Options, Handler)[0];  /* Success - handler already exists */
										}
									} else {
										UInvError('Options passed to AddEventHandler must be undefined or an object.');  /* Error */
										return undefined;
									}
								}
								return HandleID;  /* Success */
							} else {
								UInvError('Event "' + Evnt + '" passed to AddEventHandler is not a valid event for group "' + Group + '".');  /* Error */
								return undefined;
							}
						} else {
							UInvError('Group "' + Group + '" passed to AddEventHandler is not a valid group.');  /* Error */
							return undefined;
						}
					} else {
						UInvError('Handler passed to AddEventHandler must be a string.');  /* Error */
						return undefined;
					}
				} else {
					UInvError('Event passed to AddEventHandler must be a string.');  /* Error */
					return undefined;
				}
			} else {
				UInvError('Group passed to AddEventHandler must be a string.');  /* Error */
				return undefined;
			}
		},

		/* GetEventHandlerByID: Returns a UInv handler object if a matching one is found, or null if one doesn't exist, or undefined on error. */
		GetEventHandlerByID : function (Group, Evnt, HandlerID) {
			if (UInv.isString(Group)) {
				if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
					if (UInv.isString(Evnt)) {
						if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
							if (UInv.isString(HandlerID)) {
								if (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt], HandlerID)) {
									return clone(State.variables.UInvEventHandlers[Group][Evnt][HandlerID]);
								} else {
									return null;  /* Success - HandlerID not found */
								}
							} else {
								UInvError('HandlerID passed to GetEventHandlerByID must be a string.');  /* Error */
								return undefined;
							}
						} else {
							return null;  /* Success - Event doesn't have any handlers */
						}
					} else {
						UInvError('Event passed to GetEventHandlerByID must be a string.');  /* Error */
						return undefined;
					}
				} else {
					return null;  /* Success - Group doesn't have any handlers */
				}
			} else {
				UInvError('Group passed to GetEventHandlerByID must be a string.');  /* Error */
				return undefined;
			}
		},

		/* CallEventHandlerEx: Triggers any matching event handlers and passes the Values object to them.
							   Returns an array of returned objects from all triggered handlers, or undefined on error. */
		CallEventHandlerEx : function (Group, Evnt, Values) {
			if (UInv.isString(Group)) {
				if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
					if (UInv.isString(Evnt)) {
						if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
							/* verify that Values parameter exists and is valid here *** */
							var Result = [], Ret, Handler, i, HandlerIDs = UInv.GetMatchingEventHandlersArray(Group, Evnt, Values);  /* Get specific matching event handlers */
							if (HandlerIDs.length === 0) {  /* Get general matching event handlers */
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
										if (UInv.isGenericObject(State.temporary.UInvReturn)) {
											Result.push(State.temporary.UInvReturn);
										} else {
											Result.push(undefined);
										}
										$.wiki("<<unset _UInvReturn>>");
									}
									$.wiki("<<unset _UInvEvent>>");
								}
							}
							return Result;
						} else {
							return [];  /* Success - Event doesn't have any handlers */
						}
					} else {
						UInvError('Event passed to CallEventHandlerEx must be a string.');  /* Error */
						return undefined;
					}
				} else {
					return [];  /* Success - Group doesn't have any handlers */
				}
			} else {
				UInvError('Group passed to CallEventHandlerEx must be a string.');  /* Error */
				return undefined;
			}
		},

		/* CallEventHandler: Triggers any matching event handlers and passes the Values object to them.
							 Returns a generic object from all of the combined returned objects from all triggered handlers, or undefined on error. */
		CallEventHandler : function (Group, Evnt, Values) {
			if (UInv.isString(Group)) {
				if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
					if (UInv.isString(Evnt)) {
						if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
							/* verify that Values parameter exists and is valid here *** */
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
															Result.stopPropagation = true;  /* Prefer to override default */
														} else {
															Result.stopPropagation = Ret[i].stopPropagation;
														}
														break;
													case "acceptVal":
														if (!Result.acceptVal || !Ret[i].acceptVal) {
															Result.acceptVal = false;  /* Prefer to override default */
														} else {
															Result.acceptVal = Ret[i].acceptVal;
														}
														break;
													case "overrideDefaultAction":
														if (Result.overrideDefaultAction || Ret[i].overrideDefaultAction) {
															Result.overrideDefaultAction = true;  /* Prefer to override default */
														} else {
															Result.overrideDefaultAction = Ret[i].overrideDefaultAction;
														}
														break;
													case "openRadialMenu":
														if (Result.openRadialMenu || Ret[i].openRadialMenu) {
															Result.openRadialMenu = true;  /* Prefer to override default */
														} else {
															Result.openRadialMenu = Ret[i].openRadialMenu;
														}
														break;
													case "radialMenuWedgeItems":
														Result = UInv.combineGenericObjects(Result, Ret[i]);
														break;
													case "radialMenuHandler":  /* modify AddEventHandler to accept an array of handlers, then pass the array created here? *** */
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
															Result.keepOpen = true;  /* Prefer to override default */
														} else {
															Result.keepOpen = Ret[i].keepOpen;
														}
														break;
													case "retryLoad":
														if (Result.retryLoad || Ret[i].retryLoad) {
															Result.retryLoad = true;  /* Prefer to override default */
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
							return {};  /* Success - Event doesn't have any handlers */
						}
					} else {
						UInvError('Event passed to CallEventHandler must be a string.');  /* Error */
						return undefined;
					}
				} else {
					return {};  /* Success - Group doesn't have any handlers */
				}
			} else {
				UInvError('Group passed to CallEventHandler must be a string.');  /* Error */
				return undefined;
			}
		},

		/* DeleteEventHandler: Deletes any matching event handlers.  Returns the number of deleted handlers, or undefined on error. */
		DeleteEventHandler : function (Group, Evnt, Handler, Options) {
			if (UInv.isString(Group)) {
				if (UInv.isProperty(State.variables.UInvEventHandlers, Group)) {
					if (UInv.isString(Evnt)) {
						if (UInv.isProperty(State.variables.UInvEventHandlers[Group], Evnt)) {
							if (UInv.isProperty(State.variables.UInvEventHandlers[Group][Evnt], Handler)) {
								delete State.variables.UInvEventHandlers[Group][Evnt][Handler];
								return 1;  /* Success - Deleted by HandlerID */
							} else {
								var i, HandlerIDs = UInv.GetMatchingEventHandlersArray(Group, Evnt, Options, Handler);
								for (i = 0; i < HandlerIDs.length; i++) {
									delete State.variables.UInvEventHandlers[Group][Evnt][HandlerIDs[i]];
								}
								return HandlerIDs.length;  /* Success */
							}
						} else {
							return 0;  /* Success - Event doesn't have any handlers */
						}
					} else {
						UInvError('Event passed to DeleteEventHandler must be a string.');  /* Error */
						return undefined;
					}
				} else {
					return 0;  /* Success - Group doesn't have any handlers */
				}
			} else {
				UInvError('Group passed to DeleteEventHandler must be a string.');  /* Error */
				return undefined;
			}
		},

		/* FixTableCells: Makes sure each item is assigned a unique cell.  Tries to make sure items will display in table UInvTable if that parameter is used, assuming there is enough room. */
		FixTableCells : function (BagName, UInvTable) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
										MaxCell = (i * j) - 1;  /* move items if they won't display in current table */
									}
								} else {
									UInvError('UInvTable passed to FixTableCells does not match BagName of "' + BagName + '".');  /* Error */
									return undefined;
								}
							} else {
								UInvError('UInvTable passed to FixTableCells is not a UInv table element.');  /* Error */
								return undefined;
							}
						}
						for (i = 0; i < Items.length; i++) {
							if (UInv.ItemHasProperty(BagName, Items[i], "UInvCell")) {
								/* Make sure there are no duplicates */
								Val = UInv.GetItemPropertyValue(BagName, Items[i], "UInvCell");
								if (Val > MaxCell) {
									/* Move item if it won't display in current table */
									while (UInv.GetItemCountWherePropertyEquals(BagName, "UInvCell", Cell) > 0) {
										++Cell;
									}
									UInv.SetItemPropertyValue(BagName, Items[i], "UInvCell", Cell++);
								} else {
									if (UInv.GetItemCountWherePropertyEquals(BagName, "UInvCell", Val) > 1) {
										/* Unmark duplicates */
										Dups = UInv.GetItemsArrayWherePropertyEquals(BagName, "UInvCell", Val);
										Dups.delete(Items[i]);  /* Current item stays put */
										for (j = 0; j < Dups.length; j++) {
											UInv.DeleteItemProperty(BagName, Dups[j], "UInvCell");
										}
									}
								}
							} else {
								/* Give item a cell */
								while (UInv.GetItemCountWherePropertyEquals(BagName, "UInvCell", Cell) > 0) {
									++Cell;
								}
								UInv.SetItemPropertyValue(BagName, Items[i], "UInvCell", Cell++);
							}
						}
					}
					return true;  /* Success */
				} else {
					UInvError('FixTableCells cannot find bag "' + BagName + '".');  /* Error */
					return undefined;
				}
			} else {
				UInvError('BagName passed to FixTableCells is not a string.');  /* Error */
				return undefined;
			}
		},

		/* InitializeRadialMenu: Create radial menu div element. */
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

		/* DisplayRadialMenu: Gets radial menu prepared for use. */
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
			function wedges (ctr, n, r1, r2, gap, clr) {
				var tGap1 = gap/r1, tGap2 = gap/r2;
				var dTheta = (2*Math.PI)/n, paths = [];
				var theta = (-0.5*Math.PI) - (0.5*dTheta), i, start1, start2, end1, end2, path;
				for (i = 0; i < n; i++) {
					if (WedgeItems[i+1] !== undefined) {
						start1 = getPoint(theta + tGap1, r1, ctr);
						end1 = getPoint((theta + dTheta) - tGap1, r1, ctr, start1);
						start2 = getPoint((theta + dTheta) - tGap2, r2, ctr);
						end2 = getPoint(theta + tGap2, r2, ctr, start2);
						path = '<path d="M' + start1.x + ',' + start1.y + ' a' + r1 + ',' + r1 + ' 0 0,1 ' + end1.x + ',' + end1.y;
						path += ' L' + start2.x + ',' + start2.y + ' a' + r2 + ',' + r2 + ' 0 0,0 ' + end2.x + ',' + end2.y + ' z" fill="';
						if (clr == "mask") {  /* wedge mask */
							path += 'white" />';
						} else if (WedgeItems[i+1].disabled !== true) {  /* clickable wedge */
							path += clr + '" class="uinv-wedge" data-id="' + (i+1) + '" data-data="' + WedgeItems[i+1].data;
							path += '" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '" pointer-events="auto">';
							if (showTooltips) {  /* deepscan-disable-line */
								path += '<title> ' + WedgeItems[i+1].hint + '</title>';
							}
							path += '<desc>' + WedgeItems[i+1].hint + '</desc></path>';  /* for blind users */
						} else {  /* disabled wedge */
							path += disabledColor + '" class="uinv-disabled-wedge" data-id="' + (i+1) + '" data-data="' + WedgeItems[i+1].data;
							path += '" stroke="' + disabledStrokeColor + '" stroke-width="' + disabledStrokeWidth + '" pointer-events="auto">';
							if (showTooltips) {  /* deepscan-disable-line */
								path += '<title> ' + WedgeItems[i+1].hint + ' (disabled)</title>';
							}
							path += '<desc>' + WedgeItems[i+1].hint + ' (disabled)</desc></path>';  /* for blind users */
						}
						paths.push(path);
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
							console.log('Warning: Nonexistent DataName "' + DataName + '" passed to WedgeUpate.');  /* Throw a proper error here? *** */
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
						Ret = UInv.CallEventHandler("radialMenu", "WedgeClick", ev);  /* radialMenu WedgeClick event */
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
									UInv.IncrementUpdateLock();
									if (RM.destBag != RM.srcBag) {  /* Move to new bag */
										UInv.MoveItem(RM.srcBag, RM.destBag, RM.draggedItem);  /* handle move failure due to pocket protection *** */
									}
									UInv.SetItemPropertyValue(RM.destBag, RM.draggedItem, "UInvCell", RM.newCellNo);
									UInv.DecrementUpdateLock();
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
									UInv.MoveItem(RM.srcBag, TempBag, RM.draggedItem, Amt);  /* handle move failure due to pocket protection *** */
									UInv.MoveItem(TempBag, RM.destBag, RM.draggedItem);  /* handle move failure due to pocket protection *** */
									UInv.SetItemPropertyValue(RM.destBag, RM.draggedItem, "UInvCell", RM.newCellNo);
									UInv.DeleteBag(TempBag);
									Ret.keepOpen = true;
									UInv.DecrementUpdateLock();
									break;
								case "Take1":
									UInv.IncrementUpdateLock();
									UInv.MoveItem(RM.destBag, RM.srcBag, RM.draggedItem, 1);  /* handle move failure due to pocket protection *** */
									Ret.keepOpen = true;
									UInv.DecrementUpdateLock();
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
							if (RM.droppedOnItem !== "") {
								if (!UInv.ItemsMatch(RM.srcBag, RM.draggedItem, RM.destBag, RM.droppedOnItem)) {  /* Don't allow picking up items when they're not the same type */
									WedgeUpdate(Ret.radialMenuWedgeItems, "Take1", { disabled: true, hint: "Pick up one" });
								} else {
									WedgeUpdate(Ret.radialMenuWedgeItems, "Take1", { disabled: false, hint: "Pick up one (of " + UInv.BagHasItem(RM.destBag, RM.droppedOnItem) + " items)" });
								}
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
						Ret = UInv.CallEventHandler("radialMenu", "DisabledWedgeClick", ev);  /* radialMenu DisabledWedgeClick event */
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
			/* Radial menu init */
			var div = $("#uinv-radial-menu").get(0);
			if (UInv.isUndefined(div)) {
				UInv.InitializeRadialMenu();
				div = $("#uinv-radial-menu").get(0);
			}
			if (!UInv.isArrayOfObjects(WedgeItems)) {
				UInvError('DisplayRadialMenu failed. WedgeItems parameter is not an array of objects.');  /* Error */
				return undefined;
			}
			if (WedgeItems.length === 0) {
				return true;  /* Success */
			}
			if (UInv.isUndefined(Options) || !UInv.isGenericObject(Options)) {
				Options = {};
			}
			div.radialMenuWedgeItems = WedgeItems;
			div.radialMenuHandler = Handler;
			div.radialMenuOptions = Options;
			var Ret = UInv.CallEventHandler("radialMenu", "Open", div);  /* radialMenu Open event */
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
			var num = WedgeItems.length - 1;  /* num = number of outer ring options */
			var r1M = Options.iconSize ? Options.iconSize : 32;  /* r1M = icon height/width in pixels */
			var r2M = Options.radius ? Options.radius : 100;  /* r2M = radial menu radius in pixels */
			var gapM = Options.gap ? Options.gap : 1;  /* gapM = circle and wedge gap size??? */
			var pad = Options.pad ? Options.pad : 2;  /* pad = circle and wedge margin??? */
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
			$(div).find(".uinv-wedge").off();
			$(div).find(".uinv-disabled-wedge").off();
			/* Add wedge hover styling */
			if (!UInv.docHasCSSElement(".uinv-wedge:hover")) {
				var styleEl = document.createElement("style");
				styleEl.title = "uinv-hover";
				document.head.appendChild(styleEl);
				var styleSheet = styleEl.sheet;
				styleSheet.insertRule(".uinv-wedge:hover { fill: " + hoverColor + "; }", 0);
			}
			/* Create the radial menu as an SVG element */
			var svg = '<svg id="uinv-radial-menu-svg" style="display: block; width: ' + w + 'px; height: ' + h + 'px;">';
			/* Centered gradient background */
			svg += '<defs><radialGradient id="Gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">';
			svg += '<stop offset="' + innerGradientOffset + '%" style="stop-color:' + innerGradientColor + '; stop-opacity:' + innerGradientOpacity + '" />';
			svg += '<stop offset="' + outerGradientOffset + '%" style="stop-color:' + outerGradientColor + '; stop-opacity:' + outerGradientOpacity + '" />';
			svg += '</radialGradient>';
			/* Radial menu mask so Gradient background is visible */
			svg += '<mask id="Mask">';
			if (WedgeItems[0] !== undefined) {
				svg += '<circle cx="' + center.x + '" cy="' + center.y + '" r="' + (r1M - (2*gapM)) + '" fill="white" />';
			}
			svg += wedges(center, num, r1M, r2M, gapM, "mask") + '</mask></defs>';
			/* Background circle */
			svg += '<circle id="uinv-radial-menu-bkg" cx="' + center.x + '" cy="' + center.y + '" r="' + r2M + '" fill="url(#Gradient)" mask="url(#Mask)" pointer-events="none" />';
			/* Main circle */
			if (WedgeItems[0] !== undefined) {
				svg += '<circle data-id="0" data-data="' + WedgeItems[0].data + '" cx="' + center.x + '" cy="' + center.y + '" r="' + (r1M - (2*gapM)) + '"';
				if (WedgeItems[0].disabled !== true) {
					svg += ' class="uinv-wedge" fill="transparent" stroke="' + strokeColor + '" stroke-width="' + strokeWidth + '" pointer-events="auto">';
					if (showTooltips) {  /* deepscan-disable-line */
						svg += '<title> ' + WedgeItems[0].hint + '</title>';
					}
					svg += '<desc>' + WedgeItems[0].hint + '</desc></circle>';  /* for blind users */
				} else {
					svg += ' class="uinv-disabled-wedge" fill="' + disabledColor + '" stroke="' + disabledStrokeColor + '" stroke-width="' + disabledStrokeWidth + '" pointer-events="auto">';
					if (showTooltips) {  /* deepscan-disable-line */
						svg += '<title> ' + WedgeItems[0].hint + ' (disabled)</title>';
					}
					svg += '<desc>' + WedgeItems[0].hint + ' (disabled)</desc></circle>';  /* for blind users */
				}
			}
			/* Main wedges */
			svg += wedges(center, num, r1M, r2M, gapM, "transparent") + '</svg>';
			div.style.width = w + "px";
			div.style.height = h + "px";
			/* Starting size and opacity */
			div.style.transform = "scale(0, 0)";
			div.style.opacity = 0;
			$(div).html(svg);
			/* Add center icon/image */
			var thetaM = -0.5*Math.PI, el, elCenter, pic, isImg, i;
			for (i = 0; i < WedgeItems.length; i++) {
				isImg = false;
				if (WedgeItems[i] !== undefined) {  /* Add wedge icons/images */
					pic = WedgeItems[i].icon;
					if ((/^fa-*/).test(pic) && !(/\./).test(pic)) {  /* if icon starts with "fa-" and does not contain ".", then assume it's a Font Awesome glyph */
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
					/* prevent text and images from being highlighted/selected */
					el.style["-webkit-touch-callout"] = "none";  /* iOS Safari */
					el.style["-webkit-user-select"] = "none";  /* Safari */
					el.style["-khtml-user-select"] = "none";  /* Konqueror HTML */
					el.style["-moz-user-select"] = "none";  /* Firefox */
					el.style["-ms-user-select"] = "none";  /* Internet Explorer/Edge */
					el.style["user-select"] = "none";  /* Non-prefixed version, currently supported by Chrome and Opera */
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
			return true;  /* Success */
		},

		/* DisplayItemList: Displays all items in a bag in a single string.   *** Combine items with identical names if possible */
		DisplayItemList : function (BagName, PluralItemPropertyName, EmptyString, SeparatorString, ConjunctionString, SingleItemPropertyName) {
			if (UInv.isString(BagName)) {
				BagName = FixBagName(BagName);
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
						var Result = "", Amt = 0, i;
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
									if (UInv.ItemHasProperty(BagName, Items[i], SingleItemPropertyName)) {
										Result += UInv.GetItemPropertyValue(BagName, Items[i], SingleItemPropertyName);
										if (UInv.GetLastError() !== "") {
											Result += UInv.GetLastError();
											UInv.ClearErrors();
										}
									} else {
										UInvError('DisplayItemList failed. Cannot find single item property "' + SingleItemPropertyName + '" on item "' + Items[i] + '" in bag "' + BagName + '".');  /* Error */
										Result += Items[i];  /* Use fallback item name */
									}
								}
							} else {
								Amt = UInv.numberToAPString(Amt);
								if (PluralItemPropertyName === "") {
									Result += Amt + " " + Items[i];
								} else {
									if (UInv.ItemHasProperty(BagName, Items[i], PluralItemPropertyName)) {
										Result += Amt + " " + UInv.GetItemPropertyValue(BagName, Items[i], PluralItemPropertyName);
										if (UInv.GetLastError() !== "") {
											Result += UInv.GetLastError();
											UInv.ClearErrors();
										}
									} else {
										UInvError('DisplayItemList failed. Cannot find plural item property "' + PluralItemPropertyName + '" on item "' + Items[i] + '" in bag "' + BagName + '".');  /* Error */
										Result += Items[i];  /* Use fallback item name */
									}
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
						return Result;  /* Success */
					}
					return EmptyString;  /* Success */
				} else {
					UInvError('DisplayItemList cannot find bag "' + BagName + '".');  /* Error */
					return '(Error: DisplayItemList cannot display unknown bag "' + BagName + '".)';
				}
			} else {
				UInvError('BagName passed to DisplayItemList is not a string.');  /* Error */
				return '(Error: DisplayItemList cannot display invalid bag name.)';
			}
		},

		/* DisplayArray: Displays all elements in an array in a single string. */
		DisplayArray : function (YourArray, EmptyString, SeparatorString, ConjunctionString, UseAPNumbers) {
			if (arguments.length < 1)  {
				return "nothing";
			}
			if (!UInv.isArray(YourArray)) {
				YourArray = [ YourArray ];
			}
			if (!UInv.isString(EmptyString)) {
				EmptyString = "nothing";
			}
			if (YourArray.length == 0) {
				return EmptyString;
			}
			if (!UInv.isString(SeparatorString)) {
				SeparatorString = ",";
			}
			if (!UInv.isString(ConjunctionString)) {
				ConjunctionString = "and";
			}
			if (!UInv.isString(UseAPNumbers)) {
				UseAPNumbers = false;
			}
			var Result = "", i;
			for (i = 0; i < YourArray.length; i++) {
				if ((i === YourArray.length - 1) && (i !== 0) && (ConjunctionString !== "")) {
					Result += ConjunctionString + " ";
				}
				if (UInv.isNumber(YourArray[i]) && UseAPNumbers) {
					Result += UInv.numberToAPString(YourArray[i]);
				} else {
					Result += YourArray[i];
				}
				if (i < YourArray.length - 1) {
					if (YourArray.length > 2) {
						Result += SeparatorString + " ";
					} else {
						Result += " ";
					}
				}
			}
			return Result;  /* Success */
		},

		/* UpdateDisplay: Updates the display of any data-uinv="X" HTML elements. */
		UpdateDisplay : function (Container) {

			function AcceptHandler(el) {
				/* This gets called once for each droppable element on DragStart */
				if ($(el).data("uinv") == "item") {
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
					el.acceptVal = $(el).hasClass("dragging");  /* drag indicator */
					var Ret = UInv.CallEventHandler("table", "Accept", el);  /* table Accept event */
					if (UInv.isProperty(Ret, "acceptVal")) {
						return Ret.acceptVal;
					} else {
						return $(el).hasClass("dragging");  /* drag indicator */
					}
				} else {
					return false;
				}
			}

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
					if (!UInv.ItemsMatch(SrcBag, DraggedItem, DestBag, DroppedOnItem)) {  /* Don't allow merge of items since they're not the same type */
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
				var Ret = UInv.CallEventHandler("table", "Drop", event);  /* table Drop event */
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
				} else {  /* If return values not set, set with defaults. */
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
				setup.UInvRadialMenuData = {  /* Store data for radial menu events */
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
						if ((SrcBag != DestBag) || (OldCellNo != NewCellNo)) {  /* Make sure item wasn't dropped back at original location */
							if (UInv.ItemsMatch(SrcBag, DraggedItem, DestBag, DroppedOnItem)) {  /* Merge items since they're the same type */
								if (Quant > 1) {
									UInv.DisplayRadialMenu(radialMenuWedgeItems, Pos);
								} else {
									UInv.IncrementUpdateLock();
									if (DestBag != SrcBag) {  /* Move to new bag */
										UInv.MoveItem(SrcBag, DestBag, DraggedItem);  /* handle move failure due to pocket protection *** */
									}
									UInv.SetItemPropertyValue(DestBag, DraggedItem, "UInvCell", NewCellNo);
									UInv.DecrementUpdateLock();
								}
							} else {  /* Swap items */
								UInv.IncrementUpdateLock();
								UInv.SwapItems(SrcBag, DraggedItem, DestBag, DroppedOnItem, "UInvCell");
								UInv.DecrementUpdateLock();
							}
						}
					} else {  /* Change UInvCell to new cell */
						if ((Quant > 1) && (SrcBag != DestBag)) {
							UInv.DisplayRadialMenu(radialMenuWedgeItems, Pos);
						} else {
							UInv.IncrementUpdateLock();
							if (DestBag != SrcBag) {  /* Move to new bag */
								UInv.MoveItem(SrcBag, DestBag, DraggedItem);  /* handle move failure due to pocket protection *** */
							}
							UInv.SetItemPropertyValue(DestBag, DraggedItem, "UInvCell", NewCellNo);
							UInv.DecrementUpdateLock();
						}
					}
				}
			}

			if (UInv.isUndefined(Container)) {
				Container = $("body").not("tw-storydata *");
			} else {
				Container = $(Container);
			}
			var Matches = Container.find("[data-uinv]");
			if (Matches.length > 0) {
				var i, Table, BagName, CellMargin, BorderMargin, CellRows, x, CellCols, y, Row, RowClass, CellClass, ItemClass, IconClass, TextClass, PadTxt, Count, Item, Txt;
				for (i = 0; i < Matches.length; i++) {
					Count = 0;
					if ($(Matches[i]).data("uinv") === "table") {  /* Update tables */
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
						Table.find("[data-uinv='item']").off();  /* Release handlers */
						Table.empty();
						for (x = 0; x < CellRows; x++) {
							Table.append('<div class="' + RowClass + '" id="' + BagName + '-row' + x + '" data-uinv="table-row"></div>');
							Row = Container.find("#" + BagName + "-row" + x);
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
					/* Add update code for future display objects here. */
				}
				if (UInv.isFunction(Container.find("[data-uinv='table-cell']").droppable)) {
					Container.find("[data-uinv='table-cell']")
						.droppable({  /* see: http://api.jqueryui.com/droppable/ & https://jqueryui.com/droppable/ */
							//scope: "UInv",
							accept: AcceptHandler,
							drop: DropHandler
						});
					Container.find("[data-uinv='item']")
						.on("mousedown touchstart", function (ev) {  /* event handler here?  *** */
							if (ev.button == 0) {
								$(this).addClass("grabbing");
							}
						})
						.on("mouseup touchend", function (ev) {  /* event handler here?  *** */
							if (ev.button == 0) {
								$(this).removeClass("grabbing");
							}
						})
						.draggable({  /* see: https://api.jqueryui.com/draggable/ & https://jqueryui.com/draggable/ */
							revert: "invalid",
							containment: "document",
							//scope: "UInv",
							cursor: "grab",
							snap: false,
							start: function (event, ui) {
								if (event.button == 0) {
									$(this).addClass("grabbing");
									$(this).addClass("dragging");  /* drag indicator */
									if (!UInv.isUndefined(event.target.setCapture)) {
										event.target.setCapture();
									}
									var SrcBag = $(this).data("bagname");
									var DraggedItem = $(this).data("itemname");
									event.srcBag = SrcBag;
									event.draggedItem = DraggedItem;
									event.ui = ui;
									UInv.CallEventHandler("table", "DragStart", event);  /* table DragStart event */
									/*
									var Ret = UInv.CallEventHandler("table", "DragStart", event);  // table DragStart event
									if (Ret.someValue != true) {
									}
									*/
								} else {
									event.preventDefault();
								}
							},
							stop: function (event, ui) {
								$(this).removeClass("grabbing");
								$(this).removeClass("dragging");  /* drag indicator */
								var SrcBag = $(this).data("bagname");
								var DraggedItem = $(this).data("itemname");
								event.srcBag = SrcBag;
								event.draggedItem = DraggedItem;
								event.ui = ui;
								UInv.CallEventHandler("table", "DragStop", event);  /* table DragStop event */
								/*
								var Ret = UInv.CallEventHandler("table", "DragStop", event);  // table DragStop event
								if (Ret.someValue != true) {
								}
								*/
							}
						});
				} else {
					/* Page reload from browser (such as CTRL+F5) caused drag-drop to not get set up properly, so retry. */
					setTimeout(UInv.UpdateDisplay, 100);
				}
			}
			return true;
		},


		/* UInv Other Functions: */
		/* ===================== */

		/* GetUserAlerts: Returns the $UInvShowAlerts value (or false if it doesn't exist). */
		GetUserAlerts : function () {
			if (!UInv.isUndefined(setup.UInvUserAlertsDebug)) {  /* Handle "xyzzy" debug override on reload of save file. */
				if (UInv.isUndefined(State.variables.UInvShowAlerts) || State.variables.UInvShowAlerts !== setup.UInvUserAlertsDebug) {
					setup.UInvUserAlertsBackup = State.variables.UInvShowAlerts;
					UInv.SetUserAlerts(setup.UInvUserAlertsDebug);
					console.log('UInv: Game restarted with console logging enabled through debug override. Type "xyzzy" while on game window to cancel.');
				}
			}
			if (UInv.isProperty(State.variables, "UInvShowAlerts")) {
				return State.variables.UInvShowAlerts;
			}
			return false;
		},

		/* SetUserAlerts: Allows the type of error messages returned by UInv to be controlled.  Returns the current value of $UInvShowAlerts. */
		SetUserAlerts : function (ErrorSetting, ErrorStringAddendum) {
			if (!UInv.isUndefined(ErrorSetting)) {
				if (UInv.isInteger(ErrorSetting)) {
					State.variables.UInvShowAlerts = ErrorSetting;
				} else if (ErrorSetting) {
					State.variables.UInvShowAlerts = UInv.ERROR_THROW_ERROR + UInv.ERROR_SHOW_PASSAGE_NAME;  /* Default */
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

		/* ClearErrors: Sets the error string to "". */
		ClearErrors : function () {
			State.variables.UInvLastErrorMessage = "";
			return true;  /* Success */
		},

		/* GetLastError: Returns the last error string.  Also clears error messages if Clear is set to true. */
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
			return Err;  /* Success */
		},

		/* SetMergeItemMethod: Sets the $UInvMergeItemMethod variable which controls how UInv handles cases where functions attempt to merge two non-equal items. */
		SetMergeItemMethod : function (Method) {
			if (!UInv.isUndefined(Method)) {
				if ((Method >=1) && (Method <= 6)) {
					State.variables.UInvMergeItemMethod = Method;
					return true;  /* Sets merge method */
				} else {
					if (!UInv.isProperty(State.variables, "UInvMergeItemMethod")) {
						State.variables.UInvMergeItemMethod = UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES;  /* default */
					}
					return false;  /* Value not valid */
				}
			} else {
				if (!UInv.isProperty(State.variables, "UInvMergeItemMethod")) {
					State.variables.UInvMergeItemMethod = UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES;  /* default */
				}
				return false;  /* Value not valid */
			}
		},

		/* Initialize: Set up variables.  Returns "false" if any were already set, otherwise it returns "true". */
		Initialize : function (ErrorSetting) {

			var ignoredElements = [];  /* Add element names to prevent clicks from triggering events when clicking on those elements.  E.g. ["a", "button"]; */
			function handleMouseDown (ev) {
				var Ret = UInv.CallEventHandler("general", "MouseDown", ev);  /* general MouseDown event */
				if (Ret.stopPropagation === true) {
					ev.stopPropagation();
				}
				if (ev.button == 0) {
					if ((($(ev.target).parents("#story").length > 0) || ($(ev.target).parents().length <= 2))  /* Make sure that the click is in the story area or the background, not on the UI bar */
						&& (ev.clientX < document.documentElement.offsetWidth) && (ev.clientY < document.documentElement.offsetHeight)  /* Ignore clicks on the scrollbar */
						&& !ignoredElements.includes(ev.target.localName))  /* Ignore clicks on certain elements */
					{
						var el = $("#uinv-radial-menu").get(0);
						if (UInv.isUndefined(el)) {
							UInv.InitializeRadialMenu();
						} else {
							if (el.dataset.status == "opened") {  /* Cancel radial menu */
								ev.cancelType = "MouseDown";
								Ret = UInv.CallEventHandler("radialMenu", "Cancel", ev);  /* radialMenu Cancel event (MouseDown) */
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
					if ((($(ev.target).parents("#story").length > 0) || ($(ev.target).parents().length <= 2))  /* Make sure that the click is in the story area or the background, not on the UI bar */
						&& (ev.clientX < document.documentElement.offsetWidth) && (ev.clientY < document.documentElement.offsetHeight)  /* Ignore clicks on the scrollbar */
						&& !ignoredElements.includes(ev.target.localName))  /* Ignore clicks on certain elements */
					{
						var el = $("#uinv-radial-menu").get(0);
						if (UInv.isUndefined(el)) {
							UInv.InitializeRadialMenu();
						} else {
							if (el.dataset.status == "opened") {  /* Cancel radial menu */
								ev.cancelType = "MouseUp";
								var Ret = UInv.CallEventHandler("radialMenu", "Cancel", ev);  /* radialMenu Cancel event (MouseUp) */
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
					if (UInv.isUndefined(ErrorSetting)) {
						UInv.SetUserAlerts(false);
					} else {
						UInv.SetUserAlerts(ErrorSetting);
					}
					Result = false;
				} else {
					if (ErrorSetting) {
						UInv.SetUserAlerts(ErrorSetting);
					}
				}
			} else {
				UInv.SetUserAlerts(setup.UInvUserAlertsDebug);  /* "xyzzy" debug override */
				if (UInv.isUndefined(ErrorSetting)) {
					setup.UInvUserAlertsBackup = false;
				} else {
					setup.UInvUserAlertsBackup = ErrorSetting;
				}
				console.log('UInv: Game reinitialized with console logging enabled through debug override. Type "xyzzy" while on game window to cancel.');
			}
			if (UInv.isProperty(State.variables, "UInvLastErrorMessage")) {
				Result = false;
			}
			UInv.ClearErrors();
			if (UInv.isProperty(State.variables, "UInvMergeItemMethod")) {
				Result = false;
			}
			UInv.SetMergeItemMethod(UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES);  /* default */
			if (UInv.isProperty(State.variables, "UInvEventHandlers")) {
				delete State.variables.UInvEventHandlers;
				State.variables.UInvEventHandlers = {};
				Result = false;
			} else {
				State.variables.UInvEventHandlers = {};
			}
			/* Prepare radial menu */
			var div = $("#uinv-radial-menu").get(0);
			if (UInv.isUndefined(div)) {
				UInv.InitializeRadialMenu();
			}
			/* Set up mouse down and up event handlers */
			$(document).on("mousedown", handleMouseDown);
			$(document).on("mouseup", handleMouseUp);
			$("html").css("height", "100%");  /* Make sure the whole window is covered so horizontal scrollbars can be properly detected. */
			return Result;
		},

		/* Version: Return a string showing the version of UInv. */
		Version : function () {
			return "Universal Inventory System (<a href='https://github.com/HiEv/UInv'>UInv</a>) v0.9.7.3 by HiEv";  /* Success */
		},


		/* ------------------------------------------------------ */
		/*  END OF COPY-AND-PASTE SECTION FOR UPDATING UInv CODE  */
		/* --------------------------8<-------------------------- */


		/* UInv Aliases: */
		/* ============= */

		/* Add your own function aliases here.  Make sure they are not named the same as any of the existing functions. */

		AddToBagValue: function (BagName, BagPropertyName, Amount) {
			return UInv.AddToBagPropertyValue(BagName, BagPropertyName, Amount);
		},

		AddToItemValue: function (BagName, ItemName, ItemPropertyName, Amount) {
			return UInv.AddToItemPropertyValue(BagName, ItemName, ItemPropertyName, Amount);
		},

		ArrayHasAllBagProperties: function (BagName, BagPropertyNameArray) {
			return UInv.BagHasAllProperties(BagName, BagPropertyNameArray);
		},

		ArrayHasAllItemProperties: function (BagName, ItemName, ItemPropertyNameArray) {
			return UInv.ItemHasAllProperties(BagName, ItemName, ItemPropertyNameArray);
		},

		BagArray: function () {
			return UInv.GetBagsArray();
		},

		BagCount: function () {
			return UInv.GetBagCount();
		},

		BagsExist: function (BagNameArray) {
			return UInv.BagExists(BagNameArray);
		},

		BagHasAnyBagTags: function (BagName, BagPropertyName, BagTagArray) {
			return UInv.BagHasAnyBagTag(BagName, BagPropertyName, BagTagArray);
		},

		BagHasAnyItemTags: function (BagName, ItemPropertyName, ItemTagArray) {
			return UInv.BagHasAnyItemTag(BagName, ItemPropertyName, ItemTagArray);
		},

		BagHasContainer: function (BagName) {
			return UInv.BagIsPocket(BagName);
		},

		BagHasProperties: function (BagName, BagPropertyNameArray) {
			return UInv.BagHasProperty(BagName, BagPropertyNameArray);
		},

		CopyBagProperties: function (SourceBagName, DestinationBagName, BagPropertyNameArray) {
			return UInv.CopyBagProperty(SourceBagName, DestinationBagName, BagPropertyNameArray);
		},

		GetBagArrayWithAllProperties: function (BagPropertyNameArray) {
			return UInv.GetBagsArrayWithAllProperties(BagPropertyNameArray);
		},

		GetBagValue: function (BagName, BagPropertyName) {
			return UInv.GetBagPropertyValue(BagName, BagPropertyName);
		},

		GetCellsItemName: function (BagName, Cell) {
			return UInv.GetItemWherePropertyEquals(BagName, "UInvCell", Cell);
		},

		GetHighestBagPropertyValue: function (BagPropertyName, BagNameArray) {
			return UInv.GetBagWithHighestPropertyValue(BagPropertyName, BagNameArray);
		},

		GetHighestBagValue: function (BagPropertyName, BagNameArray) {
			return UInv.GetBagWithHighestPropertyValue(BagPropertyName, BagNameArray);
		},

		GetHighestItemPropertyValue: function (BagName, ItemPropertyName) {
			return UInv.GetItemWithHighestPropertyValue(BagName, ItemPropertyName);
		},

		GetLowestBagPropertyValue: function (BagPropertyName, BagNameArray) {
			return UInv.GetBagWithLowestPropertyValue(BagPropertyName, BagNameArray);
		},

		GetLowestBagValue: function (BagPropertyName, BagNameArray) {
			return UInv.GetBagWithLowestPropertyValue(BagPropertyName, BagNameArray);
		},

		GetLowestItemPropertyValue: function (BagName, ItemPropertyName) {
			return UInv.GetItemWithLowestPropertyValue(BagName, ItemPropertyName);
		},

		GetItemQuantity: function (BagName, ItemName) {
			return UInv.BagHasItem(BagName, ItemName);
		},

		GetItemValue: function (BagName, ItemName, ItemPropertyName) {
			return UInv.GetItemPropertyValue(BagName, ItemName, ItemPropertyName);
		},

		HasItem: function (BagName, ItemName) {
			return UInv.BagHasItem(BagName, ItemName);
		},

		ItemHasAnyTags: function (BagName, ItemName, ItemPropertyName, ItemTagArray) {
			return UInv.ItemHasAnyTag(BagName, ItemName, ItemPropertyName, ItemTagArray);
		},

		ItemIsContainer: function (BagName, ItemName, PocketName) {
			return UInv.ItemHasPocket(BagName, ItemName, PocketName);
		},

		ItemQuantity: function (BagName, ItemName) {
			return UInv.BagHasItem(BagName, ItemName);
		},

		SetBagsPropertyValue: function (BagNameArray, BagPropertyName, Value) {
			return UInv.SetBagPropertyValue(BagNameArray, BagPropertyName, Value);
		},

		SetBagsTouched: function (BagNameArray) {
			return UInv.SetBagTouched(BagNameArray);
		},

		SetBagsUntouched: function (BagNameArray) {
			return UInv.SetBagUntouched(BagNameArray);
		},

		SetBagValue: function (BagName, BagPropertyName, Value) {
			return UInv.SetBagPropertyValue(BagName, BagPropertyName, Value);
		},

		SetItemsPropertyValues: function (BagName, ItemPropertyName, Value) {
			return UInv.SetItemsPropertyValue(BagName, ItemPropertyName, Value);
		},

		SetItemValue: function (BagName, ItemName, ItemPropertyName, Value) {
			return UInv.SetItemPropertyValue(BagName, ItemName, ItemPropertyName, Value);
		},

		UpdateItemProperties: function (BagName, ItemName, ValuesObject) {
			return UInv.SetItemPropertyValues(BagName, ItemName, ValuesObject);
		},

		/* End of aliases. */


		/* UInv Developer Data Functions: */
		/* ============================== */

		/* BagData: This is where you set the default properties and/or
					items for the default bags. */
		BagData: function (DefaultBagType, PropertiesOnly) {
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
			Property values can be strings, numbers, booleans, arrays, maps,
			sets, dates, undefined, null, or generic objects.
			Other objects, such as functions, are unsupported property value
			types.
			Multiple successive case lines with no "break;" between them
			will be treated as different bags with the same properties.
			Quote marks inside strings need to have a backslash before
			them.  (e.g. "Bob said, \"Hello.\"")
			Backslashes will also need a backslash before them.

			New bags should be added in the following format:

			case "unique-lowercase-bag-name-string":
				BagProperties = {
						unique-property-name1-string: property-value1,
						unique-property-name2-string: property-value2,
						...
					};
				BagItems = [

						// String Method = 1 item of that type
						"item-name-string1",

						// Quantity Method = Quantity items of that type
						{ item-name-string2: Quantity },  // Quantity must be an integer

						// Type Method = UInvQuantity items of type UInvDefaultItemType
						{ item-name-string3: { UInvDefaultItemType: "item-type",  UInvQuantity: Quantity } },

						// Creation Method = UInvQuantity items of type UInvDefaultItemType
						{ item-name-string4: { UInvQuantity: Quantity,  property-name1: value1,  ... } },

						...
					];
					// Use the String Method for single items of a default type,
					// the Quantity Method for multiple items of a default type,
					// the Type Method for items whose type doesn't match the item name,
					// or the Creation Method to create items without a default type.
					// All items should be passed as a single array of items.
				break;  // This ends the current "case" statement.

			The BagProperties and BagItems lines are optional.  You can
			leave either of them out if you don't need to set the bag's
			properties or items, respectively.

			For a bag's items, you can add them a couple of ways.  Use the
			String Method (as shown above) for single items of a default type,
			the Quantity Method for multiple items of a default type, the
			Type Method for items whose type doesn't match the item name
			(UInvQuantity defaults to 1 if not included), or the Creation
			Method to create items without a default type.  If you combine the
			Type Method and Creation Method by having "UInvDefaultItemType"
			plus other properties, then it will use the default type and have
			the other properties override that type's default properties.

			Generally it's recommended that you create a default item instead
			of using the Creation Method for adding default items to bags,
			though it can be useful for adding items with no properties, or
			when used in combination with the Type Method.

			Item names must be formatted as described in the ItemData section.

			NOTE: If any of a bag's _properties_ are variable, then in
			BagProperties the property "UInvVariableType" has to be set to
			something (it doesn't matter what).  However, you do *NOT* need
			to add the "UInvVariableType" property if any of the _items_ that
			may be in the bag can vary.

			It's recommended that you list your bags alphabetically both
			to help avoid duplicating names and to make them easier to find
			if you need to modify them later.

			Example bags below can be removed.

		YOUR DEFAULT BAGS GO BELOW THIS LINE.  */

		/* Start of example bags. */

				case "backpack":
					BagProperties = { maxCarryWeight: 20 };  /* This sets the "maxCarryWeight" property of the "backpack" type bag to 20. */
					BagItems = [ "pants", "belt", { dagger: 2 } ];  /* This adds 1 pants, 1 belt, and 2 dagger items to the backpack.  Single items do not need {} around them. */
					break;  /* This ends the current "case" statement. */

				case "clothing":
					BagProperties = { description: "A pile of clothing." };
					BagItems = [
						/* This adds 1 "shoes" (of type "shoes") */
						"shoes",
						/* This adds 4 "pants" (of type "pants") */
						{ "pants": 4 },
						/* This adds 2 "black belt" (of type "belt") */
						{ "black belt": {
							UInvDefaultItemType: "belt",
							UInvQuantity: 2,
							/* override default belt "description" property */
							description: "A black belt." }
						},
						/* This creates 3 "shirt" as described */
						{ "shirt": {
							UInvQuantity: 3,
							type: ["clothing"],
							singular: "a shirt",
							plural: "shirts",
							place: ["torso2"],
							size: 3,
							image: "icon_cloth_shirt1.png",
							description: "An ordinary white shirt." }
						}
					];
					break;

				case "treasure bag":
					BagProperties = {
						UInvVariableType: true,  /* If a bag's *properties* are variable, like this one, then the UInvVariableType bag property has to be set to something (it doesn't matter what). */
						quality: ["new", "average", "worn"].random()  /* Picks a random bag quality level. */
					};
					BagItems = [
						{ "gold coin": random(2, 20) },  /* Each bag randomly has 2 to 20 coins and a random item from the treasures bag item list. */
						UInv.BagData("treasures").random()  /* Adds 1 random treasure from the "treasures" type bag below in the next case statement. */
					];
					break;

				case "treasures":  /* This is used as a list of possible random treasures by "treasure bag" type bag above. */
					BagItems = [ "pants", "belt", "dagger", "shortsword", "heavy mace", "rainbow potion" ];
					break;

				case "suit pocket":  /* This bag is for an infinite loop test, since it will have a suit in each suit pocket.  Normally you should avoid such loops. */
					BagProperties = { maxCarryWeight: 5 };
					BagItems = [ "suit" ];
					break;

		/* End of example bags. */

		/* YOUR DEFAULT BAGS GO ABOVE THIS LINE. */

				default:
					return undefined;  /* Bag not found */
			}
			if (PropertiesOnly) {
				return BagProperties;
			} else {
				return BagItems;
			}
		},


		/* ItemData: This is where you set the default properties for the
					 default items. */
		ItemData: (function () {
			var Items = {};

		/*  IMPORTANT!:	   --Static Items Information--
			Items with consistent default property values are "static items".
			Items with property values that may vary are "variable items".
			Item names must be unique strings in all lowercase.
			Item names cannot be "uinvtouched", "uinvproperties",
			"uinvdefaultbagtype", "uinvcontainer", "-" (the minus sign),
			or "" (an empty string); they're reserved for use by UInv.
			Property names can be upper and/or lowercase strings.
			Property names with spaces in them must be inside quotes.
			Property names are case sensitive, so a property named "XYZ"
			is different from properties named "Xyz" or "xyz".
			Item and property names cannot start with a number.
			An item cannot have more than one property with the same name.
			An item cannot have a property named "UInvQuantity" or
			"UInvDefaultItemType", they're reserved for use by UInv.
			Property values can be strings, numbers, booleans, arrays, maps,
			sets, dates, undefined, null, or generic objects.
			Other objects, such as functions, are unsupported property value
			types.
			Quote marks inside strings need to have a backslash before
			them.  (e.g. "Bob said, \"Hello.\"")
			Backslashes will also need a backslash before them.

			Static items should be added in the following format:

			Items.itemname = { property-name-string1: property-value1,
							property-name-string2: property-value2,
							etc...
							};

			"itemname" must be a unique, lowercase, alphanumberic string which
			cannot start with a number.  If it contains a space then it needs
			to be in this format:

			Items['item name'] = { property-name-string1: property-value1,
								property-name-string2: property-value2,
								etc...
								};

			If an item's properties are variable, then they should be set in
			the "variable items" section instead (see below).

			It's recommended that you list your items alphabetically both
			to help avoid duplicating names and to make them easier to find
			if you need to modify them later.

			Example items below can be removed.

		YOUR DEFAULT -STATIC ITEMS- GO BELOW THIS LINE.  */

		/* Start of example static items. */

			Items.backpack = {
				type: ["wearable", "container"],
				UInvPocket: { inside: "backpack", "front pocket": "-" },  /* pockets: "inside" and "front pocket" */
				singular: "a backpack",
				plural: "backpacks",
				size: 7,
				image: "backpack.png",
				description: "A leather satchel with a pocket on the front and sturdy straps so you can wear it on your back."
			};

			Items.belt = { type: ["clothing"], singular: "a belt", plural: "belts", place: ["hips1"], size: 2, image: "icon_belt1.png", description: "A basic leather belt." };

			Items.dagger = { type: ["weapon", "stabbing", "1-handed"], singular: "a dagger", plural: "daggers", size: 2, image: "icon_dagger3.png", description: "A small dagger." };

			Items["gold coin"] = { type: ["money"], singular: "a gold coin", plural: "gold coins", size: 0, image: "coin.png", description: "Gold coins are the standard currency." };

			Items["heavy mace"] = { type: ["weapon", "blunt", "2-handed"], singular: "a heavy mace", plural: "heavy maces", size: 6, image: "Heavy_Mace.png", description: "A heavy mace with pointy flanges on it." };

			Items.pants = { type: ["clothing"], singular: "a pair of pants", plural: "pairs of pants", place: ["hips2"], size: 4, image: "icon_cloth_pants1.png", description: "A pair of pants." };

			Items.shoes = { type: ["clothing"], singular: "a pair of shoes", plural: "pairs of shoes", place: ["feet1"], size: 2, image: "icon_LEATHER_boots1.png", description: "A pair of shoes." };

			Items.shortsword = { type: ["weapon", "slashing", "1-handed"], singular: "a short sword", plural: "short swords", size: 4, image: "icon_sword_short1.png", description: "A shortsword." };

			Items.suit = { type: ["clothing", "container"], UInvPocket: { pocket: "suit pocket" }, singular: "a suit jacket", plural: "suit jackets", place: ["torso1"], size: 5, image: "icon_chain_breast.png", description: "A classic black suit jacket with a pocket." };  /* This item is for an infinite loop test, since it will have a suit in each suit pocket.  Normally you should avoid such loops. */

		/* End of example static items. */

		/* YOUR DEFAULT -STATIC ITEMS- GO ABOVE THIS LINE. */

			return function (DefaultItemType) {
				if (!UInv.isString(DefaultItemType)) {
					UInvError('ItemData failed. DefaultItemType is not a string.');  /* Error */
					return undefined;
				}
				var Item = undefined;  /* jshint ignore:line */
				switch(DefaultItemType) {

			/*  IMPORTANT!:	   --Variable Items Information--
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
					Item = { property-name-string1: property-value1,
							property-name-string2: property-value2,
							... };
					break;  // This ends the current "case" statement.

				Example items below can be removed.

			YOUR DEFAULT -VARIABLE ITEMS- GO BELOW THIS LINE.  */

			/* Start of example variable items. */

					case "bow":  /* Gives you a bow with 10 to 20 arrows. */
						Item = {
							arrows: random(10, 20),
							type: ["weapon", "ranged", "piercing", "2-handed"],
							singular: "a bow",
							plural: "bows",
							size: 5,
							image: "bow.png",
							description: "A bow." };
						break;  /* This ends the current "case" statement. */

					case "rainbow potion":  /* This produces a potion item of a random color. */
						var color = ["red", "orange", "yellow", "green", "blue", "purple"].random();  /* Randomly picks a color. */
						var article = color === "orange" ? "an " : "a ";  /* Sets the "article" variable to "a ", unless the color equals "orange", in that case it sets it to "an ". */
						Item = {
							UInvVariableType: color,  /* Because this item's property values can vary, the "UInvVariableType" property has to be set to something. */
							type: ["potion"],
							singular: article + color + " potion",
							plural: color + " potions",
							size: 1,
							image: "potion" + color.toUpperFirst() + ".png",
							description: article.toUpperFirst() + color + " potion."
						};
						break;  /* This ends the current "case" statement. */

			/* End of example variable items. */

			/* YOUR DEFAULT -VARIABLE ITEMS- GO ABOVE THIS LINE. */

				}
				if (UInv.isUndefined(Item)) {  /* If it's not a variable type... */
					if (UInv.isProperty(Items, DefaultItemType)) {
						return clone(Items[DefaultItemType]);  /* Static item */
					} else {
						return undefined;  /* Item not found */
					}
				} else {  /* If it *is* a variable type... */
					if (!UInv.isProperty(Item, "UInvVariableType")) {  /* Add UInvVariableType property if it's missing. */
						Item.UInvVariableType = true;
					}
					return Item;  /* Variable item */
				}
			};
		})(),

/* OPTIONAL: You can list the names of your default bags here so
			 you can find them by searching "UInv.BagList[index]". */
		BagList: ["backpack", "clothes", "treasure bag", "treasures", "suit pocket"],

/* OPTIONAL: You can list the names of your default items here so
			 you can find them by searching "UInv.ItemList[index]". */
		ItemList: ["backpack", "belt", "bow", "dagger", "gold coin", "heavy mace", "pants", "rainbow potion", "shoes", "shortsword", "suit"]
	};
})();
window.UInv = new UInvObject();  /* Create the UInv object */

/* NOTE:
   It's recommended that you pass "UInv.Initialize" (below) the value
	 of "UInv.ERROR_THROW_ERROR" and/or "UInv.ERROR_TO_CONSOLE" when
	 testing your code.
*/
UInv.Initialize(UInv.ERROR_NONE);  /* Readies UInv variables and events */

/* Uncomment the line following this comment (remove the leading "// ")
   and set it to something else if you prefer a different manner of
	 dealing with item collisions.
*/
// UInv.SetMergeItemMethod(UInv.MERGE_USE_ONLY_DESTINATION_PROPERTIES);

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

/* -- End of Universal Inventory System (UInv) code -- */
