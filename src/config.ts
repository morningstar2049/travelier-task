import * as yup from "yup";
import { statusOptions } from "./constants"; // optional if you're using the array

export const dealSchema = yup.object({
  client: yup.string().required("Client is required"),

  dealName: yup
    .string()
    .required("Deal Name is required")
    .min(3, "Deal Name must be at least 3 characters"),

  status: yup
    .string()
    .oneOf(statusOptions, "Invalid status")
    .required("Status is required"),

  startDate: yup
    .date()
    .required("Start Date is required")
    .min(new Date(), "Start Date must be in the future"),

  endDate: yup
    .date()
    .required("End Date is required")
    .min(yup.ref("startDate"), "End Date must be after Start Date"),

  markupPercent: yup
    .number()
    .required("Markup Percent is required")
    .min(0, "Minimum is 0%")
    .max(100, "Maximum is 100%")
    .test("max-3-decimals", "Up to 3 decimal places allowed", (value) =>
      value !== undefined ? /^\d+(\.\d{1,3})?$/.test(value.toString()) : true
    ),
});
