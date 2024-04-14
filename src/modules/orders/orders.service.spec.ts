import { OrdersService } from "./orders.service";

describe("OrdersService", () => {
  let ordersService: OrdersService;

  beforeEach(() => {
    ordersService = new OrdersService();
  });

  it("should organize data correctly", () => {
    const line =
      "0000000002                           Augustus Aufderhar00000000220000000000       190.820210530";
    const parsedData = ordersService.organizeData(line);

    expect(parsedData.date).toBe("2021-05-30");
    expect(parsedData.userId).toBe(2);
    expect(parsedData.userName).toBe("Augustus Aufderhar");
    expect(parsedData.orderId).toBe(22);
    expect(parsedData.productId).toBe(0);
    expect(parsedData.productValue).toBe(190.8);
  });

  it("should format date correctly", () => {
    const dateString = "20210530";
    const formattedDate = ordersService.formatDate(dateString);

    expect(formattedDate).toBe("2021-05-30");
  });
});
