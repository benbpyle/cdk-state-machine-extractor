package main

import (
	"encoding/json"
)

type StateMachineDefinition struct {
	Identifier string `json:"identifier"`
	Definition string `json:"definition"`
}

func extractDefinition(content string) ([]StateMachineDefinition, error) {
	jsonBody := make(map[string]interface{})
	err := json.Unmarshal([]byte(content), &jsonBody)

	if err != nil {
		return nil, err
	}

	for k, v := range jsonBody {
		if k == "Resources" {
			body := v.(map[string]interface{})

			if body != nil {
				filtered := filterStateMachines(body)
				definitions := resolveStateMachineDefinitions(filtered)
				return definitions, nil
			}
		}
	}

	return nil, nil
}

func filterStateMachines(r map[string]interface{}) map[string]map[string]interface{} {
	filtered := make(map[string]map[string]interface{})

	for key, v := range r {
		resource := v.(map[string]interface{})
		if resource == nil {
			continue
		}

		if val, ok := resource["Type"]; ok {
			typeString := val.(string)
			if typeString == "AWS::StepFunctions::StateMachine" {
				if resourceVal, resourceOk := resource["Properties"]; resourceOk {
					props := resourceVal.(map[string]interface{})
					if props != nil {
						filtered[key] = props
					}
				}
			}
		}
	}

	return filtered
}

func resolveStateMachineDefinitions(properties map[string]map[string]interface{}) []StateMachineDefinition {
	var definitions []StateMachineDefinition

	for key, value := range properties {
		if val, ok := value["DefinitionString"]; ok {
			definitions = append(definitions, StateMachineDefinition{
				Identifier: key,
				Definition: val.(string),
			})
		}
	}

	return definitions
}
