# CDK State Machine Extractor

Extracts the ASL DefinitionString from the output of an AWS CDK `synth` run. This output is JSON based CloudFormation that puts the AWS State Language in a specific field

## Requirements

The program is written in TypeScript and will require:

-   [Node](https://nodejs.dev/en/)
-   [NPM](https://www.npmjs.com)

## Installation

```bash
npm i cdk-asl-definition-extractor
```

## Usage

Preview Options

```bash
❯ cdk-asl-definition-extractor -h
Usage: cdk-asl-definition-extractor [options]

Extract AWS State Machine definitions from CDK generated ASL

Options:
  -V, --version            output the version number
  -f, --file-name <value>  CloudFormation JSON File
  -h, --help               display help for command
```

Extract ASL

```bash
cdk-asl-definition-extractor  -f </path/to/the/template.json>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[ISC](https://opensource.org/license/isc-license-txt/)
