#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![process_file])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn process_file(filepath: String) -> String {
  println!("Processing file: {}", filepath);
  return "true".into();
}