import { objectType } from "@nexus/schema";
import { differenceInYears, differenceInMonths } from "date-fns";

export const Position = objectType({
  name: "Position",
  definition(t) {
    t.id("id");
    t.string("title");
    t.string("company");
    t.string("location");
    t.date("startDate", {
      resolve: (position) => new Date(position.startDate),
    });
    t.date("endDate", {
      resolve: (position) =>
        position.endDate ? new Date(position.endDate) : null,
    });
    t.int("years", {
      resolve: ({ endDate, startDate }) =>
        differenceInYears(
          endDate ? new Date(endDate) : new Date(),
          new Date(startDate)
        ),
    });
    t.int("months", {
      resolve: ({ endDate, startDate }) =>
        differenceInMonths(
          endDate ? new Date(endDate) : new Date(),
          new Date(startDate)
        ) % 12,
    });
    t.list.string("achivements", {
      resolve: (position) => position.achievements,
    });
  },
});
