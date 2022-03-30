import { notificationScheme } from "@turbohub/github";
import { test, expect } from "vitest";
import { expectNotificationApiResponseFixture } from "./__test__/fixture";

test("works properly", () => {
  expectNotificationApiResponseFixture.map((anyNotification: any) => {
    const result = notificationScheme.safeParse(anyNotification)
    expect.assertions(1)
    if (result.success) {
      expect(result.success).toBeTruthy()
    }
    fetch
  })
});
