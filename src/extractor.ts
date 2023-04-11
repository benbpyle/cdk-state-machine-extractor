import { StateMachineDefinition } from "./template";

/**
 * Pulls the definitions out of the CloudFormation JSON Template file that is supplied
 * @param contents the String representation of the JSON Template File
 * @returns an array of StateMachineDefintion Objects
 */
export const extractDefinition = (
    contents: string
): StateMachineDefinition[] => {
    let smd: StateMachineDefinition[] = [];

    const parsed = JSON.parse(contents);

    if (!parsed.hasOwnProperty("Resources")) {
        throw new Error("Resources key does not exist on template");
    }

    return filterStateMachines(parsed.Resources);
};

/**
 * Filters out the non-needed elements of the template.  Specifically looking for the
 * `AWS::StepFunctions::StateMachine` Objects
 * @param resources Representation of the "Resources" object inside the JSON Template
 * @returns the list of StateMachineDefinition objects that are found
 */
export const filterStateMachines = (
    resources: any
): StateMachineDefinition[] => {
    let stateMachines: StateMachineDefinition[] = [];
    Object.keys(resources).forEach((element: any) => {
        const r = resources[element];
        if (r.hasOwnProperty("Type")) {
            if (r.Type === "AWS::StepFunctions::StateMachine") {
                stateMachines.push({
                    identifier: element as string,
                    definition: extractAsl(r),
                });
            }
        }
    });

    return stateMachines;
};

/**
 * Extracts the AWS State Language or ASL from the DefinitionString of the Resource
 * @param resource  the AWS Resource to extract the DefintionString from
 * @returns the ASL as defined in the DefinitionString
 */
export const extractAsl = (resource: any): string => {
    if (!resource.hasOwnProperty("Properties")) {
        throw new Error("Resource structure is missing Properties");
    }

    if (!resource.Properties.hasOwnProperty("DefinitionString")) {
        throw new Error("Properties structure is missing DefinitionString");
    }

    return resource.Properties.DefinitionString as string;
};
