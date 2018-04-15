# Universal Inventory System (UInv) for Twine&nbsp;2/SugarCube&nbsp;2

The "**Universal Inventory System**" (**UInv**) is an inventory system for Twine 2 / SugarCube 2 written in JavaScript which is meant to simpify handling inventories for new Twine users.

The way **UInv** works is that there are two objects, "**bags**" and "**items**".  "**Bags**" are containers which have their own properties that you can customize.  Bags can also contain "**items**", which are collections of properties that you can pre-define in the code and then easily create, move from bag to bag, delete, etc...

So, for example, you could have a "bag" which represents the player's backpack, another "bag" which represents what they're holding, and a bunch of other "bags" which represent the various rooms the player will travel to.  You could then populate those room "bags" with items.  Then, when the player travels to that room they could see all of the items there, and the items' properties could be used by the code to determine how the player can interact with those items.  You could even make the player's description a "bag" and have the "items" in it represent the player's various stats, skills, and physical descriptions.

There are also "**tags**", which are basically arrays of values on a property of a bag or item. If you have a property that uses an array of values, you will be able to use the various "tag" functions to group items by whether they have particular "tags" in that property's array. This way you could, for example, get a list of all of the items in a bag that have the tag of "crafting material" in their "Type" property.

Anyways, that's the basic idea of the code.  Once it's closer to done I plan on writing proper documentation for it, doing function testing, making some sample code, and then posting it here.

Current progress:
 - ~70% done on coding (110 out of 156 currently proposed functions).
 - Very little sample code, testing, or documentation complete.

I'm currently looking for pre-release testers, especially those willing to create mock-ups and text showing how they want the inventory system to work in their Twine projects.  If you're interested, email me at: **HiEv (5\*9-2) at Yahoo dot com** .

### -- HiEv
