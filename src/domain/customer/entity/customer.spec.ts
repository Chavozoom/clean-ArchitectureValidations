import EventDispatcher from "../../@shared/event/event-dispatcher";
import CreatedCostumerEvent from "../event/created-costumer-event";
import LogWhenConstumerCreated1 from "../event/handler/log-when-costumer-created.handler";
import LogWhenConstumerCreated2 from "../event/handler/log-when-costumer-created2.handler";
import Address from "../value-object/address";
import Customer from "./customer";
import AddressUpdatedEvent from "../event/address-updated-event";
import AddressUpdated from "../event/handler/address-updated.handler";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it("should notify two logs when user created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new LogWhenConstumerCreated1();
    const eventHandler2 = new LogWhenConstumerCreated2();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CreatedCostumerEvent", eventHandler);
    eventDispatcher.register("CreatedCostumerEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CreatedCostumerEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("1", "Customer 1");

    const customerCreatedEvent = new CreatedCostumerEvent({
      name: customer.name,
      id: customer.id
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify when user address updated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new AddressUpdated();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");


    // Create a customer instance
    const customer = new Customer('1', 'Customer 1');

    const newAddress = new Address('Street 1', 123, '13330-250', 'São Paulo');
    customer.changeAddress(newAddress);

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);
    const addressUpdatedEvent = new AddressUpdatedEvent({
      id: customer.id,
      name: customer.name,
      address: newAddress
    });

    eventDispatcher.notify(addressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});