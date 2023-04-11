import * as fs from "fs";

/**
 * Simple file read
 * @param filename the filename of the CloudFormation Template as JSON
 * @returns the Template contents in String form
 */
export const extractContents = (filename: string): string => {
    return fs.readFileSync(filename, "utf-8");
};
