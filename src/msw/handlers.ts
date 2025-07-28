import { delay, http, HttpResponse } from "msw";
import { mockClients, mockDeals } from "./mockData";

export const handlers = [
  http.post("/api/deal", async ({ request }) => {
    await delay(300);

    const requestBody = await request.json();
    return HttpResponse.json({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: requestBody?.data,
      createdAt: new Date().toLocaleString(),
    });
  }),
  http.get("/api/deals", async () => {
    await delay(300);

    return HttpResponse.json(mockDeals);
  }),
  http.get("/api/clients", async () => {
    await delay(300);

    return HttpResponse.json(mockClients);
  }),
];
