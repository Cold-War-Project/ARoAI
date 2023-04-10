import fs from "fs";

let string = "",
  part = "",
  free = "",
  dc = 5 /* Default crucial */,
  numCompatibilityPatches = 200;

/*

[0] Key         Building key as in game files.
[1] ID          Unique identification number. Required cause building key is a text so it can't be stored in variables.
[2] Class       ...that the building belongs to. Based on building groups as in game files, but classes are more broad.
[3] Counter     Is used to stop script from queueing the same building after X times. Usually counter = id, but some
                buildings share the same counter for all of them if they produce the same goods, e.g. farms.
[4] Order       When buildings have the same priority, they are queued based on this order value. It's here mostly to
                solve dependencies, e.g. tools before mines, mines before industries etc.
[5] Limit       Setting to change the limit of queueing the same building, see Counter. Can be set on scale from 1 to 9,
                where 5 is default, smaller values reduces the limit, higher values increase it.
[6] Crucial     Rating of how crucial this building is for country and economy. When priority <= crucial, many
                of the usual limitations are partially or fully ignored to construct this building at any cost.
[7] Workforce   Determines if workforce limitations are applied to this building, 0 = false, 1 = true. E.g. if we need
                railways due to market access going down we don't really care if there is free workforce right now.
[8] Allocate    Informs the script on how much aptitude levels are there in allocate trigger of this building. E.g. if
                allocate trigger of the building have some conditions for $aptitude$ = 1 and $aptitude$ = 2, then this
                allocate field must be set to 2. If set to false it'll default to allocate value of building's class.
[9] Branching   Are states getting filtered by stuff like being incorporated for this building? 0 = false, 1 = true.
[10] Scaling    Does economy of scale apply to this building? 0 = false, 1 = true.


Order of buildings
1) construction_sector
2) government_administration
3) railway, port
4) oil_rig, tooling_workshops, power_plant
5) logging_camp, whaling_station, coal_mine, iron_mine, sulfur_mine, livestock_ranch, cotton_plantation
6) lead_mine, rubber_plantation, paper_mills, chemical_plants, steel_mills
7) glassworks, motor_industry, arms_industry, munition_plants
8) electrics_industry, war_machine_industry, shipyards
9) university, barracks, naval_base
10) wheat_farm, rye_farm, rice_farm, maize_farm, millet_farm
11) gold_mine, dye_plantation, opium_plantation, silk_plantation
12) textile_mills, furniture_manufactories, synthetics_plants
13) fishing_wharf, banana_plantation, sugar_plantation
14) tobacco_plantation, food_industry
15) tea_plantation, coffee_plantation, arts_academy

*/

interface BuildingData {
  key: string;
  id: number;
  class: number;
  counter: boolean;
  order: number;
  limit: number;
  crucial: number;
  wforce: boolean;
  alloc: number | boolean;
  branch: boolean;
  scaling: boolean;
}

const data = fs.readFileSync("buildings.csv", "utf8");

const constructBuildingsObjectArray = (data: string): BuildingData[] => {
  const outArr: BuildingData[] = [];
  const lines: string[] = data.split("\r");
  lines.forEach((line, index) => {
    if (index === 0) return;
    const lineData = line.split(",");
    const buildingData: BuildingData = {
      key: lineData[0],
      id: parseInt(lineData[1]),
      class: parseInt(lineData[2]),
      counter: lineData[3] === "true",
      order: parseInt(lineData[4]),
      limit: parseInt(lineData[5]),
      crucial: parseInt(lineData[6]),
      wforce: lineData[7] === "true",
      alloc: lineData[8] === "true" ? true : parseInt(lineData[8]),
      branch: lineData[9] === "true",
      scaling: lineData[10] === "true",
    };
    outArr.push(buildingData);
  });
  return outArr;
};

const buildings = constructBuildingsObjectArray(data);

interface BuildingClass {
  group: string;
  id: number;
  allocate: number;
}

let classes: BuildingClass[] = [
  //  [0]                   [1]   [2]
  //  group                 id    allocate
  { group: "government", id: 1, allocate: 1 },
  { group: "infrastructure", id: 2, allocate: 1 },
  { group: "military", id: 3, allocate: 2 },
  { group: "resource", id: 4, allocate: 2 },
  { group: "agriculture", id: 5, allocate: 2 },
  { group: "industry", id: 6, allocate: 1 },
];

/*
    Place result code below into an end of the aroai_static_data_effects.txt file
*/

string += `
# -----------------------------------------------------------------------------------
# Effects below were generated with a modding tool and should not be changed manually
# -----------------------------------------------------------------------------------\n`;

string += `
aroai_construct_special_buildings_compatibility = {
    every_in_global_list = {
        variable = aroai_compatibility_patches
        switch = {
            trigger = this`;
for (var i = 1; i <= numCompatibilityPatches; i++) {
  part += i + ` = { aroai_construct_special_buildings_` + i + ` = yes }`;
  if (i % 2 == 0 || i == numCompatibilityPatches) {
    string +=
      "\n            " +
      part.replace(/\n/g, " ").replaceAll("    ", " ").replace(/\s\s+/g, " ");
    part = "";
  } else {
    part += " ";
  }
}
string += `
        }
    }
}\n`;

for (var i = 1; i <= numCompatibilityPatches; i++) {
  part += `aroai_construct_special_buildings_` + i + ` = {}`;
  if (i % 2 == 0 || i == numCompatibilityPatches) {
    string +=
      "\n" +
      part.replace(/\n/g, " ").replaceAll("    ", " ").replace(/\s\s+/g, " ");
    part = "";
  } else {
    part += " ";
  }
}
string += "\n";

string += `
aroai_perform_for_every_building_type = {`;
for (var i = 1; i < buildings.length; i++) {
  string +=
    `
    aroai_perform_for_building_type = {` +
    ` effect = $effect$` +
    ` key = ` +
    buildings[i].key +
    ` id = ` +
    buildings[i].id;
  string +=
    `
    class = ` +
    buildings[i].class +
    ` counter = ` +
    (buildings[i].counter === false ? buildings[i].id : buildings[i].counter) +
    ` order = ` +
    buildings[i].order +
    ` limit = ` +
    buildings[i].limit +
    ` crucial = ` +
    buildings[i].crucial +
    ` workforce = ` +
    (buildings[i].wforce === true ? "1" : "0") +
    ` allocate = ` +
    (buildings[i].alloc === false
      ? classes[buildings[i].class].allocate
      : buildings[i].alloc) +
    ` branching = ` +
    (buildings[i].branch === true ? "1" : "0") +
    ` scaling = ` +
    (buildings[i].scaling === true ? "1" : "0") +
    ` }`;
}
string += `
    if = {
        limit = {
            aroai_is_using_compatibility_patches = yes
        }
        aroai_perform_for_every_building_type_compatibility = { effect = $effect$ }
    }
}\n`;

string += `
aroai_perform_for_every_building_type_compatibility = {
    every_in_global_list = {
        variable = aroai_compatibility_patches
        switch = {
            trigger = this`;
for (var i = 1; i <= numCompatibilityPatches; i++) {
  string +=
    `
            ` +
    i +
    ` = { prev = { aroai_perform_for_every_building_type_` +
    i +
    ` = { effect = $effect$ } } }`;
}
string += `
        }
    }
}\n`;

for (var i = 1; i <= numCompatibilityPatches; i++) {
  string +=
    `\naroai_perform_for_every_building_type_` +
    i +
    ` = { if = { limit = { always = no $effect$ = 0 } } }`;
}
string += "\n";

/*
    Place result code below into an end of the aroai_static_data_triggers.txt file
*/

string += `
# ------------------------------------------------------------------------------------
# Triggers below were generated with a modding tool and should not be changed manually
# ------------------------------------------------------------------------------------\n`;

string += `
aroai_is_true_for_any_building_type = {
    OR = {`;
for (var i = 1; i < buildings.length; i++) {
  string +=
    `
        aroai_is_true_for_building_type = {` +
    ` trigger = $trigger$` +
    ` key = ` +
    buildings[i].key +
    ` id = ` +
    buildings[i].id;
  string +=
    `
        class = ` +
    buildings[i].class +
    ` counter = ` +
    (buildings[i].counter === false ? buildings[i].id : buildings[i].class) +
    ` order = ` +
    buildings[i].order +
    ` limit = ` +
    buildings[i].limit +
    ` crucial = ` +
    buildings[i].crucial +
    ` workforce = ` +
    (buildings[i].wforce === true ? "1" : "0") +
    ` allocate = ` +
    (buildings[i].alloc === false
      ? classes[buildings[i].class].allocate
      : buildings[i].alloc) +
    ` branching = ` +
    (buildings[i].branch === true ? "1" : "0") +
    ` scaling = ` +
    (buildings[i].scaling === true ? "1" : "0") +
    ` }`;
}
string += `
        AND = {
            aroai_is_using_compatibility_patches = yes
            aroai_is_true_for_any_building_type_compatibility = { trigger = $trigger$ }
        }
    }
}\n`;

string += `
aroai_is_true_for_any_building_type_compatibility = {
    OR = {`;
for (var i = 1; i <= numCompatibilityPatches; i++) {
  string +=
    `
        aroai_is_true_for_any_building_type_` +
    i +
    ` = { trigger = $trigger$ }`;
}
string += `
    }
}\n`;

for (var i = 1; i <= numCompatibilityPatches; i++) {
  string +=
    `\naroai_is_true_for_any_building_type_` +
    i +
    ` = { always = no $trigger$ = 0 }`;
}

console.log(string.substring(1)); // Remove line break at the start
