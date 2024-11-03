type PopulateAll = '*';
type PopulateOnly = '>';
type PopulateAllExcept = '<';
type PopulatePaths = string[];
type Models = Record<string,string>;
type PopulateFields = any;
// type PopulateFields = Record<string, 0 | 1>;
export type PopulateStrategy = {
    method: PopulateAll | PopulateOnly | PopulateAllExcept;
    models: Models;
    paths?: PopulatePaths;
    populateFields?: PopulateFields;
    // | PopulateFieldsType;
};

export interface AggregationPipelineStage {
    $match?: any;
    $project?: any;
    // Add more stages as needed:
    $lookup?: any;
    $unwind?: any;
    $addFields?: any
    // ...
};

export interface PopulateFieldsType {
    [key: string]: any;
}