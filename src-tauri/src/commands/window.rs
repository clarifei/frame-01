use tauri::Window;

#[tauri::command]
pub fn show_window(window: Window) -> Result<(), String> {
  window
    .show()
    .and_then(|_| window.set_focus())
    .map_err(|e| e.to_string())
}