import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CreatedCostumerEvent from "../created-costumer-event";

export default class LogWhenConstumerCreated1
    implements EventHandlerInterface<CreatedCostumerEvent>
{
    handle(event: CreatedCostumerEvent): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}
