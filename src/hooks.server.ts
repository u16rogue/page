import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async function (event) {
  return event.resolve(event.event);
};
