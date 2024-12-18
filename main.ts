/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Joos
 * Created on: Dec 2024
 * This program controls two stepper motors and a distance sensor to move the robot forward,
 * stop when an object is detected within 10 cm, reverse for 10 cm, turn 90 degrees, and continue.
*/

// Setup 
basic.showIcon(IconNames.Happy)

// loop forever
basic.forever(function () {
    let distance = sonar.ping(DigitalPin.P1, DigitalPin.P2, PingUnit.Centimeters)

    // Move forward if no object is detected within 10 cm
    if (distance >= 10) {
        basic.showIcon(IconNames.Happy) // Show happy face
        robotbit.StpCarMove(-10, 48) // Move car forward
    } else {
        // If object is detected within 10 cm, stop, reverse, and turn
        robotbit.MotorStopAll()
        basic.pause (750)
        robotbit.StpCarMove(10, 48) // Move car backward
        robotbit.StpCarTurn(90, 48, 125) // Turn 90 degrees
        distance = 11
    }
})
