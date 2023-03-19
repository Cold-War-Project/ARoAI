var string = '', part = '', free = '', dc = 5 /* Default crucial */, numCompatibilityPatches = 200;

var buildings = [ '',
//  [0]                                            [1]   [2]   [3]     [4]   [5]   [6]   [7]     [8]     [9]     [10]
//  key                                            id    class counter order limit cruc  wforce  alloc   branch  scaling
    ["building_government_administration", 1, 1, FALSE, 2, 4, 10, FALSE, 4, FALSE, FALSE],
    ["building_university", 2, 1, FALSE, 9, 3, 8, FALSE, FALSE, TRUE, FALSE],
    ["building_construction_sector", 3, 2, FALSE, 1, 5, dc, FALSE, FALSE, TRUE, FALSE],
    ["building_railway", 4, 2, FALSE, 3, 5, 99, FALSE, 7, FALSE, FALSE],
    ["building_port", 5, 2, FALSE, 3, 3, 99, FALSE, 5, FALSE, FALSE],
    ["building_barracks", 6, 3, FALSE, 9, 8, 8, FALSE, 2, FALSE, FALSE],
    ["building_naval_base", 7, 3, FALSE, 9, 5, 8, FALSE, 2, FALSE, FALSE],
    ["building_nuclear_weapons_facility", 8, 3, FALSE, 9, 9, dc, FALSE, FALSE, FALSE, FALSE],
    ["building_chemical_weapons_facility", 9, 3, FALSE, 9, 9, dc, FALSE, FALSE, FALSE, FALSE],
    ["building_biological_weapons_facility", 10, 3, FALSE, 9, 9, dc, FALSE, FALSE, FALSE, FALSE],
    ["building_spaceport", 11, 6, FALSE, 8, 9, dc, TRUE, FALSE, FALSE, FALSE],
    ["building_mission_control", 12, 1, FALSE, 9, 9, dc, TRUE, FALSE, FALSE, FALSE],
    ["building_airport", 13, 2, FALSE, 9, 7, dc, FALSE, FALSE, FALSE, FALSE],
    ["building_logging_camp", 14, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_fishing_wharf", 15, 4, FALSE, 13, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_rubber_plantation", 16, 4, FALSE, 6, 5, 11, TRUE, FALSE, TRUE, TRUE],
    ["building_oil_rig", 17, 4, FALSE, 4, 5, 11, FALSE, FALSE, TRUE, TRUE],
    ["building_natural_gas_well", 18, 4, FALSE, 4, 5, dc, FALSE, FALSE, TRUE, TRUE],
    ["building_coal_mine", 19, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_iron_mine", 20, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_copper_mine", 21, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_rare_earth_elements_mine", 22, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_lead_mine", 23, 4, FALSE, 6, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_bauxite_mine", 24, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_uranium_mine", 25, 4, FALSE, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_phosphorus_mine", 26, 4, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_gold_mine", 27, 4, FALSE, 11, 5, 5, TRUE, FALSE, TRUE, TRUE],
    ["building_rye_farm", 28, 5, FALSE, 10, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_wheat_farm", 29, 5, 28, 10, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_rice_farm", 30, 5, 28, 10, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_maize_farm", 31, 5, 28, 10, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_millet_farm", 32, 5, 28, 10, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_livestock_ranch", 33, 5, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_cotton_plantation", 34, 5, 33, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_dye_plantation", 35, 5, FALSE, 11, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_silk_plantation", 36, 5, FALSE, 11, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_banana_plantation", 37, 5, FALSE, 13, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_sugar_plantation", 38, 5, FALSE, 13, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_tea_plantation", 39, 5, FALSE, 15, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_coffee_plantation", 40, 5, FALSE, 15, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_tobacco_plantation", 41, 5, FALSE, 14, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_opium_plantation", 42, 5, FALSE, 11, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_food_industry", 43, 6, FALSE, 14, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_textile_mills", 44, 6, FALSE, 12, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_furniture_manufacturies", 45, 6, FALSE, 12, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_glassworks", 46, 6, FALSE, 7, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_tool_manufactories", 47, 6, FALSE, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_paper_manufactories", 48, 6, FALSE, 6, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_chemical_plants", 49, 6, FALSE, 6, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_synthetics_plant", 50, 6, 36, 12, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_steelworks", 51, 6, FALSE, 6, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_aluminum_refinery", 52, 6, FALSE, 6, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_motor_industry", 53, 6, FALSE, 7, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_automobile_manufactories", 54, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_shipyards", 55, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_drydocks", 56, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_electronics_manufactories", 57, 6, FALSE, 7, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_combustion_plant", 58, 6, FALSE, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_nuclear_power_plant", 59, 6, 58, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_solar_power_plant", 60, 6, 58, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_wind_power_plant", 61, 6, 58, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_hydro_power_plant", 62, 6, 58, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_geothermal_power_plant", 63, 6, 58, 4, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_small_arms_manufactories", 64, 6, FALSE, 7, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_munition_plants", 65, 6, FALSE, 7, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_fuel_refineries", 66, 6, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_semiconductor_manufactories", 67, 6, FALSE, 6, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_advanced_military_manufactories", 68, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_aircraft_manufactories", 69, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_uranium_refineries", 70, 6, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_battery_manufactories", 71, 6, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_pharmaceutical_industry", 72, 6, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_computer_manufactories", 73, 6, FALSE, 5, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_household_appliance_manufactories", 74, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_telecommunications", 75, 6, FALSE, 7, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_tourism_industry", 76, 6, 13, 15, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_financial_services", 77, 6, FALSE, 8, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_media_industry", 78, 6, FALSE, 15, 5, dc, TRUE, FALSE, TRUE, TRUE],
    ["building_hospitals", 79, 6, FALSE, 8, 5, 3, TRUE, FALSE, TRUE, TRUE],
];

classes = ['',
//  [0]                   [1]   [2]
//  group                 id    allocate
    ["government",        1,    1],
    ["infrastructure",    2,    1],
    ["military",          3,    2],
    ["resource",          4,    2],
    ["agriculture",       5,    2],
    ["industry",          6,    2],
]

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
                allocate field must be set to 2. If set to False it'll default to allocate value of building's class.
[9] Branching   Are states getting filtered by stuff like being incorporated for this building? 0 = false, 1 = true.
[10] Scaling    Does economy of scale apply to this building? 0 = false, 1 = true.


ORDER OF BUILDINGS
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
12) textile_mills, furniture_manufacturies, synthetics_plants
13) fishing_wharf, banana_plantation, sugar_plantation
14) tobacco_plantation, food_industry
15) tea_plantation, coffee_plantation, arts_academy

*/

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
            string += '\n            ' + part.replace(/\n/g, ' ').replaceAll('    ', ' ').replace(/\s\s+/g, ' ');
            part = '';
        } else {
            part += ' ';
        }
    } string += `
        }
    }
}\n`;

for (var i = 1; i <= numCompatibilityPatches; i++) {
    part += `aroai_construct_special_buildings_` + i + ` = {}`;
    if (i % 2 == 0 || i == numCompatibilityPatches) {
        string += '\n' + part.replace(/\n/g, ' ').replaceAll('    ', ' ').replace(/\s\s+/g, ' ');
        part = '';
    } else {
        part += ' ';
    }
}
string += '\n';

string += `
aroai_perform_for_every_building_type = {`;
    for (var i = 1; i < buildings.length; i++) {
    string += `
    aroai_perform_for_building_type = {`
    + ` effect = $effect$`
    + ` key = ` + buildings[i][0]
    + ` id = ` + buildings[i][1];
    string += `
    class = ` + buildings[i][2]
    + ` counter = ` + (buildings[i][3] === false ? buildings[i][1] : buildings[i][3])
    + ` order = ` + buildings[i][4]
    + ` limit = ` + buildings[i][5]
    + ` crucial = ` + buildings[i][6]
    + ` workforce = ` + (buildings[i][7] === true ? '1' : '0')
    + ` allocate = ` + (buildings[i][8] === false ? classes[buildings[i][2]][2] : buildings[i][8])
    + ` branching = ` + (buildings[i][9] === true ? '1' : '0')
    + ` scaling = ` + (buildings[i][10] === true ? '1' : '0')
    + ` }`;
    } string += `
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
            string += `
            ` + i + ` = { prev = { aroai_perform_for_every_building_type_` + i + ` = { effect = $effect$ } } }`;
        } string += `
        }
    }
}\n`;

for (var i = 1; i <= numCompatibilityPatches; i++) {
    string += `\naroai_perform_for_every_building_type_` + i + ` = { if = { limit = { always = no $effect$ = 0 } } }`;
}
string += '\n';

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
        string += `
        aroai_is_true_for_building_type = {`
        + ` trigger = $trigger$`
        + ` key = ` + buildings[i][0]
        + ` id = ` + buildings[i][1];
        string += `
        class = ` + buildings[i][2]
        + ` counter = ` + (buildings[i][3] === false ? buildings[i][1] : buildings[i][3])
        + ` order = ` + buildings[i][4]
        + ` limit = ` + buildings[i][5]
        + ` crucial = ` + buildings[i][6]
        + ` workforce = ` + (buildings[i][7] === true ? '1' : '0')
        + ` allocate = ` + (buildings[i][8] === false ? classes[buildings[i][2]][2] : buildings[i][8])
        + ` branching = ` + (buildings[i][9] === true ? '1' : '0')
        + ` scaling = ` + (buildings[i][10] === true ? '1' : '0')
        + ` }`;
        } string += `
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
        string += `
        aroai_is_true_for_any_building_type_` + i + ` = { trigger = $trigger$ }`;
    } string += `
    }
}\n`;

for (var i = 1; i <= numCompatibilityPatches; i++) {
    string += `\naroai_is_true_for_any_building_type_` + i + ` = { always = no $trigger$ = 0 }`;
}

console.log(string.substring(1)); // Remove line break at the start