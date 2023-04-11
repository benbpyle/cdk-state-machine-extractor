#! /usr/bin/env node

import { Command } from "commander";
import { extractContents } from "./parser";
import { extractDefinition } from "./extractor";

const program = new Command();
program
    .version("0.0.1")
    .description("Extract AWS State Machine definitions from CDK generated ASL")
    .requiredOption("-f, --file-name <value>", "CloudFormation JSON File")
    .parse(process.argv);

const options = program.opts();
const contents = extractContents(options.fileName);
const definitions = extractDefinition(contents);
console.log(JSON.stringify(definitions));
