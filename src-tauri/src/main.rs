#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use frame_lib::commands;
use tauri_plugin_prevent_default::Flags;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_http::init())
    .plugin(tauri_plugin_opener::init())
    .plugin(
      tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::all().difference(Flags::RELOAD))
        .build(),
    )
    .setup(|app| {
      frame_lib::setup::init(app)?;
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![
      commands::show_window,
    ])
    .run(tauri::generate_context!())
    .expect("Failed to run Tauri application");
}