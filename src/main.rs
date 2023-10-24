use std::{
    fs,
    io::{prelude::*},
    net::{TcpListener, TcpStream},
};

fn main() {
    println!("Listening for incoming connections...");

    let listener = TcpListener::bind("127.0.0.1:80").unwrap();
    for stream in listener.incoming() {
        let stream = stream.unwrap();
        handle_connection(stream);
    }

    println!("Shutting down...");
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];
    stream.read(&mut buffer).unwrap();

    let (status_line, filename) = if buffer.starts_with(b"GET / HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\index.html")
    } else if buffer.starts_with(b"GET /style.css HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\style.css")
    } else if buffer.starts_with(b"GET /assets.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\assets.js")
    } else if buffer.starts_with(b"GET /bootstrapper.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\bootstrapper.js")
    } else if buffer.starts_with(b"GET /bridge.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\bridge.js")
    } else if buffer.starts_with(b"GET /button.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\button.js")
    } else if buffer.starts_with(b"GET /enemy.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\enemy.js")
    } else if buffer.starts_with(b"GET /enums.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\enums.js")
    } else if buffer.starts_with(b"GET /explosion.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\explosion.js")
    } else if buffer.starts_with(b"GET /game.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\game.js")
    } else if buffer.starts_with(b"GET /game-map.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\game-map.js")
    } else if buffer.starts_with(b"GET /game-map-manager.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\game-map-manager.js")
    } else if buffer.starts_with(b"GET /game-object.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\game-object.js")
    } else if buffer.starts_with(b"GET /global-state.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\global-state.js")
    } else if buffer.starts_with(b"GET /math-helper.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\math-helper.js")
    } else if buffer.starts_with(b"GET /phase.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\phase.js")
    } else if buffer.starts_with(b"GET /phase-bootstrap.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\phase-bootstrap.js")
    } else if buffer.starts_with(b"GET /phase-gameover.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\phase-gameover.js")
    } else if buffer.starts_with(b"GET /phase-planning.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\phase-planning.js")
    } else if buffer.starts_with(b"GET /phase-playing.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\phase-playing.js")
    } else if buffer.starts_with(b"GET /rocket.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\rocket.js")
    } else if buffer.starts_with(b"GET /tower.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\tower.js")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "src\\404.html")
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();
    let response = format!("{}\r\nContent-Length: {}\r\n\r\n{}", status_line, length, contents);

    stream.write_all(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
