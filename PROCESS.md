
## Validations

### Typing

// As a term Object is overloaded in JavaScript, lets define Structure as a synonym for a type to specify
// that we use Objects as structures or collections of objects

    Structure = Object

// Value can be a string, number, boolean or a structure.
    
    Value = String | Number | Boolean | Structure

// Validation error message can only be a string. 
// THINK: Maybe we want to enable keys too?
    
    ErrorMessage = String
    ErrorMessages = [ErrorMessage]

// Response to a validation can either be a `null` in case of success, list of ErrorMessages.

    Response = ErrorMessages |  null

// Result of validation is a type containing Value and ErrorMessages

    Result




