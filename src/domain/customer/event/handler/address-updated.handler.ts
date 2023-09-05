import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressUpdatedEvent from "../address-updated-event";

export default class AddressUpdated
    implements EventHandlerInterface<AddressUpdatedEvent>
{
    handle(event: AddressUpdatedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name}, alterado para: ${event.eventData.address}`);
    }
}
