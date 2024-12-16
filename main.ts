/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Mr. Coxall
 * Created on: Sep 2020
 * This program ...
*/

// Define motor pins
const motor1Pins = [0, 1, 2, 3];  // Motor 1 pins (A, B, C, D)
const motor2Pins = [8, 9, 10, 11]; // Motor 2 pins (A, B, C, D)

// Define ultrasonic sensor pins
const triggerPin = DigitalPin.P1;
const echoPin = DigitalPin.P2;

// Stepper motor control function
function stepMotor(motorPins: number[], steps: number, delayTime: number) {
    const motorSteps = [
        [1, 0, 0, 0], // Step 1
        [1, 1, 0, 0], // Step 2
        [0, 1, 0, 0], // Step 3
        [0, 1, 1, 0], // Step 4
        [0, 0, 1, 0], // Step 5
        [0, 0, 1, 1], // Step 6
        [0, 0, 0, 1], // Step 7
        [1, 0, 0, 1]  // Step 8
    ];

    let currentStep = 0;

    for (let i = 0; i < steps; i++) {
        for (let j = 0; j < 4; j++) {
            pins.digitalWritePin(motorPins[j], motorSteps[currentStep][j]);
        }
        basic.pause(delayTime);
        currentStep = (currentStep + 1) % 8;
    }
}

// Function to move forward
function moveForward() {
    // Move both motors forward (adjust steps and speed as needed)
    stepMotor(motor1Pins, 100, 100);  // Adjust steps and delay for speed
    stepMotor(motor2Pins, 100, 100);  // Adjust steps and delay for speed
}

// Function to reverse (move backward)
function moveBackward() {
    // Reverse both motors (adjust steps and speed as needed)
    stepMotor(motor1Pins, 100, 100);  // Adjust steps and delay for speed
    stepMotor(motor2Pins, 100, 100);  // Adjust steps and delay for speed
}

// Function to turn 90 degrees
function turn90Degrees() {
    // Turning by reversing one motor and moving the other forward
    // You can adjust the number of steps and direction to turn the robot
    stepMotor(motor1Pins, 25, 100);  // Adjust steps and delay for turning
    stepMotor(motor2Pins, 100, 100); // Turn one motor to make a 90° turn
}

// Function to measure distance (HC-SR04)
function getDistance(): number {
    let duration: number = 0;
    pins.digitalWritePin(triggerPin, 0);
    basic.pause(2);
    pins.digitalWritePin(triggerPin, 1);
    basic.pause(10);
    pins.digitalWritePin(triggerPin, 0);
    duration = pins.pulseIn(echoPin, PulseValue.High);
    // Calculate distance in cm: distance = time * speed / 2
    let distance = (duration * 0.0343) / 2;
    return distance;
}

// Main program loop
basic.forever(function () {
    let distance = getDistance();
    if (distance > 10) {
        // Move forward if no object detected
        moveForward();
    } else {
        // If an object is detected within 10 cm
        moveBackward();
        basic.pause(500);  // Wait for a short time to reverse
        turn90Degrees();
        basic.pause(500);  // Wait for a short time to complete the turn
        moveForward();  // Continue moving forward
    }
});

