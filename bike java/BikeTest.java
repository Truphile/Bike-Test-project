import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class BikeTest {

    @Test
    void initialStateIsCorrect() {
        Bike bike = new Bike();
        assertFalse(bike.isRunning());
        assertEquals(0, bike.getGearStatus());
    }

    @Test
    void turnOnSetsRunningTrueAndGearRemainsZero() {
        Bike bike = new Bike();
        int gear = bike.turnOn();
        assertTrue(bike.isRunning());
        assertEquals(0, gear);
        assertEquals(0, bike.getGearStatus());
    }

    @Test
    void accelerateSetsGearToOneAndIncreasesSpeed() {
        Bike bike = new Bike();
        bike.turnOn();
        Integer speed = bike.accelerate();
        assertNotNull(speed);
        assertEquals(1, speed);
        assertEquals(1, bike.getGearStatus());
    }

    @Test
    void decelerateDecreasesSpeedAndGear() {
        Bike bike = new Bike();
        bike.turnOn();
        for (int count = 0; count < 25; count++) {
            bike.accelerate();
        }
        Integer speedBefore = bike.accelerate();
        Integer speedAfter = bike.decelerate();
        assertTrue(speedAfter < speedBefore);
        assertTrue(bike.getGearStatus() <= 2);
    }

    @Test
    void speedDoesNotGoBelowZero() {
        Bike bike = new Bike();
        bike.turnOn();
        bike.accelerate();
        bike.decelerate();
        Integer speed = bike.decelerate();
        assertEquals(0, speed);
    }

    @Test
    void gearUpdatesCorrectlyAtThresholds() {
        Bike bike = new Bike();
        bike.turnOn();


        while (bike.accelerate() < 21) {}
        assertEquals(2, bike.getGearStatus());

        while (bike.accelerate() < 31) {}
        assertEquals(3, bike.getGearStatus());

        while (bike.accelerate() < 41) {}
        assertEquals(4, bike.getGearStatus());


        while (bike.decelerate() > 0) {}
        assertEquals(0, bike.getGearStatus());
    }

    @Test
    void turnOffResetsSpeedGearAndRunning() {
        Bike bike = new Bike();
        bike.turnOn();
        bike.accelerate();
        bike.turnOff();
        assertFalse(bike.isRunning());
        assertEquals(0, bike.getGearStatus());
    }

    @Test
    void accelerateReturnsNullIfBikeOff() {
        Bike bike = new Bike();
        assertNull(bike.accelerate());
    }

    @Test
    void decelerateReturnsNullIfBikeOff() {
        Bike bike = new Bike();
        assertNull(bike.decelerate());
    }

    @Test
    void multipleAcceleratesIncreaseSpeedCorrectly() {
        Bike bike = new Bike();
        bike.turnOn();
        bike.accelerate();
        bike.accelerate();
        bike.accelerate();
        assertTrue(bike.getGearStatus() >= 1);
    }

    @Test
    void gearChangesDynamicallyWithSpeed() {
        Bike bike = new Bike();
        bike.turnOn();
        int speed;
        speed = bike.accelerate();
        assertEquals(1, bike.getGearStatus());

        while (speed < 22) speed = bike.accelerate();
        assertTrue(bike.getGearStatus() >= 2);

        while (speed < 32) speed = bike.accelerate();
        assertTrue(bike.getGearStatus() >= 3);

        while (speed < 42) speed = bike.accelerate();
        assertTrue(bike.getGearStatus() >= 4);
    }

    @Test
    void decelerateToZeroResetsGear() {
        Bike bike = new Bike();
        bike.turnOn();
        while (bike.accelerate() < 10) {}
        while (bike.decelerate() > 0) {}
        assertEquals(0, bike.getGearStatus());
    }


}
