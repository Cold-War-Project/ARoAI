If you are creating a total conversion or any other massive overhaul mod where you are changing vanilla buildings a lot
while adding a bunch of new buildings, the recommended way of making it compatible with ARoAI is to create compatibility
patch that will just overwrite vanilla ARoAI files instead of using actual compatibility patch system, as this would
better fit a situation where you change the base game enough for it to become something completely different.

Use information provided in compatibility_patches.txt, but with the following remarks:

- Don't register any IDs.
- Create your own version of main building table and use it with /tools/vanilla_building_types.js script.
- Use file structure similar to that of main ARoAI files.
- Overwrite generated vanilla static data with the result of the script execution.
- Create effects and triggers for all the buildings in your table similar to how it's described in the compatibility
  patch instruction and files of its example structure.

This way you are replacing vanilla with your own vanilla, in a sense. Regular compatibility patches for ARoAI will work
just fine with yours as well.

Overwriting allows you to make government building compatible as well, but this will be much less straightforward as you
are required to have a proper understanding of how ARoAI works to do this, and there are a lot, like a lot of different
parts of the code you would need to edit to introduce a new government building.
