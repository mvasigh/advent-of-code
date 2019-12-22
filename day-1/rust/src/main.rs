use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    let filename = "input.txt";
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    let mut fuel: i32 = 0;
    for (_, line) in reader.lines().enumerate() {
        let line = line.unwrap();
        fuel = fuel + calculate_fuel(line.parse::<f64>().unwrap())
    }
    println!("The total fuel is {}", fuel)
}

fn calculate_fuel(mass: f64) -> i32 {
    if mass / 3.0 - 2.0 < 0.0 {
        return 0;
    }
    let _fuel: f64 = mass / 3.0;
    let fuel = (_fuel.floor() - 2.0) as i32;
    fuel + calculate_fuel(fuel as f64)
}
