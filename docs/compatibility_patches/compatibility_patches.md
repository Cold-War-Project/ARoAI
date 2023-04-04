ARoAI doesn't support modded buildings without a compatibility patch. Here's how to create one:

0. You can't make any agriculture and most government buildings compatible with ARoAI for the moment due to various
   limitations, but for resource and industry buildings it shouldn't be a problem.

1. Get ID for your future patch here: https://github.com/Anbeeld/ARoAI/issues/4

2. Get ID for all the buildings in the mod here: https://github.com/Anbeeld/ARoAI/issues/5

3. Create a building table. The main building table may be found in /tools/vanilla_building_types.js, while an example
   of modded building table may be found in /tools/compatibility_patches.js
   The easiest way to do this is by finding a vanilla building that is the most similar to your modded one, copying it
   and then making changes like different key, id and so on. Out of all the attributes you'll need to edit only 3 or 4
   for most buildings. Meaning of every attribute is described in /tools/vanilla_building_types.js

4. Copy contents of /tools/compatibility_patches.js file to where you'll execute this JavaScript code, which is anywhere
   from browser console (F12) to whatever site you'll get by typing "run js code" in Google. Change compatibility patch
   ID from 1 to yours and insert your building table where the file says to do so. Now run the code and save the result.

5. Create file structure similar to the example one in your compatibility patch folder. It is highly recommended to name
   your files like zzz_aroai_compatibility_X_triggers.txt to be completely safe, where X is your compatibility patch ID.

6. Paste parts of JavaScript execution result separated by comments into effects and triggers respectively.

7. Create "evaluate" scripted effect for every modded building. Check file in scripted_effects folder of example file
   structure to learn how to do it and /src/common/scripted_effects/aroai_static_data_effects.txt for various other
   examples. If your target mod has any special buildings, something like canals or Eiffel Tower in vanilla, you would
   need to add aroai_construct_special_buildings_X effect as well to provide the AI with an ability to construct them.

8. Create "consider", "sanction" and "allocate" scripted triggers for every modded building. File in scripted_triggers
   folder of example file structure will help you to learn how to do it, and for more various examples you can check
   /src/common/scripted_triggers/aroai_static_data_triggers.txt file.

Note: steps 7 and 8 also include all the vanilla buildings that were changed by your target mod in terms of what goods
they produce or which technology is required to construct them. You need to copy scripted effects and triggers of these
buildings from ARoAI files into files of your compatibility patch and edit them to reflect changes of the target mod.
For example, if it splits furniture manufacturies with luxury furniture manufacturies now being separate, not only you
need to add support for luxury ones, but also edit static data for vanilla building by removing luxury furniture from
its construction conditions, as with the mod applied furniture manufacturies are not capable of producing it anymore.

9. Launch the game with the mod you are creating the patch for, ARoAI and your new compatibility patch in this order.
   ARoAI may actually go before other mods, but compatibility patches always being at the end is a strict requirement.
   AI countries should build modded buildings through their government queue now. If they do not or if you are getting
   nasty stuff in error.log, start with retrying every step of the instruction, ensure you haven't made any mistakes,
   compare your effects and triggers with what you can find in example file structure and static data files of ARoAI.
