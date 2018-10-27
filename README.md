# Universal Inventory System (UInv) for Twine&nbsp;2/SugarCube&nbsp;2

The "**Universal Inventory System**" (**UInv**) is an inventory system for Twine&nbsp;2 / SugarCube&nbsp;2 written in JavaScript which is meant to simpify handling inventories for new Twine users.

The way **UInv** works is that there are two objects, "**bags**" and "**items**".  "**Bags**" are containers which have their own properties that you can customize.  Bags can also contain "**items**", which are collections of properties that you can pre-define in the code and then easily create, move from bag to bag, delete, etc...

So, for example, you could have a "bag" which represents the player's backpack, another "bag" which represents what they're holding, and a bunch of other "bags" which represent the various rooms the player will travel to.  You could then populate those room "bags" with items.  Then, when the player travels to that room they could see all of the items there, and the items' properties could be used by the code to determine how the player can interact with those items.  You could even make the player's description a "bag" and have the "items" in it represent the player's various stats, skills, and physical descriptions.

There are also "**tags**", which are basically arrays of values on a property of a bag or item. If you have a property that uses an array of values, you will be able to use the various "tag" functions to group items by whether they have particular "tags" in that property's array. This way you could, for example, get a list of all of the items in a bag that have the tag of "crafting material" in their "Type" property.

Then there is the **display** layer, which will make it easy for you to add inventory tables, pop-up radial menus, health bars, a "clothing mannequin" (for dressing and equipping characters), a "shop" interface (to make buying and selling items easier), styelable drop-down menus with pictures, and more.

Anyways, that's the basic idea of the code.  Once it's closer to done I plan on writing proper documentation for it, doing function testing, making some sample code, and then posting it here.

Current progress (as of October 26, '18):
 - ~97% done on the base coding by function (240 out of 248+ currently proposed functions).
 - Very little sample code or testing done yet.
 - Documentation skeleton written.  Additional details and examples to be added later.

You can take a look at an early version of the help file at the link below:

http://bit.ly/UInvHelp  (work in progress)

or some simple introductory sample code can be found at the following link:

http://bit.ly/UInvSampleCode  (work in progress)

Those are also included in the .zip file available here.  You can import those into Twine to see how they work.

### -- HiEv
