# Universal Inventory System (UInv) for Twine&nbsp;2/SugarCube&nbsp;2

The "**Universal Inventory System**" (**UInv**) is an inventory system for Twine&nbsp;2 / SugarCube&nbsp;2 written in JavaScript which is meant to simpify handling inventories for new Twine users.

You can always find the latest release here:  https://github.com/HiEv/UInv/releases

The way **UInv** works is that there are two objects, "**bags**" and "**items**".  "**Bags**" are containers which have their own properties that you can customize.  Bags can also contain "**items**", which are collections of properties that you can pre-define in the code and then easily create, move from bag to bag, delete, etc...

So, for example, you could have a "bag" which represents the player's backpack, another "bag" which represents what they're holding, and a bunch of other "bags" which represent the various rooms the player will travel to.  You could then populate those room "bags" with items.  Then, when the player travels to that room they could see all of the items there, and the items' properties could be used by the code to determine how the player can interact with those items.  You could even make the player's description a "bag" and have the "items" in it represent the player's various stats, skills, and physical descriptions.

"Items" can also have "**pockets**" (which are "bags" attached to that "item"), and "bags" can have "**containers**" (which are "items" that are connected to that "bag").  UInv will automatically maintain the relationship between these "containers" and their "pockets".  For example, a "suit" item/container could have a "suit pocket" bag/pocket, where other items could be stored.

There are also "**tags**", which are basically arrays of values on a property of a bag or item. If you have a property that uses an array of values, you will be able to use the various "tag" functions to group items by whether they have particular "tags" in that property's array. This way you could, for example, get a list of all of the items in a bag that have the tag of "crafting material" in their "Type" property.

Then there is the **display** layer, which will make it easy for you to add inventory tables, pop-up radial menus, health bars, a "clothing mannequin" (for dressing and equipping characters), a "shop" interface (to make buying and selling items easier), styelable drop-down menus with pictures, and more.

For more information, you can take a look at an early version of the UInv help file at the link below:

https://hiev-heavy-ind.com/UInv/UInv_Help_File.html  (work in progress)

and some simple introductory UInv sample code can be found at the following link:

https://hiev-heavy-ind.com/UInv/UInv_Sample_Code.html  (work in progress)

Those are also included in [the .ZIP file available here](https://github.com/HiEv/UInv/releases).  You can import those into Twine 2 to see how they work.

Current progress (as of September 9, '19):
 - ~97% done on the base coding by function (293 out of 303+ currently proposed items).
 - Very little sample code done yet.
 - Preliminary testing begun (37 out of 293 functions fully tested, plus many partial tests).
 - Documentation skeleton written.  Additional details and examples to be added later.
 - Item and Table "builders" mostly written (see help file), other builders to come.

**Note:**  There's a bug in the v0.9.7.2 version of the **BagHasAllItems()**, **BagHasAnyItem()**, and **GetAllBagPockets()** functions, as well as failure to update UInv elements placed outside of a passage.  Use the [v0.9.7.3 bugfix code](https://github.com/HiEv/UInv/blob/master/UniversalInventorySystem.js) to avoid those problems.

 If you would like to support this project, you can do so via [Patreon](https://www.patreon.com/HiEv) or [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EA6ATKEY5463A&source=url).

### -- HiEv
