use serde::Deserialize;
use serde::Serialize;
use tauri::command;

#[command(with_window)]
pub fn log_operation<M: tauri::Params>(
    _window: tauri::Window<M>,
    event: String,
    payload: Option<String>,
) {
    println!("{} {:?}", event, payload);
}

#[derive(Debug, Deserialize)]
pub struct RequestBody {
    executable: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Response {
    executable_path: String,
    permissions_mode: String,
}

#[command]
pub fn which(body: RequestBody) -> Response {
    use std::process::Command;
    use std::fs::File;
    use std::str::from_utf8;
    use std::os::unix::fs::PermissionsExt;

    let stdout = Command::new("which")
        .args(&[body.executable])
        .output()
        .unwrap()
        .stdout;
    let path = from_utf8(&stdout).unwrap().replace("\n", "");
    let executable_path = path.to_string();
    println!("{:?}", path);
    let file = File::open(path).unwrap();
    let permissions_mode: u32 = file.metadata().unwrap().permissions().mode();
    println!("{}", format!("{:o}", permissions_mode));

    Response {
        permissions_mode: format!("{:o}", permissions_mode),
        executable_path,
    }
}