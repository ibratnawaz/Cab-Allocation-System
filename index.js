function main() {
  const employees = [];
  const cabs = [];
  const argv = process.argv.slice(2);

  if (+argv[0] < +argv[1]) {
    console.log(
      "No of employees in the organization should always be greater than the number of cabs hired by the organization."
    );
    process.exit(1);
  }

  function intializeObjects() {
    // initalizing emplyoees
    for (let index = 0; index < +argv[0]; index++) {
      employees.push({
        id: index + 1,
        isCabBooked: false,
        cabId: null,
      });
    }

    // initalizing cabs
    for (let index = 0; index < +argv[1]; index++) {
      cabs.push({
        id: index + 1,
        isCabAvailable: true,
      });
    }
  }

  async function processRequest() {
    const totalTests = argv.slice(2).length;
    for (let index = 0; index < totalTests; index++) {
      if (!checkCabAvailable()) {
        console.log("** No cabs available at the moment. Please wait... **");
        await waitForAvailablity();
      }
      const testCase = argv[index + 2];
      const data = convertStringToObject(testCase);
      if (data.type == 1) {
        requestbooking(data);
      } else {
        bookingStatus(data, (type = "cancel"));
      }
      await delay(500);
    }
  }

  function convertStringToObject(value) {
    const elements = value.split(" ");
    const data = {
      empId: +elements[0],
      slot: +elements[1],
      type: +elements[2],
    };
    return data;
  }

  function checkCabAvailable() {
    const result = cabs.findIndex((cab) => cab.isCabAvailable == true);
    return result >= 0 ? true : false;
  }

  function waitForAvailablity() {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (checkCabAvailable()) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  function checkSlotAvailablity(slot) {
    const totalCabs = cabs.length;
    const totalCabBooked = cabs.reduce((sum, cab) => {
      if (cab.isCabAvailable == false && cab.slot == slot) {
        sum++;
      }
      return sum;
    }, 0);

    return totalCabBooked <= Math.floor(totalCabs / 2);
  }

  function requestbooking(data) {
    if (!checkSlotAvailablity(data.slot)) {
      console.log(
        `** Sorry cannot allocate for slot ${data.slot} at the moment. Please check different slot or try later **`
      );
      return;
    }

    const employee = employees.find((emp) => emp.id == data.empId);

    // Block emplyoee if he has booked & canceled the cab for 2 times
    if (employee.totalBookingCanceled == 2) {
      console.log(
        `Employee-${employee.id} has been blocked to book the cab for 7s.`
      );
      blockEmployee(employee);
      return;
    }

    // Checking if the emplyoee already has a ongoing booking
    if (employee.isCabBooked) {
      console.log(
        `Employee-${employee.id} has already booked the cab for slot-${employee.slot}.`
      );
      return;
    }
    employee.isCabBooked = true;
    employee.slot = data.slot;

    const cab = cabs.find((ele) => ele.isCabAvailable == true);
    cab.isCabAvailable = false;
    cab.slot = data.slot;

    employee.cabId = cab.id;
    console.log(
      `Employee-${employee.id} booked the cab-${employee.cabId} for slot-${employee.slot}.`
    );

    // Booking finished after 5 seconds
    setTimeout(() => {
      bookingStatus(data, "finished");
    }, 5000);
  }

  function bookingStatus(data, type) {
    const employee = employees.find((emp) => emp.id == data.empId);
    employee.isCabBooked = false;
    employee.totalBookingCanceled = ++employee.totalBookingCanceled || 1;
    const cabId = employee.cabId;
    employee.cabId = null;

    if (!cabId) return;

    const cab = cabs.find((ele) => ele.id == cabId);
    cab.isCabAvailable = true;

    if (type == "cancel") {
      console.log(
        `Employee-${employee.id} canceled the booking for the cab-${cabId}.`
      );
    } else if (type == "finished") {
      console.log(
        `Booking for Employee-${employee.id} for the cab-${cabId} is finished.`
      );
    }
  }

  async function blockEmployee(employee) {
    await delay(7000);
    employee.totalBookingCanceled = 0;
  }

  function delay(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  intializeObjects();
  processRequest();
}

main();
