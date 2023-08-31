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
    } else if buffer.starts_with(b"GET /game.js HTTP/1.1\r\n") {
        ("HTTP/1.1 200 OK", "src\\game.js")
    } else {
        ("HTTP/1.1 404 NOT FOUND", "src\\404.html")
    };

    let contents = fs::read_to_string(filename).unwrap();
    let length = contents.len();
    let response = format!("{}\r\nContent-Length: {}\r\n\r\n{}", status_line, length, contents);

    stream.write_all(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
