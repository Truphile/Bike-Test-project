class Bike:
    def __init__(self):
        self.accelerator = 0
        self.gearStatus = 0
        self.running = False

    def turnOn(self):
        self.running = True
        return self.gearStatus

    def turnOff(self):
        self.running = False
        self.accelerator = 0
        self.gearStatus = 0
        return self.gearStatus

    def accelerate(self):
        if not self.running:
            return None
        if self.gearStatus == 0:
            self.gearStatus = 1
        self.accelerator += self.gearStatus
        self.updateGear()
        return self.accelerator

    def decelerate(self):
        if not self.running:
            return None
        self.accelerator -= self.gearStatus
        if self.accelerator < 0:
            self.accelerator = 0
        self.updateGear()
        return self.accelerator

    def updateGear(self):
        if not self.running:
            self.gearStatus = 0
            return
        if self.accelerator == 0:
            self.gearStatus = 0
        elif self.accelerator >= 41:
            self.gearStatus = 4
        elif self.accelerator >= 31:
            self.gearStatus = 3
        elif self.accelerator >= 21:
            self.gearStatus = 2
        else:
            self.gearStatus = 1

    def getGearStatus(self):
        return self.gearStatus

    def isRunning(self):
        return self.running
