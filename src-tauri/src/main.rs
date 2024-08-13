// src/main.rs

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod calculator;

use tauri::command;

#[command]
fn calculate(expression: String) -> Result<String, String> {
    calculator::calculate(&expression)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
