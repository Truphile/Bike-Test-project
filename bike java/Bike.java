public class Bike {
    private int accelerator;
    private int gearStatus;
    private boolean running;

    public Bike() {
        this.accelerator = 0;
        this.gearStatus = 0;
        this.running = false;
    }

    public int turnOn() {
        this.running = true;
        return this.gearStatus;
    }

    public int turnOff() {
        this.running = false;
        this.accelerator = 0;
        this.gearStatus = 0;
        return this.gearStatus;
    }

    public Integer accelerate() {
        if (!running) return null;
        if (gearStatus == 0) gearStatus = 1;
        accelerator += gearStatus;
        updateGear();
        return accelerator;
    }

    public Integer decelerate() {
        if (!running) return null;
        accelerator -= gearStatus;
        if (accelerator < 0) accelerator = 0;
        updateGear();
        return accelerator;
    }

    private void updateGear() {
        if (!running) {
            gearStatus = 0;
            return;
        }
        if (accelerator == 0) {
            gearStatus = 0;
        } else if (accelerator >= 41) {
            gearStatus = 4;
        } else if (accelerator >= 31) {
            gearStatus = 3;
        } else if (accelerator >= 21) {
            gearStatus = 2;
        } else {
            gearStatus = 1;
        }
    }


    public int getGearStatus() {
        return gearStatus;
    }


    public boolean isRunning() {
        return running;
    }
}
