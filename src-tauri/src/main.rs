#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use frame_lib::commands;
use tauri_plugin_prevent_default::Flags;
use tauri_plugin_frame::FramePluginBuilder;

fn main() {
  tauri::Builder::default()
    .plugin(
        FramePluginBuilder::new()
            .titlebar_height(32)
            .button_width(56)
            .auto_titlebar(true)
            .snap_overlay_delay_ms(15)
            .close_hover_bg("rgba(196,43,28,1)")
            .button_hover_bg("rgba(255,255,255,0.1)")
            .build()
    )
    .plugin(tauri_plugin_http::init())
    .plugin(tauri_plugin_opener::init())
    .plugin(
      tauri_plugin_prevent_default::Builder::new()
        .with_flags(Flags::all())
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