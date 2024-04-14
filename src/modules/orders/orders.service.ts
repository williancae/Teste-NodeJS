import { Injectable } from "@nestjs/common";

export interface IProduct {
  product_id: number;
  value: number;
}

export interface IOrder {
  order_id: number;
  total: number;
  date: string;
  products: IProduct[];
}

export interface IUser {
  user_id: number;
  name: string;
  orders: IOrder[];
}

@Injectable()
export class OrdersService {
  async upload(file: Express.Multer.File): Promise<IUser[]> {
    const data = file.buffer.toString().split("\n");

    const users: { [key: number]: IUser } = {};

    for (const line of data) {
      if (line.length < 87) {
        continue;
      }
      const { userId, userName, orderId, date, productId, productValue } =
        this.organizeData(line);

      if (!users[userId]) {
        users[userId] = {
          user_id: userId,
          name: userName,
          orders: [],
        };
      }

      const existingOrder = users[userId].orders.find(
        (order) => order.order_id === orderId
      );

      if (existingOrder) {
        existingOrder.products.push({
          product_id: productId,
          value: productValue,
        });
        existingOrder.total += productValue;
        continue;
      }

      users[userId].orders.push({
        order_id: orderId,
        total: productValue,
        date: date,
        products: [{ product_id: productId, value: productValue }],
      });
    }

    return Object.values(users);
  }

  organizeData(line: string): {
    userId: number;
    userName: string;
    orderId: number;
    date: string;
    productId: number;
    productValue: number;
  } {
    const userId = parseInt(line.substring(0, 10));
    const userName = line.substring(10, 55).trim();
    const orderId = parseInt(line.substring(55, 65));
    const productId = parseInt(line.substring(65, 75));
    const productValue = parseFloat(line.substring(75, 87));
    const date = this.formatDate(line.substring(87));
    return {
      userId,
      userName,
      orderId,
      date,
      productId,
      productValue,
    };
  }

  formatDate(dateString: string): string {
    const ano = dateString.substring(0, 4);
    const mes = dateString.substring(4, 6);
    const dia = dateString.substring(6, 8);
    return `${ano}-${mes}-${dia}`;
  }
}
