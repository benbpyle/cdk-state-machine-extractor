import { extractAsl, extractDefinition } from "./extractor";

test("error thrown when no resources", () => {
    const s = '{"Resource": {}}';

    expect(() => {
        extractDefinition(s);
    }).toThrow();
});

test("error asl missing properties", () => {
    const s = JSON.parse('{"Resource": {}}');

    expect(() => {
        extractAsl(s);
    }).toThrow();
});

test("error asl missing definition", () => {
    const s = JSON.parse('{"ABC": { "Properities": { "Def": "" }}}');

    expect(() => {
        extractAsl(s);
    }).toThrow();
});

test("has definition string", () => {
    const s = JSON.parse(
        '{ "Type": "AWS::StepFunctions::StateMachine", "Properties": { "DefinitionString": "{\\"StartAt\\":\\"Finished!\\",\\"States\\":{\\"Finished!\\":{\\"Type\\":\\"Succeed\\"}},\\"TimeoutSeconds\\":30}" } }'
    );
    expect(extractAsl(s)).toBeDefined();
});
