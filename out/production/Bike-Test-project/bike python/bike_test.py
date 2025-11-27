import unittest

from main import Bike


class TestBike(unittest.TestCase):
    def test_initial_state(self):
        bike = Bike()
        self.assertFalse(bike.isRunning())
        self.assertEqual(bike.getGearStatus(), 0)
        self.assertEqual(bike.accelerator, 0)

    def test_turn_on(self):
        bike = Bike()
        gear = bike.turnOn()
        self.assertTrue(bike.isRunning())
        self.assertEqual(gear, 0)
        self.assertEqual(bike.getGearStatus(), 0)

    def test_accelerate_increases_speed_and_changes_gear(self):
        bike = Bike()
        bike.turnOn()
        speed = bike.accelerate()
        self.assertIsNotNone(speed)
        self.assertEqual(speed, 1)
        self.assertEqual(bike.getGearStatus(), 1)

    def test_decelerate_decreases_speed_and_gear(self):
        bike = Bike()
        bike.turnOn()
        for _ in range(25):
            bike.accelerate()
        speed_before = bike.accelerate()
        speed_after = bike.decelerate()
        self.assertLess(speed_after, speed_before)
        self.assertLessEqual(bike.getGearStatus(), 2)

    def test_speed_cannot_go_below_zero(self):
        bike = Bike()
        bike.turnOn()
        bike.accelerate()
        bike.decelerate()
        speed = bike.decelerate()
        self.assertEqual(speed, 0)

    def test_gear_updates_at_the_required_limit(self):
        bike = Bike()
        bike.turnOn()
        while bike.accelerate() < 21:
            pass
        self.assertEqual(bike.getGearStatus(), 2)
        while bike.accelerate() < 31:
            pass
        self.assertEqual(bike.getGearStatus(), 3)
        while bike.accelerate() < 41:
            pass
        self.assertEqual(bike.getGearStatus(), 4)
        while bike.decelerate() > 0:
            pass
        self.assertEqual(bike.getGearStatus(), 0)

    def test_turn_off_resets_state(self):
        bike = Bike()
        bike.turnOn()
        bike.accelerate()
        gear_off = bike.turnOff()
        self.assertFalse(bike.isRunning())
        self.assertEqual(bike.accelerator, 0)
        self.assertEqual(bike.getGearStatus(), 0)
        self.assertEqual(gear_off, 0)

    def test_accelerate_returns_none_if_off(self):
        bike = Bike()
        self.assertIsNone(bike.accelerate())

    def test_decelerate_returns_none_if_off(self):
        bike = Bike()
        self.assertIsNone(bike.decelerate())

    def test_multiple_accelerations(self):
        bike = Bike()
        bike.turnOn()
        bike.accelerate()
        bike.accelerate()
        bike.accelerate()
        self.assertGreaterEqual(bike.accelerator, 3)
        self.assertGreaterEqual(bike.getGearStatus(), 1)

    def test_gear_changes_dynamically_with_speed(self):
        bike = Bike()
        bike.turnOn()
        speed = bike.accelerate()
        self.assertEqual(bike.getGearStatus(), 1)
        while speed < 22:
            speed = bike.accelerate()
        self.assertGreaterEqual(bike.getGearStatus(), 2)
        while speed < 32:
            speed = bike.accelerate()
        self.assertGreaterEqual(bike.getGearStatus(), 3)
        while speed < 42:
            speed = bike.accelerate()
        self.assertGreaterEqual(bike.getGearStatus(), 4)

    def test_decelerate_to_zero_resets_gear(self):
        self.bike = Bike()
        self.bike.turnOn()
        while self.bike.accelerate() < 10:
            pass
        while self.bike.decelerate() > 0:
            pass
        self.assertEqual(self.bike.getGearStatus(), 0)

    def test_accelerate_and_decelerate_return_expected_values(self):
        bike = Bike()
        bike.turnOn()
        acc = bike.accelerate()
        self.assertIsNotNone(acc)
        dec = bike.decelerate()
        self.assertIsNotNone(dec)
        self.assertLessEqual(dec, acc)
