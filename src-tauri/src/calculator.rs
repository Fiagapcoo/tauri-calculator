// src/calculator.rs

use meval::eval_str;

pub fn calculate(expression: &str) -> Result<String, String> {
    match eval_str(expression) {
        Ok(result) => Ok(result.to_string()),
        Err(_) => Err("Invalid expression".into()),
    }
}



